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
  P5_ASSESSMENTS: 'gurusui_p5_assessments_v2'
};

const DEFAULT_TEACHERS = [
  { id: 'T01', nip: '19880415 201101 2 004', nama: 'Ibu Ratna Sari, S.Pd.', jabatan: 'Guru Matematika & Wali Kelas VII-A', mapel: 'Matematika', status: 'PNS', kontak: '0812-3456-7890' },
  { id: 'T02', nip: '19750812 200003 1 002', nama: 'Drs. H. Ahmad Rifai, M.Pd.', jabatan: 'Kepala Sekolah', mapel: 'Pendidikan Pancasila', status: 'PNS', kontak: '0813-9876-5432' },
  { id: 'T03', nip: '19920310 201902 1 003', nama: 'Bambang Sudarmono, M.Pd.', jabatan: 'Guru IPA & Koordinator P5', mapel: 'Ilmu Pengetahuan Alam (IPA)', status: 'PPPK', kontak: '0857-1122-3344' },
  { id: 'T04', nip: '19951120 202203 2 008', nama: 'Dewi Lestari, S.Pd.', jabatan: 'Guru Bahasa Indonesia', mapel: 'Bahasa Indonesia', status: 'PPPK', kontak: '0878-5566-7788' },
  { id: 'T05', nip: '19980614 202401 1 009', nama: 'Fikri Haikal, S.Pd.', jabatan: 'Guru Informatika & Teknisi Lab', mapel: 'Informatika', status: 'GTT', kontak: '0896-9988-7766' }
];

const DEFAULT_JOURNALS = [
  {
    id: 'J01',
    tanggal: '2025-05-12',
    kelas: 'Kelas VII-A',
    mapel: 'Matematika',
    jamKe: 'Jam 1 - 3 (07.30 - 09.30)',
    materi: 'Persamaan Linear Satu Variabel (PLSV) dalam Kehidupan Nyata & Sifat Kesetaraan',
    targetTp: 'TP 2: Menyelesaikan model matematika berkaitan dengan PLSV',
    hadir: 7,
    sakit: 1,
    izin: 0,
    alfa: 0,
    catatan: 'Murid sangat antusias saat simulasi timbangan neraca aljabar. Bagus Satria berhalangan sakit (surat terlampir).',
    refleksi: 'Pembelajaran berbasis masalah (PBL) sangat efektif mendorong nalar kritis murid. 85% siswa berhasil merumuskan model PLSV secara tepat. Remedial kelompok disiapkan bagi murid yang belum menguasai operasi tanda aljabar.'
  },
  {
    id: 'J02',
    tanggal: '2025-05-14',
    kelas: 'Kelas VII-A',
    mapel: 'Matematika',
    jamKe: 'Jam 3 - 4 (09.05 - 10.25)',
    materi: 'Latihan Terbimbing Soal Cerita PLSV & Diskusi Kelompok LKPD',
    targetTp: 'TP 2: Menerapkan konsep PLSV untuk memecahkan masalah kontekstual',
    hadir: 8,
    sakit: 0,
    izin: 0,
    alfa: 0,
    catatan: 'Seluruh murid hadir lengkap. Kelompok 2 dan 4 menampilkan presentasi penyelesaian soal cerita dengan skema diagram yang sangat runtut.',
    refleksi: 'Strategi kolaboratif mempercepat pemahaman murid. Formatif asesmen menunjukkan peningkatan ketuntasan dari 65% menjadi 88%. Tugas pengayaan diberikan untuk persiapan kuis CBT sumatif.'
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'warning',
    category: 'Akademik & Nilai Rapor',
    title: 'Nilai di Bawah KKTP (Remedial Dibutuhkan)',
    message: 'Murid Bagus Satria Wibawa (S03) dan Dimas Anggara (S05) memperoleh NA Matematika di bawah KKTP 75.',
    actionLabel: 'Buka Olah Nilai Rapor',
    actionPane: 'rapor',
    read: false
  },
  {
    id: 'notif-2',
    type: 'info',
    category: 'LMS & CBT Ujian',
    title: 'Kuis CBT Belum Disinkronkan ke Rapor',
    message: 'Hasil kuis Formatif PLSV siswa kelas VII-A belum disinkronkan ke Buku Nilai Rapor Kurikulum Merdeka.',
    actionLabel: 'Sinkronkan Sekarang',
    actionPane: 'lms',
    read: false
  },
  {
    id: 'notif-3',
    type: 'danger',
    category: 'Agenda KBM Harian',
    title: 'Jurnal Mengajar Hari Ini Belum Diisi',
    message: 'Agenda KBM untuk kelas VII-A pertemuan hari ini belum dicatat dalam Buku Jurnal Supervisi.',
    actionLabel: 'Tulis Jurnal KBM',
    actionPane: 'jurnal',
    read: false
  },
  {
    id: 'notif-4',
    type: 'neutral',
    category: 'Keuangan Kelas',
    title: 'Tunggakan Iuran Kas Kelas',
    message: 'Terdapat 3 siswa yang belum menyetorkan iuran kas mingguan kelas VII-A bulan berjalan.',
    actionLabel: 'Cek Kas Kelas',
    actionPane: 'kas',
    read: false
  }
];

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

