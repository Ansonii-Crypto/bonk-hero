document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-switch");

    if (!button) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        const transition = document.querySelector(".theme-transition");
        const button = document.querySelector(".theme-switch");

        button.addEventListener("click", () => {
            const isDark = document.body.classList.contains("dark-theme");

            const direction = isDark ? "left" : "right";

            // 1. start wipe
            transition.classList.remove("active-left", "active-right");

            // force reflow so restart always triggers
            void transition.offsetWidth;

            transition.classList.add(
                direction === "right" ? "active-right" : "active-left"
            );

            // 2. switch theme mid-animation
            setTimeout(() => {
                document.body.classList.toggle("dark-theme");
            }, 250);

            // 3. cleanup after animation
            setTimeout(() => {
                transition.classList.remove("active-right", "active-left");
            }, 500);
        });
    }

    button.addEventListener("click", () => {
        const darkMode =
            document.body.classList.toggle("dark-theme");

        button.classList.toggle("dark", darkMode);

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    });
});