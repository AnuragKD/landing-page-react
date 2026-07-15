/**
 * Platform preview card with sticky stacking behavior on md+ screens.
 * On mobile the sticky effect is removed and padding scales down.
 *
 * @param {{ card: object, stackOffset: number }} props
 */
const PlatformCard = ({ card, stackOffset }) => (
  <div
    className="md:sticky flex flex-col gap-6 p-6 sm:p-8 md:flex-col md:gap-6 md:pl-12 md:pt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-white lg:flex-row"
    style={{ top: `${stackOffset}px` }}
  >
    {/* Text content */}
    <div className="flex flex-col justify-start lg:w-[32%]">
      <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-normal leading-[1.1] lg:leading-[1] text-ink">
        {card.title}
      </h3>
      <p className="mt-2 lg:mt-3 text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.5] text-black/60 italic font-serif">
        {card.description}
      </p>
    </div>

    {/* Screenshot image */}
    <div className="relative min-h-[220px] sm:min-h-[300px] lg:min-h-0 flex-1 overflow-hidden bg-[#F5F5F5] rounded-xl lg:rounded-tl-2xl shadow-[-11px_30px_71px_0px_rgba(0,0,0,0.05),-43px_122px_129px_0px_rgba(0,0,0,0.04),-97px_274px_175px_0px_rgba(0,0,0,0.03),-172px_488px_207px_0px_rgba(0,0,0,0.01),-269px_762px_226px_0px_rgba(0,0,0,0)]">
      <img
        src={card.image}
        alt={card.alt}
        className="h-full w-full object-contain object-left-top"
        draggable={false}
        loading="lazy"
      />
    </div>
  </div>
);

export default PlatformCard;
