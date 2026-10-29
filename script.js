
/* =====================================================
   HIDUP KEDUA - SCRIPT UTAMA
   Navigasi, countdown, rundown, buku 3D,
   komentar, dan RSVP ke Google Sheets.
   ===================================================== */

// 1. NAVIGASI
const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navigation');

if (menuToggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  };

  menuToggle.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });

  navigation.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', closeMenu)
  );

  document.addEventListener('keydown', event => {
    if (
      event.key === 'Escape' &&
      navigation.classList.contains('open')
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener('pointerdown', event => {
    if (
      navigation.classList.contains('open') &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}


// 2. COUNTDOWN (WIB)
const launchDate =
  new Date('2026-11-20T19:00:00+07:00').getTime();

function renderCountdown() {
  const diff = Math.max(0, launchDate - Date.now());

  const values = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent =
        String(value).padStart(2, '0');
    }
  });
}

renderCountdown();
setInterval(renderCountdown, 1000);

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}


// PILIHAN JUMLAH TAMU
(function () {
  const group = document.getElementById('guestChoice');
  const input = document.querySelector(
    '#rsvpForm [name="guests"]'
  );

  if (!group || !input) return;

  group.querySelectorAll('button[data-guests]')
    .forEach(button => {
      button.addEventListener('click', () => {
        group.querySelectorAll('button')
          .forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
          });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        input.value = button.dataset.guests;
      });
    });
})();


