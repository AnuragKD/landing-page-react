import { useRef } from "react";
import Container from "../common/Container";
import { footerLinks } from "../../data/footerLinks";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useLazyVideo } from "../../hooks/useLazyVideo";

/** Dynamic import function defined at module level for referential stability */
const loadFooterVideo = () => import("../../assets/videos/footer_video.mp4");

const Footer = () => {
  const footerRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const { videoRef, videoSrc } = useLazyVideo(
    footerRef,
    prefersReduced,
    loadFooterVideo
  );

  return (
    <footer
      ref={footerRef}
      aria-label="Site footer"
      className="relative overflow-hidden bg-white text-white"
    >
      {/* ── Background video (lazy-loaded) ────────────────────────────────── */}
      {videoSrc && !prefersReduced && (
        <div className="bg-black pointer-events-none absolute overflow-hidden inset-0 h-full w-[100%-40px] rounded-t-4xl mx-0 xl:mx-5">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover opacity-30"
          />
        </div>
      )}

      {/* Fallback gradient when video is not yet loaded */}
      {!videoSrc && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-deep-blue to-navy opacity-80"
          aria-hidden="true"
        />
      )}

      <Container className="relative z-10">
        <div className="pt-12 sm:pt-14 lg:pt-16.5 pb-12 lg:pb-50">

          {/* Link columns — 2-column grid on mobile, row on md+ */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:flex md:flex-row md:justify-between md:gap-5">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="mb-5 lg:mb-7.5 text-[17px] sm:text-[19px] lg:text-[22px] font-normal leading-[1.2] text-white">
                  {heading}
                </h3>

                {heading === "Connect" ? (
                  <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                    {links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 lg:h-8 lg:w-8 items-center justify-center rounded-full border border-white text-white transition-colors hover:border-amber hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                      >
                        <span
                          className="h-5 w-5"
                          dangerouslySetInnerHTML={{ __html: link.icon }}
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2 lg:space-y-2.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] lg:text-[18px] leading-[1.3] lg:leading-[1] text-white/70 transition-colors hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 rounded"
                        >
                          {link.icon && (
                            <span
                              className="h-4 w-4 shrink-0"
                              dangerouslySetInnerHTML={{ __html: link.icon }}
                              aria-hidden="true"
                            />
                          )}
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-10 lg:mt-0 lg:items-right lg:text-right lg:translate-y-[-100%] text-[13px] lg:text-[16px] text-white/40 font-normal">
            <p>© {new Date().getFullYear()} Lorem.app. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;