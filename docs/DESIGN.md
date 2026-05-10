# Design System — Moolah

## Product Context

- **What this is:** A city-first sports club with a paid competition funnel, a member identity layer, and a founder operating view.
- **Who it's for:** Prospects discovering Moolah through sports content, paying members entering the club, and founders running the system.
- **Space/industry:** Sports culture, membership products, community software, and lightweight club operations.
- **Project type:** Marketing funnel + member foyer + founder dashboard inside one owned product.

## Brand Thesis

Moolah is not fantasy software with better branding. It is a sports club whose first wedge happens to be competition.

That means the design system has to hold three truths at once:

- **Public truth:** friendship, distance, belonging, human connection
- **Conversion hook:** glory, rivalry, competition, stakes
- **Inner world:** mythology, status, identity, history

The system should feel:

- premium, not flashy
- athletic, not corporate
- social, not chaotic
- serious enough for real stakes
- warm enough to feel like a club

## Aesthetic Direction

- **Direction:** Editorial sports poster outside, restrained club product inside
- **Decoration level:** Intentional and low. Every decorative move must strengthen atmosphere or hierarchy.
- **Mood:** A living sports world with receipts, rituals, and memory. Not a startup selling workflows.
- **Reference posture:** Premium sports campaign, magazine spread, private members club, and calm operational software

### Design principle

The public site should feel like a poster.  
The member foyer should feel like entering the club.  
The founder dashboard should feel like the instrument panel of that club.

## Surface Model

There are three surface types. They share one system, but not one posture.

### 1. Public Funnel

- Job: convert interest into paid entry
- Feel: campaign-like, atmospheric, sharp, legible
- Priority: composition over chrome
- Tone: direct, magnetic, not overloaded

### 2. Member Foyer

- Job: orient a newly admitted member and begin identity formation
- Feel: warm threshold crossing, more atmospheric than utilitarian
- Priority: belonging first, then orientation
- Tone: admitted, not processed

### 3. Founder Dashboard

- Job: show whether the club is getting stronger
- Feel: disciplined, restrained, decision-ready
- Priority: truth and signal clarity
- Tone: operational but human, with only a slight club accent

## Typography

Avoid default SaaS typography. Moolah needs a sports-culture voice with discipline.

- **Display / Hero:** `Bebas Neue` or `Anton`
  - Use for campaign headlines, season lockups, and high-impact moments
  - All caps is acceptable in hero contexts if spacing and hierarchy stay controlled
- **Body / UI:** `Manrope`
  - Use for body text, interface copy, labels, and navigation
  - Clean, readable, modern, without feeling like a default startup stack
- **Data / Secondary Utility:** `IBM Plex Mono`
  - Use sparingly for metrics, score labels, timestamps, ranks, and system states
  - This is the “receipt” font, not the personality font for the whole product

### Typography rules

- Use at most **two dominant voices** on a given screen: display + body
- Monospace is an accent for facts and system evidence
- Do not center everything
- Hero type can be loud, but supporting copy must stay disciplined
- Long-form body copy should stay in `Manrope`, never in the display face

### Suggested scale

- Hero: `clamp(44px, 9vw, 92px)`
- H1: `56px`
- H2: `36px`
- H3: `26px`
- H4: `20px`
- Body: `16px`
- Small: `14px`
- Caption: `13px`
- Utility mono: `12px-13px`

### Density rules

- Public funnel can use larger type and more dramatic spacing
- Member foyer should still feel breathable
- Founder dashboard should be denser, but never cramped

## Color System

Avoid purple gradients, generic tech blues, and one-note flat white pages.

### Core palette

- **Night:** `#0E1116`
  - Primary dark background
- **Coal:** `#171B22`
  - Elevated dark surface
- **Bone:** `#F6F1E8`
  - Warm light background
- **Paper:** `#FFFDF8`
  - Light surface
- **Ink:** `#111111`
  - Primary text on light
- **Mist:** `#C9C1B5`
  - Muted text / separators on dark

### Brand accents

- **Club Gold:** `#D4A63A`
  - Use sparingly for emphasis, rank, and ceremonial accents
- **Pitch Green:** `#1E6B4C`
  - Use for grounded vitality, positive motion, and selected sports cues
- **Arena Red:** `#A63A32`
  - Use for stakes, rivalry accents, warnings, and urgency

### Semantic colors

- Success: `#2E8B57`
- Warning: `#C9891A`
- Error: `#B24134`
- Info: `#356C9B`

### Color posture by surface

- **Public funnel:** dark-first or deep-toned with controlled warm contrast
- **Member foyer:** dark or warm-dim, atmospheric but readable
- **Founder dashboard:** can be dark or light, but must prioritize legibility over drama

