const hoverSound = new Audio("./assets/audio/MenuButtonHover.wav");
const clickSound = new Audio("./assets/audio/MenuButtonClick.wav");

// preload for responsiveness
hoverSound.preload = "auto";
clickSound.preload = "auto";

// helper to safely play without breaking on autoplay restrictions
function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

/* =========================
   EVENT DELEGATION (recommended)
========================= */

document.addEventListener("mouseover", (e) => {
    const el = e.target.closest(".ui-sound");
    if (!el) return;

    // optional: avoid spam when moving within same element
    if (el.dataset.hovered) return;
    el.dataset.hovered = "true";

    playSound(hoverSound);
});

document.addEventListener("mouseout", (e) => {
    const el = e.target.closest(".ui-sound");
    if (!el) return;

    el.dataset.hovered = "";
});

document.addEventListener("click", (e) => {
    const el = e.target.closest(".ui-sound");
    if (!el) return;

    playSound(clickSound);
});