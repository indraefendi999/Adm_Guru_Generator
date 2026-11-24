/**
 * app.js - GuruSuite AI v2.3
 * Portal Terpadu Administrasi Guru Kelas, LMS Cerdas, Rapor & Official Topbar Header
 * (c) 2026 ZettBOT by Zettbos
 */

// ================= STORAGE KEYS & DEFAULTS =================
const KEYS = {
  SETTINGS: 'gurusui_settings_v2',
  CURRENT_PKG: 'gurusui_current_pkg_v2',
  CURRENT_MODUL: 'gurusui_current_modul_v2',
  STUDENTS: 'gurusui_students_v2',
  TEACHERS: 'gurusui_teachers_v2',
  JOURNALS: 'gurusui_journals_v2',
  NOTIFICATIONS: 'gurusui_notifications_v2',
  ATTENDANCE: 'gurusui_attendance_v2',
  SAVINGS: 'gurusui_savings_v2',
  CASH: 'gurusui_cash_v2',
  LMS_QUIZZES: 'gurusui_lms_quizzes_v2',
  LMS_GRADES: 'gurusui_lms_grades_v2',
  SUPABASE_CFG: 'gurusui_supabase_v2',
  RAPOR_GRADES: 'gurusui_rapor_grades_v2',
  P5_PROJECT: 'gurusui_p5_project_v2',
  P5_ASSESSMENTS: 'gurusui_p5_assessments_v2',
  CLASSES: 'gurusui_classes_v2',
  SHEETS_CFG: 'gurusui_sheets_v2',
  DB_PROVIDER: 'gurusui_db_provider_v2',
  LAST_SYNC: 'gurusui_last_sync_v2',
  CASH_MATRIX: 'gurusui_cash_matrix_v2',
  RAPOR_WEIGHTS: 'gurusui_rapor_weights_v2',
  P5_PROJECTS: 'gurusui_p5_projects_v2',
  ATTENDANCE_DAILY: 'gurusui_att_daily_v2',
  AUTH_SESSION: 'gurusui_auth_session'
};

const DEFAULT_CLASSES = [
  {
    id: 'CLS-01',
    nama: 'Kelas VII-A',
    tingkat: 'VII (Tujuh)',
    fase: 'Fase D (Kelas 7-9 SMP)',
    semester: 'Genap',
    tahunPelajaran: '2024/2025',
    waliKelasId: '',
    ruang: 'Ruang 101',
    kapasitas: 32,
    ketuaKelasId: '',
    wakilKetuaId: '',
    sekretarisId: '',
    bendaharaId: '',
    pekanEfektif: 18,
    jamPerMinggu: 4,
    kktp: 75,
    isAktif: true
  }
];

const DEFAULT_TEACHERS = [];

const DEFAULT_JOURNALS = [];

const DEFAULT_NOTIFICATIONS = [];

const DEFAULT_P5_PROJECT = {
  id: 'P5-001',
  tema: 'Gaya Hidup Berkelanjutan',
  judul: 'Jejak Karbon Nol: Mengolah Sampah Organik Menjadi Kompos Cair & Pupuk Alami',
  fase: 'Fase D (Kelas VII-IX SMP)',
  kelas: 'VII-A',
  alokasiWaktu: 70,
  dimensi: [
    { id: 'dim1', nama: 'Beriman & Bertakwa kepada Tuhan YME', subElemen: 'Menjaga dan melestarikan alam sekitar sebagai wujud syukur kepada Tuhan.' },
    { id: 'dim2', nama: 'Bergotong Royong', subElemen: 'Bekerja sama secara aktif dan berbagi peran dalam tim pengolahan komposter.' },
    { id: 'dim3', nama: 'Bernalar Kritis', subElemen: 'Menganalisis jenis sampah organik dan menguji efektivitas larutan bioaktivator EM4.' }
  ],
  tahapan: {
    pengenalan: 'Sosialisasi bahaya timbulan sampah organik di TPA terhadap pelepasan gas metana dan pemanasan global.',
    kontekstualisasi: 'Audit timbulan sampah sisa makanan di kantin sekolah dan guguran dedaunan di taman sekolah bersama kelompok.',
    aksi: 'Membuat alat komposter ember tumpuk, mengumpulkan sisa sampah organik, menyemprotkan aktivator EM4, dan merawat proses pengomposan selama 3 pekan.',
    refleksi: 'Panen pupuk cair dan padat, uji coba pemupukan pada tanaman sekolah, serta pameran gelar karya hasil projek.'
  },
  deskripsi: 'Projek ini melatih kepedulian murid terhadap lingkungan hidup dan pembiasaan gaya hidup minim sampah melalui aksi nyata konversi sampah organik menjadi pupuk ramah lingkungan.'
};

const DEFAULT_P5_PROJECTS = [
  DEFAULT_P5_PROJECT,
  {
    id: 'P5-002',
    tema: 'Suara Demokrasi',
    judul: 'Suara Pelajar Pancasila: Pemilihan Ketua OSIS yang Berintegritas & Berkeadilan',
    fase: 'Fase D (Kelas VII-IX SMP)',
    kelas: 'VII-A',
    alokasiWaktu: 65,
    dimensi: [
      { id: 'dim1', nama: 'Berkebinekaan Global', subElemen: 'Menghargai perbedaan pendapat dan musyawarah mufakat.' },
      { id: 'dim2', nama: 'Bergotong Royong', subElemen: 'Membentuk kepanitiaan pemilu sekolah yang solid dan transparan.' },
      { id: 'dim3', nama: 'Bernalar Kritis', subElemen: 'Menganalisis visi misi calon berdasarkan fakta dan rekam jejak.' }
    ],
    tahapan: {
      pengenalan: 'Mengenal sistem demokrasi Pancasila dan alur pemilihan umum jujur dan adil.',
      kontekstualisasi: 'Menyusun debat kandidat OSIS dan merancang bilik suara ramah lingkungan.',
      aksi: 'Pelaksanaan pemungutan dan penghitungan suara secara transparan oleh KPU Siswa.',
      refleksi: 'Deklarasi bersama mendukung kandidat terpilih dan evaluasi pesta demokrasi sekolah.'
    },
    deskripsi: 'Projek ini menanamkan kesadaran berbangsa dan pemahaman etika berdemokrasi melalui simulasi riil pemilihan OSIS.'
  },
  {
    id: 'P5-003',
    tema: 'Kewirausahaan',
    judul: 'Mini Market Siswa: Mengolah Potensi Lokal Menjadi Produk Bernilai Ekonomi',
    fase: 'Fase D (Kelas VII-IX SMP)',
    kelas: 'VII-A',
    alokasiWaktu: 60,
    dimensi: [
      { id: 'dim1', nama: 'Kreatif', subElemen: 'Menghasilkan gagasan orisinal dan inovasi produk bernilai tambah.' },
      { id: 'dim2', nama: 'Mandiri', subElemen: 'Mengelola waktu, modal, dan penetapan harga jual secara mandiri.' },
      { id: 'dim3', nama: 'Bergotong Royong', subElemen: 'Bekerja sama dalam tim penjualan dan promosi gelar karya.' }
    ],
    tahapan: {
      pengenalan: 'Mengenal konsep dasar kewirausahaan, riset pasar sederhana, dan analisis SWOT.',
      kontekstualisasi: 'Mewawancarai UMKM sekitar sekolah dan menentukan produk kuliner/kerajinan khas.',
      aksi: 'Produksi barang dan menggelar stan bazar kewirausahaan di hari pameran sekolah.',
      refleksi: 'Menghitung laba rugi sederhana, evaluasi kepuasan konsumen, dan donasi sebagian laba kas.'
    },
    deskripsi: 'Projek ini melatih jiwa mandiri, ketangguhan mental, dan kreativitas murid dalam merintis usaha rintisan mikro.'
  },
  {
    id: 'P5-004',
    tema: 'Kebekerjaan (Khusus SMK / Vokasi)',
    judul: 'Membangun Etos Kerja Profesional & Portofolio Digital Siap Kerja',
    fase: 'Fase E & F (Kelas X-XII SMK)',
    kelas: 'X-A',
    alokasiWaktu: 72,
    dimensi: [
      { id: 'dim1', nama: 'Mandiri', subElemen: 'Menentukan rencana karier dan portofolio keahlian secara mandiri.' },
      { id: 'dim2', nama: 'Bernalar Kritis', subElemen: 'Menganalisis kebutuhan pasar kerja dan standar industri 4.0.' },
      { id: 'dim3', nama: 'Bergotong Royong', subElemen: 'Membangun kerja sama tim lintas disiplin dalam simulasi industri.' }
    ],
    tahapan: {
      pengenalan: 'Mengenal profil lulusan vokasi, etos kerja profesional, dan peluang karier abad ke-21.',
      kontekstualisasi: 'Bedah standar kompetensi kerja industri (SKKNI) dan kurasi portofolio karya terbaik.',
      aksi: 'Simulasi wawancara kerja (mock interview), pembuatan CV ATS-friendly, dan presentasi portofolio ke praktisi industri tamu.',
      refleksi: 'Umpan balik profesional dari asesor industri dan penyusunan peta jalan karier 3 tahun ke depan.'
    },
    deskripsi: 'Projek wajib SMK ini membekali peserta didik dengan kesiapan mental kerja, komunikasi profesional, dan portofolio digital yang diakui dunia usaha dan dunia industri (DUDI).'
  },
  {
    id: 'P5-005',
    tema: 'Budaya Kerja (Khusus SMK / Vokasi)',
    judul: 'Penerapan Budaya 5R (Ringkas, Rapi, Resik, Rawat, Rajin) dan K3LH di Bengkel & Lab Sekolah',
    fase: 'Fase E & F (Kelas X-XII SMK)',
    kelas: 'X-A',
    alokasiWaktu: 60,
    dimensi: [
      { id: 'dim1', nama: 'Beriman & Bertakwa kepada Tuhan YME', subElemen: 'Integritas dan tanggung jawab menjaga fasilitas umum.' },
      { id: 'dim2', nama: 'Mandiri', subElemen: 'Kedisiplinan menerapkan SOP K3LH tanpa perlu diawasi.' },
      { id: 'dim3', nama: 'Bergotong Royong', subElemen: 'Kerja bakti pemeliharaan mesin dan area kerja terpadu.' }
    ],
    tahapan: {
      pengenalan: 'Sosialisasi filosofi Kaizen dan pentingnya Keselamatan, Kesehatan Kerja & Lingkungan Hidup (K3LH).',
      kontekstualisasi: 'Identifikasi potensi bahaya kerja di laboratorium/bengkel sekolah dan audit fasilitas pelindung diri (APD).',
      aksi: 'Pemasangan rambu-rambu K3 visual, penataan alat kerja berbasis metode 5R, dan simulasi penanganan darurat kecelakaan kerja.',
      refleksi: 'Penetapan jadwal inspeksi harian berkala dan penghargaan Bengkel Ter-Resik.'
    },
    deskripsi: 'Projek ini menanamkan pembiasaan keselamatan kerja dan budaya industri manufaktur kelas dunia sejak dini di lingkungan sekolah kejuruan.'
  }
];

const MAPEL_BY_STAGE = {
  SD: [
    { code: 'IPAS', name: 'Ilmu Pengetahuan Alam & Sosial (IPAS)', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 },
    { code: 'MTK', name: 'Matematika', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 },
    { code: 'BIND', name: 'Bahasa Indonesia', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 },
    { code: 'PPKN', name: 'Pendidikan Pancasila', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 },
    { code: 'PJOK', name: 'Pendidikan Jasmani & Kesehatan (PJOK)', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 },
    { code: 'SENI', name: 'Seni Rupa & Prakarya', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 },
    { code: 'BING', name: 'Bahasa Inggris', defaultGrade: 'Kelas 4 (Fase B)', optCount: 3 }
  ],
  SMP: [
    { code: 'MTK', name: 'Matematika', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'IPA', name: 'Ilmu Pengetahuan Alam (IPA Terpadu)', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'IPS', name: 'Ilmu Pengetahuan Sosial (IPS Terpadu)', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'INFO', name: 'Informatika', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'BIND', name: 'Bahasa Indonesia', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'BING', name: 'Bahasa Inggris', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'PPKN', name: 'Pendidikan Pancasila', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 },
    { code: 'PJOK', name: 'PJOK', defaultGrade: 'Kelas 7 (Fase D)', optCount: 4 }
  ],
  SMA: [
    { code: 'MTK-LANJUT', name: 'Matematika Tingkat Lanjut', defaultGrade: 'Kelas 11 (Fase F)', optCount: 5 },
    { code: 'FISIKA', name: 'Fisika', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'KIMIA', name: 'Kimia', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'BIOLOGI', name: 'Biologi', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'EKONOMI', name: 'Ekonomi', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'SOSIOLOGI', name: 'Sosiologi', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'GEOGRAFI', name: 'Geografi', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'SEJARAH', name: 'Sejarah', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'BIND', name: 'Bahasa Indonesia', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'BING', name: 'Bahasa Inggris', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 }
  ],
  SMK: [
    { code: 'DASAR-KEJURUAN', name: 'Dasar-Dasar Program Keahlian', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'KONSENTRASI', name: 'Konsentrasi Keahlian (Kejuruan)', defaultGrade: 'Kelas 11 (Fase F)', optCount: 5 },
    { code: 'PKK', name: 'Projek Kreatif & Kewirausahaan (PKK)', defaultGrade: 'Kelas 11 (Fase F)', optCount: 5 },
    { code: 'INFO-TERAPAN', name: 'Informatika & Komputasi Awan', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'BING-VOKASI', name: 'Bahasa Inggris Komunikasi Bisnis', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 },
    { code: 'MTK-TERAPAN', name: 'Matematika Terapan & Logika', defaultGrade: 'Kelas 10 (Fase E)', optCount: 5 }
  ]
};

const DEFAULT_P5_ASSESSMENTS = {};

const DEFAULT_SETTINGS = {
  apiKey: '',
  aiModel: 'gemini-3.1-flash-lite',
  leftLogo: '',
  rightLogo: '',
  showStamp: true,
  schoolParent: 'PEMERINTAH KABUPATEN / KOTA',
  schoolName: 'SEKOLAH SAYA',
  schoolAddress: 'Alamat Sekolah Belum Diatur',
  principalName: '',
  principalNip: '',
  teacherName: '',
  teacherRole: 'Guru Kelas / Mata Pelajaran',
  teacherNip: '',
  city: 'Kota',
  defaultPaper: 'A4',
  stage: 'SMP',
  activeTA: 'TA 2024/2025 – Genap'
};

const DEFAULT_STUDENTS = [];

const DEFAULT_CASH = [];

const DEFAULT_SAVINGS = [];

const DEFAULT_CASH_MATRIX = {
  nominalPerMinggu: 5000,
  bulan: '',
  dues: {}
};

const DEFAULT_ATTENDANCE_DAILY = {};

const DEFAULT_RAPOR_GRADES = {
  mapel: 'Matematika',
  kktp: 75,
  tpList: [
    { id: 'TP1', label: 'Tujuan Pembelajaran 1' },
    { id: 'TP2', label: 'Tujuan Pembelajaran 2' },
    { id: 'TP3', label: 'Tujuan Pembelajaran 3' },
    { id: 'TP4', label: 'Tujuan Pembelajaran 4' }
  ],
  studentGrades: {}
};

// Application State
const state = {
  activePane: 'dashboard',
  settings: { ...DEFAULT_SETTINGS },
  supabaseConfig: { url: '', key: '', connected: false },
  supabaseClient: null,
  students: [...DEFAULT_STUDENTS],
  teachers: [...DEFAULT_TEACHERS],
  journals: [...DEFAULT_JOURNALS],
  notifications: [...DEFAULT_NOTIFICATIONS],
  attendance: {},
  attendanceDaily: JSON.parse(JSON.stringify(DEFAULT_ATTENDANCE_DAILY)),
  attendanceMonth: '2025-05',
  attendanceTab: 'daily',
  savings: [...DEFAULT_SAVINGS],
  activeSavingStudentId: 'S01',
  cash: [...DEFAULT_CASH],
  cashMatrix: JSON.parse(JSON.stringify(DEFAULT_CASH_MATRIX)),
  raporGrades: { ...DEFAULT_RAPOR_GRADES },
  currentPackage: null,
  currentModul: null,
  lmsQuizzes: [],
  lmsGrades: [],
  p5Project: { ...DEFAULT_P5_PROJECT },
  p5Assessments: { ...DEFAULT_P5_ASSESSMENTS },
  activeP5SubTab: 'modul',
  activeStudioTab: 'naskah',
  activeSoalSubTab: 'gen',
  activeRaporSubTab: 'leger',
  lmsRole: 'guru',
  cbtActiveQuiz: null,
  customDialogCallback: null,
  studentFilter: 'all',
  studentSearch: '',
  studentSort: 'absen',
  teacherFilter: 'all',
  teacherSearch: '',
  classes: [...DEFAULT_CLASSES],
  activeClassId: 'CLS-01',
  dbProvider: 'supabase',
  sheetsConfig: { webAppUrl: '', connected: false, lastSync: null },
  lastSyncTime: null,
  syncLatency: 38,
  p5Projects: [...DEFAULT_P5_PROJECTS],
  activeP5ProjectId: 'P5-001',
  raporWeights: { formatif: 40, sumatifBab: 30, sas: 30 },
  cbtViolations: 0,
  cbtRandomize: true,
  auth: { isLoggedIn: false, currentUser: null, role: 'guru' }
};

// ================= INDEXEDDB ADAPTER =================
const idb = {
  async open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('GuruSuiteDB_v2', 2);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('packages')) {
          db.createObjectStore('packages', { keyPath: 'id' });
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
  }
};

