document.addEventListener('DOMContentLoaded', function () {
    const searchForms = document.querySelectorAll('.ajax-search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', event => {
            const url = form.action;
            const data = new FormData(form);
            const params = new URLSearchParams(data);
            fetch(`${url}?${params.toString()}`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
            .then(response => response.text())
            .then(html => {
                const target = document.querySelector(form.dataset.target);
                if (target) target.innerHTML = html;
            });
            event.preventDefault();
        });
    });
});
