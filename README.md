# 🏢 Booka Room - Meeting Room Management System

Booka Room adalah aplikasi web komprehensif untuk mengelola dan memesan ruang rapat. Aplikasi ini dibangun dengan arsitektur modern menggunakan Vue.js untuk antarmuka pengguna (frontend) dan Express.js beserta MySQL untuk sistem sisi server (backend). 

Proyek ini dirancang dengan memisahkan hak akses antara **Admin** (untuk mengelola data) dan **User** (untuk melakukan pemesanan), menjadikannya solusi ideal untuk manajemen fasilitas di dalam kantor atau *coworking space*.

## ✨ Fitur Utama

### 👑 Panel Admin
* **Dashboard Statistik:** Ringkasan aktivitas pemesanan ruangan.
* **Manajemen Ruangan:** Tambah, edit, dan hapus data ruangan (termasuk fasilitas dan kapasitas).
* **Manajemen Pengguna:** Kelola data pengguna yang terdaftar di sistem.
* **Manajemen Pemesanan:** Setujui, tolak, atau batalkan pemesanan yang masuk.

### 👤 Panel Pengguna (User)
* **Katalog Ruangan:** Lihat daftar ruangan yang tersedia beserta detail fasilitasnya.
* **Pemesanan Ruangan:** Lakukan pemesanan ruangan dengan memilih tanggal dan waktu yang spesifik.
* **Riwayat Pemesanan:** Lacak status pemesanan (menunggu, disetujui, selesai, atau ditolak).

### 🔐 Fitur Umum
* **Autentikasi Aman:** Sistem Login dan Register dengan otorisasi berbasis token (JWT).
* **Notifikasi Email:** Pengiriman email otomatis untuk status pemesanan.

---

## 🛠️ Teknologi yang Digunakan

**Frontend:**
* [Vue.js 3](https://vuejs.org/) - Framework JavaScript
* [Vite](https://vitejs.dev/) - Build tool yang sangat cepat
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
* [Pinia](https://pinia.vuejs.org/) - State Management
* [Vue Router](https://router.vuejs.org/) - Routing halaman
* [Histoire](https://histoire.dev/) - UI Component explorer (untuk *storyboarding* komponen)

**Backend:**
Repository:
https://github.com/Alvin-Saputra/booka-room-backend
* [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Server environment & web framework
* [MySQL](https://www.mysql.com/) - Database Relasional
* JSON Web Token (JWT) - Autentikasi
* Nodemailer (via `sendEmail.js`) - Layanan pengiriman email

---

## 🚀 Cara Instalasi dan Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal **Node.js** dan **MySQL** di sistem Anda sebelum memulai.

### 1. Setup Database
1. Buat database baru di MySQL, misalnya dengan nama `booka_room_db`.
2. (Jika ada file migration/seeder, jelaskan langkahnya di sini. Jika tidak, pastikan tabel sudah disiapkan sesuai model backend Anda).

### 2. Menjalankan Backend
1. Buka terminal dan arahkan ke folder backend:
   ```bash
   cd booka-room-backend
