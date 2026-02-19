import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

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
  const { handle } = useParams<{ handle: string }>();
  const [productData, setProductData] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((data) => {
        const p = data?.data?.product;
        if (p) {
          setProductData(p);
          setSelectedVariantId(p.variants.edges[0]?.node?.id ?? null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="max-w-content mx-auto px-6 lg:px-10 py-20 text-center">
        <h1 className="text-3xl text-foreground mb-4">Product not found</h1>
        <Link to="/" className="text-sm text-muted-foreground border-b border-foreground pb-0.5">
          Return home
        </Link>
      </div>
    );
  }

  const selectedVariant = productData.variants.edges.find((e) => e.node.id === selectedVariantId)?.node
    ?? productData.variants.edges[0]?.node;

  const images = productData.images.edges;
  const price = selectedVariant?.price ?? productData.priceRange.minVariantPrice;
  const hasOptions = productData.options.some((o) => o.values.length > 1);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    const product: ShopifyProduct = {
      node: {
        ...productData,
        images: productData.images,
        variants: productData.variants,
        options: productData.options,
      },
    };
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
  };

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-8 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link to="/collection/reformers" className="hover:text-foreground transition-colors">Collection</Link></li>
          <li>/</li>
          <li className="text-foreground">{productData.title}</li>
        </ol>
      </nav>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div>
          <div className="aspect-square bg-secondary overflow-hidden mb-3">
            {images[activeImage]?.node ? (
              <img
                src={images[activeImage].node.url}
                alt={images[activeImage].node.altText ?? productData.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 flex-shrink-0 overflow-hidden bg-secondary transition-opacity duration-200 ${i === activeImage ? "opacity-100 ring-1 ring-foreground" : "opacity-50 hover:opacity-80"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:py-8">
          <h1 className="text-3xl lg:text-4xl text-foreground mb-2">{productData.title}</h1>
          <p className="text-xl text-foreground mb-8">
            {price.currencyCode} {parseFloat(price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>

          {/* Variant selector */}
          {hasOptions && productData.options.map((option) => (
            <div key={option.name} className="mb-6">
              <h4 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">{option.name}</h4>
              <div className="flex flex-wrap gap-2">
                {productData.variants.edges.map((ve) => {
                  const v = ve.node;
                  const optValue = v.selectedOptions.find((o) => o.name === option.name)?.value;
                  const isSelected = v.id === selectedVariantId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={!v.availableForSale}
                      className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 border ${
                        isSelected
                          ? "border-foreground bg-foreground text-primary-foreground"
                          : "border-border text-foreground hover:border-foreground"
                      } ${!v.availableForSale ? "opacity-30 line-through cursor-not-allowed" : ""}`}
                    >
                      {optValue}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant?.availableForSale}
            className="w-full py-4 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300 mb-4 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : null}
            {selectedVariant?.availableForSale === false ? "Out of Stock" : isLoading ? "Adding…" : "Add to Cart"}
          </button>

          <p className="text-xs text-muted-foreground text-center mb-12">
            Free white-glove delivery and setup
          </p>

          {/* Description collapsible */}
          <div className="mt-4">
            <CollapsibleSection title="Description">
              {productData.description || "No description available."}
            </CollapsibleSection>
            <CollapsibleSection title="Delivery & Setup">
              White-glove delivery and professional setup included on all large equipment orders. Standard delivery 3–5 business days for accessories.
            </CollapsibleSection>
            <CollapsibleSection title="Warranty & Service">
              All equipment backed by our quality guarantee. Contact support for warranty details specific to this product.
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  );
}
