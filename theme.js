document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-switch");

    if (!button) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
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