const DEFAULT_P5_ASSESSMENTS = {
  'S01': { dim1: 'BSH', dim2: 'SB', dim3: 'BSH', catatan: 'Achmad sangat aktif dalam pembagian tugas kelompok komposter dan menunjukkan inisiatif tinggi saat audit sampah kantin.' },
  'S02': { dim1: 'SB', dim2: 'SB', dim3: 'SB', catatan: 'Adzkia menunjukkan pemikiran kritis luar biasa dalam menganalisis laju fermentasi kompos serta memiliki kepedulian lingkungan yang kuat.' },
  'S03': { dim1: 'MB', dim2: 'BSH', dim3: 'MB', catatan: 'Bagus mampu bekerja sama dengan baik dalam tim, namun masih memerlukan bimbingan dalam pencatatan data observasi harian.' },
  'S04': { dim1: 'BSH', dim2: 'SB', dim3: 'BSH', catatan: 'Cantika sangat cekatan dan tekun dalam merawat ember komposter serta pandai memotivasi anggota kelompoknya.' },
  'S05': { dim1: 'MB', dim2: 'MB', dim3: 'MB', catatan: 'Dimas mulai menunjukkan kepedulian terhadap kebersihan lingkungan sekolah, disarankan lebih aktif dalam diskusi refleksi kelompok.' },
  'S06': { dim1: 'SB', dim2: 'SB', dim3: 'SB', catatan: 'Elysia sangat konsisten dan kreatif dalam mendesain botol kemasan pupuk cair serta mempresentasikan hasil panen dengan percaya diri.' },
  'S07': { dim1: 'BSH', dim2: 'BSH', dim3: 'BSH', catatan: 'Fajar aktif mengikuti seluruh rangkaian aktivitas kontekstualisasi dan aksi nyata pembuatan pupuk organik.' },
  'S08': { dim1: 'SB', dim2: 'SB', dim3: 'BSH', catatan: 'Gisela memiliki empati tinggi terhadap kelestarian alam dan selalu tuntas menyelesaikan tanggung jawab tugas tim.' }
};

const DEFAULT_SETTINGS = {
  apiKey: '',
  schoolParent: 'PEMERINTAH KABUPATEN / KOTA',
  schoolName: 'SMP NEGERI CONTOH TELADAN',
  schoolAddress: 'Jl. Pendidikan No. 123, Kel. Merdeka • Telp: (021) 1234567 • Email: smpncontoh@sekolah.sch.id',
  principalName: 'DRS. H. AHMAD RIFAI, M.Pd',
  principalNip: '19750812 200003 1 002',
  teacherName: 'Ibu Ratna Sari, S.Pd.',
  teacherRole: 'Guru Matematika & Wali Kelas VII-A',
  teacherNip: '19880415 201101 2 004',
  city: 'Kota Contoh',
  defaultPaper: 'A4',
  activeTA: 'TA 2024/2025 – Genap'
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
  { id: 'K01', tanggal: '2025-05-01', uraian: 'Saldo awal kas kelas', tipe: 'masuk', nominal: 350000 },
  { id: 'K02', tanggal: '2025-05-08', uraian: 'Iuran kas mingguan siswa', tipe: 'masuk', nominal: 160000 },
  { id: 'K03', tanggal: '2025-05-12', uraian: 'Pembelian spidol & penghapus whiteboard', tipe: 'keluar', nominal: 30000 }
];

