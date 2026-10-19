# StartupRival — AI Market Gap Discovery & Execution Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Language](https://img.shields.io/badge/Language-Pure_JavaScript-F7DF1E?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-white?style=flat)](LICENSE)

> **"From Zero Startup Experience to an Actionable Indian Startup Roadmap in One Sitting."**

StartupRival is an AI-driven platform tailored specifically for aspiring Indian entrepreneurs. It identifies genuine, unaddressed market opportunities across 9 key sectors and 28 Indian states/UTs, validates customer demand against real-world signals, generates step-by-step regulatory roadmaps (FSSAI, Udyam, GST, central/state subsidies), maps competitor voids in Tier-2/3 cities, and provides a Go-To-Market playbook and funding directory.

---

## Visual Identity & Design System

StartupRival is crafted using a **cinematic blue glassmorphism design system**:

| Element | Token / Spec | Purpose |
| :--- | :--- | :--- |
| **Main Background** | `#030712` | Near-black space canvas with dotted ambient particle grid |
| **Card Surface** | `#08152B` (80–90%) | Deep translucent navy glass cards with `backdrop-blur-md` |
| **Elevated Surface** | `#0C1E3D` | Active sidebar tabs, modal dialogs, and elevated panels |
| **Electric Blue** | `#0866F5` | Primary CTA buttons, glowing rings, active pipeline stages |
| **Luminous Cyan** | `#39BAFF` | Demand scores, badges, tags, active borders, verified evidence |
| **Cool White** | `#F4F8FF` | Primary headings, prominent scores, and card titles |
| **Secondary Text** | `#8EABCF` | Readable body copy, metrics descriptions, and breadcrumbs |
| **Borders** | `rgba(57, 186, 255, 0.14)` | Hairline blue borders with realistic light reflections |
| **Typography** | Inter | Modern, clean geometric sans-serif |

---

## Tech Stack

