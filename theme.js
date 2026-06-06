document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-btn");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        button.textContent = "☀️";
    }

    button.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        const darkMode =
            document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );

        button.textContent =
            darkMode ? "☀️" : "🌙";
    });
});