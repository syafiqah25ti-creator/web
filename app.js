/**
 * ==============================================================================
 * app.js - Logika Inti Aplikasi: CRUD, Search, Filter, Sort, Pagination,
 * Export Excel, Cetak Laporan & Sistem Preset Multi-Tema
 * ==============================================================================
 */

// Global State
let currentPresetKey = "umum";
let appState = {
  items: [],
  currentView: "catalog", // 'catalog' | 'table'
  searchQuery: "",
  filterCategory: "ALL",
  filterStatus: "ALL",
  sortBy: "newest",
  currentPage: 1,
  itemsPerPage: 8,
  darkMode: false,
};

// ==================== INISIALISASI SAAT HALAMAN DIMUAT ====================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Mode Gelap/Terang
  initDarkMode();

  // 2. Tentukan Preset yang Aktif (dari LocalStorage atau config.js)
  const savedPreset = localStorage.getItem("omni_active_preset");
  currentPresetKey = savedPreset || (typeof APP_CONFIG !== "undefined" ? APP_CONFIG.activePreset : "umum");
  if (!THEME_PRESETS[currentPresetKey] && currentPresetKey !== "custom") {
    currentPresetKey = "umum";
  }

  // 3. Muat Data Item (dari LocalStorage atau default Preset)
  loadItemsData();

  // 4. Terapkan Tampilan Tema & Konfigurasi
  applyThemeUI();

  // 5. Inisialisasi Event Listener
  setupEventListeners();

  // 6. Render Data Awal
  renderApp();
});

// ==================== PENGELOLAAN DATA (LOCAL STORAGE) ====================
function getStorageKey() {
  return `omni_items_${currentPresetKey}`;
}

function loadItemsData() {
  const rawData = localStorage.getItem(getStorageKey());
  if (rawData) {
    try {
      appState.items = JSON.parse(rawData);
    } catch (e) {
      console.error("Gagal parse data LocalStorage, memuat data preset...", e);
      loadPresetDefaultItems();
    }
  } else {
    loadPresetDefaultItems();
  }
}

function loadPresetDefaultItems() {
  const preset = THEME_PRESETS[currentPresetKey];
  if (preset && preset.items) {
    appState.items = JSON.parse(JSON.stringify(preset.items));
  } else {
    appState.items = [];
  }
  saveItemsToStorage();
}

function saveItemsToStorage() {
  localStorage.setItem(getStorageKey(), JSON.stringify(appState.items));
}

// ==================== TAMPILAN TEMA & BRANDING ====================
function getCurrentThemeConfig() {
  if (currentPresetKey === "custom" && typeof APP_CONFIG !== "undefined" && APP_CONFIG.custom) {
    return {
      brandName: APP_CONFIG.custom.brandName || "MyStore",
      tagline: APP_CONFIG.custom.tagline || "Katalog & CRUD Serbaguna",
      entityName: APP_CONFIG.custom.entityName || "Produk",
      currency: APP_CONFIG.custom.currency || "Rp",
      defaultUnit: APP_CONFIG.custom.defaultUnit || "unit",
      colorTheme: APP_CONFIG.custom.colorTheme || "indigo",
      icon: "shopping-bag",
      categories: APP_CONFIG.custom.categories || ["Umum"],
      whatsappNumber: APP_CONFIG.custom.whatsappNumber || "6281234567890"
    };
  }

  const preset = THEME_PRESETS[currentPresetKey] || THEME_PRESETS["umum"];
  return {
    brandName: preset.brandName,
    tagline: preset.tagline,
    entityName: preset.entityName,
    currency: preset.currency,
    defaultUnit: preset.defaultUnit,
    colorTheme: preset.colorTheme,
    icon: preset.icon,
    categories: preset.categories,
    whatsappNumber: "6281234567890"
  };
}

