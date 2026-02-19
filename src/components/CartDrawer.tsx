import { useCartStore } from "@/stores/cartStore";
import { X, Minus, Plus, Loader2, ExternalLink } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, isLoading, isSyncing, getCheckoutUrl } = useCartStore();

  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.total());
  const currencyCode = items[0]?.price.currencyCode ?? "USD";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      closeCart();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-foreground/20 z-50 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">
            Your Cart {itemCount > 0 && <span className="text-sm text-muted-foreground font-sans">({itemCount})</span>}
          </h2>
          <button onClick={closeCart} className="p-1 text-foreground" aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-6">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-xs tracking-widest uppercase border-b border-foreground pb-1 text-foreground"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-6">
                {items.map((item) => {
                  const imageUrl = item.product.node.images?.edges?.[0]?.node?.url;
                  return (
                    <div key={item.variantId} className="flex gap-4">
                      <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                        {imageUrl && (
                          <img src={imageUrl} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-foreground truncate">{item.product.node.title}</h3>
                        {item.variantTitle !== "Default Title" && (
                          <p className="text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
                        )}
                        <p className="text-sm text-foreground mt-1">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-0.5 text-muted-foreground hover:text-foreground"
                            disabled={isLoading}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs text-foreground w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-0.5 text-muted-foreground hover:text-foreground"
                            disabled={isLoading}
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                            disabled={isLoading}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border px-6 py-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm text-foreground">
                  {currencyCode} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Delivery and setup calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-primary-foreground text-xs tracking-widest uppercase transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
              >
                {isLoading || isSyncing ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <ExternalLink size={14} />
                    Checkout with Shopify
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
