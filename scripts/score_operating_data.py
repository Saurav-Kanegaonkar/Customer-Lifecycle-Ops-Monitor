import csv
import json
import random
from collections import Counter, defaultdict
from datetime import date, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUTPUTS = ROOT / "analysis" / "outputs"
SRC = ROOT / "src"
random.seed(42)


def clamp(value, low=0, high=100):
    return max(low, min(high, value))


def money(value):
    return int(round(value / 1000) * 1000)


def write_csv(path, rows, fields):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


industries = ["HVAC", "Electrical", "Plumbing", "Security", "Fire Protection", "Multi-Trade"]
regions = ["North America", "United Kingdom", "Australia", "New Zealand"]
tiers = ["Starter", "Growth", "Scale", "Enterprise"]
stages = ["Onboarding", "Adoption", "Renewal", "Expansion"]
csm_owners = ["CS Ops", "RevOps", "Customer Success", "Sales Ops"]
data_owners = ["RevOps", "Finance", "Data Engineering", "Customer Ops"]

tier_arr = {
    "Starter": (18000, 54000),
    "Growth": (55000, 145000),
    "Scale": (150000, 420000),
    "Enterprise": (430000, 950000),
}

stage_adoption_base = {
    "Onboarding": 48,
    "Adoption": 66,
    "Renewal": 72,
    "Expansion": 81,
}

accounts = []
for idx in range(1, 49):
    tier = random.choices(tiers, weights=[22, 38, 28, 12])[0]
    stage = random.choices(stages, weights=[20, 34, 28, 18])[0]
    arr = money(random.randint(*tier_arr[tier]))
    adoption = clamp(random.gauss(stage_adoption_base[stage], 12))
    data_quality = clamp(random.gauss(87, 8))
    ticket_burden = max(0, int(random.gauss(7, 4)))
    renewal_days = random.randint(15, 330)
    onboarding_days = random.randint(8, 95) if stage == "Onboarding" else random.randint(45, 220)
    risk = clamp(78 - adoption * 0.46 - data_quality * 0.24 + ticket_burden * 2.4 + (30 if renewal_days < 60 else 0))
    expansion = clamp(adoption * 0.54 + (arr / 12000) + random.gauss(8, 9))
    confidence = clamp(data_quality - random.uniform(3, 17) + (8 if stage in ["Renewal", "Expansion"] else 0))
    accounts.append({
        "account_id": f"ACC{idx:03d}",
        "account_name": f"Account {idx:03d}",
        "industry": random.choice(industries),
        "region": random.choice(regions),
        "plan_tier": tier,
        "lifecycle_stage": stage,
        "csm_owner": random.choice(csm_owners),
        "arr": arr,
        "onboarding_age_days": onboarding_days,
        "days_to_renewal": renewal_days,
        "adoption_score": round(adoption, 1),
        "retention_risk": round(risk, 1),
        "expansion_signal": round(expansion, 1),
        "metric_confidence": round(confidence, 1),
        "support_ticket_burden": ticket_burden,
    })

daily_rows = []
start = date(2026, 1, 1)
for account in accounts:
    adoption = float(account["adoption_score"])
    risk = float(account["retention_risk"])
    confidence = float(account["metric_confidence"])
    expansion = float(account["expansion_signal"])
    for day in range(90):
        current = start + timedelta(days=day)
        seasonal = (day % 30) / 30
        daily_adoption = clamp(adoption + random.gauss(0, 4) + seasonal * 2)
        daily_confidence = clamp(confidence + random.gauss(0, 3))
        daily_risk = clamp(risk + random.gauss(0, 5) - seasonal * 1.5)
        daily_expansion = clamp(expansion + random.gauss(0, 4))
        daily_rows.append({
            "date": current.isoformat(),
            "account_id": account["account_id"],
            "activation_rate": round(clamp(daily_adoption - random.uniform(3, 12)), 1),
            "adoption_score": round(daily_adoption, 1),
            "retention_risk": round(daily_risk, 1),
            "expansion_signal": round(daily_expansion, 1),
            "revenue_at_risk": money(account["arr"] * daily_risk / 100),
            "metric_confidence": round(daily_confidence, 1),
            "data_quality_score": round(clamp(daily_confidence + random.gauss(3, 4)), 1),
        })

