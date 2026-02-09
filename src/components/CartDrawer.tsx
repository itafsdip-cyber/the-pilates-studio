import { useCart } from "@/context/CartContext";
import { X, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCart();

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
          <h2 className="font-serif text-xl text-foreground">Your Cart</h2>
          <button onClick={closeCart} className="p-1 text-foreground" aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-6">Your cart is empty</p>
              <Link
                to="/collection/reformers"
                onClick={closeCart}
                className="text-xs tracking-widest uppercase border-b border-foreground pb-1 text-foreground"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-foreground truncate">{item.name}</h3>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                      )}
                      <p className="text-sm text-foreground mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-0.5 text-muted-foreground hover:text-foreground"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs text-foreground w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-0.5 text-muted-foreground hover:text-foreground"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border px-6 py-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm text-foreground">${total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Delivery and setup calculated at checkout.
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full text-center py-3.5 bg-foreground text-primary-foreground text-xs tracking-widest uppercase transition-opacity duration-300 hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
