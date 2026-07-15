import gsap from "gsap";

const BADGE_COUNT = 5;
const TRANSITION_DURATION = 2.2; // seconds per shift
const PAUSE_DURATION = 4.0;      // seconds of rest between shifts

/**
 * Initializes the continuous infinite badge orbit switching animation.
 * Must be called inside a gsap.context() callback.
 *
 * Badges shift simultaneously to the next position, pause, then shift again.
 * No badge self-rotation — only x/y translation is animated.
 *
 * @param {React.MutableRefObject<HTMLElement[]>} badgeRefs - Refs to badge wrapper elements
 * @param {{ x: number; y: number }[]} positions - Array of coordinate positions
 */
export function initBadgeOrbitAnimation(badgeRefs, positions) {
  // Set initial x/y positions for all badges
  badgeRefs.current.forEach((el, i) => {
    if (!el) return;
    gsap.set(el, { x: positions[i].x, y: positions[i].y });
  });

  // Infinite looping timeline: each cycle covers all 5 position slots
  const tl = gsap.timeline({ repeat: -1 });

  for (let step = 1; step <= BADGE_COUNT; step++) {
    // All badges shift simultaneously to their next position
    badgeRefs.current.forEach((el, i) => {
      if (!el) return;
      const nextIndex = (i + step) % BADGE_COUNT;
      const nextPos = positions[nextIndex];

      tl.to(
        el,
        {
          x: nextPos.x,
          y: nextPos.y,
          duration: TRANSITION_DURATION,
          ease: "power2.inOut",
        },
        `step-${step}` // label ensures all badges in this step animate simultaneously
      );
    });

    // Hold position for PAUSE_DURATION before the next shift
    tl.to({}, { duration: PAUSE_DURATION });
  }
}
