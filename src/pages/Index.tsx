import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-reformer.jpg";
import homePilates from "@/assets/home-pilates.jpg";
import studioPilates from "@/assets/studio-pilates.jpg";
import rehabPilates from "@/assets/rehab-pilates.jpg";
import editorialLifestyle from "@/assets/editorial-lifestyle.jpg";
import productReformer from "@/assets/product-reformer-1.jpg";
import productTower from "@/assets/product-tower-1.jpg";
import productMat from "@/assets/product-mat-1.jpg";
import productBarrel from "@/assets/product-barrel-1.jpg";
import { Shield, Truck, Award } from "lucide-react";
import BrandMarquee from "@/components/BrandMarquee";
import ShopByBrand from "@/components/ShopByBrand";
import StudioConsultationBanner from "@/components/StudioConsultationBanner";

const guidedEntries = [
  { title: "Home Pilates", desc: "Equipment designed for your living space", image: homePilates, to: "/product-finder?context=home" },
  { title: "Studio Pilates", desc: "Professional-grade for your studio", image: studioPilates, to: "/product-finder?context=studio" },
  { title: "Rehab & Recovery", desc: "Clinical precision for rehabilitation", image: rehabPilates, to: "/product-finder?context=rehab" },
];

const categories = [
  { title: "Reformers", to: "/collection/reformers", image: productReformer },
  { title: "Towers & Cadillacs", to: "/collection/towers", image: productTower },
  { title: "Mats & Accessories", to: "/collection/mats", image: productMat },
  { title: "Barrels & Chairs", to: "/collection/barrels", image: productBarrel },
];

const trustItems = [
  { icon: Award, title: "10-Year Warranty", desc: "Built to last a lifetime of practice" },
  { icon: Truck, title: "White-Glove Delivery", desc: "Professional setup in your space" },
  { icon: Shield, title: "Studio-Grade Quality", desc: "Engineered for daily professional use" },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium Pilates reformer in a bright studio"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] max-w-xl fade-in-up">
            Precision Pilates equipment for home & studio
          </h1>
          <p className="mt-5 text-sm md:text-base text-primary-foreground/80 max-w-md leading-relaxed fade-in-up" style={{ animationDelay: "0.15s" }}>
            Strength, alignment, and longevity — built into every piece.
          </p>
          <div className="mt-8 flex items-center gap-6 fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/product-finder"
              className="inline-block px-8 py-3.5 bg-primary-foreground text-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Find your setup
            </Link>
            <Link
              to="/collection/reformers"
              className="text-xs tracking-widest uppercase text-primary-foreground border-b border-primary-foreground/50 pb-0.5 hover:border-primary-foreground transition-colors duration-300"
            >
              Browse collection
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Guided Entry */}
      <section className="max-w-content mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <h2 className="text-3xl lg:text-4xl text-foreground mb-4">How will you practice?</h2>
        <p className="text-sm text-muted-foreground mb-12 max-w-md">
          Tell us about your space and goals. We'll guide you to the right equipment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidedEntries.map((entry) => (
            <Link
              key={entry.title}
              to={entry.to}
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary mb-4">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl text-foreground mb-1">{entry.title}</h3>
              <p className="text-sm text-muted-foreground">{entry.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated Categories */}
      <section className="bg-secondary/50">
        <div className="max-w-content mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <h2 className="text-3xl lg:text-4xl text-foreground mb-12">Our Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.to}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-background mb-4">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg text-foreground">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <ShopByBrand />

      {/* Trust Section */}
      <section className="max-w-content mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center">
              <item.icon size={28} strokeWidth={1} className="mx-auto text-accent mb-4" />
              <h3 className="text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Lifestyle */}
      <section className="max-w-content mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={editorialLifestyle}
              alt="Pilates practice in natural light"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:max-w-md">
            <h2 className="text-3xl lg:text-4xl text-foreground mb-6 leading-tight">
              Built for the way you move
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Every piece of equipment is designed around the principles of Pilates — control, precision, and flow. We work with practitioners, physiotherapists, and engineers to create equipment that serves your body for years.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              No shortcuts. No compromises. Just thoughtful design that gets out of your way and lets you focus on the work.
            </p>
            <Link
              to="/about"
              className="text-xs tracking-widest uppercase border-b border-foreground pb-1 text-foreground hover:opacity-70 transition-opacity duration-300"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>
      {/* Studio Consultation Banner */}
      <StudioConsultationBanner />
    </div>
  );
}