// 3. NAVIGASI AKTIF DAN ANIMASI SECTION
(function () {
  const navLinks = [
    ...document.querySelectorAll('.nav a[href^="#"]')
  ];

  const sections = [
    'tentang', 'penulis', 'acara', 'lokasi'
  ]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function updateActive() {
    let active = '';

    sections.forEach(section => {
      if (
        section.getBoundingClientRect().top <=
        window.innerHeight * 0.35
      ) {
        active = section.id;
      }
    });

    navLinks.forEach(link => {
      const isCurrent =
        link.getAttribute('href') === '#' + active;

      link.classList.toggle(
        'is-current', isCurrent
      );

      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener(
    'scroll',
    updateActive,
    { passive: true }
  );

  updateActive();

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    !reduceMotion &&
    'IntersectionObserver' in window
  ) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    document.querySelectorAll(
      '.section-heading,.story-photo,.story-columns,.testimonial,.author-block,.event-grid,.rsvp-grid,.location-grid'
    ).forEach(element => {
      element.dataset.reveal = '';
      observer.observe(element);
    });

    document.documentElement.classList.add(
      'has-motion'
    );
  }
})();


// 4. RUNDOWN INTERAKTIF
(function () {
  const agendaList =
    document.getElementById('agendaList');

  if (!agendaList) return;

  const rundown = [
    {
      time: '17.00',
      range: '17.00 – 18.00 WIB',
      duration: '60 menit',
      title: 'Open Gate & Registrasi'
    },
    {
      time: '18.45',
      range: '18.45 – 19.00 WIB',
      duration: '15 menit',
      title: 'Sosialisasi K3 oleh PLN'
    },
    {
      time: '19.00',
      range: '19.00 – 19.10 WIB',
      duration: '10 menit',
      title: 'Pembukaan oleh MC & Doa'
    },
    {
      time: '19.10',
      range: '19.10 – 19.20 WIB',
      duration: '10 menit',
      title: 'Pemutaran Film'
    },
    {
      time: '19.20',
      range: '19.20 – 19.35 WIB',
      duration: '15 menit',
      title: 'Dramatic Reading: Pelajaran Cinta'
    },
    {
      time: '19.35',
      range: '19.35 – 19.50 WIB',
      duration: '15 menit',
      title: 'Monolog Penulis Buku'
    },
    {
      time: '19.50',
      range: '19.50 – 20.00 WIB',
      duration: '10 menit',
      title: 'Sambutan-sambutan'
    },
    {
      time: '20.15',
      range: '20.15 – 20.30 WIB',
      duration: '15 menit',
      title: 'Penyerahan Buku Simbolik'
    },
    {
      time: '20.30',
      range: 'Setelah penyerahan buku – 22.00 WIB',
      duration: '60–90 menit',
      title: 'Penampilan KLa Project'
    }
  ];

  const specialTitle =
    'Penyerahan Buku Simbolik';

  const specialDescription =
    'kepada tokoh dan perwakilan undangan';

  const counter =
    document.getElementById('eventCounter');

  const activeTime =
    document.getElementById('eventActiveTime');

  const activeTitle =
    document.getElementById('eventActiveTitle');

  const activeRange =
    document.getElementById('eventActiveRange');

  const activeDuration =
    document.getElementById('eventDuration');

  const prevButton =
    document.getElementById('eventPrev');

  const nextButton =
    document.getElementById('eventNext');

  if (![
    counter,
    activeTime,
    activeTitle,
    activeRange,
    activeDuration,
    prevButton,
    nextButton
  ].every(Boolean)) return;

  const escapeHTML = value =>
    String(value).replace(
      /[&<>"']/g,
      char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[char]
    );

  const subtitleHTML = item =>
    item.title === specialTitle
      ? `<small class="symbolic-subtitle">${escapeHTML(specialDescription)}</small>`
      : '';

  // GENERATE TIMELINE
  agendaList.innerHTML = rundown
    .map((item, index) => `
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
            ${subtitleHTML(item)}
          </span>

          <span class="agenda-chevron">⌄</span>
        </button>

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
    `)
    .join('');

  const rows = [
    ...agendaList.querySelectorAll('.agenda-item')
  ];

  let currentIndex = 0;
  let openIndex = 0;

  function updateDisplay(scroll = false) {
    const item = rundown[currentIndex];

    counter.textContent =
      `SESI ${String(currentIndex + 1).padStart(2, '0')} / ${String(rundown.length).padStart(2, '0')}`;

    activeTime.textContent = item.time;
    activeTitle.textContent = item.title;

    if (item.title === specialTitle) {
      const small = document.createElement('small');

      small.className = 'symbolic-subtitle';
      small.textContent = specialDescription;

      activeTitle.appendChild(small);
    }

    activeRange.textContent = item.range;

    activeDuration.textContent =
      item.duration.toUpperCase();

    rows.forEach((row, index) => {
      const isOpen = index === openIndex;

      row.classList.toggle('active', isOpen);

      row.querySelector('.agenda-trigger')
        .setAttribute(
          'aria-expanded',
          String(isOpen)
        );

      row.querySelector('.agenda-expand')
        .setAttribute(
          'aria-hidden',
          String(!isOpen)
        );
    });

    prevButton.disabled =
      currentIndex === 0;

    nextButton.disabled =
      currentIndex === rundown.length - 1;

    if (scroll && openIndex !== null) {
      rows[currentIndex].scrollIntoView({
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches ? 'auto' : 'smooth',
        block: 'nearest'
      });
    }
  }

  agendaList.addEventListener('click', event => {
    const button =
      event.target.closest('.agenda-trigger');

    if (!button) return;

    const index = Number(button.dataset.index);

    openIndex =
      openIndex === index ? null : index;

    currentIndex = index;
    updateDisplay();
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      openIndex = currentIndex;
      updateDisplay(true);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < rundown.length - 1) {
      currentIndex++;
      openIndex = currentIndex;
      updateDisplay(true);
    }
  });

  updateDisplay();
})();


// 5. BUKU 3D
(function () {
  const viewport =
    document.getElementById('bookViewport');

  const book =
    document.getElementById('book3d');

  const left =
    document.getElementById('bookRotateLeft');

  const right =
    document.getElementById('bookRotateRight');

  const reset =
    document.getElementById('bookReset');

  if (
    !viewport ||
    !book ||
    !left ||
    !right ||
    !reset
  ) return;

  let rotationX = -5;
  let rotationY = 25;

  let dragging = false;
  let prevX = 0;
  let prevY = 0;
  let pointerId = null;

  function render() {
    book.style.setProperty(
      '--book-x',
      `${rotationX}deg`
    );

    book.style.setProperty(
      '--book-y',
      `${rotationY}deg`
    );
  }

  function turn(delta) {
    rotationY += delta;
    render();
  }

  viewport.addEventListener('pointerdown', event => {
    if (
      event.pointerType === 'mouse' &&
      event.button !== 0
    ) return;

    dragging = true;
    pointerId = event.pointerId;

    prevX = event.clientX;
    prevY = event.clientY;

    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener('pointermove', event => {
    if (
      !dragging ||
      pointerId !== event.pointerId
    ) return;

    const dx = event.clientX - prevX;
    const dy = event.clientY - prevY;

    rotationY += dx * 0.75;

    rotationX = Math.max(
      -28,
      Math.min(28, rotationX - dy * 0.22)
    );

    prevX = event.clientX;
    prevY = event.clientY;

    render();
  });

  function stopDrag(event) {
    if (pointerId !== event.pointerId) return;

    dragging = false;
    pointerId = null;

    viewport.classList.remove('is-dragging');

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  }

  viewport.addEventListener('pointerup', stopDrag);
  viewport.addEventListener('pointercancel', stopDrag);

  viewport.addEventListener(
    'lostpointercapture',
    () => {
      dragging = false;
      pointerId = null;
      viewport.classList.remove('is-dragging');
    }
  );

  viewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      turn(-30);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      turn(30);
    }

    if (event.key === 'Home') {
      event.preventDefault();

      rotationX = -5;
      rotationY = 25;

      render();
    }
  });

  left.addEventListener('click', () => turn(-45));
  right.addEventListener('click', () => turn(45));

  reset.addEventListener('click', () => {
    rotationX = -5;
    rotationY = 25;
    render();
  });

  render();
})();


