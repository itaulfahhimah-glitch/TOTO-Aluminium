import { Project, Testimonial } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Pintu Geser (Sliding) Kaca Bingkai Hitam Minimalis",
    category: "pintu-jendela",
    categoryLabel: "Pintu & Jendela",
    description: "Pemasangan pintu geser 4 daun dengan profil aluminium premium YKK AP warna Hitam Sand. Dirancang untuk memaksimalkan ruang santai keluarga yang menghadap langsung ke taman belakang.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    specs: {
      materials: "YKK AP Premium Anodized",
      color: "Hitam Sand (Doff)",
      glass: "Kaca Polos (Clear) 6mm Tempered",
      dimension: "W: 420cm, H: 240cm"
    },
    client: "Bpk. Hermawan S.",
    location: "Kawasan Residensial BSD City, Tangerang"
  },
  {
    id: "proj-2",
    title: "Partisi Sekat Ruang Meeting Kaca Tempered Kantor",
    category: "kaca-partisi",
    categoryLabel: "Kaca & Partisi",
    description: "Penyekatan ruang rapat direksi menggunakan kaca tempered tebal 10mm frameless dengan seal silikon kedap suara, ditopang dengan kusen aluminium Alexindo di bagian atas dan bawah.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    specs: {
      materials: "Alexindo Profile & Floor Hinge Dekkson",
      color: "Silver Matt (Anodized)",
      glass: "Kaca Tempered 10mm Clear + Stiker Sandblast Custom",
      dimension: "W: 600cm, H: 280cm"
    },
    client: "PT Indo Tech Solusindo",
    location: "Graha Mandiri, Jakarta Selatan"
  },
  {
    id: "proj-3",
    title: "Fasad Curtain Wall Struktur Aluminium Gedung Ruko",
    category: "fasad-kanopi",
    categoryLabel: "Fasad & Kanopi",
    description: "Sistem fasad curtain wall modern menggunakan rangka aluminium struktural tebal dengan kaca riben gelap untuk menahan radiasi sinar matahari dan memberikan privasi tinggi bagi penghuni kantor ruko 4 lantai.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    specs: {
      materials: "Inalum Curtain Wall Mullion & Transom",
      color: "Dark Slate Grey",
      glass: "Kaca Riben Gelap (Dark Grey) 8mm Tempered",
      dimension: "W: 1200cm, H: 1600cm"
    },
    client: "CV Maju Bersama Properti",
    location: "Gading Serpong, Tangerang Selatan"
  },
  {
    id: "proj-4",
    title: "Jendela Casement (Jungkit) & Sudut Aluminium Rumah Modern",
    category: "pintu-jendela",
    categoryLabel: "Pintu & Jendela",
    description: "Instalasi jendela casement dengan engsel gesekan geser (friction stay) kokoh yang tahan terpaan angin kencang di lantai dua, dipadu dengan kaca mati sudut untuk pencahayaan optimal.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    specs: {
      materials: "Alexindo Aluminium 4 Inch",
      color: "Putih Powder Coated",
      glass: "Kaca Polos 5mm",
      dimension: "W: 180cm, H: 150cm"
    },
    client: "Ibu Dian Pratiwi",
    location: "Kavling Residen Bintaro, Tangerang"
  },
  {
    id: "proj-5",
    title: "Kanopi Kaca Tempered Minimalis Penopang Spider Fitting",
    category: "fasad-kanopi",
    categoryLabel: "Fasad & Kanopi",
    description: "Kanopi kaca transparan estetis dengan bracket spider fitting stainless steel sus 304, menciptakan pencahayaan alami di area foyer masuk rumah tinggal utama.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    specs: {
      materials: "Struktur Besi Hollow & Spider Fitting SS304",
      color: "Hitam Protektif",
      glass: "Kaca Tempered Laminated 10mm (5mm+5mm Clear)",
      dimension: "W: 500cm, H: 300cm"
    },
    client: "Bpk. Aditya Wardhana",
    location: "Kawasan Pondok Indah, Jakarta Barat"
  },
  {
    id: "proj-6",
    title: "Kusen Aluminium & Pintu Lipat (Folding) Area Balkon",
    category: "kusen",
    categoryLabel: "Kusen & Lipat",
    description: "Pemasangan kusen dan pintu lipat aluminium motif urat kayu alami (woodgrain) yang dapat dibuka secara maksimal untuk menyatukan area ruang tengah dengan teras balkon luar.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    specs: {
      materials: "YKK AP Woodgrain Series",
      color: "Urat Kayu Alami (Teak Matte)",
      glass: "Kaca Polos 6mm",
      dimension: "W: 360cm, H: 230cm"
    },
    client: "Ibu Shanti L.",
    location: "Cluster Navapark, BSD City"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Hendra Wijaya",
    role: "Kontraktor Utama",
    company: "PT Artha Griya Konstruksi",
    comment: "Sangat puas bekerja sama dengan Toto Aluminium. Potongan kusen presisi, sambungan antar sudut mulus, dan pengerjaan sealant sangat rapi sehingga bebas bocor. Pengiriman tepat waktu sesuai jadwal proyek ruko di Gading Serpong.",
    rating: 5,
    projectCompleted: "Fasad Curtain Wall & Pintu Ruko"
  },
  {
    id: "t-2",
    name: "Ibu Meliana",
    role: "Pemilik Rumah",
    comment: "Awalnya bingung menentukan jenis pintu untuk sekat halaman belakang. Berkat konsultasi di workshop dan bantuan AI consultant, akhirnya memilih pintu sliding aluminium hitam YKK AP dengan kaca tempered. Hasilnya luar biasa, kokoh, dan ruangan terasa jauh lebih luas!",
    rating: 5,
    projectCompleted: "Pintu Geser Taman Belakang"
  },
  {
    id: "t-3",
    name: "Budi Santoso",
    role: "Manager Operasional",
    company: "Inovasi Ruang Kerja Co-working",
    comment: "Pemasangan sekat kaca tempered untuk 8 ruang kantor private dikerjakan dengan cepat dan aman. Teknisi Toto Aluminium sangat profesional, mengukur dengan siku-siku yang akurat sehingga tidak ada kaca yang miring atau bergoyang.",
    rating: 5,
    projectCompleted: "Partisi Kaca Tempered Kantor"
  }
];

