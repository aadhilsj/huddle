# Moolah Engineering Review

Generated from `/plan-eng-review` on 2026-04-24
Branch: `unknown`
Scope mode: `Tranche 1`

## Reviewed Inputs

- [moolah-design-2026-04-23.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-design-2026-04-23.md)
- [moolah-ceo-plan-2026-04-23.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-ceo-plan-2026-04-23.md)

## Step 0: Scope Reduction

The full company vision is too broad to engineer as one launch plan. The first executable tranche should be:

- public World Cup landing funnel
- payment flow
- guided Discord onboarding
- minimal member identity layer
- founder scorecard

### Explicitly not in Tranche 1

- full mythology portal
- deep cross-sport profile system
- full sponsor operating stack
- broad club-wide partner model
- deep Discord engagement ingestion
- live ESPN / GridRival API integrations

## What Already Exists

- ESPN, GridRival, and other fantasy platforms already provide the competition engine
- Discord already provides the live social layer
- Instagram and launch video provide the acquisition surface concept
- bots already provide early engagement gamification
- league operations already prove that status, lore, and rivalry matter

## Architecture Recommendation

Use one owned app with multiple surfaces, not multiple apps.

- public site
- checkout/payment flow
- member system
- Discord sync layer
- founder scorecard
- later member portal surfaces

### Source of truth

The owned app database should be the source of truth.

Discord should be the projection layer.

That owned system should track:

- member identity
- Discord user mapping
- payment status
- competition memberships
- source attribution
- city model
- club layer
- onboarding state

### System architecture

```text
                    ┌──────────────────────────────┐
                    │        Instagram / Reels      │
                    └──────────────┬───────────────┘
                                   │
                                   v
                    ┌──────────────────────────────┐
                    │        Public Site            │
                    │  - World Cup landing          │
                    │  - current leagues            │
                    │  - proof / FAQ / story        │
                    └──────────────┬───────────────┘
                                   │
                                   v
                    ┌──────────────────────────────┐
                    │        Checkout Layer         │
                    │  - payment intent/session     │
                    │  - confirmation               │
                    └──────────────┬───────────────┘
                                   │
                                   v
                    ┌──────────────────────────────┐
                    │        Member System          │
                    │  source of truth              │
                    │  - member record              │
                    │  - source attribution         │
                    │  - city model                 │
                    │  - club layer                 │
                    │  - competition membership     │
                    │  - onboarding status          │
                    └──────────────┬───────────────┘
                                   │
                      ┌────────────┴────────────┐
                      │                         │
                      v                         v
        ┌──────────────────────────┐   ┌──────────────────────────┐
        │    Discord Sync Layer    │   │   Founder Scorecard      │
        │ - invite / link          │   │ - density metrics        │
        │ - roles                  │   │ - conversion metrics     │
        │ - onboarding recovery    │   │ - growth metrics         │
        └──────────────────────────┘   └──────────────────────────┘
                                   │
                                   v
                    ┌──────────────────────────────┐
                    │        Member Surfaces        │
                    │  - portal / identity          │
                    │  - world-first home           │
                    │  - future lore expansion      │
                    └──────────────────────────────┘
```

## Domain Model Recommendation

Do not build a rich mythology schema yet.

Use a right-sized Tranche 1 domain set:

- `members`
- `competition_memberships`
- `payments`
- `onboarding_events`
- `metric_snapshots` or equivalent

Keep route handlers thin. Put multi-step flows in a small orchestration layer:

- payment confirmation
- onboarding
- Discord sync
- scorecard generation

Do not build a giant workflow engine.

## Join Flow Recommendation

Payment and onboarding must be separated into a recoverable two-step flow.

### Failure path

```text
User pays
  |
  v
Payment confirmed
  |
  v
Member record created  ----X----> Discord sync fails
  |                              |
  |                              v
  |                     onboarding_status = "action_required"
  |                              |
  v                              v
Founder/admin retry      user sees clear next-step / support path
```

This prevents the worst early trust failure: paid but stranded members.

## Test Review

### Critical coverage required

