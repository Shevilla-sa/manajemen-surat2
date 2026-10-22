import React from 'react';
import { Printer, X, Download } from 'lucide-react';
import { SuratMasuk, Disposisi } from '../types';
import { useApp } from '../context/AppContext';

interface PrintDisposisiViewProps {
  surat: SuratMasuk;
  disposisi?: Disposisi;
  onClose: () => void;
}

export const PrintDisposisiView: React.FC<PrintDisposisiViewProps> = ({
  surat,
  disposisi,
  onClose
}) => {
  const { instansiConfig } = useApp();

  const handlePrint = () => {
    window.print();
  };

  // Standard official instruction checklist
  const standardInstructions = [
    'Tindak lanjuti segera',
    'Tanggapi / balas tertulis',
    'Pelajari / teliti materi',
    'Koordinasikan dengan bidang terkait',
    'Hadiri / wakili pimpinan',
    'Siapkan bahan rapat / paparan',
    'Untuk diketahui / pedoman kerja',
    'Arsipkan / simpan berkas'
  ];

  const activeDisposisi = disposisi || surat.disposisiList[0] || {
    id: 'draft',
    suratId: surat.id,
    instruksi: ['Tindak lanjuti segera'],
    tujuanJabatan: 'Kepala Bidang / Seksi Terkait',
    tujuanNama: '-',
    catatan: 'Segera laksanakan sesuai ketentuan yang berlaku.',
    tanggalDisposisi: new Date().toISOString().split('T')[0],
    batasWaktu: '',
    status: 'Menunggu',
    pemberiNama: instansiConfig.kepalaNama,
    pemberiJabatan: instansiConfig.kepalaJabatan
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Pratinjau Lembar Disposisi Resmi</span>
            <span className="text-xs text-slate-400 font-mono">({surat.noAgenda})</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sekarang (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area (A4 style) */}
        <div className="p-8 sm:p-12 text-black bg-white" id="printable-disposisi">
          {/* Official Letterhead / Kop Surat */}
          <div className="border-b-4 border-double border-black pb-3 mb-4">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 shrink-0">
                <img 
                  src={instansiConfig.logoUrl || '/src/assets/images/instansi_emblem_1792633907279.jpg'} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-center pr-10">
                <h3 className="font-bold text-sm tracking-wide uppercase leading-tight">
                  {instansiConfig.namaInstansi}
                </h3>
                <h2 className="font-extrabold text-base tracking-tight uppercase leading-tight mt-0.5">
                  {instansiConfig.namaSubInstansi}
                </h2>
                <p className="text-[11px] leading-tight text-gray-700 mt-1">
                  {instansiConfig.alamat}, {instansiConfig.kota} {instansiConfig.kodePos}
                </p>
                <p className="text-[11px] leading-tight text-gray-700">
                  Telp: {instansiConfig.telepon} · Email: {instansiConfig.email} · Web: {instansiConfig.website}
                </p>
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-4">
            <h1 className="text-base font-extrabold tracking-wider underline uppercase">
              LEMBAR DISPOSISI
            </h1>
            <p className="text-xs text-gray-600 font-mono">
              NOMOR AGENDA: {surat.noAgenda}
            </p>
          </div>

          {/* Metadata Table */}
          <table className="w-full border-collapse border border-black text-xs mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-50 w-32">Surat Dari</td>
                <td className="border border-black p-2">{surat.asalSurat}</td>
                <td className="border border-black p-2 font-semibold bg-gray-50 w-32">Diterima Tanggal</td>
                <td className="border border-black p-2 font-mono">{surat.tanggalTerima}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-50">Nomor Surat</td>
                <td className="border border-black p-2 font-mono">{surat.noSurat}</td>
                <td className="border border-black p-2 font-semibold bg-gray-50">Nomor Agenda</td>
                <td className="border border-black p-2 font-mono font-bold">{surat.noAgenda}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-50">Tanggal Surat</td>
                <td className="border border-black p-2 font-mono">{surat.tanggalSurat}</td>
                <td className="border border-black p-2 font-semibold bg-gray-50">Sifat Surat</td>
                <td className="border border-black p-2">
                  <span className="font-bold uppercase tracking-wider">{surat.sifat}</span>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-50">Perihal</td>
                <td colSpan={3} className="border border-black p-2 font-medium">
                  {surat.perihal}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Instructions and Direction Area */}
          <div className="border border-black p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Left: Diteruskan Kepada & Instruksi */}
              <div className="space-y-3 border-r border-black/30 pr-4">
                <div>
                  <span className="text-xs font-bold uppercase block mb-1">
                    Diteruskan Kepada Sdr:
                  </span>
                  <div className="p-2 border border-black bg-gray-50 text-xs font-semibold">
                    {activeDisposisi.tujuanJabatan}
                    {activeDisposisi.tujuanNama && (
                      <span className="block font-normal text-gray-700">
                        ({activeDisposisi.tujuanNama})
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase block mb-1.5">
                    Instruksi / Disposisi:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {standardInstructions.map((item, idx) => {
                      const isChecked = activeDisposisi.instruksi?.some(i => 
                        i.toLowerCase().includes(item.toLowerCase().split(' ')[0])
                      );
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-black text-white font-bold' : ''
                          }`}>
                            {isChecked ? '✓' : ''}
                          </div>
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Catatan & Tanda Tangan */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase block mb-1">
                    Catatan / Petunjuk Pimpinan:
                  </span>
                  <div className="p-3 border border-black min-h-[140px] text-xs leading-relaxed bg-white">
                    {activeDisposisi.catatan || 'Mohon segera ditindaklanjuti sesuai dengan SOP dan laporkan perkembangannya.'}
                    {activeDisposisi.batasWaktu && (
                      <p className="mt-3 text-[11px] font-semibold text-red-600">
                        Batas Waktu Penyelesaian: {activeDisposisi.batasWaktu}
                      </p>
                    )}
                  </div>
                </div>

                {/* Signature Box */}
                <div className="text-right pt-4 text-xs">
                  <p>{instansiConfig.kota}, {activeDisposisi.tanggalDisposisi || new Date().toISOString().split('T')[0]}</p>
                  <p className="font-semibold">{activeDisposisi.pemberiJabatan || instansiConfig.kepalaJabatan}</p>
                  <div className="h-16 flex items-end justify-end">
                    <span className="text-[10px] text-gray-400 italic">(Tanda Tangan & Cap Dinas)</span>
                  </div>
                  <p className="font-bold underline uppercase">{activeDisposisi.pemberiNama || instansiConfig.kepalaNama}</p>
                  <p className="text-[11px] text-gray-600">NIP. {instansiConfig.kepalaNip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Receipt Confirmation */}
          <div className="border border-black p-2 text-[10px] text-gray-600 flex justify-between items-center">
            <span>Sistem Tata Usaha & Kearsipan Elektronik</span>
            <span>Dicetak pada: {new Date().toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
