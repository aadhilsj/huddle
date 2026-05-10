# Moolah Tranche 2 Product Plan

Generated on 2026-04-26

## Purpose

Define the next product layer after the Tranche 1 funnel, foyer, founder scorecard, and Discord onboarding.

Tranche 2 is where Huddle stops being only:

- a paid competition flow
- a member admission path
- a founder operating surface

and becomes:

- a club with memory
- a portal with identity depth
- a sports world where history, records, and rivalry can accumulate

## Core Thesis

Tranche 1 proves the club can admit people cleanly.

Tranche 2 proves the club can remember them.

The CEO plan is explicit:

- the member portal should be identity-first
- mythology, status, and history should sit at the center
- cross-sport identity should compound across seasons and sports
- the portal should feel like entering a hall of fame, not opening a settings panel

So the product job now is:

1. make personal history visible
2. make sport-specific worlds legible
3. make rivalries, awards, and titles feel permanent
4. make the archive feel like club memory, not spreadsheet residue

## Tranche 2 Scope

### In scope

- member profile surface
- sport archive surfaces
- team / franchise profile surfaces
- season archive surfaces
- awards and honors surfaces
- head-to-head surfaces
- active and defunct franchise treatment
- cross-sport identity framing
- read-model driven archive pages
- founder/admin seams for future imports and corrections

### Explicitly not in this first Tranche 2 pass

- final historical data completeness
- live ESPN / GridRival / external API sync
- full lore editorial tooling
- polished public-facing archive marketing
- full sponsor/perks integration into archive surfaces
- final copy lock

This first pass is:

- the structure
- the route map
- the component bones
- the read model plan
- the first visual language for the archive world

## What the Product Must Show

The user’s mental model is already clear:

- one person may have multiple franchises across sports
- each sport has its own law, culture, and archive shape
- NBA in particular needs much deeper treatment
- current teams and defunct teams both matter
- awards are not only league winners
- head-to-heads matter
- past standings matter
- the club should preserve status and memory, not flatten them

That means Tranche 2 must support five kinds of truth:

### 1. Personal truth

Who is this member?

- current franchises
- past franchises
- titles
- rivalry record
- awards
- cross-sport footprint
- status in the club

### 2. Sport truth

What kind of world is this sport?

- seasons
- divisions
- champions
- standings
- prizes
- award logic
- franchise map

### 3. Franchise truth

What is this team?

- active or defunct
- current GM
- past eras
- titles
- awards
- rivalries
- all-time record

### 4. Rivalry truth

How have these people or franchises met over time?

- head-to-head results
- playoff / title implications later if relevant
- streaks
- receipts / notes later

### 5. Club truth

How does the member’s identity compound across the whole world?

- one member, many sports
- one archive, many eras
- one club, many worlds

## Required Route Map

This is the recommended first Tranche 2 route structure:

### Member-facing

- `/profile`
  - current user profile
- `/history`
  - archive hub
- `/history/nba`
  - NBA archive hub
- `/history/f1`
  - F1 archive hub later
- `/history/world-cup`
  - World Cup archive hub later

### Entity routes

- `/history/members/[slug]`
  - individual member / GM profile
- `/history/nba/teams/[slug]`
  - franchise profile
- `/history/nba/seasons/[season]`
  - single-season archive later

### Founder/admin later

- `/founder/archive`
  - import and correction control room later

## Page Priority Order

Build in this order:

1. archive hub
2. current-user profile
3. NBA archive hub
4. member profile template
5. franchise profile template
6. season template
7. head-to-head and awards depth

Why:

- the archive hub defines the map
- the personal profile defines the cross-sport identity system
- NBA is the deepest first sport and should set the standard

## Product Posture

These pages should not feel like more onboarding.

They should feel:

- archival
- glassy
- ceremonial
- denser
- more atmospheric
- more world-like

But not:

- over-explained
- poster-screamy on every screen
- repetitive with the same three-card rhythm

The product should trust silence more here.

The archive does not need to keep selling itself.
It needs to feel like it already matters.

## What makes NBA different

NBA is the flagship depth case.

The product must be able to hold:

- multiple seasons of standings
- titles
- second-division reality
- franchise-specific histories
- award logic beyond championships
- member-to-member and franchise-to-franchise rivalry depth

It is the first place where the archive has to feel truly consequential.

## Awards model

Awards should be treated as first-class archive entities.

At minimum, the model needs to support:

- competition winner / champion
- fantasy-season MVP
- GM awards
- special tone awards such as:
  - best GM
  - most cunning
  - unluckiest

Not every award is a title.
Not every important season outcome is a final-table position.

## Defunct franchises

Defunct teams should still have:

- profile pages
- archive presence
- title / record preservation
- era markers

They should not be mixed with current active franchises as if nothing changed.

They should be visibly marked:

- `Defunct`
- or equivalent status language

The archive should treat them with respect, not hide them.

## Success Criteria

Tranche 2 succeeds when:

- a member can see that one person can have a real sports identity across multiple worlds
- a sport archive can show structure even before every stat is imported
- defunct franchises still feel remembered
- awards and rivalry feel first-class
- the archive looks and feels distinct from the funnel and foyer

## Output of This Plan

This product plan should lead directly to:

- a Tranche 2 design plan
- a Tranche 2 engineering plan
- route skeletons in the app
- first archive/profile surfaces in code
