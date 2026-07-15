import { forwardRef } from "react";

/**
 * Floating stat card displayed beside the hero phone mockup.
 * Uses forwardRef so GSAP can animate it via a parent ref.
 *
 * Position-specific classes (top, left/right, etc.) are passed via className.
 */
const StatCard = forwardRef(function StatCard(
  { icon, iconAlt = "", value, label, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`absolute z-35 flex w-fit max-w-[246px] -translate-y-1/2 gap-4 rounded-2xl border-2 border-white bg-white/35 p-4 text-left backdrop-blur-xl ${className}`}
    >
      <img
        src={icon}
        alt={iconAlt}
        className="h-auto w-9 object-contain"
        draggable={false}
      />
      <div className="flex flex-col justify-center">
        <p className="text-[22px] font-normal leading-none text-ink">{value}</p>
        <p className="mt-1.5 font-serif text-[14px] leading-tight text-black/60">
          {label}
        </p>
      </div>
    </div>
  );
});

export default StatCard;
