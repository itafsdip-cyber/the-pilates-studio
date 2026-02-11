import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import balancedBody from "@/assets/logos/balanced-body.png";
import basiSystems from "@/assets/logos/basi-systems.png";
import merrithew from "@/assets/logos/merrithew.png";
import peakPilates from "@/assets/logos/peak-pilates.png";
import pilatesAcademy from "@/assets/logos/pilates-academy.png";
import reformRx from "@/assets/logos/reform-rx.png";

interface Brand {
  name: string;
  logoSrc: string;
  href: string;
}

const brands: Brand[] = [
  { name: "Balanced Body", logoSrc: balancedBody, href: "/collection/balanced-body" },
  { name: "BASI Systems", logoSrc: basiSystems, href: "/collection/basi-systems" },
  { name: "Merrithew", logoSrc: merrithew, href: "/collection/merrithew" },
  { name: "Peak Pilates", logoSrc: peakPilates, href: "/collection/peak-pilates" },
  { name: "Pilates Academy", logoSrc: pilatesAcademy, href: "/collection/pilates-academy" },
  { name: "ReformRX", logoSrc: reformRx, href: "/collection/reform-rx" },
  { name: "Stott Pilates", logoSrc: merrithew, href: "/collection/stott-pilates" },
  { name: "Gratz Industries", logoSrc: balancedBody, href: "/collection/gratz-industries" },
  { name: "Allegro", logoSrc: peakPilates, href: "/collection/allegro" },
  { name: "Wunda", logoSrc: reformRx, href: "/collection/wunda" },
];

// Position configs for 5 visible slots: -2, -1, 0, 1, 2
const desktopPositions = [
  { tx: -520, tz: -260, scale: 0.55, ry: -28, opacity: 0.1 },
  { tx: -300, tz: -120, scale: 0.82, ry: -14, opacity: 0.7 },
  { tx: 0, tz: 0, scale: 1.08, ry: 0, opacity: 1 },
  { tx: 300, tz: -120, scale: 0.82, ry: 14, opacity: 0.7 },
  { tx: 520, tz: -260, scale: 0.55, ry: 28, opacity: 0.1 },
];

const mobilePositions = [
  { tx: -420, tz: -260, scale: 0.5, ry: -28, opacity: 0.05 },
  { tx: -200, tz: -120, scale: 0.78, ry: -14, opacity: 0.6 },
  { tx: 0, tz: 0, scale: 1.05, ry: 0, opacity: 1 },
  { tx: 200, tz: -120, scale: 0.78, ry: 14, opacity: 0.6 },
  { tx: 420, tz: -260, scale: 0.5, ry: 28, opacity: 0.05 },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function ShopByBrand() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const total = brands.length;

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (reducedMotion || isPaused) return;
    autoplayRef.current = setInterval(next, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next, reducedMotion, isPaused]);

  // Keyboard
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch/swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) { diff > 0 ? prev() : next(); }
    touchStart.current = null;
  };

  const positions = isMobile ? mobilePositions : desktopPositions;

  // Reduced motion fallback
  if (reducedMotion) {
    return (
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-foreground mb-3">Shop by Brand</h2>
            <p className="text-sm text-muted-foreground">Choose a brand to browse compatible equipment.</p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {brands.map((b) => (
              <Link key={b.name} to={b.href} className="flex-shrink-0 snap-center flex flex-col items-center gap-3 p-6 rounded-3xl bg-background/60 backdrop-blur-sm min-w-[160px]">
                <img src={b.logoSrc} alt={b.name} className="h-16 w-auto object-contain" />
                <span className="text-xs text-muted-foreground">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Get offset for each brand relative to activeIndex (wrapping)
  function getOffset(index: number): number {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  return (
    <section className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Soft glow circles */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-muted/[0.06] blur-[80px] pointer-events-none" />

      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-foreground mb-3">Shop by Brand</h2>
          <p className="text-sm text-muted-foreground">Choose a brand to browse compatible equipment.</p>
        </div>

        {/* 3D Stage */}
        <div
          ref={containerRef}
          tabIndex={0}
          className="relative mx-auto outline-none"
          style={{
            height: isMobile ? 360 : 480,
            perspective: 1200,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Shop by Brand carousel"
        >
          {brands.map((brand, index) => {
            const offset = getOffset(index);
            // Only render items within visible range
            if (Math.abs(offset) > 2) return null;

            const posIndex = offset + 2; // map -2..2 to 0..4
            const pos = positions[posIndex];
            const isCenter = offset === 0;

            return (
              <Link
                key={brand.name}
                to={brand.href}
                className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center gap-4 rounded-3xl backdrop-blur-sm cursor-pointer group"
                style={{
                  width: isMobile ? 200 : 280,
                  height: isMobile ? 240 : 320,
                  marginLeft: isMobile ? -100 : -140,
                  marginTop: isMobile ? -120 : -160,
                  transform: `translateX(${pos.tx}px) translateZ(${pos.tz}px) scale(${pos.scale}) rotateY(${pos.ry}deg)`,
                  opacity: pos.opacity,
                  transition: "transform 800ms ease, opacity 800ms ease",
                  zIndex: 5 - Math.abs(offset),
                  transformStyle: "preserve-3d",
                  background: "hsl(var(--background) / 0.06)",
                  boxShadow: isCenter
                    ? "0 20px 60px -20px hsl(var(--foreground) / 0.08)"
                    : "0 8px 30px -12px hsl(var(--foreground) / 0.04)",
                }}
              >
                <img
                  src={brand.logoSrc}
                  alt={brand.name}
                  className="w-auto object-contain transition-all duration-500"
                  style={{
                    height: isMobile ? (isCenter ? 60 : 48) : (isCenter ? 88 : 68),
                    filter: isCenter
                      ? "grayscale(60%) saturate(40%) contrast(1.05)"
                      : "grayscale(100%) saturate(0%) contrast(1.05)",
                    opacity: isCenter ? 0.85 : 0.65,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = isCenter
                      ? "grayscale(60%) saturate(40%) contrast(1.05)"
                      : "grayscale(100%) saturate(0%) contrast(1.05)";
                    e.currentTarget.style.opacity = isCenter ? "0.85" : "0.65";
                  }}
                />
                <span
                  className="text-xs tracking-wide text-muted-foreground transition-opacity duration-300"
                  style={{ opacity: isCenter ? 1 : 0.5 }}
                >
                  {brand.name}
                </span>
              </Link>
            );
          })}

          {/* Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-background/30 text-foreground/60 hover:bg-background/50 hover:text-foreground transition-all duration-300"
            aria-label="Previous brand"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-background/30 text-foreground/60 hover:bg-background/50 hover:text-foreground transition-all duration-300"
            aria-label="Next brand"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to brand ${i + 1}`}
              className="transition-all duration-500"
              style={{
                width: i === activeIndex ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIndex
                  ? "hsl(var(--foreground) / 0.5)"
                  : "hsl(var(--foreground) / 0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
