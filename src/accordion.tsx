import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { formatPKR } from "@/lib/format";
import { fallbackImageFor } from "@/lib/menu-images";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  category_id: string | null;
  categories?: { slug: string | null } | null;
};

export function MenuCard({ item }: { item: MenuItem }) {
  const { add, setOpen } = useCart();
  const img = item.image_url || fallbackImageFor({ name: item.name, categorySlug: item.categories?.slug });

  return (
    <div className="group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-card hover:border-gold/60 transition-all flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={img} alt={item.name}
          loading="lazy" width={400} height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-sm text-muted-foreground">
            Unavailable
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground leading-tight">{item.name}</h3>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <span className="text-gold font-bold">{formatPKR(item.price)}</span>
          <button
            disabled={!item.is_available}
            onClick={() => {
              add({ id: item.id, name: item.name, price: Number(item.price), image_url: item.image_url });
              toast.success(`Added ${item.name}`, { duration: 1500 });
              setOpen(true);
            }}
            className="inline-flex items-center gap-1 bg-gold text-primary-foreground text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedRow({ items }: { items: MenuItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-gold text-sm tracking-[0.3em] uppercase">Bestsellers</p>
          <h2 className="font-display text-3xl sm:text-4xl mt-2">Featured Tonight</h2>
        </div>
        <Link to="/menu" className="text-sm text-gold hover:underline">View full menu →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((it) => <MenuCard key={it.id} item={it} />)}
      </div>
    </section>
  );
}
