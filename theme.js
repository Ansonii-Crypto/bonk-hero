document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-switch");

    if (!button) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        const transition = document.querySelector(".theme-transition");
        const goingDark = !document.body.classList.contains("dark-theme");

        transition.classList.add(
            goingDark ? "active-right" : "active-left"
        );

        setTimeout(() => {
            document.body.classList.toggle("dark-theme");
        }, 250);

        setTimeout(() => {
            transition.classList.remove(
                "active-right",
                "active-left"
            );
        }, 500);
        button.classList.add("dark");
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