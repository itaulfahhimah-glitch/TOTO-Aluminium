import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI Consultant will run in demo/fallback mode.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

// API Route: AI Consultation
app.post("/api/consult", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Format request tidak valid. Diperlukan array messages." });
  }

  // Fallback if API key is not present
  if (!ai) {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let mockResponse = "Halo! Terima kasih telah menghubungi Toto Aluminium. Saat ini sistem AI kami sedang dalam mode demo. \n\n";
    
    if (lastUserMessage.toLowerCase().includes("harga") || lastUserMessage.toLowerCase().includes("biaya")) {
      mockResponse += "Untuk estimasi biaya pengerjaan kusen aluminium dan kaca, Anda dapat menggunakan menu 'Kalkulator Estimasi' di atas. Kami menyediakan pilihan profil aluminium merk YKK AP (Premium), Alexindo (Standar Berkualitas), dan Inalum dengan berbagai pilihan kaca seperti Tempered, Clear, dan Riben.";
    } else if (lastUserMessage.toLowerCase().includes("pintu") || lastUserMessage.toLowerCase().includes("jendela")) {
      mockResponse += "Kami melayani pembuatan Pintu Swing Aluminium, Pintu Geser (Sliding) hemat ruang, Jendela Casement (Jungkit), Jendela Sliding, serta berbagai partisi kaca tempered untuk kantor maupun rumah tinggal. Profil aluminium kami dijamin anti-rayap, tahan air, dan kokoh.";
    } else if (lastUserMessage.toLowerCase().includes("kaca") || lastUserMessage.toLowerCase().includes("tempered")) {
      mockResponse += "Untuk keamanan optimal pada pintu shower, partisi kantor, atau fasad bangunan, kami sangat menyarankan Kaca Tempered dengan ketebalan 8mm hingga 12mm yang memiliki ketahanan 4-5 kali lipat dibanding kaca biasa.";
    } else {
      mockResponse += "Tentu, kami dapat merancang dan memasang berbagai kebutuhan kusen aluminium dan kaca Anda. Apakah Anda memerlukan informasi mengenai ketebalan bahan, pilihan warna (Hitam, Putih, Silver, Cokelat, Urat Kayu), atau ingin berkonsultasi mengenai tata letak ruang pintu geser Anda?";
    }
    
    return res.json({ text: mockResponse });
  }

  try {
    // Format conversation history for Gemini Chat
    // Use the latest gemini-3.5-flash as per @google/genai guidelines
    const systemInstruction = `Anda adalah AI Konsultan ahli untuk 'Toto Aluminium', sebuah toko dan workshop spesialis pengerjaan kusen aluminium, jendela, pintu, partisi kaca, shower screen, canopy kaca, dan fasad curtain wall berkualitas tinggi.
Tugas Anda adalah memberikan rekomendasi teknis, estetika, dan fungsional yang sangat detail, ramah, profesional, dan jujur dalam bahasa Indonesia yang santun.

Aturan Konsultasi Anda:
1. Rekomendasikan merk profil aluminium sesuai budget/kebutuhan pelanggan:
   - YKK AP: Kualitas premium tertinggi, presisi, kedap suara, finishing anodized sangat halus. Cocok untuk perumahan mewah.
   - Alexindo: Kualitas menengah ke atas, sangat populer, kokoh, pilihan ekonomis-menengah terbaik.
   - Inalum / Alkan: Kualitas standar proyek, sangat ekonomis, fungsional.
2. Warna aluminium yang tersedia: Hitam Sand (Doff), Putih, Silver (Anodized), Cokelat, dan Urat Kayu (Woodgrain - memberikan nuansa hangat alami).
3. Rekomendasi jenis kaca:
   - Kaca Clear/Polos (5mm - 8mm): Untuk pencahayaan maksimal dan pandangan jernih.
   - Kaca Es/Frosted (5mm): Untuk privasi tinggi, cocok untuk kamar mandi atau partisi ruangan tertentu.
   - Kaca Riben/Gelap (5mm - 8mm, hitam/abu-abu): Menahan silau matahari dan panas, menjaga privasi dari luar.
   - Kaca Tempered (8mm, 10mm, 12mm): Kaca super kuat dengan standar keamanan tinggi. Wajib untuk pintu kaca tanpa bingkai (frameless), partisi shower, sekat kantor, atau canopy.
   - Kaca Double Glass (laminated/insulation): Untuk kekedapan suara maksimal dan isolasi suhu ekstrim.
4. Berikan tips pemasangan, seperti pentingnya sealant silikon berkualitas tinggi agar tidak bocor saat hujan deras, dan pengukuran dinding yang wajib presisi (siku-siku) sebelum fabrikasi kusen dilakukan.
5. Jawab pertanyaan pelanggan dengan ramah, berikan poin-poin yang mudah dipahami (scannable), dan arahkan mereka untuk menggunakan "Kalkulator Estimasi" di situs kami untuk menghitung budget awal secara otomatis, lalu mengisi formulir kontak agar tim surveyor lapangan kami bisa menjadwalkan kunjungan gratis ke lokasi mereka.`;

    // Map conversation messages
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Mohon maaf, saya tidak dapat merumuskan jawaban saat ini. Silakan tanyakan hal lain.";
    return res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      error: "Terjadi kesalahan pada layanan konsultasi AI kami.", 
      details: error.message 
    });
  }
});

// API Route: Submit Quote Request / Contact Form
app.post("/api/quote", (req, res) => {
  const { name, phone, email, address, projectType, notes, calculatedCost, dimensions } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Nama dan Nomor Telepon wajib diisi." });
  }

  // In a real application, you would save this to a database like Firestore, or send an email/WhatsApp notification.
  // Since we are building an elegant client-server app, we will return a success state with a reference number.
  const referenceNumber = `TOTO-${Math.floor(1000 + Math.random() * 9000)}`;

  return res.json({
    success: true,
    message: "Permintaan kuotasi berhasil diterima! Tim surveyor lapangan Toto Aluminium akan segera menghubungi Anda dalam waktu 1x24 jam untuk melakukan konfirmasi jadwal kunjungan.",
    referenceNumber,
    dataReceived: {
      name,
      phone,
      email,
      address,
      projectType,
      calculatedCost: calculatedCost || null,
      dimensions: dimensions || null,
      notes,
      submittedAt: new Date().toISOString()
    }
  });
});

// Setup Vite Dev server or Serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Toto Aluminium berjalan di http://localhost:${PORT}`);
  });
}

startServer();
