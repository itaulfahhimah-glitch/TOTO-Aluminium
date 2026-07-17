import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import CalculatorComponent from "./components/Calculator";
import AIConsultant from "./components/AI_Consultant";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import { TESTIMONIALS } from "./data";
import { Project } from "./types";
import { Star, MessageSquare, ShieldCheck, Award, ThumbsUp, Wrench, Sparkles, Phone, ArrowUp } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // States passed from portfolio or calculator to prefill contact form
  const [prefilledNotes, setPrefilledNotes] = useState("");
  const [prefilledCost, setPrefilledCost] = useState<number | undefined>(undefined);
  const [prefilledSpecs, setPrefilledSpecs] = useState<any | undefined>(undefined);

  const handleSelectProjectForEstimate = (project: Project) => {
    const notesText = `Saya tertarik dengan desain "${project.title}" yang saya lihat di portofolio Anda. Spesifikasi material: ${project.specs.materials}, Varian warna: ${project.specs.color}, Jenis kaca: ${project.specs.glass}, Dimensi pasang: ${project.specs.dimension}. Mohon berikan estimasi biaya pengerjaan dan jadwal kunjungan survei lapangan.`;
    
    setPrefilledNotes(notesText);
    setPrefilledCost(undefined); // Reset specific custom calculated cost as they picked a sample project
    setPrefilledSpecs({
      workType: project.category === "pintu-jendela" ? "pintu-sliding" : "kusen-3",
      profileBrand: "alexindo",
      color: "hitam-putih",
      glassType: "clear-5",
    });

    // Scroll to contact form smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleCalculatorQuoteRequest = (cost: number, breakdownDesc: string, specs: any) => {
    const notesText = `Saya telah menghitung taksiran biaya pemasangan melalui kalkulator online:
- Deskripsi: ${breakdownDesc}
- Lebar/Tinggi: ${specs.widthCm}x${specs.heightCm} cm
- Jumlah: ${specs.quantity} unit

Mohon dibuatkan penawaran harga resmi (SPK) dan koordinasikan jadwal pengukuran lapangan ke lokasi saya.`;

    setPrefilledNotes(notesText);
    setPrefilledCost(cost);
    setPrefilledSpecs(specs);

    // Scroll to contact form smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleClearPrefilled = () => {
    setPrefilledNotes("");
    setPrefilledCost(undefined);
    setPrefilledSpecs(undefined);
  };

  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b13] text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Header / Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero onNavigate={handleNavigateToSection} />

        {/* Brand Core Value Advantages Showcase */}
        <section className="py-20 bg-[#090d16] border-b border-slate-900/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="flex flex-col items-center text-center space-y-3.5 p-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/5">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-100">Pengalaman & Keandalan</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Lebih dari 10 tahun melayani pengerjaan ruko, ruko komersial, perumahan cluster mewah, dan partisi kantor modern.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3.5 p-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/5">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-100">Fabrikasi Mandiri (Workshop)</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Bahan dipotong & dirakit presisi di workshop mandiri menggunakan mesin potong hidrolik standar pabrikasi modern.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3.5 p-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-100">Aksesoris & Sealant SNI</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Hanya menggunakan sealant anti-UV tahan cuaca buruk serta aksesoris handle & engsel bermerk resmi seperti Dekkson/YKK.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3.5 p-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/5">
                  <ThumbsUp className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-100">Garansi Fungsi Kebocoran</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Setiap pekerjaan terjamin garansi pemeliharaan selama 3 bulan bebas biaya tambahan jika terjadi rembesan air hujan.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <Portfolio onSelectProjectForEstimate={handleSelectProjectForEstimate} />

        {/* Interactive Estimator Calculator */}
        <CalculatorComponent 
          onQuoteRequested={handleCalculatorQuoteRequest}
          preselectedWorkType={prefilledSpecs?.workType}
          preselectedBrand={prefilledSpecs?.profileBrand}
        />

        {/* Server-side AI Consultant Chat interface */}
        <AIConsultant onSelectProduct={(work, brand) => {}} />

        {/* Testimonials Review Slider */}
        <section className="py-24 bg-[#090d16] border-b border-slate-900/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest bg-sky-950/80 border border-sky-900/55 px-3 py-1 rounded-full">
                Ulasan Pelanggan
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-100 tracking-tight">
                Apa Kata Klien Setia Kami?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Kami bangga mendapatkan apresiasi dari pemilik hunian pribadi maupun kontraktor profesional atas komitmen kualitas bahan dan ketepatan waktu instalasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-[#0c1222]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-md hover:shadow-sky-500/5"
                >
                  <div className="space-y-3.5">
                    {/* Star Rating icons representation */}
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-350 leading-relaxed italic font-light">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-slate-200">{testimonial.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {testimonial.role} {testimonial.company ? `di ${testimonial.company}` : ""}
                      </p>
                    </div>
                    
                    <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {testimonial.projectCompleted}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Accordion FAQ Area */}
        <FAQ />

        {/* Contact Submission & Maps location section */}
        <Contact 
          prefilledNotes={prefilledNotes}
          prefilledCost={prefilledCost}
          prefilledSpecs={prefilledSpecs}
          onClearPrefilled={handleClearPrefilled}
        />

      </main>

      {/* Footer Area with elegant slate-950 layouts */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden border border-slate-800">
                  <img 
                    src="/logo.png" 
                    alt="Logo Toto Aluminium" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-display font-extrabold text-white text-base tracking-wide">
                  TOTO <span className="text-sky-500">ALUMINIUM</span>
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
                Spesialis terpercaya fabrikasi dan instalasi kusen aluminium, pintu geser minimalis, jendela jungkit, sekat kamar mandi tempered glass, dan partisi kaca kantor modern berkualitas tinggi.
              </p>
              
              <p className="text-[10px] text-slate-500 font-mono">
                Workshop: Karangbahagia, Kabupaten Bekasi, Jawa Barat
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Navigasi Cepat</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => handleNavigateToSection("home")} className="hover:text-sky-400 transition-colors">
                    Beranda
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToSection("portfolio")} className="hover:text-sky-400 transition-colors">
                    Katalog Portofolio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToSection("calculator")} className="hover:text-sky-400 transition-colors">
                    Kalkulator Estimasi Biaya
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToSection("consultant")} className="hover:text-sky-400 transition-colors">
                    Diskusi AI Konsultan
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Brand Material Brands */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Merk Profil & Aksesoris Resmi</h4>
              <p className="text-xs text-slate-450 leading-relaxed font-light">
                Kami berkomitmen menjaga kualitas jangka panjang dengan hanya menginstal merk resmi yang lolos uji kekuatan angin & air:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded">YKK AP Premium</span>
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded">Alexindo Standard</span>
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded">Inalum Profile</span>
                <span className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded">Dekkson Hardware</span>
              </div>
            </div>
          </div>

          {/* Bottom license statement */}
          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>&copy; {new Date().getFullYear()} Toto Aluminium & Glass. All Rights Reserved. Hak cipta dilindungi undang-undang.</p>
            <p className="font-mono text-right">Bekasi, Jawa Barat, Indonesia</p>
          </div>

        </div>
      </footer>

      {/* Floating Action WhatsApp shortcut button */}
      <a 
        href="https://wa.me/6285862492586?text=Halo%20Toto%20Aluminium%2C%20saya%20tertarik%20ingin%20jadwalkan%20survei%20lapangan%20gratis."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 sm:p-4 rounded-full shadow-2xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
        title="Hubungi WhatsApp Surveyor"
      >
        <Phone className="w-5.5 h-5.5 text-slate-950" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-display font-bold text-xs uppercase tracking-wider text-slate-950 whitespace-nowrap">
          WhatsApp Surveyor
        </span>
      </a>

      {/* Quick Scroll To Top mini fab */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-6 left-6 z-40 bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl border border-slate-800 shadow-xl opacity-80 hover:opacity-100 transition-all flex items-center justify-center"
        title="Kembali ke Atas"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
}
