import React from "react";
import { Hammer, ShieldCheck, Ruler, Sparkles, MessageSquare, Calculator } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-slate-950 overflow-hidden"
    >
      {/* Background Decorative Mesh Pattern & Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-900/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-slate-800/40 blur-[150px]"></div>
        {/* Subtle grid pattern for architectural look */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "radial-gradient(circle, rgba(2, 132, 199, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Context */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse-slow" />
              <span className="font-mono text-[10px] sm:text-xs text-sky-300 font-semibold uppercase tracking-wider">
                Bengkel Fabrikasi Resmi & Bergaransi
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] sm:leading-[1.15]">
              Mewujudkan Presisi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">
                Kusen Aluminium & Kaca
              </span> <br />
              untuk Hunian & Komersial.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Toto Aluminium menghadirkan solusi jendela casement, pintu geser minimalis, partisi kantor frameless, dan fasad curtain wall berkelas. Dikerjakan dengan material pilihan, presisi siku sempurna, dan sistem sealant tahan bocor.
            </p>

            {/* Unique Core Selling Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-slate-900/40 border border-slate-800/50 p-3.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white text-xs tracking-wide">100% Anti-Rayap & Air</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Bebas lapuk dan tidak memuai-susut.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-slate-900/40 border border-slate-800/50 p-3.5 rounded-xl">
                <Ruler className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white text-xs tracking-wide">Survei Lapangan Gratis</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Pengukuran lokasi & konsultasi gratis.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-slate-900/40 border border-slate-800/50 p-3.5 rounded-xl">
                <Hammer className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white text-xs tracking-wide">Garansi Kebocoran</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Jaminan kerapian sealant 3-6 bulan.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate("calculator")}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-4 rounded-xl shadow-lg shadow-sky-600/20 hover:shadow-sky-500/30 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <Calculator className="w-4 h-4" />
                <span>Kalkulator Estimasi</span>
              </button>

              <button
                onClick={() => onNavigate("consultant")}
                className="inline-flex items-center justify-center space-x-2 bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-white font-display font-semibold text-xs sm:text-sm tracking-wider uppercase px-6 py-4 rounded-xl transition-all hover:translate-y-[-1px]"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Konsultasi AI</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Structural Wireframe Backing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent rounded-2xl border border-sky-500/20 rotate-3 translate-x-3 translate-y-3 pointer-events-none z-0"></div>
            
            {/* Core Image Frame representing glass transparency */}
            <div className="relative bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-2xl z-10 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
                alt="Tata Ruang Kusen Aluminium dan Kaca Modern" 
                className="w-full h-[320px] sm:h-[400px] object-cover rounded-xl"
              />
              
              {/* Glass glassmorphism card floating */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-sky-400 uppercase font-semibold">Proyek Terbaru</span>
                  <h4 className="font-display font-bold text-sm text-white mt-0.5">Bintaro Residence Suite</h4>
                  <p className="text-[10px] text-slate-400">Kusen Alexindo Hitam Doff + Kaca Clear 5mm</p>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">SELESAI</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
