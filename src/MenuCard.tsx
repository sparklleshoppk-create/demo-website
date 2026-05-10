import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV_LEFT = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
];
const NAV_RIGHT = [
  { to: "/menu", label: "Deals", search: { cat: "deals" } as const },
  { to: "/login", label: "Admin" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 md:h-20 gap-3">
          {/* Left nav (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LEFT.map((n) => (
              <Link key={n.label} to={n.to}
                className="text-foreground/80 hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 -ml-2 text-foreground" onClick={() => setMobile((v) => !v)} aria-label="Menu">
            {mobile ? <X size={22} /> : <MenuIcon size={22} />}
          </button>

          {/* Centered logo — long text branding, full width container */}
          <div className="flex justify-center min-w-0 px-2">
            <Link to="/" className="block text-center min-w-0">
              <div className="font-display text-gradient-gold tracking-[0.2em] text-lg sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap leading-none">
                CHATTHAS
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground tracking-[0.35em] uppercase mt-1">
                The Authentic Taste
              </div>
            </Link>
          </div>

          {/* Right nav + cart */}
          <div className="flex items-center gap-2 md:gap-5">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {NAV_RIGHT.map((n) => (
                <Link key={n.label} to={n.to} search={(n as any).search}
                  className="text-foreground/80 hover:text-gold transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center justify-center rounded-full bg-gold text-primary-foreground h-10 px-4 hover:opacity-90 transition shadow-glow"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              <span className="ml-2 hidden sm:inline text-sm font-semibold">Cart</span>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-background text-gold text-[10px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center border border-gold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobile && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-up">
            {[...NAV_LEFT, ...NAV_RIGHT].map((n) => (
              <Link key={n.label} to={n.to} search={(n as any).search}
                onClick={() => setMobile(false)}
                className="px-3 py-2 rounded-md hover:bg-muted text-foreground/90">
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Hide on confirmation page noise */}
      <span className="sr-only">{location.pathname}</span>
    </header>
  );
}
