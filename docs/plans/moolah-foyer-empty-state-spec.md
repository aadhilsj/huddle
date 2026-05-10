# Moolah Member Foyer Empty-State Spec

Generated on 2026-04-26

## Purpose

Define the first-entry foyer state before a member has any real competition history, trophies, or accumulated mythology.

This is the fragile moment where the product must feel:

- admitted
- oriented
- quietly proud

It must not feel:

- empty
- fake-deep
- overpromised

## Governing Inputs

- [docs/DESIGN.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/DESIGN.md)
- [docs/plans/moolah-design-review-2026-04-24.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-design-review-2026-04-24.md)

## Page Order

Per `DESIGN.md`, the member foyer order is:

1. admission / belonging cue
2. current status
3. next actions
4. first taste of identity depth

This spec follows that exact order.

## State Split

There are two first-entry variants:

1. onboarding still pending
2. onboarding complete, but no history yet

The structure stays similar. The status and primary action change.

## Section 1: Admission Banner

### Component type

- threshold card / arrival banner

### Heading

- `You are in.`

### Body

- `Your place is set. The history is still ahead of you, but the club already knows who you are.`

### Tone job

- make the member feel admitted
- make early-ness feel valuable, not thin

### What changes by state

If onboarding still pending:

- body becomes: `Your place is set. There is one last step before the room is fully yours.`

If onboarding complete:

- keep the original body

## Section 2: Current Status Block

### Component type

- status block with 3-4 ledger rows

### Heading

- `Current status`

### Body

- no extra paragraph required

### Rows

#### Competition

- label: `Competition`
- value before history exists: `FIFA World Cup`

#### Entry

- label: `Entry`
- value when onboarding pending: `Confirmed`
- value when onboarding complete: `Confirmed`

#### Community

- label: `Community`
- value when onboarding pending: `Still linking`
- value when onboarding complete: `Inside`

#### History

- label: `History`
- value when no history exists: `Starting now`

### Tone rule

No apology language.

Bad:

- `No history yet`
- `Nothing to show`

Good:

- `Starting now`

## Section 3: Primary Next Action Block

### Component type

- action card

### Heading

If onboarding pending:

- `Finish the handoff`

If onboarding complete:

- `Take your place properly`

### Body

If onboarding pending:

- `Your entry is confirmed. Finish the room setup so the tournament has somewhere to live.`

If onboarding complete:

- `You are through the door. Stay close to the room and let the tournament start building your record from here.`

### Primary CTA

If onboarding pending:

- CTA copy: `Finish setup`

If onboarding complete:

- CTA copy: `Open the room`

### Secondary CTA

Optional:

- `Back to home`

### Rule

There must be one obvious next move. Do not create a CTA cluster war on this screen.

## Section 4: First Identity Block

### Component type

- identity card

### Heading

- `Your history starts here`

### Body

- `No one earns mythology on day one. What matters now is that your name is in, your season is live, and the record starts from here.`

### Purpose

- reassure the member that emptiness is natural
- make the future feel earned, not fabricated

## Section 5: One Controlled Glimpse Of Future Mythology

### Component type

- single preview card or narrow banner

### What it is

One restrained preview of what eventually accumulates:

- record
- seasons entered
- finishing positions
- rivalries
- titles

### How it is presented

Heading:

- `What builds over time`

Body:

- `Seasons entered. Finishes. Receipts. Rivalries. The kind of record that only means something if it is earned.`

### Rule

This is a preview, not a fake profile.

Do not show:

- invented trophies
- empty stat grids
- fake hall-of-fame visuals

## Exact First-Entry Section Stack

### Onboarding still pending

1. Admission banner
2. Current status block
3. Primary next action block
4. Identity block
5. Controlled mythology glimpse

### Onboarding complete, no history yet

1. Admission banner
2. Current status block
3. Primary next action block
4. Identity block
5. Controlled mythology glimpse

The structure is the same because the emotional job is the same. The difference is that the main action moves from setup to participation.

## Full Copy Set

### Pending version

#### Banner

- Heading: `You are in.`
- Body: `Your place is set. There is one last step before the room is fully yours.`

#### Status

- Heading: `Current status`

Rows:

- `Competition — FIFA World Cup`
- `Entry — Confirmed`
- `Community — Still linking`
- `History — Starting now`

#### Action

- Heading: `Finish the handoff`
- Body: `Your entry is confirmed. Finish the room setup so the tournament has somewhere to live.`
- CTA: `Finish setup`

#### Identity

- Heading: `Your history starts here`
- Body: `No one earns mythology on day one. What matters now is that your name is in, your season is live, and the record starts from here.`

#### Future glimpse

- Heading: `What builds over time`
- Body: `Seasons entered. Finishes. Receipts. Rivalries. The kind of record that only means something if it is earned.`

### Complete version

#### Banner

- Heading: `You are in.`
- Body: `Your place is set. The history is still ahead of you, but the club already knows who you are.`

#### Status

- Heading: `Current status`

Rows:

- `Competition — FIFA World Cup`
- `Entry — Confirmed`
- `Community — Inside`
- `History — Starting now`

#### Action

- Heading: `Take your place properly`
- Body: `You are through the door. Stay close to the room and let the tournament start building your record from here.`
- CTA: `Open the room`

#### Identity

- Heading: `Your history starts here`
- Body: `No one earns mythology on day one. What matters now is that your name is in, your season is live, and the record starts from here.`

#### Future glimpse

- Heading: `What builds over time`
- Body: `Seasons entered. Finishes. Receipts. Rivalries. The kind of record that only means something if it is earned.`

## What This Screen Must Not Do

Do not:

- apologize for emptiness
- use generic `no data` language
- fake depth
- show mythology before it exists
- make the member feel late

The empty foyer should communicate:

- early is good
- you belong
- your record starts now
