# Moolah Design Review

Generated from `/plan-design-review` on 2026-04-24
Branch: `unknown`
Scope mode: `Tranche 1`

## Reviewed Inputs

- [moolah-design-2026-04-23.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-design-2026-04-23.md)
- [moolah-ceo-plan-2026-04-23.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-ceo-plan-2026-04-23.md)
- [moolah-eng-review-2026-04-24.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-eng-review-2026-04-24.md)

## Step 0

Initial design score: `4/10`

The product idea is strong, but the UI plan was too abstract. The main risk was not bad taste. It was that an implementer could build something technically correct but visually generic and emotionally flat.

Main gaps found at the start:

- public-site hierarchy was still too loose
- no defined member-facing home between payment and the future portal
- weak user-facing state design for onboarding
- not enough visual specificity to avoid generic SaaS layouts
- no Moolah-specific design system on disk
- mobile and accessibility behavior under-specified

## Pass 1: Information Architecture

Score: `4/10 -> 8/10`

### Locked decisions

- Public site hero should be **World Cup-first**
- Tranche 1 should include a **lightweight member foyer**

### Information hierarchy

#### Public funnel

```text
1. Hero
   - Moolah brand
   - World Cup competition headline
   - one supporting sentence
   - primary CTA cluster
   - one dominant visual anchor

2. Why this is different
   - not just fantasy
   - real people, real stakes, real club energy

3. Social proof / trust
   - league history
   - member proof
   - city gravity

4. What happens after you join
   - pay
   - enter Discord
   - complete setup
   - start your Moolah identity

5. Deeper club thesis
   - rivalry
   - mythology
   - city-first club future
```

#### Member-side structure

```text
Post-payment success
  -> onboarding / Discord linking
  -> member foyer
     - identity basics
     - current competitions
     - onboarding status
     - next actions
     - one small taste of club world
  -> later richer profile / portal
```

### Why this matters

This keeps the outer funnel concrete and the inner experience owned. It avoids the common failure mode where the landing page tries to sell five futures at once and the paid member experience has no real front door.

## Pass 2: Interaction State Coverage

Score: `3/10 -> 8/10`

### Locked decisions

- Payment and onboarding need **full user-facing state coverage**
- Empty member home should be **warm and aspirational**, not sterile and not fake-deep

### State table

```text
FEATURE                       | LOADING                            | EMPTY                                      | ERROR                                 | SUCCESS                               | PARTIAL
-----------------------------|------------------------------------|--------------------------------------------|---------------------------------------|---------------------------------------|--------------------------------------------
Public CTA -> checkout       | clear progress, no dead click      | n/a                                        | concise failure, retry path           | moves into payment confirmation       | n/a
Payment confirmation         | "confirming your spot"             | n/a                                        | payment unclear, retry / contact path | "you're in" + next step               | paid recorded, next system still pending
Discord link / join          | linking Discord account            | not linked yet, explain why it matters     | link failed, retry button             | linked and ready for club access      | linked but role/setup still running
Role assignment / onboarding | setting up your access             | no current roles yet, explain next step    | action-required state, support path   | onboarding complete                   | member created but Discord sync incomplete
Member foyer                 | loading profile / season status    | warm "history starts here" orientation     | couldn't load data, retry / fallback  | identity basics + current season info | some sections available, some pending
Founder scorecard            | loading latest snapshot            | explain no data yet and what populates it  | snapshot failed / stale warning       | snapshot with last updated timestamp  | partial snapshot with caveat
```

### Empty-state posture

For the member foyer, early emptiness should feel like:

- `you are early, not missing out`
- `your history builds from here`
- `here are the next actions that create identity`

It should not say `No data found.` It should not fake trophies the user has not earned.

## Pass 3: User Journey & Emotional Arc

Score: `5/10 -> 8/10`

### Locked decisions

- Post-payment onboarding should feel like **initiation with clarity**
- Founder scorecard should be **operational but human**, with a restrained touch of club identity

### Journey storyboard

```text
STEP | USER DOES                       | USER FEELS                          | PLAN RESPONSE
-----|---------------------------------|-------------------------------------|-----------------------------------------------
1    | Lands from Instagram            | curiosity, skepticism               | sharp World Cup-first hero, clear CTA
2    | Scans the page                  | deciding if this is real            | trust proof, social proof, deeper club cues
3    | Pays                            | risk, commitment                    | clean payment flow, no fog
4    | Sees post-payment screen        | relief + "what did I just join?"    | "you're in" initiation with immediate clarity
5    | Links Discord / completes setup | hope mixed with fragility           | explicit progress states and recovery states
6    | Enters member foyer             | orientation, first belonging        | identity basics, next actions, future depth
7    | Founder opens scorecard         | need for truth, not theater         | restrained metrics view with community signal
```

### Time-horizon design

- `5 seconds`: this is a live competition with stakes
- `5 minutes`: I understand how to join and what happens next
- `5 months`: I feel part of a club with growing identity and history

## Pass 4: AI Slop Risk

Score: `3/10 -> 8/10`

### Locked decisions

- Public landing page should use a **poster-like campaign hero**
- Member foyer and founder dashboard should have **shared DNA, different posture**

### Anti-slop direction

#### Public site

Treat the first viewport like a campaign poster, not a SaaS dashboard.

Use:

- one dominant composition
- strong type
- one visual anchor
- minimal chrome
- one CTA group

Avoid:

