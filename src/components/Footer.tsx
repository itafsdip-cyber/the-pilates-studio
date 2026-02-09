import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl text-foreground">
              thereformer
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Precision Pilates equipment for home, studio, and rehabilitation.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans font-medium">
              Shop
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/collection/reformers" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Reformers</Link>
              <Link to="/collection/towers" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Towers & Cadillacs</Link>
              <Link to="/collection/mats" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Mats & Accessories</Link>
              <Link to="/collection/barrels" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Barrels & Chairs</Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans font-medium">
              Support
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/support" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Delivery & Setup</Link>
              <Link to="/support" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Warranty</Link>
              <Link to="/support" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Maintenance</Link>
              <Link to="/support" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Service Request</Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans font-medium">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">About</Link>
              <Link to="/product-finder" className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300">Find Your Setup</Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} thereformer.store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Privacy</span>
            <span className="text-xs text-muted-foreground">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
