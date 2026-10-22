import React, { createContext, useContext, useState, useEffect } from 'react';
import { SuratMasuk, SuratKeluar, User, InstansiConfig, KategoriSurat, Disposisi, StatusDisposisi, StatusSuratKeluar } from '../types';
import { INITIAL_SURAT_MASUK, INITIAL_SURAT_KELUAR, INITIAL_USERS, INITIAL_INSTANSI, INITIAL_KATEGORI } from '../data/initialData';

interface AppContextType {
  suratMasukList: SuratMasuk[];
  suratKeluarList: SuratKeluar[];
  users: User[];
  currentUser: User;
  instansiConfig: InstansiConfig;
  kategoriList: KategoriSurat[];
  
  // Surat Masuk CRUD
  addSuratMasuk: (surat: Omit<SuratMasuk, 'id' | 'createdAt' | 'disposisiList'> & { disposisiAwal?: Partial<Disposisi> }) => void;
  updateSuratMasuk: (id: string, surat: Partial<SuratMasuk>) => void;
  deleteSuratMasuk: (id: string) => void;
  
  // Disposisi
  addDisposisi: (suratId: string, disposisi: Omit<Disposisi, 'id' | 'suratId' | 'pemberiNama' | 'pemberiJabatan'>) => void;
  updateDisposisiStatus: (suratId: string, disposisiId: string, status: StatusDisposisi) => void;
  deleteDisposisi: (suratId: string, disposisiId: string) => void;

  // Surat Keluar CRUD
  addSuratKeluar: (surat: Omit<SuratKeluar, 'id' | 'createdAt'>) => void;
  updateSuratKeluar: (id: string, surat: Partial<SuratKeluar>) => void;
  deleteSuratKeluar: (id: string) => void;
  updateSuratKeluarStatus: (id: string, status: StatusSuratKeluar) => void;

  // Users CRUD & Switch
  addUser: (user: Omit<User, 'id' | 'lastLogin'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  switchUser: (id: string) => void;

  // Config
  updateInstansiConfig: (config: Partial<InstansiConfig>) => void;

  // Utilities
  getNextAgendaMasuk: () => string;
  getNextAgendaKeluar: () => string;
  generateNoSuratKeluar: (kategoriKode: string, unitKode?: string) => string;
  resetToDefaultData: () => void;
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonString: string) => boolean;
}

