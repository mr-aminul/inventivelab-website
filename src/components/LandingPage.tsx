import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bell,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  Globe,
  Handshake,
  HeartPulse,
  Layers,
  LayoutDashboard,
  Link2,
  MapPin,
  MessageSquare,
  Puzzle,
  RefreshCw,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Blocks,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { HeroSlideshow } from "./hero/HeroSlideshow";
import { heroSlides } from "./hero/heroSlides";
import { TypingHeadlineWord } from "./hero/TypingHeadlineWord";
import { BrainLogo } from "./BrainLogo";
import { ContactModal } from "./ContactModal";

const CONTACT_EMAIL = "info@inventivelab.bd";

type ExampleCategory = "software" | "app" | "website" | "automation";

type ExampleItem = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const exampleCategories: { id: ExampleCategory; label: string; icon: LucideIcon }[] = [
  { id: "software", label: "Software", icon: Layers },
  { id: "app", label: "App", icon: Smartphone },
  { id: "website", label: "Website", icon: Globe },
  { id: "automation", label: "Automation", icon: Zap },
];

const examplesByCategory: Record<ExampleCategory, ExampleItem[]> = {
  software: [
    {
      icon: Users,
      title: "Employee management",
      body: "Rosters and timesheets your team will actually use.",
    },
    {
      icon: MessageSquare,
      title: "CRM & client portal",
      body: "Leads, jobs, clients — one place, not scattered inboxes.",
    },
    {
      icon: Store,
      title: "POS & inventory",
      body: "Stock, sales, suppliers without juggling apps.",
    },
    {
      icon: LayoutDashboard,
      title: "Operations dashboard",
      body: "Live numbers every morning — not a stale spreadsheet.",
    },
  ],
  app: [
    {
      icon: MapPin,
      title: "Field team app",
      body: "Check-ins, updates, photos from site — no clipboards.",
    },
    {
      icon: Clock,
      title: "Staff app",
      body: "Rosters, clock-in, swaps on their phone.",
    },
    {
      icon: Smartphone,
      title: "Customer app",
      body: "Bookings and orders in their pocket.",
    },
    {
      icon: Truck,
      title: "Delivery & tracking",
      body: "Live status and alerts — customers stop chasing you.",
    },
  ],
  website: [
    {
      icon: Globe,
      title: "Business website",
      body: "Clear pages that help customers find you.",
    },
    {
      icon: Zap,
      title: "Landing pages",
      body: "Campaign pages built to convert — not bloated templates.",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      body: "Online sales with stock, checkout, and orders.",
    },
    {
      icon: CalendarDays,
      title: "Booking site",
      body: "Online booking — no phone tag or doubles.",
    },
  ],
  automation: [
    {
      icon: Send,
      title: "Enquiry → job flow",
      body: "Lead in, team notified, client replied automatically.",
    },
    {
      icon: FileText,
      title: "Invoices & follow-ups",
      body: "Done jobs trigger invoices — less end-of-day admin.",
    },
    {
      icon: Link2,
      title: "Tool connections",
      body: "Sync apps so you never enter things twice.",
    },
    {
      icon: Bell,
      title: "Reminders & alerts",
      body: "Overdue tasks surface before they become problems.",
    },
  ],
};

const exampleTitles: Record<ExampleCategory, string> = {
  software: "Software your business might need",
  app: "Apps your team can use on the go",
  website: "Websites that grow your business",
  automation: "Automations that remove the busywork",
};

const exampleSubtitles: Record<ExampleCategory, string> = {
  software:
    "CRM, POS, dashboards — replacing scattered apps and busywork.",
  app: "Apps for teams who work away from a desk.",
  website:
    "Sites, shops, and booking — clear, fast, easy to update.",
  automation:
    "Enquiries, invoices, syncs — manual steps removed.",
};

const services = [
  {
    icon: Globe,
    title: "Websites",
    body: "Clear sites that explain your business — easy to update.",
  },
  {
    icon: Layers,
    title: "Custom business software",
    body: "Built around how your team works, not generic SaaS.",
  },
  {
    icon: Zap,
    title: "Workflow automations",
    body: "Connect your tools and cut the manual copy-paste.",
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    body: "Field teams, check-ins, orders — when a site isn't enough.",
  },
];

const steps = [
  {
    title: "Tell us the problem",
    body: "What's broken or slow — plain language, no RFP.",
  },
  {
    title: "We agree scope & price",
    body: "Fixed price — you know cost before we code.",
  },
  {
    title: "We build & refine",
    body: "Early previews; we adjust until it fits your workflow.",
  },
];

