(function() {
  // Inject toggle button
  const toggle = document.createElement('div');
  toggle.className = 'mode-toggle';
  toggle.innerHTML =
    '<button data-mode="easy">🧒 쉬운 버전</button>' +
    '<button data-mode="paper">📄 논문 버전</button>';
  document.body.appendChild(toggle);

  // Restore saved mode (default: easy)
  const saved = localStorage.getItem('aboutai-mode') || 'easy';
  document.body.classList.add('mode-' + saved);

  // Wire up clicks
  toggle.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      document.body.classList.remove('mode-easy', 'mode-paper');
      document.body.classList.add('mode-' + mode);
      localStorage.setItem('aboutai-mode', mode);
      // Re-render MathJax if switching into paper mode (equations may have been hidden)
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
      }
    });
  });
})();
