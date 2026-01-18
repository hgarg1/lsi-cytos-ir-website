# Living Systems Intelligence | CytosAI IR Platform 🧬

![Production Ready](https://img.shields.io/badge/Status-Production--Ready-evergreen?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015-graphite?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Engine-Three.js%20%2F%20R3F-blue?style=for-the-badge&logo=three.js)
![PostgreSQL](https://img.shields.io/badge/Database-Cloud%20Postgres-3A5F7D?style=for-the-badge&logo=postgresql)

> **Mission Statement:** Pioneering the intersection of Living Systems Intelligence and computational biology. This platform serves as the secure, institutional-grade bridge between our scientific breakthroughs and our global investment partners.

---

## 💎 Immersive Architecture

This is not a standard corporate website. It is a cinematic, 3D-accelerated data environment designed to signal institutional trust and technological superiority.

### 🎥 High-Fidelity 3D Visuals
*   **The Molecule (Landing)**: A complex, interactive 3D representation of localized structural integrity.
*   **Sentinel Core (Auth)**: A refractive, pulsating security orb guarding the login portal.
*   **Data Terrain (Financials)**: Undulating wireframe landscapes representing data security and depth.
*   **The Ritual (Easter Egg)**: A secret occult-inspired geometric ritual at `/archie-garg`.

### 🔐 Enterprise-Grade Security (Sentinel)
*   **Domain-Locked SSO**: Automatic restriction to `@cytosai.tech`, `@lsi.org`, and other authorized institutional domains.
*   **Future-Proof RBAC**: Granular permission scopes (`docs:read_private`, `audit:view`, `admin:full`) mapped to tiered user identities.
*   **Institutional Mapping**: Grouping of users by firm (e.g., Sequoia, Goldman Sachs) for bulk access management.
*   **Biometric Interface**: Glassmorphic profile management with local asset storage and SSO-integrity checks.

### 📊 Mission Control (Admin Portal)
*   **System Pulse**: Real-time 3D telemetry of neural core activity and compute load.
*   **Document Vault**: Immutable version-controlled PDF management with SHA-256 integrity verification.
*   **Forensic Audit Engine**: Real-time logging of every sensitive document access event, IP, and user-agent.

---

## 🛠 Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **3D Engine** | Three.js, React Three Fiber, React Three Drei |
| **Auth** | NextAuth.js v5 (Beta) |
| **Database** | Cloud PostgreSQL (GCP / Vercel Postgres) |
| **Animations** | Framer Motion, GSAP |
| **Deployment** | Vercel (Edge Functions optimized) |

---

## 🚀 Deployment & Setup

### Environment Variables
Create a `.env.local` with the following:
```bash
# Database
DATABASE_URL="postgres://user:password@host:port/db?sslmode=require"

# Auth
AUTH_SECRET="your-32-byte-base64-secret"

# Optional Discrete Vars
POSTGRES_HOST=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
```

### Database Initialization
Run the orchestrated SQL scripts located in `/sql`:
1. `001_initial_schema.sql` - Core structure.
2. `003_future_proof_users.sql` - RBAC & Institutional tables.
3. `004_super_admin.sql` - Bootstrap your identity.

---

## 📂 Project Structure
*   `/src/app` - App Router (IR, Admin, Auth pages).
*   `/src/components/3d` - Immersive Three.js scenes.
*   `/src/lib` - Core services (DB, IR logic, Security).
*   `/sql` - Orchestrated database migrations.

---

## 👤 Author
**Archie Garg** - *Principal Architect & Super Admin*

---

© 2026 Living Systems Intelligence | CytosAI. **Proprietary & Confidential.**