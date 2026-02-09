import { Link } from "react-router-dom";
import { Truck, Shield, Wrench, MessageCircle } from "lucide-react";

const sections = [
  {
    icon: Truck,
    title: "Delivery & Setup",
    content: [
      "All reformers, towers, and large equipment include complimentary white-glove delivery and professional setup.",
      "Delivery typically takes 5–15 business days depending on your location and the equipment ordered.",
      "Our delivery team will contact you to schedule a convenient time. They'll bring the equipment inside, assemble it, and ensure everything is working perfectly before they leave.",
      "Mats and accessories ship via standard carrier within 3–5 business days. Free shipping on orders over $150.",
    ],
  },
  {
    icon: Shield,
    title: "Warranty",
    content: [
      "We stand behind every piece of equipment we sell. Our warranties reflect the quality of our materials and engineering.",
      "Frames: 10–15 year warranty depending on model.",
      "Springs, ropes, and moving parts: 2–3 year warranty.",
      "Upholstery and padding: 2-year warranty against manufacturing defects.",
      "All warranties cover manufacturing defects and normal wear under intended use. Commercial use may have different terms — contact us for details.",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    content: [
      "Your equipment is built to require minimal maintenance. A few simple practices will keep it performing at its best.",
      "Wipe down surfaces after each use with a soft, damp cloth. Avoid harsh chemicals.",
      "Check springs quarterly for signs of wear. Replace any spring that shows stretching, rust, or inconsistent tension.",
      "Oil rail tracks every 6 months with the provided silicone lubricant.",
      "Inspect rope and strap connections monthly. Tighten any loose hardware.",
    ],
  },
];

export default function Support() {
  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans">
          Support & Service
        </p>
        <h1 className="text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
          We're here to help
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-16">
          Whether you need help with setup, maintenance, or warranty service, our team is ready to assist. We believe support is part of the product.
        </p>

        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-6">
                <section.icon size={22} strokeWidth={1.2} className="text-accent" />
                <h2 className="text-2xl text-foreground">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Service Request */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={22} strokeWidth={1.2} className="text-accent" />
            <h2 className="text-2xl text-foreground">Service Request</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Need help with your equipment? Submit a service request and our team will respond within one business day.
          </p>

          <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">Product</label>
              <select className="w-full px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:border-foreground transition-colors">
                <option value="">Select your product</option>
                <option value="classic-reformer">Classic Reformer</option>
                <option value="studio-reformer-pro">Studio Reformer Pro</option>
                <option value="tower-cadillac">Tower & Cadillac</option>
                <option value="half-tower">Half Tower</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2 font-sans">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder="Describe the issue or question..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
