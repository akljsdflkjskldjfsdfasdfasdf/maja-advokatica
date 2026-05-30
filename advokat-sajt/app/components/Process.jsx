"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    num: "I",
    title: "Konsultacija",
    desc: "Besplatan prvi razgovor u kome pažljivo analiziramo Vaš slučaj i procenjujemo sve pravne mogućnosti.",
  },
  {
    num: "II",
    title: "Strategija",
    desc: "Izrađujemo preciznu pravnu strategiju prilagođenu Vašim ciljevima, rokovima i okolnostima.",
  },
  {
    num: "III",
    title: "Zastupanje",
    desc: "Aktivno i posvećeno zastupamo Vaše interese pred svim nadležnim organima i sudovima.",
  },
  {
    num: "IV",
    title: "Ishod",
    desc: "Pratimo predmet do konačnog rešenja. Potpuna transparentnost i redovna komunikacija u svakom koraku.",
  },
];

export default function Process() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

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

      gsap.utils.toArray(".stagger-group").forEach((group) => {
        const children = group.querySelectorAll(".stagger-child");
        gsap.fromTo(
          children,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 82%" },
          },
        );
      });

      document.querySelectorAll(".step-connector").forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            delay: i * 0.25,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".process-steps-row", start: "top 76%" },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proces"
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #141109 0%, #0e0c07 50%, #120f08 100%)",
      }}
    >
      <div
        className="section-glow absolute top-1/3 right-0 pointer-events-none"
        style={{
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(ellipse at 100% 50%, rgba(201,168,76,.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <p className="section-label fade-up mb-6 justify-center">
            Kako radimo
          </p>
          <h2 className="section-heading fade-up">
            Jednostavan proces,
            <br />
            <em className="not-italic" style={{ color: "var(--gold-vivid)" }}>
              jasni rezultati
            </em>
          </h2>
        </div>

        <div className="process-steps-row stagger-group relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="step-connector hidden lg:block absolute top-10"
              style={{
                left: `calc(${(i + 1) * 25}% - 0px)`,
                width: "calc(25% - 6rem)",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(201,168,76,.45), rgba(201,168,76,.12))",
                transformOrigin: "left center",
              }}
            />
          ))}

          {STEPS.map((step) => (
            <div
              key={step.num}
              className="stagger-child process-step text-center group"
            >
              <div className="process-step-diamond mx-auto mb-7">
                <span className="step-num-text">{step.num}</span>
              </div>
              <h3
                className="font-display text-2xl mb-3 group-hover:text-gold-light transition-colors duration-300"
                style={{ color: "var(--cream)" }}
              >
                {step.title}
              </h3>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: "var(--cream-muted)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
