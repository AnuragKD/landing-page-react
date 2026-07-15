import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../components/common/Container";
import SectionLabel from "../components/common/SectionLabel";
import { badges } from "../data/badges";
import secLogo from "../assets/icons/who_its_sec_logo.svg";
import { initBadgeOrbitAnimation } from "../animations/badges";

/** Coordinate positions for each badge around the center logo (desktop only) */
const BADGE_POSITIONS = [
  { x: 190,  y: -195 }, // Top
  { x: 310,  y: 0   }, // Top Right
  { x: 120,  y: 260  }, // Right
  { x: -320, y: 160  }, // Bottom Right
  { x: -300, y: -110 }, // Bottom
];

const WhoItsForSection = () => {
  const sectionRef = useRef(null);
  const badgeRefs  = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Badge orbit animation only runs on desktop (lg+)
    const isDesktop = window.innerWidth >= 1024;
    if (prefersReduced || !isDesktop) return;

    const ctx = gsap.context(() => {
      initBadgeOrbitAnimation(badgeRefs, BADGE_POSITIONS);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who-its-for"
      ref={sectionRef}
      aria-label="Who it's for"
      className="relative pb-16 sm:pb-20 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative z-13">
        {/* Section heading */}
        <div className="mb-10 lg:mb-16 text-center">
          <SectionLabel className="mb-4">Who It&apos;s For</SectionLabel>

          <h2 className="mx-auto max-w-[740px] text-[28px] sm:text-[36px] md:text-[46px] lg:text-[60px] font-normal leading-[1.05] lg:leading-[1] tracking-[-0.02em] text-ink">
            Built for workflows where trust is non-negotiable.
          </h2>

          <p className="mt-3 lg:mt-4 text-[15px] sm:text-[16px] lg:text-[18px] text-ink/50 font-serif">
            Wherever credentials matter, Lorem handles the verification
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            DESKTOP: animated orbit diagram (lg+) — unchanged
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="hidden lg:flex relative mx-auto items-center justify-center"
          style={{ width: 540, height: 540 }}
          role="img"
          aria-label="Industries served by Verify"
        >
          {/* Center logo */}
          <img
            src={secLogo}
            alt="Verify central hub logo"
            className="h-full w-full object-contain"
            draggable={false}
          />

          {/* Animated badges */}
          {badges.map((badge, i) => (
            <div
              key={badge.id}
              ref={(el) => (badgeRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(${BADGE_POSITIONS[i].x}px, ${BADGE_POSITIONS[i].y}px)`,
              }}
            >
              {/* Centering wrapper to keep flat positioning */}
              <div className="absolute" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center gap-3 whitespace-nowrap rounded-full border-2 border-white bg-background px-4 py-3 backdrop-blur-[12px]">
                  <span
                    className="flex h-[44px] w-[44px] shrink-0 items-center justify-center text-amber [&_svg]:h-full [&_svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: badge.icon }}
                    aria-hidden="true"
                  />
                  <span className="text-[20px] font-normal leading-[1] text-[#7a7a7a]">
                    {badge.label.split("\n").map((line, index) => (
                      <span key={index} className="block">{line}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MOBILE / TABLET: static badge grid (< lg) — no animation
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto"
          aria-label="Industries served by Verify"
        >
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-4 rounded-full border-2 border-white bg-white/60 px-5 py-3.5 backdrop-blur-[12px] shadow-sm"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center text-amber [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: badge.icon }}
                aria-hidden="true"
              />
              <span className="text-[15px] sm:text-[16px] font-normal leading-[1.2] text-[#7a7a7a]">
                {badge.label.split("\n").map((line, index) => (
                  <span key={index} className="block">{line}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhoItsForSection;