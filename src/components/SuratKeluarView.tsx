import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Send, 
  Printer, 
  Trash2, 
  Edit3, 
  Eye, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  X,
  Upload,
  Sparkles,
  Truck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SuratKeluar, SifatSurat, StatusSuratKeluar } from '../types';

interface SuratKeluarViewProps {
  selectedSuratId?: string | null;
  openCreateModalDirectly?: boolean;
  onCloseCreateModalDirectly?: () => void;
}

export const SuratKeluarView: React.FC<SuratKeluarViewProps> = ({
  selectedSuratId,
  openCreateModalDirectly,
  onCloseCreateModalDirectly
}) => {
  const { 
    suratKeluarList, 
    addSuratKeluar, 
    updateSuratKeluar, 
    deleteSuratKeluar,
    updateSuratKeluarStatus,
    getNextAgendaKeluar,
    generateNoSuratKeluar,
    kategoriList,
    users,
    instansiConfig
  } = useApp();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSifat, setFilterSifat] = useState<string>('all');

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(!!openCreateModalDirectly);
  const [editingSurat, setEditingSurat] = useState<SuratKeluar | null>(null);
  const [viewingSurat, setViewingSurat] = useState<SuratKeluar | null>(() => {
    if (selectedSuratId) {
      return suratKeluarList.find(s => s.id === selectedSuratId) || null;
    }
    return null;
  });
  const [printEkspedisiSurat, setPrintEkspedisiSurat] = useState<SuratKeluar | null>(null);

  // Form State
  const [formAgenda, setFormAgenda] = useState('');
  const [formNoSurat, setFormNoSurat] = useState('');
  const [formTujuanSurat, setFormTujuanSurat] = useState('');
  const [formAlamatTujuan, setFormAlamatTujuan] = useState('');
  const [formTanggalSurat, setFormTanggalSurat] = useState('');
  const [formTanggalKirim, setFormTanggalKirim] = useState('');
  const [formPerihal, setFormPerihal] = useState('');
  const [formKategori, setFormKategori] = useState(kategoriList[0]?.nama || 'Undangan Resmi');
  const [formSifat, setFormSifat] = useState<SifatSurat>('Biasa');
  const [formPengonsep, setFormPengonsep] = useState('');
  const [formPenandatangan, setFormPenandatangan] = useState(instansiConfig.kepalaNama);
  const [formStatus, setFormStatus] = useState<StatusSuratKeluar>('Draft');
  const [formFileName, setFormFileName] = useState('');
  const [formFileSize, setFormFileSize] = useState('');
  const [formKeterangan, setFormKeterangan] = useState('');

  const handleOpenCreate = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormAgenda(getNextAgendaKeluar());
    setFormNoSurat(generateNoSuratKeluar('005', 'DISPEL-SEKR'));
    setFormTujuanSurat('');
    setFormAlamatTujuan('');
    setFormTanggalSurat(today);
    setFormTanggalKirim('');
    setFormPerihal('');
    setFormKategori(kategoriList[0]?.nama || 'Undangan Resmi');
    setFormSifat('Biasa');
    setFormPengonsep(users.find(u => u.role === 'Petugas Tata Usaha')?.name || 'Petugas Tata Usaha');
    setFormPenandatangan(instansiConfig.kepalaNama);
    setFormStatus('Draft');
    setFormFileName('');
    setFormFileSize('');
    setFormKeterangan('');
    setEditingSurat(null);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (surat: SuratKeluar) => {
    setEditingSurat(surat);
    setFormAgenda(surat.noAgenda);
    setFormNoSurat(surat.noSurat);
    setFormTujuanSurat(surat.tujuanSurat);
    setFormAlamatTujuan(surat.alamatTujuan);
    setFormTanggalSurat(surat.tanggalSurat);
    setFormTanggalKirim(surat.tanggalKirim || '');
    setFormPerihal(surat.perihal);
    setFormKategori(surat.kategori);
    setFormSifat(surat.sifat);
    setFormPengonsep(surat.pengonsep);
    setFormPenandatangan(surat.penandatangan);
    setFormStatus(surat.statusPengiriman);
    setFormFileName(surat.fileName || '');
    setFormFileSize(surat.fileSize || '');
    setFormKeterangan(surat.keterangan || '');
    setIsCreateOpen(true);
  };

  const handleGenerateNoSurat = () => {
    const foundKategori = kategoriList.find(k => k.nama === formKategori);
    const kode = foundKategori ? foundKategori.kode : '005';
    setFormNoSurat(generateNoSuratKeluar(kode, 'DISPEL-SEKR'));
  };

  const handleSaveSurat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNoSurat || !formTujuanSurat || !formPerihal) return;

    if (editingSurat) {
      updateSuratKeluar(editingSurat.id, {
        noSurat: formNoSurat,
        tujuanSurat: formTujuanSurat,
        alamatTujuan: formAlamatTujuan,
        tanggalSurat: formTanggalSurat,
        tanggalKirim: formTanggalKirim || undefined,
        perihal: formPerihal,
        kategori: formKategori,
        sifat: formSifat,
        pengonsep: formPengonsep,
        penandatangan: formPenandatangan,
        statusPengiriman: formStatus,
        fileName: formFileName || editingSurat.fileName,
        fileSize: formFileSize || editingSurat.fileSize,
        keterangan: formKeterangan
      });
      if (viewingSurat && viewingSurat.id === editingSurat.id) {
        setViewingSurat(prev => prev ? {
          ...prev,
          noSurat: formNoSurat,
          tujuanSurat: formTujuanSurat,
          alamatTujuan: formAlamatTujuan,
          tanggalSurat: formTanggalSurat,
          tanggalKirim: formTanggalKirim,
          perihal: formPerihal,
          kategori: formKategori,
          sifat: formSifat,
          pengonsep: formPengonsep,
          penandatangan: formPenandatangan,
          statusPengiriman: formStatus
        } : null);
      }
    } else {
      addSuratKeluar({
        noAgenda: formAgenda || getNextAgendaKeluar(),
        noSurat: formNoSurat,
        tujuanSurat: formTujuanSurat,
        alamatTujuan: formAlamatTujuan,
        tanggalSurat: formTanggalSurat,
        tanggalKirim: formTanggalKirim || undefined,
        perihal: formPerihal,
        kategori: formKategori,
        sifat: formSifat,
        pengonsep: formPengonsep,
        penandatangan: formPenandatangan,
        statusPengiriman: formStatus,
        fileName: formFileName || 'Draft_Surat_Keluar_Resmi.pdf',
        fileSize: formFileSize || '980 KB',
        keterangan: formKeterangan
      });
    }

    setIsCreateOpen(false);
    if (onCloseCreateModalDirectly) onCloseCreateModalDirectly();
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormFileName(file.name);
      setFormFileSize(`${(file.size / 1024 / 1024).toFixed(2)} MB`);
    }
  };

  // Filtered List
  const filteredSurat = useMemo(() => {
    return suratKeluarList.filter(surat => {
      const search = searchTerm.toLowerCase();
      const matchSearch = !searchTerm || (
        surat.noAgenda.toLowerCase().includes(search) ||
        surat.noSurat.toLowerCase().includes(search) ||
        surat.tujuanSurat.toLowerCase().includes(search) ||
        surat.perihal.toLowerCase().includes(search)
      );

      const matchStatus = filterStatus === 'all' || surat.statusPengiriman === filterStatus;
      const matchSifat = filterSifat === 'all' || surat.sifat === filterSifat;

      return matchSearch && matchStatus && matchSifat;
    });
  }, [suratKeluarList, searchTerm, filterStatus, filterSifat]);

  return (
    <div className="space-y-4">
      {/* Action & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari no surat, tujuan, perihal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Registrasi Surat Keluar</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Filter:</span>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none text-xs"
          >
            <option value="all">Semua Status Pengiriman</option>
            <option value="Draft">Draft</option>
            <option value="Disetujui">Disetujui (Signed)</option>
            <option value="Terkirim">Terkirim</option>
            <option value="Diterima">Diterima</option>
          </select>

          <select
            value={filterSifat}
            onChange={(e) => setFilterSifat(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none text-xs"
          >
            <option value="all">Semua Sifat</option>
            <option value="Biasa">Biasa</option>
            <option value="Penting">Penting</option>
            <option value="Segera">Segera</option>
            <option value="Rahasia">Rahasia</option>
          </select>

          {(searchTerm || filterStatus !== 'all' || filterSifat !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterSifat('all');
              }}
              className="text-xs text-emerald-600 hover:underline ml-auto"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-32">No. Agenda</th>
                <th className="py-3 px-4">No. Surat & Tanggal</th>
                <th className="py-3 px-4">Tujuan Surat</th>
                <th className="py-3 px-4">Perihal</th>
                <th className="py-3 px-4 w-28">Status</th>
                <th className="py-3 px-4 w-28 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSurat.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Send className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-slate-600">Tidak ada surat keluar yang sesuai</p>
                    <p className="text-xs text-slate-400 mt-1">Gunakan tombol "Registrasi Surat Keluar" untuk membuat baru.</p>
                  </td>
                </tr>
              ) : (
                filteredSurat.map(surat => {
                  return (
                    <tr
                      key={surat.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => setViewingSurat(surat)}
                    >
                      <td className="py-3 px-4 font-mono font-medium text-emerald-700 whitespace-nowrap">
                        {surat.noAgenda}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-900 font-semibold">{surat.noSurat}</div>
                        <div className="text-slate-400 text-[11px] font-mono">
                          {surat.tanggalSurat} {surat.tanggalKirim ? `· Kirim: ${surat.tanggalKirim}` : ''}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 line-clamp-1">{surat.tujuanSurat}</div>
                        <div className="text-slate-500 text-[11px] truncate max-w-[200px]">{surat.alamatTujuan}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 line-clamp-1">{surat.perihal}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span>{surat.kategori}</span>
                          <span>·</span>
                          <span className="text-slate-600">{surat.sifat}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          surat.statusPengiriman === 'Terkirim' || surat.statusPengiriman === 'Diterima'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : surat.statusPengiriman === 'Disetujui'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {surat.statusPengiriman}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingSurat(surat)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 rounded hover:bg-slate-100"
                            title="Lihat Detail & Status"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setPrintEkspedisiSurat(surat)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100"
                            title="Cetak Lembar Ekspedisi Pengiriman"
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(surat)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 rounded hover:bg-slate-100"
                            title="Edit Data Surat Keluar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus surat keluar ${surat.noSurat}?`)) {
                                deleteSuratKeluar(surat.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                            title="Hapus Surat"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE / EDIT SURAT KELUAR */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingSurat ? 'Ubah Surat Keluar' : 'Registrasi & Penomoran Surat Keluar'}
                </h3>
                <p className="text-xs text-slate-500">
                  Penerbitan nomor dinas resmi dan tujuan pengiriman surat
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  if (onCloseCreateModalDirectly) onCloseCreateModalDirectly();
                }}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSurat} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nomor Agenda Keluar</label>
                  <input
                    type="text"
                    required
                    value={formAgenda}
                    onChange={(e) => setFormAgenda(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-medium text-slate-700">Nomor Surat Resmi *</label>
                    <button
                      type="button"
                      onClick={handleGenerateNoSurat}
                      className="text-[11px] text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate Format
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formNoSurat}
                    onChange={(e) => setFormNoSurat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tujuan Surat (Instansi / Lembaga / Person) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kepala Badan Kepegawaian Daerah"
                    value={formTujuanSurat}
                    onChange={(e) => setFormTujuanSurat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Alamat Tujuan Surat</label>
                  <input
                    type="text"
                    placeholder="Contoh: Jl. Diponegoro No. 10, Jakarta Pusat"
                    value={formAlamatTujuan}
                    onChange={(e) => setFormAlamatTujuan(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tanggal Surat *</label>
                  <input
                    type="date"
                    required
                    value={formTanggalSurat}
                    onChange={(e) => setFormTanggalSurat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tanggal Kirim (Opsional jika masih draft)</label>
                  <input
                    type="date"
                    value={formTanggalKirim}
                    onChange={(e) => setFormTanggalKirim(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Perihal / Isi Ringkas Surat *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan isi surat keluar dinas..."
                  value={formPerihal}
                  onChange={(e) => setFormPerihal(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Kategori / Klasifikasi</label>
                  <select
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  >
                    {kategoriList.map(k => (
                      <option key={k.kode} value={k.nama}>{k.nama}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Sifat Surat</label>
                  <select
                    value={formSifat}
                    onChange={(e) => setFormSifat(e.target.value as SifatSurat)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  >
                    <option value="Biasa">Biasa</option>
                    <option value="Penting">Penting</option>
                    <option value="Segera">Segera</option>
                    <option value="Rahasia">Rahasia</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status Pengiriman</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StatusSuratKeluar)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  >
                    <option value="Draft">Draft (Konsep)</option>
                    <option value="Disetujui">Disetujui (Signed)</option>
                    <option value="Terkirim">Terkirim</option>
                    <option value="Diterima">Diterima</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Pengonsep Surat (Staff / Arsiparis)</label>
                  <input
                    type="text"
                    value={formPengonsep}
                    onChange={(e) => setFormPengonsep(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Penandatangan (Pejabat Berwenang)</label>
                  <input
                    type="text"
                    value={formPenandatangan}
                    onChange={(e) => setFormPenandatangan(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              {/* Upload file */}
              <div className="p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-700 block">Arsip Berkas Digital Surat Keluar</span>
                    <span className="text-[11px] text-slate-500">
                      {formFileName ? `Berkas: ${formFileName} (${formFileSize})` : 'Pilih scan / pdf surat resmi'}
                    </span>
                  </div>
                  <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Unggah Dokumen</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleSimulateUpload}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Keterangan / Ekspedisi / No Resi Kirim</label>
                <input
                  type="text"
                  placeholder="Contoh: Diserahkan kurir internal / Pos Kilat Resi 12345678"
                  value={formKeterangan}
                  onChange={(e) => setFormKeterangan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
                >
                  {editingSurat ? 'Simpan Perubahan' : 'Terbitkan Surat Keluar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETAIL SURAT KELUAR & STATUS WORKFLOW */}
      {viewingSurat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {viewingSurat.noAgenda}
                  </span>
                  <span className="text-xs font-medium text-slate-600">
                    Sifat: {viewingSurat.sifat}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {viewingSurat.perihal}
                </h3>
              </div>
              <button
                onClick={() => setViewingSurat(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workflow status step buttons */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Alur Tahapan Surat Keluar (Klik untuk ubah status):
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(['Draft', 'Disetujui', 'Terkirim', 'Diterima'] as StatusSuratKeluar[]).map((st) => {
                  const isActive = viewingSurat.statusPengiriman === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateSuratKeluarStatus(viewingSurat.id, st);
                        setViewingSurat(prev => prev ? { ...prev, statusPengiriman: st } : null);
                      }}
                      className={`py-2 px-2 rounded text-xs font-medium border text-center transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/60 p-4 rounded-xl border border-slate-200 mb-4">
              <div>
                <span className="text-slate-500 block mb-0.5">Nomor Surat Resmi:</span>
                <span className="font-semibold font-mono text-slate-900">{viewingSurat.noSurat}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tujuan Surat:</span>
                <span className="font-semibold text-slate-900">{viewingSurat.tujuanSurat}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Alamat Tujuan:</span>
                <span className="text-slate-800">{viewingSurat.alamatTujuan || '-'}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tanggal Surat:</span>
                <span className="font-mono text-slate-800">{viewingSurat.tanggalSurat}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tanggal Pengiriman:</span>
                <span className="font-mono text-slate-800">{viewingSurat.tanggalKirim || 'Belum dikirim'}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Pengonsep & Penandatangan:</span>
                <span className="text-slate-800">{viewingSurat.pengonsep} · {viewingSurat.penandatangan}</span>
              </div>
              {viewingSurat.keterangan && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block mb-0.5">Keterangan / Resi:</span>
                  <span className="text-slate-700">{viewingSurat.keterangan}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPrintEkspedisiSurat(viewingSurat)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Cetak Lembar Tanda Terima / Ekspedisi</span>
              </button>
              <button
                onClick={() => setViewingSurat(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-xs font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT LEMBAR EKSPEDISI SURAT KELUAR */}
      {printEkspedisiSurat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="no-print bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
              <span className="font-semibold text-sm">Lembar Ekspedisi Pengiriman Surat Keluar</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Lembar Ekspedisi</span>
                </button>
                <button
                  onClick={() => setPrintEkspedisiSurat(null)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 sm:p-10 text-black bg-white text-xs">
              {/* Kop */}
              <div className="border-b-2 border-black pb-3 text-center mb-4">
                <h3 className="font-bold text-sm uppercase">{instansiConfig.namaInstansi}</h3>
                <h4 className="font-extrabold text-base uppercase">{instansiConfig.namaSubInstansi}</h4>
                <p className="text-[11px] text-gray-600">{instansiConfig.alamat}, {instansiConfig.kota} {instansiConfig.kodePos}</p>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-base font-bold uppercase underline">BUKU EKSPEDISI PENGIRIMAN SURAT DINAS</h2>
                <p className="font-mono text-gray-600">Nomor Registrasi: {printEkspedisiSurat.noAgenda}</p>
              </div>

              <table className="w-full border-collapse border border-black mb-6">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 bg-gray-50 font-semibold w-36">Nomor Surat</td>
                    <td className="border border-black p-2 font-mono font-bold">{printEkspedisiSurat.noSurat}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-50 font-semibold">Tanggal Surat</td>
                    <td className="border border-black p-2 font-mono">{printEkspedisiSurat.tanggalSurat}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-50 font-semibold">Tujuan Surat</td>
                    <td className="border border-black p-2 font-bold">{printEkspedisiSurat.tujuanSurat}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-50 font-semibold">Alamat Tujuan</td>
                    <td className="border border-black p-2">{printEkspedisiSurat.alamatTujuan || '-'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-50 font-semibold">Perihal Surat</td>
                    <td className="border border-black p-2">{printEkspedisiSurat.perihal}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-50 font-semibold">Sifat / Lampiran</td>
                    <td className="border border-black p-2">{printEkspedisiSurat.sifat} · {printEkspedisiSurat.fileName || '1 Berkas Dokumen'}</td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-2 gap-4 border border-black p-4 text-center">
                <div>
                  <p className="font-semibold mb-12">Petugas Pengirim (Kurir / Ekspedisi),</p>
                  <p className="font-bold underline uppercase">( ............................................ )</p>
                  <p className="text-[10px] text-gray-500">Tanggal Kirim: ........................</p>
                </div>
                <div>
                  <p className="font-semibold mb-12">Penerima Surat / Stempel Instansi Tujuan,</p>
                  <p className="font-bold underline uppercase">( ............................................ )</p>
                  <p className="text-[10px] text-gray-500">Tanggal Terima & Jam: ........................</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
