import React from "react";
import { BookOpen, GraduationCap, MapPin, Award, Building, ArrowLeft, ArrowRight, ShieldCheck, Heart } from "lucide-react";

interface AboutUsProps {
  onBackToHome: () => void;
}

export default function AboutUs({ onBackToHome }: AboutUsProps) {
  return (
    <div className="py-24 bg-[#070b13] min-h-[75vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center space-x-2.5">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-sky-400 hover:text-sky-350 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        {/* Hero title block */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest bg-sky-950/80 border border-sky-900/55 px-3 py-1 rounded-full">
            Tentang Kami & Informasi Situs
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-tight">
            Komitmen Kami & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
              Dedikasi Pendidikan
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-light">
            Toto Aluminium & Glass adalah spesialis pengerjaan kusen, pintu sliding, dan partisi kaca terpercaya. Di samping itu, platform digital ini juga berfungsi sebagai bagian penting dari karya pengembangan akademis tingkat tinggi.
          </p>
        </div>

        {/* Academic UAS STIE Ekadharma Indonesia Announcement Box */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#111a30] border-2 border-sky-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-sky-500/5 space-y-6">
          {/* Subtle background glow */}
          <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 shadow-lg shadow-sky-500/10">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-3 flex-1">
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase font-bold bg-sky-950/85 px-2.5 py-1 rounded-md border border-sky-900/40">
                Pernyataan Akademik / UAS
              </span>
              <p className="font-display font-bold text-lg sm:text-xl text-slate-100 leading-snug">
                Ujian Akhir Semester (UAS)
              </p>
              
              {/* MANDATORY TEXT REQUESTED BY USER */}
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed bg-slate-950/40 p-4.5 rounded-xl border border-slate-800/80 italic">
                &ldquo;Website ini dibuat sebagai ujian Akhir semester Mata Kuliah Aplikasi komputer Bisnis kampus STIE Ekadharma Indonesia&rdquo;
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Aplikasi Komputer Bisnis</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Building className="w-4 h-4 text-sky-400" />
              <span>STIE Ekadharma Indonesia</span>
            </div>
          </div>
        </div>

        {/* Additional Company details for premium realistic aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0c1222]/55 border border-slate-850 p-6 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-sky-400">
              <Award className="w-5 h-5" />
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-200">Visi & Misi</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Membangun infrastruktur hunian dan komersial yang kokoh, berestetika modern, serta memberikan efisiensi biaya terbaik melalui integrasi teknologi kalkulator estimasi instan.
            </p>
          </div>

          <div className="bg-[#0c1222]/55 border border-slate-850 p-6 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-sky-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-200">Integritas Akademis</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Proyek ini mencerminkan penguasaan alat digital modern, analisis kebutuhan pasar, dan rancangan UX/UI responsif dalam konteks kurikulum komputer bisnis praktis.
            </p>
          </div>
        </div>

        {/* CTA to return home */}
        <div className="pt-6 text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-600/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Jelajahi Beranda Utama</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
