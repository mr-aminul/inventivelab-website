import { Briefcase, Calendar, CheckCircle2, Home, MapPin, MessageSquare, User } from "lucide-react";
import { PhoneFrame } from "./BrowserFrame";
import { EXAMPLE_BUSINESS } from "./example-business";

const upcoming = [
  { title: "Quote follow-up", client: "Reed & Partners", time: "2:30pm" },
  { title: "Delivery check", client: "Zone 3 depot", time: "4:00pm" },
];

export function MobileAppMockup() {
  return (
    <PhoneFrame>
      <div className="hero-app">
        <div className="hero-app-status" aria-hidden>
          <span>9:41</span>
          <span className="hero-app-status-icons">
            <span />
            <span />
            <span />
          </span>
        </div>

        <div className="hero-app-header">
          <p className="hero-app-greeting">Good morning</p>
          <p className="hero-app-title">{EXAMPLE_BUSINESS.name}</p>
          <div className="hero-app-stats">
            <StatPill label="Today" value="3 jobs" highlight />
            <StatPill label="Done" value="1" />
            <StatPill label="Next" value="2:30pm" />
          </div>
        </div>

        <div className="hero-app-body">
          <div className="hero-app-current">
            <div className="hero-app-current-top">
              <span className="hero-app-chip">In progress</span>
              <span className="hero-app-time">Due now</span>
            </div>
            <p className="hero-app-current-title">Site visit</p>
            <p className="hero-app-current-client">Acme Supplies</p>
            <p className="hero-app-current-address">
              <MapPin size={10} strokeWidth={2.25} />
              14 Oak Lane, Suite 2
            </p>

            <div className="hero-app-steps">
              <Step label="Checked in" done />
              <Step label="On site" active />
              <Step label="Complete" />
            </div>

            <button type="button" className="hero-app-cta">
              <CheckCircle2 size={11} strokeWidth={2.5} />
              Mark complete
            </button>
          </div>

          <div className="hero-app-upcoming">
            <p className="hero-app-section-label">Up next</p>
            {upcoming.map((item) => (
              <div key={item.title} className="hero-app-upcoming-row">
                <span className="hero-app-upcoming-icon">
                  <Briefcase size={11} strokeWidth={2.25} />
                </span>
                <div className="hero-app-upcoming-copy">
                  <p>{item.title}</p>
                  <p>{item.client}</p>
                </div>
                <span className="hero-app-upcoming-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <nav className="hero-app-nav" aria-hidden>
          <NavItem icon={Home} label="Home" active />
          <NavItem icon={Calendar} label="Jobs" />
          <NavItem icon={MessageSquare} label="Inbox" />
          <NavItem icon={User} label="Account" />
        </nav>
      </div>
    </PhoneFrame>
  );
}

function StatPill({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`hero-app-stat${highlight ? " hero-app-stat--highlight" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Step({
  label,
  done,
  active,
}: {
  label: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`hero-app-step${done ? " hero-app-step--done" : ""}${active ? " hero-app-step--active" : ""}`}
    >
      <span className="hero-app-step-dot" />
      <span>{label}</span>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Home;
  label: string;
  active?: boolean;
}) {
  return (
    <span className={`hero-app-nav-item${active ? " hero-app-nav-item--active" : ""}`}>
      <Icon size={13} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </span>
  );
}
