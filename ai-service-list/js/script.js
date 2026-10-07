// =========================================================
// AI 툴 가이드 - 필터 · 검색 · 팝업
// =========================================================

const state = {
  category: "all",
  freeLevel: "all",
  purpose: null,
  query: "",
};

const $ = (id) => document.getElementById(id);

const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function catStyle(key) {
  return `--cat-bg: var(--c-${key}); --cat-text: var(--t-${key});`;
}

function freeBadge(level) {
  const info = FREE_LEVELS[level];
  return `<span class="tag badge-${level}">${info.emoji} ${info.label}</span>`;
}

function koreanTag(level) {
  if (!level) return "";
  return `<span class="tag tag-korean ${level}">${KOREAN_LEVELS[level]}</span>`;
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

// ---------------- 필터 버튼 그리기 ----------------
function renderPurposes() {
  $("purposeList").innerHTML = PURPOSES.map(
    (p) => `
      <button type="button" class="purpose-btn" data-purpose="${p.key}" aria-pressed="false">
        <span class="purpose-icon" aria-hidden="true">${p.icon}</span>${escapeHtml(p.label)}
      </button>`
  ).join("");
}

function renderCategoryChips() {
  const chips = [{ key: "all", label: "전체" }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.short }))];
  $("categoryList").innerHTML = chips
    .map((c) => {
      const style = c.key === "all" ? "" : `style="--chip-bg: var(--c-${c.key}); --chip-text: var(--t-${c.key});"`;
      return `<button type="button" class="chip" data-category="${c.key}" ${style}>${escapeHtml(c.label)}</button>`;
    })
    .join("");
}

function renderFreeChips() {
  const chips = [{ key: "all", label: "전체" }, ...Object.entries(FREE_LEVELS).map(([key, v]) => ({ key, label: `${v.emoji} ${v.label}` }))];
  $("freeList").innerHTML = chips
    .map((c) => {
      const style = c.key === "all" ? "" : `style="--chip-bg: var(--free-${c.key}-bg); --chip-text: var(--free-${c.key}-text);"`;
      return `<button type="button" class="chip" data-free="${c.key}" ${style}>${escapeHtml(c.label)}</button>`;
    })
    .join("");
}

