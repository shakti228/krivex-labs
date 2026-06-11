function toggleMenu() {
  const nav = document.getElementById("siteNav");
  nav.classList.toggle("open");
}

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Command copied!"))
      .catch(() => fallbackCopy(text));
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
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "22px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#2563eb";
  toast.style.color = "#ffffff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.fontWeight = "800";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 16px 35px rgba(37, 99, 235, 0.25)";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1800);
}

document.addEventListener("click", function (event) {
  const nav = document.getElementById("siteNav");
  const button = document.querySelector(".menu-toggle");

  if (!nav || !button) return;

  if (!nav.contains(event.target) && !button.contains(event.target)) {
    nav.classList.remove("open");
  }
});
