"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    quote:
      "Profesionalizam i posvećenost advokatice Mrdjen prevazišli su sva moja očekivanja. Krivični postupak koji je trajao godinama rešen je u naše korist. Beskrajno zahvalan.",
    author: "Marko S.",
    detail: "Krivično pravo · 2023",
    stars: 5,
  },
  {
    quote:
      "Razvod je bio izuzetno težak period, ali uz stručnu i humanu podršku, uspeli smo da zaštitimo interese naše dece. Toplo preporučujem svima koji prolaze kroz sličnu situaciju.",
    author: "Milica V.",
    detail: "Porodično pravo · 2024",
    stars: 5,
  },
  {
    quote:
      "Kupovina stana prošla je savršeno zahvaljujući detaljnoj pravnoj proveri. Sve zamke u ugovoru su otkrivene na vreme. Profesionalnost na najvišem nivou.",
    author: "Dragan M.",
    detail: "Nekretnine · 2023",
    stars: 5,
  },
  {
    quote:
      "Nezakonit otkaz, mobing, sve je rešeno povoljno za mene uz minimalan stres. Advokatica Mrdjen je uvek dostupna i izuzetno jasno objašnjava svaki korak.",
    author: "Jelena R.",
    detail: "Radno pravo · 2024",
    stars: 5,
  },
];

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(0);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section-glow").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 54 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray(".fade-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Drag scroll carousel
  useEffect(() => {
    const wrap = carouselRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let isDragging = false;
    let currentX = 0;
    let targetX = 0;
    let velX = 0;
    let lastX = 0;
    let rafId = 0;

    const cardWidth = 436;

    const clampX = (x) => {
      const maxScroll = -(track.scrollWidth - wrap.clientWidth);
      return Math.max(maxScroll, Math.min(0, x));
    };

    const updateDot = (x) => {
      const idx = Math.round(Math.abs(x) / cardWidth);
      setActiveDot(Math.min(idx, TESTIMONIALS.length - 1));
    };

    const loop = () => {
      velX *= 0.88;
      if (!isDragging) targetX += velX;
      targetX = clampX(targetX);
      currentX += (targetX - currentX) * 0.12;
      track.style.transform = `translateX(${currentX}px)`;
      updateDot(currentX);
      if (Math.abs(velX) > 0.05 || Math.abs(targetX - currentX) > 0.1) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onDown = (e) => {
      isDragging = true;
      cancelAnimationFrame(rafId);
      wrap.classList.add("is-dragging");
      lastX = "touches" in e ? e.touches[0].clientX : e.clientX;
      velX = 0;
    };
    const onMove = (e) => {
      if (!isDragging) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const dx = x - lastX;
      velX = dx;
      lastX = x;
      targetX += dx;
      currentX += dx * 0.85;
      currentX = clampX(currentX);
      targetX = clampX(targetX);
      track.style.transform = `translateX(${currentX}px)`;
      updateDot(currentX);
    };
    const onUp = () => {
      isDragging = false;
      wrap.classList.remove("is-dragging");
      rafId = requestAnimationFrame(loop);
    };

    wrap.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    wrap.addEventListener("touchstart", onDown, { passive: true });
    wrap.addEventListener("touchmove", onMove, { passive: true });
    wrap.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      wrap.removeEventListener("touchstart", onDown);
      wrap.removeEventListener("touchmove", onMove);
      wrap.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section
      id="recenzije"
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{
        background:
          "linear-gradient(175deg, #1d1810 0%, #151009 50%, #1b1509 100%)",
      }}
    >
      <div
        className="section-glow absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "60vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.11) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,.30) 25%, rgba(240,208,96,.48) 50%, rgba(201,168,76,.30) 75%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <p className="section-label fade-up mb-6">Recenzije klijenata</p>
            <h2 className="section-heading fade-up">
              Reči onih koji
              <br />
              <em className="not-italic" style={{ color: "var(--gold-vivid)" }}>
                su nam verovali
              </em>
            </h2>
          </div>
          <div className="fade-right text-right hidden lg:block">
            <div
              className="font-display text-5xl"
              style={{ color: "var(--gold-vivid)" }}
            >
              5.0
            </div>
            <div className="flex justify-end gap-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  ★
                </span>
              ))}
            </div>
            <p
              className="font-ui"
              style={{
                fontSize: ".625rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--cream-muted)",
              }}
            >
              Prosečna ocena
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 fade-up">
          <span
            className="font-ui text-[.6rem] tracking-[.2em] uppercase"
            style={{ color: "rgba(201,168,76,.5)" }}
          >
            ← Prevuci za više →
          </span>
        </div>

        <div ref={carouselRef} className="testimonials-carousel-wrap">
          <div ref={trackRef} className="testimonials-carousel-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  background: "linear-gradient(145deg, black 5%, #181108 100%)",
                }}
              >
                <div className="quote-mark mb-2">"</div>
                <p
                  className="font-body text-lg leading-relaxed mb-6 italic"
                  style={{ color: "var(--cream)" }}
                >
                  {t.quote}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-ui text-sm font-medium"
                      style={{ color: "var(--cream-strong)" }}
                    >
                      {t.author}
                    </div>
                    <div
                      className="font-ui mt-0.5"
                      style={{
                        fontSize: ".6rem",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--gold-vivid)",
                        opacity: 0.85,
                      }}
                    >
                      {t.detail}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, j) => (
                      <span key={j} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="corner-accent-tl" />
                <div className="corner-accent-br" />
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots mt-8">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot ${activeDot === i ? "active" : ""}`}
              onClick={() => {
                if (trackRef.current) {
                  const targetX = -(i * 436);
                  gsap.to(trackRef.current, {
                    x: targetX,
                    duration: 0.6,
                    ease: "power2.inOut",
                  });
                  setActiveDot(i);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