metric_rows = [
    ["onboarding_activation_rate", "Customer Ops", "CRM, product events", "Certified", 5, 1.8, "Lifecycle Health"],
    ["time_to_first_value", "Customer Ops", "Implementation tasks, product events", "Needs owner signoff", 18, 4.6, "Lifecycle Health"],
    ["adoption_depth_score", "RevOps", "Product events, contract metadata", "Certified", 7, 2.2, "Lifecycle Health"],
    ["renewal_risk_score", "RevOps", "CRM, support, billing", "Certified", 9, 2.9, "Action Queue"],
    ["expansion_readiness", "Sales Ops", "Usage, plan, CRM opportunity", "Draft", 14, 5.7, "Action Queue"],
    ["gross_retention_bridge", "Finance", "Billing, CRM, product account", "Needs reconciliation", 28, 7.4, "Metrics Certification"],
    ["support_to_health_ratio", "Customer Success", "Support tickets, account health", "Certified", 11, 2.5, "Metrics Certification"],
    ["dashboard_certification_flag", "Data Engineering", "Semantic model, dashboard catalog", "Certified", 4, 1.2, "Metrics Certification"],
]
metrics = []
for name, owner, sources, status, freshness, gap, surface in metric_rows:
    certified = "Yes" if status == "Certified" else "No"
    metrics.append({
        "metric_name": name,
        "business_owner": owner,
        "source_systems": sources,
        "definition_status": status,
        "freshness_hours": freshness,
        "reconciliation_gap_pct": gap,
        "certified": certified,
        "dashboard_surface": surface,
    })

issue_types = ["missing CRM owner", "late product event", "billing join gap", "support mapping mismatch", "duplicate account key"]
incident_rows = []
for idx in range(1, 37):
    metric = random.choice(metrics)
    severity = random.choices(["Low", "Medium", "High"], weights=[30, 48, 22])[0]
    source = random.choice(["CRM", "Product Events", "Billing", "Support", "Semantic Model"])
    incident_rows.append({
        "incident_id": f"DQI{idx:03d}",
        "source_system": source,
        "affected_metric": metric["metric_name"],
        "issue_type": random.choice(issue_types),
        "severity": severity,
        "open_days": random.randint(1, 24),
        "owner": random.choice(data_owners),
        "status": random.choices(["Open", "Monitoring", "Resolved"], weights=[42, 34, 24])[0],
        "recommended_fix": random.choice([
            "Map orphan account IDs before dashboard refresh",
            "Backfill product events for certification window",
            "Align CRM stage logic with finance renewal bridge",
            "Add freshness alert to semantic model job",
        ]),
    })

actions = []
for account in accounts:
    risk = float(account["retention_risk"])
    adoption_gap = 100 - float(account["adoption_score"])
    confidence_gap = 100 - float(account["metric_confidence"])
    arr = int(account["arr"])
    effort = random.randint(6, 42)
    value_at_risk = money(arr * risk / 100)
    priority = risk * 0.42 + adoption_gap * 0.24 + confidence_gap * 0.16 + min(arr / 12000, 42) - effort * 0.18
    if account["lifecycle_stage"] == "Onboarding":
        action = "Accelerate onboarding milestone review"
        owner = "Customer Ops"
    elif account["lifecycle_stage"] == "Renewal":
        action = "Validate renewal risk bridge with Finance"
        owner = "RevOps"
    elif account["lifecycle_stage"] == "Expansion":
        action = "Package expansion signal for Sales Ops"
        owner = "Sales Ops"
    else:
        action = "Improve adoption playbook coverage"
        owner = "Customer Success"
    actions.append({
        "account_id": account["account_id"],
        "account_name": account["account_name"],
        "plan_tier": account["plan_tier"],
        "lifecycle_stage": account["lifecycle_stage"],
        "recommended_owner": owner,
        "recommended_action": action,
        "priority_score": round(priority, 1),
        "arr": arr,
        "revenue_at_risk": value_at_risk,
        "effort_hours": effort,
        "reason": f"{account['lifecycle_stage']} account with {risk:.1f} retention risk and {account['metric_confidence']} metric confidence",
    })
actions.sort(key=lambda row: row["priority_score"], reverse=True)

write_csv(DATA / "accounts.csv", accounts, list(accounts[0].keys()))
write_csv(DATA / "daily_metrics.csv", daily_rows, list(daily_rows[0].keys()))
write_csv(DATA / "metric_certification.csv", metrics, list(metrics[0].keys()))
write_csv(DATA / "data_quality_incidents.csv", incident_rows, list(incident_rows[0].keys()))
write_csv(DATA / "recommended_actions.csv", actions, list(actions[0].keys()))
write_csv(OUTPUTS / "priority_queue.csv", actions[:25], list(actions[0].keys()))

stage_counts = Counter(row["lifecycle_stage"] for row in accounts)
stage_mix = []
for stage in stages:
    stage_accounts = [row for row in accounts if row["lifecycle_stage"] == stage]
    stage_mix.append({
        "stage": stage,
        "accounts": len(stage_accounts),
        "avgAdoption": round(sum(float(row["adoption_score"]) for row in stage_accounts) / len(stage_accounts), 1),
        "avgRisk": round(sum(float(row["retention_risk"]) for row in stage_accounts) / len(stage_accounts), 1),
    })