// 6. POPUP KOMENTAR
(function () {
  const form =
    document.getElementById('andiCommentForm');

  const frame = document.querySelector(
    'iframe[name="komentarResponseFrame"]'
  );

  if (!form || !frame) return;

  const submit = form.querySelector(
    'button[type="submit"]'
  );

  const requestIdInput =
    document.getElementById('commentRequestId');

  const originalLabel =
    submit ? submit.textContent : '';

  let pending = false;
  let timeoutId;
  let previousFocus = null;

  const overlay = document.createElement('div');

  overlay.className = 'hk-comment-popup-backdrop';
  overlay.hidden = true;

  overlay.innerHTML = `
    <div
      class="hk-comment-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hkCommentPopupTitle"
      aria-describedby="hkCommentPopupMessage"
      tabindex="-1"
    >
      <span
        class="hk-comment-popup__icon"
        aria-hidden="true"
      >✓</span>

      <h2 id="hkCommentPopupTitle">
        Komentar Berhasil Dikirim!
      </h2>

      <p id="hkCommentPopupMessage">
        Terima kasih telah berbagi cerita tentang Andi Arief.
        Komentar Anda akan ditinjau oleh panitia.
      </p>

      <button
        class="hk-comment-popup__close"
        type="button"
      >
        TUTUP
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = overlay.querySelector(
    '.hk-comment-popup__close'
  );

  const title = overlay.querySelector(
    '#hkCommentPopupTitle'
  );

  const message = overlay.querySelector(
    '#hkCommentPopupMessage'
  );

  const icon = overlay.querySelector(
    '.hk-comment-popup__icon'
  );

  function finish() {
    pending = false;
    clearTimeout(timeoutId);

    if (submit) {
      submit.disabled = false;
      submit.textContent = originalLabel;
    }
  }

  function show(success) {
    previousFocus = document.activeElement;

    title.textContent = success
      ? 'Komentar Berhasil Dikirim!'
      : 'Pengiriman Belum Terkonfirmasi';

    message.textContent = success
      ? 'Terima kasih telah berbagi cerita tentang Andi Arief. Komentar Anda akan ditinjau oleh panitia.'
      : 'Belum ada respons dari server. Periksa apakah komentar sudah tersimpan sebelum mencoba lagi.';

    icon.textContent = success ? '✓' : '!';

    overlay.dataset.status =
      success ? 'success' : 'warning';

    overlay.hidden = false;
    close.focus();
  }

  function hide() {
    overlay.hidden = true;

    if (previousFocus?.isConnected) {
      previousFocus.focus();
    }
  }

  form.addEventListener('submit', event => {
    if (pending) {
      event.preventDefault();
      return;
    }

    pending = true;

    if (requestIdInput) {
      requestIdInput.value =
        window.crypto?.randomUUID?.() ||
        `hk-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = 'MENGIRIM...';
    }

    timeoutId = setTimeout(() => {
      if (!pending) return;

      finish();
      show(false);
    }, 30000);
  });

  frame.addEventListener('load', () => {
    if (!pending) return;

    finish();
    form.reset();

    // Respons iframe termuat; belum memverifikasi Sheets.
    show(true);
  });

  close.addEventListener('click', hide);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) hide();
  });

  document.addEventListener('keydown', event => {
    if (overlay.hidden) return;

    if (event.key === 'Escape') hide();

    if (event.key === 'Tab') {
      event.preventDefault();
      close.focus();
    }
  });
})();


