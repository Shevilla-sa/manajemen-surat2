import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  LogIn, 
  CheckCircle2, 
  X,
  Mail,
  Building,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User, UserRole } from '../types';

export const PenggunaView: React.FC = () => {
  const { users, currentUser, addUser, updateUser, deleteUser, switchUser } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Staf / Seksi');
  const [jabatan, setJabatan] = useState('');
  const [unitKerja, setUnitKerja] = useState('');
  const [status, setStatus] = useState<'Aktif' | 'Nonaktif'>('Aktif');

  const handleOpenAdd = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('Staf / Seksi');
    setJabatan('');
    setUnitKerja('');
    setStatus('Aktif');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setJabatan(user.jabatan);
    setUnitKerja(user.unitKerja);
    setStatus(user.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !jabatan) return;

    if (editingUser) {
      updateUser(editingUser.id, {
        name,
        email,
        role,
        jabatan,
        unitKerja,
        status
      });
    } else {
      addUser({
        name,
        email,
        role,
        jabatan,
        unitKerja,
        status
      });
    }

    setIsModalOpen(false);
  };

  const roleDescriptions: Record<UserRole, string> = {
    'Super Admin': 'Akses penuh ke seluruh modul, konfigurasi instansi, dan manajemen akun',
    'Pimpinan': 'Menerbitkan lembar disposisi, menandatangani surat dinas keluar, dan rekap eksekutif',
    'Petugas Tata Usaha': 'Mencatat surat masuk, menerbitkan nomor agenda & registrasi surat keluar, arsip',
    'Staf / Seksi': 'Menerima dan menindaklanjuti disposisi sesuai dengan bidang tugas masing-masing'
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Daftar Pengguna & Hak Akses Persuratan
            </h3>
            <p className="text-xs text-slate-500">
              Kelola akun staf, arsiparis, administrator, dan pimpinan untuk tata kelola persuratan terpadu
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-2xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Pengguna Baru</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Nama & Email</th>
                <th className="py-3 px-4">Peran (Role)</th>
                <th className="py-3 px-4">Jabatan & Unit Kerja</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Terakhir Aktif</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => {
                const isCurrent = u.id === currentUser.id;

                return (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center text-xs font-bold text-white">
                          {u.avatarUrl ? (
                            <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            u.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] font-normal px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded">
                                Anda
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-semibold ${
                        u.role === 'Super Admin' ? 'text-purple-700' :
                        u.role === 'Pimpinan' ? 'text-blue-700' :
                        u.role === 'Petugas Tata Usaha' ? 'text-emerald-700' :
                        'text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{u.jabatan}</div>
                      <div className="text-[11px] text-slate-400">{u.unitKerja}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-medium ${
                        u.status === 'Aktif' ? 'text-emerald-700' : 'text-slate-400'
                      }`}>
                        ● {u.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {u.lastLogin}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isCurrent && (
                          <button
                            onClick={() => switchUser(u.id)}
                            className="px-2 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded text-[11px] font-medium transition-colors flex items-center gap-1"
                            title="Beralih ke akun ini untuk simulasi"
                          >
                            <LogIn className="w-3 h-3" />
                            <span>Beralih</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 rounded hover:bg-slate-100"
                          title="Ubah Data Pengguna"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {users.length > 1 && !isCurrent && (
                          <button
                            onClick={() => {
                              if (confirm(`Hapus pengguna ${u.name}?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                            title="Hapus Pengguna"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Descriptions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(['Super Admin', 'Pimpinan', 'Petugas Tata Usaha', 'Staf / Seksi'] as UserRole[]).map(r => (
          <div key={r} className="bg-white rounded-xl border border-slate-200 p-4 text-xs shadow-2xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{r}</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              {roleDescriptions[r]}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL: ADD / EDIT USER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingUser ? 'Ubah Akun Pengguna' : 'Tambah Pengguna Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siti Rahmawati, S.Kom."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Kedinasan *</label>
                <input
                  type="email"
                  required
                  placeholder="Contoh: s.rahmawati@instansi.go.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Peran Akses (Role)</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Pimpinan">Pimpinan</option>
                    <option value="Petugas Tata Usaha">Petugas Tata Usaha</option>
                    <option value="Staf / Seksi">Staf / Seksi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status Akun</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Aktif' | 'Nonaktif')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Jabatan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kepala Seksi Tata Kelola Layanan"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Unit Kerja / Bidang</label>
                <input
                  type="text"
                  placeholder="Contoh: Bidang Layanan E-Government"
                  value={unitKerja}
                  onChange={(e) => setUnitKerja(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  {editingUser ? 'Simpan Perubahan' : 'Buat Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
