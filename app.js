/**
 * app.js - GuruSuite AI v2.0
 * Portal Terpadu Administrasi Guru Kelas, LMS Cerdas & Liquid Glass UI
 * (c) 2026 ZettBOT by Zettbos
 */

// ================= STORAGE KEYS & DEFAULTS =================
const KEYS = {
  SETTINGS: 'gurusui_settings_v2',
  CURRENT_PKG: 'gurusui_current_pkg_v2',
  CURRENT_MODUL: 'gurusui_current_modul_v2',
  STUDENTS: 'gurusui_students_v2',
  ATTENDANCE: 'gurusui_attendance_v2',
  SAVINGS: 'gurusui_savings_v2',
  CASH: 'gurusui_cash_v2',
  LMS_QUIZZES: 'gurusui_lms_quizzes_v2',
  LMS_GRADES: 'gurusui_lms_grades_v2',
  SUPABASE_CFG: 'gurusui_supabase_v2'
};

const DEFAULT_SETTINGS = {
  apiKey: '',
  schoolParent: 'PEMERINTAH KABUPATEN / KOTA',
  schoolName: 'SD NEGERI CONTOH TELADAN',
  schoolAddress: 'Jl. Pendidikan No. 123, Kel. Merdeka • Telp: (021) 1234567 • Email: sdncontoh@sekolah.sch.id',
  principalName: 'DRS. H. AHMAD RIFAI, M.Pd',
  principalNip: '19750812 200003 1 002',
  teacherName: 'SITI RAHMAWATI, S.Pd',
  teacherNip: '19880415 201101 2 004',
  city: 'Kota Contoh',
  defaultPaper: 'A4'
};

const DEFAULT_STUDENTS = [
  { id: 'S01', noAbsen: 1, nisn: '0123456789', nama: 'Achmad Dani Pratama', gender: 'L', tabungan: 45000 },
  { id: 'S02', noAbsen: 2, nisn: '0123456790', nama: 'Adzkia Zahra Kirana', gender: 'P', tabungan: 80000 },
  { id: 'S03', noAbsen: 3, nisn: '0123456791', nama: 'Bagus Satria Wibawa', gender: 'L', tabungan: 60000 },
  { id: 'S04', noAbsen: 4, nisn: '0123456792', nama: 'Cantika Putri Rahayu', gender: 'P', tabungan: 120000 },
  { id: 'S05', noAbsen: 5, nisn: '0123456793', nama: 'Dimas Anggara Putra', gender: 'L', tabungan: 35000 },
  { id: 'S06', noAbsen: 6, nisn: '0123456794', nama: 'Elysia Nur Safitri', gender: 'P', tabungan: 95000 },
  { id: 'S07', noAbsen: 7, nisn: '0123456795', nama: 'Fajar Hidayatullah', gender: 'L', tabungan: 50000 },
  { id: 'S08', noAbsen: 8, nisn: '0123456796', nama: 'Gisela Amanda Putri', gender: 'P', tabungan: 110000 }
];

const DEFAULT_CASH = [
  { id: 'K01', tanggal: '2026-11-01', uraian: 'Saldo awal kas kelas', tipe: 'masuk', nominal: 350000 },
  { id: 'K02', tanggal: '2026-11-08', uraian: 'Iuran kas mingguan siswa', tipe: 'masuk', nominal: 160000 },
  { id: 'K03', tanggal: '2026-11-12', uraian: 'Pembelian spidol & penghapus whiteboard', tipe: 'keluar', nominal: 30000 }
];

// Application State
const state = {
  activePane: 'dashboard',
  settings: { ...DEFAULT_SETTINGS },
  supabaseConfig: { url: '', key: '', connected: false },
  supabaseClient: null,
  students: [...DEFAULT_STUDENTS],
  attendance: {},
  savings: [],
  cash: [...DEFAULT_CASH],
  currentPackage: null,
  currentModul: null,
  lmsQuizzes: [],
  lmsGrades: [],
  activeStudioTab: 'naskah',
  activeSoalSubTab: 'gen',
  lmsRole: 'guru',
  cbtActiveQuiz: null,
  cbtTimerInterval: null
};

