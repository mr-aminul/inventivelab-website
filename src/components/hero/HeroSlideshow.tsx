import { heroSlides } from "./heroSlides";

type HeroSlideshowProps = {
  index: number;
  onIndexChange: (index: number) => void;
};

export function HeroSlideshow({ index, onIndexChange }: HeroSlideshowProps) {
  const active = heroSlides[index];

  return (
    <div className="landing-reveal relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
      <div className="hero-slideshow">
        <div className="hero-slideshow-caption">
          <span className="hero-slideshow-tag">{active.tag}</span>
          <p className="hero-slideshow-title">{active.title}</p>
        </div>

        <div className="hero-slideshow-stage relative">
          {heroSlides.map((slide, i) => {
            const Mockup = slide.Mockup;
            return (
              <div
                key={slide.id}
                className="hero-slideshow-slide"
                aria-hidden={i !== index}
                data-active={i === index}
              >
                <Mockup />
              </div>
            );
          })}
        </div>

        <div className="hero-slideshow-dots" role="tablist" aria-label="What we build">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={slide.tag}
              data-active={i === index}
              className="hero-slideshow-dot"
              onClick={() => onIndexChange(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
