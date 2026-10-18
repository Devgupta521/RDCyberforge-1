// RD CyberForge — interactive behaviour
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/*
  IMPORTANT: Replace the placeholder below with your real community or
  registration link, for example a Google Form, WhatsApp community, or
  official social profile. Keep the URL inside the quotes.
*/
const COMMUNITY_URL = "";

const communityLink = document.getElementById("communityLink");
const linkNote = document.getElementById("linkNote");

if (communityLink) {
  if (COMMUNITY_URL.trim()) {
    communityLink.href = COMMUNITY_URL;
    communityLink.target = "_blank";
    communityLink.rel = "noopener noreferrer";
    communityLink.querySelector("strong").textContent = "Open our community";
    if (linkNote) linkNote.hidden = true;
  } else {
    communityLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (linkNote) {
        linkNote.textContent = "The community link has not been configured yet. Add it to COMMUNITY_URL in script.js.";
        linkNote.hidden = false;
      }
    });
  }
}