const promises = [
  {
    icon: Banknote,
    title: "Fixed price upfront",
    body: "No surprise invoices or scope creep bills.",
  },
  {
    icon: Clock,
    title: "Delivered fast",
    body: "Days and weeks, not months of agency process.",
  },
  {
    icon: Puzzle,
    title: "Built around your workflow",
    body: "Not generic software with your logo on it.",
  },
  {
    icon: Code2,
    title: "You own it",
    body: "Your code and your data. No lock-in.",
  },
  {
    icon: MessageSquare,
    title: "Plain language",
    body: "You describe the problem — we handle the build.",
  },
  {
    icon: RefreshCw,
    title: "Refined until it fits",
    body: "Revisions during the build, not after launch.",
  },
  {
    icon: Wrench,
    title: "Works with what you use",
    body: "Plugs into the tools you already use.",
  },
  {
    icon: Handshake,
    title: "Support after launch",
    body: "We stay after launch — not gone after handover.",
  },
];

const industries = [
  { icon: Store, name: "Retail & commerce" },
  { icon: UtensilsCrossed, name: "Hospitality & venues" },
  { icon: HeartPulse, name: "Healthcare & wellness" },
  { icon: Briefcase, name: "Professional services" },
  { icon: Truck, name: "Logistics & field teams" },
  { icon: Building2, name: "Property & construction" },
];

const stats = [
  { value: "Days", label: "To your first preview" },
  { value: "Fixed", label: "Price before we build" },
  { value: "100%", label: "Yours — code & data" },
  { value: "Zero", label: "Vendor lock-in" },
];

export function LandingPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="landing">
      <LandingNav onOpenContact={() => setContactOpen(true)} />
      <Hero onOpenContact={() => setContactOpen(true)} />
      <TrustStrip />
      <Services />
      <Examples />
      <HowItWorks />
      <Promises />
      <StatsBand />
      <FinalCta onOpenContact={() => setContactOpen(true)} />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  const iconClass = compact
    ? "h-8 w-8 shrink-0 sm:h-9 sm:w-9"
    : "h-9 w-9 shrink-0 sm:h-11 sm:w-11 md:h-14 md:w-14";

  const textClass = compact
    ? "text-base font-extrabold tracking-tight sm:text-lg"
    : "text-base font-extrabold tracking-tight sm:text-xl md:text-2xl";

  return (
    <span className="inline-flex items-center gap-1 text-black sm:gap-1.5">
      <BrainLogo className={iconClass} />
      <span className={textClass}>Inventive Lab</span>
    </span>
  );
}

