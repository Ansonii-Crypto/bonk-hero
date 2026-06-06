document.addEventListener("DOMContentLoaded", () => {
    const alertsBtn = document.querySelector('.alerts-btn');
    const dropdown = document.querySelector('.alerts-dropdown');
    const items = document.querySelectorAll('.alert-item');

    let open = false;

    function openDropdown() {
        dropdown.classList.add('show');
        open = true;

        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 60}ms`;
            item.classList.add('visible');
        });
    }

    function closeDropdown() {
        open = false;

        items.forEach((item) => {
            item.classList.remove('visible');
            item.style.transitionDelay = '0ms';
        });

        dropdown.classList.remove('show');
    }

    alertsBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (open) closeDropdown();
        else openDropdown();
    });

    document.addEventListener('click', closeDropdown);
});