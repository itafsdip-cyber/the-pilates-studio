export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  category: string;
  image: string;
  bestFor: string[];
  spaceRequired: string;
  whatsIncluded: string[];
  description: string;
  specifications: Record<string, string>;
  deliveryInfo: string;
  warrantyInfo: string;
}

import productReformer1 from "@/assets/product-reformer-1.jpg";
import productTower1 from "@/assets/product-tower-1.jpg";
import productMat1 from "@/assets/product-mat-1.jpg";
import productBarrel1 from "@/assets/product-barrel-1.jpg";

export const products: Product[] = [
  {
    id: "classic-reformer",
    name: "Classic Reformer",
    shortDesc: "Studio-grade precision for home practice",
    price: 4295,
    category: "reformers",
    image: productReformer1,
    bestFor: ["Home", "Studio"],
    spaceRequired: "250 × 70 cm",
    whatsIncluded: ["Reformer frame", "5 spring set", "Foot bar", "Shoulder rests", "Headrest", "Padded carriage"],
    description: "The Classic Reformer brings studio-grade engineering to your home. Built with sustainably sourced hardwood and aircraft-grade springs, it delivers smooth, consistent resistance across every movement. Designed for practitioners who value precision and longevity.",
    specifications: { "Length": "240 cm", "Width": "65 cm", "Height": "37 cm", "Weight": "68 kg", "Max user weight": "150 kg", "Frame": "European beechwood", "Springs": "5 (1 light, 2 medium, 2 heavy)" },
    deliveryInfo: "White-glove delivery and setup included. Typically 5–10 business days.",
    warrantyInfo: "10-year frame warranty. 2-year parts and springs warranty. Lifetime customer support."
  },
  {
    id: "studio-reformer-pro",
    name: "Studio Reformer Pro",
    shortDesc: "Professional-grade for high-volume studios",
    price: 5895,
    category: "reformers",
    image: productReformer1,
    bestFor: ["Studio", "Rehab"],
    spaceRequired: "260 × 75 cm",
    whatsIncluded: ["Reformer frame", "8 spring set", "Adjustable foot bar", "Padded platform", "Ropes & pulleys"],
    description: "Engineered for professional studios and rehabilitation facilities. The Studio Reformer Pro features an expanded spring system, reinforced frame, and adjustable components to accommodate any body type and practice level.",
    specifications: { "Length": "250 cm", "Width": "70 cm", "Height": "40 cm", "Weight": "82 kg", "Max user weight": "180 kg", "Frame": "Maple hardwood", "Springs": "8 (2 light, 3 medium, 3 heavy)" },
    deliveryInfo: "Professional delivery and installation included. 7–14 business days.",
    warrantyInfo: "15-year frame warranty. 3-year parts warranty."
  },
  {
    id: "tower-cadillac",
    name: "Tower & Cadillac",
    shortDesc: "Full-body training system",
    price: 7495,
    category: "towers",
    image: productTower1,
    bestFor: ["Studio", "Rehab"],
    spaceRequired: "280 × 80 cm",
    whatsIncluded: ["Full tower frame", "Trapeze bar", "Push-through bar", "Leg springs", "Arm springs", "Roll-down bar", "Safety strap"],
    description: "The complete Pilates experience. Our Tower & Cadillac integrates seamlessly into your practice space, offering hundreds of exercises for strength, flexibility, and rehabilitation. Handcrafted with attention to every detail.",
    specifications: { "Length": "260 cm", "Width": "75 cm", "Height": "210 cm", "Weight": "120 kg", "Max user weight": "150 kg", "Frame": "Steel and hardwood" },
    deliveryInfo: "Professional installation required. Included in price. 10–15 business days.",
    warrantyInfo: "15-year frame warranty. 3-year parts warranty."
  },
  {
    id: "half-tower",
    name: "Half Tower",
    shortDesc: "Space-efficient vertical training",
    price: 3895,
    category: "towers",
    image: productTower1,
    bestFor: ["Home", "Studio"],
    spaceRequired: "120 × 70 cm",
    whatsIncluded: ["Half tower frame", "Push-through bar", "Arm springs", "Leg springs", "Safety strap"],
    description: "All the versatility of a full tower in a compact footprint. The Half Tower mounts to a wall or stands freely, making it ideal for home practitioners with limited space who don't want to compromise on their practice.",
    specifications: { "Length": "100 cm", "Width": "65 cm", "Height": "210 cm", "Weight": "45 kg", "Max user weight": "150 kg" },
    deliveryInfo: "White-glove delivery and setup included. 5–10 business days.",
    warrantyInfo: "10-year frame warranty. 2-year parts warranty."
  },
  {
    id: "precision-mat",
    name: "Precision Mat",
    shortDesc: "Dense, supportive, beautifully crafted",
    price: 195,
    category: "mats",
    image: productMat1,
    bestFor: ["Home", "Studio"],
    spaceRequired: "185 × 60 cm",
    whatsIncluded: ["Pilates mat", "Carry strap", "Care guide"],
    description: "Our Precision Mat provides the ideal balance of cushioning and stability for mat Pilates. Made with closed-cell foam for hygiene, and finished with a subtly textured non-slip surface.",
    specifications: { "Length": "185 cm", "Width": "60 cm", "Thickness": "15 mm", "Weight": "2.1 kg", "Material": "Closed-cell TPE foam" },
    deliveryInfo: "Standard delivery 3–5 business days. Free over $150.",
    warrantyInfo: "1-year warranty against manufacturing defects."
  },
  {
    id: "spring-resistance-kit",
    name: "Spring Resistance Kit",
    shortDesc: "Replacement and upgrade springs",
    price: 145,
    category: "mats",
    image: productMat1,
    bestFor: ["Home", "Studio"],
    spaceRequired: "N/A",
    whatsIncluded: ["2 light springs", "2 medium springs", "2 heavy springs", "Spring guide"],
    description: "Premium replacement springs compatible with all thereformer reformers. Color-coded for easy identification, engineered for consistent tension throughout their lifespan.",
    specifications: { "Light tension": "2.5 kg", "Medium tension": "4.5 kg", "Heavy tension": "7 kg", "Material": "Tempered steel" },
    deliveryInfo: "Standard delivery 3–5 business days.",
    warrantyInfo: "2-year warranty."
  },
  {
    id: "spine-corrector",
    name: "Spine Corrector",
    shortDesc: "Precision barrel for spinal mobility",
    price: 895,
    category: "barrels",
    image: productBarrel1,
    bestFor: ["Home", "Rehab"],
    spaceRequired: "90 × 50 cm",
    whatsIncluded: ["Spine corrector barrel", "Care guide"],
    description: "The Spine Corrector is an essential tool for developing spinal flexibility, core strength, and postural alignment. Its precisely contoured shape supports the natural curves of the spine while challenging the body through a full range of motion.",
    specifications: { "Length": "85 cm", "Width": "45 cm", "Height": "35 cm", "Weight": "8 kg", "Material": "High-density foam and hardwood" },
    deliveryInfo: "Standard delivery 3–5 business days.",
    warrantyInfo: "5-year warranty."
  },
  {
    id: "wunda-chair",
    name: "Wunda Chair",
    shortDesc: "Compact strength and balance training",
    price: 1695,
    category: "barrels",
    image: productBarrel1,
    bestFor: ["Home", "Studio", "Rehab"],
    spaceRequired: "70 × 55 cm",
    whatsIncluded: ["Wunda chair", "2 springs (medium, heavy)", "Padded seat"],
    description: "The Wunda Chair is one of the most versatile pieces in the Pilates repertoire. Despite its compact size, it offers challenging exercises for strength, balance, and coordination. Perfect as a complement to reformer work.",
    specifications: { "Length": "65 cm", "Width": "50 cm", "Height": "65 cm", "Weight": "22 kg", "Max user weight": "150 kg" },
    deliveryInfo: "White-glove delivery 5–10 business days.",
    warrantyInfo: "10-year frame warranty. 2-year parts warranty."
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const categoryInfo: Record<string, { title: string; description: string }> = {
  reformers: { title: "Reformers", description: "Precision-engineered reformers for home practitioners and professional studios." },
  towers: { title: "Towers & Cadillacs", description: "Comprehensive training systems for full-body Pilates practice." },
  mats: { title: "Mats & Accessories", description: "Thoughtfully designed essentials to support your practice." },
  barrels: { title: "Barrels & Chairs", description: "Specialised equipment for spinal health, strength, and balance." },
};
