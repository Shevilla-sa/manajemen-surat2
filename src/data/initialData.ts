import { SuratMasuk, SuratKeluar, User, InstansiConfig, KategoriSurat } from '../types';

export const INITIAL_INSTANSI: InstansiConfig = {
  namaInstansi: 'PEMERINTAH KOTA ADMINISTRASI NUSANTARA',
  namaSubInstansi: 'DINAS KOMUNIKASI, INFORMATIKA DAN TATA KELOLA PERSURATAN',
  alamat: 'Jl. Pemuda No. 45, Kompleks Perkantoran Terpadu Blok A',
  kota: 'Kota Nusantara',
  kodePos: '60124',
  telepon: '(021) 7890-1234 / Fax: (021) 7890-5678',
  email: 'tatausaha@diskominfo.go.id',
  website: 'www.diskominfo.kotanusantara.go.id',
  kepalaNama: 'Dr. Hendra Wijaya, M.Si.',
  kepalaNip: '19760815 200212 1 003',
  kepalaJabatan: 'Kepala Dinas Komunikasi & Informatika',
  logoUrl: '/src/assets/images/instansi_emblem_1792633907279.jpg'
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Dr. Hendra Wijaya, M.Si.',
    email: 'hendra.wijaya@instansi.go.id',
    role: 'Pimpinan',
    jabatan: 'Kepala Dinas',
    unitKerja: 'Pimpinan Eksekutif',
    status: 'Aktif',
    avatarUrl: '/src/assets/images/avatar_pimpinan_1792633909448.jpg',
    lastLogin: '2026-10-21 08:30'
  },
  {
    id: 'usr-2',
    name: 'Ratna Sari Dewi, S.AP.',
    email: 'ratna.sari@instansi.go.id',
    role: 'Petugas Tata Usaha',
    jabatan: 'Arsiparis & Kepala Tata Usaha',
    unitKerja: 'Sub Bagian Umum & Kepegawaian',
    status: 'Aktif',
    avatarUrl: '/src/assets/images/avatar_arsiparis_1792633909021.jpg',
    lastLogin: '2026-10-21 09:15'
  },
  {
    id: 'usr-3',
    name: 'Ahmad Faisal, S.Kom.',
    email: 'admin.persuratan@instansi.go.id',
    role: 'Super Admin',
    jabatan: 'Administrator Sistem IT & Arsip',
    unitKerja: 'Pusat Data & Sistem Informasi',
    status: 'Aktif',
    lastLogin: '2026-10-21 07:45'
  },
  {
    id: 'usr-4',
    name: 'Siti Nurhaliza, M.Pd.',
    email: 'siti.nurhaliza@instansi.go.id',
    role: 'Staf / Seksi',
    jabatan: 'Kepala Seksi Tata Kelola Layanan',
    unitKerja: 'Bidang Layanan E-Government',
    status: 'Aktif',
    lastLogin: '2026-10-20 14:20'
  },
  {
    id: 'usr-5',
    name: 'Budi Santoso, S.T.',
    email: 'budi.santoso@instansi.go.id',
    role: 'Staf / Seksi',
    jabatan: 'Kepala Seksi Infrastruktur & Jaringan',
    unitKerja: 'Bidang Teknologi Informasi',
    status: 'Aktif',
    lastLogin: '2026-10-19 16:05'
  }
];

export const INITIAL_KATEGORI: KategoriSurat[] = [
  { kode: '005', nama: 'Undangan Resmi', deskripsi: 'Surat pertemuan, rapat koordinasi, atau workshop kedinasan' },
  { kode: '010', nama: 'Pemberitahuan & Edaran', deskripsi: 'Penyampaian informasi kebijakan atau pengumuman kedinasan' },
  { kode: '025', nama: 'Permohonan / Usulan', deskripsi: 'Permohonan narasumber, fasilitas, izin, atau usulan kegiatan' },
  { kode: '040', nama: 'Keputusan & Rekomendasi', deskripsi: 'Surat keputusan pimpinan, penetapan panitia, atau rekomendasi teknis' },
  { kode: '050', nama: 'Kerjasama & Kemitraan', deskripsi: 'Nota kesepahaman (MoU), perjanjian kerjasama bilateral' },
  { kode: '080', nama: 'Laporan Berkala', deskripsi: 'Laporan pertanggungjawaban kegiatan, laporan kinerja bulanan' }
];

