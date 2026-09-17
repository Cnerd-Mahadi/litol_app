---
name: Litol
description: A dense, navy-ground study workspace finished to the level of Linear and Vercel; one orange, hairlines, and Geist on an eight-step role scale.
colors:
  primary: "#fb923c"
  primary-ink: "#1a0f00"
  link: "#fdba74"
  page: "#0f172a"
  panel: "#151f36"
  sidebar: "#0c1426"
  popover: "#1d2940"
  muted-surface: "#212e46"
  accent-surface: "#263349"
  secondary-surface: "#334155"
  input-stroke: "#4c5b74"
  ink: "#eef2f7"
  ink-muted: "#a8b7ca"
  hairline: "color-mix(in srgb, #ffffff 8%, transparent)"
  hairline-strong: "color-mix(in srgb, #ffffff 14%, transparent)"
  destructive: "#ff6467"
  success-text: "#46d98a"
  success-bg: "#16281f"
  success-border: "#24402f"
  warning-text: "#e3b341"
  warning-bg: "#2a2410"
  warning-border: "#574a1c"
  danger-text: "#ff6b72"
  danger-bg: "#2a1a1d"
  danger-border: "#4a2529"
  notice-text: "#c4b5fd"
  notice-bg: "#1e1b3a"
  notice-border: "#372f6b"
  hue-blue: "#60a5fa"
  hue-indigo: "#818cf8"
  hue-violet: "#a78bfa"
  hue-emerald: "#34d399"
  hue-amber: "#fbbf24"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.024em"
  heading:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.011em"
  prose:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  ui:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.005em"
  micro:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.01em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  sidebar: "224px"
  sidebar-collapsed: "64px"
  chrome-bar: "56px"
  container: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  button-primary-disabled:
    backgroundColor: "{colors.muted-surface}"
    textColor: "{colors.ink-muted}"
  button-outline:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  button-outline-hover:
    backgroundColor: "{colors.accent-surface}"
  button-secondary:
    backgroundColor: "{colors.secondary-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  button-ghost-hover:
    backgroundColor: "{colors.accent-surface}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 16px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 14px"
  keyword-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    height: "24px"
    padding: "0 8px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 10px"
  nav-item-active:
    backgroundColor: "{colors.accent-surface}"
    textColor: "{colors.ink}"
  kbd:
    backgroundColor: "{colors.secondary-surface}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.sm}"
    padding: "1px 6px"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
---

# Design System: Litol

## Overview

**Creative North Star: "The Finished Workbench"**

Litol is a standard SaaS workspace held to the finish of Linear and Vercel. The world is a navy ground stratified by a few percent of lightness into page, sidebar, and panel; hairline borders at low alpha do the structural work; a single orange is reserved for the primary action; and Geist runs on an eight-step role scale where chrome is dense (14px) and reading is not (16px). Nothing is decorated. Depth comes from tone, hierarchy from weight and one size step, and emphasis from placement rather than color.

The build explicitly refuses the dashboard-template arrangement. There are no tinted icon tiles, no uppercase tracked kickers above sections, no grid of identical feature cards, no shadows on resting surfaces, and no accent on hover borders or selection. Subject colors exist only as 6px dots and, at most, as tinted keyword chips; they are never surfaces. The light theme exists and maps the same roles, but dark is the product default and the canonical values recorded here.

**Key Characteristics:**
- Three-tone navy stratification (sidebar below page, panel above) instead of boxed regions
- Hairlines at 8% white; 14% white for the strong stroke on inputs, overlays, and hover
- One orange, on primary buttons and the active tab underline only; selection and active nav are neutral
- Eight named type roles by job (micro to display), 500 weight for labels, 600 for headings
- Flat cards; shadow appears only on floating overlays (menus, dialogs, popovers, toasts)
- Lists are hairline-divided rows inside one card, never a grid of cards
- 6px radius on controls, 8px on panels, pill on progress and dots

