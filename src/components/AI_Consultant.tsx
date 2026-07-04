import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Send, Sparkles, MessageSquare, Shield, HelpCircle, ArrowRight, User } from "lucide-react";

interface AIConsultantProps {
  onSelectProduct: (workType: string, brand: string) => void;
}

export default function AIConsultant({ onSelectProduct }: AIConsultantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Selamat datang di Toto Aluminium. Saya adalah AI Konsultan ahli kusen aluminium dan kaca.\n\nApakah Anda sedang membangun atau merenovasi rumah? Silakan tanyakan hal seputar: \n- Perbandingan merk premium **YKK AP** vs kelas standar **Alexindo**\n- Jenis kaca paling aman (**Tempered** vs **Double Glass**)\n- Model hemat ruang seperti **Pintu Geser (Sliding)** atau **Pintu Lipat (Folding)**\n- Estimasi biaya atau teknis pemasangan sealant.\n\nBagaimana saya bisa membantu mewujudkan hunian idaman Anda hari ini?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "Bandingkan YKK vs Alexindo",
    "Rekomendasi pintu hemat ruang",
    "Kenapa harus Kaca Tempered?",
    "Apakah survei benar-benar gratis?"
  ];

  // Keep chat scrolled to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map message history cleanly for Express server
      const formattedHistory = [...messages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedHistory })
      });

      if (!response.ok) {
        throw new Error("Layanan konsultasi AI sedang sibuk.");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.text || "Mohon maaf, saya mengalami gangguan koneksi sementara. Silakan tanyakan lagi.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Failed to fetch AI answer:", error);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Maaf, sistem konsultasi AI gagal merespons. Namun jangan khawatir! Anda dapat langsung berkonsultasi secara cepat dan gratis dengan staf teknis kami melalui tombol WhatsApp yang tersedia.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Safe helper to format simple bold text (**bold**) and bullet points in response
  const formatMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Handle Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const bulletText = line.replace(/^[-*]\s+/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-slate-100 leading-relaxed mb-1 font-sans">
            {parseBoldText(bulletText)}
          </li>
        );
      }
      return (
        <p key={idx} className="text-sm text-slate-100 leading-relaxed mb-2 font-sans">
          {parseBoldText(line)}
        </p>
      );
    });
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-sky-300">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <section id="consultant" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-sky-600/20 blur-[130px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-900/20 blur-[110px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest bg-sky-950/80 border border-sky-900/55 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-sky-400 animate-pulse-slow" />
            <span>AI Konsultan Desain</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Konsultasi Interaktif Bertenaga AI
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Butuh saran ketebalan kusen, pembagian daun jendela, atau bingkai kaca minimalis? Tanyakan langsung ke AI Konsultan handal kami untuk jawaban teknis seketika.
          </p>
        </div>

        {/* Chat Module Container */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[580px]">
          
          {/* Header */}
          <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">Toto AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 font-semibold font-mono tracking-wide flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ONLINE & SIAP BERDISKUSI</span>
                </p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center space-x-1 text-slate-400 text-xs">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Saran Spesifikasi Berstandar SNI</span>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/35">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Profile Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-slate-800 border border-slate-700 text-white"
                      : "bg-gradient-to-tr from-sky-600 to-sky-400 text-white"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4.5 py-3.5 text-sm ${
                    msg.role === "user"
                      ? "bg-sky-600 text-white rounded-tr-none shadow-md shadow-sky-600/10"
                      : "bg-slate-850/90 border border-slate-800 text-slate-100 rounded-tl-none"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="space-y-1">
                      {formatMessageContent(msg.content)}
                    </div>
                  )}
                  <span className="block text-[9px] text-slate-400 text-right mt-1.5 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader Bubble */}
            {isLoading && (
              <div className="flex items-start gap-3 max-w-[70%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                </div>
                <div className="bg-slate-850 border border-slate-800 rounded-2xl rounded-tl-none px-5 py-4 flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions area */}
          <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-850 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">Rekomendasi:</span>
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="inline-flex items-center bg-slate-900 hover:bg-slate-800 border border-slate-800/80 rounded-lg px-3 py-1 text-xs text-slate-300 font-medium transition-colors disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input field controls */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tanyakan perbandingan aluminium, rekomendasi tebal kaca tempered..."
                disabled={isLoading}
                className="flex-1 bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all disabled:opacity-55"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white p-3.5 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
