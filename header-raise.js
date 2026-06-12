window.addEventListener("DOMContentLoaded", () => {
  // wait 5 seconds, then hide header
  setTimeout(() => {
    document.getElementById("header").classList.add("hide");
  }, 5000);
});