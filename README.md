# Sistem Manajemen Surat Masuk & Surat Keluar (E-Persuratan Dinas)

Aplikasi tata kelola persuratan dinas dan kearsipan elektronik yang lengkap, modern, dan siap pakai. Dilengkapi fitur pencatatan surat masuk, penerbitan registrasi surat keluar, lembar disposisi resmi standar instansi pemerintah/swasta, buku agenda, rekapitulasi laporan, dan manajemen pengguna berbasis peran.

---

## 🌟 Fitur Utama

1. **Dashboard Eksekutif**:
   - Statistik ringkasan (Total Surat Masuk, Surat Keluar, Disposisi Aktif, Surat Bulan Ini).
   - Grafik batang visualisasi volume surat bulanan.
   - Distribusi surat berdasarkan sifat kerahasiaan (Biasa, Penting, Segera, Rahasia).
   - Aliran aktivitas surat masuk & keluar terbaru dengan akses kilat.

2. **Manajemen Surat Masuk**:
   - Penomoran agenda otomatis (`AGD/M/YYYY/XXX`).
   - Pencatatan no surat, instansi pengirim, tanggal surat, tanggal terima, perihal, kategori, dan sifat.
   - Unggah dan pratinjau berkas lampiran digital (PDF / scan dokumen).
   - **Lembar Disposisi Digital**:
     - Penugasan disposisi ke pejabat / kepala seksi / staf.
     - Checklist instruksi standar kedinasan (*Tindak lanjuti segera, Tanggapi tertulis, Pelajari/teliti, Hadiri/wakili*, dll.).
     - Pelacakan status (*Menunggu, Diproses, Selesai*).
     - **Cetak Lembar Disposisi Resmi**: Format standar kedinasan lengkap dengan Kop Surat instansi dan kolom tanda tangan pimpinan.

3. **Manajemen Surat Keluar**:
   - Penomoran agenda keluar (`AGD/K/YYYY/XXX`).
   - **Generator Penomoran Otomatis**: Format resmi instansi (contoh: `005/DISPEL-SEKR/X/2026`).
   - Pencatatan tujuan instansi, alamat tujuan, pengonsep, dan penandatangan.
   - Alur tahapan surat keluar (*Draft &rarr; Disetujui &rarr; Terkirim &rarr; Diterima*).
   - **Cetak Lembar Ekspedisi Pengiriman**: Tanda terima pengiriman surat via kurir/pos.

4. **Buku Agenda & Rekapitulasi Laporan**:
   - Filter fleksibel: Rentang tanggal (Harian, Bulanan, Triwulan, Tahunan) dan Sifat Surat.
   - Buku Agenda Surat Masuk & Buku Agenda Surat Keluar siap cetak.
   - **Ekspor Data ke CSV / Excel**: Dilengkapi UTF-8 BOM agar rapi saat dibuka langsung di Microsoft Excel.
   - **Cetak Laporan Resmi**: Pratinjau cetak bersih (*print-ready*) dengan Kop Surat resmi dan tanda tangan Kepala Dinas.

5. **Manajemen Pengguna (User Management)**:
   - Pengelolaan akun dengan 4 tingkat peran (Role):
     - **Super Admin**: Akses penuh ke seluruh modul, konfigurasi instansi, dan manajemen user.
     - **Pimpinan**: Mengeluarkan arahan lembar disposisi dan menyetujui surat keluar.
     - **Petugas Tata Usaha**: Mencatat agenda surat masuk & registrasi surat keluar.
     - **Staf / Seksi**: Menindaklanjuti tugas disposisi sesuai tupoksi.
   - Fitur **Beralih Akun (Instant Switch User)** untuk simulasi multi-user secara langsung.

6. **Pengaturan Instansi & Keamanan Data**:
   - Pengaturan Kop Surat (Nama instansi, alamat, kontak, logo, nama dan NIP Kepala Dinas).
   - **Backup & Restore**: Ekspor dan impor basis data dalam format JSON.
   - Opsi Reset ke data demo awal kapan saja.

---

## 🚀 Panduan Simpan ke GitHub & Hosting di Vercel

### 1. Simpan ke Repositori GitHub
Pastikan Anda telah memiliki akun di [GitHub](https://github.com):
```bash
# 1. Hubungkan ke repositori GitHub Anda
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_PERSURATAN.git

# 2. Push kode ke branch utama
git branch -M main
git push -u origin main
```

### 2. Hosting Menggunakan Vercel.app
1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New..."** lalu pilih **"Project"**.
3. Pilih repositori GitHub Anda yang baru saja di-push.
4. Vercel akan otomatis mengenali pengaturan:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Berkas routing `vercel.json` sudah disediakan dalam proyek ini untuk memastikan routing SPA berjalan lancar tanpa error 404.
6. Klik **"Deploy"** &mdash; Website Anda akan langsung aktif dalam hitungan detik di `https://nama-proyek-anda.vercel.app`!
