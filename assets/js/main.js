/* ===================================
   ETHYRA GLOBAL RESEARCH
   MAIN JAVASCRIPT
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initStickyHeader();
    initActiveNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initCounters();

});

/* ==========================
   MOBILE MENU
========================== */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {
            icon.classList.remove("bi-list");
            icon.classList.add("bi-x-lg");
        } else {
            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");
        }

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("bi-x-lg");
            icon.classList.add("bi-list");

        });

    });

}

/* ==========================
   STICKY HEADER EFFECT
========================== */

function initStickyHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,.06)";

        }

    });

}

/* ==========================
   ACTIVE PAGE HIGHLIGHT
========================== */

function initActiveNavigation() {

    const currentPage =
        window.location.pathname.split("/").pop();

    const navLinks =
        document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (
            href === currentPage ||
            (currentPage === "" &&
             href === "index.html")
        ) {
            link.classList.add("active");
        }

    });

}

/* ==========================
   SCROLL ANIMATIONS
========================== */

function initScrollAnimations() {

    const animatedElements = document.querySelectorAll(
        ".service-card, .feature-card, .stat-card, .hero-card"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "all 0.7s ease";

        observer.observe(element);

    });

}

/* ==========================
   SMOOTH SCROLL
========================== */

function initSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const targetId =
                    this.getAttribute("href");

                if (targetId === "#") return;

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

}

/* ==========================
   COUNTER ANIMATION
========================== */

function initCounters() {

    const counters =
        document.querySelectorAll(".stat-card h3");

    if (!counters.length) return;

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.4
        }
    );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

function animateCounter(element) {

    const text =
        element.innerText.replace(/[^\d]/g, "");

    const target = parseInt(text);

    if (isNaN(target)) return;

    const suffix =
        element.innerText.replace(/\d/g, "");

    let current = 0;

    const increment =
        Math.ceil(target / 80);

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.innerText =
            current + suffix;

    }, 20);

}

/* ==========================
   LAZY IMAGE LOADING
========================== */

document.addEventListener("DOMContentLoaded", () => {

    const lazyImages =
        document.querySelectorAll("img[data-src]");

    if (!lazyImages.length) return;

    const imageObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const img = entry.target;

                    img.src =
                        img.dataset.src;

                    img.removeAttribute(
                        "data-src"
                    );

                    imageObserver.unobserve(
                        img
                    );

                }

            });

        });

    lazyImages.forEach(img => {

        imageObserver.observe(img);

    });

});

/* ==========================
   BACK TO TOP BUTTON
========================== */

const backToTop =
    document.createElement("button");

backToTop.innerHTML =
    '<i class="bi bi-arrow-up"></i>';

backToTop.className =
    "back-to-top";

document.body.appendChild(backToTop);

Object.assign(backToTop.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "none",
    zIndex: "999",
    background: "#0a5c8f",
    color: "#fff",
    fontSize: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,.15)"
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ==========================
   PRELOADER SUPPORT
========================== */

window.addEventListener("load", () => {

    const preloader =
        document.querySelector(".preloader");

    if (!preloader) return;

    preloader.style.opacity = "0";

    setTimeout(() => {

        preloader.remove();

    }, 500);

});