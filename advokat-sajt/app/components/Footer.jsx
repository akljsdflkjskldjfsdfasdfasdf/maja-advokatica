"use client";

const NAV_LINKS = [
  { label: "O meni", href: "#o-meni" },
  { label: "Usluge", href: "#usluge" },
  { label: "Proces", href: "#proces" },
  { label: "Recenzije", href: "#recenzije" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "linear-gradient(to bottom, #0a0806, #050302)",
        borderColor: "rgba(201,168,76,.16)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          <div className="text-center lg:text-left">
            <div
              className="font-display text-xl"
              style={{ color: "var(--cream)" }}
            >
              Maja Mrđen
            </div>
            <div
              className="font-ui mt-0.5"
              style={{
                fontSize: ".6rem",
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: "var(--gold-vivid)",
              }}
            >
              Advokat · Žabalj 
            </div>
            <p
              className="font-ui text-xs mt-4 max-w-xs"
              style={{
                color: "var(--cream-muted)",
                opacity: 0.5,
                lineHeight: 1.7,
              }}
            >
              Nikole Tesle 88, Žabalj
              <br />
              +381 21 123 4567
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <p
            className="font-ui text-xs text-center lg:text-right"
            style={{ color: "rgba(208,198,176,.35)", lineHeight: 1.8 }}
          >
            © {new Date().getFullYear()} Maja Mrđen Advokat
            <br />
            Sva prava zadržana
          </p>
        </div>

        <div
          className="mt-12 pt-8 overflow-hidden"
          style={{ borderTop: "1px solid rgba(201,168,76,.10)" }}
        >
          <div
            className="footer-watermark font-bold uppercase text-center"
            style={{
              fontSize: "clamp(3rem,8vw,8rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Maja Mrđen
          </div>
        </div>
      </div>
    </footer>
  );
}
