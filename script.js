const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
menuToggle.addEventListener("click", () => {
  let isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navigation.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }),
);
// Ganti tanggal ini sesuai tanggal peluncuran resmi. Waktu memakai zona WIB (+07:00).
const launchDate = new Date("2026-11-20T19:00:00+07:00").getTime();
function renderCountdown() {
  const diff = Math.max(0, launchDate - Date.now());
  const d = Math.floor(diff / 86400000),
    h = Math.floor(diff / 3600000) % 24,
    m = Math.floor(diff / 60000) % 60,
    s = Math.floor(diff / 1000) % 60;
  for (const [key, value] of [
    ["days", d],
    ["hours", h],
    ["minutes", m],
    ["seconds", s],
  ])
    document.getElementById(key).textContent = String(value).padStart(2, "0");
}
renderCountdown();
setInterval(renderCountdown, 1000);
function wireChoices(groupId, dataKey, inputName) {
  const group = document.getElementById(groupId);
  group.querySelectorAll("button").forEach((button) =>
    button.addEventListener("click", () => {
      group
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`[name="${inputName}"]`).value =
        button.dataset[dataKey];
    }),
  );
}
wireChoices("attendanceChoice", "attendance", "attendance");
wireChoices("guestChoice", "guests", "guests");
document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  const text = `Konfirmasi Kehadiran - Hidup Kedua\nNama: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.phone}\nInstansi: ${data.organization || "-"}\nStatus: ${data.attendance}\nJumlah tamu: ${data.guests}\nPesan: ${data.message || "-"}`;
  document.getElementById("formFeedback").textContent =
    "Data konfirmasi sudah siap. Aplikasi email akan dibuka untuk pengiriman (belum tersambung ke server RSVP).";
  window.location.href = `mailto:?subject=${encodeURIComponent("RSVP Peluncuran Hidup Kedua")}&body=${encodeURIComponent(text)}`;
});
document.getElementById("year").textContent = new Date().getFullYear();

// Progressive enhancement: scrolling section highlights, reveals and interactions.
(() => {
  const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  const sectionIds = ["tentang", "penulis", "acara", "lokasi"];
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  function updateActive() {
    let active = "";
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.35)
        active = section.id;
    }
    navLinks.forEach((link) => {
      const yes = link.getAttribute("href") === "#" + active;
      link.classList.toggle("is-current", yes);
      if (yes) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
  if (motionOK && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".section-heading,.story-photo,.story-columns,.testimonial,.author-block,.event-grid,.rsvp-grid,.location-grid",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -35px 0px" },
    );
    targets.forEach((el) => {
      el.dataset.reveal = "";
      observer.observe(el);
    });
    document.documentElement.classList.add("has-motion");
  }
  // Close mobile menu on Escape and when tapping outside.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
      menuToggle.focus();
    }
  });
  document.addEventListener("pointerdown", (e) => {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
  document.querySelectorAll(".choice-row").forEach((group) =>
    group.querySelectorAll(".choice").forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        String(btn.classList.contains("active")),
      );
      btn.addEventListener("click", () =>
        group
          .querySelectorAll(".choice")
          .forEach((b) =>
            b.setAttribute(
              "aria-pressed",
              String(b.classList.contains("active")),
            ),
          ),
      );
    }),
  );
})();

/* ======================================
   INTERACTIVE RUNDOWN - FINAL
   Bisa buka & tutup accordion
   Detail hanya WAKTU dan DURASI
====================================== */

