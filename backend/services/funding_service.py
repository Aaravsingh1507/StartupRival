from typing import List, Dict, Any

INDIAN_FUNDING_SOURCES = [
    # GRANTS
    {
        "id": "fund-grant-01",
        "name": "Startup India Seed Fund Scheme (SISFS)",
        "type": "grant",
        "sectors": ["Agriculture", "Technology", "Healthcare", "Education", "Manufacturing", "Retail", "Services", "Food & Beverage", "Other"],
        "ticket_size": "Up to ₹20 Lakhs (Grant) / ₹50 Lakhs (Debt)",
        "eligibility": "DPIIT-recognized startups incorporated within 2 years with a viable commercial proof-of-concept.",
        "stages_supported": ["idea", "mvp"],
        "fit_reason": "Ideal non-dilutive central government grant to build prototypes and run regional pilot trials.",
        "apply_url": "https://seedfund.startupindia.gov.in"
    },
    {
        "id": "fund-grant-02",
        "name": "DST NIDHI-PRAYAS Grant",
        "type": "grant",
        "sectors": ["Technology", "Manufacturing", "Healthcare", "Agriculture", "Other"],
        "ticket_size": "Up to ₹10 Lakhs (100% Grant)",
        "eligibility": "Individual innovators and early-stage tech entrepreneurs with hardware or software proof-of-concept.",
        "stages_supported": ["idea"],
        "fit_reason": "Zero-equity prototyping grant managed by Dept of Science & Technology incubators.",
        "apply_url": "https://nidhi-prayas.org"
    },
    {
        "id": "fund-grant-03",
        "name": "NABARD Agri-Business Incubation Centre (ABIC)",
        "type": "grant",
        "sectors": ["Agriculture", "Food & Beverage", "Manufacturing"],
        "ticket_size": "₹5 Lakhs – ₹25 Lakhs",
        "eligibility": "Startups and FPOs working on post-harvest cold chains, bio-inputs, or farm mechanization.",
        "stages_supported": ["idea", "mvp"],
        "fit_reason": "Tailored institutional grants and priority market linkage for rural and agri-tech innovations.",
        "apply_url": "https://www.nabard.org"
    },

    # ANGEL NETWORKS
    {
        "id": "fund-angel-01",
        "name": "Indian Angel Network (IAN)",
        "type": "angel",
        "sectors": ["Technology", "Healthcare", "Education", "Food & Beverage", "Retail", "Services", "Manufacturing"],
        "ticket_size": "₹25 Lakhs – ₹3.5 Crore",
        "eligibility": "Early-stage ventures with a working MVP, early customer validation, and scalable unit economics.",
        "stages_supported": ["mvp", "revenue"],
        "fit_reason": "India's largest angel network providing high-conviction mentorship alongside capital.",
        "apply_url": "https://www.indianangelnetwork.com"
    },
    {
        "id": "fund-angel-02",
        "name": "Mumbai Angels Network",
        "type": "angel",
        "sectors": ["Technology", "Retail", "Food & Beverage", "Healthcare", "Services"],
        "ticket_size": "₹50 Lakhs – ₹2 Crore",
        "eligibility": "D2C, SaaS, and consumer tech startups showing monthly recurring revenue growth.",
        "stages_supported": ["mvp", "revenue"],
        "fit_reason": "Strong domestic consumer brand track record and national distributor syndicate access.",
        "apply_url": "https://www.mumbaiangels.com"
    },
    {
        "id": "fund-angel-03",
        "name": "LetsVenture",
        "type": "angel",
        "sectors": ["Technology", "Agriculture", "Healthcare", "Education", "Retail", "Manufacturing"],
        "ticket_size": "₹15 Lakhs – ₹1.5 Crore",
        "eligibility": "Incorporated private limited companies with founder commitment and demonstrable pilot traction.",
        "stages_supported": ["idea", "mvp", "revenue"],
        "fit_reason": "Streamlined digital angel syndicate enabling quick closing of pre-seed micro rounds.",
        "apply_url": "https://letsventure.com"
    },

    # ACCELERATORS & INCUBATORS
    {
        "id": "fund-acc-01",
        "name": "Antler India",
        "type": "accelerator",
        "sectors": ["Technology", "Services", "Retail", "Food & Beverage", "Healthcare"],
        "ticket_size": "₹1.5 Crore – ₹3.5 Crore ($175k – $400k)",
        "eligibility": "Exceptional solo founders or co-founder pairs at idea or early prototype stage.",
        "stages_supported": ["idea", "mvp"],
        "fit_reason": "Hands-on day-zero partner helping founders validate market fit and access institutional capital.",
        "apply_url": "https://www.antler.co/location/india"
    },
    {
        "id": "fund-acc-02",
        "name": "Peak XV Surge (formerly Sequoia Surge)",
        "type": "accelerator",
        "sectors": ["Technology", "Healthcare", "Manufacturing", "Retail", "Services"],
        "ticket_size": "Up to ₹25 Crore ($3M)",
        "eligibility": "Early-stage breakout startups with high technical moats and global/pan-India scale potential.",
        "stages_supported": ["mvp", "revenue"],
        "fit_reason": "Premier Indian seed accelerator with direct tier-1 VC follow-on syndication.",
        "apply_url": "https://www.surgeahead.com"
    },
    {
        "id": "fund-acc-03",
        "name": "T-Hub (Lab32 & T-Angel)",
        "type": "accelerator",
        "sectors": ["Technology", "Agriculture", "Healthcare", "Manufacturing", "Education"],
        "ticket_size": "₹10 Lakhs – ₹50 Lakhs (Grants & Seed)",
        "eligibility": "Tech-enabled startups with functional prototype looking for enterprise and government procurement.",
        "stages_supported": ["idea", "mvp", "revenue"],
        "fit_reason": "India's largest state innovation ecosystem offering corporate pilot testbeds.",
        "apply_url": "https://t-hub.co"
    },

    # VENTURE CAPITAL
    {
        "id": "fund-vc-01",
        "name": "Blume Ventures",
        "type": "vc",
        "sectors": ["Technology", "Education", "Healthcare", "Retail", "Services"],
        "ticket_size": "₹3.5 Crore – ₹20 Crore ($500k – $2.5M)",
        "eligibility": "Pre-Series A / Series A Indian tech startups with clear product-market fit and repeat revenue.",
        "stages_supported": ["revenue", "scaling"],
        "fit_reason": "India's premier homegrown early-stage VC with a massive domestic founder portfolio network.",
        "apply_url": "https://blume.vc"
    },
    {
        "id": "fund-vc-02",
        "name": "Omnivore",
        "type": "vc",
        "sectors": ["Agriculture", "Food & Beverage", "Manufacturing"],
        "ticket_size": "₹5 Crore – ₹25 Crore",
        "eligibility": "Agri-tech, rural fintech, and climate-smart agricultural supply chain businesses.",
        "stages_supported": ["revenue", "scaling"],
        "fit_reason": "Dedicated thematic agritech fund with deep ground-level distribution partnerships across India.",
        "apply_url": "https://www.omnivore.vc"
    }
]

def search_funding_sources(stage: str, amount_bracket: str, is_registered: bool, sector: str = "all") -> List[Dict[str, Any]]:
    clean_stage = stage.strip().lower() if stage else "idea"

    # Match stage logic from spec:
    # idea stage -> grants, accelerators, angel (pre-seed)
    # mvp stage -> seed rounds, accelerators
    # revenue stage -> Series A, venture debt
    # scaling stage -> Series B+, PE
    filtered = []
    for f in INDIAN_FUNDING_SOURCES:
        if clean_stage in f["stages_supported"]:
            # Check sector match
            if sector.lower() == "all" or any(s.lower() == sector.lower() for s in f["sectors"]):
                filtered.append(f)

    if not filtered:
        filtered = INDIAN_FUNDING_SOURCES[:5]

    return filtered[:10]