## Colors

A cool navy neutral family, one warm orange accent, four semantic status triplets, and five functional hues that never leave the dot and chip.

### Primary
- **Ember Orange** (`{colors.primary}`): the sole accent. Solid fill on the primary button (paired with near-black `primary-ink` text), the logo tile, the active-tab 2px underline, the progress-bar fill, the "Answer" label on a flipped recall card, the focus ring, and the caret. It never tints a hover border, a selected row, or an inactive control.
- **Ember Link** (`{colors.link}`): a lighter orange used only for inline text links in the `link` button variant.

### Neutral
- **Page Navy** (`{colors.page}`): the body background.
- **Panel Navy** (`{colors.panel}`): cards, list containers, inputs, the metric strip, dialogs and menus. Sits a few percent above the page.
- **Rail Navy** (`{colors.sidebar}`): the sidebar and the sign-in left column. A hair below the page, so the rail recedes.
- **Popover Navy** (`{colors.popover}`): the popover surface, one step above panel.
- **Muted Surface** (`{colors.muted-surface}`): skeleton blocks, disabled solid buttons, icon-button hover fill.
- **Accent Surface** (`{colors.accent-surface}`): the active nav item, hover on outline/ghost buttons, menu-item focus. This is what "selection is neutral" means in practice.
- **Secondary Surface** (`{colors.secondary-surface}`): secondary buttons, progress-bar track, kbd fill; at 50-60% alpha it is the list-row and nav hover wash.
- **Input Stroke** (`{colors.input-stroke}`): the resting stroke on inputs when the strong hairline is not enough.
- **Ink** (`{colors.ink}`): foreground text, and the tooltip fill (tooltips invert to ink on page).
- **Ink Muted** (`{colors.ink-muted}`): meta lines, captions, inactive nav, placeholder text, resting icons (the build calls this both `muted-foreground` and `foreground-faint`; they resolve to the same value in dark).
- **Hairline** (`{colors.hairline}`): the default border everywhere: card edges, row dividers, the sidebar edge, section rules.
- **Hairline Strong** (`{colors.hairline-strong}`): input and overlay borders, scrollbar thumb, card hover on the interactive recall card.

### Status (semantic triplets)
Each of success, warning, danger, and notice carries a text, a background, and a border token. They appear together on inline panels (error states, quiz answer rows, the demo banner) and never as a page-level wash. `destructive` is the solid fill for the destructive button and the text color of destructive menu items.

### Functional hues
Blue, indigo, violet, emerald, amber. Used only as a `size-1.5` round dot before a subject name and as the tint of a hue chip (10% of the hue mixed to transparent). A subject is assigned its hue by hashing its name.

### Named Rules
**The One Orange Rule.** Orange appears on the primary action, the active-tab underline, progress fill, and focus. Selection, hover, active navigation, and inactive states are neutral surfaces. If a screen has more than one solid orange control, one of them is wrong.

**The Dot, Not Surface Rule.** Subject and category hues are 6px dots and chip tints. They never fill an icon tile, a stat card, or a section background.

**The Hairline Rule.** Structure is drawn with 8% white. Reach for 14% only on inputs, overlays, and interactive hover. Never use a solid gray border on a dark panel.

## Typography

**Display Font:** Geist Sans (with ui-sans-serif, system-ui)
**Body Font:** Geist Sans
**Label/Mono Font:** Geist Mono (available; kbd chips deliberately use the sans)

**Character:** One family on an eight-step role scale. Roles are named by job, not size. Tracking opens at the small sizes (micro +0.01em) and tightens at the large (display -0.024em) so optical weight holds against the dark ground; the dark body adds a hair of tracking (0.003em) because light-on-dark text blooms. Geist stylistic sets `cv01`, `ss01`, `calt` are on.

