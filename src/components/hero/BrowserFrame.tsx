import { Lock } from "lucide-react";
import type { ReactNode } from "react";

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="landing-window">
      <div className="landing-window-bar">
        <span className="landing-window-dot" />
        <span className="landing-window-dot" />
        <span className="landing-window-dot" />
        <span className="landing-url">
          <Lock size={9} strokeWidth={2.5} />
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="hero-phone mx-auto">
      <span className="hero-phone-speaker" aria-hidden />
      <div className="hero-phone-screen">{children}</div>
    </div>
  );
}
