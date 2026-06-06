document.addEventListener("DOMContentLoaded", () => {
    const alertsBtn = document.querySelector('.alerts-btn');
    const wrapper = document.querySelector('.alerts-wrapper');
    const dropdown = document.querySelector('.alerts-dropdown');

    let open = false;

    // -----------------------------
    // DATA MODEL
    // -----------------------------
    let alerts = [];

    function now() {
        return new Date();
    }

    function isToday(date) {
        const d = new Date(date);
        const today = new Date();

        return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
        );
    }

    // -----------------------------
    // STATE
    // -----------------------------
    function updateAlertState() {
        wrapper.classList.toggle('has-alerts', alerts.length > 0);
    }

    // -----------------------------
    // GROUP ALERTS
    // -----------------------------
    function groupAlerts() {
        return {
            today: alerts.filter(a => isToday(a.createdAt)),
            earlier: alerts.filter(a => !isToday(a.createdAt))
        };
    }

    // -----------------------------
    // RENDER SYSTEM
    // -----------------------------
    function renderAlerts() {
        dropdown.innerHTML = "";

        const grouped = groupAlerts();

        const hasAny =
            grouped.today.length > 0 || grouped.earlier.length > 0;

        if (!hasAny) {
            const empty = document.createElement("p");
            empty.className = "alert-item visible";
            empty.textContent = "No new alerts";
            dropdown.appendChild(empty);
            return;
        }

        // helper to create section
        function createSection(title, items) {
            if (items.length === 0) return;

            const header = document.createElement("div");
            header.className = "alert-section-title";
            header.textContent = title;

            dropdown.appendChild(header);

            items.forEach((alert, index) => {
                const item = document.createElement("div");
                item.className = "alert-item";
                item.textContent = alert.message;

                item.style.transitionDelay = `${index * 60}ms`;

                dropdown.appendChild(item);

                requestAnimationFrame(() => {
                    item.classList.add("visible");
                });
            });
        }

        createSection("TODAY", grouped.today);
        createSection("EARLIER", grouped.earlier);
    }

    // -----------------------------
    // API
    // -----------------------------
    function addAlert(message) {
        alerts.unshift({
            id: Date.now(),
            message,
            createdAt: new Date(),
            read: false
        });

        updateAlertState();
        renderAlerts();
    }

    function removeAlert(id) {
        alerts = alerts.filter(a => a.id !== id);
        updateAlertState();
        renderAlerts();
    }

    function clearAlerts() {
        alerts = [];
        updateAlertState();
        renderAlerts();
    }

    function markAllRead() {
        alerts = alerts.map(a => ({ ...a, read: true }));
        updateAlertState();
        renderAlerts();
    }

    // -----------------------------
    // UI CONTROL
    // -----------------------------
    function openDropdown() {
        dropdown.classList.add('show');
        open = true;
        renderAlerts();
    }

    function closeDropdown() {
        open = false;
        dropdown.classList.remove('show');
    }

    function toggleDropdown(e) {
        e.stopPropagation();
        open ? closeDropdown() : openDropdown();
    }

    // -----------------------------
    // EVENTS
    // -----------------------------
    alertsBtn.addEventListener('click', toggleDropdown);

    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            closeDropdown();
        }
    });

    // -----------------------------
    // INIT
    // -----------------------------
    updateAlertState();
    renderAlerts();

    // expose API
    window.addAlert = addAlert;
    window.removeAlert = removeAlert;
    window.clearAlerts = clearAlerts;
    window.markAllRead = markAllRead;
});