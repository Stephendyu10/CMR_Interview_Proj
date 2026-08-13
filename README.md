# Denari Workflow Prototype — Project Goals

## 1. Project Overview

This project is a small-scale prototype inspired by Denari's workflow around client relationship management, engagements, document collection, and AI-assisted workflows.

The goal is **not** to recreate a full production CMR or accounting platform.

Instead, the project should demonstrate a focused end-to-end workflow:

> **Client → Engagement → Request → Document → AI Inference → Human Review**

The project should prioritize clean domain modeling, tenant isolation, sensible API design, document storage, and a practical use of AI.

---

# 2. Core Product Goal

Build a lightweight platform that allows an accounting/tax firm to:

1. Manage users and clients.
2. Create and manage client engagements.
3. Track internal work through tasks.
4. Request information/documents from clients.
5. Store documents associated with those requests.
6. Analyze documents using AI.
7. Extract structured information from unstructured documents.
8. Allow a human to review and accept/reject AI-generated results.

The final product should feel like a small but coherent workflow system rather than a collection of unrelated CRUD endpoints.

---

# 3. Core Domain Model

The system is organized around firms.

```text
Firm
├── Users
└── Clients
    └── Engagements
        ├── Tasks
        ├── Requests
        │   └── Documents
        └── Documents
            └── AI Inferences
```

# 4. Architecture:
                    ┌─────────────┐
                    │    Firm     │
                    └──────┬──────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                Users             Clients
                                    │
                              Engagement
                                    │
                     ┌──────────────┼──────────────┐
                     │              │              │
                   Tasks         Requests       Documents
                                    │              │
                                    └──────┬───────┘
                                           │
                                     AI Inference
                                           │
                                     Human Review
