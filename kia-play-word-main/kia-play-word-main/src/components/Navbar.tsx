import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "홈" },
  { to: "/about", label: "활동 설명" },
  { to: "/practice", label: "연습 시작" },
  { to: "/#contact", label: "문의하기" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
          <span className="inline-flex h-9 w-9 rounded-full bg-mint border-2 border-foreground items-center justify-center">🌱</span>
          <span>키아쌤의 읽어봐요</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 rounded-full text-base hover:bg-mint/60 transition-colors"
              activeProps={{ className: "bg-mint border-2 border-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden p-2 rounded-full border-2 border-foreground bg-cream"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-2xl text-lg bg-muted hover:bg-mint transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
