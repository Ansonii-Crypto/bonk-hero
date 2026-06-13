const panel = document.getElementById("side-panel");
const content = document.getElementById("panel-content");
const menu = document.getElementById("menu");
const gamePanel = document.getElementById("game-panel");

let currentView = null;
let inGameMode = false;

/* =========================
   AUDIO SETUP
========================= */

const hoverSound = new Audio("./assets/audio/MenuButtonHover.wav");
const clickSound = new Audio("./assets/audio/MenuButtonClick.wav");

hoverSound.preload = "auto";
clickSound.preload = "auto";

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

// Unlock audio on first interaction (important for browsers)
window.addEventListener("click", () => {
    hoverSound.play().then(() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
    }).catch(() => {});
}, { once: true });

/* =========================
   UI SOUND BINDING (OPTION 2)
========================= */

document.querySelectorAll(".ui-sound").forEach(btn => {

    btn.addEventListener("mouseenter", () => {
        playSound(hoverSound);
    });

    btn.addEventListener("click", () => {
        playSound(clickSound);
    });

});

/* =========================
   PANEL VIEWS
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
   PANEL OPEN
========================= */
function openPanel(view) {
    panel.classList.add("open");
    setContent(view);
}

/* =========================
   PANEL CLOSE (ANIMATED SAFE WIPE)
========================= */
function closePanel() {
    return new Promise((resolve) => {
        if (!panel.classList.contains("open")) {
            resolve();
            return;
        }

        panel.classList.remove("open");

        const handleEnd = (e) => {
            if (e.propertyName !== "width") return;

            panel.removeEventListener("transitionend", handleEnd);

            content.innerHTML = "";
            content.style.opacity = 0;
            currentView = null;

            resolve();
        };

        panel.addEventListener("transitionend", handleEnd);
    });
}

/* =========================
   CONTENT SET
========================= */
function setContent(view) {
    if (currentView === view) return;

    currentView = view;
    content.innerHTML = views[view];
    content.style.opacity = 1;
}

/* =========================
   MENU CLICK HANDLER (PANEL LOGIC)
========================= */

document.querySelectorAll(".menu-btn").forEach(btn => {

    const text = btn.textContent.trim().toLowerCase();

    const map = {
        "news": "news",
        "friend list": "friends",
        "skin selection": "skin"
    };

    const target = map[text];

    if (text === "play") return;

    btn.addEventListener("click", async () => {
        const isOpen = panel.classList.contains("open");
        const isSame = currentView === target;

        if (isOpen && isSame) {
            await closePanel();
            return;
        }

        if (!isOpen) {
            openPanel(target);
        } else {
            setContent(target);
        }
    });
});

/* =========================
   PLAY TRANSITION
========================= */

function enterGameMode() {
    if (inGameMode) return;
    inGameMode = true;

    const runTransition = async () => {

        await closePanel();

        menu.style.transition = "opacity 0.4s ease";
        panel.style.transition = "opacity 0.4s ease";

        menu.style.opacity = "0";
        panel.style.opacity = "0";

        setTimeout(() => {
            menu.style.display = "none";
            panel.style.display = "none";

            gamePanel.classList.add("active");
        }, 400);
    };

    runTransition();
}

/* =========================
   PLAY BUTTON HANDLER
========================= */

document.querySelectorAll(".menu-btn").forEach(btn => {
    if (btn.textContent.trim().toLowerCase() !== "play") return;

    btn.addEventListener("click", () => {
        enterGameMode();
    });
});