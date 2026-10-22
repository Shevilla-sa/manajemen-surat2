import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  FileCheck2, 
  Printer, 
  Trash2, 
  Edit3, 
  Eye, 
  Calendar, 
  Building2, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Upload,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SuratMasuk, SifatSurat, StatusDisposisi, Disposisi } from '../types';
import { PrintDisposisiView } from './PrintDisposisiView';

interface SuratMasukViewProps {
  selectedSuratId?: string | null;
  onClearSelectedSurat?: () => void;
  openCreateModalDirectly?: boolean;
  onCloseCreateModalDirectly?: () => void;
}

export const SuratMasukView: React.FC<SuratMasukViewProps> = ({
  selectedSuratId,
  onClearSelectedSurat,
  openCreateModalDirectly,
  onCloseCreateModalDirectly
}) => {
  const { 
    suratMasukList, 
    addSuratMasuk, 
    updateSuratMasuk, 
    deleteSuratMasuk,
    addDisposisi,
    updateDisposisiStatus,
    deleteDisposisi,
    getNextAgendaMasuk,
    kategoriList,
    users,
    currentUser
  } = useApp();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSifat, setFilterSifat] = useState<string>('all');
  const [filterKategori, setFilterKategori] = useState<string>('all');
  const [filterDisposisi, setFilterDisposisi] = useState<string>('all');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(!!openCreateModalDirectly);
  const [editingSurat, setEditingSurat] = useState<SuratMasuk | null>(null);
  const [viewingSurat, setViewingSurat] = useState<SuratMasuk | null>(() => {
    if (selectedSuratId) {
      return suratMasukList.find(s => s.id === selectedSuratId) || null;
    }
    return null;
  });
  const [isAddDisposisiOpen, setIsAddDisposisiOpen] = useState(false);
  const [printSurat, setPrintSurat] = useState<SuratMasuk | null>(null);

  // Form State for Create / Edit
  const [formAgenda, setFormAgenda] = useState('');
  const [formNoSurat, setFormNoSurat] = useState('');
  const [formAsalSurat, setFormAsalSurat] = useState('');
  const [formTanggalSurat, setFormTanggalSurat] = useState('');
  const [formTanggalTerima, setFormTanggalTerima] = useState('');
  const [formPerihal, setFormPerihal] = useState('');
  const [formKategori, setFormKategori] = useState(kategoriList[0]?.nama || 'Undangan Resmi');
  const [formSifat, setFormSifat] = useState<SifatSurat>('Biasa');
  const [formKeterangan, setFormKeterangan] = useState('');
  const [formLampiranJumlah, setFormLampiranJumlah] = useState('');
  const [formFileName, setFormFileName] = useState('');
  const [formFileSize, setFormFileSize] = useState('');

  // Disposisi Form State
  const [dispTujuanJabatan, setDispTujuanJabatan] = useState('');
  const [dispTujuanNama, setDispTujuanNama] = useState('');
  const [dispInstruksi, setDispInstruksi] = useState<string[]>(['Tindak Lanjuti']);
  const [dispCatatan, setDispCatatan] = useState('');
  const [dispBatasWaktu, setDispBatasWaktu] = useState('');

  const availableInstructions = [
    'Tindak Lanjuti Segera',
    'Tanggapi / Balas Tertulis',
    'Pelajari / Teliti Materi',
    'Koordinasikan dengan Tim Terkait',
    'Hadiri / Wakili Pimpinan',
    'Siapkan Bahan Rapat',
    'Untuk Diketahui',
    'Arsipkan'
  ];

  const handleOpenCreate = () => {
    setFormAgenda(getNextAgendaMasuk());
    setFormNoSurat('');
    setFormAsalSurat('');
    const today = new Date().toISOString().split('T')[0];
    setFormTanggalSurat(today);
    setFormTanggalTerima(today);
    setFormPerihal('');
    setFormKategori(kategoriList[0]?.nama || 'Undangan Resmi');
    setFormSifat('Biasa');
    setFormKeterangan('');
    setFormLampiranJumlah('1 Berkas');
    setFormFileName('');
    setFormFileSize('');
    setEditingSurat(null);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (surat: SuratMasuk) => {
    setEditingSurat(surat);
    setFormAgenda(surat.noAgenda);
    setFormNoSurat(surat.noSurat);
    setFormAsalSurat(surat.asalSurat);
    setFormTanggalSurat(surat.tanggalSurat);
    setFormTanggalTerima(surat.tanggalTerima);
    setFormPerihal(surat.perihal);
    setFormKategori(surat.kategori);
    setFormSifat(surat.sifat);
    setFormKeterangan(surat.keterangan || '');
    setFormLampiranJumlah(surat.lampiranJumlah || '');
    setFormFileName(surat.fileName || '');
    setFormFileSize(surat.fileSize || '');
    setIsCreateOpen(true);
  };

  const handleSaveSurat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNoSurat || !formAsalSurat || !formPerihal) return;

    if (editingSurat) {
      updateSuratMasuk(editingSurat.id, {
        noSurat: formNoSurat,
        asalSurat: formAsalSurat,
        tanggalSurat: formTanggalSurat,
        tanggalTerima: formTanggalTerima,
        perihal: formPerihal,
        kategori: formKategori,
        sifat: formSifat,
        keterangan: formKeterangan,
        lampiranJumlah: formLampiranJumlah,
        fileName: formFileName || editingSurat.fileName,
        fileSize: formFileSize || editingSurat.fileSize
      });
      if (viewingSurat && viewingSurat.id === editingSurat.id) {
        setViewingSurat(prev => prev ? {
          ...prev,
          noSurat: formNoSurat,
          asalSurat: formAsalSurat,
          tanggalSurat: formTanggalSurat,
          tanggalTerima: formTanggalTerima,
          perihal: formPerihal,
          kategori: formKategori,
          sifat: formSifat,
          keterangan: formKeterangan,
          lampiranJumlah: formLampiranJumlah
        } : null);
      }
    } else {
      addSuratMasuk({
        noAgenda: formAgenda || getNextAgendaMasuk(),
        noSurat: formNoSurat,
        asalSurat: formAsalSurat,
        tanggalSurat: formTanggalSurat,
        tanggalTerima: formTanggalTerima,
        perihal: formPerihal,
        kategori: formKategori,
        sifat: formSifat,
        keterangan: formKeterangan,
        lampiranJumlah: formLampiranJumlah,
        fileName: formFileName || 'Dokumen_Surat_Masuk.pdf',
        fileSize: formFileSize || '1.2 MB'
      });
    }

    setIsCreateOpen(false);
    if (onCloseCreateModalDirectly) onCloseCreateModalDirectly();
  };

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormFileName(file.name);
      setFormFileSize(`${(file.size / 1024 / 1024).toFixed(2)} MB`);
    }
  };

  const handleOpenAddDisposisi = () => {
    const defaultRecipient = users.find(u => u.role === 'Staf / Seksi') || users[1];
    setDispTujuanJabatan(defaultRecipient.jabatan);
    setDispTujuanNama(defaultRecipient.name);
    setDispInstruksi(['Tindak Lanjuti Segera']);
    setDispCatatan('');
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setDispBatasWaktu(nextWeek.toISOString().split('T')[0]);
    setIsAddDisposisiOpen(true);
  };

  const handleSaveDisposisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingSurat || !dispTujuanJabatan) return;

    addDisposisi(viewingSurat.id, {
      instruksi: dispInstruksi,
      tujuanJabatan: dispTujuanJabatan,
      tujuanNama: dispTujuanNama,
      catatan: dispCatatan,
      tanggalDisposisi: new Date().toISOString().split('T')[0],
      batasWaktu: dispBatasWaktu,
      status: 'Menunggu'
    });

    // Update viewing state
    const updated = suratMasukList.find(s => s.id === viewingSurat.id);
    if (updated) {
      setViewingSurat({
        ...updated,
        disposisiList: [
          ...updated.disposisiList,
          {
            id: `disp-${Date.now()}`,
            suratId: viewingSurat.id,
            instruksi: dispInstruksi,
            tujuanJabatan: dispTujuanJabatan,
            tujuanNama: dispTujuanNama,
            catatan: dispCatatan,
            tanggalDisposisi: new Date().toISOString().split('T')[0],
            batasWaktu: dispBatasWaktu,
            status: 'Menunggu',
            pemberiNama: currentUser.name,
            pemberiJabatan: currentUser.jabatan
          }
        ]
      });
    }

    setIsAddDisposisiOpen(false);
  };

  const toggleInstruction = (inst: string) => {
    setDispInstruksi(prev => 
      prev.includes(inst) ? prev.filter(i => i !== inst) : [...prev, inst]
    );
  };

  // Filtered List
  const filteredSurat = useMemo(() => {
    return suratMasukList.filter(surat => {
      // Search
      const search = searchTerm.toLowerCase();
      const matchSearch = !searchTerm || (
        surat.noAgenda.toLowerCase().includes(search) ||
        surat.noSurat.toLowerCase().includes(search) ||
        surat.asalSurat.toLowerCase().includes(search) ||
        surat.perihal.toLowerCase().includes(search)
      );

      // Sifat
      const matchSifat = filterSifat === 'all' || surat.sifat === filterSifat;

      // Kategori
      const matchKategori = filterKategori === 'all' || surat.kategori === filterKategori;

      // Disposisi status
      let matchDisposisi = true;
      if (filterDisposisi === 'none') {
        matchDisposisi = surat.disposisiList.length === 0;
      } else if (filterDisposisi === 'pending') {
        matchDisposisi = surat.disposisiList.some(d => d.status === 'Menunggu' || d.status === 'Diproses');
      } else if (filterDisposisi === 'done') {
        matchDisposisi = surat.disposisiList.length > 0 && surat.disposisiList.every(d => d.status === 'Selesai');
      }

      return matchSearch && matchSifat && matchKategori && matchDisposisi;
    });
  }, [suratMasukList, searchTerm, filterSifat, filterKategori, filterDisposisi]);

  return (
    <div className="space-y-4">
      {/* Action & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor agenda, no surat, pengirim, perihal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Surat Masuk</span>
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Filter:</span>
          
          {/* Sifat */}
          <select
            value={filterSifat}
            onChange={(e) => setFilterSifat(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none text-xs"
          >
            <option value="all">Semua Sifat Surat</option>
            <option value="Biasa">Biasa</option>
            <option value="Penting">Penting</option>
            <option value="Segera">Segera</option>
            <option value="Rahasia">Rahasia</option>
          </select>

          {/* Kategori */}
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none text-xs"
          >
            <option value="all">Semua Kategori</option>
            {kategoriList.map(k => (
              <option key={k.kode} value={k.nama}>{k.nama}</option>
            ))}
          </select>

          {/* Disposisi */}
          <select
            value={filterDisposisi}
            onChange={(e) => setFilterDisposisi(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none text-xs"
          >
            <option value="all">Semua Status Disposisi</option>
            <option value="pending">Perlu Tindak Lanjut</option>
            <option value="done">Disposisi Selesai</option>
            <option value="none">Belum Disposisi</option>
          </select>

          {(searchTerm || filterSifat !== 'all' || filterKategori !== 'all' || filterDisposisi !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterSifat('all');
                setFilterKategori('all');
                setFilterDisposisi('all');
              }}
              className="text-xs text-blue-600 hover:underline ml-auto"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Main Table View */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-32">No. Agenda</th>
                <th className="py-3 px-4">Surat & Pengirim</th>
                <th className="py-3 px-4">Perihal / Ringkasan</th>
                <th className="py-3 px-4 w-28">Tgl Terima</th>
                <th className="py-3 px-4 w-24">Sifat</th>
                <th className="py-3 px-4 w-32">Status Disposisi</th>
                <th className="py-3 px-4 w-28 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSurat.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-slate-600">Tidak ada surat masuk yang sesuai</p>
                    <p className="text-xs text-slate-400 mt-1">Coba ubah filter atau tambahkan surat masuk baru.</p>
                  </td>
                </tr>
              ) : (
                filteredSurat.map(surat => {
                  const hasDisposisi = surat.disposisiList.length > 0;
                  const allDone = hasDisposisi && surat.disposisiList.every(d => d.status === 'Selesai');

                  return (
                    <tr 
                      key={surat.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => setViewingSurat(surat)}
                    >
                      <td className="py-3 px-4 font-mono font-medium text-blue-700 whitespace-nowrap">
                        {surat.noAgenda}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-900 font-semibold">{surat.noSurat}</div>
                        <div className="text-slate-500 text-[11px] truncate max-w-[220px]">{surat.asalSurat}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 line-clamp-1">{surat.perihal}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span>{surat.kategori}</span>
                          {surat.fileName && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-0.5 text-slate-500">
                                <Paperclip className="w-3 h-3" />
                                {surat.fileName}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                        {surat.tanggalTerima}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`text-[11px] font-medium ${
                          surat.sifat === 'Penting' ? 'text-amber-700' :
                          surat.sifat === 'Segera' ? 'text-rose-700' :
                          surat.sifat === 'Rahasia' ? 'text-indigo-700' : 'text-slate-600'
                        }`}>
                          {surat.sifat}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {!hasDisposisi ? (
                          <span className="text-[11px] text-slate-400 italic">Belum Disposisi</span>
                        ) : allDone ? (
                          <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selesai ({surat.disposisiList.length})
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-amber-700 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Diproses ({surat.disposisiList.length})
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingSurat(surat)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100"
                            title="Lihat Detail & Disposisi"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setPrintSurat(surat)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100"
                            title="Cetak Lembar Disposisi"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(surat)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 rounded hover:bg-slate-100"
                            title="Edit Data Surat"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus surat ${surat.noSurat}?`)) {
                                deleteSuratMasuk(surat.id);
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

      {/* MODAL: CREATE / EDIT SURAT MASUK */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingSurat ? 'Ubah Data Surat Masuk' : 'Pencatatan Surat Masuk Baru'}
                </h3>
                <p className="text-xs text-slate-500">
                  Isi formulir data registrasi surat dinas masuk secara lengkap
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
                  <label className="block font-medium text-slate-700 mb-1">Nomor Agenda (Auto / Manual)</label>
                  <input
                    type="text"
                    required
                    value={formAgenda}
                    onChange={(e) => setFormAgenda(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nomor Surat Asli *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 005/KEMENKOMINFO/SEKR/X/2026"
                    value={formNoSurat}
                    onChange={(e) => setFormNoSurat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Asal Surat / Instansi Pengirim *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kementerian Dalam Negeri / Pemprov / Universitas"
                  value={formAsalSurat}
                  onChange={(e) => setFormAsalSurat(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tanggal Surat Terbit *</label>
                  <input
                    type="date"
                    required
                    value={formTanggalSurat}
                    onChange={(e) => setFormTanggalSurat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tanggal Diterima *</label>
                  <input
                    type="date"
                    required
                    value={formTanggalTerima}
                    onChange={(e) => setFormTanggalTerima(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Perihal Surat *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan perihal atau isi pokok surat..."
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
                  <label className="block font-medium text-slate-700 mb-1">Jumlah Lampiran</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1 Berkas / 2 Lembar"
                    value={formLampiranJumlah}
                    onChange={(e) => setFormLampiranJumlah(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              {/* File Attachment Upload */}
              <div className="p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-700 block">Lampiran Berkas Digital (PDF / Scan)</span>
                    <span className="text-[11px] text-slate-500">
                      {formFileName ? `Berkas terpilih: ${formFileName} (${formFileSize})` : 'Pilih dokumen scan surat masuk'}
                    </span>
                  </div>
                  <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Pilih Berkas</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleSimulateFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Catatan Tambahan / Lokasi Fisik Arsip</label>
                <input
                  type="text"
                  placeholder="Contoh: Rak Lemari Arsip B-03, Map Biru"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  {editingSurat ? 'Simpan Perubahan' : 'Daftarkan Surat Masuk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETAIL SURAT & DISPOSISI TRACKER */}
      {viewingSurat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {viewingSurat.noAgenda}
                  </span>
                  <span className={`text-xs font-medium ${
                    viewingSurat.sifat === 'Penting' ? 'text-amber-700' :
                    viewingSurat.sifat === 'Segera' ? 'text-rose-700' :
                    viewingSurat.sifat === 'Rahasia' ? 'text-indigo-700' : 'text-slate-600'
                  }`}>
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

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div>
                <span className="text-slate-500 block mb-0.5">Nomor Surat Asli:</span>
                <span className="font-semibold font-mono text-slate-900">{viewingSurat.noSurat}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Pengirim (Asal Surat):</span>
                <span className="font-semibold text-slate-900">{viewingSurat.asalSurat}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tanggal Surat:</span>
                <span className="font-mono text-slate-800">{viewingSurat.tanggalSurat}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tanggal Diterima:</span>
                <span className="font-mono text-slate-800">{viewingSurat.tanggalTerima}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Kategori / Klasifikasi:</span>
                <span className="text-slate-800">{viewingSurat.kategori}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Lampiran & File:</span>
                <span className="text-slate-800">
                  {viewingSurat.lampiranJumlah || 'Tidak ada'} {viewingSurat.fileName ? `(${viewingSurat.fileName})` : ''}
                </span>
              </div>
              {viewingSurat.keterangan && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block mb-0.5">Keterangan / Lokasi Fisik:</span>
                  <span className="text-slate-700">{viewingSurat.keterangan}</span>
                </div>
              )}
            </div>

            {/* Action Buttons for Surat */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPrintSurat(viewingSurat)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Lembar Disposisi Resmi</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddDisposisi}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Beri Lembar Disposisi</span>
                </button>
              </div>
            </div>

            {/* Disposisi List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Riwayat & Instruksi Disposisi ({viewingSurat.disposisiList.length})
                </h4>
              </div>

              {viewingSurat.disposisiList.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-xs text-slate-500">
                  <p>Belum ada disposisi dari Pimpinan / Kepala Dinas.</p>
                  <p className="mt-1 text-slate-400">Klik tombol "+ Beri Lembar Disposisi" di atas untuk menugaskan kepada staf atau kepala seksi.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {viewingSurat.disposisiList.map((disp, index) => (
                    <div 
                      key={disp.id} 
                      className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-2.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">
                              Kepada: {disp.tujuanJabatan}
                            </span>
                            {disp.tujuanNama && (
                              <span className="text-slate-500 font-normal">({disp.tujuanNama})</span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Oleh: {disp.pemberiJabatan || 'Pimpinan'} · {disp.tanggalDisposisi}
                          </p>
                        </div>

                        {/* Status badge & selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={disp.status}
                            onChange={(e) => {
                              updateDisposisiStatus(viewingSurat.id, disp.id, e.target.value as StatusDisposisi);
                              setViewingSurat(prev => prev ? {
                                ...prev,
                                disposisiList: prev.disposisiList.map(d => d.id === disp.id ? { ...d, status: e.target.value as StatusDisposisi } : d)
                              } : null);
                            }}
                            className={`text-xs px-2 py-1 rounded font-medium border ${
                              disp.status === 'Selesai' 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                                : disp.status === 'Diproses'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Menunggu">Menunggu</option>
                            <option value="Diproses">Diproses</option>
                            <option value="Selesai">Selesai</option>
                          </select>

                          <button
                            onClick={() => {
                              if (confirm('Hapus lembar disposisi ini?')) {
                                deleteDisposisi(viewingSurat.id, disp.id);
                                setViewingSurat(prev => prev ? {
                                  ...prev,
                                  disposisiList: prev.disposisiList.filter(d => d.id !== disp.id)
                                } : null);
                              }
                            }}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Hapus Disposisi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Instructions tag list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {disp.instruksi?.map((inst, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                          >
                            ✓ {inst}
                          </span>
                        ))}
                      </div>

                      {/* Catatan arahan */}
                      {disp.catatan && (
                        <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-slate-700 italic">
                          "{disp.catatan}"
                        </div>
                      )}

                      {disp.batasWaktu && (
                        <div className="text-[11px] text-rose-600 font-medium">
                          Batas Waktu: {disp.batasWaktu}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH DISPOSISI */}
      {isAddDisposisiOpen && viewingSurat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Buat Lembar Disposisi Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Untuk Surat: <span className="font-mono font-medium text-slate-700">{viewingSurat.noAgenda}</span>
                </p>
              </div>
              <button
                onClick={() => setIsAddDisposisiOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDisposisi} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Diteruskan Kepada (Penerima Disposisi) *</label>
                <select
                  required
                  value={dispTujuanJabatan}
                  onChange={(e) => {
                    const selJabatan = e.target.value;
                    setDispTujuanJabatan(selJabatan);
                    const foundUser = users.find(u => u.jabatan === selJabatan);
                    if (foundUser) setDispTujuanNama(foundUser.name);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                >
                  <option value="">-- Pilih Pejabat / Kepala Seksi --</option>
                  {users.map(u => (
                    <option key={u.id} value={u.jabatan}>
                      {u.jabatan} ({u.name} - {u.unitKerja})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-2">Instruksi Pimpinan (Pilih satu atau lebih):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableInstructions.map((inst) => {
                    const isSelected = dispInstruksi.includes(inst);
                    return (
                      <button
                        type="button"
                        key={inst}
                        onClick={() => toggleInstruction(inst)}
                        className={`text-left px-2.5 py-1.5 rounded-lg border text-xs transition-colors flex items-center gap-2 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center text-[10px] ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </span>
                        <span>{inst}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Catatan / Arahan Khusus</label>
                <textarea
                  rows={3}
                  placeholder="Instruksi spesifik atau arahan teknis dari pimpinan..."
                  value={dispCatatan}
                  onChange={(e) => setDispCatatan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Batas Waktu Penyelesaian (Target Deadline)</label>
                <input
                  type="date"
                  value={dispBatasWaktu}
                  onChange={(e) => setDispBatasWaktu(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddDisposisiOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Simpan & Kirim Disposisi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINT VIEW MODAL */}
      {printSurat && (
        <PrintDisposisiView
          surat={printSurat}
          onClose={() => setPrintSurat(null)}
        />
      )}
    </div>
  );
};
