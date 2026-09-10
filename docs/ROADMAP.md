# Delivery roadmap

## Now — safe public foundation

- Synthetic archived demo with typed status API and visible failure state.
- Container image, local Compose path, health checks, and Kubernetes application base.
- Architecture, privacy, and incident-governance documentation.

## Next — one complete incident workflow

- PostgreSQL schema and migrations for incidents, updates, roles, and audit events.
- Coordinator sign-in, invitation, two-person publication approval, and role boundaries.
- Create, review, publish, pause, resolve, archive, and export one incident.
- Automatic expiration with a scheduled “still current?” verification prompt.
- Playwright coordinator/public journeys and API integration tests.

## Then — field coordination

- Team check-in/check-out and skill/capability roster.
- Assignment zones with public/private geospatial precision.
- Offline-friendly last-verified status and queued coordinator updates.
- Optional email/SMS notification adapters with consent and rate limits.
- Docker Compose bundle including PostgreSQL and documented backup/restore drill.

## Scale-out proof

- Background notification worker with idempotency and dead-letter handling.
- Object storage, malware scanning, retention jobs, and export/delete workflows.
- Edge-cache policy, load test, Kubernetes overlays, autoscaling, network policies, and observability dashboards.
- Incident simulator with synthetic data for drills and portfolio demonstrations.

AI assistance remains bounded to reviewed summaries, translation, duplicate-tip grouping, and data-quality warnings. It will not make field decisions or publish autonomously.