### Color rules

- Brand accent should feel earned, not sprayed everywhere
- Gold is for signal and ritual, not constant decoration
- Green should not make the product feel like fintech
- Red should feel like tension or consequence, not default branding
- Never use blue-to-purple startup gradients

## Backgrounds and Texture

Flat single-color backgrounds are banned on major landing surfaces.

Use:

- subtle tonal gradients
- field-light textures
- restrained photographic or graphic anchors
- layered darkness with warm contrast

Do not use:

- decorative blobs
- floating gradient orbs
- wavy section dividers
- abstract AI wallpaper with no narrative job

### Public background direction

The hero should feel like a sports campaign environment:

- floodlit darkness
- stadium-adjacent atmosphere
- print-poster composition
- possibly a single anchored image or textured graphic field

### Product background direction

Member and founder surfaces should be calmer:

- dark layered panels or warm off-white planes
- restrained texture only
- no ornamental gradients fighting the content

## Layout

### Global approach

- One app, multiple surfaces
- Shared grid discipline
- Different composition behavior by surface

### Public funnel layout

- Full-bleed hero
- Strong vertical rhythm
- One job per section
- Limited section count on the first marketing pass
- Use composition, not cards, to create hierarchy

### Member foyer layout

- Top section should feel like arrival
- Then current status and next actions
- Then one taste of deeper club identity
- Avoid dashboard-card mosaics

### Founder dashboard layout

- Strong hierarchy around the few metrics that matter
- Metrics grouped by operating question, not by arbitrary widget count
- Data density is acceptable if the page remains scannable

### Grid

- Desktop: 12-column grid
- Tablet: 6-8 practical columns depending on section
- Mobile: 1 column with deliberate stacking, not auto-collapse guesswork

### Max width

- Marketing content: `1200px-1320px`
- Product surfaces: `1280px`
- Dense data modules: use narrower inner rails where readability improves

## Spacing

