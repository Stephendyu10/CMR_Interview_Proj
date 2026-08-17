# CMR Interview Project — Phase Progress

**Repository:** `CMR_Interview_Proj`  
**Baseline branch:** `main`  
**Current phase:** Phase 2  
**Working method:** One file at a time  
**Validation command:** `npx tsc --noEmit`

---

# Working Agreement

The current GitHub `main` branch is the authoritative baseline.

For every phase:

1. Work from the current `main` baseline.
2. Make changes one file at a time.
3. Discuss and agree on changes before implementing them.
4. Run `npx tsc --noEmit` after changes.
5. Fix all TypeScript errors before moving forward.
6. When the phase is complete, commit/push the phase.
7. The updated branch becomes the new baseline for the next phase.

Do not revert to older versions of files once a phase has been committed unless we explicitly decide to do so.

---

# Phase 1 — CRUD Foundation

## Status

**Complete**

Phase 1 has been committed and is the baseline for Phase 2.

---

## Clients

Implemented:

- Firm-scoped client queries
- Client CRUD through service/query layers
- Client validation
- Client status typing
- Removal of unnecessary broad database access

Architecture:

```text
Route
  ↓
Validation
  ↓
Client Service
  ↓
Firm-scoped Client Query
  ↓
Database
