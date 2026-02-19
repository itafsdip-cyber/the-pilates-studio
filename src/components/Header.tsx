import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingBag, Menu, X } from "lucide-react";
import logoSvg from "@/assets/logo.svg";
import logoMobileSvg from "@/assets/logo-mobile.svg";

const navLinks = [
  { label: "Reformers", to: "/collection/reformers" },
  { label: "Towers & Cadillacs", to: "/collection/towers" },
  { label: "Mats & Accessories", to: "/collection/mats" },
  { label: "Barrels & Chairs", to: "/collection/barrels" },
  { label: "Find Your Setup", to: "/product-finder" },
];

export default function Header() {
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1 text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoMobileSvg} alt="thereformer" className="h-7 w-auto object-contain lg:hidden" />
            <img src={logoSvg} alt="thereformer" className="h-[80px] w-auto hidden lg:block" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs tracking-widest uppercase transition-opacity duration-300 ${
                  location.pathname === link.to
                    ? "text-foreground opacity-100"
                    : "text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={openCart}
              className="relative p-1 text-foreground"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-primary-foreground text-[10px] flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border fade-in">
          <nav className="max-w-content mx-auto px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest uppercase text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/support"
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-widest uppercase text-foreground"
            >
              Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