### Hierarchy
- **Display** (600, 28px, 1.15): reader titles and the borderless editor title input; the sign-in hero line.
- **Heading** (600, 22px, 1.25): the page h1 in list and quiz pages, the sign-in h1.
- **Title** (600, 18px, 1.35): metric values (tabular-nums), the cue face of the recall card, empty-state headings.
- **Prose** (400, 16px, 1.75): note body, summary body, the answer face of the recall card. Reading columns cap near 720px (`max-w-180`).
- **UI** (400, 14px, 1.55): the body default. Buttons, nav labels, list-row titles (at 500), section h2 (at 500), menu items.
- **Caption** (400, 13px, 1.5): meta lines, page subtitles, section-header links, tab labels (at 500), keyword chips, dates.
- **Label** (500, 12px, 1.4, +0.005em): tooltips, field errors, the recall hint line, badges.
- **Micro** (500, 11px, 1.45, +0.01em): kbd chips, mobile nav labels, list-row keyword chips, the logo tagline (at 400).

### Named Rules
**The Role Weight Rule.** Weight belongs to the role: micro and label are 500, title/heading/display are 600, everything else 400 unless a row title or section header lifts to 500. Never set 700.

**The One Step Rule.** A section header is UI at 500 with its hint in caption; a list row is UI at 500 with its meta in caption. Hierarchy inside a component is one size step and one weight step, not a jump to a heading.

**The Tabular Rule.** Counts, dates, and positions (`3 / 12`) are always `tabular-nums`.

## Layout

The app shell is a fixed 224px labeled sidebar on the left (64px when collapsed, switched by `html[data-sidebar=collapsed]` and animated over 300ms on a `cubic-bezier(.2,0,0,1)` curve), with `main` padded by the same variable. The sidebar header is 56px; nav items are 32px rows with 2px gaps inside 8px horizontal padding. Below `lg` (1024px) the sidebar is replaced by a 56px top bar and a 56px bottom tab bar on the panel surface that respects the safe-area inset.

Every page is a centered column capped at 1180px with 16px side padding, 24px at `sm`, 40px at `xl` (readers and editors use 48px at `xl`); vertical padding is 24px. The page header is an `h1` heading with a caption subtitle under it, actions right-aligned and wrapping, the primary button trailing. Metric strips sit 24px below the header; content sections 32px below that.

The dashboard splits into a 3:2 grid (`lg:grid-cols-[3fr_2fr]`, 24px gap): recall card left, recent activity right. Forms split content from a 380px properties rail (`lg:grid-cols-[1fr_380px]`, 40px column gap). Reading columns cap at 720px.

Spacing rhythm is Tailwind's 4px scale used sparingly: 4/8/12/16/24/32. Section headers are a fixed 24px tall row with a 12px margin below. List rows are 44px (dashboard) or `py-2.5` (galleries) with 12px gap between icon, text, and trailing date.

## Elevation & Depth

Resting surfaces are flat. `--shadow-card` and `--shadow-btn` resolve to `none`, and no card, button, input, or metric strip carries a shadow; depth is the three-tone navy stratification plus hairlines. The recall card, which is interactive, responds to hover by moving its border from hairline to hairline-strong, not by lifting.

Only floating overlays cast shadows, and they borrow Tailwind's default vocabulary rather than a project token.

### Shadow Vocabulary
- **Overlay, floating** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): dropdown menus and popovers, always with a hairline-strong border.
- **Overlay, modal** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): dialogs, submenus, and toasts.

### Named Rules
**The Flat Panel Rule.** Anything that sits in the page grid is flat. A shadow means the element floats above the page and will go away; nothing else earns one.

## Shapes

Gently rounded, small radii. Controls (buttons, inputs, nav items, icon buttons, menus, chips) use 6px; panels, cards, list containers, dialogs, and status panels use 8px; kbd chips and inline micro chips use 4px; progress bars, subject dots, badges, and the scrollbar thumb are pills. The base radius token is 8px and the scale derives from it (`-4`, `-2`, `0`, `+4`).

