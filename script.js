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

const galleryContainer = document.getElementById("gallery-container");

if (galleryContainer) {
    const username = "media-maxefex";
    const repo = "maxefex.in";
    const folder = "gallery";

    fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`)
        .then((response) => response.json())
        .then((data) => {
            if (!Array.isArray(data)) {
                throw new Error("Gallery data unavailable");
            }

            const imageFiles = data.filter((file) =>
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );

            galleryContainer.innerHTML = "";

            if (!imageFiles.length) {
                galleryContainer.innerHTML =
                    '<p class="gallery-empty">Portfolio images will appear here soon.</p>';
                return;
            }

            imageFiles.forEach((file) => {
                const item = document.createElement("article");
                item.className = "gallery-item";
                item.innerHTML = `
                    <div class="gallery-frame">
                        <img src="${file.download_url}" alt="${file.name.split(".")[0]}" loading="lazy" decoding="async">
                    </div>
                    <div class="gallery-caption">${file.name.split(".")[0]}</div>
                `;
                galleryContainer.appendChild(item);
            });
        })
        .catch(() => {
            galleryContainer.innerHTML =
                '<p class="gallery-empty">Unable to load portfolio images right now. Please try again shortly.</p>';
        });
}
