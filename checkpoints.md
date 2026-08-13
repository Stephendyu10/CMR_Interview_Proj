# Denari Workflow Prototype — Project Checklist

## 🎯 Overall Goal

Build a small-scale CMR + document vault + AI inference workflow centered around:

> **Client → Engagement → Request → Document → AI Inference → Human Review**

The goal is to demonstrate a thoughtful, end-to-end workflow rather than recreate a full production accounting platform.

---

# Phase 0 — Project Foundation

## Repository & Configuration

- [x] GitHub repository created
- [x] Project pushed to GitHub
- [x] `.env` excluded from Git
- [ ] `.env.example` created
- [x] PostgreSQL configured
- [x] Drizzle configured
- [ ] Database migrations fully verified

## Current Architecture

- [x] Express server
- [x] Route layer
- [x] Service layer
- [x] Database query layer
- [x] Zod validation
- [ ] Centralized error handling
- [x] Mock authentication via `x-user-id`

---

# Phase 1 — Stabilize the Existing CMR

## Firms

- [x] Firm schema
- [x] Firm → users relationship
- [x] Firm → clients relationship
- [ ] Review firm-level queries
- [ ] Test firm isolation

## Users

- [x] User schema
- [x] User roles
- [x] User → firm relationship
- [x] User lookup
- [ ] Review user authorization
- [ ] Add/update user tests

## Clients

- [x] Client schema
- [x] Create client
- [x] Get clients
- [x] Get client
- [x] Update client
- [x] Delete client
- [x] Client validation
- [ ] Review service/query boundaries
- [ ] Standardize error responses
- [ ] Add/finish tests
- [ ] Verify tenant isolation

## Engagements

- [x] Engagement schema
- [x] Create engagement
- [x] Get engagements
- [x] Update engagement
- [x] Delete engagement
- [x] Engagement validation
- [ ] Fix existing route issues
- [ ] Verify all CRUD endpoints
- [ ] Add/finish tests
- [ ] Verify tenant isolation

## Tasks

- [x] Task schema
- [x] Create task
- [x] Get tasks
- [x] Update task
- [x] Delete task
- [x] Task validation
- [ ] Review task authorization
- [ ] Improve ownership queries
- [ ] Add/finish tests
- [ ] Verify tenant isolation

### Phase 1 Checkpoint

> **A firm user can reliably manage clients, engagements, and internal tasks without being able to access another firm's data.**

---

# Phase 2 — Requests

Requests are the bridge between the CMR and the document vault.

## Request Data Model

- [x] Request schema
- [x] Request → firm relationship
- [x] Request → client relationship
- [x] Request → engagement relationship
- [x] Request → assigned user relationship
- [x] Request status
- [x] Request due date
- [x] Request timestamps

## Request API

- [ ] Create request
- [ ] Get requests
- [ ] Get request
- [ ] Update request
- [ ] Delete request
- [ ] Assign request
- [ ] Set due date

## Request Workflow

- [ ] `DRAFT`
- [ ] `SENT`
- [ ] `COMPLETED`
- [ ] Send request endpoint
- [ ] Complete request endpoint
- [ ] Validate status transitions
- [ ] Request authorization

## Request Testing

- [ ] CRUD tests
- [ ] Validation tests
- [ ] Tenant isolation tests
- [ ] Status transition tests

### Phase 2 Checkpoint

> **A firm can create a request against an engagement, assign it, send it, track it, and mark it complete.**

---

# Phase 3 — Document Vault

The Vault separates document metadata from actual file storage.

## Document Data Model

- [ ] Documents table
- [ ] Document → firm
- [ ] Document → client
- [ ] Document → engagement
- [ ] Document → request
- [ ] Document → uploading user
- [ ] Filename
- [ ] MIME type
- [ ] File size
- [ ] Storage key
- [ ] Processing status
- [ ] Timestamps

## Storage

- [ ] Storage interface
- [ ] Local filesystem implementation
- [ ] Save file
- [ ] Retrieve file
- [ ] Delete file
- [ ] Generate storage key
- [ ] Handle missing files

## Document API

- [ ] Upload document
- [ ] List documents
- [ ] Get document metadata
- [ ] Download document
- [ ] Delete document
- [ ] Associate document with request
- [ ] Verify document authorization

## Document Validation

- [ ] File type validation
- [ ] File size validation
- [ ] Required metadata validation
- [ ] Request ownership validation

### Phase 3 Checkpoint

> **A user can fulfill a request by uploading a document, the file is stored outside PostgreSQL, and PostgreSQL contains the document metadata and relationships.**

---

# Phase 4 — Document Processing

Before introducing AI, establish a document-processing pipeline.

## Processing

- [ ] Document processing status
- [ ] `UPLOADED`
- [ ] `PROCESSING`
- [ ] `PROCESSED`
- [ ] `FAILED`
- [ ] Processing service
- [ ] Error handling

## Text Extraction

- [ ] PDF text extraction
- [ ] Store extracted text
- [ ] Handle extraction failure
- [ ] Handle unsupported files

### Processing Pipeline

```text
Upload
  ↓
Stored
  ↓
Processing
  ↓
Text Extraction
  ↓
Processed
```
```
```
```
```

```
```


1. Stabilize existing CMR
        ↓
2. Finish Requests
        ↓
3. Build Document Vault
        ↓
4. Build Document Processing
        ↓
5. Add AI Inference
        ↓
6. Add Human Review
        ↓
7. Complete Golden Path
        ↓
8. Test + Polish
