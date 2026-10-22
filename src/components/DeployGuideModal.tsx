import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  UploadCloud, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Globe, 
  CheckCircle2,
  FileCode2
} from 'lucide-react';

interface DeployGuideModalProps {
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sharedUrl = 'https://ais-pre-shwqeyaskgcwtnbqejwpag-244673753409.asia-northeast1.run.app';
  const devUrl = 'https://ais-dev-shwqeyaskgcwtnbqejwpag-244673753409.asia-northeast1.run.app';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitCommands = `# 1. Inisialisasi Git di lokal komputer Anda:
git init
git add .
git commit -m "feat: inisialisasi aplikasi manajemen surat masuk keluar"

# 2. Buat repositori baru di GitHub (misal: manajemen-surat)
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/manajemen-surat.git
git push -u origin main`;

  const vercelJsonCode = `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Panduan Simpan ke GitHub & Hosting Vercel.app
              </h3>
              <p className="text-xs text-slate-500">
                Aplikasi telah siap dijalankan dan dikonfigurasi untuk deployment instan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs text-slate-700">
          {/* Section 1: Live Ready URL */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2 font-bold text-emerald-900 text-sm">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Link Website Yang Sudah Siap Digunakan Langsung:</span>
            </div>
            <p className="text-emerald-800 text-xs mb-3">
              Aplikasi ini sudah aktif dan dapat langsung Anda buka, bagikan, atau uji coba di link berikut:
            </p>
            <div className="flex items-center justify-between gap-2 p-2.5 bg-white rounded-lg border border-emerald-300 font-mono text-[11px] text-emerald-950">
              <span className="truncate">{sharedUrl}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => copyToClipboard(sharedUrl, 'shared')}
                  className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-slate-50 rounded"
                  title="Salin Link"
                >
                  {copiedKey === 'shared' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={sharedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded flex items-center"
                  title="Buka Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: Simpan pada GitHub */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <GitBranch className="w-4 h-4 text-blue-600" />
              <span>Langkah 1: Simpan Kode ke GitHub</span>
            </div>
            <p className="text-slate-500">
              Jalankan perintah berikut di terminal komputer Anda setelah mengunduh/menyalin folder kode proyek ini:
            </p>
            <div className="relative bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
              <pre>{gitCommands}</pre>
              <button
                onClick={() => copyToClipboard(gitCommands, 'git')}
                className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                title="Salin Perintah Git"
              >
                {copiedKey === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Section 3: Hosting menggunakan Vercel.app */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <UploadCloud className="w-4 h-4 text-slate-900" />
              <span>Langkah 2: Hosting di Vercel (vercel.app)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1 leading-relaxed">
              <li>Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">vercel.com</a> dan masuk menggunakan akun GitHub Anda.</li>
              <li>Klik tombol <strong>"Add New..."</strong> &rarr; pilih <strong>"Project"</strong>.</li>
              <li>Pilih repositori <strong>manajemen-surat</strong> yang baru Anda push ke GitHub.</li>
              <li>Vercel akan otomatis mendeteksi konfigurasi:
                <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 text-slate-500">
                  <li>Framework Preset: <code>Vite</code></li>
                  <li>Build Command: <code>npm run build</code></li>
                  <li>Output Directory: <code>dist</code></li>
                </ul>
              </li>
              <li>File routing <code>vercel.json</code> sudah kami sediakan di dalam repositori agar tidak terjadi error 404 saat navigasi.</li>
              <li>Klik tombol <strong>"Deploy"</strong>. Dalam 1 menit website Anda akan aktif di <code>https://nama-proyek.vercel.app</code>!</li>
            </ol>
          </div>

          {/* Configuration file details */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Konfigurasi vercel.json (Sudah terpasang di root)</span>
              </span>
              <button
                onClick={() => copyToClipboard(vercelJsonCode, 'vercelJson')}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                {copiedKey === 'vercelJson' ? 'Tersalin' : 'Salin JSON'}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded border border-slate-200 overflow-x-auto">
              {vercelJsonCode}
            </pre>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold text-xs"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
