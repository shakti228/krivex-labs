const menuBtn =
  document.getElementById("menuBtn") ||
  document.querySelector(".menu-btn") ||
  document.querySelector(".menu-toggle");

const navMenu =
  document.getElementById("navMenu") ||
  document.getElementById("siteNav") ||
  document.querySelector(".nav") ||
  document.querySelector(".site-nav");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    const clickedMenu = navMenu.contains(event.target);
    const clickedButton = menuBtn.contains(event.target);

    if (!clickedMenu && !clickedButton) {
      navMenu.classList.remove("open");
      menuBtn.classList.remove("active");
    }
  });
}

/* Auto active menu based on current page */
function setActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav a, .site-nav a");

  links.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    link.classList.remove("active");

    if (currentPage === "" && linkPage === "index.html") {
      link.classList.add("active");
    }

    if (currentPage === linkPage) {
      link.classList.add("active");
    }

    if (currentPage === "index.html" && linkPage === "index.html") {
      link.classList.add("active");
    }
  });
}

setActiveMenu();

/* Homepage dynamic content loader */
function loadHomepageContent() {
  fetch("data/homepage.json?v=" + new Date().getTime())
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const heroBadge = document.getElementById("heroBadge");
      const heroTitle = document.getElementById("heroTitle");
      const heroDescription = document.getElementById("heroDescription");
      const primaryBtn = document.getElementById("primaryBtn");
      const secondaryBtn = document.getElementById("secondaryBtn");
      const point1 = document.getElementById("point1");
      const point2 = document.getElementById("point2");
      const point3 = document.getElementById("point3");

      if (heroBadge && data.hero_badge) {
        heroBadge.textContent = data.hero_badge;
      }

      if (heroTitle && data.hero_title) {
        heroTitle.textContent = data.hero_title;
      }

      if (heroDescription && data.hero_description) {
        heroDescription.textContent = data.hero_description;
      }

      if (primaryBtn) {
        if (data.primary_button_text) {
          primaryBtn.textContent = data.primary_button_text;
        }

        if (data.primary_button_link) {
          primaryBtn.href = data.primary_button_link;
        }
      }

      if (secondaryBtn) {
        if (data.secondary_button_text) {
          secondaryBtn.textContent = data.secondary_button_text;
        }

        if (data.secondary_button_link) {
          secondaryBtn.href = data.secondary_button_link;
        }
      }

      if (point1 && data.point_1) {
        point1.textContent = "✓ " + data.point_1;
      }

      if (point2 && data.point_2) {
        point2.textContent = "✓ " + data.point_2;
      }

      if (point3 && data.point_3) {
        point3.textContent = "✓ " + data.point_3;
      }
    })
    .catch(function (error) {
      console.log("Homepage data not loaded:", error);
    });
}

loadHomepageContent();

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(function () {
        showToast("Command copied!");
      })
      .catch(function () {
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    showToast("Command copied!");
  } catch (error) {
    alert("Copy failed. Please copy manually.");
  }

  document.body.removeChild(textarea);
}

function showToast(message) {
  const oldToast = document.querySelector(".toast-message");
  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.left = "50%";
  toast.style.bottom = "22px";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#2563eb";
  toast.style.color = "#ffffff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.fontWeight = "800";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 16px 35px rgba(37, 99, 235, 0.25)";

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 1800);
}
/* Tools dynamic loader */
function loadToolsContent() {
  const toolsContainer = document.getElementById("toolsContainer");

  if (!toolsContainer) return;

  fetch("data/tools.json?v=" + new Date().getTime())
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      toolsContainer.innerHTML = "";

      data.tools.forEach(function (tool) {
        const card = document.createElement("article");
        card.className = "tool-card";

        card.innerHTML = `
          <h3>${tool.name}</h3>
          <p>${tool.description}</p>
          <code>${tool.command}</code>
          <button onclick="copyText('${tool.command.replace(/'/g, "\\'")}')">Copy Command</button>
        `;

        toolsContainer.appendChild(card);
      });
    })
    .catch(function (error) {
      console.log("Tools data not loaded:", error);
    });
}

loadToolsContent();
