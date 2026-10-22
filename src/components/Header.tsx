import React from 'react';
import { Menu, Plus, UploadCloud, Users, ArrowUpRight, Search, FileCheck } from 'lucide-react';
import { TabKey } from './Sidebar';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  activeTab: TabKey;
  onToggleMobileMenu: () => void;
  onOpenCatatMasuk: () => void;
  onOpenCatatKeluar: () => void;
  onOpenDeployGuide: () => void;
  onOpenUserSwitch: () => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onToggleMobileMenu,
  onOpenCatatMasuk,
  onOpenCatatKeluar,
  onOpenDeployGuide,
  onOpenUserSwitch,
  globalSearch,
  setGlobalSearch
}) => {
  const { currentUser, instansiConfig } = useApp();

  const getPageTitle = (tab: TabKey) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard Persuratan';
      case 'surat-masuk':
        return 'Manajemen Surat Masuk';
      case 'surat-keluar':
        return 'Manajemen Surat Keluar';
      case 'laporan':
        return 'Buku Agenda & Rekapitulasi Laporan';
      case 'pengguna':
        return 'Manajemen Pengguna & Hak Akses';
      case 'pengaturan':
        return 'Pengaturan Instansi & Cadangan Data';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 no-print">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Breadcrumb Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{instansiConfig.namaSubInstansi || 'Tata Usaha & Kearsipan'}</span>
              <span>/</span>
              <span className="text-slate-800">{getPageTitle(activeTab)}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight truncate">
              {getPageTitle(activeTab)}
            </h2>
          </div>
        </div>

        {/* Center: Quick Search Input (Desktop) */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari surat, pengirim, agenda..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Deploy GitHub / Vercel Info button */}
          <button
            onClick={onOpenDeployGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors shadow-2xs"
            title="Panduan Deploy ke GitHub & Vercel.app"
          >
            <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
            <span>GitHub & Vercel</span>
          </button>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenCatatMasuk}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Surat Masuk</span>
              <span className="sm:hidden">+ Masuk</span>
            </button>

            <button
              onClick={onOpenCatatKeluar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Surat Keluar</span>
              <span className="sm:hidden">+ Keluar</span>
            </button>
          </div>

          {/* Switch User Avatar */}
          <button
            onClick={onOpenUserSwitch}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            title="Klik untuk beralih akun/peran"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center overflow-hidden border border-slate-200">
              {currentUser.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
            <span className="hidden xl:inline text-xs font-medium text-slate-700 max-w-[120px] truncate">
              {currentUser.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