function updateActiveButtons() {
  document.querySelectorAll("[data-category]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === state.category);
  });
  document.querySelectorAll("[data-free]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.free === state.freeLevel);
  });
  document.querySelectorAll("[data-purpose]").forEach((btn) => {
    const active = btn.dataset.purpose === state.purpose;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

// ---------------- 필터링 ----------------
function matches(service) {
  if (state.category !== "all" && service.category !== state.category) return false;
  if (state.freeLevel !== "all" && service.freeLevel !== state.freeLevel) return false;
  if (state.purpose && !(service.purposes || []).includes(state.purpose)) return false;

  if (state.query) {
    const haystack = [
      service.name,
      service.desc,
      service.useCase,
      categoryMap[service.category].label,
      ...(service.pros || []),
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(state.query)) return false;
  }
  return true;
}

// ---------------- 카드 그리기 ----------------
function cardHtml(service, index) {
  const cat = categoryMap[service.category];
  const spec = service.specSummary
    ? `<li class="spec-line"><span class="info-label">🎞️ 스펙</span><span>${escapeHtml(service.specSummary)}</span></li>`
    : "";

  return `
    <article class="card" style="${catStyle(service.category)}">
      <div class="card-top">
        <span class="tag tag-category">${escapeHtml(cat.label)}</span>
        ${freeBadge(service.freeLevel)}
      </div>
      <div class="card-name-row">
        <h3 class="card-name">${escapeHtml(service.name)}</h3>
        ${koreanTag(service.korean)}
      </div>
      <p class="card-desc">${escapeHtml(service.desc)}</p>
      <ul class="card-info">
        <li class="free-line"><span class="info-label">🎁 무료</span><span>${escapeHtml(service.freeAmount)}</span></li>
        ${spec}
        <li><span class="info-label">👍 추천</span><span>${escapeHtml(service.useCase)}</span></li>
      </ul>
      <div class="card-actions">
        <button type="button" class="btn btn-ghost" data-detail="${index}">자세히 보기</button>
        <a class="btn btn-primary" href="${escapeHtml(service.url)}" target="_blank" rel="noopener noreferrer">바로가기 ↗</a>
      </div>
    </article>`;
}

function renderCards() {
  const visible = services.map((s, i) => ({ s, i })).filter(({ s }) => matches(s));

  $("cardGrid").innerHTML = visible.map(({ s, i }) => cardHtml(s, i)).join("");
  $("emptyMessage").hidden = visible.length > 0;
  $("resultCount").innerHTML = `<strong>${visible.length}</strong>개의 서비스`;

  const filtered = state.category !== "all" || state.freeLevel !== "all" || state.purpose || state.query;
  $("resetBtn").hidden = !filtered;
}

// ---------------- 참고사항 그리기 ----------------
function renderTips() {
  const keys = state.category === "all" ? CATEGORIES.map((c) => c.key) : [state.category];
  const openAll = state.category !== "all";

  $("tipsArea").innerHTML = keys
    .map((key) => {
      const items = tips.filter((t) => t.category === key);
      if (items.length === 0) return "";
      const cat = categoryMap[key];
      return `
        <details class="tip-group" style="${catStyle(key)}" ${openAll ? "open" : ""}>
          <summary>
            <span class="tag tag-category">${escapeHtml(cat.label)}</span>
            <span class="tip-count">${items.length}개</span>
          </summary>
          <div class="tip-list">
            ${items
              .map((t) => `<div class="tip"><h4>${escapeHtml(t.title)}</h4><p>${escapeHtml(t.body)}</p></div>`)
              .join("")}
          </div>
        </details>`;
    })
    .join("");
}

// ---------------- 팝업 ----------------
function openDetail(index) {
  const s = services[index];
  const cat = categoryMap[s.category];

  const source = s.source
    ? `<div class="modal-section"><h3>🔎 찾아보는 범위</h3><p class="modal-highlight">${escapeHtml(s.source)}</p></div>`
    : "";

  const specs = s.specs
    ? `<div class="modal-section">
        <h3>🎞️ 동영상 스펙 (무료 기준)</h3>
        <table class="spec-table">
          <tbody>
            ${s.specs.map(([k, v]) => `<tr><th scope="row">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>`
    : "";

  const creditTips = s.creditTips
    ? `<div class="modal-section box tips"><h3>💡 크레딧·무료 사용량 아끼는 법</h3><ul>${listItems(s.creditTips)}</ul></div>`
    : "";

  $("modalContent").innerHTML = `
    <div class="modal-head" style="${catStyle(s.category)}">
      <div class="card-top">
        <span class="tag tag-category" style="background: rgba(255,255,255,0.75);">${escapeHtml(cat.label)}</span>
        ${freeBadge(s.freeLevel)}
        ${koreanTag(s.korean)}
      </div>
      <h2 class="modal-title" id="modalTitle">${escapeHtml(s.name)}</h2>
      <p class="modal-desc">${escapeHtml(s.desc)}</p>
      <button type="button" class="modal-close" data-close aria-label="닫기">✕</button>
    </div>

    <div class="modal-section">
      <h3>🎁 무료로 이 정도 쓸 수 있어요</h3>
      <p class="modal-highlight free">${escapeHtml(s.freeAmount)}</p>
    </div>

    ${source}

    <div class="modal-section modal-two">
      <div class="box pros"><h3>👍 장점</h3><ul>${listItems(s.pros)}</ul></div>
      <div class="box cons"><h3>🤔 아쉬운 점</h3><ul>${listItems(s.cons)}</ul></div>
    </div>

    <div class="modal-section">
      <h3>💳 요금 상세</h3>
      <ul>${listItems(s.price)}</ul>
    </div>

    ${specs}
    ${creditTips}

    <div class="modal-section">
      <h3>📌 추천 용도</h3>
      <p>${escapeHtml(s.useCase)}</p>
    </div>

    <div class="modal-footer">
      <a class="btn btn-primary" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">바로가기 ↗</a>
    </div>`;

  const modal = $("detailModal");
  modal.showModal();
  modal.scrollTop = 0;
}

// ---------------- 이벤트 ----------------
function refresh() {
  updateActiveButtons();
  renderCards();
  renderTips();
}

function bindEvents() {
  $("categoryList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    state.category = btn.dataset.category;
    refresh();
  });

  $("freeList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-free]");
    if (!btn) return;
    state.freeLevel = btn.dataset.free;
    refresh();
  });

  $("purposeList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-purpose]");
    if (!btn) return;
    const key = btn.dataset.purpose;
    // 같은 버튼을 다시 누르면 해제, 목적은 여러 분야에 걸쳐 있으므로 분야 필터는 전체로
    state.purpose = state.purpose === key ? null : key;
    state.category = "all";
    refresh();
    $("cardGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("searchInput").addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderCards();
    $("resetBtn").hidden = !(state.category !== "all" || state.freeLevel !== "all" || state.purpose || state.query);
  });

  $("resetBtn").addEventListener("click", () => {
    state.category = "all";
    state.freeLevel = "all";
    state.purpose = null;
    state.query = "";
    $("searchInput").value = "";
    refresh();
  });

  $("cardGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-detail]");
    if (btn) openDetail(Number(btn.dataset.detail));
  });

  const modal = $("detailModal");
  modal.addEventListener("click", (e) => {
    // 닫기 버튼 또는 바깥(배경) 클릭 시 닫기
    if (e.target.closest("[data-close]") || e.target === modal) modal.close();
  });
}

renderPurposes();
renderCategoryChips();
renderFreeChips();
bindEvents();
refresh();
