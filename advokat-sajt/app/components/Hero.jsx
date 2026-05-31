"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const particles = [];

    const spawn = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.4 + 0.1),
      op: 0,
      size: Math.random() * 1.8 + 0.4,
      life: 0,
      maxLife: 200 + Math.random() * 300,
    });

    for (let i = 0; i < 70; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife;
      p.op = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55;
      particles.push(p);
    }

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.life++;
        if (p.life > p.maxLife) {
          particles[i] = spawn();
          return;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.op = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.op})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particle-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default function Hero({ showMobileCta, scrollPct }) {
  const heroRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const statsBarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Hero intro animacija ──
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo(
          ".hero-label",
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        )
        .to(
          ".hero-line > span",
          { y: 0, stagger: 0.14, duration: 1.3, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          heroSubRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-trust",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.1",
        );

      // ── Stats bar — fade in kada dođe u viewport ──
      gsap.fromTo(
        statsBarRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsBarRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      // ── Stat brojevi — animiraju se kada stats bar uđe u viewport ──
      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target || "0");
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.4,
            ease: "power1.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsBarRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Mobile Floating CTA */}
      <div
        className={`mobile-cta md:hidden ${showMobileCta ? "" : "hidden-cta"}`}
      >
        <a
          href="#kontakt"
          className="btn-primary shadow-xl"
          style={{ background: "#000" }}
        >
          <span>Zakaži termin</span>
        </a>
      </div>

      {/* ═══════ HERO — min-h-screen, slika i sadržaj ═══════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#030201" }}
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 z-[0]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1800&q=80&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.78,
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 60% 50%, rgba(3,2,1,0.55) 0%, rgba(3,2,1,0.88) 70%)",
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 z-[2]">
          <ParticleCanvas />
        </div>

        {/* Zlatni glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[3]"
          style={{
            width: "72vw",
            height: "72vw",
            background:
              "radial-gradient(circle, rgba(201,168,76,.07) 0%, rgba(201,168,76,.02) 40%, transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 38%, rgba(3,2,1,.85) 100%)",
          }}
        />

        {/* Vertikalne linije */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
          {[1, 3].map((col) => (
            <div
              key={col}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${col * 25}%`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(201,168,76,.08) 25%, rgba(201,168,76,.08) 75%, transparent)",
              }}
            />
          ))}
        </div>

        {/* Sadržaj */}
        <div className="relative z-[5] max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 w-full">
          <div
            className="hero-label flex items-center gap-4 mb-10"
            style={{ opacity: 0 }}
          >
            <div className="w-10 h-px bg-gold-vivid" />
            <span
              className="font-ui text-[0.65rem] tracking-[0.26em] uppercase"
              style={{ color: "var(--gold-vivid)" }}
            >
              Pravna kancelarija · Žabalj
            </span>
          </div>

          <div className="mb-8">
            {[
              { text: "Vaša pravna", italic: false },
              { text: "sigurnost.", italic: true },
              { text: "Naš prioritet.", italic: false },
            ].map((line, i) => (
              <div key={i} className="hero-line overflow-hidden">
                <span
                  className={`block font-display leading-[1.04] ${line.italic ? "italic" : ""}`}
                  style={{
                    fontSize: "clamp(2.9rem, 7.2vw, 7.8rem)",
                    color: line.italic ? "var(--gold-vivid)" : "var(--cream)",
                    transform: "translateY(110%)",
                    letterSpacing: "-0.022em",
                  }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          <p
            ref={heroSubRef}
            className="font-body text-xl md:text-2xl max-w-lg leading-relaxed mb-10"
            style={{ opacity: 0, color: "var(--cream-muted)" }}
          >
            Stručna pravna pomoć sa više od 15 godina iskustva. Predani zaštiti
            Vaših prava i interesa u svakom predmetu.
          </p>

          <div
            ref={heroCtaRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10"
            style={{ opacity: 0 }}
          >
            <div className="magnetic-wrap">
              <a href="#kontakt" className="btn-primary btn-primary-pulse">
                <span>Zakaži besplatnu konsultaciju</span>
              </a>
            </div>
            <a href="#usluge" className="btn-ghost">
              <span className="btn-line" />
              <span>Pogledaj usluge</span>
            </a>
          </div>

          <div className="hero-trust trust-strip" style={{ opacity: 0 }}>
            {[
              { icon: "⚖", label: "15+ godina iskustva" },
              { icon: "✓", label: "500+ predmeta" },
            ].map((t) => (
              <div key={t.label} className="trust-item">
                <span className="trust-item-icon">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
      </section>

      {/* ═══════ STATS BAR — van hero sekcije, scroll-triggered ═══════ */}
      <div
        ref={statsBarRef}
        className="relative z-10 w-full border-t border-charcoal-300"
        style={{
          background: "black",
          opacity: 0,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 divide-x divide-charcoal-300">
            {[
              { num: 15, suffix: "+", label: "Godina iskustva" },
              { num: 500, suffix: "+", label: "Rešenih predmeta" },
              { num: 98, suffix: "%", label: "Zadovoljnih klijenata" },
            ].map((stat) => (
              <div key={stat.label} className="stat-item text-center py-10">
                <div
                  className="font-display text-3xl md:text-4xl tracking-tight"
                  style={{ color: "var(--gold-vivid)" }}
                >
                  <span className="stat-num" data-target={stat.num}>
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <div
                  className="font-ui mt-2"
                  style={{
                    fontSize: ".625rem",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "var(--cream-muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
