"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "O meni", href: "#o-meni" },
  { label: "Usluge", href: "#usluge" },
  { label: "Proces", href: "#proces" },
  { label: "Recenzije", href: "#recenzije" },
  { label: "Kontakt", href: "#kontakt" },
];

/* ─── Google "G" icon (official brand colours, SVG) ─────────────────────── */



export default function Navbar({ scrolled, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Magnetic buttons
  useEffect(() => {
    const handlers = [];
    document.querySelectorAll(".magnetic-wrap").forEach((wrap) => {
      const btn = wrap.querySelector("a, button");
      if (!btn) return;
      const move = (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
        gsap.to(btn, { x, y, duration: 0.5, ease: "power2.out" });
      };
      const leave = () =>
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1,0.5)",
        });
      wrap.addEventListener("mousemove", move);
      wrap.addEventListener("mouseleave", leave);
      handlers.push({ el: wrap, move, leave });
    });
    return () =>
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
  }, []);

  return (
    <>
      {/* ═══════ FULLSCREEN MOBILE MENU ═══════ */}
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
        <button
          className="absolute top-6 right-6 p-3 text-cream-muted hover:text-gold-light transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
          aria-label="Zatvori meni"
        >
          <span className="block w-6 h-px bg-current rotate-45 translate-y-px" />
          <span className="block w-6 h-px bg-current -rotate-45 -translate-y-px" />
        </button>

        <nav className="flex flex-col items-center gap-8 mb-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201,168,76,.3) 30%, rgba(240,208,96,.5) 50%, rgba(201,168,76,.3) 70%, transparent)",
          }}
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-ui text-[0.6rem] tracking-[0.24em] uppercase text-gold opacity-40">
          Maja Mrđen · Advokat
        </div>
      </div>

      {/* ═══════ HEADER ═══════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-charcoal/97 backdrop-blur-md border-b border-charcoal-400"
            : "bg-transparent"
        }`}
        style={scrolled ? { boxShadow: "0 4px 40px rgba(0,0,0,0.75)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[4.5rem]">
          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/Maja_Mrdjen_LOGO_GOLD_Transparent-01.png"
              alt="Mrđen Advokat"
              className="h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.25))" }}
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg text-cream tracking-wide group-hover:text-gold-light transition-colors duration-300">
                Maja Mrđen
              </span>
              <span className="font-ui text-[9px] tracking-[0.25em] uppercase text-gold mt-0.5">
                Advokat · Žabalj
              </span>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.slice(1) ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 z-[210] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meni"
          >
            <span
              className={`block w-6 h-px transition-all duration-400 origin-center ${menuOpen ? "rotate-45 translate-y-[7px] bg-gold" : "bg-cream"}`}
            />
            <span
              className={`block h-px transition-all duration-400 ${menuOpen ? "opacity-0 w-6 bg-gold" : "w-4 bg-gold"}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-400 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px] bg-gold" : "bg-cream"}`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
