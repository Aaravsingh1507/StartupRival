from datetime import datetime
from typing import List, Dict, Any, Optional

# Initial verified seed community posts representing real Indian founder discussions
COMMUNITY_POSTS: List[Dict[str, Any]] = [
    {
        "id": "post-01",
        "user_id": "usr_priya",
        "author_name": "Priya Nair",
        "type": "question",
        "title": "Has anyone set up a modular pre-cooling unit in Nashik APMC? Need advice on solar inverters",
        "body": "We are piloting a 1,200 sq.ft farmgate cold room near Nashik for table grape growers. Current grid power has 4-hour daily scheduled outages. Has anyone successfully claimed the MNRE solar rooftop subsidy through Maharashtra DISCOM? Would love to connect with someone who went through the inspection process.",
        "sector": "Agriculture",
        "region": "Maharashtra",
        "upvotes": 24,
        "comment_count": 5,
        "created_at": "2026-10-18T10:30:00Z",
        "comments": [
            {
                "id": "comm-01",
                "author_name": "Vikram Shinde",
                "body": "We did this last year in Sangli. MSEDCL took about 45 days for the net-metering NOC. Pro tip: Apply through an empaneled vendor directly on the national portal to avoid paperwork stalls.",
                "created_at": "2026-10-18T14:20:00Z"
            },
            {
                "id": "comm-02",
                "author_name": "Priya Nair",
                "body": "Super helpful Vikram, will check the empaneled vendor list today!",
                "created_at": "2026-10-18T15:10:00Z"
            }
        ]
    },
    {
        "id": "post-02",
        "user_id": "usr_karthik",
        "author_name": "Karthik R.",
        "type": "success",
        "title": "Reached 45 B2B office accounts in Bengaluru for Chikmagalur filter coffee capsules!",
        "body": "Found this market gap on StartupRival 3 months ago: traditional tech offices were paying ₹18/cup for awful vending machine powder. We sourced directly from smallholder roasters in Chikmagalur and packaged compostable pods. Breakeven achieved in Month 3 with ₹1.8L monthly profit.",
        "sector": "Food & Beverage",
        "region": "Karnataka",
        "upvotes": 58,
        "comment_count": 8,
        "created_at": "2026-10-17T09:15:00Z",
        "comments": [
            {
                "id": "comm-03",
                "author_name": "Deepak Verma",
                "body": "Incredible execution Karthik! How are you handling machine placement in smaller offices?",
                "created_at": "2026-10-17T11:45:00Z"
            }
        ]
    },
    {
        "id": "post-03",
        "user_id": "usr_system",
        "author_name": "StartupRival Radar",
        "type": "resource",
        "title": "Weekly Top Market Gaps This Week (October 2026)",
        "body": "Here are the 3 fastest growing market gaps synthesized from regional data across India:\n\n1. **Bio-Waste Pelletization in Gujarat Industrial Boilers** (Demand Score: 89) — Coal ban enforcement driving immediate fuel substitution.\n2. **Vernacular Diagnostic Booking in Tier-2 UP** (Demand Score: 84) — Severe specialist shortage in Kanpur and Varanasi.\n3. **Quick-Commerce Micro-Hubs in Coimbatore** (Demand Score: 81) — Tier-2 industrial cluster demand surging.\n\nOpen each in the Gap Finder to inspect the complete validation scorecard.",
        "sector": "Technology",
        "region": "Pan-India",
        "upvotes": 42,
        "comment_count": 3,
        "created_at": "2026-10-19T03:30:00Z",
        "comments": []
    }
]

def get_all_posts(post_type: Optional[str] = None, sector: Optional[str] = None) -> List[Dict[str, Any]]:
    posts = COMMUNITY_POSTS
    if post_type and post_type != "all":
        posts = [p for p in posts if p["type"].lower() == post_type.lower()]
    if sector and sector != "all":
        posts = [p for p in posts if p.get("sector", "").lower() == sector.lower()]
    return sorted(posts, key=lambda x: x.get("created_at", ""), reverse=True)

def create_post(user_id: str, author_name: str, p_type: str, title: str, body: str, sector: str, region: str) -> Dict[str, Any]:
    new_post = {
        "id": f"post-{int(datetime.utcnow().timestamp())}",
        "user_id": user_id,
        "author_name": author_name or "Founder",
        "type": p_type,
        "title": title,
        "body": body,
        "sector": sector,
        "region": region,
        "upvotes": 1,
        "comment_count": 0,
        "created_at": datetime.utcnow().isoformat(),
        "comments": []
    }
    COMMUNITY_POSTS.insert(0, new_post)
    return new_post

def add_comment(post_id: str, user_id: str, author_name: str, body: str) -> Optional[Dict[str, Any]]:
    for post in COMMUNITY_POSTS:
        if post["id"] == post_id:
            comment = {
                "id": f"comm-{int(datetime.utcnow().timestamp())}",
                "author_name": author_name or "Founder",
                "body": body,
                "created_at": datetime.utcnow().isoformat()
            }
            if "comments" not in post:
                post["comments"] = []
            post["comments"].append(comment)
            post["comment_count"] = len(post["comments"])
            return comment
    return None

def toggle_upvote(post_id: str) -> int:
    for post in COMMUNITY_POSTS:
        if post["id"] == post_id:
            post["upvotes"] = post.get("upvotes", 0) + 1
            return post["upvotes"]
    return 0
