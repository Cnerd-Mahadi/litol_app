import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		screens: {
			sm: "650px",
			md: "780px",
			lg: "1030px",
			xl: "1290px",
			"2xl": "1590px",
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
				mono: ["ui-monospace", "SFMono-Regular", "monospace"],
			},
			colors: {
				/* ── ShadCN tokens ── */
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				/* ── Design system tokens ── */
				surface: "var(--surface)",
				cardBg: "var(--card-bg)",
				cardHover: "var(--card-hover)",
				elevated: "var(--elevated)",
				elevated2: "var(--elevated2)",
				hairline: "var(--line)",
				line2: "var(--line2)",
				fill1: "var(--fill1)",
				fill2: "var(--fill2)",
				fill3: "var(--fill3)",
				accentSoft: "var(--accent-soft)",
				accentFg: "var(--accent-fg)",
				ink: {
					100: "var(--t1)",
					300: "var(--t3)",
					400: "var(--t4)",
					500: "var(--t5)",
					600: "var(--t6)",
					700: "var(--t7)",
				},
				feat: {
					summary: "#a78bfa",
					qa: "#38bdf8",
					quiz: "#fbbf24",
					map: "#34d399",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				"2xl": "16px",
				"3xl": "20px",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
