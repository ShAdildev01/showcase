"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { alerts, hourly, kpis, severityLabel, sources, type Severity } from "@/data/security";
import { cn } from "@/lib/cn";
import LogTail from "./LogTail";
import ThreatMap from "./ThreatMap";

const chip: Record<Severity, string> = {
  crit: "bg-sec-crit/15 text-sec-crit ring-sec-crit/40",
  high: "bg-sec-high/15 text-sec-high ring-sec-high/40",
  med: "bg-sec-med/15 text-sec-med ring-sec-med/40",
  low: "bg-sec-low/15 text-sec-low ring-sec-low/40",
};

function Panel({ title, meta, className, children }: { title: string; meta?: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-md border border-sec-line bg-sec-panel", className)}>
      <header className="flex items-center justify-between px-4 pb-1 pt-3.5">
        <h2 className="font-barlowc text-lg font-semibold tracking-wide">{title}</h2>
        {meta && <span className="font-jbmono text-[11px] text-sec-mute">{meta}</span>}
      </header>
      <div className="p-4 pt-2">{children}</div>
    </section>
  );
}

export default function SecurityDashboard() {
  return (
    <div className="min-h-screen bg-sec-bg px-3 pb-12 pt-36 font-barlow text-sec-text sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-barlowc text-4xl font-semibold tracking-wide">Threat operations</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-sec-mute">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sec-low opacity-60" /><span className="relative h-2 w-2 rounded-full bg-sec-low" /></span>
              Monitoring 1,284 assets across 3 regions
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {kpis.map((k) => (
              <div key={k.label}>
                <p className="text-xs text-sec-mute">{k.label}</p>
                <p className="font-barlowc text-3xl font-semibold leading-tight">{k.value}</p>
                <p className="font-jbmono text-[11px] text-sec-low">{k.delta}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-3 lg:grid-cols-12">
          <Panel title="Attack origins" meta="last 60 min, target FRA-1" className="lg:col-span-8">
            <div className="aspect-[2/1] w-full">
              <ThreatMap />
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-jbmono text-[11px] text-sec-mute">
              {sources.map((s) => (
                <li key={s.name}>{s.name} <span className="text-sec-text">{s.count}</span></li>
              ))}
            </ul>
          </Panel>

          <Panel title="Open alerts" meta={`${alerts.length} active`} className="lg:col-span-4">
            <ul className="divide-y divide-sec-line">
              {alerts.map((a) => (
                <li key={a.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("rounded px-2 py-0.5 text-[11px] font-semibold ring-1", chip[a.severity])}>{severityLabel[a.severity]}</span>
                    <span className="font-jbmono text-[11px] text-sec-mute">{a.ago} ago</span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-snug">{a.title}</p>
                  <p className="mt-0.5 font-jbmono text-[11px] text-sec-mute">{a.id} / {a.host}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Events by severity" meta="last 24 h" className="lg:col-span-7">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#1C242E" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#6F7C8B" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#6F7C8B" }} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={{ background: "#0E1217", border: "1px solid #1C242E", borderRadius: 6, fontSize: 12 }} />
                  <Bar dataKey="low" stackId="a" fill="#44D19A" />
                  <Bar dataKey="med" stackId="a" fill="#F5D547" />
                  <Bar dataKey="high" stackId="a" fill="#FF8A1F" />
                  <Bar dataKey="crit" stackId="a" fill="#FF3B47" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Firewall log" meta="live" className="lg:col-span-5">
            <div className="h-60 overflow-hidden">
              <LogTail />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