industry_groups = defaultdict(list)
for row in accounts:
    industry_groups[row["industry"]].append(row)
segment_risk = []
for industry, rows in sorted(industry_groups.items()):
    segment_risk.append({
        "segment": industry,
        "accounts": len(rows),
        "risk": round(sum(float(row["retention_risk"]) for row in rows) / len(rows), 1),
        "arr": sum(int(row["arr"]) for row in rows),
    })

certified_pct = round(sum(1 for row in metrics if row["certified"] == "Yes") / len(metrics) * 100)
high_incidents = sum(1 for row in incident_rows if row["severity"] == "High" and row["status"] != "Resolved")
arr_under_monitor = sum(int(row["arr"]) for row in accounts)
revenue_at_risk = sum(row["revenue_at_risk"] for row in actions[:12])

summary = [
    {"label": "Accounts modeled", "value": str(len(accounts)), "detail": "synthetic lifecycle portfolio", "tone": "info"},
    {"label": "ARR under monitor", "value": f"${arr_under_monitor / 1000000:.1f}M", "detail": "modeled contract value", "tone": "success"},
    {"label": "Certified metrics", "value": f"{certified_pct}%", "detail": "ready for self-service", "tone": "success"},
    {"label": "Top queue risk", "value": f"${revenue_at_risk / 1000000:.1f}M", "detail": "modeled revenue at risk", "tone": "warning"},
]

dashboard_data = {
    "summary": summary,
    "stageMix": stage_mix,
    "segmentRisk": sorted(segment_risk, key=lambda row: row["risk"], reverse=True),
    "metrics": metrics,
    "incidents": sorted(incident_rows, key=lambda row: (row["severity"] != "High", -row["open_days"]))[:12],
    "actions": actions[:14],
    "findings": [
        "Onboarding and renewal accounts create the most urgent operating queue because adoption gaps and renewal proximity compound risk.",
        "Metric certification is the unlock for trusted self-service reporting. The largest gaps sit in billing joins and CRM stage definitions.",
        "The most useful executive view is a ranked action queue that explains owner, value at risk, confidence, and next action in the same place.",
    ],
    "certifiedPct": certified_pct,
    "highIncidents": high_incidents,
}

(SRC / "data.js").write_text("window.dashboardData = " + json.dumps(dashboard_data, indent=2) + ";\n")

write_csv(DATA / "synthetic_operating_data.csv", [
    {"surface": "Lifecycle Health", "records": len(daily_rows), "purpose": "Daily account performance and lifecycle signal tracking"},
    {"surface": "Metrics Certification", "records": len(metrics) + len(incident_rows), "purpose": "Metric definitions, owners, freshness, reconciliation, and data quality issues"},
    {"surface": "Action Queue", "records": len(actions), "purpose": "Prioritized account interventions for customer-facing teams"},
], ["surface", "records", "purpose"])

top = actions[0]
findings_md = f"""# Executive Findings

## What I analyzed

I modeled a synthetic customer lifecycle operating mart with {len(accounts)} accounts, {len(daily_rows):,} daily metric rows, {len(metrics)} governed metric definitions, {len(incident_rows)} data quality incidents, and {len(actions)} recommended account actions.

## Findings

- The highest-priority account is {top["account_id"]}, with a priority score of {top["priority_score"]}.
- The top 12 action queue represents ${revenue_at_risk:,.0f} in modeled revenue at risk.
- {certified_pct}% of core lifecycle metrics are certified, leaving the largest trust gap in finance reconciliation and expansion readiness.
- {high_incidents} high-severity data quality incidents remain open or under monitoring.

## Recommendation

Use the action queue for weekly customer operations review, but gate broad self-service rollout on certification of renewal, billing, and expansion definitions.
"""
(ROOT / "analysis" / "executive_findings.md").write_text(findings_md)

analysis_plan = """# Analysis Plan

## Objective

Create a customer lifecycle operating view that helps customer-facing teams decide where to intervene, which metrics are trusted, and which definitions need certification before dashboard scale-up.

## Steps

1. Model account lifecycle state, ARR, adoption, retention risk, expansion signal, and metric confidence.
2. Score account priorities using retention risk, adoption gap, metric confidence gap, ARR, and estimated effort.
3. Certify each lifecycle metric against owner, source system, freshness, reconciliation gap, and dashboard surface.
4. Summarize data quality incidents by source system, affected metric, owner, severity, and remediation path.
5. Translate the outputs into executive lifecycle health, metric certification, and action queue surfaces.
"""
(ROOT / "analysis" / "analysis_plan.md").write_text(analysis_plan)

print(f"Generated {len(accounts)} accounts, {len(daily_rows)} daily rows, and {len(actions)} ranked actions.")
print(f"Top account: {top['account_id']} priority_score={top['priority_score']} revenue_at_risk=${top['revenue_at_risk']:,.0f}")
