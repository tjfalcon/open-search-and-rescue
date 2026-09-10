# Open Search and Rescue

An open-source, safety-first coordination tool for families and community organizers working alongside professional search and rescue and the agency of jurisdiction.

**Current state:** public product foundation. The hosted app is an unmistakably synthetic, archived demonstration—not an active incident. It includes a responsive public interface, typed status API, health endpoint, safe expiration behavior, container build, and Kubernetes application base.

[View the demo](https://open-search-and-rescue.vercel.app) · [Architecture](docs/ARCHITECTURE.md) · [Safety and privacy](docs/SAFETY_AND_PRIVACY.md) · [Roadmap](docs/ROADMAP.md)

## Why this exists

When someone is missing, updates fragment across texts, social posts, documents, and word of mouth. Open Search and Rescue aims to give an authorized coordination team one auditable source of truth without encouraging unsafe self-deployment or exposing sensitive operational information.

## Current product slice

- Public incident projection served by `GET /api/status`.
- Automatic safe pause for expired live updates.
- Explicit demo labeling and synthetic data.
- Failure state that directs visitors back to official sources.
- `GET /api/health` for deployment probes.
- Responsive Next.js/TypeScript user interface and server API.
- Non-root production container with health check.

The current demo intentionally does **not** accept public incident creation or personal data. Coordinator authentication, PostgreSQL persistence, review/approval, and the audit log come before live-use trials.

## Deployment paths

The target is one full-stack codebase with three operational profiles:

| Profile | Intended use | Shape |
|---|---|---|
| Field instance | One family or local coordination group, one active incident | App + PostgreSQL via Docker Compose on a small host |
| Managed edge | Public trial or sustained community use | Edge/CDN + app + managed PostgreSQL/object storage |
| Kubernetes | SAR nonprofit, emergency-management partner, or multi-team drill | Stateless app/workers + managed data services + environment overlays |

The lightweight field profile is the primary product constraint. Kubernetes is a scale and operations option, not a prerequisite. See [the architecture decision](docs/ARCHITECTURE.md) for service boundaries and safety controls.

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Verify the service at `http://localhost:3000/api/health`.

## Run as a container

```bash
docker compose up --build
```

The production-style application is available at `http://localhost:3000`. The included container runs as a non-root user and the Compose service includes a health check.

## Kubernetes base

The base manifests deploy the current stateless application:

```bash
kubectl apply -k k8s/base
```

The image reference is a target registry path. Pin a released digest before any real deployment. TLS/ingress, secrets, database, object storage, backups, and network policy belong in environment-specific overlays and are not yet claimed as production-ready.

## Guardrails for contributors

- Use synthetic data in public development and tests.
- Never post an active person's private information in an issue, fixture, screenshot, or pull request.
- Default volunteer guidance to “do not self-deploy.”
- Do not add AI-driven field decisions or autonomous publication.
- Treat accessibility, low bandwidth, auditability, expiry, and failure behavior as core requirements.

## Near-term definition of done

The first trial-capable release requires authenticated coordinators, two-person publication approval, PostgreSQL-backed incidents and audit events, automatic expiry, encrypted backup/restore, end-to-end tests, a threat model, and a supervised synthetic drill. See the [roadmap](docs/ROADMAP.md).

## License

Licensed under the terms in [LICENSE](LICENSE).
