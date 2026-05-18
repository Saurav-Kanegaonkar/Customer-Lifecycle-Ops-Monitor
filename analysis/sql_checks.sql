-- Lifecycle health mart
with account_window as (
  select
    account_id,
    avg(adoption_score) as avg_adoption_score,
    avg(retention_risk) as avg_retention_risk,
    avg(metric_confidence) as avg_metric_confidence,
    max(revenue_at_risk) as revenue_at_risk
  from daily_metrics
  group by 1
)
select
  a.lifecycle_stage,
  a.plan_tier,
  count(*) as accounts,
  sum(a.arr) as arr_under_monitor,
  avg(w.avg_adoption_score) as avg_adoption_score,
  avg(w.avg_retention_risk) as avg_retention_risk,
  sum(w.revenue_at_risk) as modeled_revenue_at_risk
from account_window w
join accounts a
  on a.account_id = w.account_id
group by 1, 2
order by modeled_revenue_at_risk desc;

-- Metric certification readiness
select
  dashboard_surface,
  count(*) as metric_count,
  avg(case when certified = 'Yes' then 1 else 0 end) as certified_rate,
  avg(freshness_hours) as avg_freshness_hours,
  avg(reconciliation_gap_pct) as avg_reconciliation_gap_pct
from metric_certification
group by 1
order by certified_rate asc, avg_reconciliation_gap_pct desc;

-- Data quality backlog by source and owner
select
  source_system,
  owner,
  severity,
  count(*) as incident_count,
  avg(open_days) as avg_open_days
from data_quality_incidents
where status <> 'Resolved'
group by 1, 2, 3
order by
  case severity when 'High' then 1 when 'Medium' then 2 else 3 end,
  incident_count desc;

-- Weekly action queue
select
  account_id,
  account_name,
  lifecycle_stage,
  recommended_owner,
  priority_score,
  arr,
  revenue_at_risk,
  effort_hours,
  recommended_action
from recommended_actions
where priority_score >= 45
order by priority_score desc, revenue_at_risk desc;
