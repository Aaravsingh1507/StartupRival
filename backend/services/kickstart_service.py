from typing import Dict, Any

KICKSTART_TEMPLATES = {
    "agriculture": {
        "concept": "Decentralized Agricultural Aggregation & Farmgate Cold Storage",
        "target_customers": "Horticultural growers, vegetable farmer producer organizations (FPOs), local mandi traders",
        "business_model": "Pay-per-crate cold storage fee (₹1.50/kg/day) + optional direct B2B mandi dispatch commission (4%)",
        "capital_min": 250000,
        "capital_max": 1200000,
        "breakdown": {
            "Pre-cooling & modular chillers": 550000,
            "Solar backup & inverters": 220000,
            "Lease deposit (semi-urban/rural)": 100000,
            "Weighing & grading machinery": 80000,
            "Working capital (3 months)": 150000
        },
        "assumptions": [
            "Assumes 1,500 sq.ft leased shed near APMC mandi perimeter",
            "Solar rooftop subsidy covers up to 30% of energy infrastructure",
            "Average crate occupancy rate of 65% in first 6 months"
        ],
        "licenses": [
            {"name": "FSSAI Food Business Registration", "description": "Mandatory basic license for agricultural produce storage and handling under FSSAI regulations.", "portal_url": "https://foscos.fssai.gov.in", "timeframe": "7-14 days", "mandatory": True},
            {"name": "MSME Udyam Registration", "description": "Free central government registration granting priority sector lending, collateral-free loans, and electricity subsidies.", "portal_url": "https://udyamregistration.gov.in", "timeframe": "1 day", "mandatory": True},
            {"name": "APMC Trader / Service Provider License", "description": "State agricultural marketing board permit to operate cold storage and farm trading near APMC yards.", "portal_url": "https://enam.gov.in", "timeframe": "15-25 days", "mandatory": True},
            {"name": "GST Registration", "description": "Tax identity for commercial B2B invoicing and claiming input tax credit.", "portal_url": "https://www.gst.gov.in", "timeframe": "3-7 days", "mandatory": True}
        ],
        "schemes": [
            {"name": "Agriculture Infrastructure Fund (AIF)", "benefit": "3% interest subvention per annum on bank loans up to ₹2 Crore for post-harvest management infrastructure.", "eligibility": "Agri-entrepreneurs, FPOs, and startups setting up cold chain units.", "apply_url": "https://agriinfra.dac.gov.in", "agency": "Ministry of Agriculture & Farmers Welfare"},
            {"name": "PM Formalisation of Micro Food Processing Enterprises (PM FME)", "benefit": "35% credit-linked capital subsidy up to ₹10 Lakhs on plant and machinery.", "eligibility": "Individual micro-units and self-help groups.", "apply_url": "https://pmfme.mofpi.gov.in", "agency": "Ministry of Food Processing Industries"},
            {"name": "Pradhan Mantri Mudra Yojana (Tarun Category)", "benefit": "Collateral-free institutional loan up to ₹10 Lakhs for enterprise scaling.", "eligibility": "Non-corporate, non-farm small/micro enterprises.", "apply_url": "https://www.mudra.org.in", "agency": "SIDBI"}
        ],
        "location_advice": {
            "space_required": "1,200 – 2,500 sq.ft covered shed with heavy 3-phase commercial power",
            "logistics_access": "Within 8-15 km from major agricultural mandi with direct asphalt road access for light commercial vehicles (Tata Ace / Eicher)",
            "regional_tip": "In Maharashtra/Karnataka, partner with primary agricultural cooperative societies (PACS) to utilize underutilized rural warehouses."
        },
        "first_steps": [
            {"step": 1, "action": "Secure 3-year registered lease for a 1,500 sq.ft shed within 10 km of local mandi.", "timeline": "Week 1-2"},
            {"step": 2, "action": "File Udyam Registration and submit AIF application with local PSU bank.", "timeline": "Week 2-3"},
            {"step": 3, "action": "Procure modular cold-room panels and solar inverter system with OEM warranty.", "timeline": "Week 3-6"},
            {"step": 4, "action": "Obtain FSSAI and local Gram Panchayat / Municipal trade NOC.", "timeline": "Week 5-7"},
            {"step": 5, "action": "Run pilot cold storage trial with 15 neighboring grape/onion farmers at introductory 30% discount.", "timeline": "Week 8"}
        ],
        "timeline_months": 3
    },
    "default": {
        "concept": "Localized Managed Service & Supply Enablement Platform",
        "target_customers": "Regional MSMEs, independent merchants, and suburban consumer households",
        "business_model": "Transaction margin (8-15%) + recurring annual enterprise workflow subscription",
        "capital_min": 150000,
        "capital_max": 750000,
        "breakdown": {
            "Initial technology setup & cloud": 75000,
            "Office deposit & local workstation": 90000,
            "Field pilot & customer acquisition": 120000,
            "Legal, licensing & company setup": 45000,
            "Working capital reserve (4 months)": 180000
        },
        "assumptions": [
            "Asset-light hybrid model leveraging existing commercial infrastructure",
            "Founder manages sales and initial client onboarding personally",
            "Breakeven estimated within 7-9 months of active operations"
        ],
        "licenses": [
            {"name": "MSME Udyam Registration", "description": "Primary central identity enabling collateral-free bank loans and patent/trademark discounts.", "portal_url": "https://udyamregistration.gov.in", "timeframe": "1-2 days", "mandatory": True},
            {"name": "Shop and Establishment Act Registration", "description": "Mandatory state commercial registration legitimizing business operations and employee hiring.", "portal_url": "https://www.india.gov.in", "timeframe": "5-10 days", "mandatory": True},
            {"name": "GST Registration", "description": "Goods and Services Tax ID required for inter-state supply and B2B vendor contracts.", "portal_url": "https://www.gst.gov.in", "timeframe": "3-7 days", "mandatory": True},
            {"name": "Startup India DPIIT Recognition", "description": "Official certification granting income tax exemptions (80-IAC) and fast-tracked patent filings.", "portal_url": "https://www.startupindia.gov.in", "timeframe": "7-14 days", "mandatory": False}
        ],
        "schemes": [
            {"name": "Startup India Seed Fund Scheme (SISFS)", "benefit": "Up to ₹20 Lakhs as grant for proof of concept, and up to ₹50 Lakhs via convertible debentures.", "eligibility": "DPIIT-recognized startups incorporated within 2 years.", "apply_url": "https://seedfund.startupindia.gov.in", "agency": "DPIIT"},
            {"name": "Credit Guarantee Scheme for Micro and Small Enterprises (CGTMSE)", "benefit": "Collateral-free credit facility up to ₹5 Crore through scheduled commercial banks.", "eligibility": "New and existing micro and small enterprises.", "apply_url": "https://www.cgtmse.in", "agency": "Ministry of MSME & SIDBI"},
            {"name": "Pradhan Mantri Mudra Yojana (Kishore / Tarun)", "benefit": "Collateral-free institutional loans from ₹50,000 to ₹10 Lakhs for business establishment.", "eligibility": "Small business entrepreneurs and proprietary firms.", "apply_url": "https://www.mudra.org.in", "agency": "Mudra Ltd."}
        ],
        "location_advice": {
            "space_required": "400 – 800 sq.ft commercial office or co-working flex desk",
            "logistics_access": "High-speed broadband connectivity, convenient public transit for client demonstrations",
            "regional_tip": "Keep fixed physical overhead low in Tier-1 metros by starting from tech incubators or shared spaces."
        },
        "first_steps": [
            {"step": 1, "action": "Incorporate legal entity (LLP or Private Limited) via MCA SPICe+ portal.", "timeline": "Week 1-2"},
            {"step": 2, "action": "Register for Udyam and open commercial current bank account.", "timeline": "Week 2-3"},
            {"step": 3, "action": "Build MVP prototype and secure 3 non-binding letters of intent (LOIs) from regional businesses.", "timeline": "Week 3-6"},
            {"step": 4, "action": "Apply for Startup India DPIIT recognition and local incubator support.", "timeline": "Week 6-8"},
            {"step": 5, "action": "Launch controlled pilot with first 10 paying customers in your primary district.", "timeline": "Week 8-10"}
        ],
        "timeline_months": 3
    }
}

def generate_kickstart_kit(sector: str, region: str) -> Dict[str, Any]:
    sec_key = sector.strip().lower()
    base = KICKSTART_TEMPLATES.get(sec_key, KICKSTART_TEMPLATES["default"])

    return {
        "sector": sector,
        "region": region,
        "business_overview": {
            "concept": base["concept"],
            "target_customers": base["target_customers"],
            "business_model": base["business_model"],
            "region_tailoring": f"Specifically tailored for commercial dynamics across {region}."
        },
        "capital_estimate": {
            "min_inr": base["capital_min"],
            "max_inr": base["capital_max"],
            "currency": "INR",
            "breakdown": base["breakdown"],
            "assumptions": base["assumptions"]
        },
        "licenses": base["licenses"],
        "schemes": base["schemes"],
        "location_advice": base["location_advice"],
        "first_steps": base["first_steps"],
        "timeline_months": base["timeline_months"]
    }
