import React from 'react';
import { X, Check, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface UserSwitchModalProps {
  onClose: () => void;
}

export const UserSwitchModal: React.FC<UserSwitchModalProps> = ({ onClose }) => {
  const { users, currentUser, switchUser } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ganti Akun / Peran (Simulasi Multi-User)
            </h3>
            <p className="text-xs text-slate-500">
              Pilih profil pengguna untuk menguji hak akses persuratan dan disposisi
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {users.map(u => {
            const isSelected = u.id === currentUser.id;

            return (
              <button
                key={u.id}
                onClick={() => {
                  switchUser(u.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all text-xs ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/70 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-slate-700 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center text-xs font-bold text-white">
                    {u.avatarUrl ? (
                      <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      u.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{u.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{u.jabatan} · {u.unitKerja}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-semibold ${
                        u.role === 'Super Admin' ? 'text-purple-700' :
                        u.role === 'Pimpinan' ? 'text-blue-700' :
                        u.role === 'Petugas Tata Usaha' ? 'text-emerald-700' :
                        'text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-xs font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
