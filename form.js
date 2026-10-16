

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const root = document.documentElement;

    const rtlToggle = document.getElementById("cc-rtl-toggle");
    const directionLabel = document.getElementById("cc-direction-label");

    const themeToggle = document.getElementById("cc-theme-toggle");
    const themeIcon = document.getElementById("cc-theme-icon");

    const eventDate = document.getElementById("cc-event-date");
    const returnDate = document.getElementById("cc-return-date");


    function readPreference(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function savePreference(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
           
        }
    }


    function applyTheme(theme) {
        const selectedTheme =
            theme === "dark" ? "dark" : "light";

        root.setAttribute("data-theme", selectedTheme);

        savePreference("cc-theme", selectedTheme);

        const isDark = selectedTheme === "dark";

        if (themeIcon) {
            themeIcon.className = isDark
                ? "bi bi-sun-fill"
                : "bi bi-moon-stars-fill";
        }

        if (themeToggle) {
            const label = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";

            themeToggle.setAttribute("aria-label", label);
            themeToggle.setAttribute("title", label);
        }

        const themeColor = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColor) {
            themeColor.setAttribute(
                "content",
                isDark ? "#211719" : "#FFF8EC"
            );
        }
    }

    function applyDirection(direction) {
        const selectedDirection =
            direction === "rtl" ? "rtl" : "ltr";

        root.setAttribute("dir", selectedDirection);

        savePreference("cc-direction", selectedDirection);

        const isRTL = selectedDirection === "rtl";

        if (directionLabel) {
            directionLabel.textContent = isRTL ? "RTL" : "LTR";
        }

        if (rtlToggle) {
            const label = isRTL
                ? "Switch to left-to-right layout"
                : "Switch to right-to-left layout";

            rtlToggle.setAttribute("aria-label", label);

            rtlToggle.setAttribute(
                "title",
                isRTL ? "Switch to LTR" : "Switch to RTL"
            );
        }
    }


    const savedTheme = readPreference("cc-theme", "light");
    const savedDirection = readPreference("cc-direction", "ltr");

    applyTheme(savedTheme);
    applyDirection(savedDirection);


    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme =
                root.getAttribute("data-theme");

            applyTheme(
                currentTheme === "dark" ? "light" : "dark"
            );
        });
    }


    if (rtlToggle) {
        rtlToggle.addEventListener("click", function () {
            const currentDirection = root.getAttribute("dir");

            applyDirection(
                currentDirection === "rtl" ? "ltr" : "rtl"
            );
        });
    }


    function updateDateValidation() {
        if (!eventDate || !returnDate) {
            return;
        }

        if (eventDate.value) {
            returnDate.min = eventDate.value;
        } else {
            returnDate.removeAttribute("min");
        }

        if (
            eventDate.value &&
            returnDate.value &&
            returnDate.value < eventDate.value
        ) {
            returnDate.setCustomValidity(
                "Return date must be on or after the event date."
            );
        } else {
            returnDate.setCustomValidity("");
        }
    }

    if (eventDate && returnDate) {
        eventDate.addEventListener(
            "change",
            updateDateValidation
        );

        returnDate.addEventListener(
            "change",
            updateDateValidation
        );

        updateDateValidation();
    }
});
