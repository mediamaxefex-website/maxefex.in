const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isExpanded));
        nav.classList.toggle("is-open", !isExpanded);
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.setAttribute("aria-expanded", "false");
            nav.classList.remove("is-open");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080) {
            navToggle.setAttribute("aria-expanded", "false");
            nav.classList.remove("is-open");
        }
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
    }
});
