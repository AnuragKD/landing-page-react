import Container from "../components/common/Container";
import SectionLabel from "../components/common/SectionLabel";
import PlatformCard from "../components/ui/PlatformCard";
import { platformCards } from "../data/platformCards";

/**
 * Sticky stack offsets: first card at 200px (md) / 260px (lg), each card adds 112px.
 * On mobile (< md) sticky is disabled, so offset has no visual effect.
 */
const CARD_STACK_BASE = 260;
const CARD_STACK_STEP = 112;

const PlatformPreviewSection = () => (
  <section id="platform" aria-label="Platform preview" className="relative bg-white">
    <Container>
      {/* Section header */}
      <div className="py-12 sm:py-16 lg:py-24 md:sticky md:-top-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl flex-1 text-left">
            <SectionLabel className="mb-3">Platform Preview</SectionLabel>

            <h2 className="text-[28px] sm:text-[38px] md:text-[46px] lg:text-[60px] font-normal leading-[1.05] lg:leading-[1] tracking-[-0.02em] text-ink">
              Verify documents from a single dashboard.
            </h2>
          </div>

          <div className="w-full lg:max-w-[500px] lg:w-[40%] text-left lg:pb-2">
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.5] lg:leading-[1.4] font-serif text-black/60">
              One dashboard to request, track, and receive verified credentials,
              from anywhere in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Stacked sticky cards */}
      <div className="pb-12 sm:pb-16 lg:pb-24">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          {platformCards.map((card, i) => (
            <PlatformCard
              key={card.id}
              card={card}
              stackOffset={CARD_STACK_BASE + i * CARD_STACK_STEP}
            />
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default PlatformPreviewSection;