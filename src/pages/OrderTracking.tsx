import { Link } from "react-router-dom";
import { Check, Package, Truck, Home } from "lucide-react";

const timeline = [
  { icon: Check, label: "Order Confirmed", date: "Feb 9, 2026", active: true },
  { icon: Package, label: "Being Prepared", date: "Feb 11, 2026", active: true },
  { icon: Truck, label: "In Transit", date: "Est. Feb 15, 2026", active: false },
  { icon: Home, label: "Delivered & Set Up", date: "Est. Feb 18, 2026", active: false },
];

export default function OrderTracking() {
  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-28">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans">
          Order #TR-20260209
        </p>
        <h1 className="text-3xl lg:text-4xl text-foreground mb-2">Thank you for your order</h1>
        <p className="text-sm text-muted-foreground mb-12">
          Your equipment is being carefully prepared. We'll keep you updated every step of the way.
        </p>

        {/* Timeline */}
        <div className="space-y-0 mb-16">
          {timeline.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.active ? "bg-foreground text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <step.icon size={18} strokeWidth={1.5} />
                </div>
                {i < timeline.length - 1 && (
                  <div className={`w-px h-12 ${step.active ? "bg-foreground" : "bg-border"}`} />
                )}
              </div>
              <div className="pt-2">
                <p className={`text-sm ${step.active ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Setup guidance */}
        <div className="border-t border-border pt-12 mb-12">
          <h2 className="text-2xl text-foreground mb-6">Preparing your space</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Ensure your practice area has at least 250 × 100 cm of clear floor space, with additional room around the equipment for comfortable movement.</p>
            <p>A firm, level surface is ideal. Hardwood, tile, or low-pile carpet all work well. We'll provide protective pads during setup.</p>
            <p>Our delivery team will handle all assembly. Please ensure clear access from your entrance to the practice area.</p>
          </div>
        </div>

        {/* Care suggestions */}
        <div className="border-t border-border pt-12">
          <h2 className="text-2xl text-foreground mb-6">Getting started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/40 p-6">
              <h3 className="text-sm text-foreground mb-2">First-use guide</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A printed guide will be included with your equipment. It covers spring selection, basic positions, and care essentials.
              </p>
            </div>
            <div className="bg-secondary/40 p-6">
              <h3 className="text-sm text-foreground mb-2">Maintenance essentials</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Simple quarterly care keeps your equipment performing at its best. We include everything you need.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-xs tracking-widest uppercase border-b border-foreground pb-1 text-foreground"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
