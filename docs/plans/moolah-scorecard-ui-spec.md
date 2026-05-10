# Moolah Founder Scorecard UI Spec

Generated on 2026-04-26

## Purpose

Bridge the existing strategy, metrics, and design guidance into one implementable founder scorecard spec.

This screen is:

- snapshot-driven
- operational
- restrained
- human, but only slightly
- explicit about freshness

This screen is not:

- a mythology portal
- a vanity dashboard
- a place for AI-written “insight” paragraphs

## Governing Inputs

- [docs/DESIGN.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/DESIGN.md)
- [docs/plans/huddle-metrics-and-classification-2026-04-24.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/huddle-metrics-and-classification-2026-04-24.md)
- [docs/plans/moolah-design-review-2026-04-24.md](/Users/opera_user/Documents/Codex%20Space/Moolah%20League/docs/plans/moolah-design-review-2026-04-24.md)

## Page Order

Per `DESIGN.md`, the founder dashboard order is:

1. health summary
2. key operating metrics
3. changes / momentum
4. lower-priority evidence and breakdowns

That becomes the concrete page structure below.

## Global Rules

### Freshness rail

Always show:

- `Last updated: {timestamp} UTC`

Component type:

- timestamp chip in the header

If the latest snapshot is stale:

- show a warning chip next to the timestamp
- label: `Stale snapshot`
- body copy: `Showing the last completed snapshot. New data has not landed yet.`

If no snapshot exists:

- label: `No snapshot yet`
- body copy: `The scorecard fills once the first snapshot job runs.`

### Label posture

All labels must be plain and operational.

Good:

- `World Cup entries: 43`
- `Discord completion: 91%`
- `Colombo local core: 18`

Bad:

- `Momentum is building`
- `The club is thriving`
- `Community magic`

### Allowed component types

- number
- percentage
- trend indicator
- timestamp
- simple ledger row
- compact section table

Avoid decorative widgets unless they improve scan speed.

## Section 1: Health Summary

### Job

Answer: is the club getting stronger right now?

### Components

Top summary band with four primary metrics.

#### 1. World Cup entries

- metric key: `world_cup_entries`
- component type: number
- optional secondary component: trend indicator if prior snapshot exists
- label copy: `World Cup entries`

Empty state:

- `No entries yet`
- detail: `This fills once the first paid or confirmed entry lands in the snapshot pipeline.`

Stale state:

- keep the number visible
- add stale chip at section level, not per card

#### 2. Discord completion

- metric key: `discord_join_completion`
- component type: percentage
- optional secondary component: trend indicator
- label copy: `Discord completion`

Empty state:

- `No onboarding completions yet`
- detail: `This appears once paid members begin completing the Discord handoff.`

Stale state:

- same as above; no extra copy beyond stale chip

#### 3. Colombo local core

- metric key: `density_colombo_local_core`
- component type: number
- label copy: `Colombo local core`

Empty state:

- `Not classified yet`
- detail: `This fills once founder classifications or automatic rules begin landing.`

Stale state:

- section stale chip only

#### 4. Moolah active core

- metric key: `density_huddle_active_core`
- component type: number
- label copy: `Moolah active core`

Empty state:

- `No active-core snapshot yet`
- detail: `This appears after the first active-core calculation runs.`

Stale state:

- section stale chip only

## Section 2: Key Operating Metrics

### Job

Show the numbers founders actually make decisions from.

### Components

Operational ledger or grouped metric blocks.

#### Funnel

##### Landing to join click

- metric key: `funnel_landing_to_join_click`
- component type: percentage
- label copy: `Landing to join click`

Empty state:

- `No funnel data yet`

Stale state:

- keep last percentage

##### Join click to paid entry

- metric key: `funnel_join_click_to_paid_entry`
- component type: percentage
- label copy: `Join click to paid entry`

Empty state:

- `No paid-entry conversion yet`

Stale state:

- keep last percentage

##### Paid entry to Discord complete

- metric key: `funnel_paid_entry_to_discord_complete`
- component type: percentage
- label copy: `Paid entry to Discord complete`

Empty state:

- `No completed handoffs yet`

Stale state:

- keep last percentage

#### Density

##### Colombo orbit

- metric key: `density_colombo_orbit`
- component type: number
- label copy: `Colombo orbit`

Empty state:

- `No orbit classifications yet`

Stale state:

- keep last number

#### Return intent

##### Next league intent

- metric key: `next_league_intent`
- component type: percentage
- label copy: `Next league intent`

Empty state:

- `No signal yet`
- detail: `This appears once the product begins capturing explicit or inferred return intent.`

Stale state:

- keep last percentage

## Section 3: Changes / Momentum

### Job

Show movement, not just totals.

### Components

Compact trend rows tied to the same core metrics, never a separate ornamental chart wall.

Metrics shown here:

- `world_cup_entries`
- `discord_join_completion`
- `density_colombo_local_core`
- `density_huddle_active_core`

For each:

- primary component: trend indicator
- optional secondary component: reference text

Examples:

- `vs last snapshot: +6`
- `vs last week: flat`
- `vs last snapshot: -2`

If prior snapshot does not exist:

- label: `No comparison yet`

If section is stale:

- label: `Change view paused`
- detail: `Movement is shown against the last completed snapshot only.`

## Section 4: Lower-Priority Evidence And Breakdowns

### Job

Keep supporting evidence visible without letting it dominate.

### Components

Simple table or narrow metric stack.

Show:

- `density_colombo_orbit`
- `next_league_intent`
- `funnel_landing_to_join_click`
- `funnel_join_click_to_paid_entry`
- `funnel_paid_entry_to_discord_complete`

This section can also include:

- one compact note about classification freshness
- one compact note about snapshot completeness

Allowed support copy:

- `Founder-edited classifications may lag the latest join activity.`
- `Some metrics are still driven by manual or semi-manual classification.`

Not allowed:

- narrative summaries
- “insights”
- mythology language

## Empty And Stale Behavior By Section

### Health Summary

Empty:

- show four empty cards with explicit placeholders
- explain that the snapshot pipeline has not produced usable rows yet

Stale:

- keep values visible
- show `Stale snapshot` once at section level

### Key Operating Metrics

Empty:

- show the ledger structure anyway
- placeholder values read as `No data yet`

Stale:

- keep values visible
- no dramatic warning language

### Changes / Momentum

Empty:

- show `No comparison yet`

Stale:

- show `Change view paused`

### Lower-Priority Evidence

Empty:

- show a single note: `Breakdowns appear once the first snapshots and classifications land.`

Stale:

- keep the evidence, but add `Using last completed snapshot`

## What Is Explicitly Not On This Screen

Do not include:

- titles
- rivalry records
- mythology
- lore moments
- hall-of-fame treatment
- fake AI summaries
- vanity reach metrics with no operating consequence
- decorative founder pep talk copy

This is not the member world.

This is not a brand page.

This is the operating instrument.

## Copy Style Reference

Use:

- `World Cup entries: 43`
- `Discord completion: 91%`
- `Colombo local core: 18`
- `Last updated: 08:42 UTC`
- `vs last snapshot: +6`

Avoid:

- `The club is heating up`
- `Momentum feels strong`
- `Community energy is high`

## Final Rule

If a metric does not help a founder decide:

- whether acquisition is working
- whether onboarding is completing
- whether density is strengthening

it does not belong on the scorecard.
