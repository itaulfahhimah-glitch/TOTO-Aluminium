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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#111a30] border-2 border-sky-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-sky-500/5">
          {/* Subtle background glow */}
          <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            
            {/* Left Column: Student Profile Photo & Info */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
              <span className="font-mono text-[9px] tracking-widest text-sky-400 uppercase font-bold bg-sky-950/85 px-2 py-0.5 rounded border border-sky-900/40">
                Pengembang Aplikasi
              </span>
              
              {/* Photo Frame with premium design */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative w-36 h-48 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/60 flex items-center justify-center">
                  <img 
                    src="/toto_supriatna.jpg" 
                    alt="Toto Supriatna" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback in case of loading error
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>
              </div>

              {/* Identity Metadata */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-base sm:text-lg text-slate-100 tracking-tight">
                  Toto Supriatna
                </h3>
                <p className="font-mono text-xs text-sky-400 font-semibold">
                  NIM: 12250030
                </p>
                <p className="text-[11px] text-slate-400 font-light">
                  Mahasiswa STIE Ekadharma Indonesia
                </p>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>UAS Terverifikasi</span>
              </div>
            </div>

            {/* Right Column: Statement, Impressions & Context */}
            <div className="md:col-span-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <GraduationCap className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-sky-400 uppercase font-bold">
                      Pernyataan Akademik / UAS
                    </span>
                    <p className="font-display font-bold text-base text-slate-100 leading-none mt-0.5">
                      Ujian Akhir Semester (UAS)
                    </p>
                  </div>
                </div>
                
                {/* MANDATORY TEXT REQUESTED BY USER */}
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 italic relative">
                  <span className="absolute -top-3 left-3 text-3xl text-sky-500/20 font-serif leading-none">&ldquo;</span>
                  &ldquo;Website ini dibuat sebagai ujian Akhir semester Mata Kuliah Aplikasi komputer Bisnis kampus STIE Ekadharma Indonesia&rdquo;
                  <span className="absolute -bottom-6 right-3 text-3xl text-sky-500/20 font-serif leading-none">&rdquo;</span>
                </p>
              </div>

              {/* User requested Impressions (Kesan selama kuliah) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-150">Kesan Mengikuti Perkuliahan</h4>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light bg-slate-950/20 p-3.5 rounded-xl border border-slate-850/60">
                  Perkuliahan <strong className="text-sky-400 font-semibold">Aplikasi Komputer Bisnis</strong> di STIE Ekadharma Indonesia telah memberikan pengalaman belajar yang sangat luar biasa dan berharga. Mata kuliah ini tidak hanya mengajarkan teori, tetapi juga memberikan pemahaman mendalam tentang bagaimana teknologi digital modern dapat diintegrasikan secara nyata untuk memecahkan problem operasional bisnis, seperti pembuatan kalkulator estimasi biaya otomatis dan asisten berbasis kecerdasan buatan. Dosen pembimbing menyampaikan materi secara interaktif dan praktis, sehingga melatih kreativitas, ketelitian, dan logika pemecahan masalah kami guna menghadapi tantangan digitalisasi industri di masa depan.
                </p>
              </div>

              {/* Academic Details footer inside card */}
              <div className="border-t border-slate-800/80 pt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400 font-mono">
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  <span>Aplikasi Komputer Bisnis</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-sky-400" />
                  <span>STIE Ekadharma Indonesia</span>
                </div>
              </div>
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