- **Base unit:** `4px`
- **Scale:** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`

### Spacing posture

- Public funnel: roomy and compositional
- Member foyer: balanced, with enough air to feel premium
- Founder dashboard: tighter, but still generous enough to scan quickly

## Shape Language

- Border radius should be restrained
- Use sharper edges than a generic bubbly SaaS product

Suggested radii:

- Panels: `10px-14px`
- Buttons and inputs: `8px-10px`
- Pills / badges: `9999px`

Rule:

- not every surface needs a container
- not every container needs a visible border
- not every module deserves a card

## Motion

Motion should support hierarchy and atmosphere, not decorate emptiness.

### Required motion categories

- entrance / load reveal
- hover or reveal on key actions
- one atmospheric motion on the public funnel

### Motion rules

- Public funnel can have 2-3 meaningful motions
- Member foyer should use subtle arrival motion
- Founder dashboard should use minimal utility motion only
- Respect reduced-motion preferences everywhere

### Suggested timing

- Micro: `80-120ms`
- Short: `160-220ms`
- Medium: `260-360ms`

### Avoid

- bouncing cards
- constant pulsing decorations
- parallax for its own sake
- long animated delays before content becomes readable

## Components

### Hero

- Treat as a poster composition, not a content pile
- Only the essential elements belong above the fold
- One dominant visual anchor
- One CTA cluster

### Buttons

- Clear, assertive, not toy-like
- Primary button should feel like a commitment
- Secondary button should still feel intentional, not ghosted into irrelevance

### Navigation

- Marketing nav should stay minimal
- Member nav should clearly mark “inside the club”
- Founder nav should optimize orientation and speed

### Panels

- Use panels only when grouping materially improves comprehension
- Product panels should feel structural, not ornamental

### Tables / score blocks

- Founder dashboard can use table or ledger patterns where useful
- Typography and alignment matter more than decoration

### Status blocks

Critical for Tranche 1:

- pending
- success
- action required
- partial completion

These blocks must be designed as real UI moments, not browser-default alerts.

## Interaction State Direction

### Public funnel

- Loading should feel intentional, not stalled
- CTA clicks should always acknowledge action immediately

### Payment and onboarding

The emotional sequence is:

1. commitment
2. confirmation
3. admission
4. setup
5. orientation

The design system must support:

- a clear pending state
- a strong “you’re in” state
- a recoverable action-needed state
- support without panic language

### Member foyer empty state

The correct tone is:

- early
- promising
- honest

The wrong tone is:

- empty and sterile
- fake-deep mythology
- generic “no data”

### Founder dashboard empty or stale state

Tone should be:

- calm
- explicit
- not alarming unless something is truly broken

## Information Architecture Rules

### Public funnel order

1. competition offer
2. why this is alive and different
3. trust / proof
4. what happens next
5. deeper club thesis

### Member foyer order

1. admission / belonging cue
2. current status
3. next actions
4. first taste of identity depth

### Founder dashboard order

1. health summary
2. key operating metrics
3. changes / momentum
4. lower-priority evidence and breakdowns

## Responsive Rules

Mobile is primary for the public funnel.

### Mobile-first requirements

- Hero headline must stay strong at narrow widths
- Primary CTA must remain above the fold on common phone sizes
- Visual anchor must not bury the message
- Section order must preserve the selling sequence
- Navigation must stay extremely simple

### Member foyer mobile

- prioritize orientation, status, next action
- do not force a dashboard mosaic onto small screens
- one clear next action must remain obvious without scrolling forever

### Founder dashboard mobile

- mobile support matters, but desktop is the main operating surface
- on mobile, preserve hierarchy rather than mirroring every dense layout choice

## Accessibility Rules

This is a baseline, not a future cleanup task.

- Body text minimum: `16px`
- Minimum touch target: `44px`
- Visible focus state on every interactive control
- Strong text contrast on all primary copy
- Never rely on color alone to communicate state
- Support reduced motion
- Labels must remain visible even after fields are filled
- Status language must be plain and unambiguous
- Links should preserve visited-state distinction

## Voice and Copy

### Public copy

- concrete
- sharp
- confident
- no startup filler

Use:

- direct sports language
- belonging language
- real stakes
- real-world social energy

Avoid:

- “unlock the power of”
- “all-in-one”
- “reimagine your”
- vague modern-brand fog

### Member copy

- admitted
- oriented
- quietly proud

### Founder copy

- operational
- plain
- slightly human

## Anti-Slop Rules

These patterns are banned unless a screen has a very strong reason to break them.

1. Blue-to-purple or purple-to-pink startup gradients
2. Three-column feature grids near the top of the page
3. Icons in colored circles as default section decoration
4. Centering every heading and paragraph
5. Same border radius on every element
6. Decorative blobs and filler shapes
7. Dashboard-card mosaics for product surfaces
8. Empty “clean modern sports platform” copy
9. Hero screens that try to say everything at once
10. Founder analytics dressed up like a fantasy hall of fame

## Tranche 1 Surface Guidance

### Public World Cup Funnel

- Lead with the live competition
- Use a poster-like hero
- One clear CTA cluster
- Deeper club story appears later, not first

### Post-Payment Onboarding

- First emotional note: `you’re in`
- Second note: `here’s what happens next`
- Never feel like a receipt wall

### Member Foyer

- Feel like crossing a threshold into the club
- Warm arrival, not full portal depth
- Identity basics, current competitions, onboarding status, next steps
- One controlled glimpse of future mythology

### Founder Scorecard

- Snapshot-driven
- Decision-oriented
- Human, but restrained
- Community vitality can appear, but never at the expense of clarity

## Implementation Notes

Create shared CSS variables for:

- backgrounds
- text colors
- accent colors
- surface layers
- spacing
- border radius
- motion timing

Recommended token groups:

- `--bg-*`
- `--fg-*`
- `--accent-*`
- `--surface-*`
- `--space-*`
- `--radius-*`
- `--motion-*`

## First Visual Test

Before implementation is considered “on system,” ask:

1. Does the public hero look like a campaign poster or a SaaS template?
2. Does the post-payment flow feel like admission, not checkout residue?
3. Does the member foyer feel owned, not like a Discord wrapper?
4. Does the founder dashboard feel clear enough to run the company?
5. Do all three surfaces clearly belong to the same brand?

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-24 | Public hero is World Cup-first | Competition clarity should lead the funnel. |
| 2026-04-24 | Poster-like public hero | The first screen must not collapse into generic sports-tech SaaS. |
| 2026-04-24 | Lightweight member foyer in Tranche 1 | Paid members need a real owned destination before the full portal exists. |
| 2026-04-24 | Onboarding tone is initiation with clarity | The first post-payment moment should feel admitted, not processed. |
| 2026-04-24 | Founder dashboard is operational but human | Founders need clarity first, with only a restrained club accent. |
| 2026-04-24 | Shared DNA, different posture across member and founder surfaces | The product should feel coherent without flattening all surfaces into one mood. |
| 2026-04-24 | Mobile is primary for the funnel | Instagram-led acquisition means phone screens are the front door. |
| 2026-04-24 | Strong accessibility baseline required | Style cannot come at the expense of usability or legibility. |