export const MATERIAL_PRICES = {
  // Base prices per unit (meter / square meter / etc.)
  workTypes: [
    { id: "kusen-3", name: "Kusen Aluminium 3 inch (per meter lari)", basePrice: 110000, category: "kusen" },
    { id: "kusen-4", name: "Kusen Aluminium 4 inch (per meter lari)", basePrice: 135000, category: "kusen" },
    { id: "pintu-swing", name: "Pintu Swing Frame Aluminium (per unit)", basePrice: 1850000, category: "pintu" },
    { id: "pintu-sliding", name: "Pintu Geser (Sliding) Aluminium (per unit)", basePrice: 2100000, category: "pintu" },
    { id: "jendela-casement", name: "Jendela Casement / Jungkit (per unit)", basePrice: 950000, category: "jendela" },
    { id: "jendela-sliding", name: "Jendela Geser (Sliding) (per unit)", basePrice: 850000, category: "jendela" },
    { id: "partisi-frameless", name: "Partisi Kaca Frameless (per m²)", basePrice: 450000, category: "kaca" }
  ],
  brands: [
    { id: "inalum", name: "Inalum / Alkan (Standar Ekonomis)", factor: 1.0 },
    { id: "alexindo", name: "Alexindo (Standar Proyek Populer)", factor: 1.2 },
    { id: "ykk", name: "YKK AP (Premium Presisi & Kedap)", factor: 1.8 }
  ],
  colors: [
    { id: "silver", name: "Silver Anodized", addedCost: 0 },
    { id: "hitam-putih", name: "Hitam Sand / Putih Powder Coated", addedCost: 25000 }, // per m or unit
    { id: "cokelat", name: "Cokelat Anodized", addedCost: 10000 },
    { id: "urat-kayu", name: "Motif Urat Kayu (Premium Woodgrain)", addedCost: 85000 }
  ],
  glasses: [
    { id: "clear-5", name: "Kaca Polos (Clear) 5mm", basePrice: 180000 }, // per m²
    { id: "clear-8", name: "Kaca Polos (Clear) 8mm", basePrice: 280000 },
    { id: "riben-5", name: "Kaca Gelap (Riben/Rayban) 5mm", basePrice: 200000 },
    { id: "frosted-5", name: "Kaca Es (Frosted/Buram) 5mm", basePrice: 230000 },
    { id: "tempered-8", name: "Kaca Tempered 8mm (Super Kuat)", basePrice: 550000 },
    { id: "tempered-10", name: "Kaca Tempered 10mm (Sangat Kuat)", basePrice: 650000 },
    { id: "tempered-12", name: "Kaca Tempered 12mm (Maksimal Safety)", basePrice: 780000 }
  ]
};

export const FAQS = [
  {
    question: "Berapa lama proses pengerjaan kusen dan kaca di Toto Aluminium?",
    answer: "Proses pengerjaan bergantung pada volume dan kompleksitas proyek. Untuk rumah tinggal standar (pintu & jendela biasa), waktu fabrikasi di workshop membutuhkan waktu sekitar 4-7 hari kerja, dilanjutkan pemasangan di lokasi sekitar 2-3 hari. Untuk proyek berskala besar seperti curtain wall ruko, durasi disepakati sesuai SPK."
  },
  {
    question: "Apakah ada biaya tambahan untuk survei pengukuran lokasi?",
    answer: "Tidak ada biaya sama sekali. Survei pengukuran lapangan dan konsultasi desain awal di wilayah Tangerang, Tangerang Selatan, Jakarta Barat, dan Jakarta Selatan disediakan GRATIS tanpa ikatan kontrak apa pun."
  },
  {
    question: "Apa keunggulan kusen aluminium dibandingkan kusen kayu biasa?",
    answer: "Kusen aluminium memiliki daya tahan jauh lebih lama karena 100% anti-rayap, tidak mengalami muai-susut akibat perubahan cuaca ekstrim (sehingga pintu/jendela tidak macet), tahan air, anti-karat, ramah lingkungan, serta memberikan tampilan modern minimalis yang bersih."
  },
  {
    question: "Apakah produk pintu dan jendela dari Toto Aluminium bergaransi?",
    answer: "Tentu saja. Kami memberikan garansi kebocoran air (sealant) selama 3 bulan dan garansi kelancaran fungsi aksesoris engsel, kunci, serta roda sliding selama 6 bulan setelah tanggal pemasangan selesai."
  }
];
