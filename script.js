// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("isOpen");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close menu when clicking link (mobile)
nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("isOpen"));
});

// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Product categories (your 4 categories) =====
const categories = [
  {
    title: "HARDWARE MATERIALS",
    desc: "Handles, locks, hinges, Bath fittings and general hardware Materials",
    items: ["Door locks & handles", "Hinges & fittings", "Fasteners & accessories", "General hardware"]
  },
  {
    title: "KITCHEN ACCESSORIES",
    desc: "Modular kitchen fittings and Kitchen Accessories",
    items: ["Drawer channels", "Kitchen baskets", "Cabinet hinges", "Soft-close accessories"]
  },
  {
    title: "PLYWOOD",
    desc: "Quality Branded plywood options for furniture and interior works",
    items: ["Commercial plywood", "Marine plywood", "Block boards", "Furniture-grade plywood"]
  },
  {
    title: "LAMINATE SHEETS",
    desc: "Decorative laminates in many colours, textures, finishes and Louvers",
    items: ["Glossy & matte laminates", "Textured finishes", "Interior laminates", "Design patterns"]
  }
];

const grid = document.getElementById("categoryGrid");
if (grid) {
  grid.innerHTML = categories.map((c, i) => `
    <article class="category reveal" data-idx="${i}">
      <div class="category__t">${c.title}</div>
      <div class="category__d">${c.desc}</div>
    </article>
  `).join("");
}

// ===== Modal =====
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalList = document.getElementById("modalList");
const modalClose = document.getElementById("modalClose");
const modalClose2 = document.getElementById("modalClose2");

function openModal(cat) {
  if (!modal) return;
  modalTitle.textContent = cat.title;
  modalDesc.textContent = cat.desc;
  modalList.innerHTML = cat.items.map(x => `<li>${x}</li>`).join("");
  modal.classList.add("isOpen");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("noScroll");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("isOpen");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("noScroll");
}

grid?.addEventListener("click", (e) => {
  const card = e.target.closest(".category");
  if (!card) return;
  const idx = Number(card.dataset.idx);
  openModal(categories[idx]);
});

modal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});

modalClose?.addEventListener("click", closeModal);
modalClose2?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== FAQ accordion (animated) =====
document.querySelectorAll(".faq__q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    if (!answer) return;

    const isOpen = answer.classList.contains("isOpen");

    // Close all
    document.querySelectorAll(".faq__a").forEach(a => a.classList.remove("isOpen"));
    document.querySelectorAll(".faq__q").forEach(q => q.setAttribute("aria-expanded", "false"));

    // Open clicked
    if (!isOpen) {
      answer.classList.add("isOpen");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// ===== Form submit: open email with filled details (to ephwcbe@gmail.com) =====
const form = document.getElementById("quoteForm");
const toast = document.getElementById("toast");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements["name"]?.value?.trim() || "";
  const contact = form.elements["contact"]?.value?.trim() || "";
  const message = form.elements["message"]?.value?.trim() || "";

  const to = "ephwcbe@gmail.com";
  const subject = encodeURIComponent(`Quote Request - ${name || "Customer"}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Phone/Email: ${contact}\n\n` +
    `Requirements:\n${message}\n\n` +
    `---\nSent from EP Hardware website`
  );

  // Small toast (visual)
  if (toast) {
    toast.style.display = "block";
    toast.textContent = "Opening your email app with the filled details…";
    setTimeout(() => { toast.style.display = "none"; }, 2500);
  }

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  form.reset();
});

// ===== Scroll reveal animations =====
const revealEls = document.querySelectorAll(".reveal, .feature, .stat, .quote, .brand, .miniCard, .gallery-item, .section__head");

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  // add reveal class if missing, so everything animates smoothly
  if (!el.classList.contains("reveal")) el.classList.add("reveal");
  io.observe(el);
});