- **Frontend:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **Language:** Pure **JavaScript** (`.js`, `.jsx`) — strictly zero TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom claymorphic/glassmorphic utility tokens
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend API:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+) with async endpoints and connection pooling
- **Database & Auth:** [Supabase](https://supabase.com/) PostgreSQL with Row-Level Security (RLS)
- **AI Synthesis:** Claude API (`claude-3-5-sonnet`) with local synthetic fallback engines
- **PDF Generation:** Browser-native high-fidelity print styling & reportlab integration

---

## Repository Structure

```
StartupRival/
├── .gitignore                   # Comprehensive root ignore (excludes .env files & build artifacts)
├── README.md                    # Platform documentation
├── supabase/
│   └── migrations.sql           # Schema for all 11 tables across Phases 1-3 with RLS
│
├── backend/                     # FastAPI Python Server
│   ├── main.py                  # API entry point & CORS configuration
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Template for API keys & database credentials
│   ├── routes/
│   │   ├── gap_finder.py        # Phase 1: /api/find-gap & /api/validate-idea
│   │   ├── phase2_routes.py     # Phase 2: /api/kickstart-kit, /api/competitor-radar, /api/dashboard
│   │   └── phase3_routes.py     # Phase 3: /api/gtm-guide, /api/funding-finder, /api/community, /api/admin
│   ├── models/
│   │   └── schemas.py           # Pydantic data contracts
│   ├── services/
│   │   ├── kickstart_service.py # Regulatory templates & capital ranges
│   │   ├── competitor_service.py# Incumbent radar & gap city calculator
│   │   ├── gtm_service.py       # Indian GTM channels & pricing anchors
│   │   ├── funding_service.py   # Grant and angel matching engine
│   │   ├── community_service.py # Post feed & content moderation
│   │   └── cache_service.py     # Pre-computation caching layer
│   └── agents/
│       ├── trend_agent.py       # Local demand & consumer velocity
│       ├── news_agent.py        # Regional business news aggregation
│       └── gov_agent.py         # State & central scheme verification
│
└── frontend/                    # Next.js 16 App Router
    ├── package.json             # Pure JavaScript dependencies
    ├── next.config.mjs          # Next.js configuration
    ├── .env.local.example       # Template for frontend environment variables
    ├── public/
    │   ├── manifest.json        # PWA Web App Manifest
    │   └── sw.js                # Service Worker for offline support
    ├── app/
    │   ├── layout.js            # Root layout with Inter font, Providers, OfflineBanner & MobileNav
    │   ├── globals.css          # Design system tokens (glass, clay, monochrome)
    │   ├── page.js              # Landing page
    │   ├── gap-finder/page.js   # Market gap discovery screen
    │   ├── dashboard/page.js    # Founder workspace & idea comparison
    │   ├── kickstart-kit/[id]/page.js # Dynamic Kickstart Kit & roadmap
    │   ├── competitor-radar/[id]/page.js # Dynamic competitor radar & gap cities
    │   ├── gtm-guide/[id]/page.js # Dynamic Go-To-Market strategy
    │   ├── funding/page.js      # Funding finder & eligibility quiz
    │   ├── community/page.js    # Founder community feed & discussions
    │   ├── notifications/page.js# Notifications inbox
    │   ├── settings/page.js     # Account & notification preferences
    │   ├── admin/page.js        # Admin analytics & telemetry
    │   └── auth/
    │       ├── login/page.js    # Sign-in screen
    │       └── signup/page.js   # Registration screen
    ├── components/              # 23 Modular Reusable UI Components
    │   ├── Navbar.js            # Translucent navigation & NotificationBell
    │   ├── Footer.js            # Monochrome footer
    │   ├── Button.js            # Primary, secondary, and ghost clay buttons
    │   ├── ClayCard.js          # Tactile claymorphic card container
    │   ├── GlassPanel.js        # Translucent glass panel
    │   ├── GapResultCard.js     # Opportunity card with quick Phase 2/3 action links
    │   ├── ValidatorScorecard.js# Demand validation modal
    │   ├── StartupKitSection.js # Expandable accordions & 90-day checklist
    │   ├── CompetitorRadar.js   # 3-tab radar & market saturation index
    │   ├── IdeaComparisonTable.js # Side-by-side trade-off matrix
    │   ├── GTMGuide.js          # GTM channels, pricing, and first 100 customers
    │   ├── FundingFinder.js     # 3-question eligibility quiz & capital directory
    │   ├── CommunityFeed.js     # Post threads, upvotes, and comments
    │   ├── CreatePostModal.js   # Post creation with AI moderation
    │   ├── NotificationBell.js  # Navbar alert badge and dropdown
    │   ├── MobileBottomNav.js   # Responsive bottom navigation bar
    │   └── OfflineBanner.js     # Offline status banner
    └── lib/
        ├── api.js               # API client with resilient fallbacks
        ├── data.js              # Curated Indian sectors, 28 regions & baseline benchmarks
        ├── supabase.js          # Supabase client with local storage sync
        ├── auth-context.js      # Authentication context
        ├── toast-context.js     # Action toast notification system
        └── notification-context.js # Alert counter & state
```

---

## Quickstart & Installation

### Prerequisites
- **Node.js:** v18.17+ or v20+
- **Python:** v3.10+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Aaravsingh1507/StartupRival.git
cd StartupRival
```

### 2. Backend Setup (FastAPI)
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your Supabase and Anthropic keys (optional for local testing)

# Run the backend dev server
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The backend API documentation will be accessible at:
- **Swagger UI:** `http://127.0.0.1:8000/docs`
- **ReDoc:** `http://127.0.0.1:8000/redoc`

### 3. Frontend Setup (Next.js 16)
In a separate terminal:
```bash
cd frontend

# Install JavaScript dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables Reference

### Backend (`backend/.env`)
```ini
# Supabase Database & Auth
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key

# Anthropic Claude API (Optional; local synthetic fallback active if omitted)
ANTHROPIC_API_KEY=your_claude_api_key

# News & Govt Data (Optional)
NEWS_API_KEY=your_newsapi_key
DATA_GOV_IN_API_KEY=your_data_gov_key
```

### Frontend (`frontend/.env.local`)
```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

> **Note:** The platform includes built-in realistic offline synthesis engines. If external API keys are omitted, the application operates fully using curated benchmarks for Indian sectors and states.

---

## API Endpoints Summary

| Method | Endpoint | Description | Phase |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Health check & system diagnostics | All |
| `POST` | `/api/find-gap` | Discover market gaps by sector and region | Phase 1 |
| `POST` | `/api/validate-idea` | Run demand validation and scorecards | Phase 1 |
| `GET` | `/api/kickstart-kit` | Fetch licenses, capital range, and govt schemes | Phase 2 |
| `POST` | `/api/competitor-radar` | Retrieve competitor presence & gap cities | Phase 2 |
| `GET` | `/api/dashboard` | Fetch user workspace stats and stage | Phase 2 |
| `GET` | `/api/compare-ideas` | Side-by-side trade-off comparison of 2 ideas | Phase 2 |
| `POST` | `/api/update-progress` | Advance startup milestone stage | Phase 2 |
| `GET` | `/api/gtm-guide` | Generate channels, pricing, and first 100 customer tactics | Phase 3 |
| `GET` | `/api/funding-finder` | Filter grants, angel networks, and accelerators | Phase 3 |
| `GET` | `/api/community/posts` | Paginated founder discussions & resources | Phase 3 |
| `POST` | `/api/community/posts` | Create new post with AI moderation | Phase 3 |
| `POST` | `/api/community/posts/{id}/upvote` | Toggle post upvote | Phase 3 |
| `POST` | `/api/community/posts/{id}/comments` | Add comment to discussion thread | Phase 3 |
| `GET` | `/api/notifications` | Fetch user alerts & market shift triggers | Phase 3 |
| `GET` | `/api/admin/metrics` | Platform analytics & cron telemetry | Phase 3 |

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
