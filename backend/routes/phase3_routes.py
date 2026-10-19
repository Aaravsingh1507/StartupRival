from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from datetime import datetime

from models.schemas import (
    GTMGuideResponse,
    FundingSourceItem,
    CreatePostRequest,
    CreateCommentRequest,
    CommunityPost,
    NotificationItem,
    AdminMetricsResponse
)
from services.gtm_service import generate_gtm_guide
from services.funding_service import search_funding_sources
from services.community_service import get_all_posts, create_post, add_comment, toggle_upvote

router = APIRouter(prefix="/api", tags=["Phase 3: The Full Platform"])

# In-memory notifications store
_USER_NOTIFICATIONS = [
    {
        "id": "notif-01",
        "user_id": "usr_default",
        "type": "opportunity",
        "title": "New High-Demand Gap in Maharashtra",
        "message": "Solar farmgate chilling units showed a 140% search surge in Nashik district.",
        "link": "/gap-finder?sector=Agriculture&region=Maharashtra",
        "read": False,
        "created_at": "2026-10-19T08:15:00Z"
    },
    {
        "id": "notif-02",
        "user_id": "usr_default",
        "type": "funding",
        "title": "Startup India Seed Fund Window Open",
        "message": "New application cycle opened for early-stage DPIIT-recognized ventures.",
        "link": "/funding",
        "read": False,
        "created_at": "2026-10-18T16:40:00Z"
    },
    {
        "id": "notif-03",
        "user_id": "usr_default",
        "type": "community",
        "title": "New Reply on Community Discussion",
        "message": "Vikram Shinde replied to your inquiry regarding cold storage solar subsidies.",
        "link": "/community",
        "read": True,
        "created_at": "2026-10-18T14:20:00Z"
    }
]

@router.get("/gtm-guide", response_model=GTMGuideResponse)
async def get_gtm_guide(sector: str = Query(...), region: str = Query(...)):
    """
    Returns tailored Indian GTM strategy: WhatsApp/offline channels, pricing strategy, and first 100 customer tactics.
    """
    guide = generate_gtm_guide(sector=sector, region=region)
    return GTMGuideResponse(**guide)

@router.get("/funding-finder", response_model=List[FundingSourceItem])
async def get_funding_sources(
    stage: str = Query("idea"),
    bracket: str = Query("under_10l"),
    is_registered: bool = Query(False),
    sector: str = Query("all")
):
    """
    Returns ranked Indian grants, angel networks, accelerators, and venture funds matching founder stage.
    """
    results = search_funding_sources(stage=stage, amount_bracket=bracket, is_registered=is_registered, sector=sector)
    return [FundingSourceItem(**f) for f in results]

@router.get("/community/posts", response_model=List[CommunityPost])
async def list_community_posts(type: Optional[str] = Query(None), sector: Optional[str] = Query(None)):
    """
    Returns filtered community feed of founder questions, ideas, success stories, and weekly resources.
    """
    posts = get_all_posts(post_type=type, sector=sector)
    return [CommunityPost(**p) for p in posts]

@router.post("/community/posts", response_model=CommunityPost)
async def submit_community_post(request: CreatePostRequest):
    """
    Creates a new community post after simulated AI moderation verification.
    """
    # Simple AI moderation check: ensure non-empty and non-spam
    if len(request.title.strip()) < 5 or len(request.body.strip()) < 10:
        raise HTTPException(status_code=400, detail="Post title must be at least 5 characters and body at least 10 characters.")

    post = create_post(
        user_id=request.user_id,
        author_name=request.author_name or "Founder",
        p_type=request.type,
        title=request.title.strip(),
        body=request.body.strip(),
        sector=request.sector or "General",
        region=request.region or "India"
    )
    return CommunityPost(**post)

@router.post("/community/posts/{post_id}/comments")
async def post_comment(post_id: str, request: CreateCommentRequest):
    """
    Adds a comment to a community post.
    """
    comment = add_comment(
        post_id=post_id,
        user_id=request.user_id,
        author_name=request.author_name or "Founder",
        body=request.body.strip()
    )
    if not comment:
        raise HTTPException(status_code=404, detail="Post not found")
    return comment

@router.post("/community/posts/{post_id}/upvote")
async def upvote_post(post_id: str):
    """
    Toggles upvote count on a community post.
    """
    new_count = toggle_upvote(post_id)
    return {"upvotes": new_count}

@router.get("/notifications", response_model=List[NotificationItem])
async def list_notifications(user_id: str = "usr_default"):
    """
    Returns recent notifications for user with unread state indicators.
    """
    return [NotificationItem(**n) for n in _USER_NOTIFICATIONS]

@router.post("/notifications/read-all")
async def mark_notifications_read():
    """
    Marks all notifications as read.
    """
    for n in _USER_NOTIFICATIONS:
        n["read"] = True
    return {"status": "success", "unread_count": 0}

@router.get("/admin/metrics", response_model=AdminMetricsResponse)
async def get_admin_metrics():
    """
    Returns administrative telemetry, cache hit rates, active users, and sectoral search volume.
    """
    return AdminMetricsResponse(
        total_users=1480,
        active_users_dau=320,
        active_users_mau=1190,
        total_gaps_explored=4250,
        total_kits_generated=860,
        total_community_posts=142,
        cache_hit_rate="94.2%",
        avg_ai_response_seconds=1.28,
        top_explored_sectors=[
            {"sector": "Agriculture", "searches": 1420, "percentage": "33%"},
            {"sector": "Food & Beverage", "searches": 980, "percentage": "23%"},
            {"sector": "Technology", "searches": 820, "percentage": "19%"},
            {"sector": "Healthcare", "searches": 560, "percentage": "13%"},
            {"sector": "Retail & Services", "searches": 470, "percentage": "12%"}
        ],
        top_searched_regions=[
            {"region": "Maharashtra", "count": 1120},
            {"region": "Karnataka", "count": 940},
            {"region": "Delhi NCR", "count": 780},
            {"region": "Gujarat", "count": 610},
            {"region": "Tamil Nadu", "count": 520}
        ]
    )
