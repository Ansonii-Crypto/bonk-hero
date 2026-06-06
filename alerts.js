document.addEventListener("DOMContentLoaded", () => {
    const alertsBtn = document.querySelector('.alerts-btn');
    const wrapper = document.querySelector('.alerts-wrapper');
    const dropdown = document.querySelector('.alerts-dropdown');

    let open = false;

    // -----------------------------
    // DATA LAYER (your alerts)
    // -----------------------------
    let alerts = [];

    // -----------------------------
    // STATE: does user have alerts?
    // -----------------------------
    function updateAlertState() {
        const hasAlerts = alerts.length > 0;
        wrapper.classList.toggle('has-alerts', hasAlerts);
    }

    // -----------------------------
    // RENDER ALERTS (UI layer)
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

            requestAnimationFrame(() => {
                item.classList.add("visible");
            });

            dropdown.appendChild(item);
        });
    }

    // -----------------------------
    // ADD / REMOVE ALERTS API
    // -----------------------------
    function addAlert(message) {
        alerts.push({
            id: Date.now(),
            message
        });

        renderAlerts();
        updateAlertState();
    }

    function removeAlert(id) {
        alerts = alerts.filter(a => a.id !== id);

        renderAlerts();
        updateAlertState();
    }

    function clearAlerts() {
        alerts = [];
        renderAlerts();
        updateAlertState();
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

    alertsBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (open) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    document.addEventListener('click', closeDropdown);

    // -----------------------------
    // INITIAL STATE
    // -----------------------------
    updateAlertState();
    renderAlerts();

    // -----------------------------
    // DEV TESTING (remove later)
    // -----------------------------
    window.addAlert = addAlert;
    window.removeAlert = removeAlert;
    window.clearAlerts = clearAlerts;
});