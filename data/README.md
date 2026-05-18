# Data Notes

The datasets are synthetic and are designed to resemble a customer lifecycle operating mart for a field service SaaS portfolio. They do not represent any real company performance.

## Files

- `accounts.csv`: Account profile, lifecycle stage, plan tier, ARR, adoption, retention risk, expansion signal, and metric confidence.
- `daily_metrics.csv`: 90 days of account-level lifecycle measures for activation, adoption, retention risk, expansion signal, revenue at risk, metric confidence, and data quality.
- `metric_certification.csv`: Governed metric definitions with owner, source systems, freshness, reconciliation gap, status, and dashboard surface.
- `data_quality_incidents.csv`: Source-system issues that affect lifecycle metric trust.
- `recommended_actions.csv`: Account-level action queue ranked by risk, value, metric confidence, adoption gap, and effort.
- `synthetic_operating_data.csv`: Compact surface inventory for README and interview discussion.

## Generation Logic

`scripts/score_operating_data.py` generates the data with a fixed random seed. ARR ranges are based on plan tier. Adoption and retention risk are negatively correlated. Data quality gaps are concentrated in CRM, product event, billing, support, and semantic model joins. The priority score combines retention risk, adoption gap, metric confidence gap, ARR, and implementation effort.
