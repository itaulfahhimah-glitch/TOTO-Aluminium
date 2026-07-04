export interface Project {
  id: string;
  title: string;
  category: "kusen" | "pintu-jendela" | "kaca-partisi" | "fasad-kanopi";
  categoryLabel: string;
  description: string;
  image: string;
  specs: {
    materials: string;
    color: string;
    glass: string;
    dimension: string;
  };
  client: string;
  location: string;
}

export interface CalculatorState {
  workType: string;
  profileBrand: string;
  color: string;
  glassType: string;
  widthCm: number;
  heightCm: number;
  quantity: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  projectCompleted: string;
}
