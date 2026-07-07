import { BrowserFrame } from "./BrowserFrame";
import { EXAMPLE_BUSINESS } from "./example-business";

export function WebsiteMockup() {
  return (
    <BrowserFrame url={EXAMPLE_BUSINESS.domain}>
      <div className="hero-mockup-site">
        <div className="hero-mockup-site-nav">
          <span className="font-bold text-surface-foreground">{EXAMPLE_BUSINESS.name}</span>
          <span className="text-surface-muted-foreground">Services · About · Contact</span>
        </div>
        <div className="hero-mockup-site-hero">
          <p className="text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-brand">Est. 2012</p>
          <p className="mt-1 text-base font-bold leading-tight text-surface-foreground sm:text-lg">
            Practical solutions for growing businesses
          </p>
          <p className="mt-1 max-w-[90%] text-[0.625rem] leading-snug text-surface-muted-foreground">
            A clear online presence — what you do, how to reach you, and how to get started.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-md bg-brand px-2 py-1 text-[0.5625rem] font-bold text-white">Get a quote</span>
            <span className="rounded-md border border-surface-border bg-surface-card px-2 py-1 text-[0.5625rem] font-semibold">
              Contact us
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-2.5">
          {["Services", "About", "Support"].map((item) => (
            <div key={item} className="rounded-lg border border-surface-border bg-surface-card p-2 text-center">
              <div className="mx-auto h-6 w-full rounded-md bg-brand-soft" />
              <p className="mt-1.5 text-[0.5625rem] font-semibold text-surface-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
