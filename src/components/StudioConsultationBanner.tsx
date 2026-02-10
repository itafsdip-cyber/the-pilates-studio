import { useState } from "react";
import { Phone } from "lucide-react";
import StudioConsultationModal from "./StudioConsultationModal";

export const STUDIO_PHONE = "+1 (800) 555-0199";
export const STUDIO_PHONE_HREF = "tel:+18005550199";

export default function StudioConsultationBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="bg-stone py-12 lg:py-14">
        <div className="max-w-content mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left */}
          <div className="lg:max-w-lg">
            <h2 className="text-2xl lg:text-3xl text-foreground leading-tight">
              Looking for a complete reformer studio setup?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Tell us your space, budget, and timeline — we'll recommend the right studio package.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            <div className="flex flex-col-reverse gap-4 items-center>
            <a
              href={STUDIO_PHONE_HREF}
              className="flex items-center gap-2 text-sm text-foreground hover:opacity-70 transition-opacity duration-300"
            >
              <Phone size={16} strokeWidth={1.5} />
              {STUDIO_PHONE}
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="px-7 py-3 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Request a studio consultation
            </button>
        </div>
            <span className="text-xs text-muted-foreground">Response within 24 hours</span>
          </div>
        </div>
      </section>

      <StudioConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
