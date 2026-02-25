import type { ShopifyProduct } from "@/lib/shopify";

// High-quality Unsplash Pilates/fitness images used as placeholders
const img = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const reformerImages = [
  img("1518611012118-696072aa579a"),
  img("1571019614242-c5c5dee9f50b"),
  img("1599901860904-17e6ed7083a0"),
];
const towerImages = [
  img("1534438327276-14e5300c3a48"),
  img("1574680096145-d05b13f34845"),
  img("1540497077202-7c8a3999166f"),
];
const matImages = [
  img("1544367567-0f2fcb009e0b"),
  img("1518459031867-a89b944bffe4"),
  img("1601925260368-ae2f83cf8b7f"),
];
const barrelImages = [
  img("1518310383802-640c2de311b2"),
  img("1616279969862-48c27a8bc0f6"),
  img("1576678927484-cc907957088c"),
];

export interface DemoProduct extends ShopifyProduct {
  _demoCategory: string;
}

function makeProduct(
  id: string,
  title: string,
  handle: string,
  description: string,
  price: string,
  currency: string,
  images: string[],
  category: string,
  variants?: Array<{ label: string; price: string; available?: boolean }>,
): DemoProduct {
  const variantEdges = (variants ?? [{ label: "Default", price }]).map((v, i) => ({
    node: {
      id: `gid://shopify/ProductVariant/demo-${handle}-${i}`,
      title: v.label,
      price: { amount: v.price, currencyCode: currency },
      availableForSale: v.available !== false,
      selectedOptions: [{ name: "Option", value: v.label }],
    },
  }));

  return {
    _demoCategory: category,
    node: {
      id: `gid://shopify/Product/demo-${id}`,
      title,
      handle,
      description,
      priceRange: { minVariantPrice: { amount: price, currencyCode: currency } },
      images: { edges: images.map((url, i) => ({ node: { url, altText: `${title} – image ${i + 1}` } })) },
      variants: { edges: variantEdges },
      options: variants && variants.length > 1
        ? [{ name: "Option", values: variants.map((v) => v.label) }]
        : [{ name: "Title", values: ["Default Title"] }],
    },
  };
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  // Reformers
  makeProduct("r1", "Studio Reformer Pro", "studio-reformer-pro",
    "Professional-grade reformer with infinite resistance system, maple wood rails, and whisper-quiet carriage. Designed for intensive studio use and advanced practitioners.",
    "5295.00", "USD", reformerImages, "reformers",
    [{ label: "Maple / Grey", price: "5295.00" }, { label: "Maple / Black", price: "5295.00" }, { label: "Walnut / Black", price: "5695.00" }]),
  makeProduct("r2", "Clinical Reformer", "clinical-reformer",
    "Rehab-focused reformer with micro-adjustable spring tension, low-profile platform, and integrated monitoring mount. Trusted by physiotherapy clinics worldwide.",
    "6450.00", "USD", [reformerImages[1], reformerImages[2], reformerImages[0]], "reformers"),
  makeProduct("r3", "Home Reformer Lite", "home-reformer-lite",
    "Compact foldable reformer engineered for home spaces. Full-size carriage travel with space-saving vertical storage.",
    "2895.00", "USD", [reformerImages[2], reformerImages[0], reformerImages[1]], "reformers",
    [{ label: "Light Oak", price: "2895.00" }, { label: "Dark Walnut", price: "3095.00" }]),
  makeProduct("r4", "Allegro 2 Reformer", "allegro-2-reformer",
    "Award-winning design combining studio performance with home convenience. Patent-pending SmoothFit footbar and rope system.",
    "4195.00", "USD", [reformerImages[0], reformerImages[1]], "reformers"),

  // Towers & Cadillacs
  makeProduct("t1", "Full Cadillac Tower", "full-cadillac-tower",
    "Complete Cadillac-trapeze combination with overhead spring bar, push-through bar, and roll-down bar. The ultimate training station.",
    "7850.00", "USD", towerImages, "towers",
    [{ label: "Standard", price: "7850.00" }, { label: "With Mat Conversion", price: "8450.00" }]),
  makeProduct("t2", "Wall Tower Unit", "wall-tower-unit",
    "Space-efficient wall-mounted tower with adjustable spring bar heights. Perfect for studios maximising floor space.",
    "3250.00", "USD", [towerImages[1], towerImages[2], towerImages[0]], "towers"),
  makeProduct("t3", "Half Trapeze Tower", "half-trapeze-tower",
    "Versatile half-trapeze system that converts any reformer into a tower workout station. Quick-release brackets included.",
    "2195.00", "USD", [towerImages[2], towerImages[0]], "towers"),

  // Mats & Accessories
  makeProduct("m1", "Performance Mat – 15 mm", "performance-mat-15mm",
    "High-density closed-cell foam mat with antimicrobial surface. Non-slip base layer and alignment markers.",
    "129.00", "USD", matImages, "mats",
    [{ label: "Sage", price: "129.00" }, { label: "Charcoal", price: "129.00" }, { label: "Sand", price: "129.00" }]),
  makeProduct("m2", "Resistance Band Set – Studio", "resistance-band-set-studio",
    "Six calibrated resistance bands (extra-light to ultra-heavy) with padded handles and door anchor. Latex-free TPE.",
    "89.00", "USD", [matImages[1], matImages[2], matImages[0]], "mats"),
  makeProduct("m3", "Foam Roller – Deep Tissue", "foam-roller-deep-tissue",
    "Dual-zone textured EVA foam roller for myofascial release and recovery. Firm core with softer outer layer.",
    "59.00", "USD", [matImages[2], matImages[0]], "mats"),
  makeProduct("m4", "Magic Circle – Pro", "magic-circle-pro",
    "Steel-core resistance ring with cushioned grips. 14-inch diameter for targeted arm, thigh, and core engagement.",
    "45.00", "USD", [matImages[0], matImages[1], matImages[2]], "mats"),

  // Barrels & Chairs
  makeProduct("b1", "Spine Corrector Barrel", "spine-corrector-barrel",
    "Ergonomically contoured barrel for spinal articulation, hip flexor stretching, and core strengthening.",
    "395.00", "USD", barrelImages, "barrels"),
  makeProduct("b2", "Ladder Barrel", "ladder-barrel",
    "Full-size ladder barrel with adjustable base distance. Solid hardwood rungs and commercial-grade padded barrel.",
    "2450.00", "USD", [barrelImages[1], barrelImages[2], barrelImages[0]], "barrels",
    [{ label: "Maple", price: "2450.00" }, { label: "Walnut", price: "2650.00" }]),
  makeProduct("b3", "Wunda Chair", "wunda-chair",
    "Split-pedal stability chair with four-spring resistance. Compact footprint ideal for home studios.",
    "1195.00", "USD", [barrelImages[2], barrelImages[0], barrelImages[1]], "barrels"),
];

export function getDemoProductsByCategory(category: string): ShopifyProduct[] {
  return DEMO_PRODUCTS.filter((p) => p._demoCategory === category);
}

export function getDemoProductByHandle(handle: string): ShopifyProduct["node"] | null {
  const found = DEMO_PRODUCTS.find((p) => p.node.handle === handle);
  return found ? found.node : null;
}

export function getAllDemoProducts(): ShopifyProduct[] {
  return DEMO_PRODUCTS;
}
