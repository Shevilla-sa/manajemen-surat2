import React, { useState } from 'react';
import { 
  Building2, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Check, 
  AlertTriangle,
  FileJson,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InstansiConfig } from '../types';

export const PengaturanView: React.FC = () => {
  const { 
    instansiConfig, 
    updateInstansiConfig, 
    exportDatabaseJSON, 
    importDatabaseJSON, 
    resetToDefaultData 
  } = useApp();

  const [formData, setFormData] = useState<InstansiConfig>({ ...instansiConfig });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstansiConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDatabaseJSON(content);
      if (success) {
        setImportStatus('Data berhasil dipulihkan dari berkas cadangan JSON!');
      } else {
        setImportStatus('Gagal memulihkan data: Format berkas JSON tidak sesuai.');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Save feedback banner */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan kop surat dan identitas instansi berhasil disimpan!</span>
        </div>
      )}

      {importStatus && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center gap-2">
          <FileJson className="w-4 h-4 text-blue-600" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Form Identitas & Kop Surat */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Identitas Instansi & Kop Surat Resmi
            </h3>
            <p className="text-xs text-slate-500">
              Data ini akan muncul otomatis pada Lembar Disposisi, Buku Agenda, dan Laporan Cetak
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Nama Instansi Utama (Baris 1 Kop) *</label>
              <input
                type="text"
                required
                value={formData.namaInstansi}
                onChange={(e) => setFormData({ ...formData, namaInstansi: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Nama Sub Instansi / Dinas (Baris 2 Kop) *</label>
              <input
                type="text"
                required
                value={formData.namaSubInstansi}
                onChange={(e) => setFormData({ ...formData, namaSubInstansi: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Alamat Kantor Lengkap *</label>
            <input
              type="text"
              required
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Kota / Kabupaten *</label>
              <input
                type="text"
                required
                value={formData.kota}
                onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Kode Pos</label>
              <input
                type="text"
                value={formData.kodePos}
                onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Nomor Telepon / Fax</label>
              <input
                type="text"
                value={formData.telepon}
                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Email Resmi</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Website Resmi</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-3">Pejabat Penandatangan Laporan / Disposisi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nama Kepala Dinas / Pimpinan *</label>
                <input
                  type="text"
                  required
                  value={formData.kepalaNama}
                  onChange={(e) => setFormData({ ...formData, kepalaNama: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">NIP Kepala Dinas *</label>
                <input
                  type="text"
                  required
                  value={formData.kepalaNip}
                  onChange={(e) => setFormData({ ...formData, kepalaNip: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Sebutan Jabatan Resmi *</label>
                <input
                  type="text"
                  required
                  value={formData.kepalaJabatan}
                  onChange={(e) => setFormData({ ...formData, kepalaJabatan: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-2xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Identitas</span>
            </button>
          </div>
        </form>
      </div>

      {/* Cadangan & Pemulihan Data */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Cadangan & Pemulihan Basis Data (Backup & Restore)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Unduh seluruh data arsip surat masuk, surat keluar, disposisi, dan pengguna dalam format file JSON agar data Anda tetap aman.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-800 text-xs block mb-1">Ekspor Cadangan (Backup Data)</span>
              <p className="text-[11px] text-slate-500 mb-3">
                Unduh file cadangan .json lengkap berisi seluruh catatan persuratan.
              </p>
            </div>
            <button
              onClick={exportDatabaseJSON}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File Cadangan JSON</span>
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-800 text-xs block mb-1">Pulihkan Data (Restore Data)</span>
              <p className="text-[11px] text-slate-500 mb-3">
                Unggah file cadangan JSON yang sebelumnya pernah diunduh.
              </p>
            </div>
            <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-slate-500" />
              <span>Pilih Berkas JSON Restore</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Danger zone: Reset Demo */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-rose-700 block">Reset Data ke Contoh Standar</span>
            <span className="text-[11px] text-slate-500">Kembalikan seluruh data surat dan pengguna ke dataset awal</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengatur ulang data ke kondisi awal? Seluruh perubahan lokal akan terhapus.')) {
                resetToDefaultData();
                setFormData(instansiConfig);
                alert('Data berhasil di-reset ke kondisi awal.');
              }
            }}
            className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
