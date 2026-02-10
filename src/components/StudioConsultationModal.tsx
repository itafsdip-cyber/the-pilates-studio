import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  studioType: "",
  spaceSize: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
};

export default function StudioConsultationModal({ open, onOpenChange }: Props) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.studioType) e.studioType = "Required";
    if (!form.consent) e.consent = "Please agree to continue";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // Placeholder: log to console. Replace with API call.
    console.log("[Studio Consultation Request]", form);

    // TODO: Connect to backend
    // fetch('/api/studio-consultation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // });

    setSubmitted(true);
    setForm(initialForm);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSubmitted(false);
      setErrors({});
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl bg-[hsl(100_5%_95%)] border-border shadow-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Request a studio consultation
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Tell us about your space and goals. Our team will respond within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-12 text-center">
            <p className="text-lg font-serif text-foreground mb-2">
              Thank you
            </p>
            <p className="text-sm text-muted-foreground">
              Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            {/* Name / Email / Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Full Name *
                </Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className="bg-background" />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Email *
                </Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="bg-background" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Phone *
                </Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="bg-background" />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="location" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Country / City
                </Label>
                <Input id="location" value={form.location} onChange={(e) => set("location", e.target.value)} className="bg-background" />
              </div>
            </div>

            {/* Studio Type + Space Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Studio Type *
                </Label>
                <Select value={form.studioType} onValueChange={(v) => set("studioType", v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="home">Home Studio</SelectItem>
                    <SelectItem value="professional">Professional Studio</SelectItem>
                    <SelectItem value="rehab">Rehab Clinic</SelectItem>
                  </SelectContent>
                </Select>
                {errors.studioType && <p className="text-xs text-destructive mt-1">{errors.studioType}</p>}
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Space Size
                </Label>
                <Select value={form.spaceSize} onValueChange={(v) => set("spaceSize", v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Budget + Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Budget Range
                </Label>
                <Input id="budget" placeholder="e.g. $5,000 – $15,000" value={form.budget} onChange={(e) => set("budget", e.target.value)} className="bg-background" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Timeline
                </Label>
                <Select value={form.timeline} onValueChange={(v) => set("timeline", v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-2-weeks">1–2 weeks</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="3-months">3+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Message / Requirements
              </Label>
              <Textarea id="message" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} className="bg-background resize-none" />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={form.consent}
                onCheckedChange={(v) => set("consent", !!v)}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                I agree to be contacted about my studio setup request.
              </Label>
            </div>
            {errors.consent && <p className="text-xs text-destructive -mt-3">{errors.consent}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Submit request
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
