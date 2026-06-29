"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAction } from "next-safe-action/hooks"
import { useSWRConfig } from "swr"
import { Icons } from "@/components/ui/icons"
import { createSummary } from "@/actions/summary"
import { useToast } from "@/hooks/use-toast"

const F_COLOR = "#a78bfa"

const editorFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  keywords: z.array(z.string()),
})
type EditorFormData = z.infer<typeof editorFormSchema>

export function SummaryEditorModal({ initial, noteIds, onClose }: {
  initial: { title: string; keywords: string[]; content: string }
  noteIds: string[]
  onClose: () => void
}) {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { toast } = useToast()
  const [kwInput, setKwInput] = useState("")

  const { register, handleSubmit, watch, setValue } = useForm<EditorFormData>({
    resolver: zodResolver(editorFormSchema),
    defaultValues: { title: initial.title, content: initial.content, keywords: initial.keywords },
  })
  const keywords = watch("keywords")
  const content = watch("content")

  const { execute: execSave, isPending } = useAction(createSummary, {
    onSuccess: ({ data }) => {
      mutate("summaries")
      if (data?.summaryId) router.push(`/summary/${data.summaryId}`)
    },
    onError: ({ error: e }) => toast({ title: "Failed to save summary", description: e.serverError, variant: "destructive" }),
  })

  const addKw = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && kwInput.trim()) {
      e.preventDefault()
      const kw = kwInput.trim()
      if (!keywords.includes(kw)) setValue("keywords", [...keywords, kw])
      setKwInput("")
    }
  }

  const onSubmit = (data: EditorFormData) => {
    execSave({ title: data.title, content: data.content, keywords: data.keywords, noteIds })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <form onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border overflow-hidden animate-scale-in"
        style={{ background: "var(--elevated)", borderColor: "var(--line)" }}
        onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between px-6 h-14 border-b shrink-0" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-2.5">
            <span style={{ color: F_COLOR }}><Icons.sparkles size={16} /></span>
            <span className="text-[13.5px] font-semibold text-ink-100">Review &amp; save summary</span>
          </div>
          <button type="button" onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-lg text-ink-500 hover:text-ink-200 hover:bg-fill2 transition">
            <Icons.x size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-5">
          <div>
            <label className="text-[11px] font-medium text-ink-500 uppercase tracking-wider mb-2 block">Title</label>
            <input {...register("title")}
              className="w-full h-11 rounded-xl px-4 text-[15px] font-semibold text-ink-100 placeholder:text-ink-600 outline-none"
              style={{ background: "var(--fill1)", border: "1px solid var(--line)" }}
              placeholder="Summary title…" />
          </div>

          <div>
            <label className="text-[11px] font-medium text-ink-500 uppercase tracking-wider mb-2 block">
              Keywords <span className="normal-case font-normal text-ink-600">— press Enter to add</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {keywords.map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5 h-7 pl-3 pr-1.5 rounded-full text-[12.5px] font-medium"
                  style={{ background: F_COLOR + "1a", border: `1px solid ${F_COLOR}33`, color: F_COLOR }}>
                  {k}
                  <button type="button" onClick={() => setValue("keywords", keywords.filter((x) => x !== k))}
                    className="h-4 w-4 grid place-items-center rounded-full hover:bg-white/10">
                    <Icons.x size={10} />
                  </button>
                </span>
              ))}
            </div>
            <input value={kwInput} onChange={(e) => setKwInput(e.target.value)} onKeyDown={addKw}
              placeholder="Add keyword…"
              className="w-full h-9 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
              style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
          </div>

          <div>
            <label className="text-[11px] font-medium text-ink-500 uppercase tracking-wider mb-2 block">Content</label>
            <textarea {...register("content")} rows={16}
              className="w-full rounded-xl p-4 text-[14px] text-ink-200 placeholder:text-ink-600 outline-none resize-none leading-relaxed"
              style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t shrink-0" style={{ borderColor: "var(--line)" }}>
          <span className="font-mono text-[11px] text-ink-600">
            {content.trim().split(/\s+/).filter(Boolean).length} words
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={onClose}
              className="h-9 px-4 rounded-lg text-[13px] font-medium text-ink-400 hover:text-ink-100 hover:bg-fill2 transition">
              Discard
            </button>
            <button type="submit" disabled={isPending}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-[13px] font-medium text-white transition disabled:opacity-40"
              style={{ background: "#8b5cf6" }}>
              {isPending ? <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Icons.check size={14} />}
              Save to gallery
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
