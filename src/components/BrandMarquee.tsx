import balancedBody from "@/assets/logos/balanced-body.jpg";
import basiSystems from "@/assets/logos/basi-systems.jpg";
import merrithew from "@/assets/logos/merrithew.jpg";
import peakPilates from "@/assets/logos/peak-pilates.jpg";
import pilatesAcademy from "@/assets/logos/pilates-academy.jpg";
import reformRx from "@/assets/logos/reform-rx.jpg";

const brandLogos = [
  { name: "Balanced Body", src: balancedBody },
  { name: "BASI Systems", src: basiSystems },
  { name: "Merrithew", src: merrithew },
  { name: "Peak Pilates", src: peakPilates },
  { name: "Pilates Academy", src: pilatesAcademy },
  { name: "ReformRX", src: reformRx },
  // Add more logos here — just add { name: "Brand", src: importedImage }
  { name: "Balanced Body", src: balancedBody },
  { name: "BASI Systems", src: basiSystems },
  { name: "Merrithew", src: merrithew },
  { name: "Peak Pilates", src: peakPilates },
  { name: "Pilates Academy", src: pilatesAcademy },
  { name: "ReformRX", src: reformRx },
];

export default function BrandMarquee() {
  return (
    <section className="py-14 lg:py-16 border-b border-border">
      <div className="max-w-content mx-auto px-6 lg:px-10 mb-8">
        <h2 className="font-serif text-xl text-foreground mb-1">Trusted by studios</h2>
        <p className="text-xs text-muted-foreground tracking-wide">
          Selected partners and compatible brands
        </p>
      </div>

      <div className="marquee-container group" aria-label="Partner brand logos">
        <div className="marquee-track">
          {brandLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-5 py-2.5 border border-border rounded-full bg-background mx-3"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 md:h-8 w-auto object-contain grayscale opacity-60"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="marquee-track" aria-hidden="true">
          {brandLogos.map((logo, i) => (
            <div
              key={`dup-${logo.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-5 py-2.5 border border-border rounded-full bg-background mx-3"
            >
              <img
                src={logo.src}
                alt=""
                className="h-7 md:h-8 w-auto object-contain grayscale opacity-60"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
