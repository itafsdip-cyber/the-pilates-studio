import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { items, total } = useCart();

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl text-foreground mb-2">Checkout</h1>
        <p className="text-sm text-muted-foreground mb-12">You're almost there.</p>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link
              to="/"
              className="text-xs tracking-widest uppercase border-b border-foreground pb-1 text-foreground"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans">Contact</h3>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-sans">Delivery Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="First name" className="px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    <input placeholder="Last name" className="px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <input placeholder="Address" className="w-full mt-3 px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <input placeholder="City" className="px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    <input placeholder="State" className="px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    <input placeholder="ZIP" className="px-4 py-3 bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
                >
                  Place Order
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Your information is secure. We never share your details.
                </p>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-secondary/40 p-6">
                <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-sans">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.name} × {item.quantity}</span>
                      <span className="text-foreground">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
