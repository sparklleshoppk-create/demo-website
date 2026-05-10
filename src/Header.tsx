export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-display text-gradient-gold tracking-[0.2em] text-xl">CHATTHAS</div>
          <p className="text-muted-foreground mt-3">Premium burgers, wraps & deals — delivered hot to your door.</p>
        </div>
        <div>
          <div className="text-gold font-semibold mb-2">Hours</div>
          <p className="text-muted-foreground">Daily · 12:00 PM – 2:00 AM</p>
        </div>
        <div>
          <div className="text-gold font-semibold mb-2">Contact</div>
          <p className="text-muted-foreground">+92 300 0000000<br/>hello@chatthas.com</p>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Chatthas. All rights reserved.
      </div>
    </footer>
  );
}
