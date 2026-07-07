import { CalendarDays, ClipboardList, TrendingUp } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import { EXAMPLE_BUSINESS } from "./example-business";

export function SoftwareMockup() {
  return (
    <BrowserFrame url={`app.${EXAMPLE_BUSINESS.domain}`}>
      <div className="bg-surface-muted/25 p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="landing-stat-live rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-[0.5rem] font-bold uppercase tracking-[0.12em] text-white/70">Revenue</span>
              <TrendingUp size={10} className="text-white/70" />
            </div>
            <p className="mt-1 text-lg font-bold leading-none tabular-nums">$12.4k</p>
          </div>
          <StatTile icon={ClipboardList} label="Active jobs" value="18" />
          <StatTile icon={CalendarDays} label="Due today" value="6" />
        </div>

        <div className="mt-2.5 overflow-hidden rounded-xl border border-surface-border bg-surface-card shadow-sm">
          <div className="border-b border-surface-border bg-surface-muted/40 px-3 py-2">
            <p className="text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-surface-muted-foreground">
              Open work
            </p>
          </div>
          <WorkRow id="#1042" detail="Site visit · Acme Supplies" amount="$850" status="In progress" />
          <WorkRow id="#1043" detail="Quote follow-up · Reed & Partners" amount="$420" status="Pending" ready />
          <WorkRow id="#1044" detail="Delivery confirmation · Zone 3" amount="$1,120" status="Scheduled" />
        </div>
      </div>
    </BrowserFrame>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-card p-2">
      <div className="flex items-center justify-between text-surface-muted-foreground">
        <span className="text-[0.5rem] font-bold uppercase tracking-[0.12em]">{label}</span>
        <Icon size={10} strokeWidth={2.25} />
      </div>
      <p className="mt-1 text-lg font-bold leading-none tabular-nums">{value}</p>
    </div>
  );
}

function WorkRow({
  id,
  detail,
  amount,
  status,
  ready,
}: {
  id: string;
  detail: string;
  amount: string;
  status: string;
  ready?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-surface-border px-3 py-2 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-[0.6875rem] font-bold text-surface-foreground">{id}</p>
        <p className="truncate text-[0.5625rem] text-surface-muted-foreground">{detail}</p>
      </div>
      <p className="text-[0.625rem] font-bold tabular-nums">{amount}</p>
      <span
        className={`rounded-full px-1.5 py-0.5 text-[0.5625rem] font-semibold ${
          ready
            ? "border border-sky-500/25 bg-sky-500/10 text-sky-700"
            : "border border-amber-500/25 bg-amber-500/10 text-amber-800"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