- feature-card grid near the top
- icons in colored circles
- centered-everything startup layout
- dashboard-preview hero
- generic “clean modern sports tech” look

#### Internal surfaces

- **Member foyer:** more atmosphere, more identity framing, warmer sense of entry
- **Founder dashboard:** clearer hierarchy, calmer utility language, more restraint

Shared system roots should still hold:

- same brand DNA
- same type system
- same color logic
- same general product voice

## Pass 5: Design System Alignment

Score: `2/10 -> 8/10`

### Locked decision

- Create a **Moolah `DESIGN.md` before implementation**

### Current reality

There is no Moolah-specific `DESIGN.md` in the workspace yet. The only existing design system file is [gstack/DESIGN.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/gstack/DESIGN.md), which is for gstack and should not be reused as Moolah’s system.

### Required Moolah design system topics

- brand posture
- typography
- color system
- layout principles
- motion rules
- public-site rules
- member-surface rules
- founder-surface rules
- anti-slop blacklist
- responsive and accessibility floors

## Pass 6: Responsive & Accessibility

Score: `2/10 -> 8/10`

### Locked decisions

- Public funnel should be **mobile-first**
- Tranche 1 should commit to a **strong baseline accessibility spec**

### Responsive rules

Instagram-led acquisition means phone screens are primary.

The plan should explicitly define:

- hero composition for phone widths
- headline length discipline on mobile
- CTA cluster above the fold
- image cropping / suppression rules
- mobile section order
- nav behavior on mobile
- member foyer mobile layout priorities

### Accessibility baseline

Tranche 1 should require:

- body text at readable sizes
- strong contrast floors
- visible keyboard focus states
- reduced-motion support
- minimum `44px` touch targets
- persistent labels, not placeholder-only inputs
- readable status language for success, pending, and failure states

## Pass 7: Unresolved Design Decisions

Resolved: `1`
Deferred: `0`

### Locked decision

- Transition from public site to member foyer should feel like a **threshold crossing**

### Transition rule

The member foyer should feel like entering the club:

- clear shift in hierarchy and atmosphere
- still recognizably the same brand
- not a totally separate product
- not a soft blur where the user barely notices they crossed inside

## Required Design Additions To The Plan

Before implementation starts, the plan should explicitly include:

1. Public funnel information hierarchy
2. Member foyer scope and page structure
3. User-facing onboarding state table
4. Journey storyboard with emotional arc
5. Anti-slop visual rules for public and internal surfaces
6. Mobile-first specs for the acquisition funnel
7. Accessibility baseline
8. Threshold-transition guidance between public and member spaces

## NOT in scope

- Full mythology portal in Tranche 1  
  Why: the foyer should bridge the gap now, while the deeper portal arrives later.

- Deep personal profile and rivalry/history system in Tranche 1  
  Why: those belong to the next layer of identity depth, not the first shipping pass.

- Live fantasy-platform visual integrations  
  Why: imported/manual data is enough for the first member-facing experience.

- Fully distinct founder and member product brands  
  Why: the surfaces should differ in posture, not fragment into separate products.

## What already exists

- The product strategy already clearly defines the emotional truth: belonging outside, glory at conversion, mythology inside.
- The eng review already defines the Tranche 1 surfaces and trust-critical states at a systems level.
- No Moolah design system file exists yet.
- The existing [gstack/DESIGN.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/gstack/DESIGN.md) is unrelated and should not be treated as Moolah’s source of truth.

## TODO candidate

### Create Moolah `DESIGN.md`

**What:** Write a Moolah-specific design system file before implementation begins.

**Why:** The product now has enough UI surface area that public, member, and founder views need one explicit visual foundation.

**Pros:** Reduces drift, speeds implementation, keeps the three surfaces coherent.

**Cons:** Adds one more planning artifact before code starts.

**Context:** This review locked major visual decisions, but they still need a durable home outside the review doc.

**Depends on / blocked by:** This design review being accepted.

## Completion Summary

```text
+====================================================================+
|         DESIGN PLAN REVIEW — COMPLETION SUMMARY                    |
+====================================================================+
| System Audit         | No Moolah DESIGN.md, UI scope is real       |
| Step 0               | 4/10 initial, major specificity gaps        |
| Pass 1  (Info Arch)  | 4/10 -> 8/10 after fixes                    |
| Pass 2  (States)     | 3/10 -> 8/10 after fixes                    |
| Pass 3  (Journey)    | 5/10 -> 8/10 after fixes                    |
| Pass 4  (AI Slop)    | 3/10 -> 8/10 after fixes                    |
| Pass 5  (Design Sys) | 2/10 -> 8/10 after fixes                    |
| Pass 6  (Responsive) | 2/10 -> 8/10 after fixes                    |
| Pass 7  (Decisions)  | 1 resolved, 0 deferred                      |
+--------------------------------------------------------------------+
| NOT in scope         | written (4 items)                           |
| What already exists  | written                                     |
| TODOS.md updates     | 1 item proposed                             |
| Approved Mockups     | 0 generated, 0 approved                     |
| Decisions made       | 12 added to plan                            |
| Decisions deferred   | 0                                           |
| Overall design score | 4/10 -> 8/10                                |
+====================================================================+
```

## Verdict

The plan is now design-directionally solid enough to implement, but it still needs one foundational artifact before coding starts: a Moolah-specific `DESIGN.md`.

Best next steps:

1. create the Moolah design system
2. optionally run `/design-shotgun` if you want visual exploration before implementation
3. then implement against this review plus the eng review
