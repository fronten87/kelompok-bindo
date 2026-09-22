const members = [
  {
    name: "Aditya Kaffin Zain",
    role: "Documentation",
    image: "assets/members/member-1.jpg",
    description: "[Mendokumentasikan proses & kegiatan kelompok.]",
    skills: ["Documentation", "Presentation"]
  },
  {
    name: "Audria Mikayla R",
    role: "Content & Research",
    image: "assets/members/member-2.jpg",
    description: "[Mencari dan mengumpulkan materi.]",
    skills: ["Research", "Content"]
  },
  {
    name: "Hafid Maulana Akbar",
    role: "Developer",
    image: "assets/members/member-3.jpg",
    description: "[Membuat dan mengembangkan website.]",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "M Raffi Al Habsy",
    role: "Content & Research",
    image: "assets/members/member-4.jpg",
    description: "[Mencari dan mengumpulkan materi.]",
    skills: ["Research", "Content"]
  },
  {
    name: "Yufina Putri Widiani",
    role: "Designer",
    image: "assets/members/member-5.jpg",
    description: "[Merancang tampilan dan konsep visual.]",
    skills: ["UI Design", "Creative"]
  }
];

const project = {
  title: "MATERI BUSINESS PLAN",
  description: "Nexora Creative merupakan usaha jasa digital yang bergerak di bidang web development dan graphic design. Jasa ini membantu mahasiswa, UMKM, organisasi, startup, hingga perusahaan dalam membuat website dan kebutuhan desain yang sesuai dengan kebutuhan mereka.",
  image: "assets/project/project-preview.jpg",
  year: "2026",
  technologies: ["HTML", "CSS", "JavaScript"],
  projectUrl: "https://lancarabadi.my.id"
};

const gallery = [
  { image: "assets/gallery/gallery-1.jpg", label: "Diskusi" },
  { image: "assets/gallery/gallery-2.jpg", label: "Proses Pengerjaan" },
  { image: "assets/gallery/gallery-3.jpg", label: "Desain" },
  { image: "assets/gallery/gallery-4.jpg", label: "Coding" },
  { image: "assets/gallery/gallery-5.jpg", label: "Presentasi" }
];

const membersGrid = document.getElementById("members-grid");
const galleryGrid = document.getElementById("gallery-grid");

function renderMembers() {
  membersGrid.innerHTML = members.map((member, index) => `
    <article class="member-card reveal">
      <div class="member-photo">
        <img src="${member.image}" alt="Foto ${member.name}" loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">
        <div class="member-placeholder" hidden>${index + 1}</div>
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <div class="member-role">${member.role}</div>
        <p>${member.description}</p>
        <div class="skills">
          ${member.skills.map(skill => `<span class="skill">${skill}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function renderGallery() {
  galleryGrid.innerHTML = gallery.map((item, index) => `
    <button class="gallery-item reveal lightbox-trigger" type="button"
      data-lightbox="gallery-${index + 1}" aria-label="Buka dokumentasi ${item.label}">
      <img src="${item.image}" alt="Dokumentasi ${item.label}" loading="lazy"
        onerror="this.style.opacity='.25';">
      <span class="gallery-label">${item.label}</span>
    </button>
  `).join("");
}

function renderProject() {
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-year").textContent = project.year;
  document.getElementById("project-tech").textContent = project.technologies.join(" · ");
  const link = document.getElementById("project-link");
  link.href = project.projectUrl;
}

renderMembers();
renderGallery();
renderProject();

const header = document.getElementById("site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.getElementById("primary-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];

function closeMenu() {
  navPanel.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
  document.body.classList.remove("menu-open");
}
function openMenu() {
  navPanel.classList.add("open");
  menuToggle.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Tutup menu");
  document.body.classList.add("menu-open");
}
menuToggle.addEventListener("click", () => {
  navPanel.classList.contains("open") ? closeMenu() : openMenu();
});
navLinks.forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("click", event => {
  if (window.innerWidth <= 767 && navPanel.classList.contains("open") &&
      !navPanel.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
    closeLightbox();
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("group-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
document.documentElement.dataset.theme = initialTheme;

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Aktifkan light mode" : "Aktifkan dark mode");
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("group-theme", next);
  updateThemeButton();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

const lightboxSources = {
  "project-preview": { src: project.image, alt: project.title },
  "screenshot-1": { src: "assets/project/screenshot-1.jpg", alt: "Screenshot project 1" },
  "screenshot-2": { src: "assets/project/screenshot-2.jpg", alt: "Screenshot project 2" },
  "screenshot-3": { src: "assets/project/screenshot-3.jpg", alt: "Screenshot project 3" },
  ...Object.fromEntries(gallery.map((item, i) => [`gallery-${i + 1}`, { src: item.image, alt: item.label }]))
};

function openLightbox(key) {
  const item = lightboxSources[key];
  if (!item) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
  lightboxClose.focus();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("menu-open");
}
document.addEventListener("click", event => {
  const trigger = event.target.closest(".lightbox-trigger");
  if (trigger) openLightbox(trigger.dataset.lightbox);
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.getElementById("current-year").textContent = new Date().getFullYear();
