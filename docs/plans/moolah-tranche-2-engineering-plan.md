# Moolah Tranche 2 Engineering Plan

Generated on 2026-04-26

## Purpose

Define the implementation shape for the archive / identity layer.

Tranche 1 built:

- funnel
- join flow
- auth
- foyer
- founder scorecard
- intake
- Discord linkage

Tranche 2 builds:

- identity read models
- profile pages
- sport archives
- franchise pages
- awards and rivalry structures

## Core Engineering Principle

Do not render deep archive pages directly from raw transactional tables on every request.

The Tranche 1 engineering review already pointed in this direction:

- use summary tables / read models
- do not compute all rivalry and lore on demand
- keep imports and archive depth separate from the live flow

So Tranche 2 should use:

1. source tables
2. import tables / staging
3. read models
4. surface routes

## Data Layers

### 1. Source-of-truth operational tables

Already present or adjacent:

- `members`
- `competition_memberships`
- `payments`
- `onboarding_events`

### 2. Archive domain tables

Needed next:

- `sports`
- `seasons`
- `franchises`
- `franchise_seasons`
- `member_franchises`
- `season_standings`
- `awards`
- `award_results`
- `head_to_head_results`
- `prize_records`
- `franchise_status_history`

### 3. Read models / summaries

Needed for page performance and coherence:

- `member_profile_summaries`
- `franchise_profile_summaries`
- `sport_archive_summaries`
- `season_archive_summaries`
- `head_to_head_summaries`
- `award_summary_views`

## Required entity support

### Member profile

Must support:

- one member, multiple sports
- current and past franchises
- titles
- awards
- rivalry summaries
- archived timeline

### Franchise

Must support:

- active or defunct status
- sport association
- division association if relevant
- current steward / last steward
- titles
- awards
- all-time summary

### Season

Must support:

- sport
- division
- standings
- winner
- prize notes
- award results

### Awards

Must support category types beyond champion:

- fantasy MVP
- best GM
- most cunning
- unluckiest
- future categories

### Head-to-head

Must support:

- member vs member
- franchise vs franchise
- wins / losses
- later streaks and playoff context

## Data ingestion recommendation

Do not block Tranche 2 on full automation.

Start with:

- founder/admin import seam
- CSV or structured manual ingestion
- explicit “awaiting import” states in the UI

Later:

- adapters to external fantasy sources if useful

## Route / service architecture

### Library layer

Create a Tranche 2 data layer for:

- archive hub data
- profile summary data
- franchise summary data
- sport summary data

### Surface routes

First routes:

- `/profile`
- `/history`
- `/history/nba`
- `/history/members/[slug]`
- `/history/nba/teams/[slug]`

### API / admin later

- archive imports
- archive corrections
- award entry
- rivalry note curation

## State model

Tranche 2 pages need three honest states:

- live data loaded
- partial data loaded
- bones ready, awaiting import

They should never pretend that complete history exists when it does not.

## Initial implementation phases

### Phase 1

- planning bundle
- route skeletons
- placeholder read layer
- visual differentiation

### Phase 2

- archive domain schema
- first read models
- NBA archive first

### Phase 3

- member profile summaries
- franchise summaries
- awards layer

### Phase 4

- head-to-head summaries
- defunct franchise support
- import tooling

## Risks

- building pages before defining read models creates expensive rewrites
- overusing raw tables will make archive routes brittle and slow
- faking deep history in the UI will damage trust
- trying to solve all sports equally will dilute the NBA-first depth case

## Recommendation

Build Tranche 2 as an archive system with strong summaries first, not as a collection of one-off pages.

That gives the portal somewhere durable for:

- member identity
- sport history
- franchise memory
- awards
- rivalry

to accumulate over time.
