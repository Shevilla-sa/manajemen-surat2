import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  Inbox, 
  Send, 
  CheckCircle2, 
  Clock,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SuratMasuk, SuratKeluar } from '../types';

export const LaporanView: React.FC = () => {
  const { suratMasukList, suratKeluarList, instansiConfig } = useApp();

  const [activeTab, setActiveTab] = useState<'masuk' | 'keluar' | 'rekap'>('masuk');

  // Filter dates
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(`${currentYear}-01-01`);
  const [endDate, setEndDate] = useState(`${currentYear}-12-31`);
  const [filterSifat, setFilterSifat] = useState<string>('all');

  // Presets
  const setPreset = (type: 'thisMonth' | 'thisQuarter' | 'thisYear' | 'all') => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');

    if (type === 'thisMonth') {
      const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
      setStartDate(`${y}-${m}-01`);
      setEndDate(`${y}-${m}-${lastDay}`);
    } else if (type === 'thisQuarter') {
      const q = Math.floor(now.getMonth() / 3);
      const startM = String(q * 3 + 1).padStart(2, '0');
      const endM = String(q * 3 + 3).padStart(2, '0');
      const lastDay = new Date(y, q * 3 + 3, 0).getDate();
      setStartDate(`${y}-${startM}-01`);
      setEndDate(`${y}-${endM}-${lastDay}`);
    } else if (type === 'thisYear') {
      setStartDate(`${y}-01-01`);
      setEndDate(`${y}-12-31`);
    } else {
      setStartDate('2020-01-01');
      setEndDate('2030-12-31');
    }
  };

  // Filtered Surat Masuk
  const filteredMasuk = useMemo(() => {
    return suratMasukList.filter(s => {
      const d = s.tanggalTerima;
      const inDateRange = (!startDate || d >= startDate) && (!endDate || d <= endDate);
      const inSifat = filterSifat === 'all' || s.sifat === filterSifat;
      return inDateRange && inSifat;
    });
  }, [suratMasukList, startDate, endDate, filterSifat]);

  // Filtered Surat Keluar
  const filteredKeluar = useMemo(() => {
    return suratKeluarList.filter(s => {
      const d = s.tanggalSurat;
      const inDateRange = (!startDate || d >= startDate) && (!endDate || d <= endDate);
      const inSifat = filterSifat === 'all' || s.sifat === filterSifat;
      return inDateRange && inSifat;
    });
  }, [suratKeluarList, startDate, endDate, filterSifat]);

  // CSV Export functions
  const handleExportCSV = () => {
    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel support
    let filename = '';

    if (activeTab === 'masuk') {
      filename = `Buku_Agenda_Surat_Masuk_${startDate}_sd_${endDate}.csv`;
      const headers = ['No Agenda', 'No Surat', 'Asal Surat', 'Tanggal Surat', 'Tanggal Diterima', 'Perihal', 'Sifat', 'Kategori', 'Jumlah Disposisi'];
      csvContent += headers.map(h => `"${h}"`).join(';') + '\r\n';

      filteredMasuk.forEach(s => {
        const row = [
          s.noAgenda,
          s.noSurat,
          s.asalSurat,
          s.tanggalSurat,
          s.tanggalTerima,
          s.perihal.replace(/"/g, '""'),
          s.sifat,
          s.kategori,
          s.disposisiList.length
        ];
        csvContent += row.map(r => `"${r}"`).join(';') + '\r\n';
      });
    } else if (activeTab === 'keluar') {
      filename = `Buku_Agenda_Surat_Keluar_${startDate}_sd_${endDate}.csv`;
      const headers = ['No Agenda', 'No Surat', 'Tujuan Surat', 'Alamat Tujuan', 'Tanggal Surat', 'Tanggal Kirim', 'Perihal', 'Sifat', 'Status Pengiriman', 'Penandatangan'];
      csvContent += headers.map(h => `"${h}"`).join(';') + '\r\n';

      filteredKeluar.forEach(s => {
        const row = [
          s.noAgenda,
          s.noSurat,
          s.tujuanSurat,
          s.alamatTujuan || '',
          s.tanggalSurat,
          s.tanggalKirim || '',
          s.perihal.replace(/"/g, '""'),
          s.sifat,
          s.statusPengiriman,
          s.penandatangan
        ];
        csvContent += row.map(r => `"${r}"`).join(';') + '\r\n';
      });
    } else {
      filename = `Rekapitulasi_Persuratan_${startDate}_sd_${endDate}.csv`;
      csvContent += `"Laporan Rekapitulasi Persuratan Dinas"\r\n`;
      csvContent += `"Periode";"${startDate} s/d ${endDate}"\r\n`;
      csvContent += `"Total Surat Masuk";"${filteredMasuk.length}"\r\n`;
      csvContent += `"Total Surat Keluar";"${filteredKeluar.length}"\r\n`;
      csvContent += `"Total Seluruh Dokumen";"${filteredMasuk.length + filteredKeluar.length}"\r\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Filter & Control Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Laporan & Buku Agenda Resmi
            </h3>
            <p className="text-xs text-slate-500">
              Cetak agenda dinas dan unduh rekap data persuratan dalam format CSV / Excel
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Ekspor ke CSV / Excel</span>
            </button>

            <button
              onClick={handlePrintReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Laporan (Print)</span>
            </button>
          </div>
        </div>

        {/* Date and Preset Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-slate-500 font-medium mb-1">Dari Tanggal:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-500 font-medium mb-1">Sampai Tanggal:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-500 font-medium mb-1">Filter Sifat Surat:</label>
            <select
              value={filterSifat}
              onChange={(e) => setFilterSifat(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="all">Semua Sifat</option>
              <option value="Biasa">Biasa</option>
              <option value="Penting">Penting</option>
              <option value="Segera">Segera</option>
              <option value="Rahasia">Rahasia</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <span className="text-[11px] text-slate-400 mb-1">Rentang Cepat:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPreset('thisMonth')}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
              >
                Bulan Ini
              </button>
              <button
                type="button"
                onClick={() => setPreset('thisQuarter')}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
              >
                Triwulan
              </button>
              <button
                type="button"
                onClick={() => setPreset('thisYear')}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
              >
                Tahun Ini
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('masuk')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'masuk'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Buku Agenda Surat Masuk ({filteredMasuk.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('keluar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'keluar'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Buku Agenda Surat Keluar ({filteredKeluar.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rekap')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'rekap'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ringkasan Statistik Persuratan</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE REPORT DOCUMENT CONTAINER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
        {/* Printable Official Letterhead / Kop Surat */}
        <div className="border-b-4 border-double border-black pb-4 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 shrink-0">
              <img 
                src={instansiConfig.logoUrl || '/src/assets/images/instansi_emblem_1792633907279.jpg'} 
                alt="Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 text-center pr-12">
              <h3 className="font-bold text-sm uppercase tracking-wide leading-tight">
                {instansiConfig.namaInstansi}
              </h3>
              <h2 className="font-extrabold text-base uppercase tracking-tight leading-tight mt-0.5">
                {instansiConfig.namaSubInstansi}
              </h2>
              <p className="text-xs text-gray-700 mt-1">
                {instansiConfig.alamat}, {instansiConfig.kota} {instansiConfig.kodePos}
              </p>
              <p className="text-xs text-gray-700">
                Telepon: {instansiConfig.telepon} · Email: {instansiConfig.email}
              </p>
            </div>
          </div>
        </div>

        {/* Title of Report */}
        <div className="text-center mb-6">
          <h2 className="text-base font-extrabold uppercase underline tracking-wider">
            {activeTab === 'masuk' ? 'BUKU AGENDA SURAT MASUK DINAS' :
             activeTab === 'keluar' ? 'BUKU AGENDA SURAT KELUAR DINAS' :
             'REKAPITULASI LAPORAN PERSURATAN DAN KEARSIPAN'}
          </h2>
          <p className="text-xs text-gray-600 font-mono mt-1">
            Periode: {startDate} s/d {endDate}
          </p>
        </div>

        {/* Content depending on Tab */}
        {activeTab === 'masuk' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-black">
              <thead>
                <tr className="bg-gray-100 text-black font-bold border-b border-black">
                  <th className="border border-black p-2 text-center w-10">No</th>
                  <th className="border border-black p-2 w-28">No. Agenda</th>
                  <th className="border border-black p-2 w-36">No. Surat & Tgl</th>
                  <th className="border border-black p-2">Asal Surat / Pengirim</th>
                  <th className="border border-black p-2">Perihal</th>
                  <th className="border border-black p-2 w-20 text-center">Tgl Terima</th>
                  <th className="border border-black p-2 w-16 text-center">Sifat</th>
                  <th className="border border-black p-2 w-28">Tindak Lanjut</th>
                </tr>
              </thead>
              <tbody>
                {filteredMasuk.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      Tidak ada data surat masuk pada rentang waktu ini.
                    </td>
                  </tr>
                ) : (
                  filteredMasuk.map((s, idx) => (
                    <tr key={s.id} className="border-b border-black">
                      <td className="border border-black p-2 text-center font-mono">{idx + 1}</td>
                      <td className="border border-black p-2 font-mono font-medium">{s.noAgenda}</td>
                      <td className="border border-black p-2">
                        <div className="font-mono font-medium">{s.noSurat}</div>
                        <div className="text-[10px] text-gray-600 font-mono">{s.tanggalSurat}</div>
                      </td>
                      <td className="border border-black p-2">{s.asalSurat}</td>
                      <td className="border border-black p-2">{s.perihal}</td>
                      <td className="border border-black p-2 text-center font-mono">{s.tanggalTerima}</td>
                      <td className="border border-black p-2 text-center">{s.sifat}</td>
                      <td className="border border-black p-2">
                        {s.disposisiList.length > 0 ? (
                          <div className="text-[11px]">
                            {s.disposisiList.map((d, i) => (
                              <div key={i} className="mb-0.5">
                                • {d.tujuanJabatan} ({d.status})
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-gray-500 italic">Belum disposisi</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'keluar' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-black">
              <thead>
                <tr className="bg-gray-100 text-black font-bold border-b border-black">
                  <th className="border border-black p-2 text-center w-10">No</th>
                  <th className="border border-black p-2 w-28">No. Agenda</th>
                  <th className="border border-black p-2 w-40">No. Surat & Tgl</th>
                  <th className="border border-black p-2">Tujuan Surat & Alamat</th>
                  <th className="border border-black p-2">Perihal</th>
                  <th className="border border-black p-2 w-20 text-center">Tgl Kirim</th>
                  <th className="border border-black p-2 w-20 text-center">Status</th>
                  <th className="border border-black p-2 w-28">Penandatangan</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeluar.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      Tidak ada data surat keluar pada rentang waktu ini.
                    </td>
                  </tr>
                ) : (
                  filteredKeluar.map((s, idx) => (
                    <tr key={s.id} className="border-b border-black">
                      <td className="border border-black p-2 text-center font-mono">{idx + 1}</td>
                      <td className="border border-black p-2 font-mono font-medium">{s.noAgenda}</td>
                      <td className="border border-black p-2">
                        <div className="font-mono font-medium">{s.noSurat}</div>
                        <div className="text-[10px] text-gray-600 font-mono">{s.tanggalSurat}</div>
                      </td>
                      <td className="border border-black p-2">
                        <div className="font-medium">{s.tujuanSurat}</div>
                        <div className="text-[10px] text-gray-600">{s.alamatTujuan}</div>
                      </td>
                      <td className="border border-black p-2">{s.perihal}</td>
                      <td className="border border-black p-2 text-center font-mono">{s.tanggalKirim || '-'}</td>
                      <td className="border border-black p-2 text-center">{s.statusPengiriman}</td>
                      <td className="border border-black p-2 text-[11px]">{s.penandatangan}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rekap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-black p-4 text-center bg-gray-50">
                <span className="text-xs uppercase font-bold text-gray-600 block">Surat Masuk Periode Ini</span>
                <span className="text-3xl font-extrabold font-mono tabular-nums">{filteredMasuk.length}</span>
              </div>
              <div className="border border-black p-4 text-center bg-gray-50">
                <span className="text-xs uppercase font-bold text-gray-600 block">Surat Keluar Periode Ini</span>
                <span className="text-3xl font-extrabold font-mono tabular-nums">{filteredKeluar.length}</span>
              </div>
              <div className="border border-black p-4 text-center bg-gray-50">
                <span className="text-xs uppercase font-bold text-gray-600 block">Total Arus Dokumen</span>
                <span className="text-3xl font-extrabold font-mono tabular-nums">{filteredMasuk.length + filteredKeluar.length}</span>
              </div>
            </div>

            <div className="border border-black p-4 text-xs">
              <h4 className="font-bold uppercase mb-2">Catatan Rekapitulasi:</h4>
              <p className="leading-relaxed text-gray-700">
                Seluruh surat masuk dan keluar yang tercatat dalam sistem telah diverifikasi sesuai dengan nomor agenda registrasi, sifat kerahasiaan, dan arahan disposisi dari Kepala Dinas.
              </p>
            </div>
          </div>
        )}

        {/* Official Signature Section */}
        <div className="mt-12 flex justify-end text-xs text-black">
          <div className="text-center w-72">
            <p>{instansiConfig.kota}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold mt-1">{instansiConfig.kepalaJabatan}</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[10px] text-gray-400 italic">(Tanda Tangan & Cap Dinas)</span>
            </div>
            <p className="font-bold underline uppercase">{instansiConfig.kepalaNama}</p>
            <p className="font-mono text-gray-700">NIP. {instansiConfig.kepalaNip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
