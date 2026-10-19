from typing import Dict, Any

def generate_gtm_guide(sector: str, region: str) -> Dict[str, Any]:
    sec_key = sector.strip().lower()

    # Channels tailored to Indian commercial realities
    if "agri" in sec_key:
        channels = [
            {"channel": "Kisan WhatsApp Broadcast Groups", "why_it_works": "Indian farmers heavily rely on verified peer WhatsApp communities for mandi prices and seasonal disease alerts.", "how_to_start": "Partner with 3 village Sarpanches and local agri-input shopkeepers to seed daily price bullet points.", "cost": "Free", "first_action": "Create an automated WhatsApp Business catalog with regional crop advisory."},
            {"channel": "Mandi Gate Direct Demonstration", "why_it_works": "Face-to-face trust building during peak morning auction hours when farmers are actively weighing harvests.", "how_to_start": "Set up a branded demo kiosk outside the APMC entry gate offering free crop quality grading.", "cost": "Paid (₹5,000/week)", "first_action": "Print 500 vernacular pamphlets with a QR code leading to your WhatsApp bot."},
            {"channel": "Regional YouTube Influencer Collabs", "why_it_works": "Vernacular agri-creators on YouTube have immense credibility among progressive farmers.", "how_to_start": "Identify creators with 50k–200k subscribers focusing on modern farm machinery in your state.", "cost": "Paid (₹15,000/video)", "first_action": "Send a sample cold-box crate for an unboxing and durability test video."}
        ]
        pricing = {
            "approach": "Daily Pay-Per-Crate Storage + Volume Rebate",
            "price_range_inr": "₹1.50 – ₹3.00 per kg/day",
            "anchor_price": "₹2.20 / kg (vs. ₹8/kg harvest price collapse during glut)",
            "free_tier_needed": True,
            "rationale": "Anchor against distress selling losses. Offer the first 5 crates free for new farmers to prove zero spoilage."
        }
    elif "food" in sec_key or "retail" in sec_key:
        channels = [
            {"channel": "WhatsApp Business Quick-Order Automation", "why_it_works": "Over 82% of repeat food & grocery purchases in Indian tier-2 towns happen via direct WhatsApp chats.", "how_to_start": "Deploy a WhatsApp Commerce flow with UPI instant payment link and delivery confirmation.", "cost": "Free", "first_action": "Set up a greeting message with your top 5 breakfast/snack bundles."},
            {"channel": "Hyperlocal Apartment Society Tasting Stalls", "why_it_works": "Direct access to 200–800 middle-class families in one evening without paying retail shelf listing fees.", "how_to_start": "Book Saturday morning sampling booths with Resident Welfare Associations (RWAs).", "cost": "Paid (₹1,500 – ₹3,000 / stall)", "first_action": "Prepare 150 bite-sized fresh samples with an instant QR discount code for WhatsApp orders."},
            {"channel": "Instagram Reels Localized Food Walkers", "why_it_works": "City-specific food bloggers drive immediate weekend trial runs for distinctive local flavors.", "how_to_start": "Invite 5 micro-influencers (10k-50k followers) in your specific city for an exclusive behind-the-scenes tasting.", "cost": "Free (Exchange for food hampers)", "first_action": "Host a tasting session emphasizing traditional preservative-free preparation."}
        ]
        pricing = {
            "approach": "Subscription Bundle with Morning Dispatch",
            "price_range_inr": "₹75 – ₹220 per unit/pack",
            "anchor_price": "₹149 weekly subscription (anchored against commercial packaged alternatives)",
            "free_tier_needed": False,
            "rationale": "Indian consumers perceive ultra-low food prices as indicative of low hygiene. Charge fair premium with trial pricing."
        }
    else:
        channels = [
            {"channel": "WhatsApp Business & Direct Vendor Connect", "why_it_works": "B2B decisions in Indian non-metro clusters happen over phone calls and direct WhatsApp document sharing.", "how_to_start": "Create a clean 2-page PDF portfolio and share directly with targeted MSME proprietors.", "cost": "Free", "first_action": "Message 25 verified business owners in your local industrial estate."},
            {"channel": "Google My Business & Local SEO Optimization", "why_it_works": "Top source for local commercial search queries (e.g. 'wholesale distributor near me').", "how_to_start": "Claim and verify your GMB profile with high-res photos of your facility and GST certificate.", "cost": "Free", "first_action": "Collect 10 verified Google reviews from pilot trial partners."},
            {"channel": "Trade Association & Industrial Cluster Meetups", "why_it_works": "Chambers of Commerce (FICCI, ASSOCHAM, Laghu Udyog Bharati) host monthly vendor meets.", "how_to_start": "Attend the monthly district industrial association meeting as a guest speaker on digital efficiency.", "cost": "Paid (₹2,500 membership)", "first_action": "Register as an associate member of your district MSME council."}
        ]
        pricing = {
            "approach": "Value-Based Tiered Monthly Retainer",
            "price_range_inr": "₹3,500 – ₹15,000 / month",
            "anchor_price": "₹4,999/month (anchored against the cost of hiring 1 full-time clerk at ₹18,000/month)",
            "free_tier_needed": True,
            "rationale": "Provide a 14-day risk-free pilot or introductory starter tier to build transactional trust."
        }

    first_100 = [
        {"step": 1, "tactic": "The 'Inner Circle' Test Cohort (10 customers)", "timeline": "Days 1–10", "estimated_cost": "₹0", "action_item": "Onboard 10 friendly local merchants or contacts personally; shadow their usage daily to eliminate UI/operational friction."},
        {"step": 2, "tactic": "Hyper-Targeted WhatsApp Outreach (25 customers)", "timeline": "Days 11–25", "estimated_cost": "₹1,500", "action_item": "Conduct 50 phone calls and 100 direct personalized WhatsApp interactions with regional trade directory leads."},
        {"step": 3, "tactic": "Physical Kiosk / Mandi Demonstration (30 customers)", "timeline": "Days 26–40", "estimated_cost": "₹6,000", "action_item": "Set up a physical presence at high-density commercial markets during peak morning transaction hours."},
        {"step": 4, "tactic": "Two-Sided Referral Incentive (20 customers)", "timeline": "Days 41–55", "estimated_cost": "₹3,500", "action_item": "Offer existing happy clients ₹500 credit or 1 free service cycle for every referred peer who registers."},
        {"step": 5, "tactic": "Micro-Creator Spotlight / Local PR (15 customers)", "timeline": "Days 56–70", "estimated_cost": "₹4,000", "action_item": "Partner with a local vernacular YouTube/Instagram creator to run a case study showcasing customer cost savings."}
    ]

    tier_2_3_note = (
        f"In non-metro hubs across {region}, business relationships supersede pure digital advertising. "
        "Do not rely solely on paid Facebook or Google ads. Prioritize in-person handshakes, local language collateral, "
        "and physical word-of-mouth validation."
    )

    return {
        "sector": sector,
        "region": region,
        "top_channels": channels,
        "pricing_strategy": pricing,
        "first_100_customers": first_100,
        "tier_2_3_note": tier_2_3_note,
        "language_tip": f"Translate all onboarding material into the predominant regional language of {region} (e.g. Marathi, Kannada, Tamil, or Hindi) alongside simple English.",
        "biggest_mistake": "Relying on English-only desktop websites and trying to collect upfront annual subscriptions before demonstrating tangible on-ground value."
    }
