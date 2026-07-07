import type { ComponentType } from "react";
import { AutomationMockup } from "./AutomationMockup";
import { MobileAppMockup } from "./MobileAppMockup";
import { SoftwareMockup } from "./SoftwareMockup";
import { WebsiteMockup } from "./WebsiteMockup";

export const SLIDE_DURATION_MS = 4000;

export type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  headlineWord: string;
  Mockup: ComponentType;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "website",
    tag: "Websites",
    title: "Clear sites that help customers find you",
    headlineWord: "websites",
    Mockup: WebsiteMockup,
  },
  {
    id: "software",
    tag: "Custom software",
    title: "Tools built around how you actually work",
    headlineWord: "software",
    Mockup: SoftwareMockup,
  },
  {
    id: "automation",
    tag: "Automations",
    title: "Less manual work between your systems",
    headlineWord: "automation",
    Mockup: AutomationMockup,
  },
  {
    id: "mobile",
    tag: "Mobile apps",
    title: "Staff and customer apps on the go",
    headlineWord: "apps",
    Mockup: MobileAppMockup,
  },
];
