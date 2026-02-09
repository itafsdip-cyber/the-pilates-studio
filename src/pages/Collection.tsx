import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, categoryInfo } from "@/data/products";
import { useState } from "react";

export default function Collection() {
  const { category } = useParams<{ category: string }>();
  const [showFilters, setShowFilters] = useState(false);

  const products = getProductsByCategory(category || "reformers");
  const info = categoryInfo[category || "reformers"];

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-12 lg:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-foreground">{info?.title || "Collection"}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12 lg:mb-16">
        <h1 className="text-4xl lg:text-5xl text-foreground mb-4">{info?.title || "Collection"}</h1>
        <p className="text-sm text-muted-foreground max-w-lg">{info?.description}</p>
      </div>

      {/* Filter button */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-muted-foreground">{products.length} products</p>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-xs tracking-widest uppercase text-foreground border-b border-foreground pb-0.5"
        >
          {showFilters ? "Close" : "Refine"}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-10 pb-8 border-b border-border fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans">Best For</h4>
              <div className="flex flex-col gap-2">
                {["Home", "Studio", "Rehab"].map((f) => (
                  <label key={f} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="checkbox" className="accent-foreground" />
                    {f}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3 font-sans">Price</h4>
              <div className="flex flex-col gap-2">
                {["Under $500", "$500 – $2,000", "$2,000 – $5,000", "Over $5,000"].map((f) => (
                  <label key={f} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="checkbox" className="accent-foreground" />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group block"
          >
            <div className="aspect-square overflow-hidden bg-secondary mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg text-foreground mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.shortDesc}</p>
            <p className="text-sm text-foreground">${product.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}
