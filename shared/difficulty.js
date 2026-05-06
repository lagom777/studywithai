/* ============================================================
   nanamate · 난이도 탭 (상/중/하)
   .difficulty-tabs 와 .difficulty-content 요소 자동 바인딩
   ============================================================ */

(function() {
  'use strict';

  function init() {
    document.querySelectorAll('.difficulty-tabs').forEach(tabs => {
      const buttons = tabs.querySelectorAll('.difficulty-tab');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.target;
          const container = tabs.parentElement;

          // 모든 탭 비활성화
          tabs.querySelectorAll('.difficulty-tab').forEach(b => b.classList.remove('active'));
          container.querySelectorAll('.difficulty-content').forEach(c => c.classList.remove('active'));

          // 선택된 탭 활성화
          btn.classList.add('active');
          const content = container.querySelector(`.difficulty-content[data-level="${target}"]`);
          if (content) content.classList.add('active');
        });
      });

      // 첫 번째 탭(하)을 기본 활성화
      if (buttons.length > 0 && !tabs.querySelector('.difficulty-tab.active')) {
        buttons[0].click();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
