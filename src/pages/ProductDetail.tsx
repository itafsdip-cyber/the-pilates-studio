import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-sm tracking-wide text-foreground">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && <div className="pb-6 text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="max-w-content mx-auto px-6 lg:px-10 py-20 text-center">
        <h1 className="text-3xl text-foreground mb-4">Product not found</h1>
        <Link to="/" className="text-sm text-muted-foreground border-b border-foreground pb-0.5">
          Return home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-8 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link to={`/collection/${product.category}`} className="hover:text-foreground transition-colors capitalize">{product.category}</Link></li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="aspect-square bg-secondary overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="lg:py-8">
          <h1 className="text-3xl lg:text-4xl text-foreground mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-6">{product.shortDesc}</p>
          <p className="text-xl text-foreground mb-8">${product.price.toLocaleString()}</p>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300 mb-4"
          >
            Add to Cart
          </button>

          <p className="text-xs text-muted-foreground text-center mb-12">
            Free white-glove delivery and setup
          </p>

          {/* Confidence sections */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center py-4 bg-secondary/60 rounded-sm">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Best for</p>
              <p className="text-sm text-foreground">{product.bestFor.join(", ")}</p>
            </div>
            <div className="text-center py-4 bg-secondary/60 rounded-sm">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Space</p>
              <p className="text-sm text-foreground">{product.spaceRequired}</p>
            </div>
            <div className="text-center py-4 bg-secondary/60 rounded-sm">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Included</p>
              <p className="text-sm text-foreground">{product.whatsIncluded.length} items</p>
            </div>
          </div>

          {/* What's included */}
          <div className="mb-6">
            <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans">What's Included</h3>
            <ul className="grid grid-cols-2 gap-1.5">
              {product.whatsIncluded.map((item) => (
                <li key={item} className="text-sm text-foreground">· {item}</li>
              ))}
            </ul>
          </div>

          {/* Collapsible sections */}
          <div className="mt-8">
            <CollapsibleSection title="Description">
              {product.description}
            </CollapsibleSection>
            <CollapsibleSection title="Specifications">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground">{key}:</span>{" "}
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
            <CollapsibleSection title="Delivery & Setup">
              {product.deliveryInfo}
            </CollapsibleSection>
            <CollapsibleSection title="Warranty & Service">
              {product.warrantyInfo}
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  );
}
