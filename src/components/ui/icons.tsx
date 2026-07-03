interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Svg({ size = 20, className, style, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}>
      {children}
    </svg>
  );
}

export const Icons = {
  home: (p: IconProps) => <Svg {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /><path d="M9.5 20v-6h5v6" /></Svg>,
  sparkles: (p: IconProps) => <Svg {...p}><path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8Z" /><path d="M18.5 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z" /><path d="M5 4l.5 1.4L7 6l-1.5.6L5 8l-.5-1.4L3 6l1.5-.6Z" /></Svg>,
  chat: (p: IconProps) => <Svg {...p}><path d="M4 5h16v11H9l-4 3v-3H4Z" /><path d="M8 9.5h8" /><path d="M8 12.5h5" /></Svg>,
  quiz: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M9.2 9.4a2.8 2.8 0 1 1 4 2.5c-.9.5-1.2 1-1.2 2" /><path d="M12 16.6h.01" /></Svg>,
  search: (p: IconProps) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></Svg>,
  plus: (p: IconProps) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>,
  trash: (p: IconProps) => <Svg {...p}><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" /><path d="M10 11v5M14 11v5" /></Svg>,
  image: (p: IconProps) => <Svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="m4 17 5-5 4 4 3-2 4 3" /></Svg>,
  chevR: (p: IconProps) => <Svg {...p}><path d="m9 6 6 6-6 6" /></Svg>,
  chevD: (p: IconProps) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>,
  logout: (p: IconProps) => <Svg {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 12H3M6 8l-4 4 4 4" /></Svg>,
  arrowR: (p: IconProps) => <Svg {...p}><path d="M4 12h15M13 5l7 7-7 7" /></Svg>,
  x: (p: IconProps) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>,
  check: (p: IconProps) => <Svg {...p}><path d="m4 12 5 5L20 6" /></Svg>,
  clock: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Svg>,
  flame: (p: IconProps) => <Svg {...p}><path d="M12 3c.5 3 3 4 3 7a3 3 0 0 1-6 0c0-1 .4-1.6 0-3-2 1.5-3 3.4-3 6a6 6 0 0 0 12 0c0-4.5-3-7-6-10Z" /></Svg>,
  eye: (p: IconProps) => <Svg {...p}><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="2.6" /></Svg>,
  send: (p: IconProps) => <Svg {...p}><path d="M5 12 20 5l-5 14-3.5-5.5L5 12Z" /><path d="m11.5 13.5 3-3" /></Svg>,
  refresh: (p: IconProps) => <Svg {...p}><path d="M4 9a8 8 0 0 1 13.5-3.5L20 8" /><path d="M20 4v4h-4" /><path d="M20 15a8 8 0 0 1-13.5 3.5L4 16" /><path d="M4 20v-4h4" /></Svg>,
  doc: (p: IconProps) => <Svg {...p}><path d="M6 3h8l4 4v14H6Z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 15.5h6M9 8.5h2" /></Svg>,
  bolt: (p: IconProps) => <Svg {...p}><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" /></Svg>,
  target: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></Svg>,
  pin: (p: IconProps) => <Svg {...p}><path d="M9 4h6l-1 6 3 3H7l3-3-1-6Z" /><path d="M12 16v4" /></Svg>,
  sun: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" /></Svg>,
  moon: (p: IconProps) => <Svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" /></Svg>,
  google: ({ size = 18 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.22-4.74 3.22-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.85 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.67-2.84Z" />
      <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.05l3.67 2.84C6.71 7.29 9.14 4.75 12 4.75Z" />
    </svg>
  ),
};