export const INITIAL_SURAT_MASUK: SuratMasuk[] = [
  {
    id: 'sm-001',
    noAgenda: 'AGD/M/2026/001',
    noSurat: '005/KEMENKOMINFO/SEKR/X/2026',
    asalSurat: 'Kementerian Komunikasi dan Informatika RI',
    tanggalSurat: '2026-10-14',
    tanggalTerima: '2026-10-16',
    perihal: 'Undangan Rapat Koordinasi Nasional Transformasi Digital dan Keamanan Siber Sektor Publik 2026',
    kategori: 'Undangan Resmi',
    sifat: 'Penting',
    keterangan: 'Dilaksanakan di Grand Sahid Hotel Jakarta / Hybrid via Zoom',
    fileName: 'Undangan_Rakornas_Kominfo_2026.pdf',
    fileSize: '1.4 MB',
    lampiranJumlah: '1 Berkas Jadwal Acara',
    disposisiList: [
      {
        id: 'disp-001',
        suratId: 'sm-001',
        instruksi: ['Hadiri dan wakili', 'Pelajari materi rakor', 'Susun laporan hasil setelah acara'],
        tujuanJabatan: 'Kepala Seksi Tata Kelola Layanan',
        tujuanNama: 'Siti Nurhaliza, M.Pd.',
        catatan: 'Tolong koordinasikan delegasi 2 orang personel untuk hadir secara luring di Jakarta, siapkan bahan paparan daerah.',
        tanggalDisposisi: '2026-10-16',
        batasWaktu: '2026-10-24',
        status: 'Diproses',
        pemberiNama: 'Dr. Hendra Wijaya, M.Si.',
        pemberiJabatan: 'Kepala Dinas'
      }
    ],
    createdAt: '2026-10-16T09:30:00Z'
  },
  {
    id: 'sm-002',
    noAgenda: 'AGD/M/2026/002',
    noSurat: '120/BKN-REG.IV/INST/X/2026',
    asalSurat: 'Badan Kepegawaian Negara (BKN) Regional',
    tanggalSurat: '2026-10-12',
    tanggalTerima: '2026-10-15',
    perihal: 'Pemberitahuan Verifikasi Berkas Uji Kompetensi Kenaikan Jabatan Fungsional Arsiparis & Pranata Komputer',
    kategori: 'Pemberitahuan & Edaran',
    sifat: 'Segera',
    keterangan: 'Batas akhir unggah portofolio ke portal SIASN tanggal 30 Oktober 2026',
    fileName: 'Edaran_BKN_Uji_Kompetensi_2026.pdf',
    fileSize: '820 KB',
    lampiranJumlah: '1 Lembar Format Portofolio',
    disposisiList: [
      {
        id: 'disp-002',
        suratId: 'sm-002',
        instruksi: ['Tindak Lanjuti Segera', 'Umumkan kepada seluruh staf yang memenuhi syarat'],
        tujuanJabatan: 'Arsiparis & Kepala Tata Usaha',
        tujuanNama: 'Ratna Sari Dewi, S.AP.',
        catatan: 'Data staf yang berhak ikut uji kompetensi dan bantu proses upload portofolio.',
        tanggalDisposisi: '2026-10-15',
        batasWaktu: '2026-10-22',
        status: 'Selesai',
        pemberiNama: 'Dr. Hendra Wijaya, M.Si.',
        pemberiJabatan: 'Kepala Dinas'
      }
    ],
    createdAt: '2026-10-15T11:15:00Z'
  },
  {
    id: 'sm-003',
    noAgenda: 'AGD/M/2026/003',
    noSurat: '420/UNIV-IND/WR-IV/X/2026',
    asalSurat: 'Universitas Indonesia - Fakultas Ilmu Komputer',
    tanggalSurat: '2026-10-17',
    tanggalTerima: '2026-10-19',
    perihal: 'Permohonan Kerjasama Magang MBKM dan Riset Bersama Implementasi AI Tata Kelola Arsip',
    kategori: 'Permohonan / Usulan',
    sifat: 'Biasa',
    keterangan: 'Program magang semester genap tahun akademik 2026/2027 untuk 6 orang mahasiswa.',
    fileName: 'Proposal_Kerjasama_Magang_UI_2026.pdf',
    fileSize: '2.1 MB',
    lampiranJumlah: '1 Bundel Proposal Kerjasama',
    disposisiList: [],
    createdAt: '2026-10-19T08:45:00Z'
  },
  {
    id: 'sm-004',
    noAgenda: 'AGD/M/2026/004',
    noSurat: 'RAHASIA/09/BSSN-OPS/X/2026',
    asalSurat: 'Badan Siber dan Sandi Negara (BSSN)',
    tanggalSurat: '2026-10-18',
    tanggalTerima: '2026-10-20',
    perihal: 'Laporan Hasil Audit Kerentanan Sistem Informasi & Rekomendasi Patch Keamanan Jaringan',
    kategori: 'Keputusan & Rekomendasi',
    sifat: 'Rahasia',
    keterangan: 'Dokumen bersifat tertutup, hanya boleh dibaca pejabat berwenang dan tim teknis inti',
    fileName: 'Audit_Keamanan_BSSN_Oct2026_Restricted.pdf',
    fileSize: '3.4 MB',
    lampiranJumlah: '3 Berkas Teknis Enkripsi',
    disposisiList: [
      {
        id: 'disp-003',
        suratId: 'sm-004',
        instruksi: ['Tindak Lanjuti dengan Pengamanan Ketat', 'Segera lakukan patching server', 'Laporkan progres per 3 hari'],
        tujuanJabatan: 'Kepala Seksi Infrastruktur & Jaringan',
        tujuanNama: 'Budi Santoso, S.T.',
        catatan: 'Prioritaskan firewall update dan tutup celah open port sebelum akhir pekan ini.',
        tanggalDisposisi: '2026-10-20',
        batasWaktu: '2026-10-25',
        status: 'Diproses',
        pemberiNama: 'Dr. Hendra Wijaya, M.Si.',
        pemberiJabatan: 'Kepala Dinas'
      }
    ],
    createdAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'sm-005',
    noAgenda: 'AGD/M/2026/005',
    noSurat: '090/INSP-KOTA/WAS/X/2026',
    asalSurat: 'Inspektorat Kota Nusantara',
    tanggalSurat: '2026-10-19',
    tanggalTerima: '2026-10-21',
    perihal: 'Jadwal Pengawasan Reguler dan Uji Petik Tata Kelola Administrasi Persuratan Triwulan III',
    kategori: 'Pemberitahuan & Edaran',
    sifat: 'Penting',
    keterangan: 'Tim pemeriksa akan hadir pada tanggal 28-30 Oktober 2026',
    fileName: 'Jadwal_Audit_Inspektorat_Q3.pdf',
    fileSize: '512 KB',
    lampiranJumlah: '1 Lembar Daftar Dokumen Uji Petik',
    disposisiList: [],
    createdAt: '2026-10-21T09:00:00Z'
  }
];