Borders are 1px hairlines at low alpha and are the primary way regions are drawn. Lists are one bordered card with `divide-y` hairlines between rows; the metric strip is one bordered `dl` whose cells are divided by hairlines (left borders on desktop, a 2x2 grid with top and left borders on mobile). Editor forms are borderless: the title and body inputs have no stroke, no background, and no focus ring, with a hairline rule below the title and a properties rail of hairline rows.

Icons are Lucide outlines at 16px and 1.5 to 1.75 stroke, uncontained. They sit in a 20px grid cell in the sidebar so labels align whether or not the rail is collapsed.

## Components

### Buttons
Restrained and solid; the color says what the button is, not a shadow or a gradient.
- **Shape:** 6px radius, 36px tall by default (32px `sm`, 40px `lg`, 24px `xs` at label size), 16px horizontal padding (14px when a leading icon is present), UI text at 500, 6px gap to a 16px icon.
- **Primary:** Ember Orange fill with near-black text. Hover brightens 110%, active dims to 95%. Disabled swaps to the muted surface with muted text; solid variants never fade to half opacity.
- **Outline:** panel fill with a hairline border; hover moves to the accent surface. **Secondary:** secondary surface with hairline. **Ghost:** transparent, accent surface on hover. **Destructive:** destructive fill, same disabled treatment as primary. **Link:** Ember Link text, underline on hover.
- **Focus:** 2px ring in Ember Orange with a 2px page-colored offset.
- **Icon buttons** in rows and headers are 28px or 32px squares, muted icon at rest, foreground icon on hover with a muted or accent fill; row-menu triggers are hidden until row hover on desktop.

### Chips
- **Keyword chip:** transparent, hairline border, 6px radius, 24px tall, 8px padding, caption text in Ink Muted. In dense list rows the same chip compresses to micro text with 6px padding and 4px radius.
- **Subject dot:** 6px pill in the subject's functional hue, 6px before the subject name; the only place hue appears in a row.
- **kbd:** 4px radius, hairline border, secondary surface at 60%, micro text at 500 in the sans, 1px by 6px padding; used inline in hint lines beside a verb ("Space flip").
- **Badge** (shadcn): pill, label text at 500, 8px by 2px padding; outline variant is the neutral one.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** Panel Navy.
- **Shadow Strategy:** none at rest (see Elevation). The interactive recall card lifts its border to hairline-strong on hover.
- **Border:** 1px hairline.
- **Internal Padding:** shadcn card parts pad 24px; product cards set their own: 16px/20px on card headers and footers, 12px by 14px on list rows, 32px on centered empty states.

### List Row
The signature container. One card, `divide-y` hairlines, each row: 16px outline icon in Ink Muted (Ink on hover), title in UI at 500, a caption meta line of subject dot, subject, and counts joined by a `·` in the faint tone, optional keyword chips (desktop only), a tabular date in caption at the right, and a row menu trigger that appears on hover. Hover washes the row with the secondary surface at 50%; focus uses an inset orange ring. Rows never become cards.

### Metric Strip
One bordered `dl` on the panel surface, cells divided by hairlines, each cell 12px by 16px (20px at `sm`): caption label in Ink Muted above a title-size 600 tabular value with 4px between. Four across on desktop, 2x2 on mobile.

### Section Header
A 24px-tall row, 12px below to content: `h2` in UI at 500 left; an optional caption link in Ink Muted right that turns Ink on hover. No kicker, no rule, no icon.

### Inputs / Fields
- **Style:** 40px tall, panel fill, hairline-strong border, 6px radius, 14px by 8px padding, UI text; placeholder in Ink Muted.
- **Focus:** border turns Ember Orange with a 2px orange ring at 35% alpha.
- **Error / Disabled:** `aria-invalid` turns the border destructive with a destructive ring at 40%; disabled drops to 50% opacity.
- **Editor fields:** in note and summary forms the title is a borderless display-size input and the body a borderless textarea, with the title separated by a hairline rule; field errors are label text in destructive.

