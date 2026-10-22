import React from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  Send, 
  FileText, 
  Users, 
  Settings, 
  BookOpen, 
  GitBranch,
  ShieldCheck,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export type TabKey = 'dashboard' | 'surat-masuk' | 'surat-keluar' | 'laporan' | 'pengguna' | 'pengaturan';

interface SidebarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  onOpenDeployGuide: () => void;
  onOpenUserSwitch: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDeployGuide,
  onOpenUserSwitch,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { suratMasukList, suratKeluarList, currentUser, instansiConfig } = useApp();

  const totalMasuk = suratMasukList.length;
  const totalKeluar = suratKeluarList.length;
  const pendingDisposisi = suratMasukList.reduce((acc, curr) => {
    return acc + curr.disposisiList.filter(d => d.status === 'Menunggu' || d.status === 'Diproses').length;
  }, 0);

  const menuItems = [
    { key: 'dashboard' as TabKey, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'surat-masuk' as TabKey, label: 'Surat Masuk', icon: Inbox, badge: totalMasuk },
    { key: 'surat-keluar' as TabKey, label: 'Surat Keluar', icon: Send, badge: totalKeluar },
    { key: 'laporan' as TabKey, label: 'Buku Agenda & Laporan', icon: FileText },
    { key: 'pengguna' as TabKey, label: 'Manajemen Pengguna', icon: Users },
    { key: 'pengaturan' as TabKey, label: 'Pengaturan Instansi', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800
        transition-transform duration-200 ease-in-out lg:translate-x-0 no-print
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 p-1 border border-slate-700 shrink-0 overflow-hidden">
            <img 
              src={instansiConfig.logoUrl || '/src/assets/images/instansi_emblem_1792633907279.jpg'} 
              alt="Logo Instansi" 
              className="w-full h-full object-cover rounded"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-white text-sm tracking-tight truncate leading-tight">
              E-PERSURATAN
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              Tata Kelola Arsip & Agenda
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu Utama
          </div>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Integrasi & Hosting
          </div>
          <button
            onClick={onOpenDeployGuide}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <GitBranch className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Deploy GitHub & Vercel</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400/70" />
          </button>
        </div>

        {/* Current User Quick Switcher Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80">
          <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/60">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden shrink-0 border border-slate-600">
                {currentUser.avatarUrl ? (
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-blue-600">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate leading-tight">
                  {currentUser.name}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
                  <span className="truncate">{currentUser.role}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenUserSwitch}
              className="w-full py-1.5 px-2 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Ganti Peran / Akun</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
