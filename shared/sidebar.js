/* ============================================================
   nanamate · 사이드바 토글
   - 햄버거(☰) 버튼으로 aside 숨김/표시
   - 사이드바 상단에 난이도(하/중/상) + 언어(한/영/일/중) 통합
   - 모바일 기본 숨김, localStorage 상태 저장
   ============================================================ */

(function() {
  'use strict';

  var STORAGE_KEY = 'nanamate-sidebar';

  function init() {
    var aside = document.querySelector('aside');
    if (!aside) return;

    // 1. 햄버거 버튼 생성 (fixed, top-left)
    var burger = document.createElement('button');
    burger.className = 'sidebar-toggle';
    burger.setAttribute('aria-label', '사이드바 토글');
    burger.textContent = '☰';
    document.body.insertBefore(burger, document.body.firstChild);

    // 2. 사이드바 컨트롤 영역 생성 (aside 최상단에 삽입)
    var controls = document.createElement('div');
    controls.className = 'sidebar-controls';

    // 2a. 난이도 탭: 기존 .difficulty-tabs 이동 (main 내부 → aside 상단)
    var diffTabs = document.querySelector('main .difficulty-tabs, .difficulty-tabs');
    if (diffTabs) {
      var diffSection = document.createElement('div');
      diffSection.className = 'sidebar-section';

      var diffLabel = document.createElement('div');
      diffLabel.className = 'sidebar-label';
      diffLabel.textContent = '난이도';

      diffSection.appendChild(diffLabel);
      diffSection.appendChild(diffTabs);   // DOM 이동 (클릭 핸들러 유지됨)
      controls.appendChild(diffSection);
    }

    // 2b. 언어 토글: i18n.js가 body에 추가한 .lang-toggle 이동
    var langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
      var langSection = document.createElement('div');
      langSection.className = 'sidebar-section';

      var langLabel = document.createElement('div');
      langLabel.className = 'sidebar-label';
      langLabel.textContent = '언어';

      langSection.appendChild(langLabel);
      langSection.appendChild(langToggle); // DOM 이동 (클릭 핸들러 유지됨)
      controls.appendChild(langSection);
    }

    // 2c. 구분선
    var hr = document.createElement('hr');
    hr.className = 'sidebar-divider';
    controls.appendChild(hr);

    aside.insertBefore(controls, aside.firstChild);

    // 3. 토글 상태 적용
    var isMobile = function() { return window.innerWidth <= 768; };
    var saved = localStorage.getItem(STORAGE_KEY);
    // 저장값 없으면 모바일은 숨김, 데스크톱은 표시
    var startHidden = saved === 'hidden' || (saved === null && isMobile());

    if (startHidden) {
      aside.classList.add('sidebar-hidden');
      document.body.classList.add('sidebar-collapsed');
    }

    burger.addEventListener('click', function() {
      var hidden = aside.classList.toggle('sidebar-hidden');
      document.body.classList.toggle('sidebar-collapsed', hidden);
      localStorage.setItem(STORAGE_KEY, hidden ? 'hidden' : 'visible');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
