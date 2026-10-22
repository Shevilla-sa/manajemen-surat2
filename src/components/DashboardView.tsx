import React from 'react';
import { 
  Inbox, 
  Send, 
  FileCheck2, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Building,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SuratMasuk, SuratKeluar } from '../types';

interface DashboardViewProps {
  onSelectSuratMasuk: (surat: SuratMasuk) => void;
  onSelectSuratKeluar: (surat: SuratKeluar) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenCatatMasuk: () => void;
  onOpenCatatKeluar: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectSuratMasuk,
  onSelectSuratKeluar,
  onNavigateToTab,
  onOpenCatatMasuk,
  onOpenCatatKeluar
}) => {
  const { suratMasukList, suratKeluarList, currentUser, instansiConfig } = useApp();

  const totalMasuk = suratMasukList.length;
  const totalKeluar = suratKeluarList.length;

  // Calculate current month letters
  const currentMonthPrefix = new Date().toISOString().substring(0, 7); // YYYY-MM
  const masukBulanIni = suratMasukList.filter(s => s.tanggalTerima.startsWith(currentMonthPrefix)).length;
  const keluarBulanIni = suratKeluarList.filter(s => s.tanggalSurat.startsWith(currentMonthPrefix)).length;

  // Disposisi counts
  const allDisposisi = suratMasukList.flatMap(s => s.disposisiList);
  const pendingDisposisi = allDisposisi.filter(d => d.status === 'Menunggu').length;
  const prosesDisposisi = allDisposisi.filter(d => d.status === 'Diproses').length;
  const selesaiDisposisi = allDisposisi.filter(d => d.status === 'Selesai').length;

  // Sifat breakdown
  const countSifatMasuk = (sifat: string) => suratMasukList.filter(s => s.sifat === sifat).length;
  const sifatCounts = {
    Penting: countSifatMasuk('Penting'),
    Segera: countSifatMasuk('Segera'),
    Biasa: countSifatMasuk('Biasa'),
    Rahasia: countSifatMasuk('Rahasia'),
  };

  // Recent incoming
  const recentMasuk = suratMasukList.slice(0, 5);
  // Recent outgoing
  const recentKeluar = suratKeluarList.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Selamat Datang, {currentUser.name}
            </h1>
            <p className="text-sm text-slate-500">
              {currentUser.jabatan} — {instansiConfig.namaSubInstansi}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCatatMasuk}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-2xs"
            >
              + Catat Surat Masuk
            </button>
            <button
              onClick={onOpenCatatKeluar}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            >
              + Registrasi Surat Keluar
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Surat Masuk */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Total Surat Masuk</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {totalMasuk}
            </span>
            <span className="text-xs text-slate-500">
              <span className="text-blue-600 font-medium font-mono tabular-nums">{masukBulanIni}</span> bulan ini
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Agenda aktif tahun {new Date().getFullYear()}</span>
            <button 
              onClick={() => onNavigateToTab('surat-masuk')}
              className="text-blue-600 hover:underline flex items-center gap-0.5"
            >
              Lihat <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Total Surat Keluar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Total Surat Keluar</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {totalKeluar}
            </span>
            <span className="text-xs text-slate-500">
              <span className="text-emerald-600 font-medium font-mono tabular-nums">{keluarBulanIni}</span> bulan ini
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Nomor otomatis terbit</span>
            <button 
              onClick={() => onNavigateToTab('surat-keluar')}
              className="text-emerald-600 hover:underline flex items-center gap-0.5"
            >
              Lihat <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Disposisi Aktif */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Disposisi Menunggu / Proses</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {pendingDisposisi + prosesDisposisi}
            </span>
            <span className="text-xs text-slate-500">
              <span className="text-amber-600 font-medium font-mono tabular-nums">{pendingDisposisi}</span> perlu respon
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Selesai ditindaklanjuti: {selesaiDisposisi}</span>
            <button 
              onClick={() => onNavigateToTab('surat-masuk')}
              className="text-amber-600 hover:underline flex items-center gap-0.5"
            >
              Tindak <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Total Rekapitulasi */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Buku Agenda & Rekap</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {totalMasuk + totalKeluar}
            </span>
            <span className="text-xs text-slate-500">Total Arsip</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Laporan siap cetak & CSV</span>
            <button 
              onClick={() => onNavigateToTab('laporan')}
              className="text-purple-600 hover:underline flex items-center gap-0.5"
            >
              Buka <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Bar Visualization */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Volume Persuratan Bulanan (Tahun 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Perbandingan arus surat masuk vs surat keluar yang terdistribusi
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block"></span>
                Surat Masuk
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block"></span>
                Surat Keluar
              </span>
            </div>
          </div>

          {/* Simple Clean Bar Visualizer */}
          <div className="space-y-4 pt-2">
            {[
              { month: 'Mei', masuk: 8, keluar: 6 },
              { month: 'Jun', masuk: 12, keluar: 9 },
              { month: 'Jul', masuk: 15, keluar: 11 },
              { month: 'Agu', masuk: 18, keluar: 14 },
              { month: 'Sep', masuk: 22, keluar: 16 },
              { month: 'Okt', masuk: totalMasuk, keluar: totalKeluar },
            ].map(item => {
              const maxVal = 25;
              const masukWidth = Math.min(100, Math.round((item.masuk / maxVal) * 100));
              const keluarWidth = Math.min(100, Math.round((item.keluar / maxVal) * 100));

              return (
                <div key={item.month} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>{item.month} 2026</span>
                    <span className="font-mono tabular-nums text-slate-500">
                      Masuk: {item.masuk} · Keluar: {item.keluar}
                    </span>
                  </div>
                  <div className="flex gap-1 h-3 bg-slate-100 rounded overflow-hidden">
                    <div 
                      className="bg-blue-600 rounded-l transition-all duration-300" 
                      style={{ width: `${masukWidth / 2}%` }}
                      title={`Surat Masuk: ${item.masuk}`}
                    />
                    <div 
                      className="bg-emerald-600 rounded-r transition-all duration-300" 
                      style={{ width: `${keluarWidth / 2}%` }}
                      title={`Surat Keluar: ${item.keluar}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Sifat Surat & Disposisi Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              Distribusi Sifat Surat
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Klasifikasi tingkat urgensi surat masuk
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-amber-700">Penting</span>
                  <span className="font-mono tabular-nums text-slate-700">{sifatCounts.Penting} surat</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${totalMasuk ? (sifatCounts.Penting / totalMasuk) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-rose-700">Segera</span>
                  <span className="font-mono tabular-nums text-slate-700">{sifatCounts.Segera} surat</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full" 
                    style={{ width: `${totalMasuk ? (sifatCounts.Segera / totalMasuk) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-indigo-700">Rahasia</span>
                  <span className="font-mono tabular-nums text-slate-700">{sifatCounts.Rahasia} surat</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${totalMasuk ? (sifatCounts.Rahasia / totalMasuk) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Biasa</span>
                  <span className="font-mono tabular-nums text-slate-700">{sifatCounts.Biasa} surat</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-400 rounded-full" 
                    style={{ width: `${totalMasuk ? (sifatCounts.Biasa / totalMasuk) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Instansi Info */}
          <div className="bg-slate-900 text-slate-300 rounded-xl p-5 border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <Building className="w-5 h-5 text-blue-400" />
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Organisasi Perangkat
                </h4>
                <p className="text-xs text-slate-400">
                  {instansiConfig.namaInstansi}
                </p>
              </div>
            </div>
            <div className="text-xs space-y-1.5 text-slate-400 pt-2 border-t border-slate-800">
              <p>Kepala: <span className="text-white font-medium">{instansiConfig.kepalaNama}</span></p>
              <p>NIP: <span className="text-slate-300 font-mono tabular-nums">{instansiConfig.kepalaNip}</span></p>
              <p>Email: <span className="text-slate-300">{instansiConfig.email}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Tables: Recent Incoming vs Recent Outgoing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Surat Masuk */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Surat Masuk Terbaru
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan surat masuk dan tindak lanjut disposisi
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('surat-masuk')}
              className="text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              Semua Surat &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentMasuk.map((surat) => (
              <div
                key={surat.id}
                onClick={() => onSelectSuratMasuk(surat)}
                className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-mono tabular-nums text-blue-700 font-semibold">
                    {surat.noAgenda}
                  </span>
                  <span>{surat.tanggalTerima}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1 mb-1">
                  {surat.perihal}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="truncate max-w-[200px]">{surat.asalSurat}</span>
                  <span>·</span>
                  <span className="text-slate-600">{surat.sifat}</span>
                  {surat.disposisiList.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">
                        {surat.disposisiList.length} Disposisi
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Surat Keluar */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Surat Keluar Terbaru
              </h3>
              <p className="text-xs text-slate-500">
                Surat resmi yang dikeluarkan dan dikirim ke instansi lain
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('surat-keluar')}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-800"
            >
              Semua Surat &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentKeluar.map((surat) => (
              <div
                key={surat.id}
                onClick={() => onSelectSuratKeluar(surat)}
                className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-mono tabular-nums text-emerald-700 font-semibold">
                    {surat.noSurat}
                  </span>
                  <span>{surat.tanggalSurat}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1 mb-1">
                  {surat.perihal}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="truncate max-w-[200px]">Tujuan: {surat.tujuanSurat}</span>
                  <span>·</span>
                  <span className="font-medium text-slate-700">{surat.statusPengiriman}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
