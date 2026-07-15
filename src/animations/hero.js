import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates the trust section highlight spans from muted to full color on scroll.
 * Safe to call on all breakpoints — lightweight ScrollTrigger with no pin.
 *
 * @param {React.RefObject<HTMLElement>} trustBodyRef
 */
export function initTrustTextAnimation(trustBodyRef) {
  const spans = trustBodyRef.current?.querySelectorAll(".highlight-span");
  if (!spans || spans.length < 3) return;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: trustBodyRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })
    .to(spans[0], { color: "#171717", duration: 0.5, ease: "power2.out" })
    .to(spans[1], { color: "#171717", duration: 0.5, ease: "power2.out" }, "+=0.25")
    .to(spans[2], { color: "#171717", duration: 0.5, ease: "power2.out" }, "+=0.25");
}

/**
 * Initializes the full desktop hero scroll-pin animation plus the trust text animation.
 * Must be called inside a gsap.context() callback.
 * Only intended for lg+ breakpoints (window.innerWidth >= 1024).
 *
 * @param {{ pinRef, textContainerRef, phoneRef, card1Ref, card2Ref, trustBodyRef }} refs
 */
export function initHeroAnimations({
  pinRef,
  textContainerRef,
  phoneRef,
  card1Ref,
  card2Ref,
  trustBodyRef,
}) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinRef.current,
      start: "top top",
      end: "+=120%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // 1. Hero text block fades out & slides up in lockstep with the phone
  tl.to(textContainerRef.current, { opacity: 0, y: -200, ease: "none" }, 0);

  // 2. Phone rises from inside the folder pocket
  tl.to(phoneRef.current, { y: -320, ease: "none" }, 0);

  // 3. Floating cards shift downward to center on Y axis of screen
  tl.to(card1Ref.current, { y: 120, ease: "none" }, 0);
  tl.to(card2Ref.current, { y: 100, ease: "none" }, 0);

  // 4. Trust section text highlight (shared with mobile path)
  initTrustTextAnimation(trustBodyRef);
}
