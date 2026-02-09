import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "@/data/products";

const steps = [
  {
    question: "Where will you practice?",
    options: [
      { label: "At home", value: "home" },
      { label: "In a professional studio", value: "studio" },
      { label: "Rehabilitation setting", value: "rehab" },
    ],
  },
  {
    question: "What's your experience level?",
    options: [
      { label: "I'm just starting", value: "beginner" },
      { label: "Intermediate — I practice regularly", value: "intermediate" },
      { label: "Advanced — I'm a practitioner or instructor", value: "advanced" },
    ],
  },
  {
    question: "What's most important to you?",
    options: [
      { label: "Space efficiency", value: "space" },
      { label: "Versatility", value: "versatility" },
      { label: "Professional-grade durability", value: "durability" },
    ],
  },
  {
    question: "What's your budget range?",
    options: [
      { label: "Under $2,000", value: "low" },
      { label: "$2,000 – $5,000", value: "mid" },
      { label: "Over $5,000", value: "high" },
    ],
  },
];

function getRecommendation(answers: string[]) {
  const [setting, , priority, budget] = answers;

  if (budget === "low") {
    if (priority === "space") return products.find((p) => p.id === "precision-mat");
    return products.find((p) => p.id === "spine-corrector");
  }
  if (setting === "rehab" || budget === "high") {
    return products.find((p) => p.id === "tower-cadillac");
  }
  if (setting === "studio" || priority === "durability") {
    return products.find((p) => p.id === "studio-reformer-pro");
  }
  if (priority === "space") {
    return products.find((p) => p.id === "half-tower");
  }
  return products.find((p) => p.id === "classic-reformer");
}

export default function ProductFinder() {
  const [searchParams] = useSearchParams();
  const context = searchParams.get("context");

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(context ? [context] : []);
  const [showResult, setShowResult] = useState(false);

  const effectiveStep = context && currentStep === 0 ? 1 : currentStep;

  const handleSelect = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (effectiveStep >= steps.length - 1) {
      setShowResult(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const recommendation = showResult ? getRecommendation(answers) : null;

  const displayStep = context ? effectiveStep : currentStep;

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-28">
      {!showResult ? (
        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="flex gap-2 mb-12">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 transition-colors duration-300 ${
                  i <= displayStep ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </div>

          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans">
            Step {displayStep + 1} of {steps.length}
          </p>

          <h1 className="text-3xl lg:text-4xl text-foreground mb-10">
            {steps[displayStep].question}
          </h1>

          <div className="flex flex-col gap-3">
            {steps[displayStep].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full text-left px-6 py-5 border border-border text-sm text-foreground hover:bg-secondary/50 transition-colors duration-300"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : recommendation ? (
        <div className="max-w-3xl mx-auto fade-in-up">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans">
            Our Recommendation
          </p>
          <h1 className="text-3xl lg:text-4xl text-foreground mb-6">
            The {recommendation.name}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Based on your answers, this is the ideal setup for your practice. It offers the right balance of {answers.includes("space") ? "space efficiency" : "versatility"} and quality for your needs.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-2">{recommendation.shortDesc}</p>
              <p className="text-xl text-foreground mb-6">${recommendation.price.toLocaleString()}</p>
              <Link
                to={`/product/${recommendation.id}`}
                className="inline-block text-center py-3.5 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300 mb-4"
              >
                View Details
              </Link>
              <button
                onClick={() => {
                  setAnswers(context ? [context] : []);
                  setCurrentStep(0);
                  setShowResult(false);
                }}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
