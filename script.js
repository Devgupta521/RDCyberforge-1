
/* =========================================================
   RD CYBERFORGE — INTERACTIVE WEBSITE SCRIPT
   Learn. Explore. Secure.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------------------------------------------------------
     1. MOBILE NAVIGATION
     --------------------------------------------------------- */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    });

    // Close the menu when a navigation link is selected.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close the menu when the user clicks outside it.
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close the menu with the Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    // Reset navigation when switching back to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  /* ---------------------------------------------------------
     2. AUTOMATIC COPYRIGHT YEAR
     --------------------------------------------------------- */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     3. COMMUNITY LINK CONFIGURATION
     --------------------------------------------------------- */

  // Replace this value with your actual community URL.
  // Example: WhatsApp community, registration form, or official page.

  const COMMUNITY_URL = "";

  const communityLink =
    document.getElementById("communityLink");

  const linkNote = document.getElementById("linkNote");

  if (communityLink) {
    if (COMMUNITY_URL.trim() !== "") {
      communityLink.href = COMMUNITY_URL;
      communityLink.target = "_blank";
      communityLink.rel = "noopener noreferrer";

      const buttonText =
        communityLink.querySelector("strong");

      if (buttonText) {
        buttonText.textContent = "Open our community";
      }

      if (linkNote) {
        linkNote.hidden = true;
      }
    } else {
      communityLink.addEventListener("click", (event) => {
        event.preventDefault();

        if (linkNote) {
          linkNote.textContent =
            "The community link is not configured yet. " +
            "Add your actual URL to COMMUNITY_URL in script.js.";

          linkNote.hidden = false;
        }
      });
    }
  }

  /* ---------------------------------------------------------
     4. SMOOTH SCROLLING FOR INTERNAL LINKS
     --------------------------------------------------------- */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        // Ignore empty anchors.
        if (!targetId || targetId === "#") return;

        const targetElement =
          document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();

          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          // Update the URL fragment without a sudden jump.
          if (history.replaceState) {
            history.replaceState(null, "", targetId);
          }
        }
      });
    });

  /* ---------------------------------------------------------
     5. ACTIVE NAVIGATION LINK
     --------------------------------------------------------- */

  const sections = document.querySelectorAll(
    "main section[id], section[id]"
  );

  const navigationAnchors = document.querySelectorAll(
    "#navLinks a[href^='#']"
  );

  if (
    sections.length > 0 &&
    navigationAnchors.length > 0 &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navigationAnchors.forEach((anchor) => {
            const anchorTarget =
              anchor.getAttribute("href");

            if (anchorTarget === `#${currentId}`) {
              anchor.classList.add("active");
              anchor.setAttribute("aria-current", "location");
            } else {
              anchor.classList.remove("active");
              anchor.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------
     6. BACK-TO-TOP BUTTON (OPTIONAL)
     --------------------------------------------------------- */

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    backToTop.hidden = true;

    window.addEventListener(
      "scroll",
      () => {
        backToTop.hidden = window.scrollY < 400;
      },
      { passive: true }
    );

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     7. FOUNDER / TEAM IMAGE FALLBACK (OPTIONAL)
     --------------------------------------------------------- */

  document
    .querySelectorAll("img[data-fallback]")
    .forEach((image) => {
      image.addEventListener("error", () => {
        const fallback = image.dataset.fallback;

        if (fallback && image.src !== fallback) {
          image.src = fallback;
        }
      });
    });

  /* ---------------------------------------------------------
     8. CONTACT FORM VALIDATION (OPTIONAL)
     --------------------------------------------------------- */

  const contactForm =
    document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      const emailInput =
        contactForm.querySelector('input[type="email"]');

      const messageInput =
        contactForm.querySelector(
          'textarea[name="message"]'
        );

      if (
        (emailInput && !emailInput.checkValidity()) ||
        (messageInput && !messageInput.value.trim())
      ) {
        event.preventDefault();

        contactForm.reportValidity();
      }
    });
  }

  /* ---------------------------------------------------------
     9. CONSOLE BRANDING
     --------------------------------------------------------- */

  console.info(
    "%cRD CyberForge",
    "color:#38bdf8;font-size:20px;font-weight:bold;"
  );

  console.info(
    "%cLearn. Explore. Secure.",
    "color:#94a3b8;font-size:12px;"
  );
});
