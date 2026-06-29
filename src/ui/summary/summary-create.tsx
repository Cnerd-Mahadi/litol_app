"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAction } from "next-safe-action/hooks"
import { useSWRConfig } from "swr"
import { Icons } from "@/components/ui/icons"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NotesPicker } from "./notes-picker"
import { SummaryEditorModal } from "./summary-editor-modal"
import { generateSummaryAction, createSummary } from "@/actions/summary"
import { useToast } from "@/hooks/use-toast"

const F_COLOR = "#a78bfa"

const manualFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  keywords: z.array(z.string()),
})
type ManualFormData = z.infer<typeof manualFormSchema>

export function SummaryCreate() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { toast } = useToast()

  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([])
  const [maxWords, setMaxWords] = useState(500)
  const [aiPhase, setAiPhase] = useState<"pick" | "generating">("pick")
  const [editorData, setEditorData] = useState<{ title: string; keywords: string[]; content: string } | null>(null)
  const [kwInput, setKwInput] = useState("")

  const { register, handleSubmit, watch, setValue, reset } = useForm<ManualFormData>({
    resolver: zodResolver(manualFormSchema),
    defaultValues: { title: "", content: "", keywords: [] },
  })
  const manKeywords = watch("keywords")
  const manContent = watch("content")

  const { execute: execGenerate } = useAction(generateSummaryAction, {
    onSuccess: ({ data }) => {
      if (data?.summary) {
        setEditorData(data.summary)
        setAiPhase("pick")
      }
    },
    onError: ({ error: e }) => {
      toast({ title: "Failed to generate summary", description: e.serverError, variant: "destructive" })
      setAiPhase("pick")
    },
  })

  const { execute: execSaveManual, isPending: manSaving } = useAction(createSummary, {
    onSuccess: ({ data }) => {
      mutate("summaries")
      reset()
      setKwInput("")
      if (data?.summaryId) router.push(`/summary/${data.summaryId}`)
    },
    onError: ({ error: e }) => toast({ title: "Failed to save summary", description: e.serverError, variant: "destructive" }),
  })

  const generate = () => {
    if (selectedNoteIds.length === 0) return
    setAiPhase("generating")
    execGenerate({ noteIds: selectedNoteIds, maxWords })
  }

  const addManKw = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && kwInput.trim()) {
      e.preventDefault()
      const kw = kwInput.trim()
      if (!manKeywords.includes(kw)) setValue("keywords", [...manKeywords, kw])
      setKwInput("")
    }
  }

  const onManSubmit = (data: ManualFormData) => {
    execSaveManual({ title: data.title, content: data.content, keywords: data.keywords })
  }

  if (aiPhase === "generating") {
    return (
      <div className="max-w-md mx-auto pt-10 text-center animate-fade-up">
        <div className="relative mx-auto h-16 w-16 mb-6">
          <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: F_COLOR + "44" }} />
          <div className="relative h-16 w-16 grid place-items-center rounded-2xl border"
            style={{ background: F_COLOR + "14", borderColor: F_COLOR + "40", color: F_COLOR }}>
            <Icons.sparkles size={28} />
          </div>
        </div>
        <div className="text-[17px] font-semibold text-ink-100">Generating summary</div>
        <div className="text-[13px] text-ink-500 mt-1">
          from {selectedNoteIds.length} note{selectedNoteIds.length === 1 ? "" : "s"}
        </div>
        <div className="mt-5 space-y-2.5 text-left max-w-xs mx-auto">
          {["Reading notes & cues", "Condensing content", "Extracting key terms"].map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px] text-ink-400 animate-pulse-soft"
              style={{ animationDelay: `${i * 0.3}s` }}>
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: F_COLOR }} />
              {s}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {editorData && (
        <SummaryEditorModal
          initial={editorData}
          noteIds={selectedNoteIds}
          onClose={() => setEditorData(null)}
        />
      )}

      <div className="space-y-4">
        <Tabs defaultValue="ai">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="ai"><Icons.sparkles size={13} />Generate with AI</TabsTrigger>
              <TabsTrigger value="manual"><Icons.doc size={13} />Write manually</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ai" className="mt-4">
            <div className="rounded-2xl border p-5 space-y-5" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
              <div>
                <div className="text-[13px] font-medium text-ink-300 mb-1">Select notes to summarize</div>
                <div className="font-mono text-[10px] text-ink-600 uppercase tracking-wide">{selectedNoteIds.length} selected</div>
              </div>
              <NotesPicker
                selectedIds={selectedNoteIds}
                onToggle={(id) => setSelectedNoteIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])}
              />
              <div>
                <label className="text-[12px] font-medium text-ink-400 mb-2 block">
                  Max words <span className="font-mono text-ink-600">{maxWords}</span>
                </label>
                <input type="range" min={100} max={2000} step={100}
                  value={maxWords} onChange={(e) => setMaxWords(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between font-mono text-[10px] text-ink-700 mt-1">
                  <span>100</span><span>2000</span>
                </div>
              </div>
              <button onClick={generate} disabled={selectedNoteIds.length === 0}
                className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-[14px] font-medium text-white transition disabled:opacity-40 disabled:pointer-events-none"
                style={{ background: "#8b5cf6", boxShadow: "0 8px 24px -8px rgba(139,92,246,.6)" }}>
                <Icons.sparkles size={16} />Generate summary
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <form onSubmit={handleSubmit(onManSubmit)}
              className="rounded-2xl border p-5 space-y-5" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
              <div>
                <label className="text-[12px] font-medium text-ink-400 mb-2 block">Title *</label>
                <input {...register("title")} placeholder="e.g. Photosynthesis — Light Reactions"
                  className="w-full h-10 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
                  style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
              </div>
              <div>
                <label className="text-[12px] font-medium text-ink-400 mb-2 block">
                  Keywords <span className="text-ink-600">— press Enter to add</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {manKeywords.map((k) => (
                    <span key={k} className="inline-flex items-center gap-1.5 h-7 pl-3 pr-1.5 rounded-full text-[12.5px] font-medium"
                      style={{ background: F_COLOR + "1a", border: `1px solid ${F_COLOR}33`, color: F_COLOR }}>
                      {k}
                      <button type="button" onClick={() => setValue("keywords", manKeywords.filter((x) => x !== k))}
                        className="h-4 w-4 grid place-items-center rounded-full hover:bg-white/10">
                        <Icons.x size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <input value={kwInput} onChange={(e) => setKwInput(e.target.value)} onKeyDown={addManKw}
                  placeholder="Add a keyword…"
                  className="w-full h-10 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
                  style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
              </div>
              <div>
                <label className="text-[12px] font-medium text-ink-400 mb-2 block">Content *</label>
                <textarea {...register("content")} rows={10} placeholder="Write your summary here…"
                  className="w-full rounded-xl p-3.5 text-sm text-ink-200 placeholder:text-ink-600 outline-none resize-none leading-relaxed"
                  style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
                <div className="font-mono text-[11px] text-ink-600 mt-1.5">
                  {manContent.trim().split(/\s+/).filter(Boolean).length} words
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button type="submit" disabled={manSaving}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium text-white transition disabled:opacity-40"
                  style={{ background: "#8b5cf6" }}>
                  {manSaving ? <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Icons.check size={16} />}
                  Save to gallery
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
