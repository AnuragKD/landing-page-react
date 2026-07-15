import { useRef, useState, useEffect } from "react";

/**
 * Lazily loads a video when the root element approaches the viewport,
 * then plays/pauses it based on visibility.
 *
 * @param {React.RefObject<HTMLElement>} rootRef - Container element to observe for load trigger
 * @param {boolean} prefersReduced - When true, video is never loaded
 * @param {() => Promise<{ default: string }>} videoImportFn - Dynamic import function for the video asset
 * @returns {{ videoRef: React.RefObject<HTMLVideoElement>, videoSrc: string | null }}
 */
export function useLazyVideo(rootRef, prefersReduced, videoImportFn) {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);

  // Store the import function in a ref so it doesn't affect effect dependencies
  const importFnRef = useRef(videoImportFn);

  // Lazy-load video only when root element approaches viewport
  useEffect(() => {
    if (prefersReduced) return;

    const el = rootRef.current;
    if (!el) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          importFnRef.current().then((mod) => {
            setVideoSrc(mod.default);
          });
          loadObserver.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    loadObserver.observe(el);
    return () => loadObserver.disconnect();
  }, [prefersReduced, rootRef]);

  // Play/pause video based on its own visibility
  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const video = videoRef.current;

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    playObserver.observe(video);
    return () => playObserver.disconnect();
  }, [videoSrc]);

  return { videoRef, videoSrc };
}
