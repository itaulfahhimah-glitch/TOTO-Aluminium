import React, { useState } from "react";
import { PORTFOLIO_PROJECTS } from "../data";
import { Project } from "../types";
import { MapPin, Info, ArrowRight, ClipboardCheck } from "lucide-react";

interface PortfolioProps {
  onSelectProjectForEstimate: (project: Project) => void;
}

export default function Portfolio({ onSelectProjectForEstimate }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "semua", label: "Semua Proyek" },
    { id: "pintu-jendela", label: "Pintu & Jendela" },
    { id: "kusen", label: "Kusen Aluminium" },
    { id: "kaca-partisi", label: "Partisi Kaca" },
    { id: "fasad-kanopi", label: "Fasad & Kanopi" }
  ];

  const filteredProjects = selectedCategory === "semua"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-600 font-bold uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
            Katalog Hasil Kerja
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Portofolio Pekerjaan Terbaik Kami
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Jelajahi galeri proyek nyata pemasangan kusen aluminium dan kaca yang telah kami selesaikan dengan presisi tinggi di berbagai perumahan, gedung ruko, dan perkantoran.
          </p>
        </div>

        {/* Categories Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedProject(null);
              }}
              className={`px-4 py-2.5 rounded-full font-display font-semibold text-xs sm:text-sm tracking-wide transition-all ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              id={project.id}
              className="group bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              {/* Project Image Frame */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md font-semibold">
                  {project.categoryLabel}
                </span>
              </div>

              {/* Project Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-medium tracking-wide truncate">{project.location}</span>
                  </div>
                  
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Structural Spec Grid */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 mt-4">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Rangka Aluminium:</span>
                      <span className="font-semibold text-slate-800 text-right">{project.specs.materials}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Varian Warna:</span>
                      <span className="font-semibold text-slate-800 text-right">{project.specs.color}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Spesifikasi Kaca:</span>
                      <span className="font-semibold text-slate-800 text-right">{project.specs.glass}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Dimensi Pasang:</span>
                      <span className="font-semibold text-slate-800 text-right font-mono">{project.specs.dimension}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/60 mt-6 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onSelectProjectForEstimate(project)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 hover:bg-sky-600 hover:border-sky-600 border border-slate-900 text-white py-2.5 px-3 rounded-lg font-display font-bold text-[11px] tracking-wider uppercase transition-all"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Pakai Desain Ini</span>
                  </button>
                  <button
                    onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                    className="flex items-center justify-center space-x-1.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 py-2.5 px-3 rounded-lg font-display font-semibold text-[11px] tracking-wider uppercase transition-all"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{selectedProject?.id === project.id ? "Tutup Detail" : "Info Client"}</span>
                  </button>
                </div>
              </div>

              {/* Client Info Banner */}
              {selectedProject?.id === project.id && (
                <div className="px-6 pb-6 pt-2 bg-sky-50/50 border-t border-sky-100 rounded-b-2xl animate-fade-in">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-sky-600 uppercase font-bold tracking-widest">Detail Pelanggan</span>
                    <p className="text-xs font-semibold text-slate-800">Nama Klien: {project.client}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Proyek dikerjakan secara custom menyesuaikan estetika fasad arsitektur utama. Klien memilih pemasangan di lokasi dan dibersihkan rapi (serah terima bersih).
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
