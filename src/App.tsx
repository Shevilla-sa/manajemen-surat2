/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, TabKey } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { SuratMasukView } from './components/SuratMasukView';
import { SuratKeluarView } from './components/SuratKeluarView';
import { LaporanView } from './components/LaporanView';
import { PenggunaView } from './components/PenggunaView';
import { PengaturanView } from './components/PengaturanView';
import { DeployGuideModal } from './components/DeployGuideModal';
import { UserSwitchModal } from './components/UserSwitchModal';
import { SuratMasuk, SuratKeluar } from './types';

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isUserSwitchOpen, setIsUserSwitchOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Selected item for detail view
  const [selectedMasukId, setSelectedMasukId] = useState<string | null>(null);
  const [selectedKeluarId, setSelectedKeluarId] = useState<string | null>(null);

  // Quick create modals
  const [openCatatMasukDirectly, setOpenCatatMasukDirectly] = useState(false);
  const [openCatatKeluarDirectly, setOpenCatatKeluarDirectly] = useState(false);

  const handleSelectSuratMasuk = (surat: SuratMasuk) => {
    setSelectedMasukId(surat.id);
    setActiveTab('surat-masuk');
  };

  const handleSelectSuratKeluar = (surat: SuratKeluar) => {
    setSelectedKeluarId(surat.id);
    setActiveTab('surat-keluar');
  };

  const handleTriggerCatatMasuk = () => {
    setActiveTab('surat-masuk');
    setOpenCatatMasukDirectly(true);
  };

  const handleTriggerCatatKeluar = () => {
    setActiveTab('surat-keluar');
    setOpenCatatKeluarDirectly(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedMasukId(null);
          setSelectedKeluarId(null);
        }}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenUserSwitch={() => setIsUserSwitchOpen(true)}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          activeTab={activeTab}
          onToggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
          onOpenCatatMasuk={handleTriggerCatatMasuk}
          onOpenCatatKeluar={handleTriggerCatatKeluar}
          onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
          onOpenUserSwitch={() => setIsUserSwitchOpen(true)}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onSelectSuratMasuk={handleSelectSuratMasuk}
              onSelectSuratKeluar={handleSelectSuratKeluar}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onOpenCatatMasuk={handleTriggerCatatMasuk}
              onOpenCatatKeluar={handleTriggerCatatKeluar}
            />
          )}

          {activeTab === 'surat-masuk' && (
            <SuratMasukView
              selectedSuratId={selectedMasukId}
              onClearSelectedSurat={() => setSelectedMasukId(null)}
              openCreateModalDirectly={openCatatMasukDirectly}
              onCloseCreateModalDirectly={() => setOpenCatatMasukDirectly(false)}
            />
          )}

          {activeTab === 'surat-keluar' && (
            <SuratKeluarView
              selectedSuratId={selectedKeluarId}
              openCreateModalDirectly={openCatatKeluarDirectly}
              onCloseCreateModalDirectly={() => setOpenCatatKeluarDirectly(false)}
            />
          )}

          {activeTab === 'laporan' && (
            <LaporanView />
          )}

          {activeTab === 'pengguna' && (
            <PenggunaView />
          )}

          {activeTab === 'pengaturan' && (
            <PengaturanView />
          )}
        </main>
      </div>

      {/* Deploy to GitHub & Vercel Modal */}
      {isDeployGuideOpen && (
        <DeployGuideModal onClose={() => setIsDeployGuideOpen(false)} />
      )}

      {/* User Switch Modal */}
      {isUserSwitchOpen && (
        <UserSwitchModal onClose={() => setIsUserSwitchOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
