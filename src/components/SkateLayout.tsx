import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/tipos-de-skate", label: "Tipos de skate" },
  { to: "/jogos-online", label: "Jogos online" },
  { to: "/eventos", label: "Eventos mundiais/nacionais" },
  { to: "/contatos", label: "Contatos" },
] as const;

export function SkateLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="skate-body">
      <div className="skate-shell">
        <h1 className="skate-header">SKATE</h1>
        <p className="skate-tagline">Jogos online, copas, e muito mais sobre o esporte</p>
        <nav className="skate-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={pathname === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <hr className="skate-hr" />
        <main className="skate-main">{children}</main>
      </div>
    </div>
  );
}
