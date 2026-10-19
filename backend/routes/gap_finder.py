from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from typing import List, Dict, Any

from models.schemas import (
    FindGapRequest,
    FindGapResponse,
    ValidateIdeaRequest,
    ValidateIdeaResponse,
    SaveIdeaRequest,
    UnsaveIdeaRequest,
    GapOpportunity
)
from services.cache_service import get_cached_result, set_cached_result
from services.claude_service import synthesize_market_gaps
from agents.trend_agent import fetch_google_trends
from agents.news_agent import fetch_sector_news
from agents.gov_agent import fetch_government_statistics

router = APIRouter(prefix="/api", tags=["Market Gap Finder"])

# In-memory saved ideas store for local backend testing
_USER_SAVED_IDEAS: Dict[str, List[Dict[str, Any]]] = {}

@router.post("/find-gap", response_model=FindGapResponse)
async def find_gap(request: FindGapRequest):
    """
    Trigger AI agents - returns 3 verified market gaps for sector + region in India.
    Implements 24h cache check.
    """
    sector = request.sector.strip()
    region = request.region.strip()

    # 1. Check Cache (< 24 hrs)
    cached_gaps = get_cached_result(sector, region)
    if cached_gaps:
        return FindGapResponse(
            gaps=cached_gaps,
            cached=True,
            generated_at=datetime.utcnow().isoformat()
        )

    # 2. Run Agents in parallel / sequentially
    trend_data = fetch_google_trends(sector, region)
    news_data = fetch_sector_news(sector, region)
    gov_data = fetch_government_statistics(sector, region)

    # 3. Call Claude Synthesis
    gaps_raw = synthesize_market_gaps(
        sector=sector,
        region=region,
        trend_data=trend_data,
        news_data=news_data,
        gov_data=gov_data,
        prompt_hint=request.prompt or ""
    )

    gaps = [GapOpportunity(**g) for g in gaps_raw]

    # 4. Store in Cache
    set_cached_result(sector, region, [g.model_dump() for g in gaps])

    return FindGapResponse(
        gaps=gaps,
        cached=False,
        generated_at=datetime.utcnow().isoformat()
    )

@router.post("/validate-idea", response_model=ValidateIdeaResponse)
async def validate_idea(request: ValidateIdeaRequest):
    """
    Validates a specific gap idea - calculates demand score, real vs hype, competitor density, and verdict.
    """
    trend_data = fetch_google_trends(request.sector, request.region)
    gov_data = fetch_government_statistics(request.sector, request.region)

    # Weighted calculation
    # Trends: 40%, News: 30%, Gov: 30%
    trend_score = trend_data[0]["interest_score"] if trend_data else 75
    growth_num = float(gov_data.get("annual_sector_growth", "8.0%").replace("%", ""))
    gov_score = min(95, int(growth_num * 9.5))
    news_score = 78

    final_score = int(trend_score * 0.4 + news_score * 0.3 + gov_score * 0.3)
    status = "REAL DEMAND" if final_score >= 75 else "TRENDING HYPE" if final_score >= 50 else "UNCLEAR"
    competitor_density = "Low" if final_score >= 80 else "Medium"

    return ValidateIdeaResponse(
        demand_score=final_score,
        status=status,
        competitor_density=competitor_density,
        population_fit=f"High ({gov_data.get('population_supporting', 'Large')} population base)",
        recommended_cities=gov_data.get("recommended_cities", [request.region, f"{request.region} Hub"]),
        sources=[
            {"title": "Google Trends Search Momentum (12 mo)", "url": "https://trends.google.com"},
            {"title": "data.gov.in Official Economic Census", "url": "https://data.gov.in"},
            {"title": "DPIIT State Startup & MSME Index", "url": "https://startupindia.gov.in"}
        ],
        verdict=f"Robust market void with strong macroeconomic tailwinds in {request.region}. Focus on low upfront capex to reach operational breakeven rapidly."
    )

@router.get("/gap-history")
async def get_gap_history(user_id: str = "usr_anonymous"):
    """
    Returns saved gap results for logged-in user.
    """
    return {"saved_ideas": _USER_SAVED_IDEAS.get(user_id, [])}

@router.post("/save-idea")
async def save_idea(request: SaveIdeaRequest):
    """
    Saves a gap result to user's profile.
    """
    if request.user_id not in _USER_SAVED_IDEAS:
        _USER_SAVED_IDEAS[request.user_id] = []
    
    if request.gap_data:
        saved_entry = {**request.gap_data, "saved_at": datetime.utcnow().isoformat()}
        _USER_SAVED_IDEAS[request.user_id].insert(0, saved_entry)

    return {"status": "success", "saved_count": len(_USER_SAVED_IDEAS[request.user_id])}

@router.delete("/unsave-idea")
async def unsave_idea(request: UnsaveIdeaRequest):
    """
    Removes a saved idea from user's profile.
    """
    if request.user_id in _USER_SAVED_IDEAS:
        _USER_SAVED_IDEAS[request.user_id] = [
            item for item in _USER_SAVED_IDEAS[request.user_id]
            if item.get("id") != request.gap_id and item.get("name") != request.gap_id
        ]
    return {"status": "success"}
