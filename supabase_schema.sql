-- ==============================================================================
-- GURUSUITE AI - SKEMA DATABASE RESMI SUPABASE CLOUD (POSTGRESQL)
-- Versi       : v4.0.0 Production Clean Slate
-- Tanggal     : 2026-11-23
-- Arsitek     : ZettBOT by Zettbos
-- Petunjuk    : Salin seluruh kode SQL ini dan Paste ke SQL Editor Supabase -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PROFIL & PENGATURAN SEKOLAH (school_settings)
CREATE TABLE IF NOT EXISTS public.school_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  school_name TEXT DEFAULT 'PEMERINTAH KABUPATEN / KOTA',
  school_unit TEXT DEFAULT 'SATUAN PENDIDIKAN RESMI',
  school_address TEXT DEFAULT 'Jl. Pendidikan No. 1 • Telp: (021) 1234567',
  school_stage TEXT DEFAULT 'SMP',
  teacher_name TEXT DEFAULT 'Nama Guru Pengampu, S.Pd.',
  teacher_nip TEXT DEFAULT '19880101 201101 1 001',
  teacher_role TEXT DEFAULT 'Wali Kelas & Guru Mata Pelajaran',
  headmaster_name TEXT DEFAULT 'Nama Kepala Sekolah, M.Pd.',
  headmaster_nip TEXT DEFAULT '19750101 200003 1 001',
  gemini_api_key TEXT DEFAULT '',
  ai_model TEXT DEFAULT 'gemini-1.5-flash',
  show_stamp BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABEL DEWAN GURU & GTK (teachers)
CREATE TABLE IF NOT EXISTS public.teachers (
  id TEXT PRIMARY KEY,
  nip TEXT UNIQUE,
  nuptk TEXT,
  nama TEXT NOT NULL,
  password TEXT NOT NULL DEFAULT '123456',
  jabatan TEXT,
  mapel TEXT,
  status TEXT DEFAULT 'PNS',
  golongan TEXT DEFAULT 'Penata / III/c',
  pendidikan TEXT,
  sertifikasi BOOLEAN DEFAULT false,
  beban_jp INTEGER DEFAULT 24,
  rombel TEXT,
  tugas_tambahan TEXT,
  kontak TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TABEL KELAS & ROMBEL (classes)
CREATE TABLE IF NOT EXISTS public.classes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  stage TEXT DEFAULT 'SMP',
  grade TEXT DEFAULT 'VII',
  academic_year TEXT DEFAULT '2024/2025',
  semester TEXT DEFAULT 'Genap',
  wali_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TABEL PESERTA DIDIK (students)
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  class_id TEXT DEFAULT 'CLS-01',
  no_absen INTEGER,
  nisn TEXT UNIQUE,
  nis TEXT,
  nama TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('L', 'P')),
  tempat_lahir TEXT,
  tanggal_lahir DATE,
  pin TEXT DEFAULT '123456',
  agama TEXT DEFAULT 'Islam',
  wali_nama TEXT,
  wali_hp TEXT,
  alamat TEXT,
  gaya_belajar TEXT DEFAULT 'Visual',
  status_pip BOOLEAN DEFAULT false,
  catatan_khusus TEXT,
  tabungan NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TABEL PRESENSI / ABSENSI HARIAN (attendance)
CREATE TABLE IF NOT EXISTS public.attendance (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  class_id TEXT NOT NULL,
  records JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_attendance_date_class UNIQUE (date, class_id)
);

-- 7. TABEL JURNAL MENGAJAR KBM (journals)
CREATE TABLE IF NOT EXISTS public.journals (
  id TEXT PRIMARY KEY,
  tanggal DATE NOT NULL,
  kelas TEXT NOT NULL,
  mapel TEXT NOT NULL,
  jam_ke TEXT,
  materi TEXT,
  refleksi TEXT,
  status TEXT DEFAULT 'Tuntas Terlaksana',
  supervisi_verified BOOLEAN DEFAULT false,
  supervisi_date DATE,
  supervisi_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. TABEL BANK SOAL & PERANGKAT ASESMEN (question_packages)
CREATE TABLE IF NOT EXISTS public.question_packages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  curriculum TEXT DEFAULT 'Kurikulum Merdeka',
  duration INTEGER DEFAULT 90,
  option_count INTEGER DEFAULT 4,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. TABEL HASIL UJIAN SISWA CBT (cbt_grades)
CREATE TABLE IF NOT EXISTS public.cbt_grades (
  id BIGSERIAL PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  no_absen INTEGER,
  quiz_id TEXT,
  quiz_title TEXT NOT NULL,
  correct_count INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  grade NUMERIC NOT NULL,
  violations INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. TABEL LEGER NILAI & RAPOR MERDEKA (rapor_grades)
CREATE TABLE IF NOT EXISTS public.rapor_grades (
  id BIGSERIAL PRIMARY KEY,
  student_id TEXT NOT NULL,
  class_id TEXT,
  mapel TEXT NOT NULL,
  formatif NUMERIC DEFAULT 0,
  sumatif_bab NUMERIC DEFAULT 0,
  sas NUMERIC DEFAULT 0,
  na NUMERIC DEFAULT 0,
  deskripsi_capaian TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. TABEL TRANSAKSI BUKU TABUNGAN SISWA (savings_transactions)
CREATE TABLE IF NOT EXISTS public.savings_transactions (
  id BIGSERIAL PRIMARY KEY,
  student_id TEXT NOT NULL,
  type TEXT CHECK (type IN ('setor', 'tarik')),
  amount NUMERIC NOT NULL,
  description TEXT,
  balance_after NUMERIC NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. TABEL PEMBUKUAN KAS KELAS (cash_transactions)
CREATE TABLE IF NOT EXISTS public.cash_transactions (
  id BIGSERIAL PRIMARY KEY,
  class_id TEXT DEFAULT 'CLS-01',
  date DATE NOT NULL,
  category TEXT,
  type TEXT CHECK (type IN ('masuk', 'keluar')),
  amount NUMERIC NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- KEBIJAKAN KEAMANAN AKSES (ROW LEVEL SECURITY / RLS)
-- Memungkinkan aplikasi Single Page Application (Anon Key) melakukan operasi data
-- ==============================================================================

ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rapor_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_transactions ENABLE ROW LEVEL SECURITY;

-- Buat Kebijakan Akses Penuh untuk Anonim Key Aplikasi
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow anon all on %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Allow anon all on %I" ON public.%I FOR ALL TO anon USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;

-- Data inisialisasi awal profil sekolah
INSERT INTO public.school_settings (id, school_unit, school_name)
VALUES ('primary', 'SATUAN PENDIDIKAN RESMI', 'PEMERINTAH DAERAH')
ON CONFLICT (id) DO NOTHING;
