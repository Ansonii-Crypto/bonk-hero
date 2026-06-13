const panel = document.getElementById("side-panel");
const content = document.getElementById("panel-content");
const menu = document.getElementById("menu");
const gamePanel = document.getElementById("game-panel");

let currentView = null;

/* =========================
   VIEWS
========================= */

const views = {
    news: `
        <div class="panel-section">
            <div class="news-item">Patch 1.2 - UI improvements</div>
            <div class="news-item">New matchmaking system added</div>
            <div class="news-item">Bug fixes and performance updates</div>
        </div>
    `,
    friends: `
        <div class="panel-section">
            <div class="friend-item">Alex - Online</div>
            <div class="friend-item">Jordan - Offline</div>
            <div class="friend-item">Sam - In Game</div>
        </div>
    `,
    skin: `
        <div class="panel-section">
            <div class="news-item">Skin system coming soon</div>
        </div>
    `
};

/* =========================
   CONTENT FADE
========================= */

function swapContent(view) {
    if (!view || currentView === view) return;

    currentView = view;

    content.style.opacity = "0";

    setTimeout(() => {
        content.innerHTML = views[view];
        content.style.opacity = "1";
    }, 120);
}

/* =========================
   PANEL CONTROL
========================= */

function openPanel(view) {
    panel.classList.add("open");
    swapContent(view);
}

function closePanel() {
    panel.classList.remove("open");
}

/* =========================
   PLAY MODE TRANSITION
========================= */

function enterGameMode() {
    const run = async () => {

        // fade out submenu text first
        content.style.opacity = "0";

        // wait for text fade
        await new Promise(r => setTimeout(r, 150));

        // close submenu
        closePanel();

        // fade out menu + panel together
        menu.style.transition = "opacity 0.4s ease";
        panel.style.transition = "opacity 0.4s ease";

        menu.style.opacity = "0";
        panel.style.opacity = "0";

        await new Promise(r => setTimeout(r, 400));

        // hide DOM elements
        menu.style.display = "none";
        panel.style.display = "none";

        // show game UI
        gamePanel.classList.add("active");
    };

    run();
}

/* =========================
   SAFE VIEW HANDLER
========================= */

function requestView(view) {

    // ignore invalid buttons (e.g. Tutorial)
    if (!view || !views[view]) return;

    const isOpen = panel.classList.contains("open");
    const isSame = currentView === view;

    if (isOpen && isSame) {
        closePanel();
        return;
    }

    if (!isOpen) {
        openPanel(view);
        return;
    }

    swapContent(view);
}

/* =========================
   BUTTON BINDING
========================= */

document.querySelectorAll(".menu-btn").forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();

    const map = {
        "news": "news",
        "friend list": "friends",
        "skin selection": "skin",
        "play": "play"
        // "tutorial" intentionally not included
    };

    const target = map[text];

    btn.addEventListener("click", () => {

        if (target === "play") {
            enterGameMode();
            return;
        }

        requestView(target);
    });
});