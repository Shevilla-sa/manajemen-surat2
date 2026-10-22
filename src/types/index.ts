export type SifatSurat = 'Biasa' | 'Penting' | 'Segera' | 'Rahasia';

export type StatusDisposisi = 'Menunggu' | 'Diproses' | 'Selesai';

export type StatusSuratKeluar = 'Draft' | 'Disetujui' | 'Terkirim' | 'Diterima';

export type UserRole = 'Super Admin' | 'Pimpinan' | 'Petugas Tata Usaha' | 'Staf / Seksi';

export interface Disposisi {
  id: string;
  suratId: string;
  instruksi: string[]; // e.g. ['Tindak Lanjuti', 'Pelajari', 'Hadiri', 'Siapkan Tanggapan']
  tujuanJabatan: string;
  tujuanNama: string;
  catatan: string;
  tanggalDisposisi: string;
  batasWaktu: string;
  status: StatusDisposisi;
  pemberiNama: string;
  pemberiJabatan: string;
}

export interface SuratMasuk {
  id: string;
  noAgenda: string;
  noSurat: string;
  asalSurat: string;
  tanggalSurat: string;
  tanggalTerima: string;
  perihal: string;
  kategori: string; // e.g. 'Undangan', 'Permohonan', 'Pemberitahuan', 'Laporan', 'Kerjasama'
  sifat: SifatSurat;
  keterangan?: string;
  fileName?: string;
  fileSize?: string;
  fileDataUrl?: string; // base64 or preview url
  lampiranJumlah?: string;
  disposisiList: Disposisi[];
  createdAt: string;
}

export interface SuratKeluar {
  id: string;
  noAgenda: string;
  noSurat: string;
  tujuanSurat: string;
  alamatTujuan: string;
  tanggalSurat: string;
  tanggalKirim?: string;
  perihal: string;
  kategori: string;
  sifat: SifatSurat;
  pengonsep: string;
  penandatangan: string;
  statusPengiriman: StatusSuratKeluar;
  fileName?: string;
  fileSize?: string;
  fileDataUrl?: string;
  keterangan?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  jabatan: string;
  unitKerja: string;
  status: 'Aktif' | 'Nonaktif';
  avatarUrl?: string;
  lastLogin: string;
}

export interface InstansiConfig {
  namaInstansi: string;
  namaSubInstansi: string;
  alamat: string;
  kota: string;
  kodePos: string;
  telepon: string;
  email: string;
  website: string;
  kepalaNama: string;
  kepalaNip: string;
  kepalaJabatan: string;
  logoUrl: string;
}

export interface KategoriSurat {
  kode: string;
  nama: string;
  deskripsi: string;
}