function applyThemeUI() {
  const config = getCurrentThemeConfig();

  // Set Nama Brand & Slogan
  document.getElementById("brandName").textContent = config.brandName;
  document.getElementById("brandTagline").textContent = config.tagline;
  document.getElementById("footerBrand").textContent = config.brandName;
  document.getElementById("printBrandName").textContent = config.brandName;
  document.getElementById("printTagline").textContent = config.tagline;
  document.title = `${config.brandName} — Manajemen ${config.entityName}`;

  // Set Label Entitas
  document.querySelectorAll(".stat-entity-label").forEach(el => el.textContent = config.entityName);
  document.getElementById("btnAddEntityLabel").textContent = config.entityName;
  document.querySelectorAll(".form-entity-label").forEach(el => el.textContent = config.entityName);

  // Set Ikon Brand
  const brandIcon = document.getElementById("brandIcon");
  if (brandIcon) {
    brandIcon.setAttribute("data-lucide", config.icon || "shopping-bag");
  }

  // Set Badge Tema
  const themeBadge = document.getElementById("themeBadge");
  if (themeBadge) {
    const presetName = THEME_PRESETS[currentPresetKey] ? THEME_PRESETS[currentPresetKey].name : "Custom";
    themeBadge.textContent = presetName;
  }

  // Update Kategori di Form Datalist
  const datalist = document.getElementById("categoryList");
  datalist.innerHTML = "";
  if (config.categories) {
    config.categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      datalist.appendChild(opt);
    });
  }

  // Refresh ikon lucide
  lucide.createIcons();
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // Toggle Dark Mode
  document.getElementById("btnToggleTheme").addEventListener("click", toggleDarkMode);

  // Switch View (Katalog vs Tabel)
  document.getElementById("btnViewCatalog").addEventListener("click", () => setView("catalog"));
  document.getElementById("btnViewTable").addEventListener("click", () => setView("table"));

  // Tombol Modal Preset
  document.getElementById("btnOpenPreset").addEventListener("click", openPresetModal);

  // Tombol Tambah Data
  document.getElementById("btnOpenAddModal").addEventListener("click", openAddModal);

  // Search Input Realtime
  document.getElementById("searchInput").addEventListener("input", (e) => {
    appState.searchQuery = e.target.value.trim().toLowerCase();
    appState.currentPage = 1;
    renderApp();
  });

  // Filter Kategori
  document.getElementById("filterCategory").addEventListener("change", (e) => {
    appState.filterCategory = e.target.value;
    appState.currentPage = 1;
    renderApp();
  });

  // Filter Status
  document.getElementById("filterStatus").addEventListener("change", (e) => {
    appState.filterStatus = e.target.value;
    appState.currentPage = 1;
    renderApp();
  });

  // Sort By
  document.getElementById("sortBy").addEventListener("change", (e) => {
    appState.sortBy = e.target.value;
    renderApp();
  });

  // Export CSV
  document.getElementById("btnExportCSV").addEventListener("click", exportToCSV);

  // Cetak Laporan
  document.getElementById("btnPrintReport").addEventListener("click", printReport);
}

// ==================== VIEW SWITCHING ====================
function setView(viewName) {
  appState.currentView = viewName;
  const btnCat = document.getElementById("btnViewCatalog");
  const btnTab = document.getElementById("btnViewTable");
  const viewCat = document.getElementById("catalogView");
  const viewTab = document.getElementById("tableView");

  if (viewName === "catalog") {
    btnCat.className = "flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition";
    btnTab.className = "flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    viewCat.classList.remove("hidden");
    viewTab.classList.add("hidden");
  } else {
    btnTab.className = "flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition";
    btnCat.className = "flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    viewCat.classList.add("hidden");
    viewTab.classList.remove("hidden");
  }

  renderApp();
}

// ==================== RENDER UTAMA ====================
function renderApp() {
  updateStatistics();
  updateCategoryDropdown();

  // Filter dan Sortir data
  const filteredItems = getFilteredAndSortedItems();

  // Pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / appState.itemsPerPage) || 1;
  if (appState.currentPage > totalPages) appState.currentPage = totalPages;

  const startIndex = (appState.currentPage - 1) * appState.itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + appState.itemsPerPage);

  // Render Tampilan Aktif
  if (appState.currentView === "catalog") {
    renderCatalogView(paginatedItems, filteredItems.length);
  } else {
    renderTableView(paginatedItems, filteredItems.length);
  }

  // Render Pagination Buttons & Info
  renderPagination(startIndex, paginatedItems.length, totalItems, totalPages);

  // Refresh Lucide Icons
  lucide.createIcons();
}

