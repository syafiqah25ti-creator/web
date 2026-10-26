/**
 * ==============================================================================
 * config.js - PUSAT PENGATURAN TEMA & APLIKASI
 * ==============================================================================
 * Template ini netral & fleksibel untuk topik/tema apa pun.
 * Anda bisa mengubah tema kapan saja cukup dengan mengganti nilai 'activePreset':
 * 
 * Pilihan Tema:
 * 1. 'umum'       -> Template Netral (Produk, Barang, Toko Serbaguna)
 * 2. 'cafe'       -> Cafe, Kedai Kopi & Restoran
 * 3. 'gadget'     -> Toko HP & Elektronik
 * 4. 'fashion'    -> Distro & Pakaian Streetwear
 * 5. 'buku'       -> Toko Buku & Alat Tulis
 * 6. 'apotek'     -> Apotek & Farmasi Kesehatan
 * 7. 'inventaris' -> Inventaris & Logistik Gudang
 * 8. 'buah'       -> Toko Buah & Sayur
 * 9. 'custom'     -> Bebas atur nama dan kategori sendiri di bawah
 * ==============================================================================
 */

const APP_CONFIG = {
  // 👉 1. TEMA AKTIF DEFAULT (Sudah diatur ke 'umum'):
  activePreset: "umum",

  // 👉 2. JIKA MEMILIH 'custom', ATUR SENDIRI NILAI DI BAWAH INI:
  custom: {
    brandName: "MyStore Pro",
    tagline: "Platform Manajemen Katalog & Produk Serbaguna",
    entityName: "Produk",               // Sebutan item: misal Produk, Barang, Menu, dll
    currency: "Rp",                      // Simbol mata uang
    defaultUnit: "unit",                 // Satuan default: unit, pcs, kg, porsi, dll
    colorTheme: "indigo",                // Pilihan: indigo, emerald, blue, amber, rose, purple, cyan, slate
    whatsappNumber: "6281234567890",     // Nomor WA untuk fitur order
    categories: [
      "Kategori A",
      "Kategori B",
      "Kategori C"
    ]
  },

  // 👉 3. PENGATURAN FITUR
  features: {
    enableDarkMode: true,               // Tombol tema gelap/terang
    enablePresetSwitcher: true,         // Modal tombol ganti tema langsung di layar
    enableExportExcel: true,            // Fitur export data ke CSV/Excel
    enablePrintReport: true,            // Fitur cetak laporan formal / PDF
    enableCatalogView: true,            // Tampilan Grid Card ala E-Commerce
    enableTableView: true,              // Tampilan Tabel CRUD Admin
    itemsPerPage: 8                     // Jumlah item per halaman (pagination)
  }
};