const STORAGE_KEY_SURAT_MASUK = 'persuratan_surat_masuk_v1';
const STORAGE_KEY_SURAT_KELUAR = 'persuratan_surat_keluar_v1';
const STORAGE_KEY_USERS = 'persuratan_users_v1';
const STORAGE_KEY_CURRENT_USER = 'persuratan_current_user_v1';
const STORAGE_KEY_INSTANSI = 'persuratan_instansi_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suratMasukList, setSuratMasukList] = useState<SuratMasuk[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SURAT_MASUK);
      return saved ? JSON.parse(saved) : INITIAL_SURAT_MASUK;
    } catch {
      return INITIAL_SURAT_MASUK;
    }
  });

  const [suratKeluarList, setSuratKeluarList] = useState<SuratKeluar[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SURAT_KELUAR);
      return saved ? JSON.parse(saved) : INITIAL_SURAT_KELUAR;
    } catch {
      return INITIAL_SURAT_KELUAR;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        const exists = INITIAL_USERS.find(u => u.id === parsed.id);
        if (exists) return exists;
      }
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [instansiConfig, setInstansiConfig] = useState<InstansiConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INSTANSI);
      return saved ? JSON.parse(saved) : INITIAL_INSTANSI;
    } catch {
      return INITIAL_INSTANSI;
    }
  });

  const [kategoriList] = useState<KategoriSurat[]>(INITIAL_KATEGORI);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SURAT_MASUK, JSON.stringify(suratMasukList));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [suratMasukList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SURAT_KELUAR, JSON.stringify(suratKeluarList));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [suratKeluarList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INSTANSI, JSON.stringify(instansiConfig));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [instansiConfig]);

  // Generators
  const getNextAgendaMasuk = () => {
    const year = new Date().getFullYear();
    const count = suratMasukList.length + 1;
    const padded = String(count).padStart(3, '0');
    return `AGD/M/${year}/${padded}`;
  };

  const getNextAgendaKeluar = () => {
    const year = new Date().getFullYear();
    const count = suratKeluarList.length + 1;
    const padded = String(count).padStart(3, '0');
    return `AGD/K/${year}/${padded}`;
  };

  const generateNoSuratKeluar = (kategoriKode: string = '005', unitKode: string = 'DISPEL-SEKR') => {
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const now = new Date();
    const romanMonth = romanMonths[now.getMonth()];
    const year = now.getFullYear();
    return `${kategoriKode}/${unitKode}/${romanMonth}/${year}`;
  };

  // Surat Masuk CRUD
  const addSuratMasuk: AppContextType['addSuratMasuk'] = (surat) => {
    const id = `sm-${Date.now()}`;
    const disposisiList: Disposisi[] = [];
    
    if (surat.disposisiAwal && surat.disposisiAwal.tujuanJabatan) {
      disposisiList.push({
        id: `disp-${Date.now()}`,
        suratId: id,
        instruksi: surat.disposisiAwal.instruksi || ['Tindak Lanjuti'],
        tujuanJabatan: surat.disposisiAwal.tujuanJabatan,
        tujuanNama: surat.disposisiAwal.tujuanNama || '',
        catatan: surat.disposisiAwal.catatan || '',
        tanggalDisposisi: new Date().toISOString().split('T')[0],
        batasWaktu: surat.disposisiAwal.batasWaktu || '',
        status: 'Menunggu',
        pemberiNama: currentUser.name,
        pemberiJabatan: currentUser.jabatan
      });
    }

    const newSurat: SuratMasuk = {
      ...surat,
      id,
      disposisiList,
      createdAt: new Date().toISOString()
    };

    setSuratMasukList(prev => [newSurat, ...prev]);
  };

  const updateSuratMasuk = (id: string, updated: Partial<SuratMasuk>) => {
    setSuratMasukList(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteSuratMasuk = (id: string) => {
    setSuratMasukList(prev => prev.filter(item => item.id !== id));
  };

  // Disposisi
  const addDisposisi: AppContextType['addDisposisi'] = (suratId, disposisi) => {
    const newDisp: Disposisi = {
      ...disposisi,
      id: `disp-${Date.now()}`,
      suratId,
      pemberiNama: currentUser.name,
      pemberiJabatan: currentUser.jabatan
    };

    setSuratMasukList(prev => prev.map(item => {
      if (item.id === suratId) {
        return {
          ...item,
          disposisiList: [...item.disposisiList, newDisp]
        };
      }
      return item;
    }));
  };

  const updateDisposisiStatus = (suratId: string, disposisiId: string, status: StatusDisposisi) => {
    setSuratMasukList(prev => prev.map(item => {
      if (item.id === suratId) {
        return {
          ...item,
          disposisiList: item.disposisiList.map(d => d.id === disposisiId ? { ...d, status } : d)
        };
      }
      return item;
    }));
  };

  const deleteDisposisi = (suratId: string, disposisiId: string) => {
    setSuratMasukList(prev => prev.map(item => {
      if (item.id === suratId) {
        return {
          ...item,
          disposisiList: item.disposisiList.filter(d => d.id !== disposisiId)
        };
      }
      return item;
    }));
  };

  // Surat Keluar CRUD
  const addSuratKeluar: AppContextType['addSuratKeluar'] = (surat) => {
    const newSurat: SuratKeluar = {
      ...surat,
      id: `sk-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setSuratKeluarList(prev => [newSurat, ...prev]);
  };

  const updateSuratKeluar = (id: string, updated: Partial<SuratKeluar>) => {
    setSuratKeluarList(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteSuratKeluar = (id: string) => {
    setSuratKeluarList(prev => prev.filter(item => item.id !== id));
  };

  const updateSuratKeluarStatus = (id: string, status: StatusSuratKeluar) => {
    setSuratKeluarList(prev => prev.map(item => {
      if (item.id === id) {
        const update: Partial<SuratKeluar> = { statusPengiriman: status };
        if (status === 'Terkirim' && !item.tanggalKirim) {
          update.tanggalKirim = new Date().toISOString().split('T')[0];
        }
        return { ...item, ...update };
      }
      return item;
    }));
  };

  // Users CRUD & Switch
  const addUser: AppContextType['addUser'] = (user) => {
    const newUser: User = {
      ...user,
      id: `usr-${Date.now()}`,
      lastLogin: 'Baru Dibuat'
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updated: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
    if (currentUser.id === id) {
      setCurrentUser(prev => ({ ...prev, ...updated }));
    }
  };

  const deleteUser = (id: string) => {
    if (users.length <= 1) return;
    setUsers(prev => prev.filter(u => u.id !== id));
    if (currentUser.id === id) {
      const remaining = users.filter(u => u.id !== id);
      if (remaining.length > 0) setCurrentUser(remaining[0]);
    }
  };

  const switchUser = (id: string) => {
    const target = users.find(u => u.id === id);
    if (target) {
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
      const updatedUser = { ...target, lastLogin: nowStr };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
    }
  };

  const updateInstansiConfig = (config: Partial<InstansiConfig>) => {
    setInstansiConfig(prev => ({ ...prev, ...config }));
  };

  const resetToDefaultData = () => {
    setSuratMasukList(INITIAL_SURAT_MASUK);
    setSuratKeluarList(INITIAL_SURAT_KELUAR);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setInstansiConfig(INITIAL_INSTANSI);
    localStorage.removeItem(STORAGE_KEY_SURAT_MASUK);
    localStorage.removeItem(STORAGE_KEY_SURAT_KELUAR);
    localStorage.removeItem(STORAGE_KEY_USERS);
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    localStorage.removeItem(STORAGE_KEY_INSTANSI);
  };

  const exportDatabaseJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      instansiConfig,
      users,
      suratMasukList,
      suratKeluarList
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_persuratan_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importDatabaseJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.suratMasukList && Array.isArray(parsed.suratMasukList)) {
        setSuratMasukList(parsed.suratMasukList);
      }
      if (parsed.suratKeluarList && Array.isArray(parsed.suratKeluarList)) {
        setSuratKeluarList(parsed.suratKeluarList);
      }
      if (parsed.users && Array.isArray(parsed.users)) {
        setUsers(parsed.users);
      }
      if (parsed.instansiConfig && typeof parsed.instansiConfig === 'object') {
        setInstansiConfig(parsed.instansiConfig);
      }
      return true;
    } catch (e) {
      console.error('Import database JSON error:', e);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        suratMasukList,
        suratKeluarList,
        users,
        currentUser,
        instansiConfig,
        kategoriList,
        addSuratMasuk,
        updateSuratMasuk,
        deleteSuratMasuk,
        addDisposisi,
        updateDisposisiStatus,
        deleteDisposisi,
        addSuratKeluar,
        updateSuratKeluar,
        deleteSuratKeluar,
        updateSuratKeluarStatus,
        addUser,
        updateUser,
        deleteUser,
        switchUser,
        updateInstansiConfig,
        getNextAgendaMasuk,
        getNextAgendaKeluar,
        generateNoSuratKeluar,
        resetToDefaultData,
        exportDatabaseJSON,
        importDatabaseJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
