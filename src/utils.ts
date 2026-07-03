import { FileText, GraduationCap, Home, Monitor, Moon, Sparkles, Sun } from "lucide-react";

export const navItems = [
  { name: "Home",    route: "/",        Icon: Home },
  { name: "Summary", route: "/summary", Icon: Sparkles },
  { name: "Notes",   route: "/note",    Icon: FileText },
  { name: "Quiz",    route: "/quiz",    Icon: GraduationCap },
];

export const themeOptions = [
  { value: "light",  label: "Light",  Icon: Sun },
  { value: "dark",   label: "Dark",   Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")        // code fences
    .replace(/`([^`]+)`/g, "$1")           // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images -> alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")  // links -> link text
    .replace(/^#{1,6}\s+/gm, "")           // headings
    .replace(/^-{3,}\s*$/gm, "")           // horizontal rules
    .replace(/\*\*(.*?)\*\*/g, "$1")       // bold
    .replace(/__(.*?)__/g, "$1")           // bold
    .replace(/^\|.*\|$/gm, "")             // table rows
    .replace(/^\s*\|?[\s:-]+\|[\s:|-]+$/gm, "") // table separator rows
    .replace(/\n{3,}/g, "\n\n")            // collapse extra blank lines left behind
    .trim();
}
