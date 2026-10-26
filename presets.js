/**
 * presets.js - Koleksi Preset Template Web Universal
 * Preset 'umum' adalah template netral untuk segala jenis produk / barang.
 */

const THEME_PRESETS = {
  // 1. TEMPLATE UTAMA: TEMPLATE UMUM / NETRAL (COCOK UNTUK SEMUA TEMA)
  umum: {
    id: "umum",
    name: "Template Umum (Produk & Toko)",
    icon: "shopping-bag",
    brandName: "OmniStore",
    tagline: "Sistem Manajemen Katalog & Inventaris Produk Serbaguna",
    entityName: "Produk",
    currency: "Rp",
    defaultUnit: "unit",
    colorTheme: "indigo", // Warna aksen: Indigo Modern
    categories: ["Elektronik", "Fashion", "Makanan & Minuman", "Aksesoris", "Perlengkapan"],
    items: [
      {
        id: "PRD-001",
        name: "Smartwatch Active Pro Waterproof",
        category: "Elektronik",
        price: 650000,
        stock: 18,
        unit: "unit",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
        description: "Jam tangan pintar dengan pelacak detak jantung, monitor tidur, dan layar HD."
      },
      {
        id: "PRD-002",
        name: "Tas Ransel Canvas Minimalis Urban",
        category: "Fashion",
        price: 245000,
        stock: 25,
        unit: "pcs",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
        description: "Bahan kanvas premium tahan air, kompartemen laptop hingga 15 inci."
      },
      {
        id: "PRD-003",
        name: "Kopi Arabika Single Origin 250gr",
        category: "Makanan & Minuman",
        price: 68000,
        stock: 40,
        unit: "pack",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
        description: "Biji kopi sangrai pilihan medium roast dengan aroma karamel dan buah."
      },
      {
        id: "PRD-004",
        name: "Botol Minum Tumbler Stainless 500ml",
        category: "Perlengkapan",
        price: 89000,
        stock: 30,
        unit: "pcs",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80",
        description: "Insulasi ganda tahan panas dan dingin hingga 12 jam, anti bocor."
      },
      {
        id: "PRD-005",
        name: "Wireless ANC Earbuds Bluetooth 5.3",
        category: "Aksesoris",
        price: 380000,
        stock: 4,
        unit: "unit",
        status: "Stok Menipis",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
        description: "Peredam bising aktif, audio bass jernih, baterai tahan 28 jam."
      },
      {
        id: "PRD-006",
        name: "Kaos Polos Heavyweight Cotton 24s",
        category: "Fashion",
        price: 85000,
        stock: 55,
        unit: "pcs",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
        description: "Bahan katun murni tebal, adem, jahitan rantai rapi standar distro."
      },
      {
        id: "PRD-007",
        name: "Hardcover Dotted Journal Notebook",
        category: "Perlengkapan",
        price: 45000,
        stock: 0,
        unit: "buku",
        status: "Habis",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80",
        description: "Kertas 100gsm tebal anti-tembus tinta untuk catatan kerja & kuliah."
      }
    ]
  },

  // 2. TEMA CAFE & COFFEE SHOP
  cafe: {
    id: "cafe",
    name: "Cafe & Coffee Shop",
    icon: "coffee",
    brandName: "Aroma Kopi & Eatery",
    tagline: "Kopi Racikan Spesial & Santapan Hangat Setiap Hari",
    entityName: "Menu Makanan/Minuman",
    currency: "Rp",
    defaultUnit: "cup",
    colorTheme: "amber",
    categories: ["Signature Coffee", "Non-Coffee", "Pastry & Bakery", "Makanan Utama"],
    items: [
      {
        id: "C001",
        name: "Kopi Susu Gula Aren",
        category: "Signature Coffee",
        price: 22000,
        stock: 50,
        unit: "cup",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80",
        description: "Espresso house blend dipadu susu creamy dan gula aren murni."
      },
      {
        id: "C002",
        name: "Croissant Butter Flaky",
        category: "Pastry & Bakery",
        price: 18000,
        stock: 15,
        unit: "pcs",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80",
        description: "Roti croissant renyah berlapis dengan aroma butter Prancis autentik."
      },
      {
        id: "C003",
        name: "Matcha Latte Kyoto",
        category: "Non-Coffee",
        price: 26000,
        stock: 25,
        unit: "cup",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80",
        description: "Bubuk green tea matcha asli Jepang dengan susu creamy gurih."
      }
    ]
  },

  // 3. TEMA GADGET & ELEKTRONIK
  gadget: {
    id: "gadget",
    name: "Toko Gadget & Elektronik",
    icon: "smartphone",
    brandName: "TechnoZone Digital",
    tagline: "Pusat Smartphone, Audio, & Aksesoris Gadget Terkini",
    entityName: "Produk Gadget",
    currency: "Rp",
    defaultUnit: "unit",
    colorTheme: "blue",
    categories: ["Smartphone", "Audio & TWS", "Smartwatch", "Aksesoris"],
    items: [
      {
        id: "G001",
        name: "Nova Pro Smartphone 5G 8/256GB",
        category: "Smartphone",
        price: 4299000,
        stock: 12,
        unit: "unit",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80",
        description: "Layar AMOLED 120Hz, kamera 108MP OIS, pengisian daya cepat 67W."
      },
      {
        id: "G002",
        name: "Wireless ANC Earbuds Pro",
        category: "Audio & TWS",
        price: 899000,
        stock: 24,
        unit: "unit",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
        description: "Peredam bising aktif (ANC), bass bertenaga, baterai tahan 30 jam."
      }
    ]
  },

  // 4. TEMA DISTRO & FASHION
  fashion: {
    id: "fashion",
    name: "Distro & Fashion Streetwear",
    icon: "shirt",
    brandName: "UrbanVibe Apparel",
    tagline: "Koleksi Streetwear Trendi & Kaos Distro Berkualitas",
    entityName: "Produk Pakaian",
    currency: "Rp",
    defaultUnit: "pcs",
    colorTheme: "rose",
    categories: ["Kaos & T-Shirt", "Hoodie & Jaket", "Celana & Pants", "Topi & Tas"],
    items: [
      {
        id: "F001",
        name: "Oversized Tee Japanese Typography",
        category: "Kaos & T-Shirt",
        price: 135000,
        stock: 40,
        unit: "pcs",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
        description: "Bahan Cotton Combed 24s gramasi berat, sablon discharge awet."
      },
      {
        id: "F002",
        name: "Heavyweight Fleece Hoodie Olive",
        category: "Hoodie & Jaket",
        price: 285000,
        stock: 16,
        unit: "pcs",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
        description: "Bahan cotton fleece 330gsm hangat dan nyaman dipakai sehari-hari."
      }
    ]
  },

  // 5. TEMA TOKO BUKU & ATK
  buku: {
    id: "buku",
    name: "Toko Buku & Alat Tulis",
    icon: "book-open",
    brandName: "Pustaka Cerdas Media",
    tagline: "Jendela Ilmu Pengetahuan, Buku Terlaris, & Alat Tulis Lengkap",
    entityName: "Koleksi Buku",
    currency: "Rp",
    defaultUnit: "eks",
    colorTheme: "purple",
    categories: ["Pengembangan Diri", "Teknologi & Koding", "Novel & Fiksi", "Alat Tulis"],
    items: [
      {
        id: "BK01",
        name: "Filosofi Teras (Edisi Baru)",
        category: "Pengembangan Diri",
        price: 98000,
        stock: 30,
        unit: "eks",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=80",
        description: "Penerapan filsafat stoisisme kuno untuk mental tangguh modern."
      },
      {
        id: "BK02",
        name: "Mastering Fullstack Web Dev",
        category: "Teknologi & Koding",
        price: 145000,
        stock: 14,
        unit: "eks",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=500&auto=format&fit=crop&q=80",
        description: "Panduan lengkap dari HTML, CSS, JavaScript hingga database modern."
      }
    ]
  },

  // 6. TEMA APOTEK & FARMASI
  apotek: {
    id: "apotek",
    name: "Apotek & Toko Obat Sehat",
    icon: "activity",
    brandName: "Apotek Sehat Prima",
    tagline: "Sahabat Kesehatan Keluarga & Obat-obatan Berizin Resmi",
    entityName: "Produk Obat/Kesehatan",
    currency: "Rp",
    defaultUnit: "strip",
    colorTheme: "cyan",
    categories: ["Vitamin & Suplemen", "Obat Bebas", "Alat Kesehatan", "Perawatan Diri"],
    items: [
      {
        id: "A001",
        name: "Vitamin C 1000mg Effervescent",
        category: "Vitamin & Suplemen",
        price: 45000,
        stock: 60,
        unit: "tube",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
        description: "Suplemen vitamin C rasa jeruk untuk menjaga daya tahan tubuh."
      },
      {
        id: "A002",
        name: "Termometer Digital Dahi Inframerah",
        category: "Alat Kesehatan",
        price: 115000,
        stock: 15,
        unit: "unit",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=80",
        description: "Pengukur suhu tubuh cepat 1 detik tanpa kontak langsung, LCD terang."
      }
    ]
  },

  // 7. TEMA INVENTARIS GUDANG & KANTOR
  inventaris: {
    id: "inventaris",
    name: "Inventaris Kantor & Aset",
    icon: "archive",
    brandName: "InventaPro Asset Manager",
    tagline: "Sistem Manajemen & Kontrol Logistik Aset Perusahaan",
    entityName: "Aset/Barang",
    currency: "Rp",
    defaultUnit: "unit",
    colorTheme: "slate",
    categories: ["Elektronik Kantor", "Furnitur", "Perlengkapan IT", "Kendaraan Dinas"],
    items: [
      {
        id: "INV-01",
        name: "Laptop ThinkPad E14 Gen 4",
        category: "Perlengkapan IT",
        price: 11500000,
        stock: 18,
        unit: "unit",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80",
        description: "Aset laptop divisi pengembangan & operasional kantor."
      },
      {
        id: "INV-02",
        name: "Kursi Ergonomis Mesh Office",
        category: "Furnitur",
        price: 1450000,
        stock: 35,
        unit: "unit",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1580481077111-2d7c5a089065?w=500&auto=format&fit=crop&q=80",
        description: "Sandaran punggung fleksibel, hidrolik tinggi dapat diatur."
      }
    ]
  },

  // 8. TEMA TOKO BUAH & SAYUR
  buah: {
    id: "buah",
    name: "Toko Buah & Sayur",
    icon: "apple",
    brandName: "FreshMart Organic",
    tagline: "Pusat Buah & Sayur Segar Langsung dari Petani",
    entityName: "Produk Buah",
    currency: "Rp",
    defaultUnit: "kg",
    colorTheme: "emerald",
    categories: ["Buah Lokal", "Buah Impor", "Sayuran Segar", "Paket Buah"],
    items: [
      {
        id: "B001",
        name: "Apel Fuji Super Manis",
        category: "Buah Impor",
        price: 38000,
        stock: 25,
        unit: "kg",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80",
        description: "Apel Fuji impor segar, tekstur renyah, manis alami berair."
      },
      {
        id: "B002",
        name: "Jeruk Sunkist Navel",
        category: "Buah Impor",
        price: 45000,
        stock: 18,
        unit: "kg",
        status: "Tersedia",
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=80",
        description: "Kaya vitamin C, bulir tebal dan sangat manis menyegarkan."
      }
    ]
  }
};
