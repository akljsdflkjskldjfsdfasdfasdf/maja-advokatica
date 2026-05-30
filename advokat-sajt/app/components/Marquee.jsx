"use client";

const MARQUEE_ITEMS = [
  "Krivično pravo",
  "Porodično pravo",
  "Nekretnine",
  "Privredno pravo",
  "Radno pravo",
  "Nasledno pravo",
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{
        background: "linear-gradient(to right, #1c1608, #231c0e, #1c1608)",
        borderColor: "rgba(201,168,76,.18)",
        boxShadow:
          "inset 0 1px 0 rgba(201,168,76,.14), inset 0 -1px 0 rgba(201,168,76,.08)",
      }}
    >
      <div className="marquee-track">
        {[
          ...MARQUEE_ITEMS,
          ...MARQUEE_ITEMS,
          ...MARQUEE_ITEMS,
          ...MARQUEE_ITEMS,
        ].map((item, i) => (
          <span
            key={i}
            className="font-display italic text-lg px-8 flex-shrink-0"
            style={{
              color: i % 2 === 0 ? "var(--gold-vivid)" : "var(--cream-muted)",
            }}
          >
            {item}
            <span
              className="ml-8 not-italic text-sm"
              style={{ color: "var(--charcoal-500)" }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
