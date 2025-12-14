const menuBtn = document.getElementById("menuBtn");
const hamburgerMenu = document.getElementById("hamburgermenu");

menuBtn.addEventListener("click", () => {
  if (hamburgerMenu.classList.contains("visible")) {
    hamburgerMenu.style.animationName = "hamburger-close";

    hamburgerMenu.addEventListener(
      "animationend",
      () => {
        hamburgerMenu.classList.remove("visible");
        hamburgerMenu.style.animationName = "";
        menuBtn.classList.remove("active");
      },
      { once: true }
    );
  } else {
    hamburgerMenu.classList.add("visible");
    hamburgerMenu.style.animationName = "hamburger-open";
    menuBtn.classList.add("active");
  }
});

// Hamburger menu Buttons
const listBtn = document.getElementById("listBtn");
const settingsBtn = document.getElementById("settingsBtn");

function navigateWithAnimation(url) {
  // Exit-Animation starten
  document.body.style.animationName = "bodyExitAnimation";
  document.body.style.animationDuration = "1s";
  document.body.style.animationFillMode = "forwards"; // bleibt am Endzustand

  // Nach Ende der Animation zur neuen Seite wechseln
  document.body.addEventListener(
    "animationend",
    () => {
      window.location.href = url;
    },
    { once: true } // nur einmal
  );
}

settingsBtn.addEventListener("click", () => {
  navigateWithAnimation("settings.html");
});

listBtn.addEventListener("click", () => {
  navigateWithAnimation("index.html");
});

const themeSelect = document.getElementById("themeSelect");

// Beim Laden: vorher gespeichertes Theme laden
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
themeSelect.value = savedTheme;

// Wenn der Benutzer das Theme wechselt
themeSelect.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;

  // Alte Theme-Klasse entfernen
  document.body.classList.remove("light", "dark");

  // Neue Theme-Klasse setzen
  document.body.classList.add(selectedTheme);

  // Speichern, damit es beim nächsten Laden wiederhergestellt wird
  localStorage.setItem("theme", selectedTheme);
});
