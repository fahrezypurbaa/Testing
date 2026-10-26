# Landing Page Hidup Kedua

Rekonstruksi HTML/CSS/JavaScript dari screenshot yang dikirim pengguna, terdiri atas semua section: hero, countdown, sinopsis, testimoni, penulis, rundown, RSVP, lokasi, dan footer.

## Cara menjalankan

- Cara paling mudah: buka `index.html` di browser.
- Atau jalankan server lokal: `python3 -m http.server 5173` dari direktori ini, lalu buka `http://localhost:5173`.
- Tidak memerlukan npm, framework, atau build step.

## Penting untuk kesamaan visual

- Situs aslinya tidak dapat diakses saat pembuatan. Gambar dalam `assets/` adalah crop dari screenshot 320 x 1600 yang diberikan. Karena itu resolusinya rendah; ganti dengan asset asli beresolusi tinggi untuk hasil yang benar-benar setara.
- Copy kecil yang tidak terbaca pada screenshot direkonstruksi, bukan transkripsi asli.
- Countdown menggunakan tanggal CONTOH pada `script.js`, ganti `launchDate` dengan tanggal resmi.
- Form RSVP bekerja dari sisi tampilan dan membuka email, **belum menyimpan data ke backend**. Hubungkan handler `submit` dengan API/Google Sheets bila diperlukan.
- Peta adalah preview berdasarkan screenshot, tombol membuka pencarian Google Maps.
- Testimoni adalah teks demo: verifikasi dan ganti dengan kutipan asli sebelum publikasi.


## Peta interaktif
Bagian LOKASI menggunakan Google Maps embed langsung (tanpa API key) untuk Gedung PLN Kantor Pusat, Jl. Trunojoyo Blok M-I No. 135, Kebayoran Baru, Jakarta Selatan. Peta memerlukan koneksi internet serta akses ke Google Maps. Tombol membuka lokasi dan petunjuk arah di Google Maps.


## Revisi interaksi
- Efek hover dan focus pada navigasi, CTA, tombol, kartu, cover buku, gambar, rundown, serta pilihan RSVP.
- Menu aktif mengikuti posisi scroll; menu mobile dapat ditutup dengan Escape atau klik di luar.
- Animasi reveal ringan ketika section muncul di viewport; otomatis dinonaktifkan pada preferensi reduced motion.
- Peta tetap embed Google Maps, panel informasi lokasi tampil sebagai overlay.

**Batas kesesuaian:** Efek interaksi website referensi belum dapat diaudit langsung karena domain tidak dapat dijangkau dari lingkungan pengerjaan. Efek di sini merupakan rekonstruksi yang bisa disesuaikan lebih lanjut, bukan klaim pixel-perfect/interaksi identik.
