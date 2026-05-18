const data = window.dashboardData;
let selectedAction = 0;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function className(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function riskTone(value) {
  if (value >= 60) return "high";
  if (value >= 38) return "medium";
  return "low";
}

function renderSummary() {
  document.querySelector("#summary").innerHTML = data.summary.map((item) => `
    <article class="summary-card ${item.tone}">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.detail}</small>
    </article>
  `).join("");
}

function renderStageHealth() {
  const maxAccounts = Math.max(...data.stageMix.map((item) => item.accounts));
  document.querySelector("#stage-list").innerHTML = data.stageMix.map((item) => `
    <article class="stage-row">
      <div>
        <strong>${item.stage}</strong>
        <span>${item.accounts} accounts</span>
      </div>
      <div class="bar-stack">
        <p><span>Adoption</span><i><b class="adoption" style="width:${item.avgAdoption}%"></b></i><strong>${item.avgAdoption}%</strong></p>
        <p><span>Risk</span><i><b class="${riskTone(item.avgRisk)}" style="width:${item.avgRisk}%"></b></i><strong>${item.avgRisk}%</strong></p>
      </div>
      <em style="height:${Math.max(18, item.accounts / maxAccounts * 92)}%"></em>
    </article>
  `).join("");
}

function renderSegmentRisk() {
  document.querySelector("#segment-risk").innerHTML = data.segmentRisk.map((item) => `
    <article class="risk-row">
      <div>
        <strong>${item.segment}</strong>
        <span>${item.accounts} accounts | ${currency.format(item.arr)} ARR</span>
      </div>
      <mark class="${riskTone(item.risk)}">${item.risk}%</mark>
    </article>
  `).join("");
}

function renderFindings() {
  document.querySelector("#findings").innerHTML = data.findings.map((finding, index) => `
    <article>
      <b>${index + 1}</b>
      <p>${finding}</p>
    </article>
  `).join("");
}

function renderMetricCertification() {
  document.querySelector("#certified-rate").textContent = `${data.certifiedPct}% certified`;
  document.querySelector("#metric-table").innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Owner</th>
          <th>Status</th>
          <th>Freshness</th>
          <th>Gap</th>
        </tr>
      </thead>
      <tbody>
        ${data.metrics.map((metric) => `
          <tr>
            <td>
              <strong>${metric.metric_name.replaceAll("_", " ")}</strong>
              <span>${metric.source_systems}</span>
            </td>
            <td>${metric.business_owner}</td>
            <td><mark class="status ${className(metric.definition_status)}">${metric.definition_status}</mark></td>
            <td>${metric.freshness_hours}h</td>
            <td>${metric.reconciliation_gap_pct}%</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderIncidents() {
  document.querySelector("#high-incidents").textContent = `${data.highIncidents} high severity`;
  document.querySelector("#incident-list").innerHTML = data.incidents.map((incident) => `
    <article class="incident">
      <div>
        <strong>${incident.affected_metric.replaceAll("_", " ")}</strong>
        <mark class="${className(incident.severity)}">${incident.severity}</mark>
      </div>
      <p>${incident.issue_type} in ${incident.source_system}</p>
      <span>${incident.owner} | ${incident.open_days} days open | ${incident.status}</span>
      <small>${incident.recommended_fix}</small>
    </article>
  `).join("");
}

function renderQueueList() {
  document.querySelector("#queue-list").innerHTML = data.actions.map((item, index) => `
    <button class="queue-row ${index === selectedAction ? "active" : ""}" type="button" data-index="${index}">
      <span class="rank">${index + 1}</span>
      <span>
        <strong>${item.account_name}</strong>
        <small>${item.lifecycle_stage} | ${item.plan_tier} | ${item.recommended_owner}</small>
      </span>
      <span>
        <strong>${item.priority_score}</strong>
        <small>priority</small>
      </span>
      <span>
        <strong>${currency.format(item.revenue_at_risk)}</strong>
        <small>risk</small>
      </span>
    </button>
  `).join("");

  document.querySelectorAll(".queue-row").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAction = Number(button.dataset.index);
      renderActionQueue();
    });
  });
}

function renderActionDetail() {
  const item = data.actions[selectedAction];
  document.querySelector("#action-detail").innerHTML = `
    <p class="eyebrow">selected account</p>
    <h2>${item.account_name}</h2>
    <div class="detail-score">
      <strong>${item.priority_score}</strong>
      <span>priority score</span>
    </div>
    <dl>
      <div><dt>Lifecycle stage</dt><dd>${item.lifecycle_stage}</dd></div>
      <div><dt>Plan tier</dt><dd>${item.plan_tier}</dd></div>
      <div><dt>ARR</dt><dd>${currency.format(item.arr)}</dd></div>
      <div><dt>Revenue at risk</dt><dd>${currency.format(item.revenue_at_risk)}</dd></div>
      <div><dt>Effort</dt><dd>${item.effort_hours} hours</dd></div>
    </dl>
    <section class="next-action">
      <span>${item.recommended_owner}</span>
      <strong>${item.recommended_action}</strong>
      <p>${item.reason}</p>
    </section>
  `;
}

function renderActionQueue() {
  renderQueueList();
  renderActionDetail();
}

function setSurface(surfaceName) {
  const target = document.querySelector(`.tabs button[data-surface="${surfaceName}"]`)
    ? surfaceName
    : "health";
  document.querySelectorAll(".tabs button").forEach((item) => {
    item.classList.toggle("active", item.dataset.surface === target);
  });
  document.querySelectorAll(".surface").forEach((surface) => {
    surface.classList.toggle("active", surface.id === `surface-${target}`);
  });
}

function wireTabs() {
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      setSurface(button.dataset.surface);
      history.replaceState(null, "", `#${button.dataset.surface}`);
    });
  });
  setSurface(location.hash.replace("#", "") || "health");
}

renderSummary();
renderStageHealth();
renderSegmentRisk();
renderFindings();
renderMetricCertification();
renderIncidents();
renderActionQueue();
wireTabs();
