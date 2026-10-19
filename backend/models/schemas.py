from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SourceItem(BaseModel):
    title: str
    url: Optional[str] = None

class GapOpportunity(BaseModel):
    id: Optional[str] = None
    name: str
    summary: str
    whoAffected: str
    whyExists: str
    regionRelevance: str
    demandScore: int = Field(ge=0, le=100)
    status: Optional[str] = "REAL DEMAND"
    competitorDensity: Optional[str] = "Low"
    populationFit: Optional[str] = "High"
    recommendedCities: Optional[List[str]] = []
    sources: Optional[List[SourceItem]] = []
    validatorVerdict: Optional[str] = None

class FindGapRequest(BaseModel):
    sector: str
    region: str
    prompt: Optional[str] = ""
    user_id: Optional[str] = "usr_anonymous"

class FindGapResponse(BaseModel):
    gaps: List[GapOpportunity]
    cached: bool = False
    cache_age_hours: Optional[float] = 0.0
    generated_at: str

class ValidateIdeaRequest(BaseModel):
    gap_name: str
    sector: str
    region: str

class ValidateIdeaResponse(BaseModel):
    demand_score: int
    status: str
    competitor_density: str
    population_fit: str
    recommended_cities: List[str]
    sources: List[SourceItem]
    verdict: str

class SaveIdeaRequest(BaseModel):
    user_id: str
    gap_id: Optional[str] = None
    gap_data: Optional[Dict[str, Any]] = None

class UnsaveIdeaRequest(BaseModel):
    user_id: str
    gap_id: str

# ==================== PHASE 2 SCHEMAS ====================

class LicenseItem(BaseModel):
    name: str
    description: str
    portal_url: str
    timeframe: str
    mandatory: bool = True

class SchemeItem(BaseModel):
    name: str
    benefit: str
    eligibility: str
    apply_url: str
    agency: Optional[str] = None

class CapitalEstimate(BaseModel):
    min_inr: int
    max_inr: int
    currency: str = "INR"
    breakdown: Optional[Dict[str, int]] = None
    assumptions: Optional[List[str]] = None

class KickstartKitResponse(BaseModel):
    sector: str
    region: str
    business_overview: Dict[str, Any]
    capital_estimate: CapitalEstimate
    licenses: List[LicenseItem]
    schemes: List[SchemeItem]
    location_advice: Dict[str, Any]
    first_steps: List[Dict[str, Any]]
    timeline_months: int

class CompetitorItem(BaseModel):
    name: str
    hq_city: str
    other_cities: List[str] = []
    funding_stage: str  # Bootstrapped, Seed, Series A, Series B, IPO
    founded_year: int
    presence_strength: str = "Medium"
    source_url: Optional[str] = None

class CompetitorRadarRequest(BaseModel):
    sector: str
    region: str

class CompetitorRadarResponse(BaseModel):
    sector: str
    region: str
    competitors: List[CompetitorItem]
    gap_cities: List[Dict[str, Any]]
    market_coverage_percent: int
    best_entry_point: Dict[str, Any]
    entry_recommendation: str

class UpdateProgressRequest(BaseModel):
    user_id: str
    gap_id: str
    stage: str # 'found', 'validated', 'kit_generated', 'ready'
    completed_task: Optional[str] = None

# ==================== PHASE 3 SCHEMAS ====================

class GTMChannelItem(BaseModel):
    channel: str
    why_it_works: str
    how_to_start: str
    cost: str # 'Free' or 'Paid'
    first_action: str

class PricingStrategy(BaseModel):
    approach: str
    price_range_inr: str
    anchor_price: str
    free_tier_needed: bool
    rationale: str

class First100Tactic(BaseModel):
    step: int
    tactic: str
    timeline: str
    estimated_cost: str
    action_item: str

class GTMGuideResponse(BaseModel):
    sector: str
    region: str
    top_channels: List[GTMChannelItem]
    pricing_strategy: PricingStrategy
    first_100_customers: List[First100Tactic]
    tier_2_3_note: Optional[str] = None
    language_tip: str
    biggest_mistake: str

class FundingQuizRequest(BaseModel):
    stage: str # 'idea', 'mvp', 'revenue', 'scaling'
    amount_bracket: str # 'under_10l', '10l_1cr', '1cr_plus'
    is_registered: bool
    sector: Optional[str] = "all"
    region: Optional[str] = "all"

class FundingSourceItem(BaseModel):
    id: str
    name: str
    type: str # 'grant', 'angel', 'vc', 'accelerator'
    sectors: List[str]
    ticket_size: str
    eligibility: str
    stages_supported: List[str]
    fit_reason: str
    apply_url: str

class CreatePostRequest(BaseModel):
    user_id: str
    author_name: Optional[str] = "Founder"
    type: str # 'question', 'idea', 'success', 'resource'
    title: str
    body: str
    sector: Optional[str] = "General"
    region: Optional[str] = "India"

class CreateCommentRequest(BaseModel):
    user_id: str
    author_name: Optional[str] = "Founder"
    body: str

class CommunityPost(BaseModel):
    id: str
    user_id: str
    author_name: str
    type: str
    title: str
    body: str
    sector: Optional[str]
    region: Optional[str]
    upvotes: int
    comment_count: int
    created_at: str
    comments: Optional[List[Dict[str, Any]]] = []

class NotificationItem(BaseModel):
    id: str
    user_id: str
    type: str
    title: str
    message: str
    link: Optional[str] = None
    read: bool = False
    created_at: str

class AdminMetricsResponse(BaseModel):
    total_users: int
    active_users_dau: int
    active_users_mau: int
    total_gaps_explored: int
    total_kits_generated: int
    total_community_posts: int
    cache_hit_rate: str
    avg_ai_response_seconds: float
    top_explored_sectors: List[Dict[str, Any]]
    top_searched_regions: List[Dict[str, Any]]