// =========================================
// 7. RSVP GOOGLE SHEETS + POPUP
// =========================================

// PASTIKAN INI URL DEPLOYMENT RSVP,
// BUKAN URL GOOGLE APPS SCRIPT KOMENTAR.

const RSVP_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbyT3H5QDz2L1oO_bTe7Nln6WNE8vVZ6XDcAoivCDJdiF81Plg2NiuL2xikjaHRBc95QCA/exec';

(function () {
  const form =
    document.getElementById('rsvpForm');

  if (!form) return;

  const button = form.querySelector(
    'button[type="submit"]'
  );

  const feedback =
    document.getElementById('formFeedback');

  const requestInput =
    document.getElementById('rsvpRequestId');

  const attendanceInput = form.querySelector(
    '[name="attendance"]'
  );

  const dialog =
    document.getElementById('rsvpSuccessDialog');

  const title =
    document.getElementById('hkRsvpTitle');

  const message =
    document.getElementById('hkRsvpMessage');

  const closeButton =
    document.getElementById('hkRsvpClose');

  const icon = dialog?.querySelector(
    '.hk-rsvp-dialog__icon'
  );

  if (![
    button,
    requestInput,
    attendanceInput,
    dialog,
    title,
    message,
    closeButton,
    icon
  ].every(Boolean)) {
    console.error(
      'RSVP: input tersembunyi atau dialog belum ada di index.html'
    );
    return;
  }

  const originalText = button.textContent;
  let sending = false;

  // IFRAME TERSEMBUNYI
  const iframe = document.createElement('iframe');

  iframe.name = 'hkRsvpResponseFrame';
  iframe.title = 'Respons RSVP';
  iframe.style.display = 'none';

  document.body.appendChild(iframe);

  // PILIHAN HADIR / TIDAK HADIR
  const choices = form.querySelectorAll(
    '#attendanceChoice .choice'
  );

  choices.forEach(choice => {
    choice.setAttribute(
      'aria-pressed',
      String(choice.classList.contains('active'))
    );

    choice.addEventListener('click', () => {
      choices.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      choice.classList.add('active');
      choice.setAttribute('aria-pressed', 'true');

      attendanceInput.value =
        choice.dataset.attendance;
    });
  });

  // TAMPILKAN POPUP
  function popup(header, text, success = true) {
    title.textContent = header;
    message.textContent = text;

    dialog.dataset.status =
      success ? 'success' : 'warning';

    icon.textContent = success ? '✓' : '!';

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  closeButton.addEventListener('click', () => {
    dialog.close();
  });

  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  // LOADING
  function loading(state, text = '') {
    sending = state;
    button.disabled = state;

    button.textContent = state
      ? 'MENGIRIM KONFIRMASI...'
      : originalText;

    if (feedback) {
      feedback.textContent = text;
    }
  }

  const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  // VERIFIKASI DATA DI GOOGLE SHEETS
  function verifySaved(requestId) {
    return new Promise((resolve, reject) => {
      const callbackName =
        'hkRsvpCb_' +
        Math.random().toString(36).slice(2, 14);

      const script =
        document.createElement('script');

      let done = false;

      const timer = setTimeout(() => {
        finish(new Error('Timeout'));
      }, 6500);

      function finish(error, result) {
        if (done) return;

        done = true;

        clearTimeout(timer);
        delete window[callbackName];

        script.remove();

        if (error) {
          reject(error);
        } else {
          resolve(Boolean(result?.saved));
        }
      }

      window[callbackName] = result => {
        finish(null, result);
      };

      script.onerror = () => {
        finish(new Error('Gagal memeriksa RSVP'));
      };

      const url = new URL(RSVP_WEB_APP_URL);

      url.searchParams.set('id', requestId);
      url.searchParams.set('callback', callbackName);
      url.searchParams.set('t', String(Date.now()));

      script.src = url.toString();

      document.head.appendChild(script);
    });
  }

  // PROSES KIRIM RSVP
  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (sending || !form.reportValidity()) {
      return;
    }

    // CEK URL
    if (
      !/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/
        .test(RSVP_WEB_APP_URL)
    ) {
      popup(
        'RSVP Belum Terhubung',
        'Masukkan URL deployment Apps Script RSVP.',
        false
      );

      return;
    }

    // ID UNIK UNTUK SETIAP PENGIRIMAN
    const requestId =
      window.crypto?.randomUUID?.() ||
      `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 18)}`;

    requestInput.value = requestId;

    loading(
      true,
      'Mengirim dan memverifikasi data...'
    );

    // KIRIM DATA TANPA PINDAH HALAMAN
    form.action = RSVP_WEB_APP_URL;
    form.method = 'POST';
    form.target = iframe.name;

    HTMLFormElement.prototype.submit.call(form);

    // CEK APAKAH DATA SUDAH TERSIMPAN
    let saved = false;

    const deadline =
      Date.now() + 42000;

    while (
      Date.now() < deadline &&
      !saved
    ) {
      await delay(1500);

      try {
        saved = await verifySaved(requestId);
      } catch (error) {
        // Coba verifikasi lagi tanpa mengirim ulang.
      }
    }

    // JIKA BERHASIL
    if (saved) {
      form.reset();

      attendanceInput.value = 'Hadir';

      choices.forEach(choice => {
        const active =
          choice.dataset.attendance === 'Hadir';

        choice.classList.toggle(
          'active',
          active
        );

        choice.setAttribute(
          'aria-pressed',
          String(active)
        );
      });

      const guestInput = form.querySelector(
        '[name="guests"]'
      );

      if (guestInput) {
        guestInput.value = '1';
      }

      loading(false);

      popup(
        'Konfirmasi Berhasil Dikirim!',
        'Terima kasih. RSVP Anda sudah tercatat dalam daftar tamu Hidup Kedua.'
      );

    } else {
      // JIKA BELUM DAPAT DIVERIFIKASI
      loading(
        false,
        'Status penyimpanan belum dapat diverifikasi.'
      );

      popup(
        'Konfirmasi Belum Terverifikasi',
        'Belum dapat memastikan data tersimpan. Periksa ke panitia sebelum mengirim ulang.',
        false
      );
    }
  });
})();
