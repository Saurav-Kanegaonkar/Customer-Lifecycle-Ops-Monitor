# Data Dictionary

## `accounts.csv`

- `account_id`: Synthetic account key.
- `account_name`: Synthetic account label.
- `industry`: Field service segment.
- `region`: Operating region.
- `plan_tier`: Contract tier.
- `lifecycle_stage`: Current lifecycle phase.
- `csm_owner`: Customer-facing owner group.
- `arr`: Modeled annual recurring revenue.
- `onboarding_age_days`: Days since onboarding began or comparable lifecycle age.
- `days_to_renewal`: Days until next renewal review.
- `adoption_score`: Composite product adoption score from 0 to 100.
- `retention_risk`: Composite retention risk score from 0 to 100.
- `expansion_signal`: Composite expansion readiness score from 0 to 100.
- `metric_confidence`: Reporting confidence score from 0 to 100.
- `support_ticket_burden`: Recent support volume proxy.

## `metric_certification.csv`

- `metric_name`: Governed lifecycle metric.
- `business_owner`: Team accountable for the definition.
- `source_systems`: Systems used to calculate the metric.
- `definition_status`: Certification state.
- `freshness_hours`: Current reporting lag.
- `reconciliation_gap_pct`: Gap from expected Finance or RevOps definition.
- `certified`: Whether the metric is ready for self-service.
- `dashboard_surface`: Surface where the metric is used.

## `recommended_actions.csv`

- `priority_score`: Weighted score using retention risk, adoption gap, metric confidence gap, ARR, and effort.
- `revenue_at_risk`: Modeled ARR exposure based on retention risk.
- `recommended_action`: Next operational action for the account.
