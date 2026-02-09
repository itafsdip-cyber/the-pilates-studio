import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans">
          About thereformer
        </p>

        <h1 className="text-4xl lg:text-5xl text-foreground leading-tight mb-10">
          Equipment that honours the discipline
        </h1>

        <div className="space-y-6 text-sm text-muted-foreground leading-[1.8]">
          <p>
            Pilates is a practice of precision. Every movement is intentional. Every alignment matters. The equipment should be no different.
          </p>

          <p>
            We founded thereformer with a single conviction: that the quality of your equipment directly shapes the quality of your practice. When a spring responds predictably, when a carriage glides without hesitation, when a frame holds steady under load — the body can focus on what matters.
          </p>

          <p>
            Our equipment is designed in collaboration with master instructors, physiotherapists, and industrial engineers. Each piece is built to professional standards, whether it lives in a busy studio or a quiet corner of your home.
          </p>

          <p>
            We use sustainably sourced hardwoods, precision-machined steel, and hospital-grade upholstery. Every component is chosen for longevity — because a reformer should serve you for decades, not years.
          </p>

          <p>
            We don't chase trends. We don't cut corners. We build equipment that practitioners trust, day after day.
          </p>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl text-foreground mb-8">Our principles</h2>

          <div className="space-y-8">
            {[
              { title: "Precision over novelty", desc: "We refine what works rather than reinventing for the sake of it. Classical Pilates principles guide every design decision." },
              { title: "Longevity by design", desc: "Materials, engineering, and finish are all selected for a lifespan measured in decades. We warrant our frames for 10–15 years because we expect them to last much longer." },
              { title: "Quiet confidence", desc: "Our equipment doesn't shout. It performs. The design is restrained, the build quality speaks for itself, and the experience is one of calm reliability." },
              { title: "Service as standard", desc: "White-glove delivery, professional setup, and responsive support aren't extras — they're how we do business." },
            ].map((principle) => (
              <div key={principle.title}>
                <h3 className="text-lg text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Link
            to="/product-finder"
            className="inline-block px-8 py-3.5 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
          >
            Find Your Setup
          </Link>
        </div>
      </div>
    </div>
  );
}
