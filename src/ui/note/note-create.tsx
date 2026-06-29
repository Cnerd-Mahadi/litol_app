"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAction } from "next-safe-action/hooks"
import { useSWRConfig } from "swr"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { SubjectSelector } from "@/ui/shared/subject-selector"
import { createNote, suggestCueAction } from "@/actions/note"
import { createSubject } from "@/actions/user"
import { useToast } from "@/hooks/use-toast"

const F_COLOR = "#38bdf8"

const noteFormSchema = z.object({
  title: z.string().min(1),
  subjectId: z.string().min(1),
  description: z.string().optional(),
  keywords: z.array(z.string()),
  cues: z.array(z.object({ cue: z.string(), details: z.string() })),
})
type NoteFormData = z.infer<typeof noteFormSchema>

export function NoteCreate() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { toast } = useToast()
  const [showNewSubject, setShowNewSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [kwInput, setKwInput] = useState("")
  const [suggesting, setSuggesting] = useState<number | null>(null)

  const { register, handleSubmit, control, watch, setValue, reset } = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: { title: "", subjectId: "", description: "", keywords: [], cues: [{ cue: "", details: "" }] },
  })
  const { fields, append, remove } = useFieldArray({ control, name: "cues" })
  const keywords = watch("keywords")
  const watchedCues = watch("cues")
  const subjectId = watch("subjectId")
  const filledCues = watchedCues.filter((c) => c.cue.trim()).length

  const { execute: execCreate, isPending: createPending } = useAction(createNote, {
    onSuccess: ({ data }) => {
      mutate("notes")
      reset()
      if (data?.noteId) router.push(`/note/${data.noteId}`)
    },
    onError: ({ error: e }) => toast({ title: "Failed to save note", description: e.serverError, variant: "destructive" }),
  })

  const { execute: execSubject, isPending: subjectPending } = useAction(createSubject, {
    onSuccess: () => {
      mutate("subjects")
      toast({ title: "Subject created" })
      setNewSubjectName("")
      setShowNewSubject(false)
    },
    onError: ({ error: e }) => toast({ title: "Failed to create subject", description: e.serverError, variant: "destructive" }),
  })

  const { execute: execSuggest, isPending: suggestPending } = useAction(suggestCueAction, {
    onSuccess: ({ data }) => {
      if (suggesting !== null && data?.cue) setValue(`cues.${suggesting}.cue`, data.cue)
      setSuggesting(null)
    },
    onError: () => setSuggesting(null),
  })

  const addKw = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && kwInput.trim()) {
      e.preventDefault()
      const kw = kwInput.trim()
      if (!keywords.includes(kw)) setValue("keywords", [...keywords, kw])
      setKwInput("")
    }
  }

  const onSubmit = (data: NoteFormData) => {
    const validCues = data.cues.filter((c) => c.cue.trim() && c.details.trim())
    execCreate({
      title: data.title,
      subjectId: data.subjectId,
      description: data.description?.trim() || undefined,
      keywords: data.keywords,
      cues: validCues as { cue: string; details: string }[],
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-2xl border p-5 space-y-5" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>

        {/* Title */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2 block">Note title *</label>
          <input {...register("title")}
            placeholder="e.g. Organic Chemistry — Functional Groups"
            className="w-full h-10 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
            style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
        </div>

        {/* Subject */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2 block">Subject *</label>
          {showNewSubject ? (
            <div className="flex gap-2">
              <input value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && newSubjectName.trim() && execSubject({ name: newSubjectName.trim() })}
                placeholder="Subject name…" autoFocus
                className="flex-1 h-10 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
                style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
              <button type="button"
                onClick={() => newSubjectName.trim() && execSubject({ name: newSubjectName.trim() })}
                disabled={!newSubjectName.trim() || subjectPending}
                className="h-10 px-3 rounded-lg text-[13px] font-medium text-white disabled:opacity-40"
                style={{ background: "#8b5cf6" }}>
                {subjectPending ? <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" /> : "Create"}
              </button>
              <button type="button" onClick={() => { setShowNewSubject(false); setNewSubjectName("") }}
                className="h-10 px-3 rounded-lg text-[13px] text-ink-400 hover:text-ink-200 transition">
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <SubjectSelector value={subjectId} onChange={(id) => setValue("subjectId", id)} />
              <button type="button" onClick={() => setShowNewSubject(true)}
                className="h-10 px-3 rounded-lg text-[13px] font-medium text-ink-400 hover:text-ink-100 border hover:bg-fill2 transition whitespace-nowrap"
                style={{ borderColor: "var(--line)" }}>
                + New
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2 block">
            Description <span className="text-ink-600">— optional</span>
          </label>
          <textarea {...register("description")} rows={4} placeholder="Write your notes here…"
            className="w-full rounded-xl p-3.5 text-sm text-ink-200 placeholder:text-ink-600 outline-none resize-none leading-relaxed"
            style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
        </div>

        {/* Keywords */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2 block">
            Keywords <span className="text-ink-600">— press Enter to add</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {keywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1.5 h-7 pl-3 pr-1.5 rounded-full text-[13px] font-medium"
                style={{ background: F_COLOR + "1a", border: `1px solid ${F_COLOR}33`, color: F_COLOR }}>
                {k}
                <button type="button" onClick={() => setValue("keywords", keywords.filter((x) => x !== k))}
                  className="h-4 w-4 grid place-items-center rounded-full hover:bg-white/10">
                  <Icons.x size={11} />
                </button>
              </span>
            ))}
          </div>
          <input value={kwInput} onChange={(e) => setKwInput(e.target.value)} onKeyDown={addKw}
            placeholder="Add a keyword…"
            className="w-full h-10 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
            style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
        </div>

        {/* Cues */}
        <div className="pt-1">
          <div className="mb-3">
            <div className="text-[12px] font-medium text-ink-300">
              Cues <span className="text-ink-600 font-normal">— question / answer pairs</span>
            </div>
            <div className="font-mono text-[10px] text-ink-600 uppercase tracking-wide mt-0.5">
              {filledCues} cue{filledCues === 1 ? "" : "s"}
            </div>
          </div>
          <div className="space-y-2.5">
            {fields.map((field, i) => (
              <div key={field.id} className="rounded-xl border p-3 group/cue"
                style={{ background: "var(--fill1)", borderColor: "var(--line)" }}>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] shrink-0" style={{ color: F_COLOR }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <input {...register(`cues.${i}.cue`)} placeholder="Question / cue…"
                    className="flex-1 bg-transparent text-[13.5px] font-medium text-ink-100 placeholder:text-ink-600 outline-none" />
                  <button type="button"
                    onClick={() => { setSuggesting(i); execSuggest({ detail: watchedCues[i]?.details ?? "" }) }}
                    disabled={!watchedCues[i]?.details?.trim() || suggestPending}
                    title="AI: suggest cue from details"
                    className="h-6 w-6 grid place-items-center rounded-md text-ink-600 hover:text-accentFg hover:bg-fill2 transition disabled:opacity-40">
                    {suggesting === i && suggestPending
                      ? <span className="h-3 w-3 rounded-full border-2 border-current/30 border-t-current animate-spin" />
                      : <Icons.sparkles size={13} />}
                  </button>
                  <button type="button" onClick={() => fields.length > 1 && remove(i)}
                    className="h-6 w-6 grid place-items-center rounded-md text-ink-700 hover:text-red-300 hover:bg-red-500/10 opacity-0 group-hover/cue:opacity-100 transition">
                    <Icons.x size={13} />
                  </button>
                </div>
                <input {...register(`cues.${i}.details`)} placeholder="Answer / details…"
                  className="w-full bg-transparent text-[13px] text-ink-400 placeholder:text-ink-700 outline-none mt-1.5 pl-[26px]" />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ cue: "", details: "" })}
            className="mt-2.5 flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12.5px] text-ink-500 hover:text-ink-200 hover:bg-fill2 transition">
            <Icons.plus size={14} /> Add cue
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t -mx-5 px-5" style={{ borderColor: "var(--line)" }}>
          <span className="font-mono text-[11px] text-ink-600 whitespace-nowrap">
            {filledCues} cue{filledCues === 1 ? "" : "s"} · subject required
          </span>
          <button type="submit" disabled={createPending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium text-white transition disabled:opacity-40"
            style={{ background: "#8b5cf6" }}>
            {createPending
              ? <span className="flex items-center gap-2"><span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Saving…</span>
              : <><Icons.check size={16} />Save note</>}
          </button>
        </div>
      </div>
    </form>
  )
}
