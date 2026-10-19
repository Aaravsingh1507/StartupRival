import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from routes.gap_finder import router as gap_finder_router
from routes.phase2_routes import router as phase2_router
from routes.phase3_routes import router as phase3_router

app = FastAPI(
    title="StartupRival API — Complete Platform (Phases 1, 2, and 3)",
    description="Backend AI Agent engine for Indian market gap discovery, startup roadmaps, competitor radar, funding, and community",
    version="3.0.0"
)

# CORS configuration for Next.js frontend
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://startuprival.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes for all 3 phases
app.include_router(gap_finder_router)
app.include_router(phase2_router)
app.include_router(phase3_router)

@app.get("/", tags=["System"])
def root():
    return {
        "service": "StartupRival API",
        "status": "active",
        "phases": ["Phase 1: Core Gap Finder", "Phase 2: Sticky Roadmap & Radar", "Phase 3: GTM, Funding & Community"],
        "version": "3.0.0"
    }

@app.get("/health", tags=["System"])
async def health_check():
    """Health check endpoint for deployment monitoring."""
    return {
        "status": "healthy",
        "service": "StartupRival Complete Backend",
        "phases_active": [1, 2, 3],
        "endpoints": [
            "/api/find-gap",
            "/api/validate-idea",
            "/api/kickstart-kit",
            "/api/competitor-radar",
            "/api/compare-ideas",
            "/api/gtm-guide",
            "/api/funding-finder",
            "/api/community/posts",
            "/api/notifications",
            "/api/admin/metrics"
        ],
        "cache": "active"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