(() => {
  const agendaList = document.getElementById("agendaList");
  if (!agendaList) return;

  const rundown = [
    {
      time: "17.00",
      range: "17.00 – 18.00 WIB",
      duration: "60 menit",
      title: "Open Gate & Registrasi",
    },
    {
      time: "18.45",
      range: "18.45 – 19.00 WIB",
      duration: "15 menit",
      title: "Sosialisasi K3 oleh PLN",
    },
    {
      time: "19.00",
      range: "19.00 – 19.10 WIB",
      duration: "10 menit",
      title: "Pembukaan oleh MC & Doa",
    },
    {
      time: "19.10",
      range: "19.10 – 19.20 WIB",
      duration: "10 menit",
      title: "Pemutaran Film Andi Arief",
    },
    {
      time: "19.20",
      range: "19.20 – 19.35 WIB",
      duration: "15 menit",
      title: "Dramatic Reading: Pelajaran Cinta",
    },
    {
      time: "19.35",
      range: "19.35 – 19.50 WIB",
      duration: "15 menit",
      title: "Monolog Penulis Buku & Tokoh",
    },
    {
      time: "19.50",
      range: "19.50 – 20.00 WIB",
      duration: "10 menit",
      title: "Sambutan Tuan Rumah",
    },
    {
      time: "20.00",
      range: "20.00 – 20.15 WIB",
      duration: "15 menit",
      title: "Sambutan SBY",
    },
    {
      time: "20.15",
      range: "20.15 – 20.30 WIB",
      duration: "15 menit",
      title: "Penyerahan Buku Simbolik",
    },
    {
      time: "20.30",
      range: "Setelah penyerahan buku – 22.00 WIB",
      duration: "60–90 menit",
      title: "Penampilan Konser KLa Project",
    },
  ];

  const counter = document.getElementById("eventCounter");
  const activeTime = document.getElementById("eventActiveTime");
  const activeTitle = document.getElementById("eventActiveTitle");
  const activeRange = document.getElementById("eventActiveRange");
  const activeDuration = document.getElementById("eventDuration");
  const prevButton = document.getElementById("eventPrev");
  const nextButton = document.getElementById("eventNext");

  let currentIndex = 0;
  let openIndex = 0;

  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }

  // GENERATE TIMELINE
  agendaList.innerHTML = rundown
    .map(
      (item, index) => `
    <div class="agenda-item" data-index="${index}">

      <button
        type="button"
        class="agenda-trigger"
        data-index="${index}"
        id="agenda-trigger-${index}"
        aria-expanded="false"
        aria-controls="agenda-detail-${index}"
      >
        <span class="agenda-time">
          ${escapeHTML(item.time)}
        </span>

        <span class="agenda-dot"></span>

        <span class="agenda-title">
          ${escapeHTML(item.title)}
        </span>

        <span class="agenda-chevron">⌄</span>
      </button>

      <!-- DETAIL YANG BISA DIBUKA / DITUTUP -->
      <div
        class="agenda-expand"
        id="agenda-detail-${index}"
        role="region"
        aria-labelledby="agenda-trigger-${index}"
        aria-hidden="true"
      >
        <div class="agenda-expand-inner">
          <div class="agenda-detail-content">

            <div class="agenda-meta-grid">

              <div class="agenda-meta">
                <span class="agenda-meta-label">
                  WAKTU (WIB)
                </span>
                <span class="agenda-meta-value">
                  ${escapeHTML(item.range)}
                </span>
              </div>

              <div class="agenda-meta">
                <span class="agenda-meta-label">
                  DURASI
                </span>
                <span class="agenda-meta-value">
                  ${escapeHTML(item.duration)}
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  `,
    )
    .join("");

  const rows = [...agendaList.querySelectorAll(".agenda-item")];

  // UPDATE TAMPILAN
  function updateDisplay(scroll = false) {
    const item = rundown[currentIndex];

    // KARTU BIRU KIRI
    counter.textContent = `SESI ${String(currentIndex + 1).padStart(2, "0")} / ${String(rundown.length).padStart(2, "0")}`;

    activeTime.textContent = item.time;
    activeTitle.textContent = item.title;
    activeRange.textContent = item.range;
    activeDuration.textContent = item.duration.toUpperCase();

    // ACCORDION KANAN
    rows.forEach((row, index) => {
      const isOpen = index === openIndex;

      row.classList.toggle("active", isOpen);

      const trigger = row.querySelector(".agenda-trigger");
      const detail = row.querySelector(".agenda-expand");

      trigger.setAttribute("aria-expanded", String(isOpen));

      detail.setAttribute("aria-hidden", String(!isOpen));
    });

    // NAVIGASI
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === rundown.length - 1;

    // SCROLL HALUS
    if (scroll && openIndex !== null) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      rows[currentIndex].scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "nearest",
      });
    }
  }

  // KLIK AGENDA
  agendaList.addEventListener("click", (event) => {
    const button = event.target.closest(".agenda-trigger");
    if (!button) return;

    const index = Number(button.dataset.index);

    // JIKA SUDAH TERBUKA, TUTUP
    if (openIndex === index) {
      openIndex = null;
    } else {
      // JIKA TERTUTUP, BUKA
      openIndex = index;
    }

    currentIndex = index;
    updateDisplay();
  });

  // TOMBOL SEBELUMNYA
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      openIndex = currentIndex;
      updateDisplay(true);
    }
  });

  // TOMBOL BERIKUTNYA
  nextButton.addEventListener("click", () => {
    if (currentIndex < rundown.length - 1) {
      currentIndex++;
      openIndex = currentIndex;
      updateDisplay(true);
    }
  });

  // TAMPILAN AWAL
  updateDisplay();
})();

/* Rotatable 3D book: pointer drag, keyboard arrows and buttons. */
(() => {
  const viewport = document.getElementById("bookViewport");
  const book = document.getElementById("book3d");
  const left = document.getElementById("bookRotateLeft");
  const right = document.getElementById("bookRotateRight");
  const reset = document.getElementById("bookReset");
  if (!viewport || !book || !left || !right || !reset) return;

  let rotationX = -5;
  let rotationY = 25;
  let dragging = false;
  let prevX = 0;
  let prevY = 0;
  let pointerId = null;

  function render() {
    book.style.setProperty("--book-x", `${rotationX}deg`);
    book.style.setProperty("--book-y", `${rotationY}deg`);
  }

  function turn(delta) {
    rotationY += delta;
    render();
  }

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    pointerId = event.pointerId;
    prevX = event.clientX;
    prevY = event.clientY;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!dragging || pointerId !== event.pointerId) return;
    const dx = event.clientX - prevX;
    const dy = event.clientY - prevY;
    rotationY += dx * 0.75;
    rotationX = Math.max(-28, Math.min(28, rotationX - dy * 0.22));
    prevX = event.clientX;
    prevY = event.clientY;
    render();
  });

  function stopDrag(event) {
    if (pointerId !== event.pointerId) return;
    dragging = false;
    pointerId = null;
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  }

  viewport.addEventListener("pointerup", stopDrag);
  viewport.addEventListener("pointercancel", stopDrag);
  viewport.addEventListener("lostpointercapture", () => {
    dragging = false;
    pointerId = null;
    viewport.classList.remove("is-dragging");
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      turn(-30);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      turn(30);
    } else if (event.key === "Home") {
      event.preventDefault();
      rotationX = -5;
      rotationY = 25;
      render();
    }
  });

  left.addEventListener("click", () => turn(-45));
  right.addEventListener("click", () => turn(45));
  reset.addEventListener("click", () => {
    rotationX = -5;
    rotationY = 25;
    render();
  });

  render();
})();
