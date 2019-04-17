(() => {
    'use strict';
    const body = document.body;
    const observer = new MutationObserver((mutations) => {
        const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        if (!inputs) return;
        inputs.forEach((input) => {
            input.onmouseover = (e) => {
                const $this = e.target;
                const checked = $this.checked;
                if (window.event.altKey) $this.checked = !checked;
            }
        });
    });
    observer.observe(body, {
        childList: true,
        subtree: true
    });
})();