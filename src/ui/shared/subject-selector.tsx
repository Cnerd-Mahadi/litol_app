"use client"

import { useSubjects } from "@/lib/swr/use-subjects"

interface SubjectSelectorProps {
  value: string
  onChange: (id: string) => void
  placeholder?: string
}

export function SubjectSelector({ value, onChange, placeholder = "Select subject…" }: SubjectSelectorProps) {
  const { data, isLoading } = useSubjects()
  const subjects = data?.subjects ?? []

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isLoading}
      className="flex-1 h-10 rounded-lg px-3.5 text-sm text-ink-100 outline-none disabled:opacity-50"
      style={{ background: "var(--fill1)", border: "1px solid var(--line)" }}>
      <option value="">{isLoading ? "Loading…" : placeholder}</option>
      {subjects.map((s) => (
        <option key={s.id} value={s.id}>{s.name}</option>
      ))}
    </select>
  )
}