export const INITIAL_SURAT_KELUAR: SuratKeluar[] = [
  {
    id: 'sk-001',
    noAgenda: 'AGD/K/2026/001',
    noSurat: '005/DISPEL-SEKR/X/2026',
    tujuanSurat: 'Seluruh Kepala Organisasi Perangkat Daerah (OPD) Kota Nusantara',
    alamatTujuan: 'Kompleks Balaikota Pemerintahan Kota Nusantara',
    tanggalSurat: '2026-10-15',
    tanggalKirim: '2026-10-16',
    perihal: 'Undangan Sosialisasi Penerapan Tanda Tangan Elektronik (TTE) dan E-Persuratan Terpadu',
    kategori: 'Undangan Resmi',
    sifat: 'Penting',
    pengonsep: 'Ratna Sari Dewi, S.AP.',
    penandatangan: 'Dr. Hendra Wijaya, M.Si.',
    statusPengiriman: 'Terkirim',
    fileName: 'Surat_Undangan_Sosialisasi_TTE.pdf',
    fileSize: '950 KB',
    keterangan: 'Disampaikan via kurir dinas & portal e-office',
    createdAt: '2026-10-15T14:00:00Z'
  },
  {
    id: 'sk-002',
    noAgenda: 'AGD/K/2026/002',
    noSurat: '025/DISPEL-TI/X/2026',
    tujuanSurat: 'Dekan Fakultas Ilmu Komputer, Universitas Indonesia',
    alamatTujuan: 'Kampus UI Depok, Jawa Barat 16424',
    tanggalSurat: '2026-10-20',
    tanggalKirim: '2026-10-21',
    perihal: 'Konfirmasi Penerimaan Program Kerjasama Magang dan Riset AI Persuratan Kampus Merdeka',
    kategori: 'Permohonan / Usulan',
    sifat: 'Biasa',
    pengonsep: 'Siti Nurhaliza, M.Pd.',
    penandatangan: 'Dr. Hendra Wijaya, M.Si.',
    statusPengiriman: 'Terkirim',
    fileName: 'Konfirmasi_Penerimaan_Magang_UI.pdf',
    fileSize: '1.1 MB',
    keterangan: 'Telah dikirimkan melalui Pos Kilat Khusus dan email resmi',
    createdAt: '2026-10-20T16:20:00Z'
  },
  {
    id: 'sk-003',
    noAgenda: 'AGD/K/2026/003',
    noSurat: '010/DISPEL-UM/X/2026',
    tujuanSurat: 'Sekretariat Daerah Bagian Perlengkapan',
    alamatTujuan: 'Gedung Graha Praja Lt. 3, Kota Nusantara',
    tanggalSurat: '2026-10-21',
    perihal: 'Permohonan Pengadaan Alat Scanner High-Speed Dokumen Arsip Digital Tahun Anggaran 2027',
    kategori: 'Permohonan / Usulan',
    sifat: 'Segera',
    pengonsep: 'Ratna Sari Dewi, S.AP.',
    penandatangan: 'Dr. Hendra Wijaya, M.Si.',
    statusPengiriman: 'Disetujui',
    fileName: 'Usulan_Scanner_Arsip_2027.pdf',
    fileSize: '760 KB',
    keterangan: 'Menunggu tanda tangan basah & cap stempel untuk dikirim sore ini',
    createdAt: '2026-10-21T10:15:00Z'
  },
  {
    id: 'sk-004',
    noAgenda: 'AGD/K/2026/004',
    noSurat: '080/DISPEL-LAP/X/2026',
    tujuanSurat: 'Walikota Nusantara c.q. Asisten Administrasi Umum',
    alamatTujuan: 'Rumah Dinas Walikota Nusantara',
    tanggalSurat: '2026-10-21',
    perihal: 'Laporan Capaian Kinerja Tata Kelola Persuratan dan Kearsipan Triwulan III Tahun 2026',
    kategori: 'Laporan Berkala',
    sifat: 'Biasa',
    pengonsep: 'Ahmad Faisal, S.Kom.',
    penandatangan: 'Dr. Hendra Wijaya, M.Si.',
    statusPengiriman: 'Draft',
    fileName: 'Draft_Laporan_Kinerja_Q3.pdf',
    fileSize: '2.8 MB',
    keterangan: 'Sedang tahap review bagian perencanaan',
    createdAt: '2026-10-21T11:40:00Z'
  }
];
