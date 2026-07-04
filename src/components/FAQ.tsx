import React, { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-600 font-bold uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
            Tanya Jawab Umum
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
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
                    ? "bg-slate-50 border-slate-300/80 shadow-md" 
                    : "bg-white border-slate-200/60 hover:bg-slate-50/50"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-sky-500" : "text-slate-400"}`} />
                    <span className="font-display font-bold text-sm sm:text-base text-slate-800 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 p-1.5 rounded-lg bg-slate-100/80 group-hover:bg-slate-200 transition-all">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {/* Answer Accordion collapse */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-slate-200/60" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
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
