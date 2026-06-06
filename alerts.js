document.addEventListener("DOMContentLoaded", () => {
    const alertsBtn = document.querySelector('.alerts-btn');
    const wrapper = document.querySelector('.alerts-wrapper');
    const dropdown = document.querySelector('.alerts-dropdown');

    let open = false;

    // -------------------------
    // DATA (your alerts)
    // -------------------------
    let alerts = [];

    // -------------------------
    // STATE: visual indicator
    // -------------------------
    function updateAlertState() {
        wrapper.classList.toggle('has-alerts', alerts.length > 0);
    }

    // -------------------------
    // RENDER DROPDOWN
    // -------------------------
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

    // -------------------------
    // ADD ALERT
    // -------------------------
    function addAlert(message) {
        alerts.push({
            id: Date.now(),
            message
        });

        updateAlertState();
        renderAlerts();
    }

    // -------------------------
    // REMOVE ALERT
    // -------------------------
    function removeAlert(id) {
        alerts = alerts.filter(a => a.id !== id);

        updateAlertState();
        renderAlerts();
    }

    // -------------------------
    // CLEAR ALERTS
    // -------------------------
    function clearAlerts() {
        alerts = [];

        updateAlertState();
        renderAlerts();
    }

    // -------------------------
    // OPEN / CLOSE DROPDOWN
    // -------------------------
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

    // -------------------------
    // INITIAL STATE
    // -------------------------
    updateAlertState();
    renderAlerts();

    // -------------------------
    // EXPOSE TO CONSOLE (IMPORTANT)
    // -------------------------
    window.addAlert = addAlert;
    window.removeAlert = removeAlert;
    window.clearAlerts = clearAlerts;
});