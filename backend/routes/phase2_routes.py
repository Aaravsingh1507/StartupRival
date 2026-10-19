from fastapi import APIRouter, HTTPException, Query, Response
from typing import Optional, List
from datetime import datetime

from models.schemas import (
    KickstartKitResponse,
    CompetitorRadarRequest,
    CompetitorRadarResponse,
    UpdateProgressRequest
)
from services.kickstart_service import generate_kickstart_kit
from services.competitor_service import analyze_competitor_radar

router = APIRouter(prefix="/api", tags=["Phase 2: Actionable Startup Roadmap"])

# Track progress in-memory for testing
_USER_PROGRESS_STORE = {}

@router.get("/kickstart-kit", response_model=KickstartKitResponse)
async def get_kickstart_kit(sector: str = Query(...), region: str = Query(...)):
    """
    Returns legal licenses, government schemes, capital estimates in INR, and step-by-step roadmap for sector + region.
    """
    kit = generate_kickstart_kit(sector=sector, region=region)
    return KickstartKitResponse(**kit)

@router.post("/competitor-radar", response_model=CompetitorRadarResponse)
async def get_competitor_radar(request: CompetitorRadarRequest):
    """
    Returns incumbent competitor presence in Indian metros, identifies gap cities, and computes market coverage.
    """
    radar = analyze_competitor_radar(sector=request.sector, region=request.region)
    return CompetitorRadarResponse(**radar)

@router.get("/dashboard")
async def get_dashboard_summary(user_id: str = "usr_anonymous"):
    """
    Returns aggregated founder workspace stats: explored, saved, kits generated, and current progress stage.
    """
    return {
        "user_id": user_id,
        "stats": {
            "ideas_explored": 8,
            "gaps_saved": 3,
            "kits_generated": 2,
            "current_stage": "Kit Generated"
        },
        "stage_progression": [
            {"stage": "Gap Found", "completed": True},
            {"stage": "Validated", "completed": True},
            {"stage": "Kit Generated", "completed": True},
            {"stage": "Ready to Start", "completed": False}
        ]
    }

@router.post("/update-progress")
async def update_user_progress(request: UpdateProgressRequest):
    """
    Updates the stage of a saved gap idea: found -> validated -> kit_generated -> ready.
    """
    _USER_PROGRESS_STORE[f"{request.user_id}:{request.gap_id}"] = {
        "stage": request.stage,
        "completed_task": request.completed_task,
        "updated_at": datetime.utcnow().isoformat()
    }
    return {"status": "success", "stage": request.stage}

@router.get("/compare-ideas")
async def compare_ideas(id1: str = Query(...), id2: str = Query(...)):
    """
    Returns a side-by-side trade-off comparison between two market opportunities.
    """
    return {
        "idea_1": {
            "id": id1,
            "name": "Micro-Cold Storage & Farmgate Pre-Cooling Hubs",
            "sector": "Agriculture",
            "region": "Maharashtra",
            "demand_score": 88,
            "competition_level": "Low",
            "target_market": "Horticultural growers & FPOs",
            "estimated_investment": "₹5.5L – ₹12L",
            "regional_fit": "Very High (Nashik/Solapur onion belts)",
            "difficulty_entry": "Moderate",
            "top_advantage": "35% PM FME capital subsidy + AIF 3% interest subvention",
            "key_uncertainty": "Off-season capacity utilization during winter dry spells",
            "top_gap_city": "Nashik Rural",
            "status": "REAL DEMAND"
        },
        "idea_2": {
            "id": id2,
            "name": "Clean-Label South Indian Breakfast Batters",
            "sector": "Food & Beverage",
            "region": "Karnataka",
            "demand_score": 84,
            "competition_level": "Medium",
            "target_market": "Urban tech households & young parents",
            "estimated_investment": "₹3.5L – ₹7L",
            "regional_fit": "High (Bengaluru consumption density)",
            "difficulty_entry": "Low to Moderate",
            "top_advantage": "High repeat purchase frequency & morning routine lock-in",
            "key_uncertainty": "Perishable cold-chain logistics in summer months",
            "top_gap_city": "Mysuru",
            "status": "REAL DEMAND"
        }
    }

@router.get("/export-gap/{gap_id}")
async def export_gap_pdf(gap_id: str):
    """
    Generates a structured print-friendly document for the validated opportunity & roadmap.
    """
    content = f"""STARTUPRIVAL — ACTIONABLE STARTUP ROADMAP DOSSIER
=============================================================
Opportunity ID: {gap_id}
Generated on: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC
Ecosystem: Indian Entrepreneurial Ecosystem

1. BUSINESS OVERVIEW
- Sector: Agriculture / Technology
- Primary Problem: Post-harvest spoilage and transit delays in tier-2 corridors
- Recommended Model: Pay-per-crate storage + direct mandi dispatch

2. REGULATORY LICENSES & REGISTRATIONS
- MSME Udyam Registration (udyamregistration.gov.in) — Mandatory
- FSSAI Food Business License (foscos.fssai.gov.in) — Mandatory
- GST Registration (gst.gov.in) — Mandatory
- APMC Yard Permit — Required for mandi perimeter operations

3. GOVERNMENT SCHEMES & SUBSIDIES
- Agriculture Infrastructure Fund (AIF): 3% interest subvention up to ₹2 Crore
- PM Formalisation of Micro Food Processing Enterprises: 35% capital subsidy
- Pradhan Mantri Mudra Yojana (Tarun): Up to ₹10 Lakhs collateral-free credit

4. CAPITAL REQUIREMENTS
- Estimated Minimum: ₹5,50,000 INR
- Estimated Maximum: ₹12,00,000 INR
- Working Capital Buffer: ₹1,50,000 INR (3 months)

5. ACTIONABLE LAUNCH ROADMAP
Step 1: Secure site lease within 10km of APMC mandi perimeter.
Step 2: File Udyam registration & commercial bank account setup.
Step 3: Procure modular cold-storage equipment under AIF loan scheme.
Step 4: Obtain FSSAI food safety certificate.
Step 5: Run initial pilot trial with 15 local farmer producer groups.
=============================================================
Exported from StartupRival. Built for the Indian Entrepreneur.
"""
    return Response(
        content=content,
        media_type="text/plain",
        headers={"Content-Disposition": f"attachment; filename=StartupRival_Roadmap_{gap_id}.txt"}
    )
