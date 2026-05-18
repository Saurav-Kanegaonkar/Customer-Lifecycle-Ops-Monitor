window.dashboardData = {
  "summary": [
    {
      "label": "Accounts modeled",
      "value": "48",
      "detail": "synthetic lifecycle portfolio",
      "tone": "info"
    },
    {
      "label": "ARR under monitor",
      "value": "$9.2M",
      "detail": "modeled contract value",
      "tone": "success"
    },
    {
      "label": "Certified metrics",
      "value": "62%",
      "detail": "ready for self-service",
      "tone": "success"
    },
    {
      "label": "Top queue risk",
      "value": "$2.6M",
      "detail": "modeled revenue at risk",
      "tone": "warning"
    }
  ],
  "stageMix": [
    {
      "stage": "Onboarding",
      "accounts": 12,
      "avgAdoption": 51.6,
      "avgRisk": 53.1
    },
    {
      "stage": "Adoption",
      "accounts": 18,
      "avgAdoption": 63.8,
      "avgRisk": 46.9
    },
    {
      "stage": "Renewal",
      "accounts": 11,
      "avgAdoption": 68.0,
      "avgRisk": 47.0
    },
    {
      "stage": "Expansion",
      "accounts": 7,
      "avgAdoption": 76.1,
      "avgRisk": 44.9
    }
  ],
  "segmentRisk": [
    {
      "segment": "HVAC",
      "accounts": 8,
      "risk": 57.6,
      "arr": 859000
    },
    {
      "segment": "Plumbing",
      "accounts": 8,
      "risk": 51.9,
      "arr": 1120000
    },
    {
      "segment": "Fire Protection",
      "accounts": 6,
      "risk": 49.2,
      "arr": 986000
    },
    {
      "segment": "Security",
      "accounts": 8,
      "risk": 44.8,
      "arr": 1750000
    },
    {
      "segment": "Multi-Trade",
      "accounts": 13,
      "risk": 44.6,
      "arr": 3024000
    },
    {
      "segment": "Electrical",
      "accounts": 5,
      "risk": 40.8,
      "arr": 1507000
    }
  ],
  "metrics": [
    {
      "metric_name": "onboarding_activation_rate",
      "business_owner": "Customer Ops",
      "source_systems": "CRM, product events",
      "definition_status": "Certified",
      "freshness_hours": 5,
      "reconciliation_gap_pct": 1.8,
      "certified": "Yes",
      "dashboard_surface": "Lifecycle Health"
    },
    {
      "metric_name": "time_to_first_value",
      "business_owner": "Customer Ops",
      "source_systems": "Implementation tasks, product events",
      "definition_status": "Needs owner signoff",
      "freshness_hours": 18,
      "reconciliation_gap_pct": 4.6,
      "certified": "No",
      "dashboard_surface": "Lifecycle Health"
    },
    {
      "metric_name": "adoption_depth_score",
      "business_owner": "RevOps",
      "source_systems": "Product events, contract metadata",
      "definition_status": "Certified",
      "freshness_hours": 7,
      "reconciliation_gap_pct": 2.2,
      "certified": "Yes",
      "dashboard_surface": "Lifecycle Health"
    },
    {
      "metric_name": "renewal_risk_score",
      "business_owner": "RevOps",
      "source_systems": "CRM, support, billing",
      "definition_status": "Certified",
      "freshness_hours": 9,
      "reconciliation_gap_pct": 2.9,
      "certified": "Yes",
      "dashboard_surface": "Action Queue"
    },
    {
      "metric_name": "expansion_readiness",
      "business_owner": "Sales Ops",
      "source_systems": "Usage, plan, CRM opportunity",
      "definition_status": "Draft",
      "freshness_hours": 14,
      "reconciliation_gap_pct": 5.7,
      "certified": "No",
      "dashboard_surface": "Action Queue"
    },
    {
      "metric_name": "gross_retention_bridge",
      "business_owner": "Finance",
      "source_systems": "Billing, CRM, product account",
      "definition_status": "Needs reconciliation",
      "freshness_hours": 28,
      "reconciliation_gap_pct": 7.4,
      "certified": "No",
      "dashboard_surface": "Metrics Certification"
    },
    {
      "metric_name": "support_to_health_ratio",
      "business_owner": "Customer Success",
      "source_systems": "Support tickets, account health",
      "definition_status": "Certified",
      "freshness_hours": 11,
      "reconciliation_gap_pct": 2.5,
      "certified": "Yes",
      "dashboard_surface": "Metrics Certification"
    },
    {
      "metric_name": "dashboard_certification_flag",
      "business_owner": "Data Engineering",
      "source_systems": "Semantic model, dashboard catalog",
      "definition_status": "Certified",
      "freshness_hours": 4,
      "reconciliation_gap_pct": 1.2,
      "certified": "Yes",
      "dashboard_surface": "Metrics Certification"
    }
  ],
  "incidents": [
    {
      "incident_id": "DQI031",
      "source_system": "CRM",
      "affected_metric": "expansion_readiness",
      "issue_type": "duplicate account key",
      "severity": "High",
      "open_days": 23,
      "owner": "Customer Ops",
      "status": "Open",
      "recommended_fix": "Add freshness alert to semantic model job"
    },
    {
      "incident_id": "DQI007",
      "source_system": "CRM",
      "affected_metric": "expansion_readiness",
      "issue_type": "missing CRM owner",
      "severity": "High",
      "open_days": 22,
      "owner": "Data Engineering",
      "status": "Open",
      "recommended_fix": "Backfill product events for certification window"
    },
    {
      "incident_id": "DQI006",
      "source_system": "Product Events",
      "affected_metric": "adoption_depth_score",
      "issue_type": "support mapping mismatch",
      "severity": "High",
      "open_days": 20,
      "owner": "Finance",
      "status": "Open",
      "recommended_fix": "Map orphan account IDs before dashboard refresh"
    },
    {
      "incident_id": "DQI011",
      "source_system": "Product Events",
      "affected_metric": "dashboard_certification_flag",
      "issue_type": "late product event",
      "severity": "High",
      "open_days": 19,
      "owner": "Finance",
      "status": "Resolved",
      "recommended_fix": "Align CRM stage logic with finance renewal bridge"
    },
    {
      "incident_id": "DQI020",
      "source_system": "Billing",
      "affected_metric": "adoption_depth_score",
      "issue_type": "late product event",
      "severity": "High",
      "open_days": 17,
      "owner": "Customer Ops",
      "status": "Monitoring",
      "recommended_fix": "Backfill product events for certification window"
    },
    {
      "incident_id": "DQI026",
      "source_system": "Support",
      "affected_metric": "time_to_first_value",
      "issue_type": "missing CRM owner",
      "severity": "High",
      "open_days": 12,
      "owner": "Data Engineering",
      "status": "Open",
      "recommended_fix": "Add freshness alert to semantic model job"
    },
    {
      "incident_id": "DQI030",
      "source_system": "Billing",
      "affected_metric": "time_to_first_value",
      "issue_type": "missing CRM owner",
      "severity": "High",
      "open_days": 12,
      "owner": "Finance",
      "status": "Monitoring",
      "recommended_fix": "Align CRM stage logic with finance renewal bridge"
    },
    {
      "incident_id": "DQI034",
      "source_system": "Support",
      "affected_metric": "gross_retention_bridge",
      "issue_type": "late product event",
      "severity": "High",
      "open_days": 11,
      "owner": "Finance",
      "status": "Open",
      "recommended_fix": "Map orphan account IDs before dashboard refresh"
    },
    {
      "incident_id": "DQI027",
      "source_system": "Billing",
      "affected_metric": "onboarding_activation_rate",
      "issue_type": "missing CRM owner",
      "severity": "High",
      "open_days": 9,
      "owner": "Finance",
      "status": "Open",
      "recommended_fix": "Align CRM stage logic with finance renewal bridge"
    },
    {
      "incident_id": "DQI008",
      "source_system": "CRM",
      "affected_metric": "time_to_first_value",
      "issue_type": "support mapping mismatch",
      "severity": "High",
      "open_days": 6,
      "owner": "Finance",
      "status": "Open",
      "recommended_fix": "Map orphan account IDs before dashboard refresh"
    },
    {
      "incident_id": "DQI025",
      "source_system": "Support",
      "affected_metric": "gross_retention_bridge",
      "issue_type": "missing CRM owner",
      "severity": "High",
      "open_days": 5,
      "owner": "Finance",
      "status": "Resolved",
      "recommended_fix": "Align CRM stage logic with finance renewal bridge"
    },
    {
      "incident_id": "DQI004",
      "source_system": "CRM",
      "affected_metric": "expansion_readiness",
      "issue_type": "support mapping mismatch",
      "severity": "Low",
      "open_days": 23,
      "owner": "Data Engineering",
      "status": "Monitoring",
      "recommended_fix": "Add freshness alert to semantic model job"
    }
  ],
  "actions": [
    {
      "account_id": "ACC024",
      "account_name": "Account 024",
      "plan_tier": "Enterprise",
      "lifecycle_stage": "Onboarding",
      "recommended_owner": "Customer Ops",
      "recommended_action": "Accelerate onboarding milestone review",
      "priority_score": 73.5,
      "arr": 890000,
      "revenue_at_risk": 503000,
      "effort_hours": 40,
      "reason": "Onboarding account with 56.5 retention risk and 78.5 metric confidence"
    },
    {
      "account_id": "ACC046",
      "account_name": "Account 046",
      "plan_tier": "Enterprise",
      "lifecycle_stage": "Onboarding",
      "recommended_owner": "Customer Ops",
      "recommended_action": "Accelerate onboarding milestone review",
      "priority_score": 71.7,
      "arr": 443000,
      "revenue_at_risk": 237000,
      "effort_hours": 8,
      "reason": "Onboarding account with 53.6 retention risk and 71.2 metric confidence"
    },
    {
      "account_id": "ACC048",
      "account_name": "Account 048",
      "plan_tier": "Scale",
      "lifecycle_stage": "Onboarding",
      "recommended_owner": "Customer Ops",
      "recommended_action": "Accelerate onboarding milestone review",
      "priority_score": 68.3,
      "arr": 340000,
      "revenue_at_risk": 192000,
      "effort_hours": 27,
      "reason": "Onboarding account with 56.6 retention risk and 68.9 metric confidence"
    },
    {
      "account_id": "ACC018",
      "account_name": "Account 018",
      "plan_tier": "Enterprise",
      "lifecycle_stage": "Expansion",
      "recommended_owner": "Sales Ops",
      "recommended_action": "Package expansion signal for Sales Ops",
      "priority_score": 65.2,
      "arr": 517000,
      "revenue_at_risk": 272000,
      "effort_hours": 37,
      "reason": "Expansion account with 52.7 retention risk and 97.1 metric confidence"
    },
    {
      "account_id": "ACC021",
      "account_name": "Account 021",
      "plan_tier": "Enterprise",
      "lifecycle_stage": "Renewal",
      "recommended_owner": "RevOps",
      "recommended_action": "Validate renewal risk bridge with Finance",
      "priority_score": 65.0,
      "arr": 734000,
      "revenue_at_risk": 269000,
      "effort_hours": 38,
      "reason": "Renewal account with 36.7 retention risk and 72.7 metric confidence"
    },
    {
      "account_id": "ACC025",
      "account_name": "Account 025",
      "plan_tier": "Scale",
      "lifecycle_stage": "Expansion",
      "recommended_owner": "Sales Ops",
      "recommended_action": "Package expansion signal for Sales Ops",
      "priority_score": 63.4,
      "arr": 415000,
      "revenue_at_risk": 200000,
      "effort_hours": 19,
      "reason": "Expansion account with 48.3 retention risk and 92.6 metric confidence"
    },
    {
      "account_id": "ACC001",
      "account_name": "Account 001",
      "plan_tier": "Scale",
      "lifecycle_stage": "Onboarding",
      "recommended_owner": "Customer Ops",
      "recommended_action": "Accelerate onboarding milestone review",
      "priority_score": 62.0,
      "arr": 294000,
      "revenue_at_risk": 184000,
      "effort_hours": 25,
      "reason": "Onboarding account with 62.7 retention risk and 80.1 metric confidence"
    },
    {
      "account_id": "ACC008",
      "account_name": "Account 008",
      "plan_tier": "Enterprise",
      "lifecycle_stage": "Adoption",
      "recommended_owner": "Customer Success",
      "recommended_action": "Improve adoption playbook coverage",
      "priority_score": 61.1,
      "arr": 545000,
      "revenue_at_risk": 130000,
      "effort_hours": 8,
      "reason": "Adoption account with 23.8 retention risk and 75.1 metric confidence"
    },
    {
      "account_id": "ACC038",
      "account_name": "Account 038",
      "plan_tier": "Scale",
      "lifecycle_stage": "Renewal",
      "recommended_owner": "RevOps",
      "recommended_action": "Validate renewal risk bridge with Finance",
      "priority_score": 58.2,
      "arr": 415000,
      "revenue_at_risk": 176000,
      "effort_hours": 40,
      "reason": "Renewal account with 42.5 retention risk and 96.1 metric confidence"
    },
    {
      "account_id": "ACC043",
      "account_name": "Account 043",
      "plan_tier": "Scale",
      "lifecycle_stage": "Onboarding",
      "recommended_owner": "Customer Ops",
      "recommended_action": "Accelerate onboarding milestone review",
      "priority_score": 58.2,
      "arr": 392000,
      "revenue_at_risk": 163000,
      "effort_hours": 32,
      "reason": "Onboarding account with 41.5 retention risk and 85.8 metric confidence"
    },
    {
      "account_id": "ACC036",
      "account_name": "Account 036",
      "plan_tier": "Scale",
      "lifecycle_stage": "Renewal",
      "recommended_owner": "RevOps",
      "recommended_action": "Validate renewal risk bridge with Finance",
      "priority_score": 58.1,
      "arr": 389000,
      "revenue_at_risk": 198000,
      "effort_hours": 38,
      "reason": "Renewal account with 50.9 retention risk and 94.4 metric confidence"
    },
    {
      "account_id": "ACC014",
      "account_name": "Account 014",
      "plan_tier": "Growth",
      "lifecycle_stage": "Onboarding",
      "recommended_owner": "Customer Ops",
      "recommended_action": "Accelerate onboarding milestone review",
      "priority_score": 56.2,
      "arr": 58000,
      "revenue_at_risk": 50000,
      "effort_hours": 12,
      "reason": "Onboarding account with 86.0 retention risk and 80.0 metric confidence"
    },
    {
      "account_id": "ACC037",
      "account_name": "Account 037",
      "plan_tier": "Scale",
      "lifecycle_stage": "Adoption",
      "recommended_owner": "Customer Success",
      "recommended_action": "Improve adoption playbook coverage",
      "priority_score": 54.3,
      "arr": 394000,
      "revenue_at_risk": 173000,
      "effort_hours": 36,
      "reason": "Adoption account with 43.9 retention risk and 78.4 metric confidence"
    },
    {
      "account_id": "ACC033",
      "account_name": "Account 033",
      "plan_tier": "Scale",
      "lifecycle_stage": "Adoption",
      "recommended_owner": "Customer Success",
      "recommended_action": "Improve adoption playbook coverage",
      "priority_score": 50.3,
      "arr": 305000,
      "revenue_at_risk": 130000,
      "effort_hours": 39,
      "reason": "Adoption account with 42.6 retention risk and 74.3 metric confidence"
    }
  ],
  "findings": [
    "Onboarding and renewal accounts create the most urgent operating queue because adoption gaps and renewal proximity compound risk.",
    "Metric certification is the unlock for trusted self-service reporting. The largest gaps sit in billing joins and CRM stage definitions.",
    "The most useful executive view is a ranked action queue that explains owner, value at risk, confidence, and next action in the same place."
  ],
  "certifiedPct": 62,
  "highIncidents": 9
};
