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
    const folder = "images";

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
// chatbot 07 06 2026
function sendMessage() {

    let input = document.getElementById("userInput");
    let msg = input.value.toLowerCase().trim();

    if (!msg) return;

    let body = document.getElementById("chat-body");

    body.innerHTML += `<div class="user-msg">${input.value}</div>`;

    let reply = "";

    // Greetings
    if (msg.match(/hi|hello|hey|hii|good morning|good evening/)) {
        reply = "Hello 👋 Welcome to MAX EFEX Graphics. How can I help you today?";
    }

    // Website packages
    else if (msg.includes("4999") || msg.includes("standard")) {
        reply = "Standard Website ₹4,999. Includes 2-4 pages, WhatsApp integration, contact details, Google location setup and 1 year domain & hosting.";
    }

    else if (msg.includes("6999") || msg.includes("classic")) {
        reply = "Classic Website ₹6,999. Includes 3-6 pages, Google Reviews display, professional design and basic SEO.";
    }

    else if (msg.includes("8999") || msg.includes("premium")) {
        reply = "Premium Website ₹8,999. Includes logo, QR code, SEO, branding support and 4-8 pages.";
    }

    else if (msg.includes("11999") || msg.includes("business website")) {
        reply = "Business Website ₹11,999. Includes advanced SEO, Google Business optimization, lead forms and WhatsApp auto chat.";
    }

    // Logo
    else if (msg.includes("logo")) {
        reply = "Professional Logo Design starts at ₹1,500. Includes PNG, JPG, social media ready files and commercial usage rights.";
    }

    // SEO
    else if (msg.includes("seo") || msg.includes("google business") || msg.includes("google location")) {
        reply = "Google Business & SEO services start from ₹1,500. We provide Google Maps setup, business profile optimization and local SEO support.";
    }

    // Services
    else if (msg.includes("service")) {
        reply = "We provide Branding, Website Development, Android Apps, Windows Software, QR Systems, SEO, AI Visual Design and Print-Ready Files.";
    }

    // Domain
    else if (msg.includes("domain") || msg.includes("hosting")) {
        reply = "All website packages include 1 year domain and hosting.";
    }

    // Contact
    else if (msg.includes("contact") || msg.includes("phone") || msg.includes("call") || msg.includes("whatsapp")) {
        reply = "📞 +91 99616 99196<br>📧 mediamaxefex@gmail.com";
    }

    // About
    else if (msg.includes("about") || msg.includes("experience")) {
        reply = "MAX EFEX Graphics has 15+ years of experience in branding, websites, SEO and business growth solutions.";
    }

    // Default
    else {
        reply = "I can help with Website Packages, Logo Design, SEO, Branding, Google Business, Domain & Hosting, and Contact Information.";
    }

    body.innerHTML += `<div class="bot-msg">${reply}</div>`;

    input.value = "";
    body.scrollTop = body.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("chat-toggle");
    const chat = document.getElementById("maxefex-chat");

    if (toggle && chat) {

        toggle.addEventListener("click", function () {

            if (chat.style.display === "block") {
                chat.style.display = "none";
            } else {
                chat.style.display = "block";
            }

        });

    }

});