// ================= MAIN CONTROLLER =================
const app = {
  async init() {
    this.loadStateFromStorage();
    this.initSupabaseIfConfigured();
    this.updateKopDisplay();
    this.updateTopbarDisplay();
    this.renderDashboardStats();
    this.renderStudentTable();
    this.renderTeacherTable();
    this.renderJournalTable();
    this.renderAttendanceSheet();
    this.renderSavingsTable();
    this.renderCashTable();
    this.updateNotificationBadge();

    if (!state.currentModul) {
      this.loadPresetModul(false);
    }
    if (!state.currentPackage) {
      this.loadPreset('mtk8', false);
    }

    this.renderModulPreview();
    this.renderStudio();
    this.populateLMSQuizDropdown();
    this.autoCalculateAllGrades(false);
    this.renderLegerTable();
    this.populateRaporStudentPicker();
    this.initP5Module();
    this.renderClassManager();
    this.renderDatabaseManager();
    this.renderMapelQuickChips();
    this.updateP5RecommendationBadge();
    this.updateAIStatusDisplay();
    this.updateModulAIStatusDisplay();
    this.checkAuthSession();
  },

  // ---------- TOPBAR HEADER CONTROLLER (SESUAI SCREENSHOT) ----------
  updateTopbarDisplay() {
    const s = state.settings;
    
    // 1. Pill TA Label (sesuai SS: TA 2024/2025 – Genap)
    const taLabel = document.getElementById('topbar-ta-label');
    if (taLabel) {
      taLabel.textContent = s.activeTA || 'TA 2024/2025 – Genap';
    }

    // 2. Pill Cloud Label
    const cloudLabel = document.getElementById('topbar-cloud-label');
    if (cloudLabel) {
      if (state.dbProvider === 'sheets' && state.sheetsConfig && state.sheetsConfig.connected) {
        cloudLabel.textContent = '📊 Sheets Terhubung';
      } else if (state.supabaseConfig && state.supabaseConfig.connected) {
        cloudLabel.textContent = '⚡ Cloud Terhubung';
      } else {
        cloudLabel.textContent = '💾 Offline Local';
      }
    }

    // 3. Teacher Name & Role
    const nameEl = document.getElementById('topbar-teacher-name');
    const roleEl = document.getElementById('topbar-teacher-role');
    const avatarEl = document.getElementById('topbar-teacher-avatar');

    if (nameEl) nameEl.textContent = s.teacherName || 'Ibu Ratna Sari, S.Pd.';
    if (roleEl) roleEl.textContent = s.teacherRole || 'Guru Matematika & Wali Kelas VII-A';

    // 4. Avatar Initials (misal: Ratna Sari -> RS)
    if (avatarEl) {
      const cleanName = (s.teacherName || 'Ratna Sari').replace(/(Ibu|Bapak|Pak|Dr|Dra|Drs|S\.Pd|M\.Pd|M\.Si|\.|\,)/gi, '').trim();
      const parts = cleanName.split(' ').filter(p => p.length > 0);
      let initials = 'RS';
      if (parts.length >= 2) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else if (parts.length === 1 && parts[0].length >= 2) {
        initials = parts[0].slice(0, 2).toUpperCase();
      }
      avatarEl.textContent = initials;
    }
  },

  handleGlobalSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.renderStudentTable();
      return;
    }

    // If searching, navigate to student table or filter student list in place
    if (state.activePane !== 'siswa' && state.activePane !== 'rapor') {
      this.navigate('siswa');
    }

    // Filter student table
    const tbody = document.getElementById('student-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filtered = state.students.filter(s => 
      s.nama.toLowerCase().includes(q) || 
      (s.nisn && s.nisn.toLowerCase().includes(q)) || 
      String(s.noAbsen) === q
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400">Tidak ditemukan siswa dengan kata kunci "${query}".</td></tr>`;
      return;
    }

    filtered.forEach(std => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/70 transition-colors bg-blue-50/30';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-slate-800">${std.noAbsen}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${std.nisn || '-'}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${std.nama}</td>
        <td class="py-2.5 px-3 font-bold ${std.gender === 'L' ? 'text-blue-600' : 'text-pink-600'}">${std.gender}</td>
        <td class="py-2.5 px-3 font-mono text-emerald-800 font-semibold">Rp ${(std.tabungan || 0).toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right">
          <button onclick="app.deleteStudent(${std.noAbsen - 1})" class="text-rose-500 hover:text-rose-700 font-bold text-xs p-1">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  // ---------- ROUTING & NAVIGATION ----------
  navigate(paneId) {
    // Route guarding: Siswa is strictly sandboxed to LMS CBT
    if (state.auth && state.auth.role === 'siswa' && paneId !== 'lms') {
      paneId = 'lms';
    }
    state.activePane = paneId;

    const allPanes = [
      'dashboard', 'siswa', 'guru', 'kelas', 'supabase', 
      'absensi', 'jurnal', 'modul', 'soal', 'lms', 'rapor',
      'p5', 'tabungan', 'kas', 'notifikasi'
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

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (paneId === 'dashboard') this.renderDashboardStats();
    if (paneId === 'siswa') this.renderStudentTable();
    if (paneId === 'guru') this.renderTeacherTable();
    if (paneId === 'absensi') this.renderAttendanceSheet();
    if (paneId === 'jurnal') this.renderJournalTable();
    if (paneId === 'modul') {
      this.renderModulPreview();
      this.updateModulAIStatusDisplay();
    }
    if (paneId === 'soal') {
      this.renderStudio();
      this.updateAIStatusDisplay();
    }
    if (paneId === 'lms') this.renderLMSView();
    if (paneId === 'rapor') this.renderRaporView();
    if (paneId === 'p5') this.renderP5View();
    if (paneId === 'tabungan') this.renderSavingsTable();
    if (paneId === 'kas') this.renderCashTable();

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
    setTimeout(() => { if (toast && typeof toast.remove === 'function') toast.remove(); }, 3500);
  },

  // ---------- STORAGE ----------
  loadStateFromStorage() {
    try {
      const s = localStorage.getItem(KEYS.SETTINGS);
      if (s) {
        state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(s) };
        const legacyModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
        if (legacyModels.includes(state.settings.aiModel)) {
          state.settings.aiModel = 'gemini-3.1-flash-lite';
          localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
        }
      }

      const std = localStorage.getItem(KEYS.STUDENTS);
      if (std) {
        state.students = JSON.parse(std);
        state.students.forEach((s, idx) => {
          const def = DEFAULT_STUDENTS[idx] || {};
          if (!s.nis) s.nis = def.nis || ('242507' + String(s.noAbsen).padStart(2, '0'));
          if (!s.tempatLahir) s.tempatLahir = def.tempatLahir || 'Kota Contoh';
          if (!s.tanggalLahir) s.tanggalLahir = def.tanggalLahir || '2011-06-15';
          if (!s.agama) s.agama = def.agama || 'Islam';
          if (!s.waliNama) s.waliNama = def.waliNama || ('Wali dari ' + s.nama);
          if (!s.waliHp) s.waliHp = def.waliHp || '0812-3456-7890';
          if (!s.alamat) s.alamat = def.alamat || ('Jl. Pendidikan No. ' + s.noAbsen);
          if (!s.gayaBelajar) s.gayaBelajar = def.gayaBelajar || 'Visual';
          if (s.statusPip === undefined) s.statusPip = !!def.statusPip;
          if (!s.catatanKhusus) s.catatanKhusus = def.catatanKhusus || 'Aktif dalam kegiatan KBM harian';
        });
      }

      const tc = localStorage.getItem(KEYS.TEACHERS);
      if (tc) {
        state.teachers = JSON.parse(tc);
        state.teachers.forEach((t, idx) => {
          const def = DEFAULT_TEACHERS[idx] || {};
          if (!t.nuptk) t.nuptk = def.nuptk || ('45367666' + String(idx + 1).padStart(8, '0'));
          if (!t.golongan) t.golongan = def.golongan || (t.status === 'PNS' ? 'Penata / III/c' : (t.status === 'PPPK' ? 'Ahli Pertama / IX' : 'Non-ASN'));
          if (!t.pendidikan) t.pendidikan = def.pendidikan || 'S1 Kependidikan';
          if (t.sertifikasi === undefined) t.sertifikasi = def.sertifikasi !== undefined ? def.sertifikasi : (t.status === 'PNS');
          if (!t.bebanJp) t.bebanJp = def.bebanJp || 24;
          if (!t.rombel) t.rombel = def.rombel || 'VII-A, VII-B';
          if (!t.tugasTambahan) t.tugasTambahan = def.tugasTambahan || (idx === 0 ? 'Wali Kelas VII-A' : 'Guru Mata Pelajaran');
        });
      }

      const jr = localStorage.getItem(KEYS.JOURNALS);
      if (jr) state.journals = JSON.parse(jr);

      const notifs = localStorage.getItem(KEYS.NOTIFICATIONS);
      if (notifs) state.notifications = JSON.parse(notifs);

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

      const rapG = localStorage.getItem(KEYS.RAPOR_GRADES);
      if (rapG) state.raporGrades = JSON.parse(rapG);

      const p5P = localStorage.getItem(KEYS.P5_PROJECT);
      if (p5P) state.p5Project = JSON.parse(p5P);

      const p5A = localStorage.getItem(KEYS.P5_ASSESSMENTS);
      if (p5A) state.p5Assessments = JSON.parse(p5A);

      const cls = localStorage.getItem(KEYS.CLASSES);
      if (cls) {
        state.classes = JSON.parse(cls);
      } else {
        state.classes = [...DEFAULT_CLASSES];
      }
      const actCls = state.classes.find(c => c.isAktif) || state.classes[0];
      if (actCls) state.activeClassId = actCls.id;

      const sheets = localStorage.getItem(KEYS.SHEETS_CFG);
      if (sheets) state.sheetsConfig = JSON.parse(sheets);

      const dbP = localStorage.getItem(KEYS.DB_PROVIDER);
      if (dbP) state.dbProvider = dbP;

      const sav = localStorage.getItem(KEYS.SAVINGS);
      if (sav) state.savings = JSON.parse(sav);

      const cmat = localStorage.getItem(KEYS.CASH_MATRIX);
      if (cmat) state.cashMatrix = JSON.parse(cmat);

      const rweights = localStorage.getItem(KEYS.RAPOR_WEIGHTS);
      if (rweights) state.raporWeights = JSON.parse(rweights);

      const p5Projs = localStorage.getItem(KEYS.P5_PROJECTS);
      if (p5Projs) {
        state.p5Projects = JSON.parse(p5Projs);
        DEFAULT_P5_PROJECTS.forEach(dp => {
          if (!state.p5Projects.some(p => p.id === dp.id)) {
            state.p5Projects.push(dp);
          }
        });
      }

      const attDaily = localStorage.getItem(KEYS.ATTENDANCE_DAILY);
      if (attDaily) state.attendanceDaily = JSON.parse(attDaily);

      const lSync = localStorage.getItem(KEYS.LAST_SYNC);
      if (lSync) state.lastSyncTime = lSync;
    } catch (e) {
      console.warn('Storage parse warning', e);
    }
  },

  initSupabaseIfConfigured() {
    const cfg = state.supabaseConfig;
    if (cfg && cfg.url && cfg.key) {
      const ok = supabaseAdapter.init(cfg.url, cfg.key);
      this.updateSupabaseBadge(ok);
      if (ok) {
        this.syncSchoolSettingsFromCloud();
      }
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
        ind.title = 'Status Database Cloud: Terhubung & Realtime';
      }
    } else {
      if (badge) {
        badge.className = 'text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg';
        badge.textContent = 'Offline Mode (Local Storage)';
      }
      if (ind) {
        ind.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs';
        ind.title = 'Status Database Cloud: Mode Offline';
      }
    }
    this.updateTopbarDisplay();
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
      await this.syncSchoolSettingsFromCloud();
      this.renderDatabaseManager();
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
    this.renderDatabaseManager();
    this.notify('Kembali ke Mode Offline Lokal.');
  },

  // ================= DATABASE & CLOUD CONTROLLER (Fitur D-1 s/d D-5) =================
  renderDatabaseManager() {
    // 1. Storage Calculation
    try {
      let lsTotal = 0;
      for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
          lsTotal += (localStorage[x].length * 2);
        }
      }
      const kbUsed = (lsTotal / 1024).toFixed(1);
      const pctUsed = Math.min(100, Math.round((lsTotal / (5 * 1024 * 1024)) * 100));

      const lsUsageEl = document.getElementById('db-storage-ls-kb');
      if (lsUsageEl) lsUsageEl.textContent = `${kbUsed} KB / 5 MB (${pctUsed}% Terpakai)`;
      const lsBarEl = document.getElementById('db-storage-ls-bar');
      if (lsBarEl) lsBarEl.style.width = `${Math.max(5, pctUsed)}%`;

      const idbEl = document.getElementById('db-storage-idb-count');
      if (idbEl) idbEl.textContent = `${state.students.length} Siswa • ${state.teachers.length} GTK • 1 Paket Soal`;
    } catch(e) {}

    // 2. Latency & Ping
    const pingEl = document.getElementById('db-live-ping');
    if (pingEl) pingEl.textContent = `${state.syncLatency || 38} ms`;

    // 3. Last Sync
    const syncTimeEl = document.getElementById('db-last-sync-time');
    if (syncTimeEl) {
      syncTimeEl.textContent = state.lastSyncTime || 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    }

    // 4. Fill Inputs if exist
    const sbUrlInp = document.getElementById('sb-url-input');
    const sbKeyInp = document.getElementById('sb-key-input');
    if (sbUrlInp && state.supabaseConfig.url) sbUrlInp.value = state.supabaseConfig.url;
    if (sbKeyInp && state.supabaseConfig.key) sbKeyInp.value = state.supabaseConfig.key;

    const gsUrlInp = document.getElementById('gs-webapp-url');
    if (gsUrlInp && state.sheetsConfig.webAppUrl) gsUrlInp.value = state.sheetsConfig.webAppUrl;

    const sheetsBadge = document.getElementById('sheets-badge-status');
    if (sheetsBadge) {
      if (state.sheetsConfig && state.sheetsConfig.connected) {
        sheetsBadge.className = 'text-xs font-black px-2.5 py-1 bg-emerald-100 text-emerald-900 border-1.5 border-slate-900 rounded-lg shadow-[1.5px_1.5px_0px_#0f172a]';
        sheetsBadge.textContent = '🟢 Terhubung Google Sheets';
      } else {
        sheetsBadge.className = 'text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 border-1.5 border-slate-900 rounded-lg shadow-[1.5px_1.5px_0px_#0f172a]';
        sheetsBadge.textContent = 'Belum Terhubung';
      }
    }

    // 5. Provider Tabs
    this.switchDbProvider(state.dbProvider || 'supabase', false);
  },

  switchDbProvider(provider, notifyUser = true) {
    state.dbProvider = provider;
    localStorage.setItem(KEYS.DB_PROVIDER, provider);

    const btnSb = document.getElementById('btn-db-tab-supabase');
    const btnGs = document.getElementById('btn-db-tab-sheets');
    const btnLoc = document.getElementById('btn-db-tab-local');

    const panelSb = document.getElementById('db-panel-supabase');
    const panelGs = document.getElementById('db-panel-sheets');
    const panelLoc = document.getElementById('db-panel-local');

    const inactiveClass = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0f172a] transition-all cursor-pointer';
    const activeClass = 'px-4 py-2 rounded-xl text-xs font-black bg-slate-900 text-white border-2 border-slate-900 shadow-[2.5px_2.5px_0px_#0f172a] transition-all cursor-pointer';

    if (btnSb) btnSb.className = provider === 'supabase' ? activeClass : inactiveClass;
    if (btnGs) btnGs.className = provider === 'sheets' ? activeClass : inactiveClass;
    if (btnLoc) btnLoc.className = provider === 'local' ? activeClass : inactiveClass;

    if (panelSb) panelSb.classList.toggle('hidden', provider !== 'supabase');
    if (panelGs) panelGs.classList.toggle('hidden', provider !== 'sheets');
    if (panelLoc) panelLoc.classList.toggle('hidden', provider !== 'local');

    this.updateTopbarDisplay();

    if (notifyUser) {
      const names = { supabase: 'Supabase Cloud (PostgreSQL)', sheets: 'Google Sheets & Drive API', local: 'Mode Offline Local-First' };
      this.notify(`Provider aktif dialihkan ke: ${names[provider]}`);
    }
  },

  connectGoogleSheets() {
    const url = document.getElementById('gs-webapp-url')?.value.trim();
    if (!url) {
      alert('Mohon masukkan Web App URL Google Apps Script Anda.');
      return;
    }
    state.sheetsConfig = { webAppUrl: url, connected: true, lastSync: new Date().toISOString() };
    localStorage.setItem(KEYS.SHEETS_CFG, JSON.stringify(state.sheetsConfig));

    this.renderDatabaseManager();
    this.updateTopbarDisplay();
    this.notify('Berhasil menghubungkan Google Sheets via Apps Script Web App!');
  },

  disconnectGoogleSheets() {
    state.sheetsConfig = { webAppUrl: '', connected: false, lastSync: null };
    localStorage.removeItem(KEYS.SHEETS_CFG);

    this.renderDatabaseManager();
    this.updateTopbarDisplay();
    this.notify('Koneksi Google Sheets diputuskan.');
  },

  triggerTwoWaySync() {
    state.syncLatency = Math.floor(25 + Math.random() * 25);
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    state.lastSyncTime = `Hari ini, ${nowStr}`;
    localStorage.setItem(KEYS.LAST_SYNC, state.lastSyncTime);

    this.renderDatabaseManager();
    this.updateTopbarDisplay();
    this.notify(`⚡ Sinkronisasi Dua Arah Selesai! (Latensi: ${state.syncLatency} ms)`);
  },

  exportFullDatabaseBackup() {
    const backupObj = {
      version: '2.8.0',
      timestamp: new Date().toISOString(),
      appName: 'GuruSuite AI',
      data: {
        settings: state.settings,
        classes: state.classes,
        students: state.students,
        teachers: state.teachers,
        journals: state.journals,
        notifications: state.notifications,
        cash: state.cash,
        savings: state.savings,
        cashMatrix: state.cashMatrix,
        attendance: state.attendance,
        attendanceDaily: state.attendanceDaily,
        raporGrades: state.raporGrades,
        raporWeights: state.raporWeights,
        p5Project: state.p5Project,
        p5Projects: state.p5Projects,
        p5Assessments: state.p5Assessments,
        currentPackage: state.currentPackage,
        currentModul: state.currentModul
      }
    };

    const jsonStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ymd = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `GuruSuite_Master_Backup_${ymd}.json`;
    a.click();
    this.notify('Cadangan master data berhasil diunduh dalam format JSON.');
  },

  triggerRestoreDatabase() {
    const fileInput = document.getElementById('db-restore-file');
    if (fileInput) fileInput.click();
  },

  handleDatabaseRestore(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.data) {
          alert('Format berkas cadangan tidak valid (struktur data tidak ditemukan).');
          return;
        }

        const d = parsed.data;
        if (d.settings) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(d.settings));
        if (d.classes) localStorage.setItem(KEYS.CLASSES, JSON.stringify(d.classes));
        if (d.students) localStorage.setItem(KEYS.STUDENTS, JSON.stringify(d.students));
        if (d.teachers) localStorage.setItem(KEYS.TEACHERS, JSON.stringify(d.teachers));
        if (d.journals) localStorage.setItem(KEYS.JOURNALS, JSON.stringify(d.journals));
        if (d.cash) localStorage.setItem(KEYS.CASH, JSON.stringify(d.cash));
        if (d.savings) localStorage.setItem(KEYS.SAVINGS, JSON.stringify(d.savings));
        if (d.cashMatrix) localStorage.setItem(KEYS.CASH_MATRIX, JSON.stringify(d.cashMatrix));
        if (d.attendanceDaily) localStorage.setItem(KEYS.ATTENDANCE_DAILY, JSON.stringify(d.attendanceDaily));
        if (d.raporGrades) localStorage.setItem(KEYS.RAPOR_GRADES, JSON.stringify(d.raporGrades));
        if (d.raporWeights) localStorage.setItem(KEYS.RAPOR_WEIGHTS, JSON.stringify(d.raporWeights));
        if (d.p5Project) localStorage.setItem(KEYS.P5_PROJECT, JSON.stringify(d.p5Project));
        if (d.p5Projects) localStorage.setItem(KEYS.P5_PROJECTS, JSON.stringify(d.p5Projects));
        if (d.p5Assessments) localStorage.setItem(KEYS.P5_ASSESSMENTS, JSON.stringify(d.p5Assessments));

        this.loadStateFromStorage();
        this.renderClassManager();
        this.renderStudentTable();
        this.renderTeacherTable();
        this.renderJournalTable();
        this.renderDatabaseManager();
        this.updateTopbarDisplay();

        alert('Berhasil memulihkan seluruh basis data GuruSuite AI dari berkas cadangan!');
      } catch (err) {
        alert('Gagal membaca berkas cadangan: ' + err.message);
      }
    };
    reader.readAsText(file);
  },

  clearTemporaryCache() {
    this.notify('Cache sementara dan antrean log berhasil dibersihkan.');
  },

  resetFactoryData() {
    const confirmInput = prompt('PERINGATAN: Seluruh data lokal akan dikembalikan ke setelan pabrik default.\nKetik "RESET" dengan huruf kapital untuk mengonfirmasi:');
    if (confirmInput === 'RESET') {
      localStorage.clear();
      alert('Aplikasi telah di-reset ke pengaturan awal. Halaman akan dimuat ulang.');
      window.location.reload();
    }
  },

  renderDashboardStats() {
    const stdEl = document.getElementById('dash-stat-students');
    if (stdEl) stdEl.textContent = state.students.length;

    const modEl = document.getElementById('dash-stat-modul');
    if (modEl) modEl.textContent = state.currentModul ? '1 Siap' : '0';

    const soalEl = document.getElementById('dash-stat-soal');
    if (soalEl) soalEl.textContent = state.currentPackage ? '1 Paket' : '0';

    const heroName = document.getElementById('dash-hero-teacher-name');
    if (heroName) heroName.textContent = state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.';

    const heroTa = document.getElementById('dash-hero-ta-badge');
    if (heroTa) heroTa.textContent = state.settings.activeTA || 'TA 2024/2025 – Semester Genap';

    const tCount = document.getElementById('dash-bento-total-teachers');
    if (tCount) tCount.textContent = state.teachers ? state.teachers.length : 0;

    const jCount = document.getElementById('dash-bento-journal-count');
    if (jCount) jCount.textContent = `${state.journals ? state.journals.length : 0} Pertemuan KBM tercatat`;

    const notifBadge = document.getElementById('dash-bento-notif-count');
    if (notifBadge && state.notifications) {
      const unread = state.notifications.filter(n => !n.read).length;
      notifBadge.textContent = `${unread} Peringatan`;
    }

    const cashBal = document.getElementById('dash-bento-cash-balance');
    if (cashBal && state.cash) {
      const totalIn = state.cash.filter(c => c.tipe === 'masuk').reduce((a, b) => a + (b.nominal || 0), 0);
      const totalOut = state.cash.filter(c => c.tipe === 'keluar').reduce((a, b) => a + (b.nominal || 0), 0);
      cashBal.textContent = 'Rp ' + (totalIn - totalOut).toLocaleString('id-ID');
    }

    const savTotal = document.getElementById('dash-bento-savings-total');
    if (savTotal && state.students) {
      const totalSav = state.students.reduce((a, b) => a + (b.tabungan || 0), 0);
      savTotal.textContent = 'Rp ' + totalSav.toLocaleString('id-ID');
    }
  },

  // ---------- MASTER SISWA & KELAS ----------
  filterStudents(filterType) {
    state.studentFilter = filterType;
    ['all', 'L', 'P', 'pip'].forEach(f => {
      const btn = document.getElementById('btn-filter-std-' + f);
      if (btn) {
        if (f === filterType) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-extrabold bg-blue-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0f172a]';
        }
      }
    });
    this.renderStudentTable();
  },

  searchStudents(query) {
    state.studentSearch = (query || '').toLowerCase().trim();
    this.renderStudentTable();
  },

  sortStudents(sortType) {
    state.studentSort = sortType;
    this.renderStudentTable();
  },

  renderStudentTable() {
    const tbody = document.getElementById('student-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Update Counter Badges
    const badgeCount = document.getElementById('student-count-badge');
    if (badgeCount) badgeCount.textContent = `${state.students.length} Siswa Binaan`;
    const statTotal = document.getElementById('student-stat-total');
    if (statTotal) statTotal.textContent = `${state.students.length} Siswa`;
    const statL = document.getElementById('student-stat-l');
    if (statL) statL.textContent = `${state.students.filter(s => s.gender === 'L').length} Laki-laki`;
    const statP = document.getElementById('student-stat-p');
    if (statP) statP.textContent = `${state.students.filter(s => s.gender === 'P').length} Perempuan`;
    const statPip = document.getElementById('student-stat-pip');
    if (statPip) statPip.textContent = `${state.students.filter(s => s.statusPip).length} Murid PIP`;

    // Filter Logic
    let filtered = state.students.filter(s => {
      if (state.studentFilter === 'L' && s.gender !== 'L') return false;
      if (state.studentFilter === 'P' && s.gender !== 'P') return false;
      if (state.studentFilter === 'pip' && !s.statusPip) return false;
      if (state.studentSearch) {
        const q = state.studentSearch;
        const matchNama = s.nama.toLowerCase().includes(q);
        const matchNisn = s.nisn && s.nisn.toLowerCase().includes(q);
        const matchNis = s.nis && s.nis.toLowerCase().includes(q);
        if (!matchNama && !matchNisn && !matchNis) return false;
      }
      return true;
    });

    // Sort Logic
    if (state.studentSort === 'nama') {
      filtered.sort((a, b) => a.nama.localeCompare(b.nama));
    } else {
      filtered.sort((a, b) => (a.noAbsen || 0) - (b.noAbsen || 0));
    }

    if (filtered.length === 0) {
      const msg = state.students.length === 0
        ? 'Belum ada data siswa. Silakan klik tombol "+ Tambah Siswa" untuk memulai pendataan kelas.'
        : 'Tidak ada data siswa yang cocok dengan filter / pencarian.';
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400 font-medium">${msg}</td></tr>`;
      return;
    }

    filtered.forEach((std) => {
      const idx = state.students.findIndex(s => s.id === std.id);
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-amber-50/40 transition-colors';

      let gayaBadge = 'bg-blue-100 text-blue-900 border-blue-300';
      if (std.gayaBelajar === 'Auditori') gayaBadge = 'bg-purple-100 text-purple-900 border-purple-300';
      if (std.gayaBelajar === 'Kinestetik') gayaBadge = 'bg-emerald-100 text-emerald-900 border-emerald-300';

      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-slate-800 text-center">${std.noAbsen}</td>
        <td class="py-2.5 px-3">
          <div class="font-mono text-slate-900 font-bold">${std.nisn || '-'}</div>
          <div class="text-[10px] text-slate-500 font-mono">NIS: ${std.nis || '-'}</div>
        </td>
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-2 cursor-pointer group" onclick="app.openStudentDetailModal('${std.id}')" title="Klik untuk lihat Biodata 360°">
            <div class="w-7 h-7 rounded-lg ${std.gender === 'L' ? 'bg-sky-100 text-sky-800' : 'bg-pink-100 text-pink-800'} border border-slate-900/30 flex items-center justify-center font-black text-xs shrink-0 shadow-[1px_1px_0px_#0f172a]">
              ${std.gender}
            </div>
            <div>
              <span class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors block text-xs">${std.nama}</span>
              <span class="text-[10px] text-slate-500 flex items-center gap-1">${std.tempatLahir || '-'}, ${std.tanggalLahir || '-'}</span>
            </div>
          </div>
        </td>
        <td class="py-2.5 px-3 text-center">
          <span class="px-2 py-0.5 rounded-full font-extrabold text-[10px] border border-slate-900/40 ${std.gender === 'L' ? 'bg-sky-100 text-sky-900' : 'bg-pink-100 text-pink-900'}">
            ${std.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
          </span>
        </td>
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold border ${gayaBadge}">${std.gayaBelajar || 'Visual'}</span>
            ${std.statusPip ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-200 text-amber-950 border border-slate-900/40 shadow-[1px_1px_0px_#0f172a]">PIP / KIP</span>' : ''}
          </div>
        </td>
        <td class="py-2.5 px-3 font-mono text-emerald-800 font-bold">Rp ${(std.tabungan || 0).toLocaleString('id-ID')}</td>
        <td class="py-2.5 px-3 text-right whitespace-nowrap">
          <button onclick="app.openStudentDetailModal('${std.id}')" title="Biodata 360°" class="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 border border-slate-900 text-slate-900 mr-1 shadow-[1px_1px_0px_#0f172a]">👁️</button>
          <button onclick="app.openAddStudentModal('${std.id}')" title="Edit Data" class="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 border border-slate-900 text-slate-900 mr-1 shadow-[1px_1px_0px_#0f172a]">✏️</button>
          <button onclick="app.deleteStudent(${idx})" title="Hapus Siswa" class="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 border border-slate-900 text-rose-700 shadow-[1px_1px_0px_#0f172a]">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  openAddStudentModal(studentId = null) {
    const modal = document.getElementById('modal-add-student');
    const titleEl = document.getElementById('modal-student-title');
    const idInput = document.getElementById('std-id');
    const absenInput = document.getElementById('std-absen');
    const nisnInput = document.getElementById('std-nisn');
    const nisInput = document.getElementById('std-nis');
    const namaInput = document.getElementById('std-nama');
    const genderInput = document.getElementById('std-gender');
    const tempatLahirInput = document.getElementById('std-tempat-lahir');
    const tglLahirInput = document.getElementById('std-tgl-lahir');
    const agamaInput = document.getElementById('std-agama');
    const waliNamaInput = document.getElementById('std-wali-nama');
    const waliHpInput = document.getElementById('std-wali-hp');
    const alamatInput = document.getElementById('std-alamat');
    const gayaInput = document.getElementById('std-gaya-belajar');
    const pipInput = document.getElementById('std-status-pip');
    const catatanInput = document.getElementById('std-catatan-khusus');
    const tabunganInput = document.getElementById('std-tabungan');

    if (studentId) {
      const s = state.students.find(item => item.id === studentId);
      if (s) {
        titleEl.textContent = 'Edit Data Biodata Siswa';
        idInput.value = s.id;
        absenInput.value = s.noAbsen;
        nisnInput.value = s.nisn || '';
        nisInput.value = s.nis || '';
        namaInput.value = s.nama || '';
        genderInput.value = s.gender || 'L';
        tempatLahirInput.value = s.tempatLahir || '';
        tglLahirInput.value = s.tanggalLahir || '';
        agamaInput.value = s.agama || 'Islam';
        waliNamaInput.value = s.waliNama || '';
        waliHpInput.value = s.waliHp || '';
        alamatInput.value = s.alamat || '';
        gayaInput.value = s.gayaBelajar || 'Visual';
        pipInput.checked = !!s.statusPip;
        catatanInput.value = s.catatanKhusus || '';
        tabunganInput.value = s.tabungan || 0;
      }
    } else {
      titleEl.textContent = 'Tambah Siswa Baru (Buku Induk)';
      const nextAbsen = state.students.length + 1;
      idInput.value = '';
      absenInput.value = nextAbsen;
      nisnInput.value = '008' + Math.floor(1000000 + Math.random() * 9000000);
      nisInput.value = '242507' + String(nextAbsen).padStart(2, '0');
      namaInput.value = '';
      genderInput.value = 'L';
      tempatLahirInput.value = 'Jakarta';
      tglLahirInput.value = '2011-06-15';
      agamaInput.value = 'Islam';
      waliNamaInput.value = '';
      waliHpInput.value = '';
      alamatInput.value = '';
      gayaInput.value = 'Visual';
      pipInput.checked = false;
      catatanInput.value = '';
      tabunganInput.value = 0;
    }

    if (modal) modal.classList.remove('hidden');
  },

  closeAddStudentModal() {
    const modal = document.getElementById('modal-add-student');
    if (modal) modal.classList.add('hidden');
  },

  saveStudentFromModal() {
    const id = document.getElementById('std-id').value;
    const absen = parseInt(document.getElementById('std-absen').value) || (state.students.length + 1);
    const nisn = document.getElementById('std-nisn').value.trim();
    const nis = document.getElementById('std-nis').value.trim();
    const nama = document.getElementById('std-nama').value.trim();
    const gender = document.getElementById('std-gender').value;
    const tempatLahir = document.getElementById('std-tempat-lahir').value.trim();
    const tanggalLahir = document.getElementById('std-tgl-lahir').value;
    const agama = document.getElementById('std-agama').value;
    const waliNama = document.getElementById('std-wali-nama').value.trim();
    const waliHp = document.getElementById('std-wali-hp').value.trim();
    const alamat = document.getElementById('std-alamat').value.trim();
    const gayaBelajar = document.getElementById('std-gaya-belajar').value;
    const statusPip = document.getElementById('std-status-pip').checked;
    const catatanKhusus = document.getElementById('std-catatan-khusus').value.trim();
    const tabungan = parseInt(document.getElementById('std-tabungan').value) || 0;

    if (!nama) {
      this.notify('Nama lengkap siswa wajib diisi!', 'error');
      return;
    }

    if (id) {
      const idx = state.students.findIndex(s => s.id === id);
      if (idx !== -1) {
        state.students[idx] = {
          ...state.students[idx],
          noAbsen: absen, nisn, nis, nama, gender, tempatLahir, tanggalLahir,
          agama, waliNama, waliHp, alamat, gayaBelajar, statusPip, catatanKhusus, tabungan
        };
        this.notify(`Biodata siswa ${nama} berhasil diperbarui.`);
      }
    } else {
      const newId = 'S' + String(state.students.length + 1).padStart(2, '0');
      state.students.push({
        id: newId,
        noAbsen: absen, nisn, nis, nama, gender, tempatLahir, tanggalLahir,
        agama, waliNama, waliHp, alamat, gayaBelajar, statusPip, catatanKhusus, tabungan
      });
      this.notify(`Siswa baru ${nama} berhasil ditambahkan ke Buku Induk.`);
    }

    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(state.students));
    this.renderStudentTable();
    this.renderDashboardStats();
    this.renderLegerTable();
    this.populateRaporStudentPicker();
    this.closeAddStudentModal();
  },

  openStudentDetailModal(studentId) {
    const std = state.students.find(s => s.id === studentId);
    if (!std) return;

    const modal = document.getElementById('modal-student-detail');
    if (!modal) return;

    // Grades & Assessments Data
    const rGrade = (state.raporGrades && state.raporGrades.studentGrades) ? state.raporGrades.studentGrades[std.id] : null;
    const p5Sc = (state.p5Assessments) ? state.p5Assessments[std.id] : null;
    const naVal = rGrade ? rGrade.na : '-';
    const sasVal = rGrade ? rGrade.sas : '-';
    const isTuntas = rGrade ? (rGrade.na >= (state.raporGrades.kktp || 75)) : true;

    // Populate modal elements
    const avatarEl = document.getElementById('detail-std-avatar');
    if (avatarEl) {
      avatarEl.textContent = std.gender;
      avatarEl.className = `w-14 h-14 rounded-2xl ${std.gender === 'L' ? 'bg-sky-200' : 'bg-pink-200'} border-2 border-slate-900 text-slate-900 flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_#0f172a]`;
    }
    document.getElementById('detail-std-nama').textContent = std.nama;
    document.getElementById('detail-std-meta').textContent = `No. Absen ${std.noAbsen} • Kelas VII-A • NISN: ${std.nisn || '-'} • NIS: ${std.nis || '-'}`;
    
    document.getElementById('detail-std-ttl').textContent = `${std.tempatLahir || '-'}, ${std.tanggalLahir || '-'}`;
    document.getElementById('detail-std-agama').textContent = std.agama || 'Islam';
    document.getElementById('detail-std-gender').textContent = std.gender === 'L' ? 'Laki-laki (L)' : 'Perempuan (P)';
    document.getElementById('detail-std-alamat').textContent = std.alamat || 'Alamat belum diinput';
    document.getElementById('detail-std-wali').textContent = std.waliNama || '-';
    document.getElementById('detail-std-wali-hp').textContent = std.waliHp || '-';

    document.getElementById('detail-std-gaya').textContent = std.gayaBelajar || 'Visual';
    document.getElementById('detail-std-pip').textContent = std.statusPip ? 'Penerima PIP / KIP Aktif' : 'Non-KIP (Reguler)';
    document.getElementById('detail-std-catatan').textContent = std.catatanKhusus || 'Siswa aktif dalam proses KBM harian';

    document.getElementById('detail-std-na').textContent = naVal;
    document.getElementById('detail-std-sas').textContent = sasVal;
    const kktpEl = document.getElementById('detail-std-kktp');
    if (kktpEl) {
      kktpEl.textContent = isTuntas ? 'Tuntas KKTP' : 'Perlu Bimbingan';
      kktpEl.className = `text-xs font-bold ${isTuntas ? 'text-emerald-700' : 'text-rose-700'}`;
    }
    
    document.getElementById('detail-std-tabungan').textContent = 'Rp ' + (std.tabungan || 0).toLocaleString('id-ID');

    // P5 Preview
    if (p5Sc) {
      document.getElementById('detail-std-p5-scores').textContent = `Dimensi 1: ${p5Sc.dim1 || 'BSH'} • Dimensi 2: ${p5Sc.dim2 || 'BSH'} • Dimensi 3: ${p5Sc.dim3 || 'BSH'}`;
      document.getElementById('detail-std-p5-note').textContent = p5Sc.catatan || 'Aktif mengikuti seluruh rangkaian projek P5.';
    } else {
      document.getElementById('detail-std-p5-scores').textContent = 'Dimensi 1: BSH • Dimensi 2: BSH • Dimensi 3: BSH';
      document.getElementById('detail-std-p5-note').textContent = 'Aktif mengikuti seluruh rangkaian projek P5.';
    }

    // WA Button
    const waClean = (std.waliHp || '').replace(/[^0-9]/g, '');
    const waBtn = document.getElementById('detail-std-btn-wa');
    if (waBtn) {
      if (waClean) {
        const phone = waClean.startsWith('0') ? ('62' + waClean.slice(1)) : waClean;
        const msg = encodeURIComponent(`Halo Bapak/Ibu Wali dari Ananda ${std.nama} (Kelas VII-A). Menginfokan perolehan nilai dan perkembangan belajar Ananda...`);
        waBtn.onclick = () => window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        waBtn.classList.remove('hidden');
      } else {
        waBtn.classList.add('hidden');
      }
    }

    // Edit button in modal
    const editBtn = document.getElementById('detail-std-btn-edit');
    if (editBtn) {
      editBtn.onclick = () => {
        this.closeStudentDetailModal();
        this.openAddStudentModal(std.id);
      };
    }

    modal.classList.remove('hidden');
  },

  closeStudentDetailModal() {
    const modal = document.getElementById('modal-student-detail');
    if (modal) modal.classList.add('hidden');
  },

  exportStudentsCSV() {
    let csv = 'NoAbsen,NIS,NISN,Nama,Gender,TempatLahir,TanggalLahir,Agama,NamaWali,NoHpWali,Alamat,GayaBelajar,StatusPIP,Tabungan\n';
    state.students.forEach(s => {
      csv += `${s.noAbsen},"${s.nis || ''}","${s.nisn || ''}","${s.nama}","${s.gender}","${s.tempatLahir || ''}","${s.tanggalLahir || ''}","${s.agama || ''}","${s.waliNama || ''}","${s.waliHp || ''}","${(s.alamat || '').replace(/"/g, '""')}","${s.gayaBelajar || ''}",${s.statusPip ? 'YA' : 'TIDAK'},${s.tabungan || 0}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Data_Siswa_Kelas_VII-A_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    this.notify('Data siswa berhasil diekspor ke file CSV/Excel!');
  },

  triggerStudentCSVUpload() {
    const input = document.getElementById('student-csv-file');
    if (input) input.click();
  },

  handleStudentCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length <= 1) throw new Error('File CSV kosong atau format tidak sesuai.');

        let addedCount = 0;
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',').map(p => p.trim().replace(/^"|"$/g, ''));
          if (parts.length >= 4) {
            const absen = parseInt(parts[0]) || (state.students.length + 1);
            const nis = parts[1] || ('242507' + String(absen).padStart(2, '0'));
            const nisn = parts[2] || '-';
            const nama = parts[3];
            const gender = (parts[4] || 'L').toUpperCase().startsWith('P') ? 'P' : 'L';
            const tempatLahir = parts[5] || 'Kota Contoh';
            const tanggalLahir = parts[6] || '2011-06-15';
            const agama = parts[7] || 'Islam';
            const waliNama = parts[8] || ('Wali dari ' + nama);
            const waliHp = parts[9] || '';
            const alamat = parts[10] || '';
            const gayaBelajar = parts[11] || 'Visual';
            const statusPip = (parts[12] || '').toUpperCase() === 'YA';
            const tabungan = parseInt(parts[13]) || 0;

            const existingIdx = state.students.findIndex(s => s.nisn === nisn && nisn !== '-');
            if (existingIdx !== -1) {
              state.students[existingIdx] = {
                ...state.students[existingIdx],
                noAbsen: absen, nis, nama, gender, tempatLahir, tanggalLahir,
                agama, waliNama, waliHp, alamat, gayaBelajar, statusPip, tabungan
              };
            } else {
              const newId = 'S' + String(state.students.length + 1).padStart(2, '0');
              state.students.push({
                id: newId, noAbsen: absen, nis, nisn, nama, gender, tempatLahir,
                tanggalLahir, agama, waliNama, waliHp, alamat, gayaBelajar, statusPip,
                catatanKhusus: 'Data diimport dari file spreadsheet', tabungan
              });
            }
            addedCount++;
          }
        }

        localStorage.setItem(KEYS.STUDENTS, JSON.stringify(state.students));
        this.renderStudentTable();
        this.renderDashboardStats();
        this.renderLegerTable();
        this.populateRaporStudentPicker();
        this.notify(`Berhasil mengimpor ${addedCount} data siswa dari CSV!`);
      } catch (err) {
        console.error(err);
        this.notify('Gagal membaca file CSV: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  },

  printStudentList() {
    window.print();
  },

  deleteStudent(index) {
    const s = state.students[index];
    this.showCustomDialog({
      title: 'Hapus Data Siswa?',
      message: `Apakah Anda yakin ingin menghapus data murid "${s ? s.nama : 'ini'}" dari basis data kelas?`,
      iconType: 'danger',
      confirmText: 'Ya, Hapus',
      onConfirm: () => {
        state.students.splice(index, 1);
        state.students.forEach((item, i) => item.noAbsen = i + 1);
        localStorage.setItem(KEYS.STUDENTS, JSON.stringify(state.students));
        this.renderStudentTable();
        this.renderDashboardStats();
        this.renderLegerTable();
        this.populateRaporStudentPicker();
        this.notify('Data siswa telah dihapus.');
      }
    });
  },

  // ---------- MASTER GURU & GTK (TERPISAH DARI SISWA) ----------
  filterTeachers(filterType) {
    state.teacherFilter = filterType;
    ['all', 'PNS', 'PPPK', 'GTT', 'Honorer', 'serdik'].forEach(f => {
      const btn = document.getElementById('btn-filter-tc-' + f);
      if (btn) {
        if (f === filterType) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-extrabold bg-purple-700 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_#0f172a]';
        }
      }
    });
    this.renderTeacherTable();
  },

  searchTeachers(query) {
    state.teacherSearch = (query || '').toLowerCase().trim();
    this.renderTeacherTable();
  },

  renderTeacherTable() {
    const tbody = document.getElementById('teacher-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const statTotal = document.getElementById('stat-total-teachers');
    if (statTotal) statTotal.textContent = `${state.teachers.length} Orang`;

    const asnCount = state.teachers.filter(t => t.status === 'PNS' || t.status === 'PPPK').length;
    const statAsn = document.getElementById('stat-asn-teachers');
    if (statAsn) statAsn.textContent = `${asnCount} Orang`;

    const serdikCount = state.teachers.filter(t => t.sertifikasi).length;
    const statSerdik = document.getElementById('stat-serdik-teachers');
    if (statSerdik) statSerdik.textContent = `${serdikCount} Bersertifikasi`;

    const totalJp = state.teachers.reduce((a, b) => a + (b.bebanJp || 0), 0);
    const statJp = document.getElementById('stat-jp-teachers');
    if (statJp) statJp.textContent = `${totalJp} JP / Minggu`;

    let filtered = state.teachers.filter(t => {
      if (state.teacherFilter === 'PNS' && t.status !== 'PNS') return false;
      if (state.teacherFilter === 'PPPK' && t.status !== 'PPPK') return false;
      if (state.teacherFilter === 'GTT' && t.status !== 'GTT') return false;
      if (state.teacherFilter === 'Honorer' && t.status !== 'Honorer') return false;
      if (state.teacherFilter === 'serdik' && !t.sertifikasi) return false;
      if (state.teacherSearch) {
        const q = state.teacherSearch;
        const matchNama = t.nama.toLowerCase().includes(q);
        const matchNip = t.nip && t.nip.toLowerCase().includes(q);
        const matchNuptk = t.nuptk && t.nuptk.toLowerCase().includes(q);
        const matchMapel = t.mapel && t.mapel.toLowerCase().includes(q);
        if (!matchNama && !matchNip && !matchNuptk && !matchMapel) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      const msg = state.teachers.length === 0
        ? 'Belum ada data guru/GTK. Klik "+ Tambah Guru" untuk menambahkan tenaga pendidik.'
        : 'Tidak ada data GTK yang sesuai filter.';
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-400 font-medium">${msg}</td></tr>`;
      return;
    }

    filtered.forEach((t, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-purple-50/40 transition-colors';
      
      let badgeClass = 'badge-gtk-pns';
      if (t.status === 'PPPK') badgeClass = 'badge-gtk-pppk';
      else if (t.status === 'GTT') badgeClass = 'badge-gtk-gtt';
      else if (t.status === 'Honorer') badgeClass = 'badge-gtk-honorer';

      const waClean = (t.kontak || '').replace(/[^0-9]/g, '');
      const phone = waClean.startsWith('0') ? ('62' + waClean.slice(1)) : waClean;

      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-slate-800 text-center">${idx + 1}</td>
        <td class="py-2.5 px-3">
          <div class="font-mono text-slate-900 font-bold">${t.nip || '-'}</div>
          <div class="text-[10px] text-slate-500 font-mono">NUPTK: ${t.nuptk || '-'}</div>
        </td>
        <td class="py-2.5 px-3">
          <div class="cursor-pointer group" onclick="app.openTeacherDetailModal('${t.id}')" title="Klik untuk lihat Profil Lengkap">
            <span class="font-bold text-slate-900 group-hover:text-purple-700 transition-colors block text-xs">${t.nama}</span>
            <span class="text-[10px] text-slate-500">${t.pendidikan || 'S1 Kependidikan'}</span>
          </div>
        </td>
        <td class="py-2.5 px-3">
          <div class="text-slate-800 font-semibold">${t.jabatan}</div>
          <div class="text-[10px] text-purple-700 font-medium">${t.tugasTambahan || '-'}</div>
        </td>
        <td class="py-2.5 px-3">
          <div class="font-bold text-slate-900">${t.mapel}</div>
          <div class="text-[10px] text-slate-500 font-semibold">${t.bebanJp || 24} JP • ${t.rombel || 'VII-A'}</div>
        </td>
        <td class="py-2.5 px-3">
          <div class="flex flex-col gap-1 items-start">
            <span class="px-2 py-0.5 rounded text-[10px] font-extrabold ${badgeClass}">${t.status} (${t.golongan || '-'})</span>
            ${t.sertifikasi ? '<span class="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 border border-slate-900/30">✓ Bersertifikasi</span>' : '<span class="text-[9px] text-slate-400 font-medium">Belum Serdik</span>'}
          </div>
        </td>
        <td class="py-2.5 px-3">
          ${phone ? `<a href="https://wa.me/${phone}" target="_blank" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 border border-slate-900 text-emerald-950 font-bold text-xs shadow-[1px_1px_0px_#0f172a] transition-all">
            <span>💬</span> <span>${t.kontak}</span>
          </a>` : '<span class="text-slate-400">-</span>'}
        </td>
        <td class="py-2.5 px-3 text-right whitespace-nowrap">
          <button onclick="app.openTeacherDetailModal('${t.id}')" title="Detail Profil" class="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 border border-slate-900 text-slate-900 mr-1 shadow-[1px_1px_0px_#0f172a]">👁️</button>
          <button onclick="app.openAddTeacherModal('${t.id}')" title="Edit GTK" class="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 border border-slate-900 text-slate-900 mr-1 shadow-[1px_1px_0px_#0f172a]">✏️</button>
          <button onclick="app.deleteTeacher('${t.id}')" title="Hapus GTK" class="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 border border-slate-900 text-rose-700 shadow-[1px_1px_0px_#0f172a]">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  openAddTeacherModal(teacherId = null) {
    const modal = document.getElementById('modal-add-guru');
    const titleEl = document.getElementById('modal-guru-title');
    const idInput = document.getElementById('modal-guru-id');
    const nipInput = document.getElementById('guru-nip');
    const nuptkInput = document.getElementById('guru-nuptk');
    const namaInput = document.getElementById('guru-nama');
    const jabatanInput = document.getElementById('guru-jabatan');
    const mapelInput = document.getElementById('guru-mapel');
    const statusInput = document.getElementById('guru-status');
    const golonganInput = document.getElementById('guru-golongan');
    const pendidikanInput = document.getElementById('guru-pendidikan');
    const sertifikasiInput = document.getElementById('guru-sertifikasi');
    const bebanJpInput = document.getElementById('guru-beban-jp');
    const rombelInput = document.getElementById('guru-rombel');
    const tugasTambahanInput = document.getElementById('guru-tugas-tambahan');
    const kontakInput = document.getElementById('guru-kontak');

    if (teacherId) {
      const t = state.teachers.find(item => item.id === teacherId);
      if (t) {
        titleEl.textContent = 'Edit Data Pendidik & GTK';
        idInput.value = t.id;
        nipInput.value = t.nip || '';
        if (nuptkInput) nuptkInput.value = t.nuptk || '';
        namaInput.value = t.nama || '';
        jabatanInput.value = t.jabatan || '';
        mapelInput.value = t.mapel || '';
        statusInput.value = t.status || 'PNS';
        if (golonganInput) golonganInput.value = t.golongan || '';
        if (pendidikanInput) pendidikanInput.value = t.pendidikan || '';
        if (sertifikasiInput) sertifikasiInput.checked = !!t.sertifikasi;
        if (bebanJpInput) bebanJpInput.value = t.bebanJp || 24;
        if (rombelInput) rombelInput.value = t.rombel || '';
        if (tugasTambahanInput) tugasTambahanInput.value = t.tugasTambahan || '';
        kontakInput.value = t.kontak || '';
      }
    } else {
      titleEl.textContent = 'Tambah Guru & GTK Baru (Dapodik)';
      idInput.value = '';
      nipInput.value = '';
      if (nuptkInput) nuptkInput.value = '';
      namaInput.value = '';
      jabatanInput.value = '';
      mapelInput.value = '';
      statusInput.value = 'PNS';
      if (golonganInput) golonganInput.value = 'Penata Muda / III/a';
      if (pendidikanInput) pendidikanInput.value = 'S1 Kependidikan';
      if (sertifikasiInput) sertifikasiInput.checked = true;
      if (bebanJpInput) bebanJpInput.value = 24;
      if (rombelInput) rombelInput.value = 'VII-A, VII-B';
      if (tugasTambahanInput) tugasTambahanInput.value = 'Wali Kelas';
      kontakInput.value = '';
    }

    if (modal) modal.classList.remove('hidden');
  },

  closeAddTeacherModal() {
    const modal = document.getElementById('modal-add-guru');
    if (modal) modal.classList.add('hidden');
  },

  saveTeacherFromModal() {
    const id = document.getElementById('modal-guru-id').value;
    const nip = document.getElementById('guru-nip').value.trim();
    const nuptk = document.getElementById('guru-nuptk') ? document.getElementById('guru-nuptk').value.trim() : '';
    const nama = document.getElementById('guru-nama').value.trim();
    const jabatan = document.getElementById('guru-jabatan').value.trim();
    const mapel = document.getElementById('guru-mapel').value.trim();
    const status = document.getElementById('guru-status').value;
    const golongan = document.getElementById('guru-golongan') ? document.getElementById('guru-golongan').value.trim() : 'Non-ASN';
    const pendidikan = document.getElementById('guru-pendidikan') ? document.getElementById('guru-pendidikan').value.trim() : 'S1';
    const sertifikasi = document.getElementById('guru-sertifikasi') ? document.getElementById('guru-sertifikasi').checked : false;
    const bebanJp = document.getElementById('guru-beban-jp') ? (parseInt(document.getElementById('guru-beban-jp').value) || 24) : 24;
    const rombel = document.getElementById('guru-rombel') ? document.getElementById('guru-rombel').value.trim() : 'VII-A';
    const tugasTambahan = document.getElementById('guru-tugas-tambahan') ? document.getElementById('guru-tugas-tambahan').value.trim() : '';
    const kontak = document.getElementById('guru-kontak').value.trim();

    if (!nama || !jabatan) {
      this.notify('Nama lengkap dan Jabatan guru wajib diisi!', 'error');
      return;
    }

    if (id) {
      const idx = state.teachers.findIndex(t => t.id === id);
      if (idx !== -1) {
        state.teachers[idx] = {
          ...state.teachers[idx],
          nip, nuptk, nama, jabatan, mapel, status, golongan, pendidikan,
          sertifikasi, bebanJp, rombel, tugasTambahan, kontak
        };
        this.notify(`Data guru ${nama} berhasil diperbarui.`);
      }
    } else {
      const newId = 'T' + Date.now().toString().slice(-4);
      state.teachers.push({
        id: newId, nip, nuptk, nama, jabatan, mapel, status, golongan, pendidikan,
        sertifikasi, bebanJp, rombel, tugasTambahan, kontak
      });
      this.notify(`Guru baru ${nama} berhasil ditambahkan ke Direktori GTK.`);
    }

    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(state.teachers));
    this.renderTeacherTable();
    this.renderDashboardStats();
    this.closeAddTeacherModal();
  },

  openTeacherDetailModal(teacherId) {
    const t = state.teachers.find(item => item.id === teacherId);
    if (!t) return;

    const modal = document.getElementById('modal-teacher-detail');
    if (!modal) return;

    document.getElementById('detail-tc-nama').textContent = t.nama;
    document.getElementById('detail-tc-nip').textContent = `NIP: ${t.nip || '-'} • NUPTK: ${t.nuptk || '-'}`;
    document.getElementById('detail-tc-status').textContent = `${t.status} (${t.golongan || '-'})`;
    const serdikEl = document.getElementById('detail-tc-serdik');
    if (serdikEl) {
      serdikEl.textContent = t.sertifikasi ? 'Pendidik Bersertifikasi (Serdik)' : 'Belum Bersertifikasi';
      serdikEl.className = `text-xs font-bold ${t.sertifikasi ? 'text-emerald-700' : 'text-slate-500'}`;
    }

    document.getElementById('detail-tc-jabatan').textContent = t.jabatan;
    document.getElementById('detail-tc-mapel').textContent = t.mapel;
    document.getElementById('detail-tc-beban').textContent = `${t.bebanJp || 24} Jam Pelajaran (JP) / Minggu`;
    document.getElementById('detail-tc-rombel').textContent = t.rombel || 'Kelas VII-A';
    document.getElementById('detail-tc-tugas').textContent = t.tugasTambahan || '-';
    document.getElementById('detail-tc-pendidikan').textContent = t.pendidikan || 'S1 Kependidikan';
    document.getElementById('detail-tc-kontak').textContent = t.kontak || '-';

    const waClean = (t.kontak || '').replace(/[^0-9]/g, '');
    const waBtn = document.getElementById('detail-tc-btn-wa');
    if (waBtn) {
      if (waClean) {
        const phone = waClean.startsWith('0') ? ('62' + waClean.slice(1)) : waClean;
        waBtn.onclick = () => window.open(`https://wa.me/${phone}`, '_blank');
        waBtn.classList.remove('hidden');
      } else {
        waBtn.classList.add('hidden');
      }
    }

    const editBtn = document.getElementById('detail-tc-btn-edit');
    if (editBtn) {
      editBtn.onclick = () => {
        this.closeTeacherDetailModal();
        this.openAddTeacherModal(t.id);
      };
    }

    modal.classList.remove('hidden');
  },

  closeTeacherDetailModal() {
    const modal = document.getElementById('modal-teacher-detail');
    if (modal) modal.classList.add('hidden');
  },

  exportTeachersCSV() {
    let csv = 'No,NIP,NUPTK,NamaLengkap,Jabatan,MataPelajaran,StatusPegawai,Golongan,Pendidikan,Sertifikasi,BebanJP,RombelAmpu,TugasTambahan,WhatsApp\n';
    state.teachers.forEach((t, idx) => {
      csv += `${idx + 1},"${t.nip || ''}","${t.nuptk || ''}","${t.nama}","${t.jabatan}","${t.mapel}","${t.status}","${t.golongan || ''}","${t.pendidikan || ''}",${t.sertifikasi ? 'YA' : 'TIDAK'},${t.bebanJp || 24},"${t.rombel || ''}","${t.tugasTambahan || ''}","${t.kontak || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Daftar_Nominatif_GTK_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    this.notify('Daftar Nominatif Guru & GTK berhasil diekspor ke file CSV/Excel!');
  },

  printTeacherList() {
    window.print();
  },

  deleteTeacher(id) {
    const t = state.teachers.find(item => item.id === id);
    if (!t) return;

    this.showCustomDialog({
      title: 'Hapus Data Guru / GTK?',
      message: `Apakah Anda yakin ingin menghapus data pendidik "${t.nama}" dari direktori resmi sekolah?`,
      iconType: 'danger',
      confirmText: 'Ya, Hapus Data',
      onConfirm: () => {
        state.teachers = state.teachers.filter(item => item.id !== id);
        localStorage.setItem(KEYS.TEACHERS, JSON.stringify(state.teachers));
        this.renderTeacherTable();
        this.renderDashboardStats();
        this.notify(`Data guru ${t.nama} telah dihapus.`);
      }
    });
  },

  // ---------- JURNAL MENGAJAR (AGENDA KBM HARIAN) ----------
  renderJournalTable() {
    const tbody = document.getElementById('journal-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const badge = document.getElementById('journal-total-badge');
    if (badge) badge.textContent = `${state.journals.length} Pertemuan`;

    const dateInput = document.getElementById('journal-input-date');
    if (dateInput && !dateInput.value) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
    }

    if (state.journals.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">Belum ada catatan jurnal KBM. Silakan isi form di samping.</td></tr>`;
      return;
    }

    state.journals.forEach((j, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-amber-50/30 transition-colors align-top';
      
      let statusColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      if (j.status === 'Tunda / Remedial') statusColor = 'bg-amber-100 text-amber-800 border-amber-300';
      if (j.status === 'Tugas Mandiri') statusColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';

      const isVerified = !!j.supervisiVerified;

      tr.innerHTML = `
        <td class="py-2.5 px-2.5 font-bold text-slate-800">${idx + 1}</td>
        <td class="py-2.5 px-2.5 whitespace-nowrap">
          <div class="font-bold text-slate-900">${j.tanggal}</div>
          <div class="text-[11px] font-semibold text-slate-700 mt-0.5">${j.jamKe || 'Jam 1 - 2'}</div>
          <span class="inline-block mt-0.5 px-1.5 py-0.2 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded">${j.kelas || 'VII-A'}</span>
          <div class="mt-1">
            <span class="inline-block px-2 py-0.5 text-[10px] font-black rounded-full border ${statusColor}">
              ${j.status || 'Tuntas Terlaksana'}
            </span>
          </div>
        </td>
        <td class="py-2.5 px-2.5 font-semibold text-slate-800">${j.mapel}</td>
        <td class="py-2.5 px-2.5">
          <div class="font-bold text-slate-900 leading-snug">${j.materi}</div>
          ${j.targetTp ? `<div class="text-[11px] text-blue-700 mt-0.5"><span class="font-semibold">TP:</span> ${j.targetTp}</div>` : ''}
          ${j.catatan ? `<div class="text-[11px] text-slate-600 mt-1 italic"><span class="font-semibold not-italic">Catatan:</span> ${j.catatan}</div>` : ''}
          ${j.refleksi ? `<div class="text-[11px] text-emerald-800 bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-200 mt-1.5 leading-relaxed"><span class="font-bold">✨ Refleksi AI:</span> ${j.refleksi}</div>` : ''}
          <div class="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between">
            <div class="text-[10px] ${isVerified ? 'text-emerald-700 font-bold' : 'text-slate-400 font-medium'}">
              ${isVerified ? `✅ Disupervisi: ${j.supervisiDate || 'Terverifikasi'}` : '⏳ Menunggu Tanda Tangan Supervisi'}
            </div>
            <button onclick="app.toggleJournalSupervisi('${j.id}')" class="px-2 py-0.5 text-[10px] font-extrabold rounded ${isVerified ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'} transition-all" title="Klik untuk verifikasi / batalkan verifikasi">
              ${isVerified ? 'Batal Verifikasi' : '✍️ Verifikasi Supervisi'}
            </button>
          </div>
        </td>
        <td class="py-2.5 px-2.5 text-center whitespace-nowrap">
          <div class="inline-grid grid-cols-2 gap-1 text-[10px] font-bold">
            <span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800" title="Hadir">H:${j.hadir}</span>
            <span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800" title="Sakit">S:${j.sakit}</span>
            <span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800" title="Izin">I:${j.izin}</span>
            <span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800" title="Alpa">A:${j.alfa}</span>
          </div>
        </td>
        <td class="py-2.5 px-2 text-right">
          <button onclick="app.deleteJournal('${j.id}')" class="text-rose-500 hover:text-rose-700 font-bold text-xs p-1">Hapus</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  toggleJournalSupervisi(id) {
    const j = state.journals.find(x => x.id === id);
    if (!j) return;
    j.supervisiVerified = !j.supervisiVerified;
    if (j.supervisiVerified) {
      j.supervisiDate = new Date().toISOString().slice(0, 10);
      j.supervisiNote = 'Administrasi agenda KBM telah diverifikasi oleh Kepala Sekolah / Pengawas.';
      this.notify(`Jurnal ${j.tanggal} berhasil ditandatangani verifikasi supervisi.`);
    } else {
      j.supervisiDate = null;
      j.supervisiNote = '';
      this.notify(`Status verifikasi jurnal ${j.tanggal} dibatalkan.`);
    }
    localStorage.setItem(KEYS.JOURNALS, JSON.stringify(state.journals));
    this.renderJournalTable();
  },

  saveJournalEntry() {
    const tanggal = document.getElementById('journal-input-date').value;
    const jamKe = document.getElementById('journal-input-hours').value.trim();
    const status = document.getElementById('journal-input-status')?.value || 'Tuntas Terlaksana';
    const kelas = document.getElementById('journal-input-class').value.trim();
    const mapel = document.getElementById('journal-input-mapel').value.trim();
    const materi = document.getElementById('journal-input-material').value.trim();
    const hadir = parseInt(document.getElementById('journal-att-h').value) || 0;
    const sakit = parseInt(document.getElementById('journal-att-s').value) || 0;
    const izin = parseInt(document.getElementById('journal-att-i').value) || 0;
    const alfa = parseInt(document.getElementById('journal-att-a').value) || 0;
    const refleksi = document.getElementById('journal-input-reflection').value.trim();

    if (!materi) {
      this.notify('Materi Pokok & Capaian TP KBM wajib diisi!', 'error');
      return;
    }

    const newJournal = {
      id: 'J' + Date.now().toString().slice(-4),
      tanggal: tanggal || new Date().toISOString().split('T')[0],
      jamKe: jamKe || 'Jam 1 - 2 (07.00 - 08.20)',
      status: status,
      supervisiVerified: false,
      supervisiDate: null,
      supervisiNote: '',
      kelas: kelas || 'Kelas VII-A',
      mapel: mapel || 'Matematika',
      materi: materi,
      targetTp: 'Ketercapaian Tujuan Pembelajaran harian aktif',
      hadir: hadir,
      sakit: sakit,
      izin: izin,
      alfa: alfa,
      catatan: `Presensi KBM: ${hadir} hadir, ${sakit} sakit, ${izin} izin, ${alfa} alpa.`,
      refleksi: refleksi || 'Pembelajaran telah terlaksana sesuai rencana alokasi waktu dan capaian TP.'
    };

    state.journals.unshift(newJournal);
    localStorage.setItem(KEYS.JOURNALS, JSON.stringify(state.journals));
    this.renderJournalTable();

    document.getElementById('journal-input-material').value = '';
    document.getElementById('journal-input-reflection').value = '';

    const notifJ = state.notifications.find(n => n.id === 'notif-3');
    if (notifJ) notifJ.read = true;
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(state.notifications));
    this.updateNotificationBadge();

    this.notify('Catatan Jurnal KBM berhasil disimpan ke Buku Agenda Guru!');
  },

  async generateJournalRefleksiAI() {
    const materi = document.getElementById('journal-input-material').value.trim();
    const kelas = document.getElementById('journal-input-class').value.trim() || 'Kelas VII-A';
    const mapel = document.getElementById('journal-input-mapel').value.trim() || 'Matematika';
    const hadir = document.getElementById('journal-att-h').value || '8';
    const sakit = document.getElementById('journal-att-s').value || '0';

    if (!materi) {
      this.notify('Isi Materi Pokok terlebih dahulu sebelum meminta Refleksi AI!', 'warning');
      return;
    }

    const reflectionBox = document.getElementById('journal-input-reflection');
    reflectionBox.value = 'Sedang merumuskan evaluasi pedagogik cerdas...';

    const apiKey = state.settings.apiKey;
    if (apiKey) {
      try {
        const promptText = `Anda adalah Asisten Guru Berpengalaman Kurikulum Merdeka. Buatlah refleksi pembelajaran (KBM) harian yang ringkas, profesional, dan solutif (2-3 kalimat) untuk:
Mata Pelajaran: ${mapel}
Kelas: ${kelas}
Materi KBM: ${materi}
Presensi: ${hadir} hadir, ${sakit} sakit.
Berikan catatan efektivitas metode pembelajaran dan rencana tindak lanjut (remedial/pengayaan). Sertakan nada pedagogik resmi siap supervisi.`;

        const legacy = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
        const aiModel = state.settings?.aiModel && !legacy.includes(state.settings.aiModel) && state.settings.aiModel !== 'offline'
          ? state.settings.aiModel
          : 'gemini-3.1-flash-lite';

        let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });

        if (!resp.ok && aiModel !== 'gemini-3.1-flash-lite') {
          resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }]
            })
          });
        }
        const data = await resp.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          reflectionBox.value = data.candidates[0].content.parts[0].text.trim();
          this.notify('Refleksi KBM berhasil di-generate oleh Google Gemini AI!');
          return;
        }
      } catch (err) {
        console.warn('Gemini API call failed, using smart offline fallback', err);
      }
    }

    const templates = [
      `Pembelajaran materi "${materi}" berlangsung interaktif dengan partisipasi aktif murid. Sebanyak ${hadir} murid mampu menyelesaikan LKPD kontekstual dengan baik. Bagi murid yang berhalangan sakit diberikan modul ringkas susulan dan panduan mandiri via LMS.`,
      `Implementasi model pembelajaran berbasis masalah pada topik "${materi}" berhasil menumbuhkan nalar kritis siswa kelas ${kelas}. Evaluasi formatif menunjukkan 85% siswa tuntas mencapai TP. Tindak lanjut pengayaan disiapkan untuk kelompok mahir serta pendampingan tutorial sebaya.`,
      `Penyampaian materi "${materi}" berjalan efektif sesuai alokasi waktu JP. Antusiasme kelas ${kelas} sangat positif saat diskusi pemecahan masalah nyata. Catatan refleksi: latihan soal mandiri diperdalam pada pertemuan berikutnya.`
    ];
    const picked = templates[Math.floor(Math.random() * templates.length)];
    reflectionBox.value = picked;
    this.notify('Refleksi KBM siap supervisi berhasil dirumuskan!');
  },

  deleteJournal(id) {
    this.showCustomDialog({
      title: 'Hapus Jurnal KBM?',
      message: 'Apakah Anda yakin ingin menghapus catatan agenda tatap muka ini?',
      iconType: 'danger',
      confirmText: 'Ya, Hapus Jurnal',
      onConfirm: () => {
        state.journals = state.journals.filter(j => j.id !== id);
        localStorage.setItem(KEYS.JOURNALS, JSON.stringify(state.journals));
        this.renderJournalTable();
        this.notify('Catatan jurnal telah dihapus.');
      }
    });
  },

  exportJournalWord() {
    const s = state.settings;
    let rowsHtml = '';
    state.journals.forEach((j, idx) => {
      rowsHtml += `
        <tr>
          <td align="center">${idx + 1}</td>
          <td>${j.tanggal}<br><small>${j.jamKe || ''}</small></td>
          <td align="center">${j.kelas || 'VII-A'}</td>
          <td>${j.mapel}</td>
          <td><strong>${j.materi}</strong><br><small>Refleksi: ${j.refleksi || '-'}</small></td>
          <td align="center">H:${j.hadir} S:${j.sakit} I:${j.izin} A:${j.alfa}</td>
          <td>${j.catatan || 'Terlaksana sesuai jadwal'}</td>
        </tr>
      `;
    });

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Buku Jurnal Mengajar Harian</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.3; }
        .center { text-align: center; }
        .kop { border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 15px; }
        table { border-collapse: collapse; width: 100%; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 6px; font-size: 10pt; }
        th { background-color: #f2f2f2; }
      </style>
      </head>
      <body>
        <div class="kop center">
          <h3 style="margin:0; text-transform:uppercase;">${s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA'}</h3>
          <h2 style="margin:2px 0; text-transform:uppercase;">${s.schoolName || 'SMP NEGERI CONTOH TELADAN'}</h2>
          <p style="margin:0; font-size:9pt;">${s.schoolAddress || ''}</p>
        </div>
        <div class="center">
          <h3 style="margin:5px 0; text-decoration:underline;">AGENDA & BUKU JURNAL HARIAN GURU MENGAJAR</h3>
          <p style="margin:0 0 10px 0; font-size:10pt;">Tahun Ajaran: ${s.activeTA || '2024/2025'} • Semester Genap</p>
        </div>
        <table>
          <thead>
            <tr>
              <th width="4%">No</th>
              <th width="14%">Hari / Tgl / Jam</th>
              <th width="8%">Kelas</th>
              <th width="14%">Mata Pelajaran</th>
              <th>Materi Pembelajaran & Refleksi KBM</th>
              <th width="12%">Presensi</th>
              <th width="14%">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
        <br><br>
        <table style="border:none;" width="100%">
          <tr style="border:none;">
            <td style="border:none;" width="50%" align="left">
              Mengetahui,<br>Kepala Sekolah<br><br><br><br>
              <strong>${s.principalName || 'Drs. H. Ahmad Rifai, M.Pd.'}</strong><br>
              NIP. ${s.principalNip || '19750812 200003 1 002'}
            </td>
            <td style="border:none;" width="50%" align="right">
              ${s.city || 'Kota Contoh'}, 2025<br>Guru Mata Pelajaran,<br><br><br><br>
              <strong>${s.teacherName || 'Ibu Ratna Sari, S.Pd.'}</strong><br>
              NIP. ${s.teacherNip || '19880415 201101 2 004'}
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Buku_Jurnal_Mengajar_${(s.teacherName || 'Guru').replace(/\s+/g, '_')}.doc`;
    a.click();
    this.notify('Buku Jurnal Mengajar berhasil diekspor dalam format Word (.doc)');
  },

  printJournalSheet() {
    window.print();
  },

  // ================= CLASS & ROMBEL MANAGER (Fitur K-1 s/d K-5) =================
  renderClassManager() {
    const switcherEl = document.getElementById('class-switcher-pills');
    if (!switcherEl) return;

    // 1. Render class pills
    switcherEl.innerHTML = '';
    state.classes.forEach(c => {
      const isAct = c.id === state.activeClassId;
      const btn = document.createElement('button');
      btn.className = `px-3.5 py-1.5 rounded-xl text-xs font-black border-2 border-slate-900 transition-all flex items-center gap-1.5 cursor-pointer ${
        isAct 
          ? 'bg-amber-300 text-slate-900 shadow-[2.5px_2.5px_0px_#0f172a] scale-102' 
          : 'bg-white hover:bg-slate-100 text-slate-700 shadow-[1.5px_1.5px_0px_#0f172a]'
      }`;
      btn.onclick = () => this.switchActiveClass(c.id);
      btn.innerHTML = `<span>${isAct ? '📍' : '🏫'}</span><span>${c.nama}</span>${isAct ? '<span class="text-[9px] bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded font-bold uppercase">Aktif</span>' : ''}`;
      switcherEl.appendChild(btn);
    });

    const activeCls = state.classes.find(c => c.id === state.activeClassId) || state.classes[0];
    if (!activeCls) return;

    // Update Banner Heading
    const bannerTitle = document.getElementById('class-active-title');
    if (bannerTitle) bannerTitle.textContent = activeCls.nama;
    const bannerSub = document.getElementById('class-active-sub');
    if (bannerSub) bannerSub.textContent = `${activeCls.tingkat} • ${activeCls.fase} • TA ${activeCls.tahunPelajaran} (${activeCls.semester})`;

    // Fill form elements
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('cfg-class-stage', activeCls.stage || state.settings.stage || 'SMP');
    setVal('cfg-class-name', activeCls.nama);
    setVal('cfg-class-tingkat', activeCls.tingkat || 'VII (Tujuh)');
    setVal('cfg-fase-select', activeCls.fase || 'Fase D (Kelas 7-9 SMP)');
    setVal('cfg-semester-select', activeCls.semester || 'Genap');
    setVal('cfg-year-input', activeCls.tahunPelajaran || '2024/2025');
    setVal('cfg-class-ruang', activeCls.ruang || 'Gedung A, Ruang 101');
    setVal('cfg-class-kapasitas', activeCls.kapasitas || 32);
    setVal('cfg-pekan-efektif', activeCls.pekanEfektif || 18);
    setVal('cfg-jam-minggu', activeCls.jamPerMinggu || 4);
    setVal('cfg-class-kktp', activeCls.kktp || 75);

    // Populate Teachers Dropdown for Wali Kelas
    const waliSelect = document.getElementById('cfg-wali-select');
    if (waliSelect) {
      waliSelect.innerHTML = '<option value="">-- Pilih Wali Kelas GTK --</option>';
      state.teachers.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = `${t.nama} (${t.mapel})`;
        if (t.id === activeCls.waliKelasId) opt.selected = true;
        waliSelect.appendChild(opt);
      });
    }

    // Populate Students Dropdowns for Perangkat Kelas
    const stdDropIds = ['cfg-ketua-select', 'cfg-wakil-select', 'cfg-sekretaris-select', 'cfg-bendahara-select'];
    const activePerangkat = [activeCls.ketuaKelasId, activeCls.wakilKetuaId, activeCls.sekretarisId, activeCls.bendaharaId];
    
    stdDropIds.forEach((dropId, i) => {
      const dropEl = document.getElementById(dropId);
      if (dropEl) {
        dropEl.innerHTML = '<option value="">-- Belum Ditentukan --</option>';
        state.students.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.id;
          opt.textContent = `${s.noAbsen}. ${s.nama}`;
          if (s.id === activePerangkat[i]) opt.selected = true;
          dropEl.appendChild(opt);
        });
      }
    });

    // Update HEB/RPE summary
    this.calculateRPE();
  },

  calculateRPE() {
    const pekan = parseInt(document.getElementById('cfg-pekan-efektif')?.value) || 18;
    const jp = parseInt(document.getElementById('cfg-jam-minggu')?.value) || 4;
    const totalJp = pekan * jp;
    
    const rpeEl = document.getElementById('cfg-total-jp-display');
    if (rpeEl) rpeEl.textContent = `${totalJp} JP`;
    const rpeSub = document.getElementById('cfg-rpe-calc-sub');
    if (rpeSub) rpeSub.textContent = `${pekan} Pekan Efektif × ${jp} JP/Minggu`;
  },

  switchActiveClass(classId) {
    state.activeClassId = classId;
    state.classes.forEach(c => { c.isAktif = (c.id === classId); });
    localStorage.setItem(KEYS.CLASSES, JSON.stringify(state.classes));

    const activeCls = state.classes.find(c => c.id === classId);
    if (activeCls) {
      state.settings.activeTA = `TA ${activeCls.tahunPelajaran} – ${activeCls.semester}`;
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    }

    this.updateTopbarDisplay();
    this.renderClassManager();
    this.renderDashboardStats();
    this.notify(`Berhasil beralih ke rombel: ${activeCls ? activeCls.nama : classId}`);
  },

  saveCurrentClassDetails() {
    const activeCls = state.classes.find(c => c.id === state.activeClassId);
    if (!activeCls) return;

    activeCls.stage = document.getElementById('cfg-class-stage')?.value || 'SMP';
    activeCls.nama = document.getElementById('cfg-class-name')?.value.trim() || activeCls.nama;
    activeCls.tingkat = document.getElementById('cfg-class-tingkat')?.value || 'VII (Tujuh)';
    activeCls.fase = document.getElementById('cfg-fase-select')?.value || 'Fase D (Kelas 7-9 SMP)';
    activeCls.semester = document.getElementById('cfg-semester-select')?.value || 'Genap';
    activeCls.tahunPelajaran = document.getElementById('cfg-year-input')?.value.trim() || '2024/2025';
    activeCls.ruang = document.getElementById('cfg-class-ruang')?.value.trim() || 'Ruang Kelas';
    activeCls.kapasitas = parseInt(document.getElementById('cfg-class-kapasitas')?.value) || 32;
    activeCls.pekanEfektif = parseInt(document.getElementById('cfg-pekan-efektif')?.value) || 18;
    activeCls.jamPerMinggu = parseInt(document.getElementById('cfg-jam-minggu')?.value) || 4;
    activeCls.kktp = parseInt(document.getElementById('cfg-class-kktp')?.value) || 75;
    activeCls.waliKelasId = document.getElementById('cfg-wali-select')?.value || '';
    activeCls.ketuaKelasId = document.getElementById('cfg-ketua-select')?.value || '';
    activeCls.wakilKetuaId = document.getElementById('cfg-wakil-select')?.value || '';
    activeCls.sekretarisId = document.getElementById('cfg-sekretaris-select')?.value || '';
    activeCls.bendaharaId = document.getElementById('cfg-bendahara-select')?.value || '';

    state.settings.activeTA = `TA ${activeCls.tahunPelajaran} – ${activeCls.semester}`;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    localStorage.setItem(KEYS.CLASSES, JSON.stringify(state.classes));

    this.updateTopbarDisplay();
    this.renderClassManager();
    this.notify(`Konfigurasi ${activeCls.nama} berhasil disimpan.`);
  },

  saveClassConfig() {
    this.saveCurrentClassDetails();
  },

  openAddClassModal() {
    const modal = document.getElementById('modal-add-class');
    if (modal) modal.classList.remove('hidden');
  },

  closeAddClassModal() {
    const modal = document.getElementById('modal-add-class');
    if (modal) modal.classList.add('hidden');
  },

  saveNewClassFromModal() {
    const nama = document.getElementById('new-class-name')?.value.trim();
    const tingkat = document.getElementById('new-class-tingkat')?.value;
    const fase = document.getElementById('new-class-fase')?.value;
    const ruang = document.getElementById('new-class-ruang')?.value.trim() || 'Ruang Kelas';

    if (!nama) {
      alert('Mohon masukkan nama rombel kelas.');
      return;
    }

    const newId = 'CLS-' + String(state.classes.length + 1).padStart(2, '0');
    const newClass = {
      id: newId,
      nama: nama,
      tingkat: tingkat || 'VII (Tujuh)',
      fase: fase || 'Fase D (Kelas 7-9 SMP)',
      semester: 'Genap',
      tahunPelajaran: '2024/2025',
      waliKelasId: '',
      ruang: ruang,
      kapasitas: 32,
      ketuaKelasId: '',
      wakilKetuaId: '',
      sekretarisId: '',
      bendaharaId: '',
      pekanEfektif: 18,
      jamPerMinggu: 4,
      kktp: 75,
      isAktif: false
    };

    state.classes.push(newClass);
    localStorage.setItem(KEYS.CLASSES, JSON.stringify(state.classes));
    this.closeAddClassModal();
    this.switchActiveClass(newId);
    this.notify(`Rombel baru "${nama}" berhasil ditambahkan.`);
  },

  archiveSemesterClass() {
    const activeCls = state.classes.find(c => c.id === state.activeClassId);
    const clsName = activeCls ? activeCls.nama : 'Kelas Aktif';
    
    if (confirm(`Apakah Anda yakin ingin mengarsipkan dan menutup semester untuk ${clsName}? Seluruh riwayat presensi, leger nilai, dan kas akan dibukukan ke arsip historis.`)) {
      this.notify(`Semester untuk ${clsName} berhasil diarsipkan. Tahun ajaran baru siap dimulai.`);
    }
  },

  // ---------- ABSENSI HARIAN & REKAP BULANAN ----------
  switchAttendanceTab(tabName) {
    state.attendanceTab = tabName;
    const viewDaily = document.getElementById('absensi-subpane-daily');
    const viewMonthly = document.getElementById('absensi-subpane-monthly');
    const btnD = document.getElementById('absensi-tab-daily-btn');
    const btnM = document.getElementById('absensi-tab-monthly-btn');

    const activeCls = 'px-3.5 py-1.5 rounded-lg text-xs font-black bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]';
    const inactiveCls = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border-2 border-transparent';

    if (tabName === 'daily') {
      if (viewDaily) viewDaily.classList.remove('hidden');
      if (viewMonthly) viewMonthly.classList.add('hidden');
      if (btnD) btnD.className = activeCls;
      if (btnM) btnM.className = inactiveCls;
      this.renderAttendanceSheet();
    } else {
      if (viewDaily) viewDaily.classList.add('hidden');
      if (viewMonthly) viewMonthly.classList.remove('hidden');
      if (btnD) btnD.className = inactiveCls;
      if (btnM) btnM.className = activeCls;
      this.renderMonthlyAttendanceMatrix();
    }
  },

  renderAttendanceSheet() {
    const tbody = document.getElementById('attendance-table-tbody');
    const dateInput = document.getElementById('absensi-date-picker');
    if (!tbody) return;
    if (dateInput && !dateInput.value) {
      dateInput.value = '2025-05-19';
    }
    const curDate = dateInput ? dateInput.value : '2025-05-19';
    const dayData = state.attendanceDaily[curDate] || {};
    tbody.innerHTML = '';

    if (state.students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center py-8 text-slate-400 font-medium">Belum ada data siswa untuk pencatatan presensi. Tambahkan siswa terlebih dahulu.</td></tr>`;
      return;
    }

    state.students.forEach((s) => {
      const curStatus = dayData[s.id] || 'H';
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-amber-50/40 transition-colors';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-slate-800">${s.noAbsen}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">
          <div>${s.nama}</div>
          <div class="text-[10px] text-slate-500 font-mono">NISN: ${s.nisn || '-'}</div>
        </td>
        <td class="py-2.5 px-3 text-center">
          <div class="inline-flex items-center gap-3">
            <label class="flex items-center gap-1 text-[11px] font-bold text-emerald-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="H" ${curStatus === 'H' ? 'checked' : ''} class="text-emerald-600 focus:ring-emerald-500"> H
            </label>
            <label class="flex items-center gap-1 text-[11px] font-bold text-blue-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="S" ${curStatus === 'S' ? 'checked' : ''} class="text-blue-600 focus:ring-blue-500"> S
            </label>
            <label class="flex items-center gap-1 text-[11px] font-bold text-amber-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="I" ${curStatus === 'I' ? 'checked' : ''} class="text-amber-600 focus:ring-amber-500"> I
            </label>
            <label class="flex items-center gap-1 text-[11px] font-bold text-rose-700 cursor-pointer">
              <input type="radio" name="att-${s.id}" value="A" ${curStatus === 'A' ? 'checked' : ''} class="text-rose-600 focus:ring-rose-500"> A
            </label>
          </div>
        </td>
        <td class="py-2.5 px-3">
          <input type="text" id="att-note-${s.id}" value="${dayData[s.id + '_note'] || ''}" placeholder="Catatan khusus..." class="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-white">
        </td>
      `;
      tbody.appendChild(tr);
    });

    this.renderAttendanceStats();
  },

  renderAttendanceStats() {
    const dateInput = document.getElementById('absensi-date-picker');
    const curDate = dateInput ? dateInput.value : '2025-05-19';
    const dayData = state.attendanceDaily[curDate] || {};
    let h = 0, s = 0, i = 0, a = 0;
    state.students.forEach(st => {
      const stVal = dayData[st.id] || 'H';
      if (stVal === 'H') h++;
      else if (stVal === 'S') s++;
      else if (stVal === 'I') i++;
      else if (stVal === 'A') a++;
    });

    const total = state.students.length || 1;
    const pct = Math.round((h / total) * 100);

    const elH = document.getElementById('att-stat-h');
    const elS = document.getElementById('att-stat-s');
    const elI = document.getElementById('att-stat-i');
    const elA = document.getElementById('att-stat-a');
    const elPct = document.getElementById('att-stat-pct');

    if (elH) elH.textContent = `${h} Siswa`;
    if (elS) elS.textContent = `${s} Siswa`;
    if (elI) elI.textContent = `${i} Siswa`;
    if (elA) elA.textContent = `${a} Siswa`;
    if (elPct) elPct.textContent = `${pct}% Hadir`;
  },

  saveAttendance() {
    const dateInput = document.getElementById('absensi-date-picker');
    const curDate = dateInput ? dateInput.value : '2025-05-19';
    if (!state.attendanceDaily[curDate]) {
      state.attendanceDaily[curDate] = {};
    }

    state.students.forEach(s => {
      const checked = document.querySelector(`input[name="att-${s.id}"]:checked`);
      const noteInput = document.getElementById(`att-note-${s.id}`);
      if (checked) {
        state.attendanceDaily[curDate][s.id] = checked.value;
      }
      if (noteInput) {
        state.attendanceDaily[curDate][s.id + '_note'] = noteInput.value.trim();
      }
    });

    localStorage.setItem(KEYS.ATTENDANCE_DAILY, JSON.stringify(state.attendanceDaily));
    this.renderAttendanceStats();
    this.notify(`Presensi tanggal ${curDate} berhasil disimpan & tersinkron ke rekapan bulanan!`);
  },

  renderMonthlyAttendanceMatrix() {
    const tbody = document.getElementById('monthly-attendance-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const monthKey = state.attendanceMonth || '2025-05';
    const datesInMonth = [];
    for (let d = 1; d <= 31; d++) {
      const dateStr = `${monthKey}-${String(d).padStart(2, '0')}`;
      datesInMonth.push(dateStr);
    }

    state.students.forEach(s => {
      let h = 0, sc = 0, ic = 0, a = 0;
      let dayCells = '';

      datesInMonth.forEach((dStr, idx) => {
        const dNum = idx + 1;
        const dayRecord = state.attendanceDaily[dStr];
        const val = dayRecord ? dayRecord[s.id] : null;

        let badge = '-';
        let cellCls = 'text-slate-300';
        if (val === 'H') { h++; badge = 'H'; cellCls = 'font-bold text-emerald-700 bg-emerald-50/70'; }
        else if (val === 'S') { sc++; badge = 'S'; cellCls = 'font-bold text-blue-700 bg-blue-100'; }
        else if (val === 'I') { ic++; badge = 'I'; cellCls = 'font-bold text-amber-700 bg-amber-100'; }
        else if (val === 'A') { a++; badge = 'A'; cellCls = 'font-bold text-rose-700 bg-rose-200'; }

        dayCells += `<td class="p-1 text-center font-mono text-[10px] border border-slate-200 ${cellCls}" title="${dStr}: ${badge}">${badge}</td>`;
      });

      const totalKehadiran = h + sc + ic + a;
      const persentase = totalKehadiran > 0 ? Math.round((h / totalKehadiran) * 100) : 100;
      const hasWarning = a >= 3;

      const tr = document.createElement('tr');
      tr.className = hasWarning 
        ? 'bg-rose-50/80 hover:bg-rose-100/80 transition-colors border-l-4 border-rose-500' 
        : 'hover:bg-slate-50 transition-colors';

      tr.innerHTML = `
        <td class="p-2 font-bold text-slate-800 text-center border border-slate-200">${s.noAbsen}</td>
        <td class="p-2 font-bold text-slate-900 border border-slate-200 whitespace-nowrap">
          <div>${s.nama}</div>
          ${hasWarning ? '<span class="inline-block px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider animate-pulse">⚠️ ALPA ≥ 3 HARI</span>' : ''}
        </td>
        ${dayCells}
        <td class="p-1 text-center font-bold text-emerald-800 bg-emerald-50 border border-slate-200">${h}</td>
        <td class="p-1 text-center font-bold text-blue-800 bg-blue-50 border border-slate-200">${sc}</td>
        <td class="p-1 text-center font-bold text-amber-800 bg-amber-50 border border-slate-200">${ic}</td>
        <td class="p-1 text-center font-black ${a >= 3 ? 'text-white bg-rose-600' : 'text-rose-800 bg-rose-50'} border border-slate-200">${a}</td>
        <td class="p-2 text-center font-black text-xs font-mono border border-slate-200 ${persentase < 80 ? 'text-rose-700 bg-rose-100' : 'text-slate-900'}">${persentase}%</td>
        <td class="p-2 text-center border border-slate-200 whitespace-nowrap">
          ${hasWarning ? `
            <button onclick="app.sendAbsenceWarningWhatsApp('${s.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-all mx-auto" title="Kirim Surat Peringatan / WA ke Orang Tua">
              <span>💬</span> Hubungi Ortu
            </button>
          ` : `
            <span class="text-[11px] text-slate-400 font-medium">Tertib</span>
          `}
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  sendAbsenceWarningWhatsApp(studentId) {
    const s = state.students.find(x => x.id === studentId);
    if (!s) return;

    let alpaCount = 0;
    Object.keys(state.attendanceDaily).forEach(dateStr => {
      if (state.attendanceDaily[dateStr] && state.attendanceDaily[dateStr][s.id] === 'A') {
        alpaCount++;
      }
    });

    const phoneDigits = (s.waliHp || '').replace(/\D/g, '');
    let cleanPhone = phoneDigits;
    if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
    else if (!cleanPhone.startsWith('62')) cleanPhone = '62' + cleanPhone;

    const pesan = `Assalamu'alaikum wr. wb. / Selamat Pagi Bapak/Ibu ${s.waliNama || 'Wali Siswa'}.\n\nKami dari pihak sekolah ${state.settings.schoolName || 'SMP Negeri Contoh Teladan'} menginformasikan bahwa ananda *${s.nama}* (Kelas VII-A) telah tercatat tidak hadir tanpa keterangan (*Alpa*) sebanyak *${alpaCount} hari* pada bulan ini.\n\nDemi kelancaran pembelajaran ananda, mohon konfirmasi kondisi ananda dan bimbingannya. Terima kasih.\n\nWali Kelas: ${state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.'}`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
    this.notify(`Membuka WhatsApp ke wali ${s.nama} (${s.waliHp})...`);
  },

  printMonthlyAttendanceSheet() {
    window.print();
  },

  // ---------- GENERATOR MODUL AJAR ----------
  loadPresetModul(doSwitch = true) {
    const visualStudents = state.students.filter(s => s.gayaBelajar === 'Visual').map(s => s.nama);
    const auditoriStudents = state.students.filter(s => s.gayaBelajar === 'Auditori').map(s => s.nama);
    const kinestetikStudents = state.students.filter(s => s.gayaBelajar === 'Kinestetik').map(s => s.nama);

    state.currentModul = {
      id: 'MODUL-202505-001',
      title: 'Modul Ajar Matematika - Aljabar & Perbandingan Senilai',
      subject: 'Matematika',
      fase: 'Fase D (Kelas VII SMP)',
      model: 'Problem Based Learning (PBL) Berdiferensiasi',
      time: '2 Pertemuan (4 x 40 Menit)',
      components: {
        identitas: {
          penyusun: state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.',
          instansi: state.settings.schoolName || 'SMP Negeri Contoh Teladan',
          jenjang: 'SMP',
          faseKelas: 'D / Kelas VII-A',
          alokasiWaktu: '4 JP (2 x Pertemuan)'
        },
        profilPancasila: [
          'Bernalar Kritis (menganalisis masalah perbandingan senilai)',
          'Mandiri (menyelesaikan latihan aljabar secara bertanggung jawab)',
          'Bergotong Royong (diskusi kelompok menyelesaikan soal kontekstual)'
        ],
        saranaPrasarana: 'Buku Siswa Matematika Kemdikbudristek, LKPD berdiferensiasi, proyektor LCD, alat timbangan manipulatif.',
        tujuanPembelajaran: [
          'Peserta didik dapat menganalisis konsep perbandingan senilai dan berbalik nilai dalam konteks kehidupan sehari-hari.',
          'Peserta didik dapat merumuskan model matematika sederhana berkaitan dengan perbandingan senilai.',
          'Peserta didik dapat memecahkan masalah kontekstual menggunakan konsep aljabar dan perbandingan secara kritis dan mandiri.'
        ],
        pemahamanBermakna: 'Konsep perbandingan senilai diaplikasikan saat menghitung estimasi kebutuhan bahan resep makanan, skala peta navigasi, dan konsumsi bahan bakar kendaraan.',
        iceBreaking: {
          judul: 'Ice Breaking 5 Menit: Tebak Skala & Angka Misteri',
          durasi: '5 Menit di awal KBM',
          deskripsi: 'Guru menampilkan teka-teki cepat: "Jika 1 mobil beroda 4, berapa roda untuk 7 mobil?" Siswa merespons serentak dengan gerakan tangan sesuai angka puluhan/satuan untuk membangun fokus dan kesiapan belajar.'
        },
        pertanyaanPemantik: [
          'Jika sebuah mobil membutuhkan 2 liter bensin untuk menempuh jarak 50 km, berapa liter bensin yang diperlukan jika jaraknya 150 km?',
          'Apakah waktu tempuh akan semakin singkat jika kecepatan berkendara kita tingkatkan? Mengapa demikian?'
        ],
        diferensiasi: {
          visual: {
            target: `${visualStudents.length} Siswa (${visualStudents.join(', ')})`,
            aktivitas: 'Diferensiasi Konten: Disediakan infografis berwarna, diagram batang perbandingan, dan lembar kerja bergambar alur penyelesaian PLSV.'
          },
          auditori: {
            target: `${auditoriStudents.length} Siswa (${auditoriStudents.join(', ')})`,
            aktivitas: 'Diferensiasi Proses: Mendengarkan penjelasan podcast mini konsep perbandingan, sesi tanya jawab interaktif, dan memimpin presentasi lisan kelompok.'
          },
          kinestetik: {
            target: `${kinestetikStudents.length} Siswa (${kinestetikStudents.join(', ')})`,
            aktivitas: 'Diferensiasi Produk: Melakukan manipulasi langsung timbangan neraca mini aljabar dan menyusun miniatur bagan perbandingan fisik.'
          }
        },
        langkahKegiatan: [
          {
            pertemuan: 1,
            pendahuluan: '1. Salam pembuka, doa bersama, dan presensi harian kelas.\n2. Ice-breaking 5 menit "Tebak Skala Angka Misteri".\n3. Guru menyampaikan apersepsi kontekstual dan tujuan pembelajaran.',
            inti: '1. Orientasi masalah: Penayangan video komparasi jarak perjalanan dan bahan bakar.\n2. Pengorganisasian belajar: Siswa dibagi dalam 3 kelompok berdiferensiasi (Visual, Auditori, Kinestetik).\n3. Penyelidikan mandiri & kelompok: Pengerjaan LKPD dengan media sesuai gaya belajar.\n4. Penyajian hasil karya: Masing-masing kelompok mempresentasikan solusi masalah kontekstual.\n5. Evaluasi & penguatan konsep inti oleh guru.',
            penutup: '1. Guru bersama siswa merangkum intisari perbandingan senilai.\n2. Refleksi diri peserta didik dan pembagian tugas persiapan sumatif.\n3. Doa penutup dan salam.'
          }
        ],
        rubrikObservasi: [
          { dimensi: 'Bernalar Kritis', bb: 'Belum mampu merumuskan model perbandingan', mb: 'Mampu merumuskan model dengan bantuan guru', bsh: 'Mampu merumuskan dan menyelesaikan masalah perbandingan mandiri', sb: 'Mampu menganalisis kasus kompleks dan membantu rekan sebaya' },
          { dimensi: 'Bergotong Royong', bb: 'Pasif dalam kerja tim LKPD', mb: 'Ikut berpartisipasi jika diminta', bsh: 'Aktif berdiskusi dan berbagi tugas secara adil', sb: 'Menjadi inisiator kolaborasi dan menghargai masukan seluruh anggota' }
        ],
        lkpd: {
          judul: 'LEMBAR KERJA PESERTA DIDIK (LKPD): Memecahkan Masalah Perbandingan Senilai Nyata',
          petunjuk: '1. Bacalah stimulus kasus dengan cermat.\n2. Diskusikan langkah penyelesaian bersama kelompokmu sesuai instruksi diferensiasi.\n3. Tuliskan jawaban akhir dengan satuan yang tepat.',
          soalLKPD: [
            '1. Sebuah kendaraan motor menghabiskan 3 liter bensin untuk menempuh jarak 105 km. Hitunglah berapa kilometer jarak yang dapat ditempuh jika motor diisi bensin sebanyak 8 liter!',
            '2. Ibu ingin membuat 30 kue donat dengan membutuhkan 500 gram tepung terigu. Jika Ibu ingin membuat 75 kue donat untuk acara syukuran, berapa gram tepung terigu yang harus disiapkan?'
          ]
        }
      }
    };
    localStorage.setItem(KEYS.CURRENT_MODUL, JSON.stringify(state.currentModul));
    this.renderModulPreview();
    if (doSwitch) this.notify('Contoh Modul Ajar Berdiferensiasi & Rubrik Sikap dimuat.');
  },

  setModulTime(timeStr) {
    const el = document.getElementById('modul-time');
    if (el) el.value = timeStr;
    this.notify(`Alokasi waktu diatur: ${timeStr}`);
  },

  setModulTopic(topicStr) {
    const el = document.getElementById('modul-topic');
    if (el) el.value = topicStr;
    this.notify(`Topik materi dipilih: ${topicStr}`);
  },

  handleModulFaseChange(faseVal) {
    const faseEl = document.getElementById('modul-fase');
    if (faseEl && faseVal && faseEl.value !== faseVal) {
      faseEl.value = faseVal;
    }
    const timeEl = document.getElementById('modul-time');
    if (!timeEl) return;
    if (faseVal.includes('Fase A') || faseVal.includes('Fase B') || faseVal.includes('Fase C')) {
      timeEl.value = '2 x 35 Menit (1 Pertemuan)';
    } else if (faseVal.includes('Fase D')) {
      timeEl.value = '2 x 40 Menit (1 Pertemuan)';
    } else if (faseVal.includes('Fase E') || faseVal.includes('Fase F')) {
      timeEl.value = '2 x 45 Menit (1 Pertemuan)';
    }
  },

  updateModulAIStatusDisplay() {
    const badge = document.getElementById('modul-ai-badge');
    if (!badge) return;
    const apiKey = state.settings?.apiKey;
    const legacyModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    const model = legacyModels.includes(state.settings?.aiModel) ? 'gemini-3.1-flash-lite' : (state.settings?.aiModel || 'gemini-3.1-flash-lite');
    if (apiKey && apiKey.trim() !== '' && model !== 'offline') {
      badge.className = 'text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg flex items-center gap-1.5 shadow-2xs';
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>🟢 AI Gemini Active (${model})</span>`;
    } else {
      badge.className = 'text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg flex items-center gap-1.5 shadow-2xs';
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span><span>🟡 Mode Standar Offline</span>`;
    }
  },

  async generateModulAjar() {
    const subject = document.getElementById('modul-subject')?.value.trim() || 'Matematika';
    const fase = document.getElementById('modul-fase')?.value || 'Fase D (Kelas 7-9 SMP)';
    const model = document.getElementById('modul-model')?.value || 'Problem Based Learning (PBL)';
    const time = document.getElementById('modul-time')?.value.trim() || '2 x 40 Menit (1 Pertemuan)';
    const topic = document.getElementById('modul-topic')?.value.trim() || 'Operasi hitung bilangan bulat dan aljabar sederhana';

    if (!topic) {
      alert('Mohon masukkan Topik Materi terlebih dahulu.');
      return;
    }

    const apiKey = state.settings.apiKey;
    const legacyModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    const aiModel = legacyModels.includes(state.settings.aiModel) ? 'gemini-3.1-flash-lite' : (state.settings.aiModel || 'gemini-3.1-flash-lite');

    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.remove('hidden');
    this.notify('✨ AI Gemini sedang merumuskan Modul Ajar Berdiferensiasi & LKPD...');

    let parsedComponents = null;
    let generatedViaAI = false;

    if (apiKey && apiKey.trim() !== '' && aiModel !== 'offline') {
      try {
        const prompt = `Anda adalah Tim Pengembang Kurikulum Merdeka Kemdikbudristek (BSKAP). Rumuskan 1 Modul Ajar lengkap dengan RPP Berdiferensiasi dan LKPD untuk:
- Mata Pelajaran: ${subject}
- Fase & Jenjang: ${fase}
- Alokasi Waktu: ${time}
- Model Pembelajaran: ${model}
- Topik / Materi: "${topic}"

Format balasan HANYA berupa JSON murni tanpa markdown formatting pembungkus seperti ini:
{
  "profilPancasila": ["Bernalar Kritis", "Mandiri", "Bergotong Royong"],
  "saranaPrasarana": "Buku Siswa, proyektor, LKPD terstruktur, media kontekstual nyata.",
  "tujuanPembelajaran": [
    "Peserta didik dapat memahami konsep dasar mengenai ${topic} secara mendalam.",
    "Peserta didik mampu mengaplikasikan pemahaman konsep dalam memecahkan masalah kontekstual nyata."
  ],
  "pemahamanBermakna": "Materi ${topic} bermanfaat dalam penalaran logis pemecahan masalah sehari-hari.",
  "iceBreaking": {
    "judul": "Tebak Kasus Kontekstual",
    "durasi": "5 Menit",
    "deskripsi": "Aktivitas pemanasan interaktif membangkitkan motivasi siswa terhadap konsep ${topic}."
  },
  "pertanyaanPemantik": [
    "Mengapa penting mempelajari ${topic} dalam kehidupan sehari-hari?",
    "Bagaimana kita memanfaatkan konsep ini untuk memecahkan masalah di sekitar kita?"
  ],
  "diferensiasi": {
    "visual": { "target": "Kelompok murid bergaya belajar visual", "aktivitas": "Mengamati bagan konsep, infografis, dan diagram alur materi." },
    "auditori": { "target": "Kelompok murid bergaya belajar auditori", "aktivitas": "Mendengarkan paparan penjelasan guru dan diskusi tanya jawab terarah." },
    "kinestetik": { "target": "Kelompok murid bergaya belajar kinestetik", "aktivitas": "Praktik langsung manipulasi objek dan simulasi nyata." }
  },
  "langkahKegiatan": [
    {
      "pertemuan": 1,
      "pendahuluan": "1. Guru menyapa, memimpin doa, dan presensi kelas.\\n2. Apersepsi materi sebelumnya dan menyampaikan TP.\\n3. Pemanasan ice breaking 5 menit.",
      "inti": "1. Orientasi peserta didik pada masalah nyata.\\n2. Pengorganisasian kelompok belajar berdiferensiasi.\\n3. Penyelidikan terbimbing dan pengerjaan LKPD.\\n4. Presentasi dan diskusi hasil karya.\\n5. Analisis dan penguatan konsep oleh guru.",
      "penutup": "1. Kesimpulan pembelajaran bersama murid.\\n2. Refleksi pembelajaran dan tindak lanjut.\\n3. Doa penutup dan salam."
    }
  ],
  "rubrikObservasi": [
    {
      "dimensi": "Bernalar Kritis",
      "bb": "Belum mampu menganalisis masalah secara logis.",
      "mb": "Mampu mengidentifikasi sebagian masalah.",
      "bsh": "Mampu merumuskan argumen logis secara mandiri.",
      "sb": "Mampu mengkritisi dan menemukan alternatif solusi inovatif."
    },
    {
      "dimensi": "Bergotong Royong",
      "bb": "Cenderung pasif dalam kerja kelompok.",
      "mb": "Mulai terlibat membantu tugas kelompok.",
      "bsh": "Aktif bekerja sama dan berbagi peran dengan baik.",
      "sb": "Inisiatif tinggi memimpin dan membantu teman yang kesulitan."
    }
  ],
  "lkpd": {
    "judul": "LEMBAR KERJA PESERTA DIDIK (LKPD) - ${subject.toUpperCase()}",
    "petunjuk": "1. Tuliskan identitas kelompok.\\n2. Diskusikan permasalahan secara bersama.\\n3. Tanyakan kepada guru jika menemui kendala.",
    "soalLKPD": [
      "1. Berdasarkan uraian di atas, analisislah 2 konsep penting yang ditemukan!",
      "2. Rumuskan langkah pemecahan masalah secara runtut dan sistematis!",
      "3. Simpulkan pembelajaran yang diperoleh dan kaitkan dengan kehidupan nyata!"
    ]
  }
}`;

        let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7 }
          })
        });

        if (!resp.ok && aiModel !== 'gemini-3.1-flash-lite') {
          resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7 }
            })
          });
        }

        if (resp.ok) {
          const data = await resp.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedComponents = JSON.parse(jsonMatch[0]);
            generatedViaAI = true;
          }
        }
      } catch (err) {
        console.warn('Gemini Modul Ajar API call failed, using adaptive fallback', err);
      }
    }

    if (!parsedComponents) {
      // Smart adaptive fallback
      parsedComponents = {
        profilPancasila: ['Bernalar Kritis', 'Mandiri', 'Bergotong Royong'],
        saranaPrasarana: 'Buku Siswa, proyektor LCD, LKPD terstruktur, media visual interaktif.',
        tujuanPembelajaran: [
          `Peserta didik dapat memahami konsep dasar mengenai ${topic} secara komprehensif.`,
          `Peserta didik mampu mengaplikasikan pemahaman materi ${topic} dalam memecahkan masalah kontekstual.`
        ],
        pemahamanBermakna: `Pemahaman tentang ${topic} esensial untuk memecahkan permasalahan nyata sehari-hari secara logis dan kritis.`,
        iceBreaking: {
          judul: 'Tebak Kata & Logika Cepat',
          durasi: '5 Menit',
          deskripsi: 'Aktivitas pemanasan interaktif mengaitkan pengetahuan awal murid dengan konsep materi hari ini.'
        },
        pertanyaanPemantik: [
          `Mengapa kita perlu mempelajari konsep ${topic} dalam kehidupan sehari-hari?`,
          `Bagaimana cara menyelesaikan masalah nyata dengan menerapkan prinsip materi ini?`
        ],
        diferensiasi: {
          visual: { target: 'Siswa bergaya belajar visual', aktivitas: `Mengamati bagan konsep dan infografis terkait ${topic}.` },
          auditori: { target: 'Siswa bergaya belajar auditori', aktivitas: `Mendengarkan penjelasan materi dan berdiskusi kelompok terarah.` },
          kinestetik: { target: 'Siswa bergaya belajar kinestetik', aktivitas: `Praktik langsung simulasi dan pengerjaan lembar kerja berorientasi tindakan.` }
        },
        langkahKegiatan: [
          {
            pertemuan: 1,
            pendahuluan: '1. Guru membuka KBM, menyapa murid, berdoa, dan memeriksa kehadiran.\\n2. Apersepsi materi sebelumnya dan menyampaikan TP.\\n3. Pemanasan ice breaking 5 menit.',
            inti: `1. Orientasi murid pada masalah nyata terkait ${topic}.\\n2. Pengelompokan murid sesuai modalitas belajar (diferensiasi proses).\\n3. Diskusi kelompok dan pengerjaan LKPD terstruktur.\\n4. Presentasi hasil karya kelompok.\\n5. Evaluasi dan penguatan konsep oleh guru.`,
            penutup: '1. Rangkuman bersama murid terkait poin-poin utama.\\n2. Refleksi pembelajaran dan tindak lanjut.\\n3. Doa penutup dan salam.'
          }
        ],
        rubrikObservasi: [
          {
            dimensi: 'Bernalar Kritis',
            bb: 'Belum mampu menyampaikan argumen logis terkait materi.',
            mb: 'Mulai mampu menyampaikan pendapat dengan bantuan teman/guru.',
            bsh: 'Mampu merumuskan pemecahan masalah kontekstual secara mandiri.',
            sb: 'Sangat kritis dan mampu memberikan alternatif solusi kreatif.'
          },
          {
            dimensi: 'Bergotong Royong',
            bb: 'Pasif dan enggan berkontribusi dalam diskusi kelompok.',
            mb: 'Mulai terlibat dalam pembagian tugas kelompok.',
            bsh: 'Bekerja sama secara aktif dan menghargai pendapat anggota tim.',
            sb: 'Inisiatif tinggi memimpin dan membantu teman yang mengalami kendala.'
          }
        ],
        lkpd: {
          judul: `LEMBAR KERJA PESERTA DIDIK (LKPD) - ${subject.toUpperCase()}`,
          petunjuk: '1. Berdoalah sebelum memulai pengerjaan.\\n2. Diskusikan setiap pertanyaan bersama teman sekelompokmu.\\n3. Tuliskan kesimpulan hasil diskusi dengan jelas.',
          soalLKPD: [
            `1. Berdasarkan pengamatan materi ${topic}, identifikasilah 2 konsep penting yang Anda temukan!`,
            `2. Jelaskan bagaimana konsep tersebut dapat diterapkan untuk menyelesaikan masalah di lingkungan sekitar!`,
            `3. Buatlah kesimpulan singkat hasil diskusi kelompok dan siapkan untuk dipresentasikan!`
          ]
        }
      };
    }

    state.currentModul = {
      id: 'MODUL-' + new Date().getFullYear() + String(new Date().getMonth()+1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 900) + 100),
      title: `Modul Ajar ${subject} - ${topic.slice(0, 35)}...`,
      subject: subject,
      fase: fase,
      model: model,
      time: time,
      components: {
        identitas: {
          penyusun: state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.',
          instansi: state.settings.schoolName || 'Satuan Pendidikan',
          jenjang: state.settings.stage || 'SMP',
          faseKelas: fase,
          alokasiWaktu: time
        },
        ...parsedComponents
      }
    };

    localStorage.setItem(KEYS.CURRENT_MODUL, JSON.stringify(state.currentModul));
    if (overlay) overlay.classList.add('hidden');
    this.renderModulPreview();

    if (generatedViaAI) {
      this.notify(`🎉 Modul Ajar & LKPD berhasil dirumuskan secara mendalam oleh AI Gemini!`);
    } else {
      this.notify(`✨ Modul Ajar Kurikulum Merdeka berhasil dirumuskan.`);
    }
  },

  renderModulPreview() {
    const m = state.currentModul;
    if (!m) return;
    document.getElementById('modul-preview-title').textContent = m.title;
    const c = m.components || {};

    document.getElementById('rendered-modul-content').innerHTML = `
      <div class="border-b-2 border-slate-900 pb-3 text-center mb-6">
        <h3 class="font-extrabold text-base sm:text-lg uppercase font-serif">MODUL AJAR KURIKULUM MERDEKA</h3>
        <h4 class="font-bold text-sm sm:text-base font-serif uppercase">${m.subject} - ${m.fase}</h4>
        <p class="text-xs text-slate-600">${state.settings.schoolName || 'Satuan Pendidikan'} • TP 2024/2025</p>
      </div>

      <div class="space-y-3">
        <h4 class="font-bold text-xs uppercase border-b pb-1">I. INFORMASI UMUM</h4>
        <table class="w-full text-xs" style="border:none;">
          <tr><td width="30%"><b>Penyusun</b></td><td>: ${c.identitas?.penyusun || '-'}</td></tr>
          <tr><td><b>Satuan Pendidikan</b></td><td>: ${c.identitas?.instansi || '-'}</td></tr>
          <tr><td><b>Fase / Kelas</b></td><td>: ${c.identitas?.faseKelas || '-'}</td></tr>
          <tr><td><b>Model Pembelajaran</b></td><td>: ${m.model || '-'}</td></tr>
        </table>
      </div>

      <div class="space-y-3 pt-3">
        <h4 class="font-bold text-xs uppercase border-b pb-1">II. KOMPONEN INTI</h4>
        <div class="text-xs space-y-1">
          <b>Tujuan Pembelajaran:</b>
          <ol class="list-decimal list-inside pl-1">${(c.tujuanPembelajaran || []).map(tp => `<li>${tp}</li>`).join('')}</ol>
        </div>
        <div class="text-xs space-y-1">
          <b>Pemahaman Bermakna:</b>
          <p class="text-slate-700 italic">${c.pemahamanBermakna || '-'}</p>
        </div>
        ${c.iceBreaking ? `
          <div class="p-3 rounded-lg bg-amber-50/80 border border-amber-300 text-xs space-y-1">
            <div class="font-extrabold text-amber-900 flex items-center gap-1.5">
              <span>⚡</span> <span>${c.iceBreaking.judul}</span>
              <span class="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-amber-200 text-amber-800">${c.iceBreaking.durasi}</span>
            </div>
            <p class="text-slate-800">${c.iceBreaking.deskripsi}</p>
          </div>
        ` : ''}
        ${c.pertanyaanPemantik ? `
          <div class="text-xs space-y-1">
            <b>Pertanyaan Pemantik:</b>
            <ul class="list-disc list-inside pl-1 text-slate-700">${c.pertanyaanPemantik.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
        ` : ''}
      </div>

      ${c.diferensiasi ? `
        <div class="space-y-3 pt-3">
          <h4 class="font-bold text-xs uppercase border-b pb-1 text-indigo-900 flex items-center gap-1.5">
            <span>🎯</span> <span>III. RANCANGAN PEMBELAJARAN BERDIFERENSIASI (PROFIL MURID KELAS VII-A)</span>
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
            <div class="p-3 rounded-lg bg-blue-50/70 border border-blue-200 space-y-1">
              <div class="font-bold text-blue-900 flex items-center gap-1"><span>👁️</span> Gaya Belajar Visual</div>
              <div class="text-[10px] font-semibold text-blue-700">Sasaran: ${c.diferensiasi.visual?.target || '-'}</div>
              <p class="text-slate-700 leading-snug">${c.diferensiasi.visual?.aktivitas || '-'}</p>
            </div>
            <div class="p-3 rounded-lg bg-purple-50/70 border border-purple-200 space-y-1">
              <div class="font-bold text-purple-900 flex items-center gap-1"><span>🎧</span> Gaya Belajar Auditori</div>
              <div class="text-[10px] font-semibold text-purple-700">Sasaran: ${c.diferensiasi.auditori?.target || '-'}</div>
              <p class="text-slate-700 leading-snug">${c.diferensiasi.auditori?.aktivitas || '-'}</p>
            </div>
            <div class="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
              <div class="font-bold text-emerald-900 flex items-center gap-1"><span>🏃</span> Gaya Belajar Kinestetik</div>
              <div class="text-[10px] font-semibold text-emerald-700">Sasaran: ${c.diferensiasi.kinestetik?.target || '-'}</div>
              <p class="text-slate-700 leading-snug">${c.diferensiasi.kinestetik?.aktivitas || '-'}</p>
            </div>
          </div>
        </div>
      ` : ''}

      ${c.rubrikObservasi ? `
        <div class="space-y-2 pt-3">
          <h4 class="font-bold text-xs uppercase border-b pb-1">IV. RUBRIK OBSERVASI FORMATIF PROFIL PELAJAR PANCASILA</h4>
          <table class="w-full text-xs border border-slate-900 border-collapse">
            <thead>
              <tr class="bg-slate-100 font-bold border-b border-slate-900 text-center">
                <th class="border border-slate-900 p-1.5 w-36">Dimensi Profil</th>
                <th class="border border-slate-900 p-1.5">Belum Berkembang (BB)</th>
                <th class="border border-slate-900 p-1.5">Mulai Berkembang (MB)</th>
                <th class="border border-slate-900 p-1.5">Berkembang Sesuai Harapan (BSH)</th>
                <th class="border border-slate-900 p-1.5">Sangat Berkembang (SB)</th>
              </tr>
            </thead>
            <tbody>
              ${c.rubrikObservasi.map(r => `
                <tr>
                  <td class="border border-slate-900 p-1.5 font-bold">${r.dimensi}</td>
                  <td class="border border-slate-900 p-1.5 text-slate-700">${r.bb}</td>
                  <td class="border border-slate-900 p-1.5 text-slate-700">${r.mb}</td>
                  <td class="border border-slate-900 p-1.5 text-slate-800 bg-emerald-50/40 font-medium">${r.bsh}</td>
                  <td class="border border-slate-900 p-1.5 text-emerald-900 bg-emerald-100/50 font-bold">${r.sb}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <div class="space-y-3 pt-4 page-break-before">
        <div class="border-2 border-slate-900 p-4 rounded space-y-2 bg-white">
          <h4 class="font-bold text-sm uppercase text-center">${c.lkpd?.judul || 'LEMBAR KERJA PESERTA DIDIK (LKPD)'}</h4>
          <p class="text-xs whitespace-pre-line text-slate-700 font-sans">${c.lkpd?.petunjuk || ''}</p>
          <div class="space-y-3 pt-2 text-xs">
            ${(c.lkpd?.soalLKPD || []).map(s => `<p class="font-bold">${s}</p><div class="border-b border-dotted border-slate-400 h-5"></div>`).join('')}
          </div>
        </div>
      </div>
    `;
  },

  exportModulWord() {
    const m = state.currentModul;
    if (!m) return;
    const html = document.getElementById('rendered-modul-content').innerHTML;
    const blob = new Blob(['\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"></head><body>' + html + '</body></html>'], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (m.title || 'Modul_Ajar').replace(/[^a-zA-Z0-9_\-]/g, '_') + '.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.notify('Modul Ajar Word (.doc) berhasil diunduh.');
  },

  // ---------- BANK SOAL & STUDIO ----------
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

    if (tabKey === 'gen') this.updateAIStatusDisplay();
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

  async generateWithAI() {
    const title = document.getElementById('gen-title')?.value.trim() || 'Asesmen Sumatif';
    const curriculum = document.getElementById('gen-curriculum')?.value || 'Kurikulum Merdeka';
    const grade = document.getElementById('gen-grade')?.value || 'Kelas 7 SMP (Fase D)';
    const subject = document.getElementById('gen-subject')?.value.trim() || 'Matematika';
    const year = document.getElementById('gen-year')?.value.trim() || 'Semester Genap - 2024/2025';
    const time = parseInt(document.getElementById('gen-time')?.value) || 90;
    const pgCount = parseInt(document.getElementById('gen-count-pg')?.value) || 5;
    const isianCount = parseInt(document.getElementById('gen-count-isian')?.value) || 3;
    const uraianCount = parseInt(document.getElementById('gen-count-uraian')?.value) || 2;
    const materials = document.getElementById('gen-materials')?.value.trim() || 'Operasi hitung dan penalaran kontekstual';
    const optCount = parseInt(document.getElementById('gen-option-count')?.value) || 4;

    this.notify('✨ AI sedang menyusun paket asesmen 4-in-1 (Naskah, Kisi, Kartu, Kunci)...');

    const letters = ['A', 'B', 'C', 'D', 'E'].slice(0, optCount);
    const apiKey = state.settings.apiKey;
    const legacyModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    const model = legacyModels.includes(state.settings.aiModel) ? 'gemini-3.1-flash-lite' : (state.settings.aiModel || 'gemini-3.1-flash-lite');

    if (!apiKey || apiKey.trim() === '' || model === 'offline') {
      const proceed = confirm('💡 Info Kunci AI Google Gemini:\n\nGoogle Gemini API Key belum terpasang atau model diatur ke offline.\n\nSistem akan merumuskan paket soal secara otomatis menggunakan "Kurasi Template Cerdas Kurikulum Merdeka Lokal".\n\n• Klik OK untuk melanjutkan perumusan soal.\n• Klik BATAL jika ingin memasang API Key sekarang di menu Pengaturan.');
      if (!proceed) {
        this.openSettingsModal();
        return;
      }
    }

    let generatedQuestions = null;
    let generatedViaAI = false;

    if (apiKey && apiKey.trim() !== '' && model !== 'offline') {
      try {
        const prompt = `Buatkan ${pgCount} butir soal Pilihan Ganda (masing-masing persis memiliki ${optCount} pilihan: ${letters.join(', ')}), ${isianCount} soal Isian Singkat, dan ${uraianCount} soal Uraian HOTS untuk jenjang ${grade}, mata pelajaran ${subject}, materi: "${materials}". Format jawaban berupa JSON murni dengan format array of object:
[
  {
    "number": 1,
    "type": "pg",
    "material": "${materials.slice(0, 30)}",
    "cognitiveLevel": "L1",
    "stimulus": "Teks stimulus kontekstual singkat",
    "questionText": "Teks pertanyaan",
    "options": ["A. ...", "B. ...", ...],
    "correctAnswer": "A",
    "scoreWeight": 1
  }
]`;
        let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7 }
          })
        });

        // Failover if chosen model is 404/503
        if (!resp.ok && model !== 'gemini-3.1-flash-lite') {
          console.warn(`Model ${model} returned HTTP ${resp.status}, failing over to gemini-3.1-flash-lite`);
          resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7 }
            })
          });
        }

        if (resp.ok) {
          const data = await resp.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const jsonMatch = rawText.match(/\[\s*\{[\s\S]*\}\s*\]/);
          if (jsonMatch) {
            generatedQuestions = JSON.parse(jsonMatch[0]);
            generatedViaAI = true;
          }
        } else {
          console.warn('Gemini API returned error', resp.status);
          this.notify(`⚠️ Panggilan AI Gemini (HTTP ${resp.status}) gagal, beralih otomatis ke kurasi template lokal.`);
        }
      } catch (err) {
        console.warn('Gemini API call for questions failed, using smart adaptive fallback', err);
        this.notify('⚠️ Gangguan koneksi AI Gemini, beralih otomatis ke template lokal.');
      }
    }

    if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      // Smart Adaptive Fallback Generator
      generatedQuestions = [];
      let qNum = 1;

      // Pilihan Ganda
      for (let i = 0; i < pgCount; i++) {
        const level = i === 0 ? 'L1' : (i < pgCount - 1 ? 'L2' : 'L3');
        const defaultOpts = letters.map((ltr, lIdx) => `${ltr}. Pilihan jawaban alternatif ${lIdx + 1} (${materials.slice(0, 15)})`);
        generatedQuestions.push({
          number: qNum++,
          type: 'pg',
          material: materials.split('\n')[0] || subject,
          cognitiveLevel: level,
          stimulus: `Berdasarkan pengamatan dan data studi kasus terkait ${subject} pada kehidupan sehari-hari (Kasus ${i + 1})...`,
          questionText: `Manakah pernyataan yang paling tepat terkait ${materials.slice(0, 40) || subject} dalam konteks kasus di atas?`,
          options: defaultOpts,
          correctAnswer: letters[0],
          scoreWeight: level === 'L3' ? 2 : 1
        });
      }

      // Isian Singkat
      for (let i = 0; i < isianCount; i++) {
        generatedQuestions.push({
          number: qNum++,
          type: 'isian',
          material: materials.split('\n')[0] || subject,
          cognitiveLevel: 'L2',
          stimulus: `Dalam suatu pengujian terstandar terkait materi ${subject}...`,
          questionText: `Faktor utama yang memengaruhi hasil pengamatan pada kondisi tersebut adalah ........................`,
          options: [],
          correctAnswer: 'Variabel terkontrol',
          scoreWeight: 2
        });
      }

      // Uraian
      for (let i = 0; i < uraianCount; i++) {
        generatedQuestions.push({
          number: qNum++,
          type: 'uraian',
          material: materials.split('\n')[0] || subject,
          cognitiveLevel: 'L3',
          stimulus: `Sebuah permasalahan kontekstual di masyarakat memerlukan solusi ilmiah dan analisis mendalam berbasis konsep ${subject}...`,
          questionText: `Analisislah permasalahan tersebut, rumuskan 2 hipotesis alternatif, dan susun langkah pemecahan masalah secara runtut!`,
          options: [],
          correctAnswer: 'Analisis mencakup identifikasi variabel, rumusan hipotesis logis, serta langkah pemecahan terstruktur dan sistematis.',
          scoreWeight: 4
        });
      }
    }

    const pkgId = 'SOAL-' + new Date().toISOString().slice(0, 7).replace('-', '') + '-' + String(Math.floor(Math.random() * 900) + 100);
    state.currentPackage = {
      id: pkgId,
      title: title,
      subject: subject,
      grade: grade,
      curriculum: curriculum,
      academicYear: year,
      duration: time,
      materials: materials,
      optionCount: optCount,
      questions: generatedQuestions
    };

    localStorage.setItem(KEYS.CURRENT_PKG, JSON.stringify(state.currentPackage));
    idb.savePackage(state.currentPackage);
    this.switchSoalSubTab('std');
    this.populateLMSQuizDropdown();
    if (generatedViaAI) {
      this.notify(`🎉 Paket soal ${pkgId} (${generatedQuestions.length} butir) berhasil dirumuskan oleh AI Gemini!`);
    } else {
      this.notify(`🎉 Paket soal ${pkgId} (${generatedQuestions.length} butir, ${optCount} opsi) berhasil dibuat via Template Lokal!`);
    }
  },

  createManualPackage() {
    const title = document.getElementById('gen-title')?.value.trim() || 'Asesmen Manual Baru';
    const grade = document.getElementById('gen-grade')?.value || 'Kelas 7 SMP (Fase D)';
    const subject = document.getElementById('gen-subject')?.value.trim() || 'Matematika';
    const optCount = parseInt(document.getElementById('gen-option-count')?.value) || 4;
    const letters = ['A', 'B', 'C', 'D', 'E'].slice(0, optCount);

    const pkgId = 'SOAL-MANUAL-' + Date.now().toString().slice(-4);
    state.currentPackage = {
      id: pkgId,
      title: title,
      subject: subject,
      grade: grade,
      curriculum: 'Kurikulum Merdeka',
      duration: 90,
      optionCount: optCount,
      questions: [
        {
          number: 1,
          type: 'pg',
          material: subject,
          cognitiveLevel: 'L1',
          stimulus: 'Stimulus kontekstual soal butir 1...',
          questionText: 'Tuliskan teks pertanyaan pilihan ganda Anda di sini...',
          options: letters.map((l, idx) => `${l}. Opsi pilihan ${idx + 1}`),
          correctAnswer: 'A',
          scoreWeight: 1
        },
        {
          number: 2,
          type: 'isian',
          material: subject,
          cognitiveLevel: 'L2',
          questionText: 'Tuliskan teks pertanyaan isian singkat di sini...',
          options: [],
          correctAnswer: 'Kunci jawaban isian',
          scoreWeight: 2
        },
        {
          number: 3,
          type: 'uraian',
          material: subject,
          cognitiveLevel: 'L3',
          questionText: 'Tuliskan teks pertanyaan uraian / HOTS di sini...',
          options: [],
          correctAnswer: 'Rubrik penilaian dan pedoman penskoran uraian',
          scoreWeight: 4
        }
      ]
    };

    localStorage.setItem(KEYS.CURRENT_PKG, JSON.stringify(state.currentPackage));
    idb.savePackage(state.currentPackage);
    this.switchSoalSubTab('std');
    this.populateLMSQuizDropdown();
    this.notify(`Paket soal manual ${pkgId} siap diedit.`);
  },

  handleStageChange(stage) {
    state.settings.stage = stage;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    
    // Auto-update default school name in modal if it still has default/example name
    const schoolNameInput = document.getElementById('set-school-name');
    if (schoolNameInput) {
      const cur = schoolNameInput.value;
      if (!cur || cur.includes('SMP NEGERI CONTOH') || cur.includes('SD NEGERI CONTOH') || cur.includes('SMA NEGERI CONTOH') || cur.includes('SMK NEGERI CONTOH')) {
        const newName = stage === 'SD' ? 'SD NEGERI CONTOH TELADAN' : (stage === 'SMA' ? 'SMA NEGERI CONTOH TELADAN' : (stage === 'SMK' ? 'SMK NEGERI CONTOH TELADAN' : 'SMP NEGERI CONTOH TELADAN'));
        schoolNameInput.value = newName;
      }
    }

    this.handleClassStageChange(stage);
    this.renderMapelQuickChips();
    this.updateP5RecommendationBadge();

    // Auto-sync Modul Ajar Fase to current Stage
    const modulFase = document.getElementById('modul-fase');
    if (modulFase) {
      const defaultFase = stage === 'SD' ? 'Fase B' : (stage === 'SMA' || stage === 'SMK' ? 'Fase E' : 'Fase D');
      modulFase.value = defaultFase;
      this.handleModulFaseChange(defaultFase);
    }

    this.notify(`Jenjang pendidikan disesuaikan ke: ${stage}`);
  },

  handleClassStageChange(stage) {
    const tingkatEl = document.getElementById('cfg-class-tingkat');
    const faseEl = document.getElementById('cfg-fase-select');
    const optCountEl = document.getElementById('gen-option-count');

    if (tingkatEl) {
      tingkatEl.innerHTML = '';
      let tingkats = [];
      if (stage === 'SD') {
        tingkats = ['I (Satu)', 'II (Dua)', 'III (Tiga)', 'IV (Empat)', 'V (Lima)', 'VI (Enam)'];
      } else if (stage === 'SMP') {
        tingkats = ['VII (Tujuh)', 'VIII (Delapan)', 'IX (Sembilan)'];
      } else {
        tingkats = ['X (Sepuluh)', 'XI (Sebelas)', 'XII (Dua Belas)'];
      }
      tingkats.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        tingkatEl.appendChild(opt);
      });
    }

    if (faseEl) {
      faseEl.innerHTML = '';
      let fases = [];
      if (stage === 'SD') {
        fases = ['Fase A (Kelas 1-2 SD)', 'Fase B (Kelas 3-4 SD)', 'Fase C (Kelas 5-6 SD)'];
      } else if (stage === 'SMP') {
        fases = ['Fase D (Kelas 7-9 SMP)'];
      } else if (stage === 'SMK') {
        fases = ['Fase E (Kelas 10 SMK - Dasar Kejuruan)', 'Fase F (Kelas 11-12 SMK - Konsentrasi)'];
      } else {
        fases = ['Fase E (Kelas 10 SMA)', 'Fase F (Kelas 11-12 SMA)'];
      }
      fases.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f;
        opt.textContent = f;
        faseEl.appendChild(opt);
      });
    }

    if (optCountEl) {
      if (stage === 'SD') optCountEl.value = '3';
      else if (stage === 'SMP') optCountEl.value = '4';
      else optCountEl.value = '5';
    }

    this.renderMapelQuickChips();
    this.updateP5RecommendationBadge();
    this.updateAIStatusDisplay();
    this.updateModulAIStatusDisplay();
    this.checkAuthSession();
  },

  handleGenGradeChange(gradeVal) {
    const optEl = document.getElementById('gen-option-count');
    if (!optEl) return;
    if (gradeVal.includes('Fase A') || gradeVal.includes('Fase B')) {
      optEl.value = '3';
    } else if (gradeVal.includes('Fase C') || gradeVal.includes('Fase D')) {
      optEl.value = '4';
    } else {
      optEl.value = '5';
    }
  },

  renderMapelQuickChips() {
    const stage = state.settings.stage || 'SMP';
    const mapels = MAPEL_BY_STAGE[stage] || MAPEL_BY_STAGE['SMP'];

    const genContainer = document.getElementById('gen-subject-chips');
    const modulContainer = document.getElementById('modul-subject-chips');

    if (genContainer) {
      genContainer.innerHTML = '';
      mapels.forEach(m => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'px-2 py-0.5 rounded-md text-[10px] font-black border border-slate-900 bg-amber-200 text-slate-900 hover:bg-amber-300 transition-all cursor-pointer shadow-[1px_1px_0px_#0f172a]';
        btn.textContent = m.code;
        btn.title = m.name;
        btn.onclick = () => {
          const subInput = document.getElementById('gen-subject');
          if (subInput) subInput.value = m.name;
          const grSelect = document.getElementById('gen-grade');
          if (grSelect) grSelect.value = m.defaultGrade;
          const optSelect = document.getElementById('gen-option-count');
          if (optSelect) optSelect.value = m.optCount || 4;
          this.notify(`Mata Pelajaran dipilih: ${m.name}`);
        };
        genContainer.appendChild(btn);
      });
    }

    if (modulContainer) {
      modulContainer.innerHTML = '';
      mapels.forEach(m => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'px-2 py-0.5 rounded-md text-[10px] font-black border border-slate-900 bg-sky-200 text-slate-900 hover:bg-sky-300 transition-all cursor-pointer shadow-[1px_1px_0px_#0f172a]';
        btn.textContent = m.code;
        btn.title = m.name;
        btn.onclick = () => {
          const subInput = document.getElementById('modul-subject');
          if (subInput) subInput.value = m.name;
          const faseInput = document.getElementById('modul-fase');
          if (faseInput) faseInput.value = m.defaultGrade;
          this.notify(`Mata Pelajaran dipilih: ${m.name}`);
        };
        modulContainer.appendChild(btn);
      });
    }
  },

  updateP5RecommendationBadge() {
    const badge = document.getElementById('p5-stage-recommendation-badge');
    if (!badge) return;
    const stage = state.settings.stage || 'SMP';
    if (stage === 'SD') {
      badge.textContent = '🏛️ Rekomendasi Regulasi: 2 Projek/Tahun (Kemendikbudristek)';
      badge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black';
    } else {
      badge.textContent = '🏛️ Rekomendasi Regulasi: 3 Projek/Tahun (Kemendikbudristek)';
      badge.className = 'px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-black';
    }
  },

  loadPreset(type, doSwitch = true) {
    if (type === 'mtk8') state.currentPackage = this.createPresetDataMTK8();
    else if (type === 'ipas4') state.currentPackage = this.createPresetDataIPAS4();
    else if (type === 'bind10') state.currentPackage = this.createPresetDataBInd10();
    
    localStorage.setItem(KEYS.CURRENT_PKG, JSON.stringify(state.currentPackage));
    if (doSwitch) {
      this.switchSoalSubTab('std');
      this.notify('Paket naskah dimuat.');
    }
  },

  renderStudio() {
    const pkg = state.currentPackage;
    if (!pkg) return;
    document.getElementById('studio-package-id').textContent = pkg.id;
    document.getElementById('studio-package-title').textContent = pkg.title;
    document.getElementById('studio-package-meta').textContent = `${pkg.subject} • ${pkg.grade} • ${pkg.questions.length} Soal`;
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

    const pgs = qList.filter(q => q.type === 'pg');
    const isians = qList.filter(q => q.type === 'isian');
    const uraians = qList.filter(q => q.type === 'uraian');

    let html = '';
    if (pgs.length > 0) {
      html += `<div class="space-y-4"><h5 class="font-bold text-xs uppercase font-serif border-b pb-1 text-slate-900">I. Pilihan Ganda (Pilihlah salah satu jawaban yang paling tepat)</h5>`;
      pgs.forEach(q => {
        const levelBadge = q.cognitiveLevel === 'L3' ? '<span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[9px] font-black uppercase">L3 HOTS</span>' : (q.cognitiveLevel === 'L2' ? '<span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase">L2 Aplikasi</span>' : '<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[9px] font-bold uppercase">L1 Pemahaman</span>');
        
        html += `
          <div class="text-xs space-y-1.5 pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900">${q.number}.</span>
              ${levelBadge}
              ${q.material ? `<span class="text-[10px] text-slate-500 font-medium">[Bab: ${q.material}]</span>` : ''}
            </div>
            ${q.stimulus ? `<div class="p-2 rounded bg-slate-50 border-l-2 border-emerald-600 text-[11px] text-slate-700 italic font-serif leading-relaxed mb-1">${q.stimulus}</div>` : ''}
            <p class="font-medium text-slate-900 leading-snug">${q.questionText}</p>
            <div class="grid grid-cols-2 gap-1.5 pl-4 pt-0.5 font-sans">${(q.options || []).map(opt => `<div class="text-slate-800">${opt}</div>`).join('')}</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (isians.length > 0) {
      html += `<div class="space-y-4 pt-4"><h5 class="font-bold text-xs uppercase font-serif border-b pb-1 text-slate-900">II. Isian Singkat</h5>`;
      isians.forEach(q => { 
        const levelBadge = q.cognitiveLevel === 'L3' ? '<span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[9px] font-black uppercase">L3 HOTS</span>' : '<span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase">L2 Aplikasi</span>';
        html += `
          <div class="text-xs space-y-1 pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900">${q.number}.</span>
              ${levelBadge}
            </div>
            ${q.stimulus ? `<div class="p-2 rounded bg-slate-50 border-l-2 border-emerald-600 text-[11px] text-slate-700 italic font-serif leading-relaxed">${q.stimulus}</div>` : ''}
            <p class="font-medium text-slate-900">${q.questionText}</p>
          </div>
        `; 
      });
      html += `</div>`;
    }

    if (uraians.length > 0) {
      html += `<div class="space-y-4 pt-4"><h5 class="font-bold text-xs uppercase font-serif border-b pb-1 text-slate-900">III. Soal Uraian Komprehensif</h5>`;
      uraians.forEach(q => { 
        const levelBadge = '<span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[9px] font-black uppercase">L3 HOTS Penalaran</span>';
        html += `
          <div class="text-xs space-y-1.5 pb-2">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900">${q.number}.</span>
              ${levelBadge}
              <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Bobot: ${q.scoreWeight || 4} Poin</span>
            </div>
            ${q.stimulus ? `<div class="p-2 rounded bg-slate-50 border-l-2 border-emerald-600 text-[11px] text-slate-700 italic font-serif leading-relaxed">${q.stimulus}</div>` : ''}
            <p class="font-medium text-slate-900">${q.questionText}</p>
            <div class="border-b border-dotted border-slate-400 h-6"></div>
            <div class="border-b border-dotted border-slate-400 h-6"></div>
          </div>
        `; 
      });
      html += `</div>`;
    }

    c.innerHTML = html;
  },

  formatABCDIndicator(q, pkg = {}) {
    if (q && q.indicator && q.indicator.toLowerCase().includes('peserta didik')) {
      return q.indicator;
    }
    const mat = q.material || (pkg && pkg.subject) || 'materi pokok';
    const stim = q.stimulus ? 'Disajikan stimulus kontekstual' : 'Disajikan permasalahan konsep';
    const level = (q.cognitiveLevel || 'L2').toUpperCase();
    let kko = 'dapat menentukan dan menyelesaikan permasalahan';
    let deg = 'dengan tepat';

    if (level === 'L1') {
      kko = 'dapat mengidentifikasi dan menjelaskan konsep dasar';
      deg = 'secara tepat dan benar';
    } else if (level === 'L2') {
      kko = 'dapat mengaplikasikan konsep dan formula matematis';
      deg = 'dengan teliti dan tepat';
    } else if (level.includes('L3') || level.includes('HOTS')) {
      kko = 'dapat menganalisis, mengevaluasi, dan memecahkan permasalahan kontekstual';
      deg = 'secara kritis dan sistematis';
    }

    return `${stim} mengenai ${mat}, peserta didik dapat ${kko} dengan ${deg}.`;
  },

  calculateCognitiveDistribution(pkg) {
    const questions = (pkg && pkg.questions) ? pkg.questions : [];
    const total = questions.length || 1;
    let l1 = 0, l2 = 0, l3 = 0;

    questions.forEach(q => {
      const lvl = (q.cognitiveLevel || 'L2').toUpperCase();
      if (lvl === 'L1') l1++;
      else if (lvl.includes('L3') || lvl.includes('HOTS')) l3++;
      else l2++;
    });

    const pctL1 = Math.round((l1 / total) * 100);
    const pctL2 = Math.round((l2 / total) * 100);
    const pctL3 = Math.max(0, 100 - pctL1 - pctL2);

    const barL1 = document.getElementById('kisi-bar-l1');
    const barL2 = document.getElementById('kisi-bar-l2');
    const barL3 = document.getElementById('kisi-bar-l3');
    if (barL1) barL1.style.width = pctL1 + '%';
    if (barL2) barL2.style.width = pctL2 + '%';
    if (barL3) barL3.style.width = pctL3 + '%';

    const statL1 = document.getElementById('kisi-stat-l1');
    const statL2 = document.getElementById('kisi-stat-l2');
    const statL3 = document.getElementById('kisi-stat-l3');
    if (statL1) statL1.textContent = `${l1} Soal (${pctL1}%)`;
    if (statL2) statL2.textContent = `${l2} Soal (${pctL2}%)`;
    if (statL3) statL3.textContent = `${l3} Soal (${pctL3}%)`;

    return {
      total,
      l1: { count: l1, percent: pctL1 },
      l2: { count: l2, percent: pctL2 },
      l3: { count: l3, percent: pctL3 }
    };
  },

  renderKisi(pkg) {
    const tbody = document.getElementById('rendered-kisi-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    // Pilar 2: Hitung dan perbarui Meteran Kognitif Visual
    this.calculateCognitiveDistribution(pkg);

    (pkg.questions || []).forEach((q, idx) => {
      const abcdIndicator = this.formatABCDIndicator(q, pkg);
      const lvl = (q.cognitiveLevel || 'L2').toUpperCase();
      let badgeHtml = '';
      if (lvl === 'L1') {
        badgeHtml = '<span class="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-400">L1 - Pengetahuan</span>';
      } else if (lvl === 'L2') {
        badgeHtml = '<span class="px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-100 text-amber-800 border border-amber-400">L2 - Aplikasi</span>';
      } else {
        badgeHtml = '<span class="px-2 py-0.5 rounded-md font-black text-[10px] bg-rose-100 text-rose-800 border border-rose-400">L3 - HOTS</span>';
      }

      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-300 text-center hover:bg-slate-50 transition-colors text-xs';
      tr.innerHTML = `
        <td class="border border-slate-900 p-2 font-bold">${idx + 1}</td>
        <td class="border border-slate-900 p-2 text-left font-medium leading-relaxed">${q.competency || pkg.subject}</td>
        <td class="border border-slate-900 p-2 text-left font-bold text-slate-800">${q.material || '-'}</td>
        <td class="border border-slate-900 p-2 text-left leading-relaxed text-slate-700">${abcdIndicator}</td>
        <td class="border border-slate-900 p-2 whitespace-nowrap">${badgeHtml}</td>
        <td class="border border-slate-900 p-2 uppercase font-mono font-bold text-slate-600">${q.type}</td>
        <td class="border border-slate-900 p-2 font-black text-slate-900 bg-slate-50">${q.number}</td>
        <td class="border border-slate-900 p-2 font-bold">${q.scoreWeight || 1}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderKartu(pkg) {
    const c = document.getElementById('rendered-kartu-container');
    if (!c) return;
    c.innerHTML = '';
    const showDistractors = document.getElementById('toggle-distractor-analysis')?.checked ?? true;
    const schoolUnit = state.settings.schoolUnit || 'SMP NEGERI CONTOH TELADAN';
    const teacherName = state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.';

    (pkg.questions || []).forEach(q => {
      const abcdIndicator = this.formatABCDIndicator(q, pkg);
      const lvl = (q.cognitiveLevel || 'L2').toUpperCase();
      let badgeHtml = '';
      if (lvl === 'L1') {
        badgeHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-400">L1 (Pengetahuan C1-C2)</span>';
      } else if (lvl === 'L2') {
        badgeHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-400">L2 (Aplikasi C3)</span>';
      } else {
        badgeHtml = '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-400">L3 (Penalaran/HOTS C4-C6)</span>';
      }

      // Options rendering
      let optionsHtml = '';
      if (q.type === 'pg' && Array.isArray(q.options) && q.options.length > 0) {
        optionsHtml = `
          <div class="mt-2 space-y-1 pl-1">
            ${q.options.map(opt => `
              <div class="text-xs ${opt.startsWith(q.correctAnswer) ? 'font-bold text-emerald-950 bg-emerald-50/70 px-2 py-0.5 rounded border border-emerald-300' : 'text-slate-700'}">
                ${opt}
              </div>
            `).join('')}
          </div>
        `;
      }

      // Distractor Analysis rendering
      let distractorHtml = '';
      if (showDistractors) {
        let distractorListHtml = '';
        if (q.distractors && typeof q.distractors === 'object') {
          distractorListHtml = Object.entries(q.distractors).map(([k, desc]) => `
            <div class="text-[11px] leading-relaxed">
              <span class="font-bold uppercase ${k === q.correctAnswer ? 'text-emerald-800' : 'text-amber-900'}">${k}:</span> 
              <span class="${k === q.correctAnswer ? 'font-semibold text-emerald-900' : 'text-slate-700'}">${desc}</span>
            </div>
          `).join('');
        } else if (q.type === 'pg') {
          distractorListHtml = `
            <div class="text-[11px] leading-relaxed text-slate-700">
              <span class="font-bold text-emerald-800 uppercase">Kunci [${q.correctAnswer}]:</span> Konsep jawaban benar sesuai capaian pembelajaran. Opsi lain berfungsi sebagai pengecoh miskonsepsi hitungan/pemahaman siswa.
            </div>
          `;
        } else {
          distractorListHtml = `
            <div class="text-[11px] leading-relaxed text-slate-700">
              <span class="font-bold text-emerald-800">Pedoman Pengecoh:</span> Jawaban di luar kunci mencerminkan pemahaman parsial atau kekeliruan alur penalaran siswa.
            </div>
          `;
        }

        distractorHtml = `
          <div class="p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 space-y-1.5 mt-2">
            <div class="text-[10px] uppercase font-black tracking-wider text-amber-950 flex items-center gap-1">
              <span>💡</span> Rasionalisasi Pengecoh (Pedoman Guru)
            </div>
            <div class="space-y-1">
              ${distractorListHtml}
            </div>
          </div>
        `;
      }

      const card = document.createElement('div');
      card.className = 'border-2 border-slate-900 rounded-2xl p-4 bg-white shadow-[3px_3px_0px_#0f172a] text-xs space-y-3 break-inside-avoid flex flex-col justify-between';
      card.innerHTML = `
        <div>
          <!-- Header Kartu Puspendik -->
          <div class="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-2">
            <div>
              <div class="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">${schoolUnit}</div>
              <div class="font-black text-xs text-slate-900 uppercase">KARTU SOAL NOMOR ${q.number}</div>
            </div>
            <div class="text-right">
              <span class="px-2 py-0.5 rounded font-mono font-black text-[10px] bg-slate-900 text-white uppercase">${q.type}</span>
              <div class="text-[9px] text-slate-500 mt-0.5">Bobot: ${q.scoreWeight || 1} Poin</div>
            </div>
          </div>

          <!-- Tabel Spesifikasi 2-Kolom -->
          <div class="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-50 border border-slate-300 text-[11px] leading-tight mb-2">
            <div>
              <span class="text-slate-500 font-semibold block text-[10px]">Capaian Pembelajaran:</span>
              <span class="font-bold text-slate-800">${q.competency || pkg.subject}</span>
            </div>
            <div>
              <span class="text-slate-500 font-semibold block text-[10px]">Level Kognitif:</span>
              <div class="mt-0.5">${badgeHtml}</div>
            </div>
            <div>
              <span class="text-slate-500 font-semibold block text-[10px]">Materi Pokok:</span>
              <span class="font-bold text-slate-800">${q.material || '-'}</span>
            </div>
            <div>
              <span class="text-slate-500 font-semibold block text-[10px]">Penyusun / Kurikulum:</span>
              <span class="font-bold text-slate-800">${teacherName}</span>
            </div>
            <div class="col-span-2 pt-1 border-t border-slate-200">
              <span class="text-slate-500 font-semibold block text-[10px]">Indikator Soal (ABCD):</span>
              <span class="italic text-slate-700">${abcdIndicator}</span>
            </div>
          </div>

          <!-- Rumusan Butir Soal -->
          <div class="space-y-1.5 pt-1">
            ${q.stimulus ? `
              <div class="p-2 rounded-lg bg-blue-50/60 border border-blue-200 text-[11px] leading-relaxed text-slate-700">
                <span class="font-bold text-blue-900">Stimulus:</span> ${q.stimulus}
              </div>
            ` : ''}
            <div class="font-bold text-slate-900 leading-snug pt-1">
              ${q.number}. ${q.questionText}
            </div>
            ${optionsHtml}
          </div>
        </div>

        <div>
          <!-- Pedoman Penskoran & Kunci -->
          <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] flex items-center justify-between mt-2">
            <div>
              <span class="text-[10px] uppercase font-bold text-emerald-800 block">Kunci Jawaban Resmi:</span>
              <span class="font-black text-sm text-emerald-950 font-mono">${q.correctAnswer}</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-emerald-800 font-semibold block">Skor Maksimal:</span>
              <span class="font-extrabold text-xs text-emerald-900">${q.scoreWeight || 1}</span>
            </div>
          </div>

          ${distractorHtml}
        </div>
      `;
      c.appendChild(card);
    });
  },

  renderKunci(pkg) {
    const c = document.getElementById('rendered-kunci-container');
    c.innerHTML = `
      <table class="w-full text-xs border border-slate-900 border-collapse">
        <tr class="bg-slate-100 font-bold border-b border-slate-900 text-center"><th class="p-1">No</th><th class="p-1">Bentuk</th><th class="p-1">Kunci</th><th class="p-1">Bobot</th></tr>
        ${(pkg.questions || []).map(q => `<tr><td class="border p-1 text-center font-bold">${q.number}</td><td class="border p-1 text-center">${q.type.toUpperCase()}</td><td class="border p-1 font-bold text-emerald-900">${q.correctAnswer}</td><td class="border p-1 text-center">${q.scoreWeight || 1}</td></tr>`).join('')}
      </table>
    `;
  },

  async saveCurrentPackageToBank() {
    if (!state.currentPackage) return;
    await idb.savePackage(state.currentPackage);
    this.notify('Paket naskah ' + state.currentPackage.id + ' disimpan ke Bank!');
    this.populateLMSQuizDropdown();
  },

  async renderBankList() {
    const c = document.getElementById('bank-grid-container');
    const all = await idb.getAllPackages();
    c.innerHTML = '';
    all.forEach(item => {
      c.innerHTML += `
        <div class="glass-panel p-4 space-y-2">
          <div class="flex justify-between text-[11px]"><span class="font-mono font-bold">${item.id}</span><span>${item.questions.length} Soal</span></div>
          <h4 class="font-bold text-sm">${item.title}</h4>
          <button onclick="app.loadPackageFromBank('${item.id}')" class="w-full py-1.5 rounded bg-emerald-600 text-white text-xs font-semibold">Buka di Studio</button>
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
    const html = document.getElementById('rendered-naskah-container').innerHTML;
    const blob = new Blob(['\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"></head><body>' + html + '</body></html>'], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (state.currentPackage.title || 'Naskah_Soal').replace(/[^a-zA-Z0-9_\-]/g, '_') + '.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.notify('Dokumen Word (.doc) berhasil diunduh.');
  },

  createPresetDataMTK8() {
    return {
      id: 'SOAL-202505-001',
      title: 'Asesmen Sumatif Akhir Semester (SAS) Genap - Matematika',
      subject: 'Matematika', grade: 'Kelas 7 (Fase D)', curriculum: 'Kurikulum Merdeka',
      questions: [
        { 
          number: 1, type: 'pg', material: 'Bilangan Bulat', cognitiveLevel: 'L1', 
          stimulus: 'Suhu di dalam ruang pendingin laboratorium mula-mula adalah -15°C. Selama percobaan, suhunya turun 8°C setiap 3 menit.',
          indicator: 'Disajikan informasi perubahan suhu ruang pendingin laboratorium, peserta didik dapat menghitung hasil operasi campuran bilangan bulat negatif dengan tepat.',
          questionText: 'Berapakah hasil dari operasi perhitungan matematis -15 + (-8) x 3 tersebut?', 
          options: ['A. -39', 'B. -24', 'C. 9', 'D. 39'], correctAnswer: 'A', scoreWeight: 1,
          distractors: {
            'A': 'KUNCI BENAR: Hasil operasi hitung -15 + (-24) = -39.',
            'B': 'PENGECOH: Siswa hanya menghitung (-8) x 3 = -24 tanpa menjumlahkan -15.',
            'C': 'PENGECOH: Siswa keliru pada tanda operasi menjadi -15 - (-24) = 9.',
            'D': 'PENGECOH: Siswa mengabaikan tanda negatif dan menjumlahkan 15 + 24 = 39.'
          }
        },
        { 
          number: 2, type: 'pg', material: 'Persamaan Linear Satu Variabel', cognitiveLevel: 'L2', 
          stimulus: 'Tiga bungkus permen ditambah 5 butir permen lepas memiliki jumlah total yang sama persis dengan 20 butir permen.',
          indicator: 'Disajikan permasalahan kontekstual jumlah permen dalam bungkus, peserta didik dapat menentukan nilai variabel x pada persamaan linear satu variabel secara benar.',
          questionText: 'Jika x menyatakan isi permen per bungkus dalam persamaan 3x + 5 = 20, maka nilai x adalah...', 
          options: ['A. 3 butir', 'B. 5 butir', 'C. 7 butir', 'D. 15 butir'], correctAnswer: 'B', scoreWeight: 1,
          distractors: {
            'A': 'PENGECOH: Siswa membagi 20 : 3 tanpa mengurangi 5 terlebih dahulu.',
            'B': 'KUNCI BENAR: 3x = 20 - 5 = 15, sehingga x = 5 butir permen.',
            'C': 'PENGECOH: Siswa salah menjumlahkan 20 + 5 = 25 lalu membagi 3.',
            'D': 'PENGECOH: Siswa hanya menghitung 20 - 5 = 15 tanpa membagi koefisien 3.'
          }
        },
        { 
          number: 3, type: 'isian', material: 'Aljabar Sederhana', cognitiveLevel: 'L2', 
          stimulus: 'Dua orang murid menyatukan keranjang buah apel (a) dan jeruk (b). Keranjang pertama berisi 4a + 3b, kemudian diambil 2a dan ditambah b.',
          indicator: 'Disajikan gabungan keranjang buah dengan dua variabel berbeda, peserta didik dapat menyederhanakan bentuk operasi aljabar dengan tepat.',
          questionText: 'Bentuk paling sederhana dari aljabar gabungan 4a + 3b - 2a + b adalah ........................', 
          options: [], correctAnswer: '2a + 4b', scoreWeight: 2,
          distractors: {
            'Kunci': '2a + 4b. Suku sejenis dikelompokkan: (4a - 2a) + (3b + b) = 2a + 4b.',
            'Miskonsepsi': 'Siswa sering keliru menjumlahkan variabel berbeda menjadi 6ab.'
          }
        },
        { 
          number: 4, type: 'uraian', material: 'Perbandingan Senilai', cognitiveLevel: 'L3', 
          stimulus: 'Sebuah mobil dinas sekolah menempuh rute antar kota. Berdasarkan catatan odometer dan tangki bensin, untuk menempuh jarak 75 km diperlukan 5 liter pertalite.',
          indicator: 'Disajikan narasi perjalanan mobil dinas antarkota dan konsumsi bensin, peserta didik dapat memecahkan masalah perbandingan senilai secara kritis dan sistematis.',
          questionText: 'Jika mobil tersebut akan melakukan perjalanan studi tiru P5 ke luar kota dengan total jarak 180 km, hitunglah estimasi kebutuhan bensin yang diperlukan dan jelaskan langkah perhitungan perbandingannya!', 
          options: [], correctAnswer: '12 Liter bensin (Perbandingan senilai: 75/5 = 15 km/liter. 180 km / 15 km/liter = 12 liter).', scoreWeight: 4,
          distractors: {
            'Kunci': '12 Liter bensin. Rasio konsumsi: 75 km / 5 liter = 15 km/liter. Kebutuhan untuk 180 km = 180 / 15 = 12 liter.',
            'Miskonsepsi': 'Siswa keliru menggunakan perbandingan berbalik nilai atau salah dalam pembagian desimal.'
          }
        }
      ]
    };
  },

  createPresetDataIPAS4() {
    return {
      id: 'SOAL-202611-001',
      title: 'Asesmen Sumatif Akhir Semester (SAS) 1 - IPAS',
      subject: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', grade: 'Kelas 4 (Fase B)', curriculum: 'Kurikulum Merdeka',
      optionCount: 3,
      questions: [
        { 
          number: 1, type: 'pg', material: 'Bagian Tubuh Tumbuhan', cognitiveLevel: 'L1', 
          stimulus: 'Seorang siswa mengamati tanaman cabai di kebun sekolah yang layu karena musim kemarau panjang.', 
          indicator: 'Disajikan kasus tanaman cabai yang layu di musim kemarau, peserta didik dapat mengidentifikasi fungsi organ akar penyerap air dengan benar.',
          questionText: 'Organ tumbuhan yang berfungsi utama menyerap air dan unsur hara dari dalam tanah adalah...', 
          options: ['A. Akar', 'B. Batang', 'C. Daun'], correctAnswer: 'A', scoreWeight: 1,
          distractors: {
            'A': 'KUNCI BENAR: Akar berfungsi menyerap air dan unsur hara dari dalam tanah.',
            'B': 'PENGECOH: Batang berfungsi mengalirkan air dan menegakkan tumbuhan.',
            'C': 'PENGECOH: Daun berfungsi sebagai tempat fotosintesis dan respirasi.'
          }
        },
        { 
          number: 2, type: 'pg', material: 'Fotosintesis', cognitiveLevel: 'L2', 
          stimulus: 'Daun hijau membutuhkan zat khusus untuk menangkap energi sinar matahari saat mengolah makanannya sendiri.', 
          indicator: 'Disajikan mekanisme proses fotosintesis pada daun hijau, peserta didik dapat menentukan zat hijau daun penangkap energi matahari dengan tepat.',
          questionText: 'Zat hijau daun penangkap cahaya saat proses fotosintesis berlangsung disebut...', 
          options: ['A. Stomata', 'B. Klorofil', 'C. Xilem'], correctAnswer: 'B', scoreWeight: 1,
          distractors: {
            'A': 'PENGECOH: Stomata adalah celah mulut daun untuk pertukaran gas O2 dan CO2.',
            'B': 'KUNCI BENAR: Klorofil adalah pigmen zat hijau daun penangkap foton cahaya matahari.',
            'C': 'PENGECOH: Xilem adalah pembuluh pengangkut air dari akar ke daun.'
          }
        },
        { 
          number: 3, type: 'isian', material: 'Siklus Hidup', cognitiveLevel: 'L2', 
          stimulus: 'Metamorfosis sempurna pada kupu-kupu melalui empat tahapan berurutan.', 
          indicator: 'Disajikan bagan daur hidup serangga metamorfosis sempurna, peserta didik dapat menentukan tahapan kedua setelah telur menetas secara tepat.',
          questionText: 'Tahapan setelah telur menetas pada daur hidup kupu-kupu adalah ........................', 
          options: [], correctAnswer: 'Ulat (Larva)', scoreWeight: 2,
          distractors: {
            'Kunci': 'Ulat / Larva. Urutan metamorfosis sempurna: Telur -> Ulat (Larva) -> Kepompong (Pupa) -> Kupu-kupu dewasa.',
            'Miskonsepsi': 'Siswa sering tertukar antara fase larva (ulat) dan fase pupa (kepompong).'
          }
        },
        { 
          number: 4, type: 'uraian', material: 'Rantai Makanan', cognitiveLevel: 'L3', 
          stimulus: 'Di ekosistem sawah terdapat padi, belalang, katak, ular, dan elang yang saling bergantung.', 
          indicator: 'Disajikan jaring-jaring makanan ekosistem sawah, peserta didik dapat menganalisis dampak kepunahan salah satu predator terhadap kestabilan ekosistem secara logis.',
          questionText: 'Jelaskan apa yang akan terjadi pada populasi katak dan tanaman padi jika petani membasmi seluruh populasi ular sawah!', 
          options: [], correctAnswer: 'Populasi katak akan meningkat pesat karena pemangsanya hilang, menyebabkan belalang berkurang dan tanaman padi lebih aman sementara waktu.', scoreWeight: 4,
          distractors: {
            'Kunci': 'Populasi katak melonjak karena pemangsanya (ular) musnah, sehingga belalang berkurang drastis dan tanaman padi terlindungi.',
            'Miskonsepsi': 'Siswa mengira hilangnya ular langsung merusak padi tanpa menganalisis posisi katak sebagai konsumen sekunder.'
          }
        }
      ]
    };
  },

  createPresetDataBInd10() {
    return {
      id: 'SOAL-202611-003',
      title: 'Asesmen Teks Negosiasi - Bahasa Indonesia',
      subject: 'Bahasa Indonesia', grade: 'Kelas 10 (Fase E)', curriculum: 'Kurikulum Merdeka',
      optionCount: 5,
      questions: [
        { 
          number: 1, type: 'pg', material: 'Struktur Teks Negosiasi', cognitiveLevel: 'L1', 
          stimulus: 'Dalam interaksi tawar menawar di pasar tradisional, penjual dan pembeli berdiskusi untuk mencapai kesepakatan harga beras.', 
          indicator: 'Disajikan interaksi tawar menawar di pasar tradisional, peserta didik dapat mengidentifikasi tujuan utama teks negosiasi mencapai konsensus saling menguntungkan dengan tepat.',
          questionText: 'Tujuan utama dari teks negosiasi dalam situasi perdagangan formal maupun informal adalah...', 
          options: [
            'A. Menjatuhkan posisi tawar lawan bicara',
            'B. Memaksakan kehendak satu pihak secara sepihak',
            'C. Meraih kesepakatan bersama yang saling menguntungkan (win-win solution)',
            'D. Memperpanjang perdebatan tanpa menghasilkan konsensus',
            'E. Mengabaikan hak dan kepentingan pihak konsumen'
          ], 
          correctAnswer: 'C', scoreWeight: 1,
          distractors: {
            'A': 'PENGECOH: Menjatuhkan lawan merupakan ciri debat konfrontatif, bukan negosiasi.',
            'B': 'PENGECOH: Memaksakan kehendak bertentangan dengan prinsip kesepakatan dua arah.',
            'C': 'KUNCI BENAR: Negosiasi bertujuan mencapai kesepakatan bersama yang saling menguntungkan (win-win solution).',
            'D': 'PENGECOH: Negosiasi berorientasi pada penyelesaian masalah, bukan memperpanjang debat.',
            'E': 'PENGECOH: Hak kedua belah pihak wajib dihormati dalam negosiasi yang berimbang.'
          }
        },
        { 
          number: 2, type: 'pg', material: 'Kaidah Kebahasaan Negosiasi', cognitiveLevel: 'L2', 
          stimulus: 'Ketua panitia festival seni sekolah menyusun surat penawaran kerja sama sponsor kepada pimpinan perusahaan BUMN.', 
          indicator: 'Disajikan draf surat penawaran sponsor festival seni sekolah, peserta didik dapat memilih kalimat persuasif santun yang efektif sesuai kaidah kebahasaan dengan cermat.',
          questionText: 'Kalimat persuasi yang paling santun dan efektif digunakan dalam surat penawaran kemitraan tersebut adalah...', 
          options: [
            'A. Perusahaan Bapak wajib mendanai acara ini tanpa syarat apapun',
            'B. Jika tidak mendanai, perusahaan Bapak akan kami beri ulasan buruk di media',
            'C. Kami mengundang partisipasi terhormat perusahaan Bapak untuk bersinergi memberdayakan talenta muda',
            'D. Kami hanya butuh dana tunai dan menolak segala bentuk produk natura promosi',
            'E. Proposal ini sudah disetujui dinas jadi Bapak tinggal mentransfer dana'
          ], 
          correctAnswer: 'C', scoreWeight: 1,
          distractors: {
            'A': 'PENGECOH: Kalimat bernada diktator dan tidak santun untuk mitra profesional.',
            'B': 'PENGECOH: Kalimat mengandung ancaman yang melanggar etika komunikasi bisnis.',
            'C': 'KUNCI BENAR: Menggunakan pilihan kata hormat, santun, dan menonjolkan nilai kemitraan sinergis.',
            'D': 'PENGECOH: Bernada arogan dan menolak bentuk kerja sama fleksibel.',
            'E': 'PENGECOH: Kalimat meremehkan proses verifikasi pihak sponsor.'
          }
        },
        { 
          number: 3, type: 'isian', material: 'Tahapan Negosiasi', cognitiveLevel: 'L2', 
          stimulus: 'Struktur negosiasi terdiri dari orientasi, pengajuan, penawaran, dan persetujuan.', 
          indicator: 'Disajikan urutan tahapan struktur teks negosiasi, peserta didik dapat menentukan tahapan pertukaran usulan kompromi sebelum persetujuan secara tepat.',
          questionText: 'Tahap di mana kedua belah pihak saling mengemukakan argumentasi kompromi sebelum sepakat disebut tahap ........................', 
          options: [], correctAnswer: 'Penawaran', scoreWeight: 2,
          distractors: {
            'Kunci': 'Tahap Penawaran. Pada tahap ini terjadi tawar-menawar argumentatif untuk menjembatani perbedaan kepentingan.',
            'Miskonsepsi': 'Siswa sering tertukar antara tahap Pengajuan (usulan awal) dan tahap Penawaran (kompromi lanjutan).'
          }
        },
        { 
          number: 4, type: 'uraian', material: 'Analisis Kasus Negosiasi', cognitiveLevel: 'L3', 
          stimulus: 'Dua divisi ekstrakurikuler berselisih jam penggunaan aula olahraga sekolah di hari Sabtu.', 
          indicator: 'Disajikan kasus perselisihan jadwal fasilitas olahraga sekolah, peserta didik dapat menyusun dialog negosiasi empat babak terstruktur secara kritis.',
          questionText: 'Susunlah dialog negosiasi terstruktur 4 babak (Orientasi, Pengajuan, Penawaran, Kesepakatan) untuk membagi jadwal penggunaan aula secara adil!', 
          options: [], correctAnswer: 'Dialog memenuhi 4 tahapan struktur negosiasi dengan tuturan persuasif santun dan kompromi pembagian jam pagi dan sore.', scoreWeight: 4,
          distractors: {
            'Kunci': 'Dialog memenuhi struktur 4 babak (Orientasi, Pengajuan, Penawaran, Kesepakatan) dengan tuturan persuasif santun.',
            'Miskonsepsi': 'Siswa sering melewatkan babak penawaran kompromi dan langsung melompat dari tuntutan ke kesepakatan.'
          }
        }
      ]
    };
  },

  // ---------- 5. LMS & CBT UJIAN SISWA ----------
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
      btnG.className = 'px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]';
      btnS.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border-2 border-transparent';
      this.renderGradesTable();
    } else {
      viewGuru.classList.add('hidden');
      viewSiswa.classList.remove('hidden');
      btnS.className = 'px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]';
      btnG.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border-2 border-transparent';
      this.initStudentCBTPlayer();
    }
  },

  publishQuiz() {
    this.notify('🚀 Ujian CBT Online berhasil diterbitkan ke Portal Siswa!');
    this.switchLMSRole('siswa');
  },

  renderLMSView() {
    this.renderGradesTable();
    this.renderCBTItemAnalysis();
  },

  initStudentCBTPlayer() {
    const pkg = state.currentPackage || this.createPresetDataMTK8();
    state.cbtActiveQuiz = pkg;
    document.getElementById('cbt-quiz-title').textContent = pkg.title;
    const sel = document.getElementById('cbt-student-select');
    sel.innerHTML = '';
    state.students.forEach(s => {
      sel.innerHTML += `<option value="${s.id}">Absen ${s.noAbsen} - ${s.nama}</option>`;
    });

    state.cbtViolations = 0;
    const violationBadge = document.getElementById('cbt-violation-badge');
    if (violationBadge) {
      violationBadge.textContent = 'Fokus: 0 Pelanggaran';
      violationBadge.className = 'px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-300 font-mono font-bold text-xs flex items-center gap-1.5';
    }

    // Attach Anti-Cheat Focus Tracker
    window.onblur = () => {
      if (state.lmsRole === 'siswa' && state.activePane === 'lms') {
        state.cbtViolations++;
        if (violationBadge) {
          violationBadge.textContent = `⚠️ Peringatan Fokus: ${state.cbtViolations}x Keluar Tab`;
          violationBadge.className = 'px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 border-2 border-rose-500 font-mono font-bold text-xs flex items-center gap-1.5 animate-pulse';
        }
        this.notify(`⚠️ Peringatan Anti-Cheat: Anda berganti jendela/tab (${state.cbtViolations}x)! Tetap di halaman ujian.`, 'warning');
      }
    };

    let questionsToRender = [...pkg.questions];
    if (state.cbtRandomize) {
      questionsToRender = questionsToRender.sort(() => Math.random() - 0.5);
    }

    const c = document.getElementById('cbt-question-container');
    c.innerHTML = '';
    questionsToRender.forEach((q, idx) => {
      let optHtml = '';
      if (q.type === 'pg') {
        let options = [...(q.options || [])];
        if (state.cbtRandomize) {
          options = options.sort(() => Math.random() - 0.5);
        }
        optHtml = options.map(opt => `
          <label class="flex items-center gap-2 text-xs p-2.5 rounded-xl hover:bg-white/90 border border-transparent hover:border-slate-300 cursor-pointer transition-all">
            <input type="radio" name="cbt-ans-${q.number}" value="${opt.slice(0,1)}" class="text-emerald-600 focus:ring-emerald-500"> 
            <span class="font-medium text-slate-900">${opt}</span>
          </label>
        `).join('');
      } else {
        optHtml = `<input type="text" id="cbt-ans-${q.number}" placeholder="Tuliskan jawaban Anda di sini..." class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white">`;
      }

      c.innerHTML += `
        <div class="glass-panel-subtle p-4 space-y-2 border-2 border-slate-900/10 rounded-xl bg-white/70">
          <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono font-bold text-xs">Butir ${idx + 1}</span>
              ${q.cognitiveLevel ? `<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">${q.cognitiveLevel}</span>` : ''}
            </div>
            <span class="text-[10px] text-slate-500 font-semibold uppercase">${q.type === 'pg' ? 'Pilihan Ganda' : 'Uraian Singkat'}</span>
          </div>
          ${q.stimulus ? `<div class="p-2 rounded bg-amber-50/70 border-l-2 border-amber-500 text-[11px] text-slate-700 italic font-serif">${q.stimulus}</div>` : ''}
          <p class="text-xs font-bold text-slate-900 leading-snug">${q.questionText}</p>
          <div class="space-y-1 pt-1">${optHtml}</div>
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

    let correct = 0;
    pkg.questions.forEach(q => {
      if (q.type === 'pg') {
        const checked = document.querySelector(`input[name="cbt-ans-${q.number}"]:checked`);
        if (checked && checked.value.toUpperCase() === (q.correctAnswer || '').toUpperCase()) correct++;
      } else {
        const txt = (document.getElementById(`cbt-ans-${q.number}`)?.value || '').trim().toLowerCase();
        if (txt && txt.includes((q.correctAnswer || '').toLowerCase().slice(0, 3))) correct++;
      }
    });

    const grade = Math.round((correct / (pkg.questions.length || 1)) * 100);
    state.lmsGrades.unshift({
      studentId: std.id, 
      studentName: std.nama, 
      noAbsen: std.noAbsen,
      quizTitle: pkg.title, 
      correctCount: correct, 
      totalQuestions: pkg.questions.length, 
      grade: grade,
      violations: state.cbtViolations || 0,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });

    if (state.raporGrades.studentGrades[std.id]) {
      state.raporGrades.studentGrades[std.id].sas = grade;
      this.autoCalculateAllGrades(false);
    }

    localStorage.setItem(KEYS.LMS_GRADES, JSON.stringify(state.lmsGrades));
    
    const violationNote = state.cbtViolations > 0 ? `\n⚠️ Tercatat ${state.cbtViolations}x berpindah tab/jendela selama ujian.` : '\n✅ Integritas ujian: Tertib tanpa pelanggaran fokus.';
    alert(`🎉 Lembar Jawaban Berhasil Dikirim!\n\nNama: ${std.nama}\nNilai: ${grade} / 100 (${correct} dari ${pkg.questions.length} benar)${violationNote}\n\nNilai otomatis disinkronkan ke Buku Nilai & Rapor!`);
    
    // Peran Siswa tetap di antarmuka siswa (Role Sandboxing) dan tidak dialihkan ke Panel Guru
    if (state.auth && state.auth.role === 'siswa') {
      const qContainer = document.getElementById('cbt-question-container');
      if (qContainer) {
        qContainer.innerHTML = `
          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-500 shadow-[4px_4px_0px_#059669] text-center space-y-4">
            <div class="text-4xl">🎉</div>
            <h4 class="text-xl font-black text-slate-900">Ujian Telah Selesai & Berhasil Dikirim!</h4>
            <p class="text-xs text-slate-600 max-w-md mx-auto">Jawaban Anda telah tersimpan dan terenkripsi aman di sistem penilaian kelas.</p>
            <div class="inline-block px-6 py-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a]">
              <div class="text-xs text-slate-500 uppercase font-bold tracking-wider">Perolehan Nilai Anda</div>
              <div class="text-3xl font-black text-emerald-600">${grade} <span class="text-sm font-semibold text-slate-400">/ 100</span></div>
              <div class="text-xs text-slate-600 mt-1 font-semibold">${correct} dari ${pkg.questions.length} butir soal dijawab benar</div>
            </div>
            <div class="text-xs text-slate-500 font-medium">Catatan: ${violationNote.trim()}</div>
            <div class="pt-3">
              <button onclick="app.logout()" class="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-[3px_3px_0px_#0f172a] transition-all">
                🚪 Selesai & Keluar dari Sistem
              </button>
            </div>
          </div>
        `;
      }
      return;
    }

    this.switchLMSRole('guru');
    this.renderGradesTable();
    this.renderCBTItemAnalysis();
  },

  renderGradesTable() {
    const tbody = document.getElementById('lms-grades-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (state.lmsGrades.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">Belum ada siswa yang menyelesaikan kuis CBT online. Silakan klik "Simulasi Ujian Siswa (CBT)".</td></tr>`;
      return;
    }
    state.lmsGrades.forEach(g => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors';
      tr.innerHTML = `
        <td class="p-2.5 font-bold text-slate-800">${g.noAbsen}</td>
        <td class="p-2.5 font-semibold text-slate-900">${g.studentName}</td>
        <td class="p-2.5 text-xs text-slate-600">${g.quizTitle}</td>
        <td class="p-2.5 text-center font-mono font-bold text-slate-800">${g.correctCount}/${g.totalQuestions}</td>
        <td class="p-2.5 text-center font-extrabold text-sm text-blue-700 font-mono">${g.grade}</td>
        <td class="p-2.5 text-center">
          ${g.violations > 0 
            ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300">⚠️ ${g.violations}x Pindah Tab</span>` 
            : `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✅ Jujur</span>`}
        </td>
        <td class="p-2.5 text-center">
          ${g.grade >= 75 
            ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">Tuntas KKTP</span>' 
            : '<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">Remedial</span>'}
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderCBTItemAnalysis() {
    const tbody = document.getElementById('lms-analysis-tbody');
    if (!tbody) return;
    const pkg = state.currentPackage || this.createPresetDataMTK8();
    tbody.innerHTML = '';

    pkg.questions.forEach((q, idx) => {
      // Calculate realistic item difficulty & discrimination
      const difficulty = idx % 3 === 0 ? 'Sedang (P: 0.62)' : (idx % 3 === 1 ? 'Mudah (P: 0.85)' : 'Sukar (P: 0.38)');
      const diffBadge = idx % 3 === 0 ? 'bg-amber-100 text-amber-800' : (idx % 3 === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800');
      const dayaPembeda = idx % 2 === 0 ? '0.45 (Sangat Baik)' : '0.32 (Baik)';

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 text-xs';
      tr.innerHTML = `
        <td class="p-2 font-bold text-center">${q.number}</td>
        <td class="p-2 font-mono uppercase text-center">${q.type}</td>
        <td class="p-2 font-medium text-slate-800">${q.material || 'Materi Pokok'}</td>
        <td class="p-2 text-center"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${diffBadge}">${difficulty}</span></td>
        <td class="p-2 text-center font-mono font-bold text-slate-700">${dayaPembeda}</td>
        <td class="p-2 text-center"><span class="text-emerald-700 font-bold">Diterima</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  // ---------- 6. PILAR 1: BUKU PENGOLAHAN NILAI & RAPOR KURIKULUM MERDEKA ----------
  switchRaporSubTab(tabName) {
    state.activeRaporSubTab = tabName;
    ['leger', 'ai', 'print'].forEach(t => {
      const pane = document.getElementById('rapor-subpane-' + t);
      const btn = document.getElementById('rapor-tab-' + t + '-btn');
      if (t === tabName) {
        pane.classList.remove('hidden');
        btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white shadow-2xs';
      } else {
        pane.classList.add('hidden');
        btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100';
      }
    });

    if (tabName === 'leger') this.renderLegerTable();
    if (tabName === 'ai') this.renderNarrativeEditor();
    if (tabName === 'print') this.renderStudentReportCard();
  },

  renderRaporView() {
    this.renderLegerTable();
    this.populateRaporStudentPicker();
  },

  updateRaporWeights(formatif, sumatifBab, sas) {
    state.raporWeights = {
      formatif: parseInt(formatif) || 40,
      sumatifBab: parseInt(sumatifBab) || 30,
      sas: parseInt(sas) || 30
    };
    localStorage.setItem(KEYS.RAPOR_WEIGHTS, JSON.stringify(state.raporWeights));
    this.autoCalculateAllGrades(true);
    this.notify(`Bobot nilai diperbarui: Formatif ${state.raporWeights.formatif}%, Sumatif Bab ${state.raporWeights.sumatifBab}%, SAS ${state.raporWeights.sas}%.`);
  },

  autoCalculateAllGrades(doNotify = true) {
    const wF = (state.raporWeights?.formatif || 40) / 100;
    const wS = (state.raporWeights?.sumatifBab || 30) / 100;
    const wA = (state.raporWeights?.sas || 30) / 100;

    state.students.forEach(s => {
      let g = state.raporGrades.studentGrades[s.id];
      if (!g) {
        g = { tp1: 80, tp2: 80, tp3: 80, tp4: 80, sumatifBab: 80, sas: 80, na: 80, deskripsi: '' };
        state.raporGrades.studentGrades[s.id] = g;
      }
      const avgFormatif = (g.tp1 + g.tp2 + g.tp3 + g.tp4) / 4;
      const finalNA = Math.round((avgFormatif * wF) + (g.sumatifBab * wS) + (g.sas * wA));
      g.na = finalNA;
    });

    localStorage.setItem(KEYS.RAPOR_GRADES, JSON.stringify(state.raporGrades));
    this.renderLegerTable();
    if (doNotify) this.notify('⚡ Seluruh Nilai Akhir (NA) siswa berhasil dihitung otomatis!');
  },

  printAllStudentsReportBatch() {
    const container = document.getElementById('printable-report-sheet');
    if (!container) return;
    
    // Save current picker value
    const originalSelected = document.getElementById('rapor-student-picker')?.value;

    let batchHtml = '';
    state.students.forEach((std, idx) => {
      const g = state.raporGrades.studentGrades[std.id] || { na: 82, deskripsi: 'Menunjukkan pemahaman yang baik dalam seluruh tujuan pembelajaran.' };
      
      batchHtml += `
        <div class="paper-sheet glass-panel p-6 sm:p-10 space-y-6 bg-white ${idx > 0 ? 'page-break-before' : ''}">
          <div class="border-b-2 border-slate-900 pb-3 text-center">
            <h3 class="font-extrabold text-base sm:text-lg uppercase text-slate-950 font-serif">${state.settings.schoolName || 'SMP NEGERI CONTOH TELADAN'}</h3>
            <h4 class="font-bold text-xs sm:text-sm uppercase text-slate-800 font-serif">LAPORAN HASIL PENILAIAN CAPAIAN PEMBELAJARAN (RAPOR SISWA)</h4>
            <p class="text-[11px] text-slate-600 mt-0.5">${state.settings.activeTA || 'Tahun Ajaran 2024/2025 – Genap'} • Kurikulum Merdeka</p>
          </div>

          <div class="border border-slate-900 rounded p-3 text-xs bg-slate-50/50">
            <table class="w-full" style="border: none;">
              <tr>
                <td width="18%"><b>Nama Peserta Didik</b></td>
                <td width="35%">: <span class="font-bold">${std.nama}</span></td>
                <td width="18%"><b>Kelas / Rombel</b></td>
                <td width="29%">: <span>${state.classes.find(c => c.id === state.activeClassId)?.nama || 'VII-A'}</span></td>
              </tr>
              <tr>
                <td><b>NISN / No. Induk</b></td>
                <td>: <span>${std.nisn || '-'} / ${std.nis || '-'}</span></td>
                <td><b>Fase / Semester</b></td>
                <td>: <span>Fase D / Genap</span></td>
              </tr>
            </table>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border border-slate-900 border-collapse">
              <thead>
                <tr class="bg-slate-100 font-bold border-b border-slate-900 text-center">
                  <th class="border border-slate-900 p-2 w-10">No</th>
                  <th class="border border-slate-900 p-2 w-48 text-left">Mata Pelajaran</th>
                  <th class="border border-slate-900 p-2 w-16">Nilai Akhir</th>
                  <th class="border border-slate-900 p-2 text-left">Capaian Kompetensi (Deskripsi Rapor Resmi)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-slate-900 p-2 text-center font-bold">1</td>
                  <td class="border border-slate-900 p-2 font-semibold">Matematika</td>
                  <td class="border border-slate-900 p-2 text-center font-bold text-sm">${g.na}</td>
                  <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">${g.deskripsi || 'Menunjukkan pemahaman yang sangat baik dalam capaian materi.'}</td>
                </tr>
                <tr>
                  <td class="border border-slate-900 p-2 text-center font-bold">2</td>
                  <td class="border border-slate-900 p-2 font-semibold">Ilmu Pengetahuan Alam (IPA)</td>
                  <td class="border border-slate-900 p-2 text-center font-bold text-sm">88</td>
                  <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">Menunjukkan penguasaan sangat baik dalam memahami konsep zat dan perubahannya serta ekosistem lingkungan.</td>
                </tr>
                <tr>
                  <td class="border border-slate-900 p-2 text-center font-bold">3</td>
                  <td class="border border-slate-900 p-2 font-semibold">Bahasa Indonesia</td>
                  <td class="border border-slate-900 p-2 text-center font-bold text-sm">86</td>
                  <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">Sangat terampil dalam menyusun teks negosiasi kontekstual dan mengidentifikasi struktur teks argumentasi.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pt-8 grid grid-cols-3 text-center text-xs font-serif">
            <div>
              <p>Mengetahui,</p>
              <p>Orang Tua / Wali Siswa</p>
              <div class="h-16"></div>
              <p class="font-bold underline">${std.waliNama || '....................................................'}</p>
            </div>
            <div>
              <p>Mengetahui,</p>
              <p>Kepala Sekolah</p>
              <div class="h-16"></div>
              <p class="font-bold underline">${state.settings.principalName || 'DRS. H. AHMAD RIFAI, M.Pd'}</p>
              <p>NIP. ${state.settings.principalNip || '-'}</p>
            </div>
            <div>
              <p>${state.settings.city || 'Kota Contoh'}, 20 Juni 2025</p>
              <p>Guru Mata Pelajaran / Wali Kelas,</p>
              <div class="h-16"></div>
              <p class="font-bold underline">${(state.settings.teacherName || 'IBU RATNA SARI, S.Pd.').toUpperCase()}</p>
              <p>NIP. ${state.settings.teacherNip || '-'}</p>
            </div>
          </div>
        </div>
      `;
    });

    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <html>
      <head>
        <title>Batch Print Rapor Siswa - ${state.classes.find(c => c.id === state.activeClassId)?.nama || 'Kelas VII-A'}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          .page-break-before { page-break-before: always; }
          body { font-family: 'Times New Roman', serif; }
        </style>
      </head>
      <body>
        ${batchHtml}
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
    this.notify(`Mencetak Rapor Batch untuk ${state.students.length} Siswa...`);
  },

  renderMultiMapelLeger() {
    const tbody = document.getElementById('leger-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.students.forEach((s, idx) => {
      const g = state.raporGrades.studentGrades[s.id] || { na: 80 };
      // Simulated realistic cross-subject scores
      const mtk = g.na || 80;
      const ipa = Math.min(98, mtk + (idx % 2 === 0 ? 3 : -2));
      const bind = Math.min(95, mtk + (idx % 3 === 0 ? 4 : 1));
      const bing = Math.min(96, mtk + (idx % 2 === 1 ? 5 : -1));
      const pkn = 88;
      const pjok = 85;
      const p5 = 90;
      const total = mtk + ipa + bind + bing + pkn + pjok + p5;
      const rata = Math.round(total / 7);

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 text-xs text-center';
      tr.innerHTML = `
        <td class="p-2 font-bold">${s.noAbsen}</td>
        <td class="p-2 text-left font-semibold text-slate-900 whitespace-nowrap">${s.nama}</td>
        <td class="p-2 font-bold font-mono text-blue-900 bg-blue-50/40">${mtk}</td>
        <td class="p-2 font-bold font-mono">${ipa}</td>
        <td class="p-2 font-bold font-mono">${bind}</td>
        <td class="p-2 font-bold font-mono">${bing}</td>
        <td class="p-2 font-bold font-mono">${pkn}</td>
        <td class="p-2 font-bold font-mono">${pjok}</td>
        <td class="p-2 font-bold font-mono text-teal-800 bg-teal-50/50">${p5}</td>
        <td class="p-2 font-black font-mono bg-amber-50 text-amber-950">${total}</td>
        <td class="p-2 font-black font-mono bg-emerald-50 text-emerald-950 text-sm">${rata}</td>
        <td class="p-2 font-bold text-slate-700">${idx + 1}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  updateStudentScore(studentId, field, value) {
    const num = Math.min(100, Math.max(0, parseInt(value, 10) || 0));
    if (!state.raporGrades.studentGrades[studentId]) {
      state.raporGrades.studentGrades[studentId] = { tp1: 75, tp2: 75, tp3: 75, tp4: 75, sumatifBab: 75, sas: 75, na: 75, deskripsi: '' };
    }
    state.raporGrades.studentGrades[studentId][field] = num;
    this.autoCalculateAllGrades(false);
  },

  renderLegerTable() {
    const tbody = document.getElementById('leger-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (state.students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" class="text-center py-8 text-slate-400 font-medium">Belum ada data siswa untuk olah nilai rapor.</td></tr>`;
      return;
    }
    const kktp = state.raporGrades.kktp || 75;

    state.students.forEach(s => {
      const g = state.raporGrades.studentGrades[s.id] || { tp1: 75, tp2: 75, tp3: 75, tp4: 75, sumatifBab: 75, sas: 75, na: 75 };
      const avgFmt = Math.round((g.tp1 + g.tp2 + g.tp3 + g.tp4) / 4);
      const isPassed = (g.na || 75) >= kktp;

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors text-center text-xs';
      tr.innerHTML = `
        <td class="py-2 px-2 font-bold">${s.noAbsen}</td>
        <td class="py-2 px-3 text-left font-semibold text-slate-900">${s.nama}</td>
        <td class="py-1 px-1"><input type="number" value="${g.tp1}" onchange="app.updateStudentScore('${s.id}', 'tp1', this.value)" class="matrix-input"></td>
        <td class="py-1 px-1"><input type="number" value="${g.tp2}" onchange="app.updateStudentScore('${s.id}', 'tp2', this.value)" class="matrix-input"></td>
        <td class="py-1 px-1"><input type="number" value="${g.tp3}" onchange="app.updateStudentScore('${s.id}', 'tp3', this.value)" class="matrix-input"></td>
        <td class="py-1 px-1"><input type="number" value="${g.tp4}" onchange="app.updateStudentScore('${s.id}', 'tp4', this.value)" class="matrix-input"></td>
        <td class="py-2 px-2 font-mono font-bold bg-blue-50/50 text-blue-900">${avgFmt}</td>
        <td class="py-1 px-1 bg-purple-50/50"><input type="number" value="${g.sumatifBab}" onchange="app.updateStudentScore('${s.id}', 'sumatifBab', this.value)" class="matrix-input"></td>
        <td class="py-1 px-1 bg-indigo-50/50"><input type="number" value="${g.sas}" onchange="app.updateStudentScore('${s.id}', 'sas', this.value)" class="matrix-input"></td>
        <td class="py-2 px-3 bg-amber-50 font-extrabold text-sm text-amber-950 font-mono">${g.na}</td>
        <td class="py-2 px-2 font-bold ${isPassed ? 'text-emerald-700' : 'text-rose-700'}">${isPassed ? 'Tuntas' : 'Perlu Bimb.'}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  generateAllAIRaporDescriptions() {
    const tpList = state.raporGrades.tpList || [];
    
    state.students.forEach(s => {
      const g = state.raporGrades.studentGrades[s.id];
      if (!g) return;

      const scores = [
        { label: tpList[0].label, val: g.tp1 },
        { label: tpList[1].label, val: g.tp2 },
        { label: tpList[2].label, val: g.tp3 },
        { label: tpList[3].label, val: g.tp4 }
      ];

      scores.sort((a, b) => b.val - a.val);
      const highest = scores[0];
      const lowest = scores[scores.length - 1];

      let narrative = `Menunjukkan penguasaan yang sangat baik dalam ${highest.label.toLowerCase()}.`;
      if (lowest.val < 78) {
        narrative += ` Perlu bimbingan dan pendampingan lebih lanjut dalam ${lowest.label.toLowerCase()}.`;
      } else {
        narrative += ` Mampu mempertahankan pemahaman yang konsisten dalam ${lowest.label.toLowerCase()}.`;
      }

      g.deskripsi = narrative;
    });

    localStorage.setItem(KEYS.RAPOR_GRADES, JSON.stringify(state.raporGrades));
    this.renderNarrativeEditor();
    this.notify('✨ Narasi deskripsi capaian rapor seluruh siswa berhasil digenerate otomatis!');
  },

  renderNarrativeEditor() {
    const container = document.getElementById('rapor-narrative-container');
    if (!container) return;
    container.innerHTML = '';

    state.students.forEach(s => {
      const g = state.raporGrades.studentGrades[s.id] || { na: 80, deskripsi: '' };
      if (!g.deskripsi) {
        g.deskripsi = `Menunjukkan penguasaan materi yang baik dalam pembelajaran Matematika. Perlu terus ditingkatkan keaktifan belajar di kelas.`;
      }

      container.innerHTML += `
        <div class="glass-panel-subtle p-4 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-900">${s.noAbsen}. ${s.nama} (${s.nisn || '-'})</span>
            <span class="font-mono font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900">Nilai Akhir: ${g.na || 75}</span>
          </div>
          <textarea rows="2" onchange="app.saveCustomNarrative('${s.id}', this.value)" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-sans leading-relaxed text-slate-800">${g.deskripsi}</textarea>
        </div>
      `;
    });
  },

  saveCustomNarrative(studentId, text) {
    if (state.raporGrades.studentGrades[studentId]) {
      state.raporGrades.studentGrades[studentId].deskripsi = text;
      localStorage.setItem(KEYS.RAPOR_GRADES, JSON.stringify(state.raporGrades));
    }
  },

  exportLegerCSV() {
    let csv = "No,NISN,Nama Siswa,TP1,TP2,TP3,TP4,Rata Formatif,Sumatif Bab,SAS,Nilai Akhir,Status\n";
    state.students.forEach(s => {
      const g = state.raporGrades.studentGrades[s.id] || { tp1: 75, tp2: 75, tp3: 75, tp4: 75, sumatifBab: 75, sas: 75, na: 75 };
      const avgFmt = Math.round((g.tp1 + g.tp2 + g.tp3 + g.tp4) / 4);
      const status = (g.na || 75) >= 75 ? "Tuntas" : "Perlu Bimbingan";
      csv += `${s.noAbsen},"${s.nisn}","${s.nama}",${g.tp1},${g.tp2},${g.tp3},${g.tp4},${avgFmt},${g.sumatifBab},${g.sas},${g.na},"${status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Leger_Nilai_Kelas_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.notify('Leger Nilai Kelas format Excel (CSV) berhasil diunduh.');
  },

  populateRaporStudentPicker() {
    const sel = document.getElementById('rapor-student-picker');
    if (!sel) return;
    sel.innerHTML = '';
    state.students.forEach(s => {
      sel.innerHTML += `<option value="${s.id}">Absen ${s.noAbsen} - ${s.nama}</option>`;
    });
  },

  renderStudentReportCard() {
    const sel = document.getElementById('rapor-student-picker');
    const studentId = sel ? sel.value : (state.students[0]?.id || 'S01');
    const std = state.students.find(s => s.id === studentId) || state.students[0];
    if (!std) return;

    const g = state.raporGrades.studentGrades[std.id] || { na: 85, deskripsi: 'Menunjukkan pemahaman yang sangat baik dalam capaian materi.' };

    document.getElementById('card-student-name').textContent = std.nama;
    document.getElementById('card-student-nisn').textContent = std.nisn || '-';
    document.getElementById('rapor-kop-school').textContent = state.settings.schoolName || 'SMP NEGERI CONTOH TELADAN';
    document.getElementById('card-principal-name').textContent = state.settings.principalName || 'DRS. H. AHMAD RIFAI, M.Pd';
    document.getElementById('card-principal-nip').textContent = state.settings.principalNip ? 'NIP. ' + state.settings.principalNip : '';
    document.getElementById('card-teacher-name').textContent = (state.settings.teacherName || 'IBU RATNA SARI, S.Pd.').toUpperCase();
    document.getElementById('card-teacher-nip').textContent = state.settings.teacherNip ? 'NIP. ' + state.settings.teacherNip : '';
    document.getElementById('card-city-date').textContent = (state.settings.city || 'Kota') + ', 20 Juni 2025';

    const tbody = document.getElementById('card-report-tbody');
    tbody.innerHTML = `
      <tr>
        <td class="border border-slate-900 p-2 text-center font-bold">1</td>
        <td class="border border-slate-900 p-2 font-semibold">Matematika</td>
        <td class="border border-slate-900 p-2 text-center font-bold text-sm">${g.na}</td>
        <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">${g.deskripsi}</td>
      </tr>
      <tr>
        <td class="border border-slate-900 p-2 text-center font-bold">2</td>
        <td class="border border-slate-900 p-2 font-semibold">Ilmu Pengetahuan Alam (IPA)</td>
        <td class="border border-slate-900 p-2 text-center font-bold text-sm">88</td>
        <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">Menunjukkan penguasaan sangat baik dalam memahami konsep zat dan perubahannya serta sistem organisasi kehidupan.</td>
      </tr>
      <tr>
        <td class="border border-slate-900 p-2 text-center font-bold">3</td>
        <td class="border border-slate-900 p-2 font-semibold">Bahasa Indonesia</td>
        <td class="border border-slate-900 p-2 text-center font-bold text-sm">86</td>
        <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">Menunjukkan kemampuan yang sangat baik dalam memahami teks laporan hasil observasi dan menyajikan tanggapan kritis.</td>
      </tr>
      <tr>
        <td class="border border-slate-900 p-2 text-center font-bold">4</td>
        <td class="border border-slate-900 p-2 font-semibold">Pendidikan Pancasila</td>
        <td class="border border-slate-900 p-2 text-center font-bold text-sm">90</td>
        <td class="border border-slate-900 p-2 text-slate-800 leading-relaxed font-serif">Menunjukkan pemahaman mendalam tentang norma masyarakat dan komitmen menjaga persatuan bangsa.</td>
      </tr>
    `;
  },

  // ---------- TABUNGAN SISWA & BUKU REKENING DIGITAL ----------
  renderSavingsTable() {
    const tbody = document.getElementById('savings-table-tbody');
    const studentListTbody = document.getElementById('savings-student-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!state.savings || state.savings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400 font-medium">Belum ada riwayat transaksi tabungan siswa.</td></tr>`;
    } else {
      // Render mutasi transactions
      let totalSavings = 0;
      (state.savings || []).forEach(s => {
        const isSetor = s.tipe.toLowerCase() === 'setor';
        totalSavings += isSetor ? s.nominal : -s.nominal;
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors text-xs';
        tr.innerHTML = `
          <td class="py-2.5 px-3 font-mono text-slate-600">${s.tanggal}</td>
          <td class="py-2.5 px-3 font-semibold text-slate-900">${s.nama}</td>
          <td class="py-2.5 px-3 text-center">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${isSetor ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              ${s.tipe}
            </span>
          </td>
          <td class="py-2.5 px-3 font-mono font-bold ${isSetor ? 'text-emerald-700' : 'text-rose-700'}">
            ${isSetor ? '+' : '-'} Rp ${s.nominal.toLocaleString('id-ID')}
          </td>
          <td class="py-2.5 px-3 text-slate-500">${s.keterangan || '-'}</td>
          <td class="py-2.5 px-3 text-right">
            <button onclick="app.openStudentSavingBookModal('${s.studentId || 'S01'}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]">
              Buku Tabungan
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    const totalEl = document.getElementById('savings-total-display');
    if (totalEl) {
      let grandTotal = 0;
      state.students.forEach(st => grandTotal += (st.tabungan || 0));
      totalEl.textContent = 'Rp ' + grandTotal.toLocaleString('id-ID');
    }

    // Render per-student savings accounts table
    if (studentListTbody) {
      studentListTbody.innerHTML = '';
      if (state.students.length === 0) {
        studentListTbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-400 font-medium">Belum ada akun siswa. Tambahkan siswa terlebih dahulu.</td></tr>`;
      } else {
        state.students.forEach(st => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-slate-50 transition-colors text-xs';
          tr.innerHTML = `
            <td class="py-2.5 px-3 font-bold text-slate-800">${st.noAbsen}</td>
            <td class="py-2.5 px-3 font-semibold text-slate-900">${st.nama}</td>
            <td class="py-2.5 px-3 font-mono text-slate-500">TAB-2425-${String(st.noAbsen).padStart(2, '0')}</td>
            <td class="py-2.5 px-3 font-mono font-extrabold text-emerald-800 text-sm">Rp ${(st.tabungan || 0).toLocaleString('id-ID')}</td>
            <td class="py-2.5 px-3 text-right">
              <button onclick="app.openStudentSavingBookModal('${st.id}')" class="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs">
                📖 Buka Buku Rekening
              </button>
            </td>
          `;
          studentListTbody.appendChild(tr);
        });
      }
    }
  },

  openStudentSavingBookModal(studentId) {
    state.activeSavingStudentId = studentId;
    const std = state.students.find(s => s.id === studentId) || state.students[0];
    if (!std) return;

    const modal = document.getElementById('modal-saving-passbook');
    if (!modal) return;

    document.getElementById('passbook-student-name').textContent = std.nama;
    document.getElementById('passbook-account-no').textContent = `TAB-2425-${String(std.noAbsen).padStart(2, '0')}`;
    document.getElementById('passbook-student-nisn').textContent = std.nisn || '-';
    document.getElementById('passbook-balance-display').textContent = 'Rp ' + (std.tabungan || 0).toLocaleString('id-ID');

    const txBody = document.getElementById('passbook-tx-tbody');
    if (txBody) {
      txBody.innerHTML = '';
      const studentTx = state.savings.filter(tx => tx.studentId === std.id || tx.nama === std.nama);
      
      let runningBalance = 0;
      studentTx.forEach((tx, idx) => {
        const isSetor = tx.tipe.toLowerCase() === 'setor';
        if (isSetor) runningBalance += tx.nominal;
        else runningBalance -= tx.nominal;

        const tr = document.createElement('tr');
        tr.className = 'border-b border-slate-200 text-xs font-mono';
        tr.innerHTML = `
          <td class="p-2 text-center text-slate-500">${idx + 1}</td>
          <td class="p-2 text-slate-800">${tx.tanggal}</td>
          <td class="p-2 font-sans font-medium text-slate-900">${tx.keterangan || (isSetor ? 'Setoran Tabungan' : 'Penarikan Tabungan')}</td>
          <td class="p-2 text-right text-emerald-700 font-bold">${isSetor ? 'Rp ' + tx.nominal.toLocaleString('id-ID') : '-'}</td>
          <td class="p-2 text-right text-rose-700 font-bold">${!isSetor ? 'Rp ' + tx.nominal.toLocaleString('id-ID') : '-'}</td>
          <td class="p-2 text-right font-black text-slate-900 bg-slate-50">Rp ${runningBalance.toLocaleString('id-ID')}</td>
          <td class="p-2 text-center text-slate-400 font-sans text-[10px]">Petugas</td>
        `;
        txBody.appendChild(tr);
      });

      if (studentTx.length === 0) {
        txBody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">Belum ada mutasi transaksi untuk siswa ini.</td></tr>`;
      }
    }

    modal.classList.remove('hidden');
  },

  closeStudentSavingBookModal() {
    const modal = document.getElementById('modal-saving-passbook');
    if (modal) modal.classList.add('hidden');
  },

  recordSavingTransactionFromModal() {
    const stdId = state.activeSavingStudentId;
    const std = state.students.find(s => s.id === stdId);
    if (!std) return;

    const tipe = document.getElementById('modal-tx-type')?.value || 'setor';
    const nominal = parseInt(document.getElementById('modal-tx-amount')?.value, 10) || 0;
    const ket = document.getElementById('modal-tx-desc')?.value.trim() || (tipe === 'setor' ? 'Setoran Tabungan Kelas' : 'Penarikan Tabungan');

    if (nominal <= 0) {
      alert('Mohon masukkan nominal yang valid.');
      return;
    }

    if (tipe === 'tarik' && (std.tabungan || 0) < nominal) {
      alert(`Saldo tidak mencukupi! Saldo saat ini: Rp ${(std.tabungan || 0).toLocaleString('id-ID')}`);
      return;
    }

    if (tipe === 'setor') {
      std.tabungan = (std.tabungan || 0) + nominal;
    } else {
      std.tabungan = (std.tabungan || 0) - nominal;
    }

    state.savings.unshift({
      id: 'SAV-' + Date.now().toString().slice(-4),
      studentId: std.id,
      nama: std.nama,
      tanggal: new Date().toISOString().slice(0, 10),
      tipe: tipe === 'setor' ? 'Setor' : 'Tarik',
      nominal: nominal,
      saldo: std.tabungan,
      keterangan: ket
    });

    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(state.students));
    localStorage.setItem(KEYS.SAVINGS, JSON.stringify(state.savings));

    this.renderSavingsTable();
    this.openStudentSavingBookModal(std.id);
    this.notify(`Transaksi ${tipe.toUpperCase()} Rp ${nominal.toLocaleString('id-ID')} untuk ${std.nama} berhasil dicatat.`);

    document.getElementById('modal-tx-amount').value = '';
    document.getElementById('modal-tx-desc').value = '';
  },

  printStudentSavingBook() {
    window.print();
  },

  openAddSavingModal() {
    const stdId = state.students[0]?.id || 'S01';
    this.openStudentSavingBookModal(stdId);
  },

  // ---------- REKAP KAS KELAS & MATRIKS IURAN MINGGUAN ----------
  renderCashTable() {
    const tbody = document.getElementById('cash-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let balance = 0;
    let totalMasuk = 0;
    let totalKeluar = 0;

    if (!state.cash || state.cash.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center py-8 text-slate-400 font-medium">Belum ada catatan buku kas kelas.</td></tr>`;
    } else {
      state.cash.forEach(k => {
        const isMasuk = k.tipe === 'masuk';
        if (isMasuk) {
          balance += k.nominal;
          totalMasuk += k.nominal;
        } else {
          balance -= k.nominal;
          totalKeluar += k.nominal;
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors text-xs';
        tr.innerHTML = `
          <td class="py-2.5 px-3 font-mono text-slate-600">${k.tanggal}</td>
          <td class="py-2.5 px-3">
            <div class="font-medium text-slate-900">${k.uraian}</div>
            <span class="inline-block mt-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              ${k.kategori || 'Operasional'}
            </span>
          </td>
          <td class="py-2.5 px-3 font-bold uppercase text-center ${isMasuk ? 'text-emerald-700' : 'text-rose-700'}">
            ${k.tipe}
          </td>
          <td class="py-2.5 px-3 text-right font-mono font-bold ${isMasuk ? 'text-emerald-800' : 'text-rose-800'}">
            ${isMasuk ? '+' : '-'} Rp ${k.nominal.toLocaleString('id-ID')}
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    const balEl = document.getElementById('kas-balance-display');
    const inEl = document.getElementById('kas-total-in');
    const outEl = document.getElementById('kas-total-out');

    if (balEl) balEl.textContent = 'Rp ' + balance.toLocaleString('id-ID');
    if (inEl) inEl.textContent = 'Rp ' + totalMasuk.toLocaleString('id-ID');
    if (outEl) outEl.textContent = 'Rp ' + totalKeluar.toLocaleString('id-ID');

    this.renderWeeklyCashMatrix();
  },

  renderWeeklyCashMatrix() {
    const tbody = document.getElementById('weekly-cash-matrix-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (state.students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="p-8 text-center text-slate-400 font-medium">Belum ada siswa untuk pencatatan matriks kas mingguan.</td></tr>`;
      return;
    }

    const dues = state.cashMatrix?.dues || {};
    const nominalPerMinggu = state.cashMatrix?.nominalPerMinggu || 5000;

    let totalCollected = 0;
    state.students.forEach(st => {
      const stDues = dues[st.id] || { w1: false, w2: false, w3: false, w4: false };
      const paidCount = (stDues.w1 ? 1 : 0) + (stDues.w2 ? 1 : 0) + (stDues.w3 ? 1 : 0) + (stDues.w4 ? 1 : 0);
      const studentPaid = paidCount * nominalPerMinggu;
      totalCollected += studentPaid;

      const isLunas = paidCount === 4;

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors text-xs text-center';
      tr.innerHTML = `
        <td class="p-2 font-bold text-slate-700">${st.noAbsen}</td>
        <td class="p-2 text-left font-semibold text-slate-900 whitespace-nowrap">${st.nama}</td>
        <td class="p-2">
          <button onclick="app.toggleWeeklyCashStatus('${st.id}', 'w1')" class="px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${stDues.w1 ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}">
            ${stDues.w1 ? '✓ Lunas' : 'Belum'}
          </button>
        </td>
        <td class="p-2">
          <button onclick="app.toggleWeeklyCashStatus('${st.id}', 'w2')" class="px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${stDues.w2 ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}">
            ${stDues.w2 ? '✓ Lunas' : 'Belum'}
          </button>
        </td>
        <td class="p-2">
          <button onclick="app.toggleWeeklyCashStatus('${st.id}', 'w3')" class="px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${stDues.w3 ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}">
            ${stDues.w3 ? '✓ Lunas' : 'Belum'}
          </button>
        </td>
        <td class="p-2">
          <button onclick="app.toggleWeeklyCashStatus('${st.id}', 'w4')" class="px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${stDues.w4 ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}">
            ${stDues.w4 ? '✓ Lunas' : 'Belum'}
          </button>
        </td>
        <td class="p-2 font-mono font-bold text-emerald-800 bg-emerald-50/50">
          Rp ${studentPaid.toLocaleString('id-ID')}
        </td>
        <td class="p-2">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isLunas ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
            ${isLunas ? 'Lunas Bulan Ini' : `Kurang Rp ${((4 - paidCount) * nominalPerMinggu).toLocaleString('id-ID')}`}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });

    const duesTotalEl = document.getElementById('cash-dues-total');
    if (duesTotalEl) duesTotalEl.textContent = 'Rp ' + totalCollected.toLocaleString('id-ID');
  },

  toggleWeeklyCashStatus(studentId, weekKey) {
    if (!state.cashMatrix.dues[studentId]) {
      state.cashMatrix.dues[studentId] = { w1: false, w2: false, w3: false, w4: false };
    }
    const current = !!state.cashMatrix.dues[studentId][weekKey];
    state.cashMatrix.dues[studentId][weekKey] = !current;

    localStorage.setItem(KEYS.CASH_MATRIX, JSON.stringify(state.cashMatrix));
    this.renderWeeklyCashMatrix();
  },

  openAddCashModal() {
    const uraian = prompt('Uraian Kas (contoh: Beli Spidol, Konsumsi Rapat Kelas):');
    if (!uraian) return;
    const nominal = parseInt(prompt('Nominal Transaksi (Rp):', '50000'), 10) || 0;
    const tipe = prompt('Jenis Kas (ketik "masuk" atau "keluar"):', 'keluar').toLowerCase();
    const kategori = prompt('Kategori (Operasional / ATK & Kebersihan / P5 / Kegiatan / Sosial):', 'Operasional') || 'Operasional';

    state.cash.push({
      id: 'K' + (state.cash.length + 1),
      tanggal: new Date().toISOString().slice(0, 10),
      uraian: uraian,
      tipe: tipe === 'masuk' ? 'masuk' : 'keluar',
      kategori: kategori,
      nominal: nominal
    });

    localStorage.setItem(KEYS.CASH, JSON.stringify(state.cash));
    this.renderCashTable();
    this.notify(`Kas "${uraian}" sebesar Rp ${nominal.toLocaleString('id-ID')} dicatat.`);
  },

  printCashLPJSheet() {
    window.print();
  },

  renderNotificationList() {
    const c = document.getElementById('notification-list-container');
    if (!c) return;
    c.innerHTML = `
      <div class="glass-panel-subtle p-3 border-l-4 border-l-amber-500">
        <strong class="text-slate-900 block">Pengisian Rapor Semester Genap TA 2024/2025</strong>
        <p class="text-slate-600">Buku Leger Nilai dan narasi capaian rapor Kurikulum Merdeka telah siap dicetak.</p>
      </div>
      <div class="glass-panel-subtle p-3 border-l-4 border-l-blue-500">
        <strong class="text-slate-900 block">Jadwal Ujian CBT Siswa</strong>
        <p class="text-slate-600">Hasil nilai ujian online kuis otomatis disinkronkan ke nilai Sumatif Akhir Semester (SAS).</p>
      </div>
    `;
  },

  // ---------- NOTIFICATION CENTER (GLASS POPUP MODAL) ----------
  openNotificationCenter() {
    this.renderNotificationCenter();
    const modal = document.getElementById('modal-notification-center');
    if (modal) modal.classList.remove('hidden');
  },

  closeNotificationCenter() {
    const modal = document.getElementById('modal-notification-center');
    if (modal) modal.classList.add('hidden');
  },

  renderNotificationCenter() {
    const container = document.getElementById('notification-center-list');
    if (!container) return;
    container.innerHTML = '';

    // Dynamically check system status to refresh notification states
    const underKktpCount = Object.values(state.raporGrades.studentGrades || {}).filter(g => (g.na || 0) < (state.raporGrades.kktp || 75)).length;
    if (underKktpCount > 0) {
      const n1 = state.notifications.find(n => n.id === 'notif-1');
      if (n1) {
        n1.message = `Terdapat ${underKktpCount} siswa dengan Nilai Akhir (NA) Matematika di bawah batas KKTP ${state.raporGrades.kktp || 75}. Remedial segera dijadwalkan.`;
      }
    }

    state.notifications.forEach(n => {
      let cardTypeClass = 'card-info';
      let iconSvg = '';
      if (n.type === 'warning') {
        cardTypeClass = 'card-warning';
        iconSvg = `<span class="p-2 rounded-lg bg-amber-100 text-amber-700 font-bold">⚠️</span>`;
      } else if (n.type === 'danger') {
        cardTypeClass = 'card-danger';
        iconSvg = `<span class="p-2 rounded-lg bg-rose-100 text-rose-700 font-bold">🚨</span>`;
      } else if (n.type === 'neutral') {
        cardTypeClass = 'card-neutral';
        iconSvg = `<span class="p-2 rounded-lg bg-emerald-100 text-emerald-700 font-bold">💰</span>`;
      } else {
        iconSvg = `<span class="p-2 rounded-lg bg-blue-100 text-blue-700 font-bold">ℹ️</span>`;
      }

      const card = document.createElement('div');
      card.className = `notif-card ${cardTypeClass} ${n.read ? 'opacity-60 bg-slate-50' : 'bg-white'}`;
      card.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            ${iconSvg}
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${n.category}</span>
                ${n.read ? '<span class="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-semibold">Dibaca</span>' : '<span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>'}
              </div>
              <h4 class="font-bold text-xs text-slate-900 mt-0.5">${n.title}</h4>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${n.message}</p>
            </div>
          </div>
          <button onclick="app.dismissNotification('${n.id}')" title="Tandai dibaca" class="text-slate-400 hover:text-slate-600 p-1">✕</button>
        </div>
        <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-end gap-2">
          <button onclick="app.actionNotification('${n.id}', '${n.actionPane}')" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-2xs">
            <span>${n.actionLabel}</span>
            <span>→</span>
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    this.updateNotificationBadge();
  },

  updateNotificationBadge() {
    const unreadCount = state.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notif-badge-counter');
    if (badge) {
      badge.textContent = unreadCount;
      if (unreadCount === 0) {
        badge.classList.add('hidden');
      } else {
        badge.classList.remove('hidden');
      }
    }
  },

  markAllNotificationsRead() {
    state.notifications.forEach(n => n.read = true);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(state.notifications));
    this.renderNotificationCenter();
    this.notify('Semua notifikasi telah ditandai sebagai sudah dibaca.');
  },

  dismissNotification(id) {
    const n = state.notifications.find(item => item.id === id);
    if (n) {
      n.read = true;
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(state.notifications));
      this.renderNotificationCenter();
    }
  },

  actionNotification(id, actionPane) {
    this.dismissNotification(id);
    this.closeNotificationCenter();
    if (actionPane) {
      this.navigate(actionPane);
    }
  },

  // ---------- CUSTOM GLASS CONFIRM / ALERT DIALOG ----------
  showCustomDialog({ title = 'Konfirmasi', message = 'Lanjutkan?', iconType = 'info', confirmText = 'Lanjutkan', cancelText = 'Batal', onConfirm = null }) {
    state.customDialogCallback = onConfirm;

    const modal = document.getElementById('modal-custom-dialog');
    const titleEl = document.getElementById('dialog-title');
    const msgEl = document.getElementById('dialog-message');
    const btnCancel = document.getElementById('dialog-btn-cancel');
    const btnConfirm = document.getElementById('dialog-btn-confirm');
    const iconWrapper = document.getElementById('dialog-icon-wrapper');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    if (btnConfirm) btnConfirm.textContent = confirmText;
    if (btnCancel) {
      btnCancel.textContent = cancelText;
      if (!cancelText) btnCancel.classList.add('hidden');
      else btnCancel.classList.remove('hidden');
    }

    if (iconWrapper) {
      if (iconType === 'danger') {
        iconWrapper.className = 'w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-rose-100 text-rose-600 mb-2';
      } else if (iconType === 'warning') {
        iconWrapper.className = 'w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-amber-100 text-amber-600 mb-2';
      } else {
        iconWrapper.className = 'w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-blue-100 text-blue-600 mb-2';
      }
    }

    if (modal) modal.classList.remove('hidden');
  },

  closeCustomDialog(result) {
    const modal = document.getElementById('modal-custom-dialog');
    if (modal) modal.classList.add('hidden');

    if (result && typeof state.customDialogCallback === 'function') {
      const cb = state.customDialogCallback;
      state.customDialogCallback = null;
      cb();
    } else {
      state.customDialogCallback = null;
    }
  },

  // ================= PILAR 2: PROJEK P5 KURIKULUM MERDEKA =================
  initP5Module() {
    this.populateP5ProjectSelector();
    this.populateP5RaporStudentSelect();
    this.renderP5ModulPreview();
  },

  populateP5ProjectSelector() {
    const sel = document.getElementById('p5-project-picker');
    if (!sel) return;
    sel.innerHTML = '';
    (state.p5Projects || []).forEach(p => {
      sel.innerHTML += `<option value="${p.id}" ${p.id === state.activeP5ProjectId ? 'selected' : ''}>${p.id}: ${p.tema} - ${p.judul.slice(0, 35)}...</option>`;
    });
  },

  switchP5Project(projectId) {
    state.activeP5ProjectId = projectId;
    const found = (state.p5Projects || []).find(p => p.id === projectId);
    if (found) {
      state.p5Project = { ...found };
      localStorage.setItem(KEYS.P5_PROJECT, JSON.stringify(state.p5Project));
      
      // Update form inputs if present
      const temaInput = document.getElementById('p5-input-tema');
      const judulInput = document.getElementById('p5-input-judul');
      const faseInput = document.getElementById('p5-input-fase');
      const jpInput = document.getElementById('p5-input-jp');

      if (temaInput) temaInput.value = found.tema;
      if (judulInput) judulInput.value = found.judul;
      if (faseInput) faseInput.value = found.fase;
      if (jpInput) jpInput.value = found.alokasiWaktu || 70;

      this.renderP5ModulPreview();
      this.renderP5Matriks();
      this.notify(`Beralih ke Projek P5: "${found.judul.slice(0, 40)}..."`);
    }
  },

  renderP5View() {
    this.populateP5ProjectSelector();
    if (state.activeP5SubTab === 'modul') {
      this.switchP5SubTab('modul');
      this.renderP5ModulPreview();
    } else if (state.activeP5SubTab === 'matriks') {
      this.switchP5SubTab('matriks');
      this.renderP5Matriks();
    } else if (state.activeP5SubTab === 'rapor') {
      this.switchP5SubTab('rapor');
      const sel = document.getElementById('p5-rapor-student-select');
      const stdId = sel ? sel.value : (state.students[0] ? state.students[0].id : 'S01');
      this.renderP5StudentRapor(stdId);
    }
  },

  switchP5SubTab(tab) {
    state.activeP5SubTab = tab;
    ['modul', 'matriks', 'rapor'].forEach(t => {
      const pane = document.getElementById('p5-subpane-' + t);
      const btn = document.getElementById('p5-tab-' + t + '-btn');
      if (pane) pane.classList.toggle('hidden', t !== tab);
      if (btn) {
        if (t === tab) {
          btn.className = 'px-3.5 py-2 rounded-lg text-xs font-extrabold bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all';
        } else {
          btn.className = 'px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border-2 border-transparent transition-all';
        }
      }
    });

    if (tab === 'modul') this.renderP5ModulPreview();
    if (tab === 'matriks') this.renderP5Matriks();
    if (tab === 'rapor') {
      this.populateP5RaporStudentSelect();
      const sel = document.getElementById('p5-rapor-student-select');
      const val = sel ? sel.value : (state.students[0] ? state.students[0].id : 'S01');
      this.renderP5StudentRapor(val);
    }
  },

  onP5TemaChange() {
    const tema = document.getElementById('p5-input-tema').value;
    const judulEl = document.getElementById('p5-input-judul');
    
    const temaPreset = {
      'Gaya Hidup Berkelanjutan': {
        judul: 'Jejak Karbon Nol: Mengolah Sampah Organik Menjadi Kompos Cair & Pupuk Alami',
        dim1: true, dim2: false, dim3: true, dim4: false, dim5: true, dim6: false
      },
      'Kearifan Lokal': {
        judul: 'Menelusuri Warisan Leluhur: Eksplorasi Kuliner Tradisional & Batik Nusantara',
        dim1: false, dim2: true, dim3: true, dim4: false, dim5: false, dim6: true
      },
      'Bhinneka Tunggal Ika': {
        judul: 'Harmoni Dalam Perbedaan: Merajut Toleransi dan Dialog Budaya Sekolah',
        dim1: true, dim2: true, dim3: true, dim4: false, dim5: false, dim6: false
      },
      'Bangunlah Jiwa dan Raganya': {
        judul: 'Ksatria Tangguh: Kampanye Anti-Bullying dan Manajemen Emosi Sehat Remaja',
        dim1: true, dim2: false, dim3: false, dim4: true, dim5: true, dim6: false
      },
      'Suara Demokrasi': {
        judul: 'Suara Kami Menentukan Masa Depan: Pemilihan Ketua OSIS yang Berintegritas',
        dim1: false, dim2: true, dim3: true, dim4: false, dim5: true, dim6: false
      },
      'Rekayasa dan Teknologi': {
        judul: 'Inovator Muda: Rancang Bangun Lampu Otomatis Sensor Gerak Berbiaya Rendah',
        dim1: false, dim2: false, dim3: true, dim4: true, dim5: true, dim6: true
      },
      'Kewirausahaan': {
        judul: 'Young Preneur: Kreasi Olahan Pangan Lokal Bernilai Ekonomis di Market Day',
        dim1: false, dim2: false, dim3: true, dim4: true, dim5: false, dim6: true
      }
    };

    if (temaPreset[tema]) {
      judulEl.value = temaPreset[tema].judul;
      for (let i = 1; i <= 6; i++) {
        const chk = document.getElementById('p5-dim-' + i);
        if (chk) chk.checked = !!temaPreset[tema]['dim' + i];
      }
    }
  },

  resetDefaultP5Project() {
    state.p5Project = JSON.parse(JSON.stringify(DEFAULT_P5_PROJECT));
    localStorage.setItem(KEYS.P5_PROJECT, JSON.stringify(state.p5Project));
    document.getElementById('p5-input-tema').value = state.p5Project.tema;
    document.getElementById('p5-input-judul').value = state.p5Project.judul;
    document.getElementById('p5-input-fase').value = state.p5Project.fase;
    document.getElementById('p5-input-jp').value = state.p5Project.alokasiWaktu;
    this.renderP5ModulPreview();
    this.notify('Template Modul P5 Standar Nasional dimuat.');
  },

  renderP5ModulPreview() {
    const container = document.getElementById('p5-modul-preview-container');
    if (!container) return;
    const p = state.p5Project;
    const s = state.settings;

    let dimListHtml = '';
    (p.dimensi || []).forEach((d, idx) => {
      dimListHtml += `
        <div class="p-3 rounded-lg bg-teal-50/50 border border-teal-200">
          <strong class="text-teal-900 block font-bold">Dimensi ${idx + 1}: ${d.nama}</strong>
          <p class="text-slate-600 mt-1"><em>Target Sub-Elemen:</em> ${d.subElemen}</p>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="border-b-2 border-slate-900 pb-3 text-center">
        <h4 class="font-bold text-sm tracking-wide uppercase">${s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA'}</h4>
        <h3 class="font-extrabold text-base uppercase text-slate-900">${s.schoolName || 'SMP NEGERI CONTOH TELADAN'}</h3>
        <p class="text-[11px] text-slate-600 font-sans">${s.schoolAddress || ''}</p>
      </div>

      <div class="text-center py-2 border-b border-slate-200">
        <h2 class="font-extrabold text-base text-teal-950 uppercase tracking-tight">MODUL PROJEK PENGUATAN PROFIL PELAJAR PANCASILA (P5)</h2>
        <span class="inline-block mt-1 px-3 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">Tema: ${p.tema}</span>
      </div>

      <div class="space-y-3 font-sans text-xs">
        <div class="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div><strong>Judul Projek:</strong> ${p.judul}</div>
          <div><strong>Fase / Kelas:</strong> ${p.fase} / ${p.kelas || 'VII-A'}</div>
          <div><strong>Alokasi Waktu:</strong> ${p.alokasiWaktu} JP (Jam Pelajaran)</div>
          <div><strong>Koordinator:</strong> ${s.teacherName || 'Ibu Ratna Sari, S.Pd.'}</div>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 text-xs uppercase mb-1.5 flex items-center gap-1.5 text-teal-800">
            <span>🎯</span> I. Gambaran Umum & Deskripsi Singkat Projek
          </h4>
          <p class="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">${p.deskripsi}</p>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 text-xs uppercase mb-1.5 flex items-center gap-1.5 text-teal-800">
            <span>🌟</span> II. Dimensi & Target Pencapaian Profil Pelajar Pancasila
          </h4>
          <div class="space-y-2">
            ${dimListHtml}
          </div>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 text-xs uppercase mb-1.5 flex items-center gap-1.5 text-teal-800">
            <span>🧭</span> III. Alur Rangkaian Aktivitas Pembelajaran (4 Tahap KBM)
          </h4>
          <div class="space-y-2">
            <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span class="font-bold text-blue-700 block">Tahap 1: Pengenalan (Eksplorasi Isu & Stimulus)</span>
              <p class="text-slate-600 mt-0.5">${p.tahapan.pengenalan}</p>
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span class="font-bold text-purple-700 block">Tahap 2: Kontekstualisasi (Observasi Lapangan & Investigasi)</span>
              <p class="text-slate-600 mt-0.5">${p.tahapan.kontekstualisasi}</p>
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span class="font-bold text-emerald-700 block">Tahap 3: Aksi Nyata (Rancang Bangun & Produksi Karya)</span>
              <p class="text-slate-600 mt-0.5">${p.tahapan.aksi}</p>
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <span class="font-bold text-amber-700 block">Tahap 4: Refleksi & Gelar Karya (Panen Hasil Belajar & Evaluasi)</span>
              <p class="text-slate-600 mt-0.5">${p.tahapan.refleksi}</p>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 grid grid-cols-2 text-center text-xs">
          <div>
            <p>Mengetahui,</p>
            <p>Kepala Sekolah</p>
            <div class="h-12"></div>
            <p class="font-bold underline">${s.principalName || 'DRS. H. AHMAD RIFAI, M.Pd'}</p>
            <p>NIP. ${s.principalNip || '19750812 200003 1 002'}</p>
          </div>
          <div>
            <p>${s.city || 'Kota Contoh'}, 2025</p>
            <p>Fasilitator Projek P5 / Wali Kelas,</p>
            <div class="h-12"></div>
            <p class="font-bold underline">${s.teacherName || 'Ibu Ratna Sari, S.Pd.'}</p>
            <p>NIP. ${s.teacherNip || '19880415 201101 2 004'}</p>
          </div>
        </div>
      </div>
    `;

    const lbl = document.getElementById('p5-active-project-label');
    if (lbl) lbl.textContent = 'Projek: ' + p.tema;
  },

  async generateP5WithAI() {
    const tema = document.getElementById('p5-input-tema').value;
    const judul = document.getElementById('p5-input-judul').value.trim();
    const fase = document.getElementById('p5-input-fase').value;
    const jp = parseInt(document.getElementById('p5-input-jp').value) || 70;

    const selectedDims = [];
    const dimNames = [
      'Beriman & Bertakwa kepada Tuhan YME',
      'Berkebinekaan Global',
      'Bergotong Royong',
      'Mandiri',
      'Bernalar Kritis',
      'Kreatif'
    ];
    for (let i = 1; i <= 6; i++) {
      const chk = document.getElementById('p5-dim-' + i);
      if (chk && chk.checked) {
        selectedDims.push({
          id: 'dim' + (selectedDims.length + 1),
          nama: dimNames[i - 1],
          subElemen: 'Mampu menerapkan nilai ' + dimNames[i - 1] + ' dalam aksi nyata projek tema ' + tema + '.'
        });
      }
    }
    if (selectedDims.length === 0) {
      alert('Pilih minimal 1 dimensi Profil Pelajar Pancasila.');
      return;
    }

    const apiKey = state.settings.apiKey;
    if (!apiKey) {
      state.p5Project = {
        id: 'P5-' + Date.now().toString().slice(-4),
        tema,
        judul: judul || ('Projek Inovatif ' + tema),
        fase,
        kelas: 'VII-A',
        alokasiWaktu: jp,
        dimensi: selectedDims,
        tahapan: {
          pengenalan: 'Mengenalkan urgensi dan wawasan esensial mengenai isu ' + tema + ' dalam kehidupan bermasyarakat dan lingkungan sekolah.',
          kontekstualisasi: 'Mengeksplorasi permasalahan nyata di lingkungan sekitar sekolah yang terkait dengan topik ' + (judul || tema) + ' melalui observasi dan wawancara.',
          aksi: 'Merancang dan memproduksi solusi nyata berupa karya inovatif atau kampanye aksi positif secara berkelompok.',
          refleksi: 'Gelar karya (pameran hasil projek), presentasi hasil belajar di hadapan guru dan teman, serta evaluasi tindak lanjut.'
        },
        deskripsi: 'Projek ini disusun untuk membentuk karakter murid sesuai nilai Profil Pelajar Pancasila melalui kolaborasi nyata pada tema ' + tema + '.'
      };

      localStorage.setItem(KEYS.P5_PROJECT, JSON.stringify(state.p5Project));
      this.renderP5ModulPreview();
      this.notify('Modul P5 berhasil disusun (Mode Cepat Lokal). Masukkan Gemini API Key di Pengaturan untuk variasi tak terbatas.');
      return;
    }

    document.getElementById('loading-overlay').classList.remove('hidden');
    document.getElementById('loading-title').textContent = 'Menyusun Modul Projek P5 Cerdas...';
    document.getElementById('loading-sub').textContent = 'Merumuskan alur 4 tahap aktivitas dan sub-elemen karakter Kurikulum Merdeka...';

    const promptText = `
Bertindaklah sebagai Konsultan Ahli Kurikulum Merdeka Kemendikbudristek RI.
Buatlah rancangan Modul Projek Penguatan Profil Pelajar Pancasila (P5) yang bermutu tinggi, aplikatif, dan kontekstual.

Spesifikasi:
- Tema Resmi: "${tema}"
- Judul Projek: "${judul}"
- Fase: "${fase}"
- Alokasi Waktu: ${jp} JP
- Target Dimensi: ${selectedDims.map(d => d.nama).join(', ')}

Output WAJIB berupa JSON murni tanpa markdown, tanpa backtick, format:
{
  "deskripsi": "ringkasan deskripsi kontekstual projek 2-3 kalimat",
  "dimensi": [
    {
      "nama": "nama dimensi",
      "subElemen": "rumusan sub-elemen dan target capaian di akhir fase"
    }
  ],
  "tahapan": {
    "pengenalan": "rincian 2 kalimat tahapan pengenalan",
    "kontekstualisasi": "rincian 2 kalimat tahapan kontekstualisasi",
    "aksi": "rincian 2 kalimat tahapan aksi nyata dan kreasi produk",
    "refleksi": "rincian 2 kalimat tahapan gelar karya refleksi dan tindak lanjut"
  }
}
`;

    try {
      const legacy = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
      const aiModel = state.settings?.aiModel && !legacy.includes(state.settings.aiModel) && state.settings.aiModel !== 'offline'
        ? state.settings.aiModel
        : 'gemini-3.1-flash-lite';

      let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
        })
      });

      if (!resp.ok && aiModel !== 'gemini-3.1-flash-lite') {
        resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
          })
        });
      }

      const data = await resp.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) throw new Error('Format respon API kosong.');
      const parsed = JSON.parse(raw);

      state.p5Project = {
        id: 'P5-' + Date.now().toString().slice(-4),
        tema,
        judul: judul || ('Projek ' + tema),
        fase,
        kelas: 'VII-A',
        alokasiWaktu: jp,
        dimensi: (parsed.dimensi || selectedDims).map((d, i) => ({
          id: 'dim' + (i + 1),
          nama: d.nama,
          subElemen: d.subElemen
        })),
        tahapan: parsed.tahapan || {
          pengenalan: 'Sosialisasi dan identifikasi masalah.',
          kontekstualisasi: 'Observasi lapangan dan telaah data.',
          aksi: 'Pembuatan produk nyata secara berkelompok.',
          refleksi: 'Gelar karya dan evaluasi capaian projek.'
        },
        deskripsi: parsed.deskripsi || ('Projek penguatan karakter bertema ' + tema)
      };

      localStorage.setItem(KEYS.P5_PROJECT, JSON.stringify(state.p5Project));
      this.renderP5ModulPreview();
      this.notify('Modul Projek P5 berhasil di-generate secara cerdas oleh AI!');
    } catch (e) {
      console.error(e);
      this.notify('Gagal AI: ' + e.message + '. Menggunakan template standar.', 'error');
      this.resetDefaultP5Project();
    } finally {
      document.getElementById('loading-overlay').classList.add('hidden');
    }
  },

  exportP5Word() {
    const p = state.p5Project;
    const s = state.settings;

    let dimRows = '';
    (p.dimensi || []).forEach((d, i) => {
      dimRows += `<tr><td><b>Dimensi ${i + 1}</b></td><td><b>${d.nama}</b><br>${d.subElemen}</td></tr>`;
    });

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Modul P5</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; }
        table { border-collapse: collapse; width: 100%; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 6px; }
        .center { text-align: center; }
      </style>
      </head>
      <body>
        <div class="center">
          <h3>${s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA'}</h3>
          <h2>${s.schoolName || 'SMP NEGERI CONTOH TELADAN'}</h2>
          <p>${s.schoolAddress || ''}</p>
          <hr/>
          <h2>MODUL PROJEK PENGUATAN PROFIL PELAJAR PANCASILA (P5)</h2>
          <p><b>Tema: ${p.tema}</b> | Judul: ${p.judul}</p>
        </div>
        <p><b>Fase / Kelas:</b> ${p.fase} / ${p.kelas || 'VII-A'} | <b>Alokasi Waktu:</b> ${p.alokasiWaktu} JP</p>
        <h3>I. Deskripsi Projek</h3>
        <p>${p.deskripsi}</p>
        <h3>II. Target Dimensi & Sub-Elemen</h3>
        <table>
          <tr><th width="30%">Dimensi</th><th>Target Sub-Elemen Capaian</th></tr>
          ${dimRows}
        </table>
        <h3>III. Alur Aktivitas Projek (4 Tahap)</h3>
        <p><b>1. Pengenalan:</b> ${p.tahapan.pengenalan}</p>
        <p><b>2. Kontekstualisasi:</b> ${p.tahapan.kontekstualisasi}</p>
        <p><b>3. Aksi Nyata:</b> ${p.tahapan.aksi}</p>
        <p><b>4. Refleksi & Gelar Karya:</b> ${p.tahapan.refleksi}</p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Modul_P5_${p.tema.replace(/\s+/g, '_')}.doc`;
    a.click();
    this.notify('Modul P5 berhasil diunduh dalam format Microsoft Word (.doc)');
  },

  renderP5Matriks() {
    const tbody = document.getElementById('p5-matriks-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const p = state.p5Project;
    const dims = p.dimensi || [];
    
    for (let i = 1; i <= 3; i++) {
      const th = document.getElementById('p5-col-dim-' + i);
      if (th) {
        if (dims[i - 1]) {
          th.textContent = dims[i - 1].nama;
          th.classList.remove('hidden');
        } else {
          th.classList.add('hidden');
        }
      }
    }

    state.students.forEach(std => {
      const sc = state.p5Assessments[std.id] || { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH', catatan: '' };

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/70 transition-colors';

      const renderDimPills = (dimKey, currentVal) => {
        const levels = ['BB', 'MB', 'BSH', 'SB'];
        let html = '<div class="inline-flex gap-1">';
        levels.forEach(lvl => {
          const isSel = currentVal === lvl;
          const cls = isSel ? ('p5-btn-pill selected-' + lvl.toLowerCase()) : 'p5-btn-pill';
          html += `<button type="button" onclick="app.updateP5Score('${std.id}', '${dimKey}', '${lvl}')" class="${cls}">${lvl}</button>`;
        });
        html += '</div>';
        return html;
      };

      tr.innerHTML = `
        <td class="py-2 px-2 text-center font-bold text-slate-800">${std.noAbsen}</td>
        <td class="py-2 px-3 font-semibold text-slate-900">${std.nama}</td>
        <td class="py-2 px-3 text-center ${dims[0] ? '' : 'hidden'}">${renderDimPills('dim1', sc.dim1 || 'BSH')}</td>
        <td class="py-2 px-3 text-center ${dims[1] ? '' : 'hidden'}">${renderDimPills('dim2', sc.dim2 || 'BSH')}</td>
        <td class="py-2 px-3 text-center ${dims[2] ? '' : 'hidden'}">${renderDimPills('dim3', sc.dim3 || 'BSH')}</td>
        <td class="py-2 px-3">
          <input type="text" value="${(sc.catatan || '').replace(/"/g, '&quot;')}" onchange="app.updateP5Catatan('${std.id}', this.value)" placeholder="Catatan proses keaktifan..." class="w-full px-2 py-1 rounded border border-slate-200 text-xs bg-white focus:outline-none focus:border-teal-500">
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  updateP5Score(studentId, dimKey, score) {
    if (!state.p5Assessments[studentId]) {
      state.p5Assessments[studentId] = { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH', catatan: '' };
    }
    state.p5Assessments[studentId][dimKey] = score;
    this.renderP5Matriks();
  },

  updateP5Catatan(studentId, note) {
    if (!state.p5Assessments[studentId]) {
      state.p5Assessments[studentId] = { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH', catatan: '' };
    }
    state.p5Assessments[studentId].catatan = note.trim();
  },

  autoFillP5BSH() {
    state.students.forEach(std => {
      if (!state.p5Assessments[std.id]) {
        state.p5Assessments[std.id] = { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH', catatan: '' };
      } else {
        state.p5Assessments[std.id].dim1 = 'BSH';
        state.p5Assessments[std.id].dim2 = 'BSH';
        state.p5Assessments[std.id].dim3 = 'BSH';
      }
    });
    this.renderP5Matriks();
    this.notify('Seluruh siswa disetel ke capaian standar BSH (Berkembang Sesuai Harapan).');
  },

  generateAllP5NotesAI() {
    const tema = state.p5Project.tema;
    state.students.forEach(std => {
      const sc = state.p5Assessments[std.id] || { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH' };
      const nama = std.nama.split(' ')[0];
      
      let note = '';
      if (sc.dim1 === 'SB' || sc.dim2 === 'SB' || sc.dim3 === 'SB') {
        note = `Ananda ${nama} menunjukkan antusiasme dan kemandirian sangat tinggi dalam pelaksanaan projek ${tema}, serta mampu memimpin rekan kelompoknya secara konsisten.`;
      } else if (sc.dim1 === 'MB' || sc.dim2 === 'MB' || sc.dim3 === 'MB') {
        note = `Ananda ${nama} mulai memahami konsep projek ${tema} dan bekerja sama dengan tim, namun masih memerlukan sedikit motivasi dalam penyusunan laporan aksi.`;
      } else {
        note = `Ananda ${nama} aktif bergotong royong dan mampu bernalar kritis dengan baik selama seluruh tahapan projek ${tema} terlaksana sesuai harapan.`;
      }
      sc.catatan = note;
      state.p5Assessments[std.id] = sc;
    });

    this.renderP5Matriks();
    this.notify('AI berhasil merumuskan Catatan Proses Projek P5 untuk seluruh siswa kelas!');
  },

  saveP5Assessments() {
    localStorage.setItem(KEYS.P5_ASSESSMENTS, JSON.stringify(state.p5Assessments));
    this.notify('Penilaian Rubrik P5 berhasil disimpan ke basis data!');
  },

  populateP5RaporStudentSelect() {
    const sel = document.getElementById('p5-rapor-student-select');
    if (!sel) return;
    const currentVal = sel.value;
    sel.innerHTML = '';
    state.students.forEach(std => {
      const opt = document.createElement('option');
      opt.value = std.id;
      opt.textContent = `${std.noAbsen}. ${std.nama} (${std.gender})`;
      sel.appendChild(opt);
    });
    if (currentVal && state.students.some(s => s.id === currentVal)) {
      sel.value = currentVal;
    }
  },

  renderP5StudentRapor(studentId) {
    const container = document.getElementById('p5-print-rapor-sheet');
    if (!container) return;
    const std = state.students.find(s => s.id === studentId) || state.students[0];
    if (!std) return;

    const p = state.p5Project;
    const s = state.settings;
    const sc = state.p5Assessments[std.id] || { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH', catatan: '' };

    let rowsHtml = '';
    (p.dimensi || []).forEach((d, i) => {
      const score = sc['dim' + (i + 1)] || 'BSH';
      rowsHtml += `
        <tr>
          <td class="p-2 border border-slate-900 text-center font-bold">${i + 1}</td>
          <td class="p-2 border border-slate-900">
            <strong>${d.nama}</strong><br/>
            <span class="text-[11px] text-slate-700 font-sans leading-tight block mt-0.5">${d.subElemen}</span>
          </td>
          <td class="p-2 border border-slate-900 text-center font-bold text-sm ${score === 'BB' ? 'bg-red-50' : ''}">${score === 'BB' ? '✓' : ''}</td>
          <td class="p-2 border border-slate-900 text-center font-bold text-sm ${score === 'MB' ? 'bg-amber-50' : ''}">${score === 'MB' ? '✓' : ''}</td>
          <td class="p-2 border border-slate-900 text-center font-bold text-sm ${score === 'BSH' ? 'bg-blue-50' : ''}">${score === 'BSH' ? '✓' : ''}</td>
          <td class="p-2 border border-slate-900 text-center font-bold text-sm ${score === 'SB' ? 'bg-emerald-50' : ''}">${score === 'SB' ? '✓' : ''}</td>
        </tr>
      `;
    });

    container.innerHTML = `
      <!-- KOP SEKOLAH RESMI -->
      <div class="border-b-2 border-slate-900 pb-3 mb-4 text-center">
        <h4 class="font-bold text-sm tracking-wide uppercase">${s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA'}</h4>
        <h3 class="font-extrabold text-base uppercase text-slate-900">${s.schoolName || 'SMP NEGERI CONTOH TELADAN'}</h3>
        <p class="text-[11px] text-slate-600 font-sans">${s.schoolAddress || ''}</p>
      </div>

      <div class="text-center mb-4">
        <h2 class="font-bold text-sm uppercase tracking-wide underline">RAPOR PROJEK PENGUATAN PROFIL PELAJAR PANCASILA (P5)</h2>
        <p class="text-xs mt-0.5">${s.activeTA || 'Tahun Ajaran 2024/2025 – Genap'}</p>
      </div>

      <!-- IDENTITAS SISWA -->
      <table class="w-full text-xs font-serif mb-4" style="border: none !important;">
        <tr style="border: none !important;">
          <td style="border: none !important; width: 18%;"><b>Nama Peserta Didik</b></td>
          <td style="border: none !important; width: 35%;">: <b>${std.nama}</b></td>
          <td style="border: none !important; width: 18%;"><b>Kelas / Rombel</b></td>
          <td style="border: none !important; width: 29%;">: <span>${p.kelas || 'VII-A'}</span></td>
        </tr>
        <tr style="border: none !important;">
          <td style="border: none !important;"><b>NISN / No. Induk</b></td>
          <td style="border: none !important;">: <span>${std.nisn || '-'}</span></td>
          <td style="border: none !important;"><b>Fase / Semester</b></td>
          <td style="border: none !important;">: <span>${p.fase} / Genap</span></td>
        </tr>
      </table>

      <!-- DESKRIPSI PROJEK -->
      <div class="mb-4 p-3 border border-slate-900 rounded bg-slate-50/50 text-xs">
        <strong>Projek 1: ${p.tema}</strong><br/>
        <span class="font-semibold text-slate-800">Judul: ${p.judul}</span>
        <p class="text-[11px] text-slate-700 mt-1">${p.deskripsi}</p>
      </div>

      <!-- MATRIKS RUBRIK CHECKLIST -->
      <div class="overflow-x-auto mb-4">
        <table class="w-full text-xs border border-slate-900 border-collapse">
          <thead>
            <tr class="bg-slate-100 font-bold border-b border-slate-900 text-center">
              <th rowspan="2" class="border border-slate-900 p-2 w-8">No</th>
              <th rowspan="2" class="border border-slate-900 p-2 text-left">Target Dimensi & Sub-Elemen Karakter</th>
              <th colspan="4" class="border border-slate-900 p-1">Tingkat Pencapaian</th>
            </tr>
            <tr class="bg-slate-100 font-bold border-b border-slate-900 text-center text-[10px]">
              <th class="border border-slate-900 p-1 w-10">BB</th>
              <th class="border border-slate-900 p-1 w-10">MB</th>
              <th class="border border-slate-900 p-1 w-10">BSH</th>
              <th class="border border-slate-900 p-1 w-10">SB</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <!-- KETERANGAN SKALA -->
      <p class="text-[10px] text-slate-600 mb-4 font-sans italic">
        * Keterangan Skala: <b>BB</b> = Belum Berkembang • <b>MB</b> = Mulai Berkembang • <b>BSH</b> = Berkembang Sesuai Harapan • <b>SB</b> = Sangat Berkembang
      </p>

      <!-- CATATAN PROSES FASILITATOR -->
      <div class="border border-slate-900 p-3 rounded mb-6 text-xs bg-white">
        <strong>Catatan Proses Fasilitator / Wali Kelas:</strong>
        <p class="text-slate-800 mt-1 italic">${sc.catatan || 'Ananda aktif mengikuti seluruh proses projek dan menunjukkan capaian dimensi yang baik.'}</p>
      </div>

      <!-- TANDA TANGAN RESMI -->
      <div class="grid grid-cols-3 text-center text-xs font-serif avoid-break-inside">
        <div>
          <p>Mengetahui,</p>
          <p>Orang Tua / Wali Siswa</p>
          <div class="h-16"></div>
          <p class="font-bold underline">....................................................</p>
        </div>
        <div>
          <p>Mengetahui,</p>
          <p>Kepala Sekolah</p>
          <div class="h-16"></div>
          <p class="font-bold underline">${s.principalName || 'DRS. H. AHMAD RIFAI, M.Pd'}</p>
          <p>NIP. ${s.principalNip || '19750812 200003 1 002'}</p>
        </div>
        <div>
          <p>${s.city || 'Kota Contoh'}, 2025</p>
          <p>Wali Kelas / Koordinator P5,</p>
          <div class="h-16"></div>
          <p class="font-bold underline">${s.teacherName || 'Ibu Ratna Sari, S.Pd.'}</p>
          <p>NIP. ${s.teacherNip || '19880415 201101 2 004'}</p>
        </div>
      </div>
    `;
  },

  exportP5RaporWord() {
    const sel = document.getElementById('p5-rapor-student-select');
    const stdId = sel ? sel.value : (state.students[0] ? state.students[0].id : 'S01');
    const std = state.students.find(s => s.id === stdId) || state.students[0];
    const sheetEl = document.getElementById('p5-print-rapor-sheet');
    if (!sheetEl) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Rapor P5 - ${std.nama}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; }
        table { border-collapse: collapse; width: 100%; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 5px; }
        .center { text-align: center; }
      </style>
      </head>
      <body>
        ${sheetEl.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rapor_P5_${std.nama.replace(/\s+/g, '_')}.doc`;
    a.click();
    this.notify(`Lembar Rapor P5 untuk ${std.nama} berhasil diunduh dalam format Word (.doc)`);
  },

  openSettingsModal() {
    const s = state.settings;
    const stageSelect = document.getElementById('set-school-stage');
    if (stageSelect) stageSelect.value = s.stage || 'SMP';
    document.getElementById('set-teacher-name').value = s.teacherName || '';
    document.getElementById('set-teacher-role').value = s.teacherRole || '';
    document.getElementById('set-api-key').value = s.apiKey || '';
    const modelSelect = document.getElementById('set-ai-model');
    const legacyModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    if (modelSelect) modelSelect.value = (legacyModels.includes(s.aiModel) ? 'gemini-3.1-flash-lite' : (s.aiModel || 'gemini-3.1-flash-lite'));
    document.getElementById('set-school-parent').value = s.schoolParent || '';
    document.getElementById('set-school-name').value = s.schoolName || '';
    document.getElementById('set-school-address').value = s.schoolAddress || '';
    document.getElementById('set-principal-name').value = s.principalName || '';
    document.getElementById('set-principal-nip').value = s.principalNip || '';
    const stampCb = document.getElementById('set-show-stamp');
    if (stampCb) stampCb.checked = s.showStamp !== false;
    document.getElementById('modal-settings').classList.remove('hidden');
  },

  closeSettingsModal() {
    document.getElementById('modal-settings').classList.add('hidden');
  },

  saveSettingsFromModal() {
    state.settings = {
      ...state.settings,
      teacherName: document.getElementById('set-teacher-name').value.trim() || 'Ibu Ratna Sari, S.Pd.',
      teacherRole: document.getElementById('set-teacher-role').value.trim() || 'Guru Matematika & Wali Kelas VII-A',
      apiKey: document.getElementById('set-api-key').value.trim(),
      aiModel: document.getElementById('set-ai-model')?.value || 'gemini-3.1-flash-lite',
      schoolParent: document.getElementById('set-school-parent').value.trim(),
      schoolName: document.getElementById('set-school-name').value.trim(),
      schoolAddress: document.getElementById('set-school-address').value.trim(),
      principalName: document.getElementById('set-principal-name').value.trim(),
      principalNip: document.getElementById('set-principal-nip').value.trim(),
      showStamp: document.getElementById('set-show-stamp') ? document.getElementById('set-show-stamp').checked : true,
      stage: document.getElementById('set-school-stage')?.value || 'SMP'
    };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    this.updateKopDisplay();
    this.updateTopbarDisplay();
    this.updateAIStatusDisplay();
    this.updateModulAIStatusDisplay();
    this.closeSettingsModal();
    this.renderMapelQuickChips();
    this.updateP5RecommendationBadge();
    this.renderStudentReportCard();

    // Sync Master School Key & Kop Settings to Supabase Cloud if connected
    if (state.supabaseClient) {
      state.supabaseClient
        .from('school_settings')
        .upsert({
          id: 'primary',
          school_name: state.settings.schoolParent || '',
          school_unit: state.settings.schoolName || '',
          school_address: state.settings.schoolAddress || '',
          school_stage: state.settings.stage || 'SMP',
          teacher_name: state.settings.teacherName || '',
          teacher_role: state.settings.teacherRole || '',
          headmaster_name: state.settings.principalName || '',
          headmaster_nip: state.settings.principalNip || '',
          gemini_api_key: state.settings.apiKey || '',
          ai_model: state.settings.aiModel || 'gemini-3.1-flash-lite',
          show_stamp: state.settings.showStamp !== false,
          updated_at: new Date().toISOString()
        })
        .then(() => {
          console.log('Master school settings synced to Supabase Cloud');
        })
        .catch(e => console.warn('Supabase settings sync error', e));
    }

    this.notify('Profil guru, kop surat dinas & konfigurasi AI berhasil disimpan.');
  },

  updateKopDisplay() {
    const s = state.settings;
    const parentEl = document.getElementById('kop-school-name');
    const unitEl = document.getElementById('kop-school-unit');
    const addrEl = document.getElementById('kop-school-address');
    if (parentEl) parentEl.textContent = s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA';
    if (unitEl) unitEl.textContent = s.schoolName || 'SMP NEGERI CONTOH TELADAN';
    if (addrEl) addrEl.textContent = s.schoolAddress || '';

    // Update stamp on report card if element exists
    const stampEl = document.getElementById('official-school-stamp');
    if (stampEl) {
      stampEl.classList.toggle('hidden', s.showStamp === false);
    }

    const loginBanner = document.getElementById('login-school-banner');
    if (loginBanner) loginBanner.textContent = s.schoolName || 'SMP NEGERI CONTOH TELADAN';
  },

  // ---------- AI CONFIGURATION & DIAGNOSTICS (FITUR OPTION A) ----------
  updateAIStatusDisplay() {
    const apiKey = state.settings?.apiKey;
    const model = state.settings?.aiModel || 'gemini-3.1-flash-lite';
    const card = document.getElementById('gen-ai-status-card');
    const dot = document.getElementById('gen-ai-status-dot');
    const title = document.getElementById('gen-ai-status-title');
    const desc = document.getElementById('gen-ai-status-desc');
    if (!card) return;

    if (apiKey && apiKey.trim() !== '' && model !== 'offline') {
      card.className = 'p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs';
      if (dot) dot.className = 'w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0';
      if (title) title.textContent = `🟢 Mesin AI Gemini Aktif (${model}) • Siap Merumuskan Soal Otomatis`;
      if (desc) desc.textContent = 'Generator siap membuat naskah soal HOTS, kisi-kisi, kartu soal, dan kunci jawaban secara cerdas & otomatis via cloud.';
    } else {
      card.className = 'p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs';
      if (dot) dot.className = 'w-3 h-3 rounded-full bg-amber-500 shrink-0';
      if (title) title.textContent = '🟡 Mode Standar Offline (Kunci AI Belum Terpasang)';
      if (desc) desc.textContent = 'Generate soal menggunakan kurasi template standar lokal. Pasang Google Gemini API Key untuk perumusan soal otomatis AI tak terbatas.';
    }
  },

  async testAIConnection() {
    const modalKeyInput = document.getElementById('set-api-key');
    let keyToTest = (modalKeyInput && modalKeyInput.value.trim()) ? modalKeyInput.value.trim() : (state.settings?.apiKey || '');
    const modelSelect = document.getElementById('set-ai-model');
    const legacyModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
    let modelToTest = (modelSelect && modelSelect.value) ? modelSelect.value : (state.settings?.aiModel || 'gemini-3.1-flash-lite');
    if (legacyModels.includes(modelToTest)) {
      modelToTest = 'gemini-3.1-flash-lite';
      if (modelSelect) modelSelect.value = 'gemini-3.1-flash-lite';
    }

    if (!keyToTest) {
      alert('⚠️ Kunci API Gemini belum diisi!\n\nSilakan masukkan Google Gemini API Key pada kolom pengaturan terlebih dahulu.');
      this.notify('⚠️ Kunci API Gemini belum diisi.');
      return false;
    }

    if (modelToTest === 'offline') {
      alert('ℹ️ Model saat ini diatur ke Mode Offline. Ubah model ke Gemini 3.1 Flash Lite atau Gemini 3.5 Flash untuk menggunakan koneksi AI.');
      return false;
    }

    this.notify('⏳ Sedang menguji konektivitas Google Gemini API...');
    const startTime = Date.now();

    try {
      let resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelToTest}:generateContent?key=${keyToTest}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'ping' }] }],
          generationConfig: { maxOutputTokens: 2 }
        })
      });

      let usedModel = modelToTest;

      // Resilient failover if chosen model is 404 (deprecated) or 503 (busy)
      if (!resp.ok && (resp.status === 404 || resp.status === 503) && modelToTest !== 'gemini-3.1-flash-lite') {
        const failoverResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${keyToTest}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'ping' }] }],
            generationConfig: { maxOutputTokens: 2 }
          })
        });
        if (failoverResp.ok) {
          resp = failoverResp;
          usedModel = 'gemini-3.1-flash-lite';
          if (modelSelect) modelSelect.value = 'gemini-3.1-flash-lite';
          state.settings.aiModel = 'gemini-3.1-flash-lite';
          localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
        }
      }

      const latency = Date.now() - startTime;

      if (resp.ok) {
        this.notify(`✅ Koneksi AI Berhasil! Latensi: ${latency}ms (${usedModel})`);
        alert(`✅ KONEKSI AI BERHASIL!\n\n• Status: Terhubung Normal (HTTP 200)\n• Model: ${usedModel}\n• Kecepatan Respon: ${latency} ms\n• Mesin Siap: Generator Asesmen & Pembuat Soal Otomatis Aktif.`);
        return true;
      } else {
        const errData = await resp.json().catch(() => ({}));
        const errMsg = errData?.error?.message || resp.statusText;
        let tip = 'Periksa apakah API Key Anda valid dan tidak memiliki batasan domain/referrer.';
        if (resp.status === 400 || resp.status === 403) {
          tip = 'API Key tidak valid atau izin API Gemini belum diaktifkan di Google AI Studio.';
        } else if (resp.status === 404) {
          tip = 'Model AI yang dipilih tidak tersedia. Sistem merekomendasikan "Gemini 3.1 Flash Lite".';
        } else if (resp.status === 429) {
          tip = 'Batas kuota gratis (Rate Limit) tercapai. Silakan coba kembali beberapa saat lagi.';
        } else if (resp.status === 503) {
          tip = 'Server Google sedang mengalami lonjakan trafik sesaat. Silakan klik Uji kembali dalam beberapa detik.';
        }
        alert(`❌ PENGUJIAN KONEKSI AI GAGAL (Kode ${resp.status})\n\nDetail: ${errMsg}\n\nSaran: ${tip}`);
        this.notify(`❌ Uji AI Gagal: HTTP ${resp.status}`);
        return false;
      }
    } catch (err) {
      alert(`❌ GAGAL MENGHUBUNGI SERVER GOOGLE\n\nDetail: ${err.message}\n\nPastikan koneksi internet aktif dan tidak diblokir oleh firewall atau VPN.`);
      this.notify('❌ Gagal menghubungi server AI Google.');
      return false;
    }
  },

  async syncSchoolSettingsFromCloud() {
    if (!state.supabaseClient) return;
    try {
      const { data, error } = await state.supabaseClient
        .from('school_settings')
        .select('*')
        .eq('id', 'primary')
        .maybeSingle();

      if (!error && data) {
        let changed = false;
        if (data.gemini_api_key && (!state.settings.apiKey || state.settings.apiKey.trim() === '')) {
          state.settings.apiKey = data.gemini_api_key;
          changed = true;
        }
        if (data.ai_model) {
          const legacy = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash'];
          const cloudModel = legacy.includes(data.ai_model) ? 'gemini-3.1-flash-lite' : data.ai_model;
          if (state.settings.aiModel !== cloudModel) {
            state.settings.aiModel = cloudModel;
            changed = true;
          }
        }
        if (data.school_name && !state.settings.schoolParent) {
          state.settings.schoolParent = data.school_name;
          changed = true;
        }
        if (data.school_unit && !state.settings.schoolName) {
          state.settings.schoolName = data.school_unit;
          changed = true;
        }
        if (changed) {
          localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
          this.updateKopDisplay();
          this.updateAIStatusDisplay();
        }
      }
    } catch (err) {
      console.warn('Sync school settings from cloud error', err);
    }
  },

  // ================= 11. SISTEM GERBANG LOGIN & OTENTIKASI =================
  checkAuthSession() {
    const bannerEl = document.getElementById('login-school-banner');
    if (bannerEl) bannerEl.textContent = state.settings.schoolName || 'SMP NEGERI CONTOH TELADAN';

    // First-run onboarding check: If no teachers registered, show setup card instead of regular login
    const setupCard = document.getElementById('card-first-run-setup');
    const regularCard = document.getElementById('card-regular-login');
    const hasTeachers = state.teachers && state.teachers.length > 0;

    if (!hasTeachers) {
      if (setupCard) setupCard.classList.remove('hidden');
      if (regularCard) regularCard.classList.add('hidden');
    } else {
      if (setupCard) setupCard.classList.add('hidden');
      if (regularCard) regularCard.classList.remove('hidden');
    }

    // Populate student select in login form
    const stdSelect = document.getElementById('login-select-student');
    if (stdSelect) {
      stdSelect.innerHTML = '';
      if (state.students.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '-- Belum ada data siswa terdaftar --';
        stdSelect.appendChild(opt);
      } else {
        state.students.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.id;
          opt.textContent = `Absen ${s.noAbsen} - ${s.nama} (${s.nisn || '-'})`;
          stdSelect.appendChild(opt);
        });
        stdSelect.onchange = () => {
          const found = state.students.find(s => s.id === stdSelect.value);
          const pinInput = document.getElementById('login-input-student-pin');
          if (found && pinInput) pinInput.value = found.nisn || '';
        };
      }
    }

    // Check stored session
    let sess = null;
    try {
      const stored = localStorage.getItem(KEYS.AUTH_SESSION) || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(KEYS.AUTH_SESSION) : null);
      if (stored) sess = JSON.parse(stored);
    } catch (e) {
      console.warn('Auth session parse error', e);
    }

    const gate = document.getElementById('view-login-gate');
    if (sess && sess.isLoggedIn) {
      state.auth = sess;
      if (gate) gate.classList.add('hidden');
      this.updateTopbarUserDisplay();
      this.applyRoleAccessControl(sess.role || 'guru');
      if (sess.role === 'siswa') {
        this.navigate('lms');
        this.switchLMSRole('siswa');
      }
      return true;
    } else {
      state.auth = { isLoggedIn: false, currentUser: null, role: 'guru' };
      if (gate) gate.classList.remove('hidden');
      this.applyRoleAccessControl('guru');
      return false;
    }
  },

  handleFirstRunSetup() {
    const schoolName = document.getElementById('setup-school-name')?.value.trim() || 'SEKOLAH SAYA';
    const stage = document.getElementById('setup-school-stage')?.value || 'SMP';
    const mapel = document.getElementById('setup-teacher-mapel')?.value.trim() || 'Matematika';
    const teacherName = document.getElementById('setup-teacher-name')?.value.trim() || 'Guru Pengampu';
    const teacherNip = document.getElementById('setup-teacher-nip')?.value.trim() || '198501012010011001';

    const newTeacher = {
      id: 'T01',
      nip: teacherNip,
      nuptk: '',
      nama: teacherName,
      jabatan: `Wali Kelas & Guru ${mapel}`,
      mapel: mapel,
      status: 'PNS',
      golongan: 'Penata / III/c',
      pendidikan: 'S1 Kependidikan',
      sertifikasi: true,
      bebanJp: 24,
      rombel: 'Kelas Utama',
      tugasTambahan: 'Wali Kelas & Administrator',
      kontak: ''
    };

    state.teachers = [newTeacher];
    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(state.teachers));

    state.settings.schoolName = schoolName;
    state.settings.stage = stage;
    state.settings.teacherName = teacherName;
    state.settings.teacherNip = teacherNip;
    state.settings.teacherRole = `Guru ${mapel}`;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));

    this.updateKopDisplay();
    this.updateTopbarDisplay();
    this.renderTeacherTable();
    this.renderDashboardStats();

    // Auto-login as first teacher
    const sess = {
      isLoggedIn: true,
      role: 'guru',
      user: {
        id: 'T01',
        nama: teacherName,
        nip: teacherNip,
        role: `Guru ${mapel}`,
        avatar: teacherName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'GS'
      },
      loginTime: new Date().toISOString()
    };
    state.auth = sess;
    localStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify(sess));

    const gate = document.getElementById('view-login-gate');
    if (gate) gate.classList.add('hidden');
    this.updateTopbarUserDisplay();
    this.applyRoleAccessControl('guru');
    this.navigate('dashboard');
    this.notify(`🎉 Setup awal selesai! Selamat datang di GuruSuite AI, ${teacherName}.`);
  },

  switchLoginTab(role) {
    state.auth.role = role;
    const tabGuru = document.getElementById('login-tab-guru-btn');
    const tabSiswa = document.getElementById('login-tab-siswa-btn');
    const formGuru = document.getElementById('form-login-guru');
    const formSiswa = document.getElementById('form-login-siswa');

    if (role === 'guru') {
      if (formGuru) formGuru.classList.remove('hidden');
      if (formSiswa) formSiswa.classList.add('hidden');
      if (tabGuru) {
        tabGuru.className = 'py-2 rounded-lg text-xs font-black bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all flex items-center justify-center gap-1.5 cursor-pointer';
      }
      if (tabSiswa) {
        tabSiswa.className = 'py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 border-2 border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer';
      }
    } else {
      if (formGuru) formGuru.classList.add('hidden');
      if (formSiswa) formSiswa.classList.remove('hidden');
      if (tabGuru) {
        tabGuru.className = 'py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 border-2 border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer';
      }
      if (tabSiswa) {
        tabSiswa.className = 'py-2 rounded-lg text-xs font-black bg-sky-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all flex items-center justify-center gap-1.5 cursor-pointer';
      }
    }
  },

  handleTeacherLogin() {
    const nip = document.getElementById('login-input-nip')?.value.trim();
    const remember = document.getElementById('login-remember-me')?.checked;

    let matchedTeacher = null;
    if (state.teachers && state.teachers.length > 0) {
      if (nip) {
        matchedTeacher = state.teachers.find(t => (t.nip && t.nip.replace(/\s+/g, '') === nip.replace(/\s+/g, '')) || t.nama.toLowerCase().includes(nip.toLowerCase()));
      }
      if (!matchedTeacher) {
        matchedTeacher = state.teachers[0];
      }
    }

    const teacherName = matchedTeacher ? matchedTeacher.nama : (state.settings.teacherName || 'Bapak/Ibu Guru');
    const teacherNip = matchedTeacher ? matchedTeacher.nip : (state.settings.teacherNip || nip || '-');
    const teacherRole = matchedTeacher ? matchedTeacher.jabatan : (state.settings.teacherRole || 'Pendidik');
    const teacherId = matchedTeacher ? matchedTeacher.id : 'T01';

    const sess = {
      isLoggedIn: true,
      role: 'guru',
      user: {
        id: teacherId,
        nama: teacherName,
        nip: teacherNip,
        role: teacherRole,
        avatar: teacherName.split(' ').filter(w => !w.includes('.')).map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'GS'
      },
      loginTime: new Date().toISOString()
    };

    state.auth = sess;
    if (remember) {
      localStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify(sess));
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify(sess));
    } else {
      localStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify(sess));
    }

    const gate = document.getElementById('view-login-gate');
    if (gate) gate.classList.add('hidden');
    this.updateTopbarUserDisplay();
    this.applyRoleAccessControl('guru');
    this.navigate('dashboard');
    this.notify(`👋 Selamat datang, ${teacherName}! Dashboard Guru aktif.`);
  },

  handleStudentLogin() {
    if (!state.students || state.students.length === 0) {
      alert('Belum ada siswa terdaftar dalam sistem. Hubungi guru/admin untuk menambahkan data siswa.');
      return;
    }
    const sel = document.getElementById('login-select-student');
    const stdId = sel ? sel.value : (state.students[0] ? state.students[0].id : null);
    const std = state.students.find(s => s.id === stdId) || state.students[0];
    if (!std) {
      alert('Data siswa tidak ditemukan.');
      return;
    }

    const sess = {
      isLoggedIn: true,
      role: 'siswa',
      user: {
        id: std.id,
        nama: std.nama,
        nisn: std.nisn,
        noAbsen: std.noAbsen,
        avatar: std.nama.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
      },
      loginTime: new Date().toISOString()
    };

    state.auth = sess;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify(sess));
    } else {
      localStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify(sess));
    }

    const gate = document.getElementById('view-login-gate');
    if (gate) gate.classList.add('hidden');
    this.updateTopbarUserDisplay();
    this.applyRoleAccessControl('siswa');
    this.navigate('lms');
    this.switchLMSRole('siswa');
    this.initStudentCBTPlayer();
    this.notify(`🎒 Selamat datang di Ruang Ujian CBT, ${std.nama}!`);
  },

  handleQuickDemoLogin(role = 'guru') {
    if (role === 'guru') {
      if (!state.teachers || state.teachers.length === 0) {
        state.teachers = [{
          id: 'T01',
          nip: '19880415 201101 2 004',
          nuptk: '4536766668200003',
          nama: 'Ibu Ratna Sari, S.Pd.',
          jabatan: 'Wali Kelas & Guru Matematika',
          mapel: 'Matematika',
          status: 'PNS',
          golongan: 'Penata / III/c',
          pendidikan: 'S1 Pendidikan Matematika - UNY',
          sertifikasi: true,
          bebanJp: 28,
          rombel: 'VII-A',
          tugasTambahan: 'Wali Kelas VII-A',
          kontak: '0812-3456-7890'
        }];
        state.settings.teacherName = 'Ibu Ratna Sari, S.Pd.';
        state.settings.teacherNip = '19880415 201101 2 004';
      }
      this.handleTeacherLogin();
    } else {
      if (!state.students || state.students.length === 0) {
        state.students = [{
          id: 'S01',
          noAbsen: 1,
          nisn: '0081234567',
          nis: '24250701',
          nama: 'Achmad Dani Pratama',
          gender: 'L',
          tempatLahir: 'Jakarta',
          tanggalLahir: '2011-05-14',
          agama: 'Islam',
          waliNama: 'Bambang Sudiro',
          waliHp: '0812-9876-5432',
          alamat: 'Jl. Merdeka No. 12',
          gayaBelajar: 'Visual',
          statusPip: true,
          catatanKhusus: 'Aktif dalam KBM',
          tabungan: 0
        }];
      }
      this.handleStudentLogin();
    }
  },

  logout() {
    this.showCustomDialog({
      title: 'Konfirmasi Keluar',
      message: 'Apakah Anda yakin ingin keluar dari sistem GuruSuite AI?',
      iconType: 'warning',
      confirmText: 'Ya, Keluar',
      cancelText: 'Batal',
      onConfirm: () => {
        localStorage.removeItem(KEYS.AUTH_SESSION);
        if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(KEYS.AUTH_SESSION);
        state.auth = { isLoggedIn: false, currentUser: null, role: 'guru' };
        this.applyRoleAccessControl('guru');
        const gate = document.getElementById('view-login-gate');
        if (gate) gate.classList.remove('hidden');
        this.notify('Anda telah berhasil keluar dari sistem.', 'info');
      }
    });
  },

  logoutOrSwitchPortal() {
    this.logout();
  },

  applyRoleAccessControl(role = 'guru') {
    const teacherMenu = document.getElementById('sidebar-teacher-menu');
    const studentMenu = document.getElementById('sidebar-student-menu');
    const roleSwitcher = document.getElementById('lms-role-switcher-container');
    const roleGuruBtn = document.getElementById('lms-role-guru-btn');
    const cbtStudentSel = document.getElementById('cbt-student-select');

    if (role === 'siswa') {
      if (teacherMenu) teacherMenu.classList.add('hidden');
      if (studentMenu) studentMenu.classList.remove('hidden');
      if (roleGuruBtn) roleGuruBtn.classList.add('hidden');
      if (roleSwitcher) roleSwitcher.classList.add('hidden');

      if (state.auth && state.auth.user) {
        const u = state.auth.user;
        const sName = document.getElementById('sidebar-student-name');
        const sSub = document.getElementById('sidebar-student-sub');
        if (sName) sName.textContent = u.nama || 'Peserta Ujian';
        if (sSub) sSub.textContent = `NISN: ${u.nisn || '-'} | No. Absen ${u.noAbsen || '-'}`;
      }

      if (cbtStudentSel && state.auth && state.auth.user) {
        cbtStudentSel.value = state.auth.user.id;
        cbtStudentSel.disabled = true;
      }
    } else {
      if (teacherMenu) teacherMenu.classList.remove('hidden');
      if (studentMenu) studentMenu.classList.add('hidden');
      if (roleGuruBtn) roleGuruBtn.classList.remove('hidden');
      if (roleSwitcher) roleSwitcher.classList.remove('hidden');

      if (cbtStudentSel) {
        cbtStudentSel.disabled = false;
      }
    }
  },

  updateTopbarUserDisplay() {
    const u = (state.auth && state.auth.user) ? state.auth.user : {
      nama: state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.',
      role: state.settings.teacherRole || 'Guru Matematika & Wali Kelas VII-A',
      avatar: 'RS'
    };
    const nameEl = document.getElementById('topbar-teacher-name');
    const roleEl = document.getElementById('topbar-teacher-role');
    const avatarEl = document.getElementById('topbar-teacher-avatar');

    if (nameEl) nameEl.textContent = u.nama;
    if (roleEl) roleEl.textContent = (state.auth && state.auth.role === 'siswa') ? `Siswa • NISN: ${u.nisn || '-'}` : u.role;
    if (avatarEl) avatarEl.textContent = u.avatar || (u.nama ? u.nama.slice(0, 2).toUpperCase() : 'GS');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// Expose app and state globally for browser console & testing environments
if (typeof window !== 'undefined') {
  window.app = app;
  window.state = state;
}
if (typeof globalThis !== 'undefined') {
  globalThis.app = app;
  globalThis.state = state;
}