### Navigation
- **Sidebar:** Rail Navy, hairline right edge. Nav item is a 32px row, 6px radius, 10px horizontal padding, 16px icon in a 20px cell, UI label 10px after. Rest: Ink Muted. Hover: secondary surface at 60%, Ink. Active: accent surface, Ink, label at 500. No orange, no left bar. Collapsing to 64px hides labels by width and opacity over 200ms and moves the label to a native `title`.
- **Rail utilities:** theme toggle, collapse, and logout share the nav-item style; a hairline separates them from logout.
- **Mobile:** 56px bottom bar on Panel Navy with a hairline top; each tab a 20px icon over a micro label at 500, Ink when active, Ink Muted otherwise.
- **Tabs:** underline tabs, 36px tall, caption at 500, 20px between, a hairline under the list; the active tab gets a 2px Ember Orange bottom border and Ink text.

### Overlays
Dropdown menus and dialogs sit on Panel Navy with a hairline-strong border (menus 4px inner padding, items 8px by 6px at UI size, 4px radius, accent surface on focus; dialogs 24px padding, 8px radius). Popovers use Popover Navy. Tooltips invert: Ink fill, page-colored label text, 6px radius, 12px by 6px padding. All animate with a 95% zoom and fade.

### Progress
4px pill track on the secondary surface, Ember Orange fill, width animated over 300ms. Used under the recall card and above the quiz question.

### Status Panels
An 8px-radius box using a status triplet: border in `*-border`, fill in `*-bg`, caption text in `*-text`, with a retry as a secondary-style caption button. Quiz answer rows reuse the success and danger triplets on their border and text.

### Recall Card
Signature component. A 320px-tall card with a hairline-divided header (deck icon, "Reviewing" caption with the subject at 500, tabular position right), a 3D flip body (300ms, preserve-3d, disabled under reduced motion) whose cue face is title-size 600 and answer face is prose in Ink Muted with an orange "Answer" caption, and a hairline-divided footer with the progress pill, kbd hints, and two 28px chevron icon buttons.

## Do's and Don'ts

### Do:
- **Do** stratify regions by tone: sidebar `{colors.sidebar}` below page `{colors.page}` below panel `{colors.panel}`, with a 1px hairline where two meet.
- **Do** reserve solid Ember Orange for the one primary action per view, the active-tab underline, progress fill, and the focus ring.
- **Do** build lists as one bordered card with hairline-divided rows: icon, UI title at 500, caption meta joined by `·`, tabular date right.
- **Do** open every page with `h1` heading + caption subtitle left and actions right, primary trailing.
- **Do** put a subject's hue in a 6px dot before its name and nowhere else.
- **Do** use `tabular-nums` on every count, date, and position.
- **Do** keep the metric strip a single bordered `dl` with hairline-divided cells; caption label over title-size 600 value.
- **Do** let editor forms go borderless: display-size title, hairline rule, prose body, properties in a rail of hairline rows.
- **Do** disable solid buttons by swapping to the muted surface, not by fading.

### Don't:
- **Don't** put an uppercase, tracked micro label above a section as a kicker; section headers are UI at 500 in sentence case.
- **Don't** wrap icons in tinted tiles or colored squares; icons are bare 16px outlines in Ink Muted.
- **Don't** lay out features or stats as a grid of identical cards; use the metric strip or a divided list.
- **Don't** color a hover border, a selected row, or the active nav item orange; hover is a 50-60% secondary wash and active is the accent surface.
- **Don't** add a shadow to a card, button, input, or strip; only floating overlays cast one.
- **Don't** use a functional hue as a surface, an icon tile, or a stat card fill.
- **Don't** set 700 weight or jump more than one size step inside a component.
- **Don't** replace a hairline with a solid gray or a 2px border; 8% white, 14% for strong.
