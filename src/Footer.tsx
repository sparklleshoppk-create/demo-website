import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/format";
import { fallbackImageFor } from "@/lib/menu-images";

export function CartDrawer() {
  const { isOpen, setOpen, items, setQty, remove, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l border-border z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl text-gold">Your Order</h2>
          <button onClick={() => setOpen(false)} className="p-2 hover:text-gold" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              <p>Your cart is empty.</p>
              <Link to="/menu" onClick={() => setOpen(false)} className="text-gold underline mt-2 inline-block">Browse menu</Link>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 p-3 rounded-xl bg-card border border-border/60">
                <img
                  src={it.image_url || fallbackImageFor({ name: it.name })}
                  alt={it.name} loading="lazy" width={64} height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <p className="font-medium truncate">{it.name}</p>
                    <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-gold">{formatPKR(it.price)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setQty(it.id, it.quantity - 1)} className="h-7 w-7 rounded-md bg-muted hover:bg-gold hover:text-primary-foreground flex items-center justify-center">
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm">{it.quantity}</span>
                    <button onClick={() => setQty(it.id, it.quantity + 1)} className="h-7 w-7 rounded-md bg-muted hover:bg-gold hover:text-primary-foreground flex items-center justify-center">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatPKR(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-gold text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition shadow-glow"
            >
              Checkout · {formatPKR(subtotal)}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