- full E2E coverage for payment -> onboarding
- integration coverage for duplicate payment confirmation
- integration coverage for onboarding failure and retry
- source attribution tests
- city classification tests
- strong correctness coverage for founder scorecard

### Coverage diagram

```text
NEW UX FLOWS
[1] Instagram click -> landing page -> payment -> success
[2] Paid user -> Discord join -> role assignment -> onboarding complete
[3] Paid user -> Discord join failure -> recovery path
[4] Founder -> scorecard view

NEW DATA FLOWS
[5] Source attribution captured from campaign/referral
[6] Payment confirmation -> member record write
[7] Member record -> Discord projection
[8] Member activity -> scorecard aggregation
[9] City classification -> Colombo Local / Orbit / Global

NEW CODEPATHS
[10] payment success
[11] payment failure
[12] duplicate payment / retry submit
[13] onboarding success
[14] onboarding partial failure
[15] onboarding retry/manual recovery
[16] missing Discord link
[17] scorecard query / aggregation
[18] empty-state founder dashboard

NEW ERROR / FAILURE PATHS
[19] payment provider timeout
[20] webhook or confirmation arrives twice
[21] Discord API failure / bot permissions failure
[22] member created, Discord sync not completed
[23] malformed or missing campaign/source data
[24] scorecard reads incomplete data snapshot
```

### Failure modes

```text
CODEPATH                               | FAILURE MODE                          | TEST? | ERROR HANDLING? | USER SEES?
payment confirmation                   | duplicate callback creates dupe user  | yes   | must exist      | clear, clean success
payment confirmation                   | timeout / partial confirmation        | yes   | must exist      | retry / pending state
member record -> Discord sync          | bot/API failure                       | yes   | must exist      | action-required state
Discord onboarding                     | user never links account              | yes   | must exist      | clear next-step prompt
campaign attribution                   | missing / malformed source            | yes   | must exist      | graceful fallback
founder scorecard                      | stale / partial snapshot              | yes   | must exist      | timestamp + caveat
member portal summary                  | missing imported stats/history        | yes   | should exist    | incomplete but clear state
```

Critical gaps flagged during review: `0`, assuming the implementation includes the recovery states and tests above.

## Performance Review

### Founder scorecard

Serve the founder scorecard from snapshots, not live aggregation.

Why:

- faster renders
- easier tests
- stable metrics
- easier debugging

Always show `last updated at`.

### Member portal / identity pages

Do not compute all lore, rivalry, and profile data on demand.

Use lightweight read models or summary tables for:

- profile summary
- league history summary
- head-to-head summary

### Third-party data

Do not block Tranche 1 on live ESPN or GridRival integrations.

Use manual/import-based ingestion first, with a future seam for live sync.

## Parallelization Strategy

| Step | Modules touched | Depends on |
|------|-----------------|------------|
| Public funnel | public-site/, checkout/, content/ | — |
| Member core | members/, payments/, onboarding/ | — |
| Discord projection | discord-sync/, onboarding/ | Member core |
| Founder scorecard | metrics/, dashboard/ | Member core |
| Portal summaries | portal/, summaries/, imports/ | Member core |

### Lanes

- Lane A: Public funnel -> checkout
- Lane B: Member core
- Lane C: Founder scorecard
- Lane D: Portal summaries
- Lane E: Discord projection

### Recommended execution order

Launch Lane A + Lane B in parallel.

After Member core stabilizes, launch Lane C + Lane D + Lane E in parallel.

### Conflict flags

- `onboarding/` is shared between Member core and Discord projection
- `members/` is shared between Member core, scorecard, and portal summaries

Member core is the anchor lane.

## Deferred Engineering TODO

### Discord engagement ingestion after funnel stability

Discord XP / engagement data should be integrated after the core funnel, member system, onboarding, and scorecard are stable.

Why:

- community status is not only competition status
- future rewards may need “powered the club” signals
- scorecard should eventually reflect engagement, not just competition/payment

This was deliberately deferred from Tranche 1.

## Opinionated Recommendation

Build a thin owned club layer around Discord and third-party fantasy engines, and make that layer trustworthy, recoverable, and measurable before you make it deep.

That is the engineering center of gravity for Moolah.
