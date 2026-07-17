import React, { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#070b13] border-y border-slate-900/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest bg-sky-950/80 border border-sky-900/55 px-3 py-1 rounded-full">
            Tanya Jawab Umum
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-100 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Temukan jawaban langsung seputar garansi pengerjaan, jangka waktu fabrikasi, layanan survei lapangan gratis, hingga kualitas material kusen kami.
          </p>
        </div>

        {/* FAQ Accordion Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? "bg-[#0c1222]/80 border-slate-750 shadow-lg shadow-sky-500/5" 
                    : "bg-[#0c1222]/45 border-slate-800/85 hover:bg-[#0c1222]/75"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-sky-400" : "text-slate-500"}`} />
                    <span className="font-display font-bold text-sm sm:text-base text-slate-200 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 p-1.5 rounded-lg bg-slate-900/80 group-hover:bg-slate-800 transition-all">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-200" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Answer Accordion collapse */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-slate-800/80" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
