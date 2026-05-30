"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
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
          }
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
          }
        );
      });

      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 54 }, {
          opacity: 1, y: 0, duration: 1.05, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray(".fade-left").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -40 }, {
          opacity: 1, x: 0, duration: 1.05, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="o-meni"
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0e0c08 0%, #0a0805 100%)" }}
    >
      <div
        className="section-glow absolute top-0 left-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 10% 50%, rgba(201,168,76,.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,.22) 30%, rgba(201,168,76,.22) 70%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Visual */}
          <div className="fade-left relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] max-w-[360px] mx-auto lg:mx-0">
              <div className="photo-frame-inner" />
              <div className="photo-frame-outer" />

              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(160deg, #1f1b12 0%, #282117 100%)" }}
              >
                <div className="text-center px-6">
                  <div
                    className="font-display mb-3"
                    style={{ fontSize: "6rem", color: "rgba(201,168,76,.18)", lineHeight: 1 }}
                  >
                    MM
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                    alt="Advokatica Maja Mrdjen"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="photo-gold-dot" />
              <div className="photo-gold-ring" />
            </div>

            <div className="floating-badge absolute top-6 -right-6 lg:-right-12 hidden lg:block">
              <div className="floating-badge-num">15+</div>
              <div className="floating-badge-label">Godina prakse</div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="section-label fade-up mb-6">O meni</p>
            <h2 className="section-heading fade-up mb-8">
              Predanost,
              <br />
              <em className="not-italic" style={{ color: "var(--gold-vivid)" }}>
                znanje
              </em>{" "}
              i iskustvo.
            </h2>

            <div
              className="fade-up space-y-5 leading-relaxed mb-10"
              style={{ color: "var(--cream-muted)", fontSize: "1.15rem" }}
            >
              <p>
                Advokatica sa više od 15 godina aktivne prakse u svim oblastima prava. Diplomirala
                sam na Pravnom fakultetu u Novom Sadu, gde sam stekla i zvanje magistra pravnih
                nauka.
              </p>
              <p>
                Kroz stotine uspešno rešenih predmeta, izgradila sam reputaciju advokata koji se
                bori do poslednje instance i nikada ne odustaje od interesa svojih klijenata.
              </p>
            </div>

            <div className="fade-up space-y-3 mb-10">
              {[
                "Član Advokatske komore Vojvodine",
                "Magistar pravnih nauka – Pravni fakultet Novi Sad",
                "Specijalizacija iz krivičnog i porodičnog prava",
                "Višegodišnje iskustvo pred svim srpskim sudovima",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="credential-dot mt-2" />
                  <span className="credential-text">{item}</span>
                </div>
              ))}
            </div>

            <div className="fade-up magnetic-wrap">
              <a href="#kontakt" className="btn-primary">
                <span>Razgovarajmo o Vašem slučaju</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}