// ==================== FILTER, SEARCH & SORT ====================
function getFilteredAndSortedItems() {
  let result = [...appState.items];

  // 1. Search Query
  if (appState.searchQuery) {
    const q = appState.searchQuery;
    result = result.filter(item => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchSku = (item.id || "").toLowerCase().includes(q);
      const matchCat = (item.category || "").toLowerCase().includes(q);
      const matchDesc = (item.description || "").toLowerCase().includes(q);
      return matchName || matchSku || matchCat || matchDesc;
    });
  }

  // 2. Filter Kategori
  if (appState.filterCategory !== "ALL") {
    result = result.filter(item => item.category === appState.filterCategory);
  }

  // 3. Filter Status
  if (appState.filterStatus !== "ALL") {
    result = result.filter(item => item.status === appState.filterStatus);
  }

  // 4. Sortir
  switch (appState.sortBy) {
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "stock-desc":
      result.sort((a, b) => b.stock - a.stock);
      break;
    case "newest":
    default:
      break;
  }

  return result;
}

// ==================== RENDER TAMPILAN KATALOG (GRID CARD) ====================
function renderCatalogView(items, totalFiltered) {
  const container = document.getElementById("catalogGrid");
  const emptyState = document.getElementById("catalogEmptyState");

  if (totalFiltered === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  const config = getCurrentThemeConfig();

  container.innerHTML = items.map(item => {
    const statusBadge = getStatusBadgeHTML(item.status);
    const formattedPrice = formatRupiah(item.price);
    const safeImage = item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80";

    return `
      <div class="item-card glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between group">
        <div>
          <!-- Thumbnail Gambar -->
          <div class="relative h-48 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
            <img src="${safeImage}" alt="${escapeHtml(item.name)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80'">
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-sm">
              ${escapeHtml(item.category || "Umum")}
            </span>
            <div class="absolute top-3 right-3">
              ${statusBadge}
            </div>
          </div>

          <!-- Info Item -->
          <div class="p-5 space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>SKU: ${escapeHtml(item.id)}</span>
              <span>Stok: <strong class="text-slate-700 dark:text-slate-200">${item.stock} ${escapeHtml(item.unit || config.defaultUnit)}</strong></span>
            </div>

            <h3 class="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" title="${escapeHtml(item.name)}">
              ${escapeHtml(item.name)}
            </h3>

            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              ${escapeHtml(item.description || "Tidak ada deskripsi tambahan.")}
            </p>
          </div>
        </div>

        <!-- Harga & Aksi Bawah -->
        <div class="p-5 pt-0">
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-slate-400">Harga Satuan</p>
              <p class="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400">${formattedPrice}</p>
            </div>
            <div class="flex items-center space-x-1">
              <button onclick="openDetailModal('${item.id}')" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-200 transition" title="Lihat Detail">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
              <button onclick="openEditModal('${item.id}')" class="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 text-blue-600 dark:text-blue-400 transition" title="Edit Produk">
                <i data-lucide="pencil" class="w-4 h-4"></i>
              </button>
              <button onclick="confirmDeleteItem('${item.id}')" class="p-2 rounded-xl bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 text-rose-600 dark:text-rose-400 transition" title="Hapus Produk">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ==================== RENDER TAMPILAN TABEL CRUD ADMIN ====================
function renderTableView(items, totalFiltered) {
  const tbody = document.getElementById("tableBody");
  const emptyState = document.getElementById("tableEmptyState");

  if (totalFiltered === 0) {
    tbody.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  const config = getCurrentThemeConfig();

  tbody.innerHTML = items.map(item => {
    const statusBadge = getStatusBadgeHTML(item.status);
    const formattedPrice = formatRupiah(item.price);
    const safeImage = item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80";

    return `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
        <td class="py-3 px-4">
          <div class="flex items-center space-x-3">
            <img src="${safeImage}" alt="${escapeHtml(item.name)}" class="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80'">
            <div class="min-w-0">
              <p class="font-bold text-slate-900 dark:text-white truncate" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</p>
              <p class="text-xs text-slate-400 truncate">${escapeHtml(item.description || "-")}</p>
            </div>
          </div>
        </td>
        <td class="py-3 px-4 font-mono text-xs font-semibold text-slate-500">${escapeHtml(item.id)}</td>
        <td class="py-3 px-4">
          <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
            ${escapeHtml(item.category || "Umum")}
          </span>
        </td>
        <td class="py-3 px-4 font-bold text-slate-900 dark:text-white">${formattedPrice}</td>
        <td class="py-3 px-4">
          <span class="font-semibold">${item.stock}</span> 
          <span class="text-xs text-slate-400">${escapeHtml(item.unit || config.defaultUnit)}</span>
        </td>
        <td class="py-3 px-4">${statusBadge}</td>
        <td class="py-3 px-4 text-center no-print">
          <div class="inline-flex items-center space-x-1">
            <button onclick="openDetailModal('${item.id}')" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition" title="Lihat Detail">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button onclick="openEditModal('${item.id}')" class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 text-blue-600 dark:text-blue-400 transition" title="Edit Produk">
              <i data-lucide="pencil" class="w-4 h-4"></i>
            </button>
            <button onclick="confirmDeleteItem('${item.id}')" class="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 text-rose-600 dark:text-rose-400 transition" title="Hapus Produk">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// ==================== STATISTIK KPI ====================
function updateStatistics() {
  const items = appState.items;

  // 1. Total Produk
  document.getElementById("statTotalItems").textContent = items.length;

  // 2. Total Nilai Aset (Harga * Stok)
  const totalValue = items.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.stock) || 0), 0);
  document.getElementById("statTotalValue").textContent = formatRupiah(totalValue);

  // 3. Stok Menipis / Habis
  const lowStockCount = items.filter(i => Number(i.stock) <= 5 || i.status === "Stok Menipis" || i.status === "Habis").length;
  document.getElementById("statLowStock").textContent = lowStockCount;

  // 4. Total Kategori Unik
  const uniqueCategories = new Set(items.map(i => i.category).filter(Boolean));
  document.getElementById("statTotalCategories").textContent = uniqueCategories.size;
}

// Update Dropdown Kategori di Toolbar
function updateCategoryDropdown() {
  const select = document.getElementById("filterCategory");
  const currentVal = appState.filterCategory;
  const uniqueCategories = Array.from(new Set(appState.items.map(i => i.category).filter(Boolean))).sort();

  select.innerHTML = `<option value="ALL">Semua Kategori</option>`;
  uniqueCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    if (cat === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

// ==================== PAGINATION ====================
function renderPagination(startIndex, currentLength, totalItems, totalPages) {
  const infoEl = document.getElementById("paginationInfo");
  const buttonsEl = document.getElementById("paginationButtons");

  if (totalItems === 0) {
    infoEl.textContent = "Menampilkan 0 produk";
    buttonsEl.innerHTML = "";
    return;
  }

  const startDisplay = startIndex + 1;
  const endDisplay = startIndex + currentLength;
  infoEl.textContent = `Menampilkan ${startDisplay}-${endDisplay} dari ${totalItems} produk`;

  let html = "";
  // Tombol Prev
  html += `
    <button onclick="changePage(${appState.currentPage - 1})" ${appState.currentPage === 1 ? "disabled" : ""} class="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition">
      <i data-lucide="chevron-left" class="w-4 h-4"></i>
    </button>
  `;

  // Tombol Halaman Angka
  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === appState.currentPage;
    html += `
      <button onclick="changePage(${p})" class="px-3 py-1 rounded-lg text-xs font-semibold ${isActive ? "bg-indigo-600 text-white" : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"} transition">
        ${p}
      </button>
    `;
  }

  // Tombol Next
  html += `
    <button onclick="changePage(${appState.currentPage + 1})" ${appState.currentPage === totalPages ? "disabled" : ""} class="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition">
      <i data-lucide="chevron-right" class="w-4 h-4"></i>
    </button>
  `;

  buttonsEl.innerHTML = html;
}

function changePage(page) {
  const filtered = getFilteredAndSortedItems();
  const totalPages = Math.ceil(filtered.length / appState.itemsPerPage) || 1;
  if (page >= 1 && page <= totalPages) {
    appState.currentPage = page;
    renderApp();
  }
}

// ==================== CRUD: CREATE & UPDATE ====================
function openAddModal() {
  const config = getCurrentThemeConfig();
  document.getElementById("formMode").value = "create";
  document.getElementById("formItemId").value = "";
  document.getElementById("crudModalTitle").innerHTML = `
    <i data-lucide="plus-circle" class="w-5 h-5 text-indigo-600"></i>
    <span>Tambah ${config.entityName} Baru</span>
  `;

  // Reset form
  document.getElementById("crudForm").reset();
  document.getElementById("formSku").value = generateSKU();
  document.getElementById("formUnit").value = config.defaultUnit || "unit";
  document.getElementById("formStatus").value = "Tersedia";
  document.getElementById("imagePreviewContainer").classList.add("hidden");

  document.getElementById("crudModal").classList.remove("hidden");
  lucide.createIcons();
}

function openEditModal(id) {
  const item = appState.items.find(i => i.id === id);
  if (!item) return;

  const config = getCurrentThemeConfig();
  document.getElementById("formMode").value = "edit";
  document.getElementById("formItemId").value = item.id;
  document.getElementById("crudModalTitle").innerHTML = `
    <i data-lucide="pencil" class="w-5 h-5 text-blue-600"></i>
    <span>Edit Data: ${escapeHtml(item.name)}</span>
  `;

  // Isi data form
  document.getElementById("formSku").value = item.id;
  document.getElementById("formName").value = item.name;
  document.getElementById("formCategory").value = item.category;
  document.getElementById("formUnit").value = item.unit || config.defaultUnit;
  document.getElementById("formPrice").value = item.price;
  document.getElementById("formStock").value = item.stock;
  document.getElementById("formStatus").value = item.status;
  document.getElementById("formImageUrl").value = item.image || "";
  document.getElementById("formDescription").value = item.description || "";

  if (item.image) {
    previewImageInput(item.image);
  } else {
    document.getElementById("imagePreviewContainer").classList.add("hidden");
  }

  document.getElementById("crudModal").classList.remove("hidden");
  lucide.createIcons();
}

function closeCrudModal() {
  document.getElementById("crudModal").classList.add("hidden");
}

function handleCrudSubmit(e) {
  e.preventDefault();

  const mode = document.getElementById("formMode").value;
  const id = document.getElementById("formSku").value.trim();
  const name = document.getElementById("formName").value.trim();
  const category = document.getElementById("formCategory").value.trim();
  const unit = document.getElementById("formUnit").value.trim();
  const price = Number(document.getElementById("formPrice").value) || 0;
  const stock = Number(document.getElementById("formStock").value) || 0;
  let status = document.getElementById("formStatus").value;
  const image = document.getElementById("formImageUrl").value.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80";
  const description = document.getElementById("formDescription").value.trim();

  // Otomatis sesuaikan status jika stok 0
  if (stock === 0 && status === "Tersedia") {
    status = "Habis";
  } else if (stock > 0 && stock <= 5 && status === "Tersedia") {
    status = "Stok Menipis";
  }

  if (mode === "create") {
    // Cek duplikasi SKU
    const exists = appState.items.some(i => i.id.toLowerCase() === id.toLowerCase());
    if (exists) {
      Swal.fire({
        icon: "warning",
        title: "Kode / SKU Duplikat",
        text: `Kode "${id}" sudah digunakan oleh produk lain. Gunakan kode lain.`
      });
      return;
    }

    const newItem = { id, name, category, unit, price, stock, status, image, description };
    appState.items.unshift(newItem);

    saveItemsToStorage();
    closeCrudModal();

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Produk Berhasil Ditambahkan!",
      showConfirmButton: false,
      timer: 2000
    });
  } else {
    // Mode Edit
    const originalId = document.getElementById("formItemId").value;
    const index = appState.items.findIndex(i => i.id === originalId);

    if (index !== -1) {
      appState.items[index] = {
        ...appState.items[index],
        id,
        name,
        category,
        unit,
        price,
        stock,
        status,
        image,
        description
      };

      saveItemsToStorage();
      closeCrudModal();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Perubahan Berhasil Disimpan!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  renderApp();
}

// ==================== CRUD: DELETE ====================
function confirmDeleteItem(id) {
  const item = appState.items.find(i => i.id === id);
  if (!item) return;

  Swal.fire({
    title: "Hapus Produk Ini?",
    html: `Apakah Anda yakin ingin menghapus <strong>"${escapeHtml(item.name)}"</strong> (${item.id})? Tindakan ini tidak dapat dibatalkan.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) {
      appState.items = appState.items.filter(i => i.id !== id);
      saveItemsToStorage();
      renderApp();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Produk Berhasil Dihapus",
        showConfirmButton: false,
        timer: 2000
      });
    }
  });
}

// ==================== MODAL DETAIL POPUP ====================
function openDetailModal(id) {
  const item = appState.items.find(i => i.id === id);
  if (!item) return;

  const config = getCurrentThemeConfig();

  document.getElementById("detailImage").src = item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80";
  document.getElementById("detailCategory").textContent = item.category || "Umum";
  document.getElementById("detailTitle").textContent = item.name;
  document.getElementById("detailSku").textContent = `Kode SKU: ${item.id}`;
  document.getElementById("detailDescription").textContent = item.description || "Tidak ada deskripsi detail untuk produk ini.";
  document.getElementById("detailPrice").textContent = formatRupiah(item.price);
  document.getElementById("detailStock").textContent = `${item.stock} ${item.unit || config.defaultUnit}`;

  const statusBadge = document.getElementById("detailBadgeStatus");
  statusBadge.textContent = item.status;
  if (item.status === "Habis") {
    statusBadge.className = "absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-rose-600";
  } else if (item.status === "Stok Menipis") {
    statusBadge.className = "absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-amber-500";
  } else {
    statusBadge.className = "absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-600";
  }

  // Tombol Pesan WhatsApp
  const phone = config.whatsappNumber || "6281234567890";
  const message = encodeURIComponent(`Halo ${config.brandName}, saya tertarik untuk memesan:\n*${item.name}* (${item.id})\nHarga: ${formatRupiah(item.price)}\nApakah stok masih tersedia?`);
  document.getElementById("detailBtnWA").href = `https://wa.me/${phone}?text=${message}`;

  document.getElementById("detailModal").classList.remove("hidden");
  lucide.createIcons();
}

function closeDetailModal() {
  document.getElementById("detailModal").classList.add("hidden");
}

// ==================== PRESET THEME SWITCHER ====================
function openPresetModal() {
  document.getElementById("presetModal").classList.remove("hidden");
  lucide.createIcons();
}

function closePresetModal() {
  document.getElementById("presetModal").classList.add("hidden");
}

function applyThemePreset(presetKey) {
  if (!THEME_PRESETS[presetKey]) return;

  currentPresetKey = presetKey;
  localStorage.setItem("omni_active_preset", presetKey);

  // Muat data sampel preset tersebut
  loadPresetDefaultItems();

  // Terapkan branding baru
  applyThemeUI();

  // Reset filter dan kembali ke halaman 1
  resetFilters();
  closePresetModal();

  const presetName = THEME_PRESETS[presetKey].name;
  Swal.fire({
    icon: "success",
    title: "Tema Berhasil Diubah!",
    text: `Aplikasi sekarang menggunakan "${presetName}". Judul, warna aksen, dan data CRUD telah diperbarui secara otomatis.`
  });
}

function resetToFactoryDefault() {
  Swal.fire({
    title: "Reset Semua Data?",
    text: "Semua perubahan dan penambahan data akan dikembalikan ke data sampel awal preset.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Ya, Reset Semuanya!",
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem(getStorageKey());
      loadPresetDefaultItems();
      renderApp();
      closePresetModal();

      Swal.fire("Berhasil Direset", "Data telah dikembalikan ke sampel bawaan.", "success");
    }
  });
}

// ==================== PREVIEW IMAGE & FILE UPLOAD ====================
function previewImageInput(url) {
  const container = document.getElementById("imagePreviewContainer");
  const img = document.getElementById("imagePreview");
  if (url) {
    img.src = url;
    container.classList.remove("hidden");
  } else {
    container.classList.add("hidden");
  }
}

function handleImageFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Baca file lokal dan konversi ke Base64
  const reader = new FileReader();
  reader.onload = function(evt) {
    const base64Url = evt.target.result;
    document.getElementById("formImageUrl").value = base64Url;
    previewImageInput(base64Url);
  };
  reader.readAsDataURL(file);
}

// ==================== EXPORT TO CSV / EXCEL ====================
function exportToCSV() {
  const items = appState.items;
  if (items.length === 0) {
    Swal.fire("Data Kosong", "Tidak ada item untuk diekspor ke Excel.", "info");
    return;
  }

  const config = getCurrentThemeConfig();
  const headers = ["Kode SKU", "Nama Produk", "Kategori", "Harga Satuan", "Stok", "Satuan", "Status", "Deskripsi"];
  
  const rows = items.map(i => [
    `"${(i.id || "").replace(/"/g, '""')}"`,
    `"${(i.name || "").replace(/"/g, '""')}"`,
    `"${(i.category || "").replace(/"/g, '""')}"`,
    i.price || 0,
    i.stock || 0,
    `"${(i.unit || config.defaultUnit).replace(/"/g, '""')}"`,
    `"${(i.status || "").replace(/"/g, '""')}"`,
    `"${(i.description || "").replace(/"/g, '""')}"`
  ]);

  // Tambahkan BOM \uFEFF agar Microsoft Excel membaca format UTF-8 dengan benar
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `Laporan_Data_${config.brandName.replace(/\s+/g, "_")}_${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "File Excel/CSV Berhasil Diunduh!",
    showConfirmButton: false,
    timer: 2000
  });
}

// ==================== CETAK LAPORAN ====================
function printReport() {
  const now = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById("printDate").textContent = now.toLocaleDateString('id-ID', options);

  const prevView = appState.currentView;
  setView("table");

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      if (prevView === "catalog") setView("catalog");
    }, 500);
  }, 200);
}

// ==================== UTILITY FUNCTIONS ====================
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number || 0);
}

function getStatusBadgeHTML(status) {
  if (status === "Habis") {
    return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">Habis</span>`;
  }
  if (status === "Stok Menipis") {
    return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Stok Menipis</span>`;
  }
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Tersedia</span>`;
}

function generateSKU() {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `PRD-${randomNum}`;
}

function resetFilters() {
  appState.searchQuery = "";
  appState.filterCategory = "ALL";
  appState.filterStatus = "ALL";
  appState.sortBy = "newest";
  appState.currentPage = 1;

  document.getElementById("searchInput").value = "";
  document.getElementById("filterCategory").value = "ALL";
  document.getElementById("filterStatus").value = "ALL";
  document.getElementById("sortBy").value = "newest";

  renderApp();
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==================== DARK MODE ====================
function initDarkMode() {
  const isDark = localStorage.getItem("omni_dark_mode") === "true";
  appState.darkMode = isDark;
  applyDarkModeUI();
}

function toggleDarkMode() {
  appState.darkMode = !appState.darkMode;
  localStorage.setItem("omni_dark_mode", appState.darkMode);
  applyDarkModeUI();
}

function applyDarkModeUI() {
  const html = document.documentElement;
  const themeIcon = document.getElementById("themeIcon");

  if (appState.darkMode) {
    html.classList.add("dark");
    if (themeIcon) themeIcon.setAttribute("data-lucide", "sun");
  } else {
    html.classList.remove("dark");
    if (themeIcon) themeIcon.setAttribute("data-lucide", "moon");
  }

  lucide.createIcons();
}
