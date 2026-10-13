/* NOXLUX — 공통 스크립트 (빌드 도구 없이 동작) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 이미지 자리표시: 파일이 없으면 회색 박스 + 파일명 ---------- */
  function ratioOf(el) {
    var m = el.className.match(/\br-(\d+)x(\d+)\b/);
    return m ? m[1] + ':' + m[2] : '';
  }

  function markMissing(media) {
    media.classList.add('is-missing');
  }

  function watchMedia(media) {
    var img = media.querySelector('img');
    if (!img) return;
    media.setAttribute('data-ratio', ratioOf(media));
    img.addEventListener('error', function () { markMissing(media); });
    img.addEventListener('load', function () { media.classList.remove('is-missing'); });
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) markMissing(media);
  }

  function swapMedia(media, file) {
    var img = media.querySelector('img');
    media.setAttribute('data-file', file);
    media.classList.remove('is-missing');
    img.src = 'images/' + file;
  }

  document.querySelectorAll('.media').forEach(watchMedia);

  /* ---------- 헤더 ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var isProduct = document.body.classList.contains('page-product');

  function onScrollHeader() {
    if (!header || isProduct) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    document.querySelectorAll('.gnb a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '메뉴 열기');
      });
    });
  }

  /* ---------- 스크롤 등장 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- How it works: 밤 → 새벽 ---------- */
  var how = document.querySelector('.how');
  var steps = how ? how.querySelectorAll('.step') : [];
  // 진행도별 배경색 (한밤 차콜 → 라벤더빛 새벽 → 호박빛 → 새벽 베이지 → 안개 화이트)
  var stops = [
    [0.00, [43, 43, 46]],
    [0.30, [50, 47, 60]],
    [0.55, [110, 96, 110]],
    [0.72, [214, 170, 130]],
    [0.86, [230, 220, 205]],
    [1.00, [244, 242, 238]]
  ];

  function mix(p) {
    for (var i = 1; i < stops.length; i++) {
      if (p <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i];
        var t = (p - a[0]) / (b[0] - a[0]);
        return a[1].map(function (v, k) { return Math.round(v + (b[1][k] - v) * t); });
      }
    }
    return stops[stops.length - 1][1];
  }

  function onScrollHow() {
    if (!how) return;
    var r = how.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh * 0.6 - r.top) / (r.height - vh * 0.3);
    p = Math.max(0, Math.min(1, p));
    var c = mix(p);
    how.style.setProperty('--how-bg', 'rgb(' + c.join(',') + ')');
    var light = p > 0.68;
    how.style.setProperty('--how-fg', light ? '#2B2B2E' : '#F4F2EE');
    how.style.setProperty('--how-sub', light ? 'rgba(43,43,46,.6)' : 'rgba(244,242,238,.6)');
    how.style.setProperty('--how-line', light ? 'rgba(43,43,46,.18)' : 'rgba(244,242,238,.18)');
    how.style.setProperty('--how-glow', Math.max(0, Math.min(1, (p - 0.45) / 0.3)) * (1 - Math.max(0, (p - 0.85) / 0.15)));

    var mid = vh * 0.62;
    steps.forEach(function (s) {
      s.classList.toggle('is-active', s.getBoundingClientRect().top < mid);
    });
  }

  /* ---------- index Design: 색상 전환 ---------- */
  var designImage = document.getElementById('designImage');
  var designName = document.getElementById('designName');
  document.querySelectorAll('.design .swatch').forEach(function (btn, _, all) {
    btn.addEventListener('click', function () {
      all.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      swapMedia(designImage, btn.dataset.file);
      designImage.querySelector('img').alt = 'NOXLUX ' + btn.textContent.trim();
      if (designName) designName.textContent = btn.dataset.name;
    });
  });

  /* ---------- product: 이미지 슬라이드 ---------- */
  var slider = document.getElementById('slider');
  var goTo = function () {};
  if (slider) {
    var track = slider.querySelector('.slider__track');
    var slides = slider.querySelectorAll('.slider__slide');
    var dotsWrap = slider.querySelector('.slider__dots');
    var prev = slider.querySelector('.slider__btn--prev');
    var next = slider.querySelector('.slider__btn--next');
    var current = 0;

    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'slider__dot';
      d.setAttribute('aria-label', (i + 1) + '번째 이미지');
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
    });
    var dots = dotsWrap.querySelectorAll('.slider__dot');

    goTo = function (i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: track.clientWidth * i, behavior: reduceMotion ? 'auto' : 'smooth' });
      setCurrent(i);
    };

    function setCurrent(i) {
      current = i;
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }

    prev.addEventListener('click', function () { goTo(current - 1); });
    next.addEventListener('click', function () { goTo(current + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    var scrollTimer;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        if (i !== current) {
          setCurrent(i);
          syncColor(slides[i].dataset.color);
        }
      }, 80);
    });
    window.addEventListener('resize', function () { track.scrollLeft = track.clientWidth * current; });
    setCurrent(0);
  }

  /* ---------- product: 색상 · 구독 옵션 ---------- */
  var colorInputs = document.querySelectorAll('input[name="color"]');
  var colorLabel = document.getElementById('colorLabel');

  function syncColor(value) {
    colorInputs.forEach(function (input) {
      if (input.value === value) {
        input.checked = true;
        if (colorLabel) colorLabel.textContent = input.dataset.name;
      }
    });
  }

  colorInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      if (colorLabel) colorLabel.textContent = input.dataset.name;
      var idx = Array.prototype.findIndex.call(document.querySelectorAll('.slider__slide'), function (s) {
        return s.dataset.color === input.value;
      });
      if (idx > -1) goTo(idx);
    });
  });

  var totalSub = document.getElementById('totalSub');
  document.querySelectorAll('input[name="plan"]').forEach(function (input) {
    input.addEventListener('change', function () {
      if (!totalSub) return;
      totalSub.textContent = input.value === 'sub' && input.checked
        ? '+ 카트리지 정기 구독 월 12,900원 (매월 별도 결제)'
        : '';
    });
  });

  /* ---------- product: 구매 버튼 ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  document.querySelectorAll('.js-virtual').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!toast) return;
      toast.textContent = '가상 제품입니다. 실제 구매는 진행되지 않습니다.';
      toast.classList.add('is-show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 2600);
    });
  });

  /* ---------- product: 상세 탭 현재 위치 ---------- */
  var tabLinks = document.querySelectorAll('.tabs a');
  var tabTargets = Array.prototype.map.call(tabLinks, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  function onScrollTabs() {
    if (!tabLinks.length) return;
    var line = window.innerHeight * 0.35;
    var active = 0;
    tabTargets.forEach(function (t, i) {
      if (t && t.getBoundingClientRect().top < line) active = i;
    });
    tabLinks.forEach(function (a, i) { a.classList.toggle('is-current', i === active); });
  }

  /* ---------- 스크롤 묶음 ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScrollHeader();
      onScrollHow();
      onScrollTabs();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
