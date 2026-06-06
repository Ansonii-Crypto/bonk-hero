document.addEventListener("DOMContentLoaded", () => {
    const alertsBtn = document.querySelector('.alerts-btn');
    const wrapper = document.querySelector('.alerts-wrapper');
    const dropdown = document.querySelector('.alerts-dropdown');

    let open = false;
    let alerts = [];

    // -----------------------------
    // UI STATE
    // -----------------------------
    function updateAlertState() {
        wrapper.classList.toggle('has-alerts', alerts.length > 0);
    }

    // -----------------------------
    // RENDER ALERTS
    // -----------------------------
    function renderAlerts() {
        dropdown.innerHTML = "";

        if (alerts.length === 0) {
            const empty = document.createElement("p");
            empty.className = "alert-item visible";
            empty.textContent = "No new alerts";
            dropdown.appendChild(empty);
            return;
        }

        alerts.forEach((alert, index) => {
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

    // -----------------------------
    // ALERT MANAGEMENT API
    // -----------------------------
    function addAlert(message) {
        alerts.push({
            id: Date.now(),
            message
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

    // -----------------------------
    // DROPDOWN CONTROL
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

        if (open) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    // -----------------------------
    // EVENTS
    // -----------------------------

    alertsBtn.addEventListener('click', toggleDropdown);

    // IMPORTANT: prevents clicks inside dropdown closing it
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // safer than stopPropagation-only approach
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

    // expose API globally
    window.addAlert = addAlert;
    window.removeAlert = removeAlert;
    window.clearAlerts = clearAlerts;
});