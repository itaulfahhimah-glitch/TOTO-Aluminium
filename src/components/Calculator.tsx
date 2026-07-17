import React, { useState, useEffect } from "react";
import { MATERIAL_PRICES } from "../data";
import { CalculatorState } from "../types";
import { Calculator, ShieldCheck, RefreshCw, Smartphone, ClipboardCheck, Info } from "lucide-react";

interface CalculatorProps {
  onQuoteRequested: (calculatedCost: number, breakdownText: string, specifications: any) => void;
  preselectedWorkType?: string;
  preselectedBrand?: string;
}

export default function CalculatorComponent({ onQuoteRequested, preselectedWorkType, preselectedBrand }: CalculatorProps) {
  const [state, setState] = useState<CalculatorState>({
    workType: preselectedWorkType || "kusen-3",
    profileBrand: preselectedBrand || "alexindo",
    color: "silver",
    glassType: "clear-5",
    widthCm: 100,
    heightCm: 150,
    quantity: 1,
  });

  const [pricingResult, setPricingResult] = useState({
    aluminiumCost: 0,
    glassCost: 0,
    laborCost: 0,
    totalCost: 0,
    unitCost: 0,
    breakdownDesc: "",
  });

  // Calculate prices based on options
  useEffect(() => {
    const selectedWork = MATERIAL_PRICES.workTypes.find(w => w.id === state.workType) || MATERIAL_PRICES.workTypes[0];
    const selectedBrand = MATERIAL_PRICES.brands.find(b => b.id === state.profileBrand) || MATERIAL_PRICES.brands[0];
    const selectedColor = MATERIAL_PRICES.colors.find(c => c.id === state.color) || MATERIAL_PRICES.colors[0];
    const selectedGlass = MATERIAL_PRICES.glasses.find(g => g.id === state.glassType) || MATERIAL_PRICES.glasses[0];

    const widthM = state.widthCm / 100;
    const heightM = state.heightCm / 100;
    const areaM2 = widthM * heightM;
    const perimeterM = 2 * (widthM + heightM);

    let baseAluCost = 0;
    let baseGlassCost = 0;
    
    // Determine aluminum and glass requirements based on category
    if (selectedWork.category === "kusen") {
      // Kusen price is calculated per meter run (perimeter)
      baseAluCost = perimeterM * selectedWork.basePrice * selectedBrand.factor;
      // Add color premium per meter lari
      baseAluCost += perimeterM * selectedColor.addedCost;
      // No glass for pure kusen unless chosen, but if chosen we can add simple glass area
      baseGlassCost = areaM2 * selectedGlass.basePrice;
    } else if (selectedWork.category === "pintu" || selectedWork.category === "jendela") {
      // Per unit price
      baseAluCost = selectedWork.basePrice * selectedBrand.factor;
      // Add color premium per unit
      baseAluCost += selectedColor.addedCost;
      // Glass is included in unit area
      baseGlassCost = areaM2 * selectedGlass.basePrice;
    } else if (selectedWork.category === "kaca") {
      // Partisi frameless is calculated purely based on glass area
      baseAluCost = perimeterM * 50000; // minimal structural track
      baseGlassCost = areaM2 * selectedGlass.basePrice;
    }

    // Work out installation, sealant, and operational fees (estimated at 15% of material cost)
    const materialsSubtotal = baseAluCost + baseGlassCost;
    const baseLaborCost = Math.max(150000, materialsSubtotal * 0.15); // Min Rp 150.000 labor per element

    const unitTotal = materialsSubtotal + baseLaborCost;
    const totalWithQty = Math.round(unitTotal * state.quantity);

    // Format a neat text breakdown
    const breakdownDesc = `${selectedWork.name} (${selectedBrand.name}, Warna ${selectedColor.name}) ukuran ${state.widthCm}x${state.heightCm} cm dengan ${selectedGlass.name}. Jumlah: ${state.quantity} unit.`;

    setPricingResult({
      aluminiumCost: Math.round(baseAluCost * state.quantity),
      glassCost: Math.round(baseGlassCost * state.quantity),
      laborCost: Math.round(baseLaborCost * state.quantity),
      totalCost: totalWithQty,
      unitCost: Math.round(unitTotal),
      breakdownDesc
    });
  }, [state]);

  const handleInputChange = (field: keyof CalculatorState, value: any) => {
    setState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  const handleApplyToQuote = () => {
    onQuoteRequested(pricingResult.totalCost, pricingResult.breakdownDesc, {
      ...state,
      widthCm: state.widthCm,
      heightCm: state.heightCm,
    });
  };

  const handleWhatsAppShare = () => {
    const text = `Halo Toto Aluminium, saya telah menghitung estimasi biaya menggunakan kalkulator di website Anda:
    
*Jenis Pekerjaan:* ${pricingResult.breakdownDesc}
*Lebar:* ${state.widthCm} cm
*Tinggi:* ${state.heightCm} cm
*Profil Aluminium:* ${MATERIAL_PRICES.brands.find(b => b.id === state.profileBrand)?.name}
*Warna:* ${MATERIAL_PRICES.colors.find(c => c.id === state.color)?.name}
*Jenis Kaca:* ${MATERIAL_PRICES.glasses.find(g => g.id === state.glassType)?.name}
*Estimasi Total:* ${formatRupiah(pricingResult.totalCost)}

Saya ingin menjadwalkan survei pengukuran lapangan gratis ke lokasi saya. Mohon infonya!`;

    window.open(`https://wa.me/6285862492586?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-[#090d16] border-y border-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest bg-sky-950/80 border border-sky-900/55 px-3 py-1 rounded-full">
            Kalkulator Anggaran
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-100 tracking-tight">
            Hitung Estimasi Biaya Instan
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Dapatkan taksiran biaya pembuatan dan pemasangan kusen aluminium & kaca secara transparan dalam hitungan detik. Cukup masukkan ukuran dan pilih spesifikasi material Anda.
          </p>
        </div>

        {/* Calculator Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form Side */}
          <div className="lg:col-span-7 bg-[#0c1222]/85 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              <span>Pilihan Spesifikasi Material</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Work Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Jenis Pekerjaan</label>
                <select
                  value={state.workType}
                  onChange={(e) => handleInputChange("workType", e.target.value)}
                  className="w-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                >
                  {MATERIAL_PRICES.workTypes.map(w => (
                    <option key={w.id} value={w.id} className="bg-[#0c1222]">{w.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand Profile Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Merk Aluminium</label>
                <select
                  value={state.profileBrand}
                  onChange={(e) => handleInputChange("profileBrand", e.target.value)}
                  className="w-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                >
                  {MATERIAL_PRICES.brands.map(b => (
                    <option key={b.id} value={b.id} className="bg-[#0c1222]">{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Color Finish Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Warna Kusen</label>
                <select
                  value={state.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="w-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                >
                  {MATERIAL_PRICES.colors.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#0c1222]">{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Glass Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Jenis Kaca</label>
                <select
                  value={state.glassType}
                  onChange={(e) => handleInputChange("glassType", e.target.value)}
                  className="w-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                >
                  {MATERIAL_PRICES.glasses.map(g => (
                    <option key={g.id} value={g.id} className="bg-[#0c1222]">{g.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dimensional Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Lebar (cm)</label>
                <input
                  type="number"
                  min="30"
                  max="1000"
                  value={state.widthCm}
                  onChange={(e) => handleInputChange("widthCm", parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070b13] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Tinggi (cm)</label>
                <input
                  type="number"
                  min="30"
                  max="1000"
                  value={state.heightCm}
                  onChange={(e) => handleInputChange("heightCm", parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070b13] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-450 tracking-wide uppercase">Jumlah (unit)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={state.quantity}
                  onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 1)}
                  className="w-full bg-[#070b13] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {/* Informational Guidance Notice */}
            <div className="flex items-start space-x-3 bg-sky-500/5 border border-sky-500/20 p-4 rounded-xl">
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                <strong>Catatan Survei Lapangan:</strong> Estimasi di atas merupakan perhitungan material dan jasa dasar berdasar dimensi yang Anda masukkan. Toto Aluminium memberikan <strong>survei lapangan & pengukuran presisi gratis</strong> untuk memastikan ukuran siku lubang kusen sebelum proses pabrikasi akhir.
              </div>
            </div>
          </div>

          {/* Results Sidebar Display */}
          <div className="lg:col-span-5 bg-[#0c1222] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between self-stretch">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase font-bold">Hasil Kalkulasi Taksiran</span>
                <h3 className="font-display font-black text-xl text-white mt-0.5">Rincian Anggaran Pemasangan</h3>
              </div>

              {/* Price Breakdown Stack */}
              <div className="divide-y divide-slate-800 space-y-3.5 pt-2">
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-slate-400">Pabrikasi Kusen/Rangka:</span>
                  <span className="font-mono font-medium text-white">{formatRupiah(pricingResult.aluminiumCost)}</span>
                </div>
                <div className="flex justify-between text-sm pt-3.5">
                  <span className="text-slate-400">Biaya Kaca Pilihan:</span>
                  <span className="font-mono font-medium text-white">{formatRupiah(pricingResult.glassCost)}</span>
                </div>
                <div className="flex justify-between text-sm pt-3.5">
                  <span className="text-slate-400">Jasa Pemasangan & Sealant:</span>
                  <span className="font-mono font-medium text-white">{formatRupiah(pricingResult.laborCost)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-4 text-sky-400">
                  <span>Estimasi Total Biaya:</span>
                  <span className="font-mono text-lg sm:text-xl text-emerald-400">{formatRupiah(pricingResult.totalCost)}</span>
                </div>
              </div>

              {/* Live configuration details */}
              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-2">
                <p className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">Spesifikasi Item Terpilih:</p>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {pricingResult.breakdownDesc}
                </p>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-900/40 px-3.5 py-2.5 rounded-lg text-emerald-400 text-xs">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Termasuk free sealant penahan bocor & garansi fungsi.</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="space-y-2 pt-6 border-t border-slate-800">
              <button
                onClick={handleApplyToQuote}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-black text-xs sm:text-sm tracking-wider uppercase py-3.5 rounded-xl transition-all hover:scale-[1.01]"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Gunakan Data Untuk Penawaran</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-display font-bold text-xs tracking-wider uppercase py-3 rounded-xl transition-all"
              >
                <Smartphone className="w-4 h-4 text-sky-400" />
                <span>Kirim Estimasi Ke WA</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
