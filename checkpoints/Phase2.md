## Phase 2 — Reliability & API Hardening

### API
- [ ] Consistent route structure
- [ ] Consistent status codes
- [ ] Consistent error responses
- [ ] Validation on all mutation endpoints

### Authorization
- [ ] Verify firm isolation for clients
- [ ] Verify firm isolation for engagements
- [ ] Verify firm isolation for tasks
- [ ] Verify firm isolation for requests
- [ ] Verify assigned users belong to same firm

### Database
- [ ] Review query patterns
- [ ] Verify appropriate indexes
- [ ] Verify foreign-key relationships
- [ ] Verify cascade behavior

### Testing
- [ ] Client CRUD tests
- [ ] Engagement CRUD tests
- [ ] Task CRUD tests
- [ ] Request CRUD tests
- [ ] Tenant isolation tests
- [ ] Validation failure tests
- [ ] Not-found tests

### Developer Experience
- [ ] Add `typecheck` npm script
- [ ] Add test script
- [ ] Add health endpoint
- [ ] Document local setup
