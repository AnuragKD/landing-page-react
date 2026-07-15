/**
 * Reusable section eyebrow label with amber dot indicator.
 *
 * Used consistently across multiple sections to mark the section type
 * (e.g., "Platform Preview", "Who It's For").
 *
 * @param {{ children: React.ReactNode, className?: string }} props
 */
const SectionLabel = ({ children, className = "" }) => (
  <p
    className={`inline-flex items-center gap-2 text-[14px] font-normal text-amber ${className}`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
    {children}
  </p>
);

export default SectionLabel;
