"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Quote() {
  const quoteWords =
    "Pravda nije samo cilj — to je put kojim zajedno hodamo.".split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quote-word",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".quote-section", start: "top 75%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="quote-section py-24 overflow-hidden relative border-y"
      style={{ background: "#040302", borderColor: "rgba(201,168,76,.22)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 90% at 50% 50%, rgba(201,168,76,.10) 0%, transparent 65%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
        <div
          className="font-display absolute -top-4 left-4 lg:left-0"
          style={{
            fontSize: "8rem",
            lineHeight: 1,
            color: "rgba(201,168,76,.14)",
          }}
          aria-hidden
        >
          "
        </div>
        <blockquote
          className="font-display italic leading-snug mb-8"
          style={{
            fontSize: "clamp(1.7rem, 3.5vw, 3.4rem)",
            color: "var(--cream-strong)",
          }}
        >
          {quoteWords.map((word, i) => (
            <span
              key={i}
              className="quote-word inline-block mr-[.28em]"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-gold" />
          <span
            className="font-ui uppercase"
            style={{
              fontSize: ".6875rem",
              letterSpacing: ".2em",
              color: "var(--gold-vivid)",
            }}
          >
            Maja Mrdjen
          </span>
          <div className="w-8 h-px bg-gold" />
        </div>
      </div>
    </section>
  );
}
