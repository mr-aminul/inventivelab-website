import { ArrowRight, ClipboardList, Mail, MessageCircle, UserPlus } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import { EXAMPLE_BUSINESS } from "./example-business";

const flowSteps = [
  { icon: UserPlus, label: "New enquiry", detail: "Form or email captured" },
  { icon: ClipboardList, label: "Job created", detail: "Assigned to your team" },
  { icon: MessageCircle, label: "Team notified", detail: "Slack · SMS · email" },
  { icon: Mail, label: "Client updated", detail: "Automatic confirmation" },
];

export function AutomationMockup() {
  return (
    <BrowserFrame url={`flows.${EXAMPLE_BUSINESS.domain}`}>
      <div className="bg-surface-muted/25 p-3 sm:p-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <div>
            <p className="text-[0.6875rem] font-bold text-surface-foreground">Enquiry → job flow</p>
            <p className="text-[0.5625rem] text-surface-muted-foreground">Runs automatically · no copy-paste</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[0.5625rem] font-bold text-emerald-700">
            <span className="landing-dot-live text-emerald-500" style={{ height: "0.3rem", width: "0.3rem" }} />
            Active
          </span>
        </div>

        <div className="space-y-1.5">
          {flowSteps.map((step, i) => (
            <div key={step.label}>
              <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-card p-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <step.icon size={13} strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.6875rem] font-bold text-surface-foreground">{step.label}</p>
                  <p className="text-[0.5625rem] text-surface-muted-foreground">{step.detail}</p>
                </div>
                <span className="text-[0.5625rem] font-bold tabular-nums text-emerald-600">✓</span>
              </div>
              {i < flowSteps.length - 1 ? (
                <div className="flex justify-center py-0.5 text-brand">
                  <ArrowRight size={12} className="rotate-90" strokeWidth={2.5} />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-2.5 rounded-lg bg-brand-soft/60 px-2.5 py-2 text-[0.5625rem] font-medium leading-snug text-brand-foreground">
          Connects your website, inbox, and team tools — fewer manual steps between systems.
        </p>
      </div>
    </BrowserFrame>
  );
}
