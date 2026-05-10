# Huddle Metrics And Classification Spec

Generated on 2026-04-24

## Purpose

This answers three practical questions:

1. what data Huddle should actually store
2. which member classifications can be automatic versus founder-controlled
3. how the founder dashboard should get real numbers instead of hard-coded placeholders

## Core Principle

Track **raw facts** automatically.

Classify **fuzzy social meaning** with founder-editable rules.

Render the dashboard from **snapshots**, not hand-written copy and not fragile live calculations.

## What Should Be Stored

### 1. Members

One member record per person.

Suggested fields:

- `id`
- `full_name`
- `display_name`
- `email`
- `phone` optional
- `discord_user_id` optional
- `home_city`
- `current_city`
- `country`
- `timezone`
- `joined_at`
- `join_source`
- `join_campaign`
- `referrer_member_id` optional
- `notes` optional

### 2. Membership State

Suggested fields:

- `club_layer`
  - `community`
  - `competition_member`
  - `club_member`
- `membership_status`
  - `active`
  - `inactive`
  - `paused`
- `onboarding_status`
  - `pending`
  - `action_required`
  - `complete`

### 3. Competition Memberships

One row per member per league.

Suggested fields:

- `id`
- `member_id`
- `competition_type`
  - `fifa_world_cup`
  - `nba`
  - `f1`
  - etc
- `season_label`
- `joined_at`
- `status`
  - `joined`
  - `active`
  - `completed`
  - `dropped`
- `platform`
  - `espn`
  - `gridrival`
  - `manual`

### 4. Payments

Suggested fields:

- `id`
- `member_id`
- `competition_membership_id` optional
- `amount`
- `currency`
- `status`
  - `pending`
  - `paid`
  - `failed`
  - `refunded`
- `paid_at`
- `provider`
- `provider_reference`

### 5. Onboarding Events

Event log for trust-critical join flow.

Suggested fields:

- `id`
- `member_id`
- `event_type`
  - `payment_confirmed`
  - `discord_link_started`
  - `discord_link_completed`
  - `role_assignment_started`
  - `role_assignment_failed`
  - `onboarding_completed`
- `occurred_at`
- `metadata_json`

### 6. Engagement Facts

Keep these raw and lightweight first.

Suggested fields:

- `member_id`
- `last_competition_activity_at`
- `last_discord_seen_at` optional
- `last_payment_at`
- `competitions_joined_count`
- `competitions_completed_count`

Later, when Discord engagement ingestion is ready:

- `discord_messages_30d`
- `discord_xp_30d`
- `ritual_participation_30d`

### 7. Founder Classification Fields

These are the important ones for your question.

Suggested fields:

- `city_classification`
  - `colombo_local_core`
  - `colombo_orbit`
  - `moolah_active_core`
  - `uncategorized`
- `city_classification_source`
  - `auto`
  - `manual`
- `city_classification_confidence`
  - `high`
  - `medium`
  - `low`
- `classification_notes`

## What Should Be Automatic

These are safe to automate early:

- whether someone paid
- whether someone joined Discord
- whether onboarding completed
- whether someone is in a current league
- how many leagues they joined
- whether they were active recently
- basic source attribution

These can be calculated from facts.

## What Should Be Founder-Editable

These are partly social judgment, so do not force full automation:

- `Colombo Local Core`
- `Colombo Orbit`
- member archetype
- any “high-value member” or “future city lead” style labels

These should support:

- an automatic suggestion
- manual override
- visible reason or note

## Recommended City Logic

### Colombo Local Core

Definition:

- member has real Colombo tie
- and repeated recent participation
- and feels meaningfully inside the club

Good first-pass auto rules:

- `home_city = Colombo` or `current_city = Colombo`
- and at least one paid league joined
- and recent participation within last 60-90 days

Then allow founder override.

### Colombo Orbit

Definition:

- member is not strongly local in the same way
- but is meaningfully tied to the Colombo social graph or Colombo-centered club life

This is harder to automate cleanly.

Good early approach:

- system suggests `Colombo Orbit` if:
  - referred by Colombo member
  - frequently grouped with Colombo-led cohorts
  - or self-described Colombo tie exists in profile
- founder confirms or edits

This should not be fully trusted as automatic truth.

### Moolah Active Core

Definition:

- any member, regardless of city, who is actively participating in the club right now

This one should be mostly automatic.

Good early rule:

- paid in last 120 days
- or active competition membership right now
- or onboarding complete plus recent league participation

Later, add Discord engagement inputs when ready.

## Recommended Classification Workflow

### System side

On a schedule or after important events:

1. calculate suggested classification
2. assign confidence level
3. preserve manual overrides

### Founder side

Founder admin view should show:

- member name
- current city
- home city
- join source
- recent participation
- suggested classification
- current saved classification
- override control
- notes field

This is the clean compromise:

- automation where facts are strong
- human judgment where club meaning is fuzzy

## Dashboard Data Model

The dashboard should read from a snapshot table, not directly from raw event tables.

Suggested table:

- `metric_snapshots`

Suggested fields:

- `id`
- `snapshot_date`
- `snapshot_type`
  - `daily`
  - `weekly`
- `metric_key`
- `metric_value`
- `metric_context_json`
- `generated_at`

Example metric keys:

- `colombo_local_core_count`
- `colombo_orbit_count`
- `moolah_active_core_count`
- `world_cup_entries_paid`
- `world_cup_to_next_league_intent_rate`
- `discord_join_completion_rate`
- `landing_to_join_click_rate`
- `join_click_to_paid_rate`

## How The Dashboard Should Update

### Dynamic fields

These should update from snapshots:

- counts
- percentages
- trends
- “last updated at”

### Static copy

These should stay mostly fixed:

- section names
- metric labels
- explanatory headings

### Semi-dynamic copy

Allowed later, but only by simple rules:

- `up this week`
- `flat vs last week`
- `onboarding slipping`

Do not use fake AI “insight” copy for founders early.

## Recommended Founder Dashboard Behavior

### Good

- `World Cup entries: 43`
- `Discord completion: 91%`
- `Last updated: 08:42 UTC`
- `vs last week: +6`

### Bad

- hard-coded numbers in HTML
- vague hand-written weekly summaries
- fake certainty about fuzzy social metrics

## What To Build Next In The Actual Product

### Minimum viable admin model

1. member list
2. member detail view
3. editable city classification
4. recent participation summary
5. onboarding status

### Minimum viable dashboard pipeline

1. store raw facts
2. run daily snapshot job
3. render founder dashboard from snapshot table
4. show `last updated at`

## Recommended First Rules

Start simple.

### Rule set v1

- `Moolah Active Core`
  - paid in last 120 days OR active competition membership
- `Colombo Local Core`
  - Colombo home/current city AND paid member AND recent participation
- `Colombo Orbit`
  - founder-assigned, with optional auto-suggestion only

That is enough for the first real dashboard.

## Open Questions

- what exact time window defines “active” for Huddle
- whether “home city” or “current city” should carry more weight
- whether referral graph should influence `Colombo Orbit`
- when Discord engagement should begin affecting active-core logic

## Recommendation

Do not try to automate every fuzzy category on day one.

Build:

1. automatic raw tracking
2. automatic easy classifications
3. founder-editable fuzzy classifications
4. snapshot-based dashboard metrics

That is the boring correct foundation.
