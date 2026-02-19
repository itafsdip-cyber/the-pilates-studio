import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";

// Map URL slugs → Shopify product_type or tags to filter
const categoryLabels: Record<string, string> = {
  reformers: "Reformers",
  towers: "Towers & Cadillacs",
  mats: "Mats & Accessories",
  barrels: "Barrels & Chairs",
};

const categoryDescriptions: Record<string, string> = {
  reformers: "Precision-engineered reformers for home practitioners and professional studios.",
  towers: "Comprehensive training systems for full-body Pilates practice.",
  mats: "Thoughtfully designed essentials to support your practice.",
  barrels: "Specialised equipment for spinal health, strength, and balance.",
};

export default function Collection() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const title = categoryLabels[category || ""] ?? "Collection";
  const description = categoryDescriptions[category || ""] ?? "";

  useEffect(() => {
    setLoading(true);
    storefrontApiRequest(PRODUCTS_QUERY, { first: 50 })
      .then((data) => {
        const all: ShopifyProduct[] = data?.data?.products?.edges ?? [];
        setProducts(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-12 lg:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-foreground">{title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12 lg:mb-16">
        <h1 className="text-4xl lg:text-5xl text-foreground mb-4">{title}</h1>
        <p className="text-sm text-muted-foreground max-w-lg">{description}</p>
      </div>

      {/* Filter button */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-muted-foreground">{loading ? "Loading…" : `${products.length} products`}</p>
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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">No products found in this collection.</p>
          <p className="text-sm text-muted-foreground">Tell me what product you'd like to add and I'll create it for you!</p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => {
            const imageUrl = product.node.images?.edges?.[0]?.node?.url;
            const price = product.node.priceRange.minVariantPrice;
            return (
              <div key={product.node.id} className="group block">
                <Link to={`/product/${product.node.handle}`}>
                  <div className="aspect-square overflow-hidden bg-secondary mb-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.node.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                    )}
                  </div>
                  <h3 className="text-lg text-foreground mb-1">{product.node.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{product.node.description}</p>
                  <p className="text-sm text-foreground mb-3">
                    {price.currencyCode} {parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </Link>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={isLoading}
                  className="text-xs tracking-widest uppercase border-b border-foreground pb-0.5 text-foreground hover:opacity-70 transition-opacity duration-300 disabled:opacity-40"
                >
                  {isLoading ? "Adding…" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
