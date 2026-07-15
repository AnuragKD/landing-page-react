import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/common/Container";
import StatCard from "../components/ui/StatCard";
import { initHeroAnimations, initTrustTextAnimation } from "../animations/hero";
import heroGradient from "../assets/images/hero_gradient.png";
import phone from "../assets/images/iPhone 14 Pro.png";
import organizations from "../assets/icons/organizations.png";
import credentials from "../assets/icons/credentials.png";
import folderTop from "../assets/icons/Folder top.svg";
import folderBottom from "../assets/icons/folder bottom.svg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef       = useRef(null);
  const pinRef           = useRef(null);
  const textContainerRef = useRef(null);
  const phoneRef         = useRef(null);
  const card1Ref         = useRef(null);
  const card2Ref         = useRef(null);
  const trustBodyRef     = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    // Use 768px as the breakpoint for the interactive/pin scroll design
    const isTabletOrDesktop = window.matchMedia("(min-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (isTabletOrDesktop) {
        // Tablet & Desktop (768px+): full scroll-pin folder hero + trust text reveal animation
        initHeroAnimations({
          pinRef,
          textContainerRef,
          phoneRef,
          card1Ref,
          card2Ref,
          trustBodyRef,
        });
      } else {
        // Mobile only (< 768px): only the lightweight trust text reveal
        initTrustTextAnimation(trustBodyRef);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-background">
      <section id="home" aria-label="Hero" className="relative">

        {/* ═══════════════════════════════════════════════════════════════
            TABLET / DESKTOP LAYOUT (md+) — pinned scroll animation, unchanged
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={pinRef}
          className="hidden md:flex relative h-screen w-full flex-col items-center justify-start pt-24"
        >
          {/* Background gradient */}
          <div
            className="pointer-events-none absolute right-0 top-0 -z-1 h-0 w-full"
            aria-hidden="true"
          >
            <img
              src={heroGradient}
              alt="Decorative background gradient"
              aria-hidden="true"
              className="ml-auto h-auto w-1/3 object-cover object-right"
              draggable={false}
              loading="eager"
            />
          </div>

          {/* Main content text */}
          <Container className="relative z-10">
            <div
              ref={textContainerRef}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-[60px] font-normal leading-[.9] tracking-[-0.025em] text-ink sm:text-[72px] lg:text-[80px]">
                Verification That
                <br />
                <span className="bg-clip-text text-transparent bg-[radial-gradient(40.34%_117.37%_at_56.67%_43.89%,_#FFE592_0%,_#FEE289_27.69%,_#E7B100_100%)]">
                  Starts At The Source.
                </span>
              </h1>

              <p className="mt-5 max-w-[500px] font-serif text-[16px] leading-[1.4] text-black/60">
                lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
                ipsum lorem ipsum lorem ipsum lorem ipsum
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[linear-gradient(136.24deg,_#FFFFFF_-29.87%,_#E78F00_54.36%)] py-2 pl-4 pr-2 text-[14px] font-normal text-white transition-all hover:bg-amber-light active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  Book a Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <rect width="28" height="28" rx="14" fill="#FFAA20" />
                    <path d="M17.625 12.917C18.4063 13.3681 18.4552 14.4541 17.7715 14.9844L17.625 15.083L11.625 18.5469C10.7917 19.0279 9.75 18.4261 9.75 17.4639L9.75 10.5361C9.75 9.63392 10.6656 9.0489 11.4668 9.37598L11.625 9.45312L17.625 12.917Z" stroke="white" strokeWidth={1.5} />
                  </svg>
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex min-h-[48px] items-center gap-1 rounded-full border-2 border-white bg-white px-5 py-2 text-[14px] font-normal text-amber transition-colors hover:bg-amber/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  See how it works
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          </Container>

          {/* Folder pocket at bottom of screen */}
          <div
            className="absolute left-0 right-0 w-full flex justify-center overflow-visible z-20 before:absolute before:inset-0 before:z-30 before:content-[''] before:bg-[linear-gradient(0deg,_#F7F7F7_26.08%,_rgba(245,244,240,0)_100%)]"
            style={{ top: "calc(100vh - 150px)" }}
          >
            <div className="relative mx-5 w-full select-none overflow-visible">
              <img src={folderBottom} alt="Folder base background" aria-hidden="true" className="relative z-0 h-auto w-full object-contain" draggable={false} loading="eager" />

              <div ref={phoneRef} className="absolute top-[-160px] left-1/2 z-10 w-1/3 max-w-[400px] -translate-x-1/2 overflow-visible">
                <img src={phone} alt="Verify app running on iPhone" className="w-full drop-shadow-[0_45px_90px_rgba(0,0,0,0.22)]" draggable={false} loading="eager" />

                <StatCard ref={card1Ref} icon={organizations} iconAlt="Organizations icon" value="250+" label="trusted organizations" className="-left-[160px] top-[12%]" />
                <StatCard ref={card2Ref} icon={credentials}  iconAlt="Credentials icon"    value="10,000+" label="credentials verified securely" className="-right-[200px] top-[26%]" />
              </div>

              <div className="absolute inset-0 z-25 pointer-events-none">
                <img src={folderTop} alt="Folder front pocket overlay" aria-hidden="true" className="relative z-20 h-auto w-full object-contain" draggable={false} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MOBILE LAYOUT (< md) — static, no scroll animation
        ══════════════════════════════════════════════════════════════════ */}
        <div className="md:hidden relative">
          {/* Background gradient — top-right accent */}
          <div
            className="pointer-events-none absolute right-0 top-0 -z-10 h-0 w-full"
            aria-hidden="true"
          >
            <img
              src={heroGradient}
              alt="Decorative background gradient"
              aria-hidden="true"
              className="ml-auto h-auto w-2/3 sm:w-1/2 object-cover object-right opacity-70"
              draggable={false}
              loading="eager"
            />
          </div>

          {/* Text content */}
          <Container className="relative z-10 pt-28 sm:pt-32">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-[38px] sm:text-[52px] font-normal leading-[.92] tracking-[-0.025em] text-ink">
                Verification That
                <br />
                <span className="bg-clip-text text-transparent bg-[radial-gradient(40.34%_117.37%_at_56.67%_43.89%,_#FFE592_0%,_#FEE289_27.69%,_#E7B100_100%)]">
                  Starts At The Source.
                </span>
              </h1>

              <p className="mt-4 sm:mt-5 max-w-[440px] font-serif text-[15px] sm:text-[16px] leading-[1.5] text-black/60">
                lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
                ipsum lorem ipsum lorem ipsum lorem ipsum
              </p>

              {/* CTA row — wraps gracefully on narrow screens */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[linear-gradient(136.24deg,_#FFFFFF_-29.87%,_#E78F00_54.36%)] py-2 pl-4 pr-2 text-[14px] font-normal text-white transition-all hover:bg-amber-light active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  Book a Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <rect width="28" height="28" rx="14" fill="#FFAA20" />
                    <path d="M17.625 12.917C18.4063 13.3681 18.4552 14.4541 17.7715 14.9844L17.625 15.083L11.625 18.5469C10.7917 19.0279 9.75 18.4261 9.75 17.4639L9.75 10.5361C9.75 9.63392 10.6656 9.0489 11.4668 9.37598L11.625 9.45312L17.625 12.917Z" stroke="white" strokeWidth={1.5} />
                  </svg>
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex min-h-[44px] items-center gap-1 rounded-full border-2 border-white bg-white px-5 py-2 text-[14px] font-normal text-amber transition-colors hover:bg-amber/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  See how it works
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Stat cards — inline row below CTA on mobile */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white/60 px-4 py-3 backdrop-blur-xl shadow-sm">
                <img src={organizations} alt="Organizations icon" className="h-auto w-8 object-contain" draggable={false} />
                <div>
                  <p className="text-[18px] font-normal leading-none text-ink">250+</p>
                  <p className="mt-1 font-serif text-[12px] leading-tight text-black/60">trusted organizations</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white/60 px-4 py-3 backdrop-blur-xl shadow-sm">
                <img src={credentials} alt="Credentials icon" className="h-auto w-8 object-contain" draggable={false} />
                <div>
                  <p className="text-[18px] font-normal leading-none text-ink">10,000+</p>
                  <p className="mt-1 font-serif text-[12px] leading-tight text-black/60">credentials verified</p>
                </div>
              </div>
            </div>
          </Container>

          {/* Phone mockup — centered, no folder animation */}
          <div className="relative mt-10 sm:mt-12 -mb-[50%] flex justify-center overflow-hidden ">
            <img src={folderBottom} alt="Folder base background" aria-hidden="true" className="absolute bottom-0 z-0 h-auto w-full object-contain" draggable={false} loading="eager" />
            <img
              src={phone}
              alt="Verify app running on iPhone"
              className="relative z-0 w-[62%] max-w-[300px] sm:max-w-[360px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              draggable={false}
              loading="eager"
            />
            <div className="absolute left-0 right-0 bottom-0 z-25 pointer-events-none before:absolute before:inset-0 before:z-30 before:content-[''] before:bg-[linear-gradient(0deg,_#F7F7F7_26.08%,_rgba(245,244,240,0)_100%)]">
              <img src={folderTop} alt="Folder front pocket overlay" aria-hidden="true" className="relative z-20 h-auto w-full object-contain" draggable={false} />
            </div>
          </div>
        </div>

      </section>

      {/* ── Trust / Mission Statement Section ─────────────────────────────────── */}
      <section
        id="how-it-works"
        aria-label="Mission statement"
        className="relative overflow-hidden z-30"
      >
        <Container className="relative z-10 pt-16 sm:pt-20 md:pt-[240px] pb-16 md:pb-[160px]">
          <div className="mx-auto text-left">
            <p
              ref={trustBodyRef}
              className="text-[22px] sm:text-[32px] md:text-[44px] lg:text-[60px] font-normal leading-[1.1] lg:leading-[1] tracking-[-0.025em] text-ink/30 select-none"
            >
              <span className="highlight-span transition-colors duration-500">
                PDFs get forged. Emails get lost. Manual checks create liability.
              </span>
              <br />
              <span className="highlight-span transition-colors duration-500">
                Lorem replaces static documents with cryptographically&nbsp;
              </span>
              <span className="highlight-span transition-colors duration-500">
                signed credentials issued directly from the source, with a full
                audit trail.
              </span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HeroSection;