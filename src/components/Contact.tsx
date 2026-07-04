import React, { useState, useEffect } from "react";
import { QuoteFormData } from "../types";
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, ClipboardCheck, ArrowRight } from "lucide-react";

interface ContactProps {
  prefilledNotes?: string;
  prefilledCost?: number;
  prefilledSpecs?: any;
  onClearPrefilled: () => void;
}

export default function Contact({ prefilledNotes, prefilledCost, prefilledSpecs, onClearPrefilled }: ContactProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
    refNumber?: string;
  } | null>(null);

  // Sync prefilled data from calculator clicks
  useEffect(() => {
    if (prefilledNotes) {
      setFormData(prev => ({
        ...prev,
        notes: prefilledNotes
      }));
    }
  }, [prefilledNotes]);

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsLoading(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculatedCost: prefilledCost,
          dimensions: prefilledSpecs ? `${prefilledSpecs.widthCm}x${prefilledSpecs.heightCm} cm` : null,
          projectType: prefilledSpecs?.workType || "Custom Project"
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmissionStatus({
          success: true,
          message: data.message,
          refNumber: data.referenceNumber
        });
        
        // Reset form except reference details
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          notes: "",
        });
        onClearPrefilled();
      } else {
        throw new Error(data.error || "Gagal mengirim formulir.");
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      setSubmissionStatus({
        success: false,
        message: err.message || "Terjadi kesalahan koneksi. Silakan coba hubungi kami langsung via WhatsApp."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-600 font-bold uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
            Ajukan Jadwal Survei
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Hubungi Kami & Minta Penawaran
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Mulai rancangan jendela, pintu sliding, atau kanopi kaca Anda bersama ahlinya. Isi formulir untuk survei lokasi gratis, atau langsung kunjungi workshop kami.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Info & Map Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Workshop & Contact Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase font-bold">Detail Workshop Resmi</span>
                <h3 className="font-display font-black text-xl text-white mt-0.5">Toto Aluminium & Glass</h3>
              </div>

              {/* Information Rows */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">Alamat Workshop</h4>
                    <p className="text-xs sm:text-sm text-slate-250 mt-1 leading-relaxed">
                      Jl. Raya Puspiptek No. 42, Kel. Setu, Kec. Setu, Kota Tangerang Selatan, Banten 15314
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Hotline & Telp</h4>
                    <a 
                      href="https://wa.me/6281234567890" 
                      target="_blank" 
                      className="text-xs sm:text-sm text-sky-300 font-semibold hover:underline mt-1 block"
                    >
                      +62 812-3456-7890 (Staf Survei Lapangan)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">Email Kantor</h4>
                    <a 
                      href="mailto:contact@totoaluminium.com" 
                      className="text-xs sm:text-sm text-slate-250 hover:underline mt-1 block"
                    >
                      contact@totoaluminium.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">Jam Operasional</h4>
                    <p className="text-xs sm:text-sm text-slate-250 mt-1">
                      Senin - Sabtu: 08:00 - 17:00 WIB<br />
                      <span className="text-emerald-400">(Minggu Tutup / Janji Survei Saja)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating Coverage Specs */}
              <div className="border-t border-slate-800 pt-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">Area Layanan Pemasangan:</span>
                <p className="text-xs text-slate-350 leading-relaxed font-light">
                  Seluruh Tangerang Raya (BSD, Bintaro, Karawaci, Serpong), DKI Jakarta (Barat, Selatan, Timur, Pusat), Depok, dan Bekasi Barat.
                </p>
              </div>
            </div>

            {/* Custom Interactive Mock Map View representing real physical workshop */}
            <div className="relative bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm space-y-3">
              <span className="font-mono text-[9px] tracking-wider text-sky-600 font-bold uppercase block">Peta Lokasi Bengkel</span>
              <div className="relative h-44 bg-slate-100 rounded-xl overflow-hidden border border-slate-200/50 flex items-center justify-center">
                
                {/* Visual grid representing streets */}
                <div className="absolute inset-0 opacity-15" style={{
                  backgroundImage: "linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }}></div>
                
                {/* Road overlays */}
                <div className="absolute w-full h-8 bg-white top-16 rotate-1"></div>
                <div className="absolute h-full w-8 bg-white left-20 rotate-12"></div>
                
                {/* Pin pointer */}
                <div className="absolute z-10 flex flex-col items-center">
                  <div className="bg-slate-900 border border-sky-400 text-white font-display font-bold text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-md shadow-md flex items-center space-x-1.5 mb-1 animate-pulse-slow">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>TOTO ALUMINIUM</span>
                  </div>
                  <div className="w-4 h-4 bg-sky-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  Puspiptek Raya, Tangsel
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form Submission Panel */}
          <div className="lg:col-span-7 bg-white border border-slate-200/85 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {submissionStatus?.success ? (
              // Success Screen View
              <div className="space-y-6 text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                    Permintaan Kuotasi Terkirim!
                  </h3>
                  <div className="inline-block bg-slate-900 text-sky-400 font-mono text-sm font-bold tracking-wider px-4 py-1.5 rounded-lg border border-slate-800">
                    No. Ref: {submissionStatus.refNumber}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto pt-2">
                    {submissionStatus.message}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-xl text-left text-xs text-slate-500 space-y-1.5 max-w-md mx-auto">
                  <p className="font-semibold text-slate-700">Apa langkah selanjutnya?</p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Staf survei lapangan kami akan memverifikasi alamat Anda via WhatsApp.</li>
                    <li>Kami menjadwalkan kunjungan gratis membawa katalog fisik & contoh potongan profil.</li>
                    <li>Survei lapangan dan penawaran harga resmi (SPK) dirilis 1x24 jam setelah survei.</li>
                  </ul>
                </div>

                <button
                  onClick={() => setSubmissionStatus(null)}
                  className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-lg transition-colors"
                >
                  <span>Kirim Formulir Baru</span>
                </button>
              </div>
            ) : (
              // Standard Active Form View
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-sky-500" />
                    <span>Formulir Rencana Pemasangan</span>
                  </h3>
                  {prefilledCost ? (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-1 rounded">
                      ADA ESTIMASI AKTIF
                    </span>
                  ) : null}
                </div>

                {/* Optional calculator sync banner */}
                {prefilledCost ? (
                  <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-sky-600 uppercase font-bold tracking-widest">Detail Estimasi Disematkan:</span>
                      <p className="text-xs text-slate-700 font-medium line-clamp-1">
                        {prefilledNotes}
                      </p>
                      <p className="text-xs font-bold text-slate-900">
                        Perkiraan Budget: <span className="text-emerald-600">{formatRupiah(prefilledCost)}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearPrefilled}
                      className="text-[10px] font-mono uppercase font-bold text-rose-600 hover:underline shrink-0"
                    >
                      Batal
                    </button>
                  </div>
                ) : null}

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. Hermawan"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Email (Opsional)</label>
                    <input
                      type="email"
                      placeholder="Contoh: nama@domain.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Alamat Lokasi Pemasangan / Survei *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tuliskan alamat lengkap beserta nomor rumah dan perumahan/kantor untuk kunjungan tim surveyor."
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Catatan Kebutuhan Tambahan / Keterangan</label>
                    <textarea
                      rows={4}
                      placeholder="Contoh: Saya membutuhkan jendela casement lantai 2 dan sekat kaca tempered untuk kamar mandi basah..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {submissionStatus?.success === false && (
                  <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl">
                    {submissionStatus.message}
                  </div>
                )}

                {/* Submit action button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-sky-600 text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>Memproses Pengiriman...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim & Jadwalkan Survei Gratis</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
