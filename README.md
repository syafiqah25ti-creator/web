# 📦 OmniStore — Template Web Universal & Manajemen CRUD

Template website modern, serbaguna, dan bersih yang dirancang khusus untuk memenuhi tugas/proyek dengan kebutuhan **CRUD (Create, Read, Update, Delete)** dan fleksibel untuk **topik atau tema apa pun**.

---

## 📁 Lokasi Proyek
Proyek ini berada di folder terpisah dan netral:
👉 **`D:\projek-web`**

---

## ⚡ Cara Menjalankan Website (Super Mudah)

1. Buka folder **`D:\projek-web`** di File Explorer.
2. Klik ganda file **`Buka_Website.bat`** (atau klik kanan file **`index.html`** -> Buka dengan Google Chrome / Microsoft Edge).
3. Website langsung terbuka 100% jalan tanpa perlu setting database yang rumit.

> **Catatan jika dosen meminta PHP**:
> Di dalam folder sudah ada `index.php` dan `api.php`. Anda cukup jalankan perintah `php -S localhost:8000` di terminal folder ini, atau letakkan folder ini di Laragon/XAMPP.

---

## 🎯 Mengapa Cocok untuk Segala Tema?

Secara default, website ini menggunakan tema **Template Umum (Produk & Toko)** dengan sebutan netral:
- **Nama Sistem**: OmniStore
- **Entitas**: "Produk"
- **Kategori**: Elektronik, Fashion, Makanan & Minuman, Aksesoris, Perlengkapan.

Jika sewaktu-waktu dosen/penguji Anda menentukan tema tertentu (misal: "Harus tema Cafe!" atau "Harus tema Gadget!"), Anda tinggal klik tombol **`Pilihan Tema`** di pojok kanan atas website, lalu pilih:
- ☕ Cafe & Kedai Kopi
- 📱 Gadget & Elektronik
- 👕 Distro & Fashion Streetwear
- 📚 Toko Buku & ATK
- 💊 Apotek & Farmasi
- 📦 Inventaris Gudang/Aset
- 🍎 Toko Buah & Sayur

Seluruh data, logo, warna, dan kategori akan berubah seketika!

---

## 🛠️ Fitur CRUD yang Tersedia

1. **Create (Tambah Data)**:
   - Klik tombol **`+ Tambah Produk`** di kanan atas.
   - Isi form (SKU, Nama, Kategori, Harga, Stok, Satuan, Status, Deskripsi).
   - Bisa upload foto dari komputer lokal atau pakai URL gambar online.
   - Terdapat deteksi SKU duplikat dan validasi lengkap.

2. **Read (Tampil Data)**:
   - **Mode Katalog Toko**: Tampilan kartu grid modern dengan foto, harga, status stok, dan tombol detail.
   - **Mode Tabel Admin**: Tampilan tabel profesional untuk mengelola data.
   - **Pencarian Real-Time**: Ketik di kolom search, data langsung tersaring seketika tanpa reload halaman.
   - **Filter Kategori & Filter Status**: Mempermudah penyaringan data.
   - **Sortir**: Harga terendah/tertinggi, nama A-Z, stok terbanyak.
   - **Pagination**: Menampilkan data per halaman secara rapi.

3. **Update (Edit Data)**:
   - Klik tombol **Pensil (Edit)** pada baris item mana pun.
   - Form otomatis terisi data lama.
   - Ubah data dan klik **Simpan Data**.

4. **Delete (Hapus Data)**:
   - Klik tombol **Tong Sampah (Hapus)**.
   - Muncul dialog konfirmasi interaktif SweetAlert2 agar tidak sengaja terhapus.

---

## 🌟 Fitur Tambahan (Nilai Plus Saat Presentasi)

- 📊 **Dashboard KPI**: Otomatis menghitung Total Produk, Total Nilai Aset (Harga × Stok), Stok Menipis, dan Kategori.
- 📑 **Export Excel/CSV**: Sekali klik untuk mengunduh laporan spreadsheet.
- 🖨️ **Cetak Laporan PDF**: Otomatis menghasilkan cetakan resmi lengkap dengan Kop Surat, Tanggal, Tabel Rapi, dan Kolom Tanda Tangan.
- 🌙 **Mode Gelap / Terang (Dark Mode)**: Tombol bulan/matahari di navbar.
- 📱 **Order via WhatsApp**: Pada popup detail produk ada tombol langsung ke chat WhatsApp.