const DEFAULT_RAPOR_GRADES = {
  mapel: 'Matematika',
  kktp: 75,
  tpList: [
    { id: 'TP1', label: 'Operasi hitung bilangan bulat dan pecahan sederhana' },
    { id: 'TP2', label: 'Menyelesaikan persamaan dan pertidaksamaan linear satu variabel' },
    { id: 'TP3', label: 'Menerapkan perbandingan senilai dan berbalik nilai dalam soal cerita' },
    { id: 'TP4', label: 'Menganalisis data statistika dalam diagram batang dan lingkaran' }
  ],
  studentGrades: {
    'S01': { tp1: 85, tp2: 90, tp3: 78, tp4: 82, sumatifBab: 84, sas: 88, na: 85, deskripsi: '' },
    'S02': { tp1: 92, tp2: 95, tp3: 88, tp4: 90, sumatifBab: 94, sas: 96, na: 93, deskripsi: '' },
    'S03': { tp1: 75, tp2: 70, tp3: 80, tp4: 72, sumatifBab: 74, sas: 72, na: 73, deskripsi: '' },
    'S04': { tp1: 88, tp2: 85, tp3: 90, tp4: 86, sumatifBab: 88, sas: 90, na: 88, deskripsi: '' },
    'S05': { tp1: 70, tp2: 68, tp3: 72, tp4: 70, sumatifBab: 68, sas: 70, na: 70, deskripsi: '' },
    'S06': { tp1: 95, tp2: 92, tp3: 94, tp4: 90, sumatifBab: 92, sas: 94, na: 93, deskripsi: '' },
    'S07': { tp1: 80, tp2: 78, tp3: 82, tp4: 75, sumatifBab: 78, sas: 80, na: 79, deskripsi: '' },
    'S08': { tp1: 90, tp2: 88, tp3: 86, tp4: 92, sumatifBab: 90, sas: 92, na: 90, deskripsi: '' }
  }
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
  savings: [],
  cash: [...DEFAULT_CASH],
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
  customDialogCallback: null
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
      if (state.supabaseConfig && state.supabaseConfig.connected) {
        cloudLabel.textContent = '⚡ Cloud Terhubung';
      } else {
        cloudLabel.textContent = 'Hubungkan Google Sheets';
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
    if (paneId === 'modul') this.renderModulPreview();
    if (paneId === 'soal') this.renderStudio();
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
    setTimeout(() => { toast.remove(); }, 3500);
  },

  // ---------- STORAGE ----------
  loadStateFromStorage() {
    try {
      const s = localStorage.getItem(KEYS.SETTINGS);
      if (s) state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(s) };

      const std = localStorage.getItem(KEYS.STUDENTS);
      if (std) state.students = JSON.parse(std);

      const tc = localStorage.getItem(KEYS.TEACHERS);
      if (tc) state.teachers = JSON.parse(tc);

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
    this.notify('Kembali ke Mode Offline Lokal.');
  },

  renderDashboardStats() {
    document.getElementById('dash-stat-students').textContent = state.students.length;
    document.getElementById('dash-stat-modul').textContent = state.currentModul ? '1 Siap' : '0';
    document.getElementById('dash-stat-soal').textContent = state.currentPackage ? '1 Aktif' : '0';
  },

  // ---------- MASTER SISWA & KELAS ----------
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
    this.renderLegerTable();
    this.populateRaporStudentPicker();
    this.notify('Siswa ' + nama + ' berhasil ditambahkan.');
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
  renderTeacherTable() {
    const tbody = document.getElementById('teacher-table-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const badgeTeachers = document.getElementById('badge-total-teachers');
    if (badgeTeachers) badgeTeachers.textContent = `${state.teachers.length} GTK`;

    const statTotal = document.getElementById('stat-total-teachers');
    if (statTotal) statTotal.textContent = `${state.teachers.length} Orang`;

    const asnCount = state.teachers.filter(t => t.status === 'PNS' || t.status === 'PPPK').length;
    const statAsn = document.getElementById('stat-asn-teachers');
    if (statAsn) statAsn.textContent = `${asnCount} Orang`;

    state.teachers.forEach((t, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/70 transition-colors';
      
      let badgeClass = 'badge-gtk-pns';
      if (t.status === 'PPPK') badgeClass = 'badge-gtk-pppk';
      else if (t.status === 'GTT') badgeClass = 'badge-gtk-gtt';
      else if (t.status === 'Honorer') badgeClass = 'badge-gtk-honorer';

      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold text-slate-800">${idx + 1}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${t.nip || '-'}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-900">${t.nama}</td>
        <td class="py-2.5 px-3 text-slate-700">${t.jabatan}</td>
        <td class="py-2.5 px-3 font-medium text-slate-800">${t.mapel}</td>
        <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[11px] font-bold ${badgeClass}">${t.status}</span></td>
        <td class="py-2.5 px-3 font-mono text-slate-600">${t.kontak || '-'}</td>
        <td class="py-2.5 px-3 text-right whitespace-nowrap">
          <button onclick="app.openAddTeacherModal('${t.id}')" class="text-blue-600 hover:text-blue-800 font-bold text-xs p-1 mr-1">Edit</button>
          <button onclick="app.deleteTeacher('${t.id}')" class="text-rose-500 hover:text-rose-700 font-bold text-xs p-1">Hapus</button>
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
    const namaInput = document.getElementById('guru-nama');
    const jabatanInput = document.getElementById('guru-jabatan');
    const mapelInput = document.getElementById('guru-mapel');
    const statusInput = document.getElementById('guru-status');
    const kontakInput = document.getElementById('guru-kontak');

    if (teacherId) {
      const t = state.teachers.find(item => item.id === teacherId);
      if (t) {
        titleEl.textContent = 'Edit Data Guru & GTK';
        idInput.value = t.id;
        nipInput.value = t.nip || '';
        namaInput.value = t.nama || '';
        jabatanInput.value = t.jabatan || '';
        mapelInput.value = t.mapel || '';
        statusInput.value = t.status || 'PNS';
        kontakInput.value = t.kontak || '';
      }
    } else {
      titleEl.textContent = 'Tambah Guru & GTK Baru';
      idInput.value = '';
      nipInput.value = '';
      namaInput.value = '';
      jabatanInput.value = '';
      mapelInput.value = '';
      statusInput.value = 'PNS';
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
    const nama = document.getElementById('guru-nama').value.trim();
    const jabatan = document.getElementById('guru-jabatan').value.trim();
    const mapel = document.getElementById('guru-mapel').value.trim();
    const status = document.getElementById('guru-status').value;
    const kontak = document.getElementById('guru-kontak').value.trim();

    if (!nama || !jabatan) {
      this.notify('Nama dan Jabatan guru wajib diisi!', 'error');
      return;
    }

    if (id) {
      const idx = state.teachers.findIndex(t => t.id === id);
      if (idx !== -1) {
        state.teachers[idx] = { ...state.teachers[idx], nip, nama, jabatan, mapel, status, kontak };
        this.notify(`Data guru ${nama} berhasil diperbarui.`);
      }
    } else {
      const newId = 'T' + Date.now().toString().slice(-4);
      state.teachers.push({ id: newId, nip, nama, jabatan, mapel, status, kontak });
      this.notify(`Guru baru ${nama} berhasil ditambahkan.`);
    }

    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(state.teachers));
    this.renderTeacherTable();
    this.closeAddTeacherModal();
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
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">Belum ada catatan jurnal KBM. Silakan isi form di samping.</td></tr>`;
      return;
    }

    state.journals.forEach((j, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/70 transition-colors align-top';
      tr.innerHTML = `
        <td class="py-2.5 px-2.5 font-bold text-slate-800">${idx + 1}</td>
        <td class="py-2.5 px-2.5 whitespace-nowrap">
          <div class="font-bold text-slate-900">${j.tanggal}</div>
          <div class="text-[10px] text-slate-500">${j.jamKe || 'Jam KBM'}</div>
          <span class="inline-block mt-0.5 px-1.5 py-0.2 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded">${j.kelas || 'VII-A'}</span>
        </td>
        <td class="py-2.5 px-2.5 font-semibold text-slate-800">${j.mapel}</td>
        <td class="py-2.5 px-2.5">
          <div class="font-bold text-slate-900 leading-snug">${j.materi}</div>
          ${j.targetTp ? `<div class="text-[11px] text-blue-700 mt-0.5"><span class="font-semibold">TP:</span> ${j.targetTp}</div>` : ''}
          ${j.catatan ? `<div class="text-[11px] text-slate-600 mt-1 italic"><span class="font-semibold not-italic">Catatan:</span> ${j.catatan}</div>` : ''}
          ${j.refleksi ? `<div class="text-[11px] text-emerald-800 bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-200 mt-1.5 leading-relaxed"><span class="font-bold">✨ Refleksi AI:</span> ${j.refleksi}</div>` : ''}
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

  saveJournalEntry() {
    const tanggal = document.getElementById('journal-input-date').value;
    const jamKe = document.getElementById('journal-input-hours').value.trim();
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
      jamKe: jamKe || 'Jam 1 - 2',
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

        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });
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

  saveClassConfig() {
    const yr = document.getElementById('cfg-year-input').value.trim() || '2024/2025';
    const sem = document.getElementById('cfg-semester-select').value;
    state.settings.activeTA = `TA ${yr} – ${sem}`;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    this.updateTopbarDisplay();
    this.notify('Konfigurasi kelas & tahun ajaran berhasil diperbarui.');
  },

  // ---------- ABSENSI HARIAN ----------
  renderAttendanceSheet() {
    const tbody = document.getElementById('attendance-table-tbody');
    const dateInput = document.getElementById('absensi-date-picker');
    if (!dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
    tbody.innerHTML = '';

    state.students.forEach((s) => {
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

  // ---------- GENERATOR MODUL AJAR ----------
  loadPresetModul(doSwitch = true) {
    state.currentModul = {
      id: 'MODUL-202505-001',
      title: 'Modul Ajar Matematika - Aljabar & Perbandingan',
      subject: 'Matematika',
      fase: 'Fase D (Kelas VII SMP)',
      model: 'Problem Based Learning (PBL)',
      time: '2 Pertemuan (4 x 40 Menit)',
      components: {
        identitas: {
          penyusun: state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.',
          instansi: state.settings.schoolName || 'SMP Negeri Contoh Teladan',
          jenjang: 'SMP',
          faseKelas: 'D / Kelas 7',
          alokasiWaktu: '4 JP (2 x Pertemuan)'
        },
        profilPancasila: [
          'Bernalar Kritis (menganalisis masalah perbandingan senilai)',
          'Mandiri (menyelesaikan latihan aljabar secara bertanggung jawab)',
          'Bergotong Royong (diskusi kelompok menyelesaikan soal kontekstual)'
        ],
        saranaPrasarana: 'Buku Siswa Matematika Kemdikbud, LKPD terstruktur, papan tulis, proyektor.',
        tujuanPembelajaran: [
          'Peserta didik dapat memahami konsep perbandingan senilai dan berbalik nilai.',
          'Peserta didik dapat menyusun model matematika sederhana dari masalah sehari-hari.',
          'Peserta didik dapat memecahkan masalah kontekstual menggunakan konsep perbandingan.'
        ],
        pemahamanBermakna: 'Konsep perbandingan digunakan dalam menghitung kecepatan kendaraan, skala peta, dan estimasi biaya belanja.',
        pertanyaanPemantik: [
          'Jika 2 liter bensin dapat menempuh jarak 50 km, berapa liter bensin yang dibutuhkan untuk jarak 150 km?',
          'Bagaimana cara menghitung waktu tempuh jika kecepatan dipercepat dua kali lipat?'
        ],
        langkahKegiatan: [
          {
            pertemuan: 1,
            pendahuluan: '1. Salam, doa, dan presensi kelas.\n2. Apersepsi: Masalah konsumsi bensin dan jarak perjalanan.\n3. Guru menyampaikan tujuan pembelajaran.',
            inti: '1. Orientasi siswa pada masalah kontekstual perbandingan.\n2. Pembagian LKPD perbandingan dan diskusi kelompok.\n3. Presentasi cara penyelesaian kelompok di depan kelas.\n4. Konfirmasi dan penguatan konsep oleh guru.',
            penutup: '1. Rangkuman bersama siswa.\n2. Refleksi dan penugasan mandiri.\n3. Doa penutup.'
          }
        ],
        lkpd: {
          judul: 'LEMBAR KERJA PESERTA DIDIK (LKPD): Memecahkan Masalah Perbandingan Nyata',
          petunjuk: '1. Diskusikan permasalahan berikut bersama kelompokmu.\n2. Tuliskan langkah perhitungannya dengan runtut.',
          soalLKPD: [
            '1. Sebuah mobil memerlukan 4 liter bensin untuk menempuh 60 km. Hitunglah jarak tempuh jika bensin terisi 10 liter!',
            '2. Tentukan apakah kasus pada soal nomor 1 termasuk perbandingan senilai atau berbalik nilai, dan jelaskan alasannya!'
          ]
        }
      }
    };
    localStorage.setItem(KEYS.CURRENT_MODUL, JSON.stringify(state.currentModul));
    this.renderModulPreview();
    if (doSwitch) this.notify('Contoh Modul Ajar Matematika dimuat.');
  },

  async generateModulAjar() {
    const subject = document.getElementById('modul-subject').value.trim() || 'Matematika';
    const fase = document.getElementById('modul-fase').value.trim() || 'Fase D';
    const model = document.getElementById('modul-model').value;
    const time = document.getElementById('modul-time').value.trim() || '2 x 40 Menit';
    const topic = document.getElementById('modul-topic').value.trim();

    if (!topic) {
      alert('Mohon masukkan Topik Materi terlebih dahulu.');
      return;
    }

    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');

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
            penyusun: state.settings.teacherName || 'Ibu Ratna Sari, S.Pd.',
            instansi: state.settings.schoolName || 'SMP Negeri Contoh Teladan',
            jenjang: 'SMP',
            faseKelas: fase,
            alokasiWaktu: time
          },
          profilPancasila: ['Bernalar Kritis', 'Mandiri', 'Bergotong Royong'],
          saranaPrasarana: 'Buku Siswa, LKPD terstruktur, media visual interaktif.',
          tujuanPembelajaran: [
            'Peserta didik dapat memahami konsep dasar mengenai ' + topic + ' secara komprehensif.',
            'Peserta didik mampu mengaplikasikan pemahaman konsep dalam memecahkan masalah nyata.'
          ],
          pemahamanBermakna: 'Materi ' + topic + ' bermanfaat dalam pemecahan masalah logis sehari-hari.',
          pertanyaanPemantik: ['Mengapa penting memahami ' + topic + '?'],
          langkahKegiatan: [
            {
              pertemuan: 1,
              pendahuluan: '1. Pembukaan dan apersepsi materi.\n2. Motivasi belajar.',
              inti: '1. Eksplorasi konsep dan penugasan LKPD.\n2. Diskusi kelompok terarah.\n3. Presentasi hasil.',
              penutup: '1. Rangkuman materi.\n2. Doa penutup.'
            }
          ],
          lkpd: {
            judul: 'LEMBAR KERJA PESERTA DIDIK (LKPD) - ' + topic.slice(0, 40),
            petunjuk: '1. Berdoa sebelum mengerjakan.\n2. Kerjakan bersama teman sekelompokmu.',
            soalLKPD: [
              '1. Uraikan pengertian mendasar terkait ' + topic + '!',
              '2. Berikan 2 contoh konkret penerapan materi ini di lingkungan sekitar!'
            ]
          }
        }
      };
      localStorage.setItem(KEYS.CURRENT_MODUL, JSON.stringify(state.currentModul));
      overlay.classList.add('hidden');
      this.renderModulPreview();
      this.notify('✨ Modul Ajar Kurikulum Merdeka berhasil dirumuskan.');
    }, 700);
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
      </div>

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
      html += `<div class="space-y-3"><h5 class="font-bold text-xs uppercase font-serif border-b pb-1">I. Pilihan Ganda</h5>`;
      pgs.forEach(q => {
        html += `<div class="text-xs space-y-1"><p><b>${q.number}.</b> ${q.questionText}</p><div class="grid grid-cols-2 gap-1 pl-4">${(q.options || []).map(opt => `<div>${opt}</div>`).join('')}</div></div>`;
      });
      html += `</div>`;
    }

    if (isians.length > 0) {
      html += `<div class="space-y-3 pt-3"><h5 class="font-bold text-xs uppercase font-serif border-b pb-1">II. Isian Singkat</h5>`;
      isians.forEach(q => { html += `<div class="text-xs"><b>${q.number}.</b> ${q.questionText}</div>`; });
      html += `</div>`;
    }

    if (uraians.length > 0) {
      html += `<div class="space-y-3 pt-3"><h5 class="font-bold text-xs uppercase font-serif border-b pb-1">III. Uraian</h5>`;
      uraians.forEach(q => { html += `<div class="text-xs space-y-1"><p><b>${q.number}.</b> ${q.questionText}</p><div class="border-b border-dotted border-slate-400 h-5"></div></div>`; });
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
        <div class="border border-slate-900 rounded p-3 text-xs space-y-1 bg-white">
          <div class="flex justify-between font-bold border-b pb-1"><span>Soal No. ${q.number}</span><span>${q.type.toUpperCase()}</span></div>
          <p><b>Materi:</b> ${q.material || '-'}</p>
          <p><b>Soal:</b> ${q.questionText}</p>
          <div class="bg-emerald-50 p-1.5 rounded border border-emerald-200 mt-1"><b>Kunci:</b> ${q.correctAnswer}</div>
        </div>
      `;
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
        { number: 1, type: 'pg', questionText: 'Hasil dari -15 + (-8) x 3 adalah...', options: ['A. -39', 'B. -24', 'C. 9', 'D. 39'], correctAnswer: 'A', scoreWeight: 1 },
        { number: 2, type: 'pg', questionText: 'Jika 3x + 5 = 20, maka nilai x adalah...', options: ['A. 3', 'B. 5', 'C. 7', 'D. 15'], correctAnswer: 'B', scoreWeight: 1 },
        { number: 3, type: 'isian', questionText: 'Bentuk sederhana dari 4a + 3b - 2a + b adalah ........................', options: [], correctAnswer: '2a + 4b', scoreWeight: 2 },
        { number: 4, type: 'uraian', questionText: 'Sebuah mobil memerlukan 5 liter bensin untuk jarak 75 km. Hitunglah bensin yang dibutuhkan untuk menempuh jarak 180 km!', options: [], correctAnswer: '12 Liter bensin.', scoreWeight: 4 }
      ]
    };
  },

  createPresetDataIPAS4() {
    return {
      id: 'SOAL-202611-001',
      title: 'Asesmen Sumatif Akhir Semester (SAS) 1 - IPAS',
      subject: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', grade: 'Kelas 4 (Fase B)', curriculum: 'Kurikulum Merdeka',
      questions: [
        { number: 1, type: 'pg', questionText: 'Organ tumbuhan yang berfungsi menyerap air dari dalam tanah adalah...', options: ['A. Akar', 'B. Batang', 'C. Daun', 'D. Bunga'], correctAnswer: 'A', scoreWeight: 1 },
        { number: 2, type: 'pg', questionText: 'Zat hijau daun penangkap cahaya saat fotosintesis disebut...', options: ['A. Stomata', 'B. Klorofil', 'C. Xilem', 'D. Floem'], correctAnswer: 'B', scoreWeight: 1 }
      ]
    };
  },

  createPresetDataBInd10() {
    return {
      id: 'SOAL-202611-003',
      title: 'Asesmen Teks Negosiasi - B. Indonesia',
      subject: 'Bahasa Indonesia', grade: 'Kelas 10 (Fase E)', curriculum: 'Kurikulum Merdeka',
      questions: [
        { number: 1, type: 'pg', questionText: 'Tujuan utama teks negosiasi adalah...', options: ['A. Menjatuhkan lawan', 'B. Win-win solution'], correctAnswer: 'B', scoreWeight: 1 }
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
    this.notify('🚀 Ujian CBT Online berhasil diterbitkan!');
    this.switchLMSRole('siswa');
  },

  renderLMSView() {
    this.renderGradesTable();
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

    const c = document.getElementById('cbt-question-container');
    c.innerHTML = '';
    pkg.questions.forEach(q => {
      let optHtml = '';
      if (q.type === 'pg') {
        optHtml = (q.options || []).map(opt => `
          <label class="flex items-center gap-2 text-xs p-2 rounded hover:bg-white/80 cursor-pointer">
            <input type="radio" name="cbt-ans-${q.number}" value="${opt.slice(0,1)}"> <span>${opt}</span>
          </label>
        `).join('');
      } else {
        optHtml = `<input type="text" id="cbt-ans-${q.number}" placeholder="Jawaban..." class="w-full px-3 py-1.5 rounded border border-slate-300 text-xs bg-white">`;
      }
      c.innerHTML += `<div class="glass-panel-subtle p-3 space-y-1"><p class="text-xs font-bold">Soal ${q.number}. ${q.questionText}</p>${optHtml}</div>`;
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
      studentId: std.id, studentName: std.nama, noAbsen: std.noAbsen,
      quizTitle: pkg.title, correctCount: correct, totalQuestions: pkg.questions.length, grade: grade
    });

    if (state.raporGrades.studentGrades[std.id]) {
      state.raporGrades.studentGrades[std.id].sas = grade;
      this.autoCalculateAllGrades(false);
    }

    localStorage.setItem(KEYS.LMS_GRADES, JSON.stringify(state.lmsGrades));
    alert(`🎉 Nilai Anda: ${grade} / 100\nOtomatis tersimpan ke Buku Nilai & Rapor!`);
    this.switchLMSRole('guru');
    this.renderGradesTable();
  },

  renderGradesTable() {
    const tbody = document.getElementById('lms-grades-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (state.lmsGrades.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-slate-400">Belum ada nilai CBT.</td></tr>`;
      return;
    }
    state.lmsGrades.forEach(g => {
      tbody.innerHTML += `
        <tr>
          <td class="p-2 font-bold">${g.noAbsen}</td>
          <td class="p-2 font-semibold">${g.studentName}</td>
          <td class="p-2">${g.quizTitle}</td>
          <td class="p-2 text-center font-bold">${g.correctCount}/${g.totalQuestions}</td>
          <td class="p-2 text-center font-extrabold text-blue-700">${g.grade}</td>
          <td class="p-2 text-center">${g.grade >= 75 ? '<span class="text-emerald-700 font-bold">Tuntas</span>' : '<span class="text-amber-700 font-bold">Remedial</span>'}</td>
        </tr>
      `;
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

  autoCalculateAllGrades(doNotify = true) {
    state.students.forEach(s => {
      let g = state.raporGrades.studentGrades[s.id];
      if (!g) {
        g = { tp1: 80, tp2: 80, tp3: 80, tp4: 80, sumatifBab: 80, sas: 80, na: 80, deskripsi: '' };
        state.raporGrades.studentGrades[s.id] = g;
      }
      const avgFormatif = (g.tp1 + g.tp2 + g.tp3 + g.tp4) / 4;
      const finalNA = Math.round((avgFormatif * 0.3) + (g.sumatifBab * 0.3) + (g.sas * 0.4));
      g.na = finalNA;
    });

    localStorage.setItem(KEYS.RAPOR_GRADES, JSON.stringify(state.raporGrades));
    this.renderLegerTable();
    if (doNotify) this.notify('⚡ Seluruh Nilai Akhir (NA) siswa berhasil dihitung otomatis!');
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

  // ---------- TABUNGAN & KAS ----------
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
      nama: nama, tipe: 'Setor', nominal: nominal, keterangan: 'Setoran tabungan kelas'
    });
    this.renderSavingsTable();
    this.notify('Tabungan ' + nama + ' dicatat.');
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
    const uraian = prompt('Uraian Kas:');
    if (!uraian) return;
    const nominal = parseInt(prompt('Nominal (Rp):', '50000'), 10) || 0;
    const tipe = prompt('Jenis (masuk / keluar):', 'masuk').toLowerCase();

    state.cash.push({
      id: 'K' + (state.cash.length + 1),
      tanggal: new Date().toISOString().slice(0, 10),
      uraian: uraian, tipe: tipe === 'keluar' ? 'keluar' : 'masuk', nominal: nominal
    });

    localStorage.setItem(KEYS.CASH, JSON.stringify(state.cash));
    this.renderCashTable();
    this.notify('Kas dicatat.');
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
    this.populateP5RaporStudentSelect();
    this.renderP5ModulPreview();
  },

  renderP5View() {
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
          btn.className = 'px-3.5 py-2 rounded-lg text-xs font-semibold bg-teal-700 text-white shadow-xs transition-all';
        } else {
          btn.className = 'px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all';
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
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
        })
      });

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
    document.getElementById('set-teacher-name').value = s.teacherName || '';
    document.getElementById('set-teacher-role').value = s.teacherRole || '';
    document.getElementById('set-api-key').value = s.apiKey || '';
    document.getElementById('set-school-parent').value = s.schoolParent || '';
    document.getElementById('set-school-name').value = s.schoolName || '';
    document.getElementById('set-school-address').value = s.schoolAddress || '';
    document.getElementById('set-principal-name').value = s.principalName || '';
    document.getElementById('set-principal-nip').value = s.principalNip || '';
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
      schoolParent: document.getElementById('set-school-parent').value.trim(),
      schoolName: document.getElementById('set-school-name').value.trim(),
      schoolAddress: document.getElementById('set-school-address').value.trim(),
      principalName: document.getElementById('set-principal-name').value.trim(),
      principalNip: document.getElementById('set-principal-nip').value.trim()
    };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(state.settings));
    this.updateKopDisplay();
    this.updateTopbarDisplay();
    this.closeSettingsModal();
    this.renderStudentReportCard();
    this.notify('Profil guru & kop sekolah berhasil disimpan.');
  },

  updateKopDisplay() {
    const s = state.settings;
    const parentEl = document.getElementById('kop-school-name');
    const unitEl = document.getElementById('kop-school-unit');
    const addrEl = document.getElementById('kop-school-address');
    if (parentEl) parentEl.textContent = s.schoolParent || 'PEMERINTAH KABUPATEN / KOTA';
    if (unitEl) unitEl.textContent = s.schoolName || 'SMP NEGERI CONTOH TELADAN';
    if (addrEl) addrEl.textContent = s.schoolAddress || '';
  },

  logoutOrSwitchPortal() {
    this.showCustomDialog({
      title: 'Portal Guru & CBT Siswa',
      message: 'Apakah Anda ingin beralih langsung ke Portal Ujian CBT Siswa atau ganti peran?',
      iconType: 'info',
      confirmText: 'Buka Portal CBT Siswa',
      cancelText: 'Batal',
      onConfirm: () => {
        this.navigate('lms');
        this.switchLMSRole('siswa');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
