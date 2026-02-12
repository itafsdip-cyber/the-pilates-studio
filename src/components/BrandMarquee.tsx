import balancedBody from "@/assets/logos/balanced-body.png";
import basiSystems from "@/assets/logos/basi-systems.png";
import merrithew from "@/assets/logos/merrithew.png";
import peakPilates from "@/assets/logos/peak-pilates.png";
import pilatesAcademy from "@/assets/logos/pilates-academy.png";
import reformRx from "@/assets/logos/reform-rx.png";

const brandLogos = [
  { name: "Balanced Body", src: balancedBody },
  { name: "BASI Systems", src: basiSystems },
  { name: "Merrithew", src: merrithew },
  { name: "Peak Pilates", src: peakPilates },
  { name: "Pilates Academy", src: pilatesAcademy },
  { name: "ReformRX", src: reformRx },
  // Duplicate for seamless loop
  { name: "Balanced Body", src: balancedBody },
  { name: "BASI Systems", src: basiSystems },
  { name: "Merrithew", src: merrithew },
  { name: "Peak Pilates", src: peakPilates },
  { name: "Pilates Academy", src: pilatesAcademy },
  { name: "ReformRX", src: reformRx },
];

function LogoItem({ logo, ariaHidden = false }: { logo: typeof brandLogos[0]; ariaHidden?: boolean }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-6 md:px-8">
      <img
        src={logo.src}
        alt={ariaHidden ? "" : logo.name}
        className="h-14 md:h-20 w-auto object-contain transition-all duration-500 grayscale-muted hover:grayscale-0 hover:opacity-100"
        loading="lazy"
      />
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="py-16 lg:py-20 border-b border-border">
      <div className="max-w-content mx-auto px-6 lg:px-10 mb-10">
        <h2 className="font-serif text-xl text-foreground mb-1">Trusted by studios</h2>
        <p className="text-xs text-muted-foreground tracking-wide">
          Selected partners and compatible brands
        </p>
      </div>

      <div className="marquee-container group" aria-label="Partner brand logos">
        <div className="marquee-track">
          {brandLogos.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
        <div className="marquee-track" aria-hidden="true">
          {brandLogos.map((logo, i) => (
            <LogoItem key={`dup-${logo.name}-${i}`} logo={logo} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  );
}
