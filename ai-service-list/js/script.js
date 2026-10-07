// =========================================================
// AI 툴 가이드 - 탭 · 필터 · 검색 · 팝업
// =========================================================

const state = {
  tab: "category",   // "category" | "purpose"
  category: "all",
  purpose: null,
  freeLevel: "all",
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
  return `<span class="tag badge badge-${level}"><i class="dot"></i>${FREE_LEVELS[level].label}</span>`;
}

function koreanTag(level) {
  if (!level) return "";
  return `<span class="tag tag-korean ${level}">${KOREAN_LEVELS[level]}</span>`;
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function isFiltered() {
  return state.category !== "all" || state.purpose || state.freeLevel !== "all" || state.query;
}

// ---------------- 탭 / 필터 버튼 그리기 ----------------
function renderCategoryButtons() {
  const items = [{ key: "all", label: "전체" }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.short }))];
  $("categoryList").innerHTML = items
    .map((c) => {
      const style = c.key === "all" ? "" : `style="${catStyle(c.key)}"`;
      return `<button type="button" class="cat-btn" data-category="${c.key}" ${style}>${escapeHtml(c.label)}</button>`;
    })
    .join("");
}

function renderPurposes() {
  $("purposeList").innerHTML = PURPOSES.map((p) => {
    const names = services.filter((s) => (s.purposes || []).includes(p.key)).map((s) => s.name);
    const unique = [...new Set(names)];
    return `
      <button type="button" class="purpose-btn" data-purpose="${p.key}" aria-pressed="false">
        <span class="purpose-label">${escapeHtml(p.label)}</span>
        <span class="purpose-sub">${escapeHtml(unique.join(" · "))}</span>
      </button>`;
  }).join("");
}

function renderFreeButtons() {
  const items = [{ key: "all", label: "전체" }, ...Object.entries(FREE_LEVELS).map(([key, v]) => ({ key, label: v.label }))];
  $("freeList").innerHTML = items
    .map((c) => {
      const dot = c.key === "all" ? "" : `<i class="dot dot-${c.key}"></i>`;
      return `<button type="button" class="seg-btn" data-free="${c.key}">${dot}${escapeHtml(c.label)}</button>`;
    })
    .join("");
}

function updateActive() {
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    const active = btn.dataset.tab === state.tab;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  $("panel-category").hidden = state.tab !== "category";
  $("panel-purpose").hidden = state.tab !== "purpose";

  document.querySelectorAll("[data-category]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === state.category);
  });
  document.querySelectorAll("[data-purpose]").forEach((btn) => {
    const active = btn.dataset.purpose === state.purpose;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-free]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.free === state.freeLevel);
  });
}

// ---------------- 필터링 ----------------
function matches(service) {
  if (state.freeLevel !== "all" && service.freeLevel !== state.freeLevel) return false;

  // 검색어가 있으면 탭 선택과 상관없이 전체에서 찾기
  if (state.query) {
    const haystack = [service.name, service.desc, service.useCase, categoryMap[service.category].label, ...(service.pros || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(state.query);
  }

  if (state.tab === "category") {
    return state.category === "all" || service.category === state.category;
  }
  return !state.purpose || (service.purposes || []).includes(state.purpose);
}

// ---------------- 카드 ----------------
function cardHtml(service, index) {
  const cat = categoryMap[service.category];
  const spec = service.specSummary
    ? `<div class="info-row spec"><span class="info-label">스펙</span><span>${escapeHtml(service.specSummary)}</span></div>`
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
      <div class="card-info">
        <div class="info-row free"><span class="info-label">무료</span><span>${escapeHtml(service.freeAmount)}</span></div>
        ${spec}
        <div class="info-row"><span class="info-label">추천</span><span>${escapeHtml(service.useCase)}</span></div>
      </div>
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
  const scope = state.query ? " (전체에서 검색)" : "";
  $("resultCount").innerHTML = `<strong>${visible.length}</strong>개의 서비스${scope}`;
  $("resetBtn").hidden = !isFiltered();
}

// ---------------- 참고사항 (분야 선택 시에만) ----------------
function renderTips() {
  const show = state.tab === "category" && state.category !== "all" && !state.query;
  const items = show ? tips.filter((t) => t.category === state.category) : [];

  if (items.length === 0) {
    $("tipsArea").innerHTML = "";
    return;
  }

  const cat = categoryMap[state.category];
  $("tipsArea").innerHTML = `
    <section class="tip-box" style="${catStyle(state.category)}" aria-label="${escapeHtml(cat.label)} 참고사항">
      <h3 class="tip-box-title">${escapeHtml(cat.label)} 참고사항 <span>${items.length}개 · 제목을 누르면 펼쳐져요</span></h3>
      <div class="tip-list">
        ${items
          .map(
            (t) => `
          <details class="tip">
            <summary>${escapeHtml(t.title)}</summary>
            <p>${escapeHtml(t.body)}</p>
          </details>`
          )
          .join("")}
      </div>
    </section>`;
}

// ---------------- 팝업 ----------------
function openDetail(index) {
  const s = services[index];
  const cat = categoryMap[s.category];

  const source = s.source
    ? `<div class="modal-section"><h3>찾아보는 범위</h3><p class="modal-highlight">${escapeHtml(s.source)}</p></div>`
    : "";

  const specs = s.specs
    ? `<div class="modal-section">
        <h3>동영상 스펙 (무료 기준)</h3>
        <table class="spec-table">
          <tbody>
            ${s.specs.map(([k, v]) => `<tr><th scope="row">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>`
    : "";

  const creditTips = s.creditTips
    ? `<div class="modal-section box tips"><h3>크레딧·무료 사용량 아끼는 법</h3><ul>${listItems(s.creditTips)}</ul></div>`
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
      <h3>무료로 이 정도 쓸 수 있어요</h3>
      <p class="modal-highlight free">${escapeHtml(s.freeAmount)}</p>
    </div>

    ${source}

    <div class="modal-section modal-two">
      <div class="box pros"><h3>장점</h3><ul>${listItems(s.pros)}</ul></div>
      <div class="box cons"><h3>아쉬운 점</h3><ul>${listItems(s.cons)}</ul></div>
    </div>

    <div class="modal-section">
      <h3>요금 상세</h3>
      <ul>${listItems(s.price)}</ul>
    </div>

    ${specs}
    ${creditTips}

    <div class="modal-section">
      <h3>추천 용도</h3>
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
  updateActive();
  renderTips();
  renderCards();
}

function bindEvents() {
  document.querySelector(".tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn || btn.dataset.tab === state.tab) return;
    // 탭을 바꾸면 이전 탭의 선택은 초기화 (두 조건이 얽히지 않도록)
    state.tab = btn.dataset.tab;
    state.category = "all";
    state.purpose = null;
    refresh();
  });

  $("categoryList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    state.category = btn.dataset.category;
    refresh();
  });

  $("purposeList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-purpose]");
    if (!btn) return;
    const key = btn.dataset.purpose;
    state.purpose = state.purpose === key ? null : key;
    refresh();
  });

  $("freeList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-free]");
    if (!btn) return;
    state.freeLevel = btn.dataset.free;
    refresh();
  });

  $("searchInput").addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderTips();
    renderCards();
  });

  $("resetBtn").addEventListener("click", () => {
    state.category = "all";
    state.purpose = null;
    state.freeLevel = "all";
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

renderCategoryButtons();
renderPurposes();
renderFreeButtons();
bindEvents();
refresh();
