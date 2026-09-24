---
name: Record database
description: A calm, high-trust workspace for patient and clinic-staff record tasks.
colors:
  archive-ground: "#f4f7fa"
  archive-card: "#ffffff"
  archive-ink: "#172638"
  archive-muted: "#5d6d80"
  archive-line: "#d7e0ea"
  archive-blue: "#1f5b9b"
  archive-blue-soft: "#e6effb"
  archive-header: "#ffffff"
  archive-footer: "#edf2f7"
  dark-ground: "#101821"
  dark-card: "#17222d"
  dark-ink: "#e8eef5"
  dark-muted: "#a8b6c5"
  dark-line: "#334353"
  dark-blue: "#75a9df"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.75rem"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.2
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.73rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "5px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.archive-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.archive-card}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.archive-card}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "40px"
  card:
    backgroundColor: "{colors.archive-card}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  navigation:
    backgroundColor: "{colors.archive-header}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.sm}"
    height: "72px"
---

# Design System: Record database

## Overview

**Creative North Star: "The Calm Clinical Archive"**

This system treats the application as a working records office rather than a health marketing site. The visual language is cool, precise, and quiet: a pale mineral ground supports white record surfaces, ink-blue hierarchy, one-pixel rules, and a single cobalt action color. It is intentionally light-first because the core users are scanning records, entering notes, and making decisions in a browser workspace.

The density is operational without becoming loud. Tables carry the main information, metadata stays visibly secondary, and actions are placed where a staff member expects them. The login surface introduces the same system through a dark archive panel, then hands off to the lighter working surface. Motion is reserved for state feedback and row hover; the interface does not perform decorative page-load choreography.

**Key Characteristics:**

- Record-first information architecture with a visible collection count.
- Cool paper surfaces and precise blue-black hierarchy.
- Compact sans typography with tabular IDs and dates.
- Restrained elevation: borders and soft ambient shadows, never decorative gloss.
- Responsive tables that preserve titles and actions on small screens.

## Colors

The palette is a restrained cool-neutral system with cobalt reserved for actions, current context, and useful state.

### Primary

- **Archive Blue** (`#1f5b9b`): Primary buttons, active links, focus accents, and selected context.
- **Archive Blue Soft** (`#e6effb`): Low-emphasis action backgrounds, count badges, and row hover tint.

### Neutral

- **Archive Ground** (`#f4f7fa`): The page field behind authenticated workspaces and the login form panel.
- **Archive Card** (`#ffffff`): Record panels, tables, form cards, and the sticky application bar.
- **Archive Ink** (`#172638`): Primary headings, table values, and control text.
- **Archive Muted** (`#5d6d80`): Descriptions, metadata, dates, and secondary labels.
- **Archive Line** (`#d7e0ea`): Dividers, table rules, field borders, and quiet separators.
- **Archive Footer** (`#edf2f7`): Footer and secondary neutral band.
- **Archive Navy** (`#1a2b40`): The login introduction panel; it is a framing surface, not a second action color.

**The One Signal Rule.** Archive Blue is reserved for the action or state that helps a user complete the current task; it is not used as decoration.

## Typography

**Display Font:** IBM Plex Sans (with `ui-sans-serif`, `system-ui`, and `sans-serif` fallbacks)  
**Body Font:** IBM Plex Sans (with the same fallback stack)  
**Label/Mono Font:** IBM Plex Mono for record IDs and compact metadata only

**Character:** One practical sans family keeps labels, controls, data, and prose in one voice. IBM Plex Mono is a functional accent for identifiers and measurement-like values, never a costume for general UI text.

### Hierarchy

- **Display** (700, 4.75rem, 0.98 line-height, -0.06em tracking): Login introduction headline only.
- **Headline** (700, 2.25rem, 1.08 line-height, -0.04em tracking): Authenticated page titles.
- **Title** (700, 1.15rem, 1.2 line-height, -0.02em tracking): Card and form section headings.
- **Body** (400, 0.9375rem, 1.5 line-height): Descriptions and form copy; keep prose near a 65ch measure.
- **Label** (600, 0.8rem, 1.2 line-height): Field labels and action text.
- **Table label** (700, 0.68rem, 0.075em tracking, uppercase): Column headers only.

