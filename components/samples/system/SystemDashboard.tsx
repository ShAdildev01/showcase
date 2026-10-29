"use client";

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cores, disks, events, host, processes, services } from "@/data/system";
import { useLiveSeries } from "@/lib/useLiveSeries";
import { cn } from "@/lib/cn";

const tooltipStyle = { background: "#15171A", border: "none", borderRadius: 6, color: "#F3F3EF", fontSize: 12, fontFamily: "var(--font-plexmono)" };

function Panel({ title, meta, className, children }: { title: string; meta?: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("border border-sys-line bg-sys-panel", className)}>
      <header className="flex items-center justify-between border-b border-sys-line px-4 py-2.5">
        <h2 className="text-[13px] font-semibold">{title}</h2>
        {meta && <span className="font-plexmono text-[11px] text-sys-mute">{meta}</span>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

const stateColor: Record<string, string> = { running: "bg-sys-ok", degraded: "bg-sys-warn", stopped: "bg-sys-signal" };
const levelColor: Record<string, string> = { info: "text-sys-mute", warn: "text-sys-warn", error: "text-sys-signal" };

export default function SystemDashboard() {
  const usage = useLiveSeries(["cpu", "mem"], [46, 62], 40, 1500);
  const net = useLiveSeries(["rx", "tx"], [38, 24], 40, 1500);
  const cpuNow = usage[usage.length - 1].cpu;
  const memNow = usage[usage.length - 1].mem;

  return (
    <div className="min-h-screen bg-sys-bg px-3 pb-12 pt-36 font-plexsans text-sys-ink sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{host.name}</h1>
            <p className="mt-1 font-plexmono text-xs text-sys-mute">{host.region} / {host.os} / kernel {host.kernel}</p>
          </div>
          <dl className="flex gap-6 font-plexmono text-xs">
            <div><dt className="text-sys-mute">uptime</dt><dd className="mt-0.5 text-sm text-sys-ink">{host.uptime}</dd></div>
            <div><dt className="text-sys-mute">cpu</dt><dd className="mt-0.5 text-sm text-sys-signal">{cpuNow}%</dd></div>
            <div><dt className="text-sys-mute">memory</dt><dd className="mt-0.5 text-sm text-sys-ink">{memNow}%</dd></div>
          </dl>
        </header>

        <div className="grid gap-3 lg:grid-cols-12">
          <Panel title="CPU and memory" meta="live, 1.5 s" className="lg:col-span-8">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usage} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid stroke="#CFCFC8" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="t" hide />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6A6E73" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#6A6E73" }} />
                  <Area type="monotone" dataKey="mem" stroke="#15171A" strokeWidth={1.5} fill="#15171A" fillOpacity={0.08} isAnimationActive={false} />
                  <Area type="monotone" dataKey="cpu" stroke="#E8501E" strokeWidth={2} fill="#E8501E" fillOpacity={0.16} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Cores" meta="16 threads" className="lg:col-span-4">
            <div className="grid grid-cols-8 items-end gap-1.5" style={{ height: 224 }} role="img" aria-label="Load per core">
              {cores.map((c, i) => {
                const load = Math.min(99, Math.max(6, c.load + (usage[usage.length - 1].cpu - 46) * ((i % 3) - 1) * 0.3));
                return (
                  <div key={c.id} className="flex h-full flex-col justify-end">
                    <div className={cn("w-full transition-[height] duration-700 ease-out", load > 80 ? "bg-sys-signal" : "bg-sys-ink")} style={{ height: `${load}%` }} />
                    <span className="mt-1 text-center font-plexmono text-[10px] text-sys-mute">{c.id}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Network I/O" meta="Mbit/s" className="lg:col-span-5">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={net} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid stroke="#CFCFC8" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="t" hide />
                  <YAxis tick={{ fontSize: 11, fill: "#6A6E73" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line dataKey="rx" stroke="#2F8F5B" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line dataKey="tx" stroke="#15171A" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Disks" className="lg:col-span-3">
            <ul className="space-y-4">
              {disks.map((d) => (
                <li key={d.mount}>
                  <div className="mb-1.5 flex justify-between font-plexmono text-xs">
                    <span>{d.mount}</span>
                    <span className={d.used > 90 ? "text-sys-signal" : "text-sys-mute"}>{d.used}% of {d.size}</span>
                  </div>
                  <div className="h-1.5 bg-sys-line">
                    <div className={cn("h-full", d.used > 90 ? "bg-sys-signal" : d.used > 75 ? "bg-sys-warn" : "bg-sys-ink")} style={{ width: `${d.used}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Services" className="lg:col-span-4">
            <ul className="divide-y divide-sys-line">
              {services.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-2 text-sm first:pt-0 last:pb-0">
                  <span className="flex items-center gap-2.5">
                    <span className={cn("h-2 w-2 rounded-full", stateColor[s.state])} />
                    {s.name}
                  </span>
                  <span className="font-plexmono text-xs text-sys-mute">{s.state} / {s.latency}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Top processes" meta="by cpu" className="overflow-x-auto lg:col-span-7">
            <table className="w-full min-w-[420px] text-left font-plexmono text-xs">
              <thead className="text-sys-mute">
                <tr>
                  <th className="pb-2 font-normal">pid</th>
                  <th className="pb-2 font-normal">command</th>
                  <th className="pb-2 font-normal">user</th>
                  <th className="pb-2 text-right font-normal">cpu %</th>
                  <th className="pb-2 text-right font-normal">mem %</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p) => (
                  <tr key={p.pid} className="border-t border-sys-line">
                    <td className="py-2 text-sys-mute">{p.pid}</td>
                    <td className="py-2">{p.name}</td>
                    <td className="py-2 text-sys-mute">{p.user}</td>
                    <td className={cn("py-2 text-right", p.cpu > 12 && "text-sys-signal")}>{p.cpu.toFixed(1)}</td>
                    <td className="py-2 text-right">{p.mem.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Event log" className="lg:col-span-5">
            <ul className="space-y-2 font-plexmono text-xs">
              {events.map((e) => (
                <li key={e.time} className="grid grid-cols-[62px_44px_1fr] gap-2">
                  <span className="text-sys-mute">{e.time}</span>
                  <span className={levelColor[e.level]}>{e.level}</span>
                  <span>{e.text}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
