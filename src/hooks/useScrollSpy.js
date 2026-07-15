import { useState, useEffect } from "react";

/**
 * Tracks which section is currently in the viewport using IntersectionObserver.
 *
 * @param {string[]} sectionIds - Stable array of section element IDs to observe
 * @param {string} [defaultId=""] - Initial active section ID
 * @returns {string} The ID of the currently intersecting section
 */
export function useScrollSpy(sectionIds, defaultId = "") {
  const [activeSection, setActiveSection] = useState(defaultId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // sectionIds is a module-level constant — safe to omit from deps

  return activeSection;
}