**The Scan Rule.** IDs and dates use tabular numerals and a compact mono treatment so a record row can be scanned without decoding decorative typography.

## Layout

The authenticated shell uses a centered 1200px maximum content width with a 72px sticky application bar. The page header sits inside a one-pixel bottom rule and keeps the primary action on the staff surface. Record panels are full-width bands with a toolbar, count badge, table, and contained empty state.

The login surface uses a two-column desktop split: a dark archive introduction on the left and a centered 410px credential form on the right. At widths below 720px it becomes a single reading order: archive context, then sign-in form. At widths below 600px the staff table becomes a compact operational view with patient, title, and actions visible; the patient table uses a fixed three-column layout so the title and date remain visible while the ID truncates safely.

Spacing follows an 8px rhythm with larger separation above headings and between page regions. Forms use a 12–16px field rhythm and reserve a clear action row at the bottom.

## Elevation & Depth

Depth is tonal and structural. Panels sit on the ground through a one-pixel border, a very soft two-step ambient shadow, and a lighter header band. There is no glass, glow, gradient text, or floating card treatment.

### Shadow Vocabulary

- **Panel ambient** (`0 1px 2px rgba(23, 38, 56, 0.04), 0 8px 24px rgba(23, 38, 56, 0.05)`): Record sections, detail cards, and form cards.
- **Button lift** (`0 1px 2px rgba(23, 38, 56, 0.08)`): Primary action buttons only; keep it subordinate to the label.

## Shapes

The form language is compact and nearly square. Panels use an 8px radius, controls and buttons use 5–6px radii, and status/count badges use pill geometry only when they represent a compact state. Borders are the primary separators; shadows never substitute for structure.

## Components

### Buttons

- **Shape:** Compact rounded rectangle (5–6px radius), 40px standard height, 32px small height.
- **Primary:** Archive Blue background with white text and a quiet one-pixel lift shadow.
- **Hover / Focus:** Slightly darker blue on hover; a 2px translucent ring and border shift on keyboard focus.
- **Outline:** White card surface with an Archive Line border; used for cancel and secondary actions.
- **Ghost:** Transparent surface with Archive Muted text; used for sign out and row actions.

### Chips

- **Style:** Pale Archive Blue Soft fill, blue text, and a low-contrast blue border.
- **State:** Record counts and compact contextual badges; never use color alone to convey status.

### Cards / Containers

- **Corner Style:** 8px radius.
- **Background:** Archive Card on Archive Ground.
- **Shadow Strategy:** Panel ambient only.
- **Border:** One Archive Line pixel.
- **Internal Padding:** 20px for forms and details; 12–20px for table toolbars.

### Inputs / Fields

- **Style:** White card surface, Archive Line border, 6px radius, 40px standard height.
- **Focus:** Archive Blue border plus a low-opacity 2px ring.
- **Error / Disabled:** Destructive red border and message block; disabled controls reduce opacity and remove pointer interaction.

### Navigation

The application bar is a white, one-pixel-bottom-rule surface with a compact `R` mark, “Record database” wordmark, role context, account identity, and sign-out action. It becomes a two-row mobile header: brand and account first, role context second. The brand returns to the role’s workspace rather than the login screen.

### Record tables

Tables use a muted header band, compact uppercase column labels, 1px row rules, hover tint, and right-aligned row actions. Patient rows expose ID, title, and date; staff rows add patient identity and explicit edit/delete actions. Mobile adaptations keep the title and actions available while allowing IDs to truncate or move beneath the patient name.

## Do's and Don'ts

### Do:

- **Do** use Archive Blue only for primary actions, focus, links, and compact state emphasis.
- **Do** keep the record count and collection title visible before the table body.
- **Do** use tabular numerals and IBM Plex Mono for IDs and dates.
- **Do** preserve one-pixel rules and soft ambient shadows around functional panels.
- **Do** test the real table at 390px and keep the title/action path reachable.

### Don't:

- **Don't** use gradients, glass, glows, or decorative blobs to create hierarchy.
- **Don't** use a serif display face for product labels or record data.
- **Don't** hide record IDs, titles, or actions behind hover-only controls.
- **Don't** add clinical claims, production-security claims, or mock record content.
- **Don't** replace standard form and dialog affordances with custom interaction patterns.