// ================= INDEXEDDB ADAPTER (OFFLINE RESILIENCE) =================
const idb = {
  async open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('GuruSuiteDB_v2', 2);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('packages')) {
          db.createStore = db.createObjectStore('packages', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('moduls')) {
          db.createObjectStore('moduls', { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  async getAllPackages() {
    try {
      const db = await this.open();
      return new Promise((res) => {
        const tx = db.transaction('packages', 'readonly');
        const req = tx.objectStore('packages').getAll();
        req.onsuccess = () => res(req.result || []);
        req.onerror = () => res([]);
      });
    } catch (e) { return []; }
  },
  async savePackage(pkg) {
    try {
      const db = await this.open();
      return new Promise((res) => {
        const tx = db.transaction('packages', 'readwrite');
        tx.objectStore('packages').put(pkg);
        tx.oncomplete = () => res(pkg);
      });
    } catch (e) { return pkg; }
  }
};

// ================= SUPABASE CLOUD ADAPTER =================
const supabaseAdapter = {
  init(url, key) {
    if (!url || !key || typeof window.supabase === 'undefined') {
      state.supabaseClient = null;
      state.supabaseConfig.connected = false;
      return false;
    }
    try {
      state.supabaseClient = window.supabase.createClient(url, key);
      state.supabaseConfig.url = url;
      state.supabaseConfig.key = key;
      state.supabaseConfig.connected = true;
      return true;
    } catch (err) {
      console.warn('Supabase client error', err);
      state.supabaseClient = null;
      state.supabaseConfig.connected = false;
      return false;
    }
  },

  async testConnection() {
    if (!state.supabaseClient) return false;
    try {
      // Light query to verify connection
      const { data, error } = await state.supabaseClient.from('students').select('id').limit(1);
      return !error;
    } catch (err) {
      return false;
    }
  }
};

// ================= MAIN CONTROLLER =================
const app = {
  async init() {
    this.loadStateFromStorage();
    this.initSupabaseIfConfigured();
    this.updateKopDisplay();
    this.renderDashboardStats();
    this.renderStudentTable();
    this.renderAttendanceSheet();
    this.renderSavingsTable();
    this.renderCashTable();
    this.renderNotificationList();

    // Load initial sample Modul Ajar and Soal if empty
    if (!state.currentModul) {
      this.loadPresetModul(false);
    }
    if (!state.currentPackage) {
      this.loadPreset('ipas4', false);
    }

    this.renderModulPreview();
    this.renderStudio();
    this.populateLMSQuizDropdown();
  },

  // ---------- ROUTING & NAVIGATION ----------
  navigate(paneId) {
    state.activePane = paneId;

    // Panes
    const allPanes = [
      'dashboard', 'siswa', 'kelas', 'supabase', 
      'absensi', 'modul', 'soal', 'lms', 
      'tabungan', 'kas', 'notifikasi'
    ];

    allPanes.forEach(p => {
      const el = document.getElementById('pane-' + p);
      if (el) el.classList.add('hidden');
      
      const btn = document.getElementById('menu-btn-' + p);
      if (btn) {
        btn.classList.remove('active-blue', 'active-emerald', 'active-dashed');
      }
    });

    const activeEl = document.getElementById('pane-' + paneId);
    if (activeEl) activeEl.classList.remove('hidden');

    const activeBtn = document.getElementById('menu-btn-' + paneId);
    if (activeBtn) {
      if (paneId === 'dashboard') {
        activeBtn.classList.add('active-blue');
      } else if (paneId === 'supabase') {
        activeBtn.classList.add('active-emerald');
      } else if (activeBtn.classList.contains('dashed-pill')) {
        activeBtn.classList.add('active-dashed');
      } else {
        activeBtn.classList.add('active-blue');
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh contents
    if (paneId === 'dashboard') this.renderDashboardStats();
    if (paneId === 'siswa') this.renderStudentTable();
    if (paneId === 'absensi') this.renderAttendanceSheet();
    if (paneId === 'modul') this.renderModulPreview();
    if (paneId === 'soal') this.renderStudio();
    if (paneId === 'lms') this.renderLMSView();
    if (paneId === 'tabungan') this.renderSavingsTable();
    if (paneId === 'kas') this.renderCashTable();

    // Close mobile drawer if open
    const sb = document.getElementById('main-sidebar');
    if (window.innerWidth < 768 && sb) {
      sb.classList.add('hidden');
    }
  },

  toggleMobileSidebar() {
    const sb = document.getElementById('main-sidebar');
    sb.classList.toggle('hidden');
  },

  notify(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-emerald-800 text-white' : type === 'error' ? 'bg-rose-800 text-white' : 'bg-slate-800 text-white';
    toast.className = 'p-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 ' + bg;
    toast.innerHTML = '<span>' + (type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ') + '</span><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
  },

  // ---------- LOCAL / CLOUD STORAGE ----------
  loadStateFromStorage() {
    try {
      const s = localStorage.getItem(KEYS.SETTINGS);
      if (s) state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(s) };

      const std = localStorage.getItem(KEYS.STUDENTS);
      if (std) state.students = JSON.parse(std);

      const cash = localStorage.getItem(KEYS.CASH);
      if (cash) state.cash = JSON.parse(cash);

      const pkg = localStorage.getItem(KEYS.CURRENT_PKG);
      if (pkg) state.currentPackage = JSON.parse(pkg);

      const mod = localStorage.getItem(KEYS.CURRENT_MODUL);
      if (mod) state.currentModul = JSON.parse(mod);

      const sb = localStorage.getItem(KEYS.SUPABASE_CFG);
      if (sb) state.supabaseConfig = JSON.parse(sb);

      const lmsG = localStorage.getItem(KEYS.LMS_GRADES);
      if (lmsG) state.lmsGrades = JSON.parse(lmsG);
    } catch (e) {
      console.warn('Storage parse warning', e);
    }
  },

  initSupabaseIfConfigured() {
    const cfg = state.supabaseConfig;
    if (cfg && cfg.url && cfg.key) {
      const ok = supabaseAdapter.init(cfg.url, cfg.key);
      this.updateSupabaseBadge(ok);
    }
  },

  updateSupabaseBadge(isConnected) {
    const badge = document.getElementById('supabase-badge-status');
    const ind = document.getElementById('cloud-status-indicator');
    if (isConnected) {
      if (badge) {
        badge.className = 'text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg';
        badge.textContent = '⚡ Connected to Supabase';
      }
      if (ind) {
        ind.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-pulse';
        ind.title = 'Status Supabase: Terhubung & Realtime';
      }
    } else {
      if (badge) {
        badge.className = 'text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg';
        badge.textContent = 'Offline Mode (Local Storage)';
      }
      if (ind) {
        ind.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs';
        ind.title = 'Status Supabase: Mode Offline';
      }
    }
  },

  async connectSupabase() {
    const url = document.getElementById('sb-url-input').value.trim();
    const key = document.getElementById('sb-key-input').value.trim();

    if (!url || !key) {
      alert('Mohon masukkan Supabase Project URL dan Anon Public Key terlebih dahulu.');
      return;
    }

    const ok = supabaseAdapter.init(url, key);
    if (ok) {
      state.supabaseConfig = { url, key, connected: true };
      localStorage.setItem(KEYS.SUPABASE_CFG, JSON.stringify(state.supabaseConfig));
      this.updateSupabaseBadge(true);
      this.notify('Berhasil menghubungkan database Supabase Cloud!');
    } else {
      alert('Gagal menyambungkan ke Supabase. Periksa kembali URL dan Public Key Anda.');
    }
  },

  disconnectSupabase() {
    state.supabaseConfig = { url: '', key: '', connected: false };
    localStorage.removeItem(KEYS.SUPABASE_CFG);
    state.supabaseClient = null;
    this.updateSupabaseBadge(false);
    this.notify('Kembali ke Mode Offline Lokal (Data tersimpan di browser).');
  },

  // ---------- DASHBOARD STATS ----------
  renderDashboardStats() {
    document.getElementById('dash-stat-students').textContent = state.students.length;
    document.getElementById('dash-stat-modul').textContent = state.currentModul ? '1 Siap' : '0';
    document.getElementById('dash-stat-soal').textContent = state.currentPackage ? '1 Aktif' : '0';
  },

  // ---------- 1. DATA SISWA & GURU ----------
  renderStudentTable() {
    const tbody = document.getElementById('student-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.students.forEach((std, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/70 transition-colors';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-slate-800">${std.noAbsen}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${std.nisn || '-'}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${std.nama}</td>
        <td class="py-2.5 px-3 font-bold ${std.gender === 'L' ? 'text-blue-600' : 'text-pink-600'}">${std.gender}</td>
        <td class="py-2.5 px-3 font-mono text-emerald-800 font-semibold">Rp ${(std.tabungan || 0).toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right">
          <button onclick="app.deleteStudent(${idx})" class="text-rose-500 hover:text-rose-700 font-bold text-xs p-1">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  openAddStudentModal() {
    const nama = prompt('Masukkan Nama Lengkap Siswa Baru:');
    if (!nama) return;
    const gender = prompt('Jenis Kelamin (L / P):', 'L');
    const nisn = prompt('Nomor NISN Siswa (opsional):', '0123' + Math.floor(100000 + Math.random() * 900000));
    const nextAbsen = state.students.length + 1;

    state.students.push({
      id: 'S' + String(nextAbsen).padStart(2, '0'),
      noAbsen: nextAbsen,
      nisn: nisn || '-',
      nama: nama.trim(),
      gender: (gender || 'L').toUpperCase() === 'P' ? 'P' : 'L',
      tabungan: 0
    });

    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(state.students));
    this.renderStudentTable();
    this.renderDashboardStats();
    this.notify('Siswa ' + nama + ' berhasil ditambahkan.');
  },

  deleteStudent(index) {
    if (confirm('Hapus data siswa ini?')) {
      state.students.splice(index, 1);
      // re-order absen
      state.students.forEach((s, i) => s.noAbsen = i + 1);
      localStorage.setItem(KEYS.STUDENTS, JSON.stringify(state.students));
      this.renderStudentTable();
      this.renderDashboardStats();
      this.notify('Data siswa telah dihapus.');
    }
  },

  saveClassConfig() {
    this.notify('Konfigurasi kelas & tahun ajaran berhasil diperbarui.');
  },

  // ---------- 2. ABSENSI HARIAN ----------
  renderAttendanceSheet() {
    const tbody = document.getElementById('attendance-table-tbody');
    const dateInput = document.getElementById('absensi-date-picker');
    if (!dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
    const curDate = dateInput.value;
    tbody.innerHTML = '';

    state.students.forEach((s, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/70';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold">${s.noAbsen}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${s.nama}</td>
        <td class="py-2.5 px-3 text-center">
          <div class="inline-flex items-center gap-3">
            <label class="flex items-center gap-1 text-[11px] font-bold text-emerald-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="H" checked class="text-emerald-600 focus:ring-emerald-500"> H (Hadir)
            </label>
            <label class="flex items-center gap-1 text-[11px] font-bold text-blue-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="S" class="text-blue-600 focus:ring-blue-500"> S (Sakit)
            </label>
            <label class="flex items-center gap-1 text-[11px] font-bold text-amber-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="I" class="text-amber-600 focus:ring-amber-500"> I (Izin)
            </label>
            <label class="flex items-center gap-1 text-[11px] font-bold text-rose-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="A" class="text-rose-600 focus:ring-rose-500"> A (Alpa)
            </label>
          </div>
        </td>
        <td class="py-2.5 px-3">
          <input type="text" placeholder="Keterangan..." class="w-full px-2 py-1 rounded border border-slate-300 text-xs bg-white">
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  saveAttendance() {
    this.notify('Presensi siswa tanggal ' + document.getElementById('absensi-date-picker').value + ' berhasil disimpan!');
  },

  // ---------- 3. GENERATOR MODUL AJAR (RPP MERDEKA) ----------
  loadPresetModul(doSwitch = true) {
    state.currentModul = {
      id: 'MODUL-202611-001',
      title: 'Modul Ajar IPAS - Proses Fotosintesis & Ekosistem',
      subject: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
      fase: 'Fase B (Kelas IV SD)',
      model: 'Problem Based Learning (PBL)',
      time: '2 Pertemuan (4 x 35 Menit)',
      components: {
        identitas: {
          penyusun: state.settings.teacherName || 'Siti Rahmawati, S.Pd',
          instansi: state.settings.schoolName || 'SD Negeri Contoh Teladan',
          jenjang: 'SD',
          faseKelas: 'B / Kelas 4',
          alokasiWaktu: '4 JP (2 x Pertemuan)'
        },
        profilPancasila: [
          'Beriman, Bertakwa kepada Tuhan YME dan Berakhlak Mulia (menjaga kelestarian alam ciptaan Tuhan)',
          'Bergotong Royong (berdiskusi kelompok dalam mengamati tumbuhan)',
          'Bernalar Kritis (menganalisis kebutuhan fotosintesis dan hasil reaksinya)'
        ],
        saranaPrasarana: 'Tumbuhan berdaun hijau di pot, gelas beker/kaca, air, kardus penutup daun, proyektor / kartu gambar.',
        tujuanPembelajaran: [
          'Peserta didik dapat mengidentifikasi bagian daun dan pigmen klorofil yang berperan dalam fotosintesis.',
          'Peserta didik dapat mendeskripsikan 3 bahan utama proses fotosintesis (cahaya, air, CO2) dan hasilnya (oksigen & karbohidrat).',
          'Peserta didik dapat menyimpulkan pentingnya fotosintesis bagi ketersediaan oksigen makhluk hidup di bumi.'
        ],
        pemahamanBermakna: 'Tumbuhan hijau adalah pabrik makanan alami bagi seluruh makhluk hidup di bumi. Tanpa tumbuhan yang berfotosintesis, tidak ada pasokan oksigen dan makanan bagi hewan dan manusia.',
        pertanyaanPemantik: [
          'Dari mana tumbuhan mendapatkan makanan untuk tumbuh tinggi dan berbunga?',
          'Apakah tumbuhan bisa membuat makanannya sendiri di dalam ruangan yang gelap gulita?'
        ],
        langkahKegiatan: [
          {
            pertemuan: 1,
            pendahuluan: '1. Guru menyapa peserta didik, berdoa bersama, dan mengecek kehadiran.\n2. Apersepsi: Guru menunjukkan sebatang tanaman layu di tempat gelap vs tanaman segar di halaman sekolah.\n3. Guru menyampaikan tujuan pembelajaran dan pertanyaan pemantik.',
            inti: '1. Orientasi Masalah: Siswa mengamati video/animasi singkat tentang stomata dan zat hijau daun.\n2. Mengorganisasi Siswa: Siswa dibagi menjadi kelompok beranggotakan 4-5 anak dan menerima LKPD 1.\n3. Penyelidikan Mandiri: Siswa mengamati daun di bawah sinar matahari dan mencatat bagian-bagian daun.\n4. Mengembangkan Hasil: Setiap kelompok menuliskan persamaan fotosintesis sederhana pada poster mini.\n5. Evaluasi: Guru memberikan klarifikasi konsep dan apresiasi terhadap presentasi kelompok.',
            penutup: '1. Siswa bersama guru menyimpulkan inti pembelajaran hari ini.\n2. Refleksi pembelajaran: Apa hal baru yang paling menyenangkan hari ini?\n3. Doa penutup dan salam.'
          }
        ],
        asesmen: {
          diagnostik: 'Tanya jawab lisan mengenai fungsi daun sebelum pembelajaran.',
          formatif: 'Penilaian unjuk kerja saat berdiskusi kelompok dan pengisian lembar LKPD 1.',
          sumatif: 'Tes tertulis 5 butir soal pilihan ganda dan 2 butir uraian pemahaman konsep.'
        },
        lkpd: {
          judul: 'LEMBAR KERJA PESERTA DIDIK (LKPD) 1: Menyelidiki Dapur Ajaib Daun Hijau',
          petunjuk: '1. Duduklah bersama kelompokmu.\n2. Amati daun tanaman yang dibawa ke dalam kelas.\n3. Diskusikan dan jawablah pertanyaan pengamatan di bawah ini.',
          soalLKPD: [
            '1. Apakah warna daun yang kalian amati? Disebut apakah zat hijau daun tersebut?',
            '2. Sebutkan 3 hal penting yang diserap oleh daun untuk memasak makanannya sendiri!',
            '3. Apa manfaat gas oksigen yang dihasilkan tumbuhan bagi diri kalian saat bernapas?'
          ]
        }
      }
    };

    localStorage.setItem(KEYS.CURRENT_MODUL, JSON.stringify(state.currentModul));
    this.renderModulPreview();
    if (doSwitch) {
      this.notify('Contoh Modul Ajar IPAS berhasil dimuat.');
    }
  },

  async generateModulAjar() {
    const subject = document.getElementById('modul-subject').value.trim() || 'Mata Pelajaran';
    const fase = document.getElementById('modul-fase').value.trim() || 'Fase B';
    const model = document.getElementById('modul-model').value;
    const time = document.getElementById('modul-time').value.trim() || '2 x 35 Menit';
    const topic = document.getElementById('modul-topic').value.trim();

    if (!topic) {
      alert('Mohon masukkan Topik Materi & Capaian Pembelajaran terlebih dahulu.');
      document.getElementById('modul-topic').focus();
      return;
    }

    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');

    // Simulate AI generation or API integration
    setTimeout(() => {
      state.currentModul = {
        id: 'MODUL-' + new Date().getFullYear() + String(new Date().getMonth()+1).padStart(2, '0') + '-002',
        title: `Modul Ajar ${subject} - ${topic.slice(0, 35)}...`,
        subject: subject,
        fase: fase,
        model: model,
        time: time,
        components: {
          identitas: {
            penyusun: state.settings.teacherName || 'Guru Pengampu',
            instansi: state.settings.schoolName || 'Satuan Pendidikan',
            jenjang: 'SD/SMP',
            faseKelas: fase,
            alokasiWaktu: time
          },
          profilPancasila: [
            'Bernalar Kritis (mengidentifikasi dan mengolah informasi terkait ' + topic + ')',
            'Mandiri (bertanggung jawab atas proses dan hasil belajar)',
            'Bergotong Royong (aktif bekerja sama dalam penugasan kelompok)'
          ],
          saranaPrasarana: 'Buku Siswa, LKPD terstruktur, media visual / bahan ajar kontekstual.',
          tujuanPembelajaran: [
            'Peserta didik dapat memahami konsep dasar mengenai ' + topic + ' secara komprehensif.',
            'Peserta didik mampu mengaplikasikan pemahaman konsep dalam menyelesaikan masalah nyata.',
            'Peserta didik dapat mempresentasikan hasil analisis kelompok secara runtut dan percaya diri.'
          ],
          pemahamanBermakna: 'Penguasaan materi ' + topic + ' membantu peserta didik memahami keterkaitan konsep pembelajaran dengan situasi di lingkungan sekitarnya.',
          pertanyaanPemantik: [
            'Mengapa kita penting mempelajari ' + topic + ' dalam kehidupan sehari-hari?',
            'Apa yang akan terjadi jika konsep ini tidak diterapkan secara benar?'
          ],
          langkahKegiatan: [
            {
              pertemuan: 1,
              pendahuluan: '1. Pembukaan: Salam, doa, dan apersepsi mengaitkan materi dengan pengalaman siswa.\n2. Penyampaian tujuan pembelajaran dan motivasi belajar.',
              inti: '1. Orientasi Siswa: Pengenalan materi melalui studi kasus pemantik.\n2. Pembagian LKPD dan panduan kerja kelompok berbasis model ' + model + '.\n3. Penyelidikan mandiri dan diskusi terbimbing bersama guru.\n4. Presentasi karya kelompok dan saling memberikan tanggapan konstruktif.',
              penutup: '1. Guru dan siswa merangkum poin-poin kunci pembelajaran.\n2. Refleksi dan tindak lanjut penugasan mandiri.\n3. Doa penutup pembelajaran.'
            }
          ],
          asesmen: {
            diagnostik: 'Asesmen awal berupa pre-test pertanyaan pemantik.',
            formatif: 'Observasi keaktifan diskusi dan ketepatan pengisian LKPD kelompok.',
            sumatif: 'Penilaian naskah asesmen akhir pemahaman konsep.'
          },
          lkpd: {
            judul: 'LEMBAR KERJA PESERTA DIDIK (LKPD) - ' + topic.slice(0, 40),
            petunjuk: '1. Berdoalah sebelum mengerjakan.\n2. Diskusikan permasalahan berikut bersama kelompokmu.\n3. Tuliskan jawaban hasil diskusi pada kolom yang disediakan.',
            soalLKPD: [
              '1. Berdasarkan pengamatan materi, jelaskan konsep utama terkait ' + topic + '!',
              '2. Tuliskan 2 contoh nyata penerapan konsep tersebut di sekitar lingkunganmu!',
              '3. Buatlah kesimpulan bersama kelompok mengenai solusi yang paling efektif!'
            ]
          }
        }
      };

      localStorage.setItem(KEYS.CURRENT_MODUL, JSON.stringify(state.currentModul));
      overlay.classList.add('hidden');
      this.renderModulPreview();
      this.notify('✨ Modul Ajar Kurikulum Merdeka berhasil digenerate lengkap dengan LKPD!');
    }, 900);
  },

  renderModulPreview() {
    const m = state.currentModul;
    if (!m) return;

    document.getElementById('modul-preview-title').textContent = m.title;
    const container = document.getElementById('rendered-modul-content');
    const c = m.components || {};

    let html = `
      <div class="border-b-2 border-slate-900 pb-3 text-center mb-6">
        <h3 class="font-extrabold text-base sm:text-lg uppercase text-slate-950 font-serif">MODUL AJAR KURIKULUM MERDEKA</h3>
        <h4 class="font-bold text-sm sm:text-base text-slate-900 font-serif uppercase">${m.subject} - ${m.fase}</h4>
        <p class="text-xs text-slate-600">${state.settings.schoolName || 'Satuan Pendidikan'} • Tahun Ajaran 2026/2027</p>
      </div>

      <!-- I. INFORMASI UMUM -->
      <div class="space-y-3">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">I. INFORMASI UMUM</h4>
        <table class="w-full text-xs" style="border: none;">
          <tr><td width="30%"><b>Nama Penyusun</b></td><td>: ${c.identitas?.penyusun || '-'}</td></tr>
          <tr><td><b>Satuan Pendidikan</b></td><td>: ${c.identitas?.instansi || '-'}</td></tr>
          <tr><td><b>Fase / Kelas</b></td><td>: ${c.identitas?.faseKelas || '-'}</td></tr>
          <tr><td><b>Alokasi Waktu</b></td><td>: ${c.identitas?.alokasiWaktu || '-'}</td></tr>
          <tr><td><b>Model Pembelajaran</b></td><td>: ${m.model || 'Problem Based Learning'}</td></tr>
        </table>
        
        <div class="pt-2 text-xs">
          <b>Profil Pelajar Pancasila:</b>
          <ul class="list-disc list-inside space-y-0.5 mt-1 text-slate-800">
            ${(c.profilPancasila || []).map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- II. KOMPONEN INTI -->
      <div class="space-y-3 pt-4">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">II. KOMPONEN INTI</h4>
        
        <div class="text-xs space-y-2">
          <b>A. Tujuan Pembelajaran (TP):</b>
          <ol class="list-decimal list-inside space-y-0.5 text-slate-800">
            ${(c.tujuanPembelajaran || []).map(tp => `<li>${tp}</li>`).join('')}
          </ol>
        </div>

        <div class="text-xs">
          <b>B. Pemahaman Bermakna:</b>
          <p class="text-slate-800 mt-0.5 bg-slate-50 p-2 rounded border border-slate-200">${c.pemahamanBermakna || '-'}</p>
        </div>

        <div class="text-xs">
          <b>C. Pertanyaan Pemantik:</b>
          <ul class="list-disc list-inside space-y-0.5 mt-0.5 text-slate-800">
            ${(c.pertanyaanPemantik || []).map(q => `<li>${q}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- III. KEGIATAN PEMBELAJARAN -->
      <div class="space-y-3 pt-4">
        <h4 class="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">III. LANGKAH-LANGKAH KEGIATAN PEMBELAJARAN</h4>
        ${(c.langkahKegiatan || []).map(lk => `
          <div class="border border-slate-300 rounded p-3 space-y-2 bg-slate-50/50 text-xs">
            <h5 class="font-bold text-slate-900 uppercase">Pertemuan Ke-${lk.pertemuan}</h5>
            <div><b>1. Kegiatan Pendahuluan:</b><p class="whitespace-pre-line text-slate-800 mt-0.5">${lk.pendahuluan}</p></div>
            <div><b>2. Kegiatan Inti:</b><p class="whitespace-pre-line text-slate-800 mt-0.5">${lk.inti}</p></div>
            <div><b>3. Kegiatan Penutup:</b><p class="whitespace-pre-line text-slate-800 mt-0.5">${lk.penutup}</p></div>
          </div>
        `).join('')}
      </div>

      <!-- IV. LAMPIRAN LKPD -->
      <div class="space-y-3 pt-6 page-break-before">
        <div class="border-2 border-slate-900 rounded p-4 space-y-3 bg-white">
          <div class="border-b border-slate-900 pb-2 text-center">
            <h4 class="font-bold text-sm uppercase text-slate-950 font-serif">${c.lkpd?.judul || 'LEMBAR KERJA PESERTA DIDIK (LKPD)'}</h4>
            <div class="grid grid-cols-2 text-xs text-left mt-2 border-t border-slate-300 pt-1">
              <div>Nama Kelompok / Siswa: ............................................</div>
              <div>Kelas / No. Absen: ....................</div>
            </div>
          </div>
          <div class="text-xs space-y-2">
            <b>Petunjuk Belajar:</b>
            <p class="whitespace-pre-line text-slate-700">${c.lkpd?.petunjuk || ''}</p>
          </div>
          <div class="space-y-4 pt-2 text-xs">
            ${(c.lkpd?.soalLKPD || []).map(soal => `
              <div class="space-y-1">
                <p class="font-bold text-slate-900">${soal}</p>
                <div class="border-b border-dotted border-slate-400 h-6"></div>
                <div class="border-b border-dotted border-slate-400 h-6"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  exportModulWord() {
    const m = state.currentModul;
    if (!m) return;

    const htmlContent = document.getElementById('rendered-modul-content').innerHTML;
    const wordBlob = new Blob([
      '\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:"Times New Roman",serif;font-size:11pt;line-height:1.4;}table{border-collapse:collapse;width:100%;}td,th{border:1px solid #000;padding:4px;}</style></head><body>' + htmlContent + '</body></html>'
    ], { type: 'application/msword' });

    const url = URL.createObjectURL(wordBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (m.title || 'Modul_Ajar').replace(/[^a-zA-Z0-9_\-]/g, '_') + '.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    this.notify('Modul Ajar Word (.doc) berhasil diunduh.');
  },

  // ---------- 4. BANK SOAL & STUDIO 4-IN-1 ----------
  switchSoalSubTab(tabKey) {
    state.activeSoalSubTab = tabKey;
    ['gen', 'std', 'bnk'].forEach(t => {
      const pane = document.getElementById('subpane-soal-' + t);
      const btn = document.getElementById('soal-tab-' + t);
      if (t === tabKey) {
        pane.classList.remove('hidden');
        btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white shadow-2xs';
      } else {
        pane.classList.add('hidden');
        btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100';
      }
    });

    if (tabKey === 'std') this.renderStudio();
    if (tabKey === 'bnk') this.renderBankList();
  },

  switchStudioTab(tabName) {
    state.activeStudioTab = tabName;
    ['naskah', 'kisi', 'kartu', 'kunci'].forEach(t => {
      const btn = document.getElementById('tab-btn-' + t);
      const pane = document.getElementById('studio-pane-' + t);
      if (t === tabName) {
        btn.className = 'studio-tab active px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 border-emerald-600 text-emerald-800 bg-white';
        pane.classList.remove('hidden');
      } else {
        btn.className = 'studio-tab px-3.5 py-2 rounded-t-xl text-xs font-bold text-slate-600 hover:text-slate-900';
        pane.classList.add('hidden');
      }
    });
  },

  loadPreset(type, doSwitch = true) {
    if (type === 'ipas4') {
      state.currentPackage = this.createPresetDataIPAS4();
    } else if (type === 'mtk8') {
      state.currentPackage = this.createPresetDataMTK8();
    } else if (type === 'bind10') {
      state.currentPackage = this.createPresetDataBInd10();
    }
    localStorage.setItem(KEYS.CURRENT_PKG, JSON.stringify(state.currentPackage));
    if (doSwitch) {
      this.switchSoalSubTab('std');
      this.notify('Paket naskah ' + type.toUpperCase() + ' dimuat ke Studio.');
    }
  },

  renderStudio() {
    const pkg = state.currentPackage;
    if (!pkg) return;

    document.getElementById('studio-package-id').textContent = pkg.id;
    document.getElementById('studio-package-title').textContent = pkg.title;
    document.getElementById('studio-package-meta').textContent = `${pkg.subject} • ${pkg.grade} • ${pkg.questions.length} Butir Soal`;
    document.getElementById('naskah-meta-subject').textContent = pkg.subject;
    document.getElementById('naskah-meta-grade').textContent = pkg.grade;

    this.renderNaskah(pkg);
    this.renderKisi(pkg);
    this.renderKartu(pkg);
    this.renderKunci(pkg);
  },

  renderNaskah(pkg) {
    const c = document.getElementById('rendered-naskah-container');
    c.innerHTML = '';
    const qList = pkg.questions || [];

    let html = '';
    const pgs = qList.filter(q => q.type === 'pg');
    const isians = qList.filter(q => q.type === 'isian');
    const uraians = qList.filter(q => q.type === 'uraian');

    if (pgs.length > 0) {
      html += `<div class="space-y-3"><h5 class="font-bold text-xs uppercase font-serif border-b border-slate-900 pb-1">I. Pilihan Ganda</h5>`;
      pgs.forEach(q => {
        html += `
          <div class="text-xs space-y-1.5 avoid-break-inside">
            <p><b>${q.number}.</b> ${q.questionText}</p>
            <div class="grid grid-cols-2 gap-1 pl-4">
              ${(q.options || []).map(opt => `<div>${opt}</div>`).join('')}
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (isians.length > 0) {
      html += `<div class="space-y-3 pt-3"><h5 class="font-bold text-xs uppercase font-serif border-b border-slate-900 pb-1">II. Isian Singkat</h5>`;
      isians.forEach(q => {
        html += `<div class="text-xs avoid-break-inside"><b>${q.number}.</b> ${q.questionText}</div>`;
      });
      html += `</div>`;
    }

    if (uraians.length > 0) {
      html += `<div class="space-y-3 pt-3"><h5 class="font-bold text-xs uppercase font-serif border-b border-slate-900 pb-1">III. Uraian</h5>`;
      uraians.forEach(q => {
        html += `
          <div class="text-xs space-y-1 avoid-break-inside">
            <p><b>${q.number}.</b> ${q.questionText}</p>
            <div class="border-b border-dotted border-slate-400 h-6"></div>
          </div>
        `;
      });
      html += `</div>`;
    }

    c.innerHTML = html;
  },

  renderKisi(pkg) {
    const tbody = document.getElementById('rendered-kisi-tbody');
    tbody.innerHTML = '';
    (pkg.questions || []).forEach((q, idx) => {
      tbody.innerHTML += `
        <tr class="border-b border-slate-400 text-center">
          <td class="border border-slate-900 p-1">${idx + 1}</td>
          <td class="border border-slate-900 p-1 text-left">${q.competency || pkg.subject}</td>
          <td class="border border-slate-900 p-1 text-left">${q.material || '-'}</td>
          <td class="border border-slate-900 p-1 text-left">${q.indicator || '-'}</td>
          <td class="border border-slate-900 p-1">${q.cognitiveLevel || 'L2'}</td>
          <td class="border border-slate-900 p-1 uppercase">${q.type}</td>
          <td class="border border-slate-900 p-1 font-bold">${q.number}</td>
          <td class="border border-slate-900 p-1">${q.scoreWeight || 1}</td>
        </tr>
      `;
    });
  },

  renderKartu(pkg) {
    const c = document.getElementById('rendered-kartu-container');
    c.innerHTML = '';
    (pkg.questions || []).forEach(q => {
      c.innerHTML += `
        <div class="border border-slate-900 rounded p-3 text-xs space-y-1.5 avoid-break-inside bg-white">
          <div class="flex items-center justify-between border-b pb-1 font-bold">
            <span>Kartu Soal No: ${q.number}</span>
            <span>Bentuk: ${q.type.toUpperCase()} | Level: ${q.cognitiveLevel || 'L2'}</span>
          </div>
          <p><b>Materi:</b> ${q.material || '-'}</p>
          <p><b>Indikator:</b> ${q.indicator || '-'}</p>
          <p class="pt-1"><b>Butir Soal:</b> ${q.questionText}</p>
          <div class="bg-emerald-50 p-2 rounded border border-emerald-200 mt-1">
            <b>Kunci Jawaban:</b> ${q.correctAnswer || '-'}
          </div>
        </div>
      `;
    });
  },

  renderKunci(pkg) {
    const c = document.getElementById('rendered-kunci-container');
    c.innerHTML = `
      <table class="w-full text-left text-xs border border-slate-900 border-collapse">
        <thead>
          <tr class="bg-slate-100 font-bold border-b border-slate-900 text-center">
            <th class="border border-slate-900 p-1.5 w-12">No</th>
            <th class="border border-slate-900 p-1.5 w-24">Bentuk</th>
            <th class="border border-slate-900 p-1.5">Kunci Jawaban</th>
            <th class="border border-slate-900 p-1.5 w-16">Bobot</th>
          </tr>
        </thead>
        <tbody>
          ${(pkg.questions || []).map(q => `
            <tr>
              <td class="border border-slate-900 p-1.5 text-center font-bold">${q.number}</td>
              <td class="border border-slate-900 p-1.5 text-center uppercase">${q.type}</td>
              <td class="border border-slate-900 p-1.5 font-bold text-emerald-950">${q.correctAnswer}</td>
              <td class="border border-slate-900 p-1.5 text-center">${q.scoreWeight || 1}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  async saveCurrentPackageToBank() {
    if (!state.currentPackage) return;
    await idb.savePackage(state.currentPackage);
    this.notify('Paket naskah ' + state.currentPackage.id + ' disimpan ke Bank Soal!');
    this.populateLMSQuizDropdown();
  },

  async renderBankList() {
    const c = document.getElementById('bank-grid-container');
    const all = await idb.getAllPackages();
    c.innerHTML = '';
    all.forEach(item => {
      c.innerHTML += `
        <div class="glass-panel p-4 space-y-2">
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-mono font-bold">${item.id}</span>
            <span class="text-slate-400">${item.questions.length} Soal</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900">${item.title}</h4>
          <p class="text-xs text-slate-500">${item.subject} • ${item.grade}</p>
          <button onclick="app.loadPackageFromBank('${item.id}')" class="w-full py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
            Buka di Studio
          </button>
        </div>
      `;
    });
  },

  async loadPackageFromBank(id) {
    const all = await idb.getAllPackages();
    const found = all.find(x => x.id === id);
    if (found) {
      state.currentPackage = found;
      this.switchSoalSubTab('std');
      this.notify('Paket ' + id + ' dimuat.');
    }
  },

  exportWord() {
    if (!state.currentPackage) return;
    const naskahHtml = document.getElementById('rendered-naskah-container').innerHTML;
    const blob = new Blob([
      '\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"></head><body>' + naskahHtml + '</body></html>'
    ], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (state.currentPackage.title || 'Naskah_Soal').replace(/[^a-zA-Z0-9_\-]/g, '_') + '.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.notify('Dokumen Word (.doc) berhasil diunduh.');
  },

  createPresetDataIPAS4() {
    return {
      id: 'SOAL-202611-001',
      title: 'Asesmen Sumatif Akhir Semester (SAS) 1 - IPAS',
      subject: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
      grade: 'Kelas 4 (Fase B)',
      curriculum: 'Kurikulum Merdeka',
      questions: [
        {
          number: 1, type: 'pg', questionText: 'Organ tumbuhan yang berfungsi menyerap air dan unsur hara dari dalam tanah adalah...',
          options: ['A. Akar', 'B. Batang', 'C. Daun', 'D. Bunga'], correctAnswer: 'A', material: 'Bagian Tubuh Tumbuhan', indicator: 'Menentukan fungsi akar.', cognitiveLevel: 'L1 (C1)', scoreWeight: 1
        },
        {
          number: 2, type: 'pg', questionText: 'Zat hijau daun penangkap cahaya saat fotosintesis disebut...',
          options: ['A. Stomata', 'B. Klorofil', 'C. Xilem', 'D. Floem'], correctAnswer: 'B', material: 'Fotosintesis', indicator: 'Menyebutkan zat hijau daun.', cognitiveLevel: 'L1 (C1)', scoreWeight: 1
        },
        {
          number: 3, type: 'isian', questionText: 'Gas yang dihasilkan tumbuhan saat fotosintesis dan dihirup manusia adalah ........................',
          options: [], correctAnswer: 'Oksigen (O2)', material: 'Hasil Fotosintesis', indicator: 'Menyebutkan gas hasil fotosintesis.', cognitiveLevel: 'L2 (C3)', scoreWeight: 2
        },
        {
          number: 4, type: 'uraian', questionText: 'Jelaskan 3 bahan penting yang diperlukan tumbuhan untuk fotosintesis!',
          options: [], correctAnswer: 'Air, Karbon dioksida, dan Cahaya matahari.', material: 'Fotosintesis', indicator: 'Menguraikan 3 bahan fotosintesis.', cognitiveLevel: 'L3 (C4)', scoreWeight: 4
        }
      ]
    };
  },

  createPresetDataMTK8() {
    return {
      id: 'SOAL-202611-002',
      title: 'Penilaian Tengah Semester - Matematika Pythagoras',
      subject: 'Matematika', grade: 'Kelas 8 (Fase D)', curriculum: 'Kurikulum Merdeka',
      questions: [
        { number: 1, type: 'pg', questionText: 'Pada segitiga siku-siku dengan sisi 6 cm dan 8 cm, panjang sisi miringnya adalah...', options: ['A. 10 cm', 'B. 12 cm', 'C. 14 cm', 'D. 15 cm'], correctAnswer: 'A', scoreWeight: 1 },
        { number: 2, type: 'isian', questionText: 'Tripel pythagoras kelipatan dari 3, 4, adalah ........................', options: [], correctAnswer: '5', scoreWeight: 2 }
      ]
    };
  },

  createPresetDataBInd10() {
    return {
      id: 'SOAL-202611-003',
      title: 'Asesmen Teks Negosiasi - Bahasa Indonesia',
      subject: 'Bahasa Indonesia', grade: 'Kelas 10 (Fase E)', curriculum: 'Kurikulum Merdeka',
      questions: [
        { number: 1, type: 'pg', questionText: 'Tujuan utama negosiasi adalah mencapai kesepakatan...', options: ['A. Menjatuhkan lawan', 'B. Win-win solution', 'C. Sepihak', 'D. Pasrah'], correctAnswer: 'B', scoreWeight: 1 }
      ]
    };
  },

  // ---------- 5. LMS & CBT UJIAN SISWA (AUTO-GRADING) ----------
  populateLMSQuizDropdown() {
    const sel = document.getElementById('lms-select-package');
    if (!sel) return;
    sel.innerHTML = '';
    if (state.currentPackage) {
      sel.innerHTML += `<option value="${state.currentPackage.id}">${state.currentPackage.title} (${state.currentPackage.questions.length} Soal)</option>`;
    }
  },

  switchLMSRole(role) {
    state.lmsRole = role;
    const viewGuru = document.getElementById('lms-view-guru');
    const viewSiswa = document.getElementById('lms-view-siswa');
    const btnG = document.getElementById('lms-role-guru-btn');
    const btnS = document.getElementById('lms-role-siswa-btn');

    if (role === 'guru') {
      viewGuru.classList.remove('hidden');
      viewSiswa.classList.add('hidden');
      btnG.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-blue-700 shadow-2xs';
      btnS.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900';
    } else {
      viewGuru.classList.add('hidden');
      viewSiswa.classList.remove('hidden');
      btnS.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-emerald-700 shadow-2xs';
      btnG.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900';
      this.initStudentCBTPlayer();
    }
  },

  publishQuiz() {
    this.notify('🚀 Ujian CBT Online berhasil diterbitkan ke Portal Siswa!');
    this.switchLMSRole('siswa');
  },

  renderLMSView() {
    this.renderGradesTable();
  },

  initStudentCBTPlayer() {
    const pkg = state.currentPackage || this.createPresetDataIPAS4();
    state.cbtActiveQuiz = pkg;

    document.getElementById('cbt-quiz-title').textContent = pkg.title;
    const sel = document.getElementById('cbt-student-select');
    sel.innerHTML = '';
    state.students.forEach(s => {
      sel.innerHTML += `<option value="${s.id}">Absen ${s.noAbsen} - ${s.nama}</option>`;
    });

    // Render questions
    const container = document.getElementById('cbt-question-container');
    container.innerHTML = '';

    pkg.questions.forEach((q, idx) => {
      let inputHtml = '';
      if (q.type === 'pg') {
        inputHtml = `
          <div class="space-y-1.5 pt-2 pl-2">
            ${(q.options || []).map((opt, oIdx) => {
              const letter = opt.slice(0, 1);
              return `
                <label class="flex items-center gap-2 text-xs p-2 rounded-lg hover:bg-white/80 cursor-pointer border border-transparent hover:border-slate-300">
                  <input type="radio" name="cbt-ans-${q.number}" value="${letter}" class="text-emerald-600">
                  <span>${opt}</span>
                </label>
              `;
            }).join('')}
          </div>
        `;
      } else {
        inputHtml = `
          <div class="pt-2">
            <input type="text" id="cbt-ans-${q.number}" placeholder="Tuliskan jawaban Anda di sini..." class="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white">
          </div>
        `;
      }

      container.innerHTML += `
        <div class="glass-panel-subtle p-4 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Soal Nomor ${q.number}</span>
            <span class="text-slate-400 uppercase">${q.type}</span>
          </div>
          <p class="text-xs text-slate-900">${q.questionText}</p>
          ${inputHtml}
        </div>
      `;
    });
  },

  submitStudentQuiz() {
    const pkg = state.cbtActiveQuiz;
    if (!pkg) return;

    const stdId = document.getElementById('cbt-student-select').value;
    const std = state.students.find(s => s.id === stdId);
    if (!std) return;

    let correctCount = 0;
    let totalScore = 0;
    let earnedScore = 0;

    pkg.questions.forEach(q => {
      const weight = q.scoreWeight || 1;
      totalScore += weight;

      if (q.type === 'pg') {
        const checked = document.querySelector(`input[name="cbt-ans-${q.number}"]:checked`);
        if (checked && checked.value.toUpperCase() === (q.correctAnswer || '').toUpperCase()) {
          correctCount++;
          earnedScore += weight;
        }
      } else {
        const textVal = (document.getElementById(`cbt-ans-${q.number}`)?.value || '').trim().toLowerCase();
        if (textVal && textVal.includes((q.correctAnswer || '').toLowerCase().slice(0, 4))) {
          correctCount++;
          earnedScore += weight;
        }
      }
    });

    const finalGrade = Math.round((earnedScore / (totalScore || 1)) * 100);

    // Record grade
    state.lmsGrades.unshift({
      studentId: std.id,
      studentName: std.nama,
      noAbsen: std.noAbsen,
      quizTitle: pkg.title,
      correctCount: correctCount,
      totalQuestions: pkg.questions.length,
      grade: finalGrade,
      submittedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem(KEYS.LMS_GRADES, JSON.stringify(state.lmsGrades));

    alert(`🎉 Ujian Selesai!\n\nNama: ${std.nama}\nBenar: ${correctCount} dari ${pkg.questions.length} Soal\nNilai Akhir: ${finalGrade} / 100\n\nNilai Anda telah otomatis tersimpan ke buku rekap nilai kelas.`);
    this.switchLMSRole('guru');
    this.renderGradesTable();
  },

  renderGradesTable() {
    const tbody = document.getElementById('lms-grades-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.lmsGrades.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400">Belum ada siswa yang mengumpulkan ujian CBT. Coba klik 'Simulasi Ujian Siswa'.</td></tr>`;
      return;
    }

    state.lmsGrades.forEach(g => {
      const statusBadge = g.grade >= 75 ? '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Tuntas</span>' : '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">Remedial</span>';
      tbody.innerHTML += `
        <tr class="hover:bg-slate-50">
          <td class="py-2 px-3 font-bold">${g.noAbsen}</td>
          <td class="py-2 px-3 font-semibold text-slate-900">${g.studentName}</td>
          <td class="py-2 px-3 text-slate-600">${g.quizTitle}</td>
          <td class="py-2 px-3 text-center font-bold text-slate-800">${g.correctCount} / ${g.totalQuestions}</td>
          <td class="py-2 px-3 text-center font-extrabold text-sm text-blue-700">${g.grade}</td>
          <td class="py-2 px-3 text-center">${statusBadge}</td>
        </tr>
      `;
    });
  },

  // ---------- 6. TABUNGAN & KAS KELAS ----------
  renderSavingsTable() {
    const tbody = document.getElementById('savings-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    (state.savings || []).slice(0, 10).forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td class="py-2.5 px-3 font-mono">${s.tanggal}</td>
          <td class="py-2.5 px-3 font-semibold">${s.nama}</td>
          <td class="py-2.5 px-3 font-bold uppercase text-emerald-700">${s.tipe}</td>
          <td class="py-2.5 px-3 font-mono">Rp ${s.nominal.toLocaleString('id-ID')}</td>
          <td class="py-2.5 px-3 text-slate-500">${s.keterangan || '-'}</td>
        </tr>
      `;
    });
  },

  openAddSavingModal() {
    const nama = prompt('Masukkan Nama Siswa:');
    if (!nama) return;
    const nominal = parseInt(prompt('Nominal Setoran Tabungan (Rp):', '10000'), 10) || 0;
    state.savings.unshift({
      tanggal: new Date().toISOString().slice(0, 10),
      nama: nama,
      tipe: 'Setor',
      nominal: nominal,
      keterangan: 'Setoran tabungan kelas'
    });
    this.renderSavingsTable();
    this.notify('Transaksi tabungan ' + nama + ' berhasil dicatat.');
  },

  renderCashTable() {
    const tbody = document.getElementById('cash-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let balance = 0;
    state.cash.forEach(k => {
      if (k.tipe === 'masuk') balance += k.nominal;
      else balance -= k.nominal;

      tbody.innerHTML += `
        <tr>
          <td class="py-2.5 px-3 font-mono">${k.tanggal}</td>
          <td class="py-2.5 px-3 font-medium">${k.uraian}</td>
          <td class="py-2.5 px-3 font-bold ${k.tipe === 'masuk' ? 'text-emerald-600' : 'text-rose-600'} uppercase">${k.tipe}</td>
          <td class="py-2.5 px-3 text-right font-mono font-bold">Rp ${k.nominal.toLocaleString('id-ID')}</td>
        </tr>
      `;
    });

    document.getElementById('kas-balance-display').textContent = 'Rp ' + balance.toLocaleString('id-ID');
  },

  openAddCashModal() {
    const uraian = prompt('Uraian Kas (contoh: Iuran kas kelas / Beli spidol):');
    if (!uraian) return;
    const nominal = parseInt(prompt('Nominal (Rp):', '50000'), 10) || 0;
    const tipe = prompt('Jenis (masuk / keluar):', 'masuk').toLowerCase();

    state.cash.push({
      id: 'K' + (state.cash.length + 1),
      tanggal: new Date().toISOString().slice(0, 10),
      uraian: uraian,
      tipe: tipe === 'keluar' ? 'keluar' : 'masuk',
      nominal: nominal
    });

    localStorage.setItem(KEYS.CASH, JSON.stringify(state.cash));
    this.renderCashTable();
    this.notify('Kas ' + uraian + ' berhasil dicatat.');
  },

  renderNotificationList() {
    const c = document.getElementById('notification-list-container');
    if (!c) return;
    c.innerHTML = `
      <div class="glass-panel-subtle p-3 border-l-4 border-l-blue-500">
        <strong class="text-slate-900 block">Jadwal Asesmen Sumatif Tengah Semester</strong>
        <p class="text-slate-600">Pekan depan dimulai ulangan serentak IPAS & Matematika. Siapkan naskah soal dari Bank Soal.</p>
      </div>
      <div class="glass-panel-subtle p-3 border-l-4 border-l-emerald-500">
        <strong class="text-slate-900 block">Presensi Kelas 100% Lengkap</strong>
        <p class="text-slate-600">Seluruh siswa tercatat hadir penuh pada hari ini.</p>
      </div>
      <div class="glass-panel-subtle p-3 border-l-4 border-l-purple-500">
        <strong class="text-slate-900 block">Modul Ajar Pertemuan 2 Siap Digunakan</strong>
        <p class="text-slate-600">Dokumen Modul Ajar Kurikulum Merdeka telah diunduh ke format Word.</p>
      </div>
    `;
  },

  // ---------- KOP & SETTINGS MODAL ----------
  openSettingsModal() {
    const s = state.settings;
    document.getElementById('set-api-key').value = s.apiKey || '';
    document.getElementById('set-school-parent').value = s.schoolParent || '';
    document.getElementById('set-school-name').value = s.schoolName || '';
    document.getElementById('set-school-address').value = s.schoolAddress || '';
    document.getElementById('set-principal-name').value = s.principalName || '';
    document.getElementById('set-principal-nip').value = s.principalNip || '';
    document.getElementById('set-teacher-name').value = s.teacherName || '';
    document.getElementById('set-teacher-nip').value = s.teacherNip || '';
    document.getElementById('modal-settings').classList.remove('hidden');
  },

  closeSettingsModal() {
    document.getElementById('modal-settings').classList.add('hidden');
  },

  saveSettingsFromModal() {
    state.settings = {
      ...state.settings,
      apiKey: document.getElementById('set-api-key').value.trim(),
      schoolParent: document.getElementById('set-school-parent').value.trim(),
      schoolName: document.getElementById('set-school-name').value.trim(),
      schoolAddress: document.getElementById('set-school-address').value.trim(),
      principalName: document.getElementById('set-principal-name').value.trim(),
      principalNip: document.getElementById('set-principal-nip').value.trim(),
      teacherName: document.getElementById('set-teacher-name').value.trim(),
      teacherNip: document.getElementById('set-teacher-nip').value.trim()
    };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    this.updateKopDisplay();
    this.closeSettingsModal();
    this.notify('Pengaturan kop sekolah & AI berhasil disimpan.');
  },

  updateKopDisplay() {
    const s = state.settings;
    const parentEl = document.getElementById('kop-school-name');
    const unitEl = document.getElementById('kop-school-unit');
    const addrEl = document.getElementById('kop-school-address');
    if (parentEl) parentEl.textContent = s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA';
    if (unitEl) unitEl.textContent = s.schoolName || 'SD NEGERI CONTOH TELADAN';
    if (addrEl) addrEl.textContent = s.schoolAddress || '';
  },

  logoutOrSwitchPortal() {
    if (confirm('Apakah Anda ingin berganti ke Portal Siswa (CBT) atau keluar dari sistem?')) {
      this.navigate('lms');
      this.switchLMSRole('siswa');
    }
  }
};

// Auto start
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
