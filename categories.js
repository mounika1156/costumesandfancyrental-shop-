
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const html = document.documentElement;

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const rtlToggle = document.getElementById("rtlToggle");

    const menuToggle = document.getElementById("menuToggle");
    const menuIcon = document.getElementById("menuIcon");
    const navMenu = document.getElementById("navMenu");

    const navDropdown = document.getElementById("navDropdown");
    const dropdownToggle = document.getElementById("dropdownToggle");


    function applyTheme(theme) {
        const dark = theme === "dark";

        if (dark) {
            html.setAttribute("data-theme", "dark");
        } else {
            html.removeAttribute("data-theme");
        }

        if (themeIcon) {
            themeIcon.className = dark
                ? "bi bi-sun-fill"
                : "bi bi-moon-stars-fill";
        }

        themeToggle?.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    try {
        applyTheme(
            localStorage.getItem("costume-crown-theme") || "light"
        );
    } catch {
        applyTheme("light");
    }

    themeToggle?.addEventListener("click", function () {
        const next =
            html.getAttribute("data-theme") === "dark"
                ? "light"
                : "dark";

        applyTheme(next);

        try {
            localStorage.setItem("costume-crown-theme", next);
        } catch {}
    });


    function applyDirection(direction) {
        const next = direction === "rtl" ? "rtl" : "ltr";

        html.setAttribute("dir", next);

        rtlToggle?.setAttribute(
            "aria-label",
            next === "rtl" ? "Switch to LTR" : "Switch to RTL"
        );
    }

    try {
        applyDirection(
            localStorage.getItem("costume-crown-direction") || "ltr"
        );
    } catch {
        applyDirection("ltr");
    }

    rtlToggle?.addEventListener("click", function () {
        const next =
            html.getAttribute("dir") === "rtl" ? "ltr" : "rtl";

        applyDirection(next);

        try {
            localStorage.setItem("costume-crown-direction", next);
        } catch {}
    });


    function closeMenu() {
        navMenu?.classList.remove("active");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        if (menuIcon) {
            menuIcon.className = "bi bi-list";
        }
    }

    function openMenu() {
        navMenu?.classList.add("active");

        menuToggle?.setAttribute("aria-expanded", "true");
        menuToggle?.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        if (menuIcon) {
            menuIcon.className = "bi bi-x-lg";
        }
    }

    menuToggle?.addEventListener("click", function (event) {
        event.stopPropagation();

        if (navMenu?.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });


    function setDropdown(open) {
        if (!navDropdown || !dropdownToggle) return;

        navDropdown.classList.toggle("open", open);

        dropdownToggle.setAttribute(
            "aria-expanded",
            String(open)
        );
    }

    // Start closed, including on Home-1 and Home-2 pages.
    setDropdown(false);

    dropdownToggle?.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = navDropdown.classList.contains("open");

        setDropdown(!isOpen);
    });





    function pageName(href) {
        if (!href || href.startsWith("#")) return "";

        try {
            return new URL(href, window.location.href)
                .pathname.split("/")
                .pop()
                .toLowerCase() || "index.html";
        } catch {
            return "";
        }
    }

    function updateActivePage() {
        const current =
            window.location.pathname.split("/").pop().toLowerCase()
            || "index.html";

        document.querySelectorAll(
            ".nav-menu .nav-link"
        ).forEach(function (link) {
            const active =
                pageName(link.getAttribute("href")) === current;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        let homeActive = false;

        document.querySelectorAll(
            ".nav-menu .dropdown-link"
        ).forEach(function (link) {
            const active =
                pageName(link.getAttribute("href")) === current;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
                homeActive = true;
            } else {
                link.removeAttribute("aria-current");
            }
        });

        // Highlight arrow if Home-1 or Home-2 is the current page.
        // IMPORTANT: Do not call setDropdown(true) here.
        dropdownToggle?.classList.toggle("active", homeActive);
    }

    updateActivePage();




    navMenu?.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 1100) {
                closeMenu();
            }
        });
    });





    document.addEventListener("click", function (event) {
        if (
            navDropdown &&
            !navDropdown.contains(event.target)
        ) {
            setDropdown(false);
        }

        if (
            window.innerWidth <= 1100 &&
            navMenu &&
            menuToggle &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });




    

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setDropdown(false);
            closeMenu();
        }
    });




    window.addEventListener("resize", function () {
        if (window.innerWidth > 1100) {
            closeMenu();
        }
    });






    

    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});