function LandingNav({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <header className="landing-nav">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-5 md:h-20">
        <a href="#" className="flex items-center" aria-label="Inventive Lab">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#services" className="landing-nav-link">
            What we build
          </a>
          <a href="#how" className="landing-nav-link">
            How it works
          </a>
          <a href="#promises" className="landing-nav-link">
            Our promises
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenContact}
            className="landing-btn-primary flex h-9 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const headlineWords = heroSlides.map((slide) => slide.headlineWord);

  return (
    <section className="landing-hero landing-hero-grid relative px-6 pt-10 pb-20 sm:px-5 sm:pt-12 lg:pt-16">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="landing-reveal text-center lg:text-left">
          <span className="landing-eyebrow mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold sm:mb-5">
            <Blocks size={13} strokeWidth={2.5} />
            Build your own
          </span>
          <h1 className="landing-hero-headline font-bold text-surface-foreground">
            <span className="inline">
              Custom{"\u00a0"}
              <TypingHeadlineWord
                words={headlineWords}
                index={slideIndex}
                onIndexChange={setSlideIndex}
              />
            </span>
            <span className="landing-hero-headline-sub">for ambitious business.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-[1.65] text-surface-muted-foreground sm:mt-5 sm:text-base sm:leading-relaxed lg:mx-0">
            Custom software that streamlines ops and helps you scale.
          </p>
          <div className="mt-9 flex flex-nowrap items-center justify-center gap-2 sm:mt-8 sm:gap-3 lg:justify-start">
            <button
              type="button"
              onClick={onOpenContact}
              className="landing-btn-primary flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 text-sm font-semibold sm:flex-none sm:px-7"
            >
              Brief us
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <a href="#services" className="landing-btn-ghost flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 text-sm font-semibold sm:flex-none sm:px-6">
              See what we build
            </a>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-surface-muted-foreground lg:justify-start">
            <ShieldCheck size={13} className="text-brand" strokeWidth={2} />
            Fixed price · Plain language · You own the code
          </p>
        </div>

        <HeroSlideshow index={slideIndex} onIndexChange={setSlideIndex} />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-surface-border bg-surface-muted/30 px-5 py-5">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-surface-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium text-surface-foreground">
          <BadgeCheck size={16} className="text-brand" strokeWidth={2.25} />
          For businesses of every size
        </span>
        <span className="hidden h-4 w-px bg-surface-border sm:block" aria-hidden />
        <span>
          For teams tired of tools that don&apos;t talk.
        </span>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="What we build"
          title="The tools your business actually needs"
          subtitle="Built to replace scattered apps and manual busywork."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, body }) => (
            <div key={title} className="landing-feature p-6">
              <span className="landing-feature-icon flex h-11 w-11 items-center justify-center rounded-xl">
                <Icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-base font-bold text-surface-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-surface-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Examples() {
  const [activeCategory, setActiveCategory] = useState<ExampleCategory>("software");
  const examples = examplesByCategory[activeCategory];
  const activeIndex = exampleCategories.findIndex(({ id }) => id === activeCategory);

  return (
    <section className="bg-surface-muted/30 px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="landing-eyebrow inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            In practice
          </span>

          <div className="mx-auto mt-6 w-full sm:max-w-xl" role="tablist" aria-label="What we build">
            <div
              className="landing-segment"
              style={{ "--segment-index": activeIndex } as React.CSSProperties}
            >
              <span className="landing-segment-indicator" aria-hidden />
              {exampleCategories.map(({ id, label, icon: Icon }) => {
                const isActive = activeCategory === id;

                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className="landing-segment-btn"
                    data-active={isActive}
                    onClick={() => setActiveCategory(id)}
                  >
                    <Icon className="landing-segment-btn-icon" size={15} strokeWidth={2.25} />
                    <span className="landing-segment-btn-label">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div key={activeCategory} className="landing-examples-heading mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-surface-foreground sm:text-[2.25rem]">
              {exampleTitles[activeCategory]}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-surface-muted-foreground">
              {exampleSubtitles[activeCategory]}
            </p>
          </div>
        </div>

        <div
          key={activeCategory}
          className="landing-rise landing-examples-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {examples.map(({ icon: Icon, title, body }) => (
            <div key={title} className="landing-industry-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-foreground">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <h3 className="text-base font-bold leading-snug text-surface-foreground">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-surface-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm font-medium text-surface-muted-foreground">
          Sectors we know — from independents to enterprise teams.
        </p>
        <div className="landing-industries-marquee -mx-5 mt-5 sm:hidden">
          <div className="landing-industries-marquee-track">
            {[...industries, ...industries].map(({ icon: Icon, name }, index) => (
              <span
                key={`${name}-${index}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-2 text-sm font-medium text-surface-muted-foreground"
              >
                <Icon size={15} className="text-brand" strokeWidth={2} />
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 hidden flex-wrap items-center justify-center gap-3 sm:flex">
          {industries.map(({ icon: Icon, name }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-2 text-sm font-medium text-surface-muted-foreground"
            >
              <Icon size={15} className="text-brand" strokeWidth={2} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="From problem to working software"
          subtitle="Fixed price, fast build, refined until it fits."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="landing-step-num flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-surface-foreground">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-surface-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section id="promises" className="bg-surface-muted/30 px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Our promises"
          title="How we work with you"
          subtitle="We get your business — then build what actually helps."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, body }) => (
            <div key={title} className="landing-promise p-5">
              <span className="landing-promise-icon flex h-9 w-9 items-center justify-center rounded-lg">
                <Icon size={17} strokeWidth={2} />
              </span>
              <h3 className="mt-3 text-sm font-bold text-surface-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-surface-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="px-5 py-16">
      <div className="landing-band-dark mx-auto w-full max-w-6xl rounded-3xl px-8 py-12">
        <div className="relative z-10 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="px-5 pb-20">
      <div className="landing-band-dark mx-auto w-full max-w-6xl rounded-3xl px-8 py-14 text-center">
        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="flex justify-center">
            <CheckCircle2 size={28} className="text-white" strokeWidth={2} />
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Got a problem worth solving?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/70">
            What&apos;s not working? We&apos;ll reply with scope, price, timeline.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="landing-btn-on-dark flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold"
            >
              Describe your problem
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <a
              href="#services"
              className="flex h-11 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See what we build
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-surface-border px-5 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <a href="#" className="flex items-center" aria-label="Inventive Lab">
          <Logo compact />
        </a>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <a href="#services" className="landing-footer-link">
            What we build
          </a>
          <a href="#how" className="landing-footer-link">
            How it works
          </a>
          <a href="#promises" className="landing-footer-link">
            Our promises
          </a>
        </nav>
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <a href={`mailto:${CONTACT_EMAIL}`} className="landing-footer-link text-sm">
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-surface-muted-foreground">
            © {new Date().getFullYear()} Inventive Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="landing-eyebrow inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-surface-foreground sm:text-[2.25rem]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-surface-muted-foreground">{subtitle}</p>
    </div>
  );
}
