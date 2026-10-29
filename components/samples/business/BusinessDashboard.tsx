"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { accounts, baseKpis, channels, monthlyRevenue, ranges, regions, type Region, type Status } from "@/data/business";
import { cn } from "@/lib/cn";
import Sparkline from "./Sparkline";

type SortKey = "name" | "mrr";

const statusStyle: Record<Status, string> = {
  active: "bg-biz-green/10 text-biz-green",
  trial: "bg-biz-ochre/15 text-[#8A5F0B]",
  "at risk": "bg-biz-rose/10 text-biz-rose",
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function BusinessDashboard() {
  const [region, setRegion] = useState<Region>("all");
  const [months, setMonths] = useState<number>(12);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "mrr", dir: -1 });

  const factor = regions.find((r) => r.id === region)?.factor ?? 1;

  const series = useMemo(
    () => monthlyRevenue.slice(-months).map((m) => ({ ...m, revenue: Math.round(m.revenue * factor), target: Math.round(m.target * factor) })),
    [months, factor]
  );
  const total = series.reduce((sum, m) => sum + m.revenue, 0) * 1000;

  const rows = useMemo(() => {
    return accounts
      .filter((a) => (region === "all" || a.region === region) && (status === "all" || a.status === status) && a.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (sort.key === "name" ? a.name.localeCompare(b.name) : a.mrr - b.mrr) * sort.dir);
  }, [region, status, query, sort]);

  const toggleSort = (key: SortKey) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "name" ? 1 : -1 }));
  const SortIcon = sort.dir === 1 ? ArrowUp : ArrowDown;

  const pill = "rounded-full px-3.5 py-1.5 text-sm transition-colors";

  return (
    <div className="min-h-screen bg-biz-bg px-4 pb-16 pt-36 font-publicsans text-biz-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-bricolage text-4xl font-semibold tracking-tight">Revenue overview</h1>
            <p className="mt-1 text-sm text-biz-mute">Calendar year 2026, figures in thousands of US dollars</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div role="group" aria-label="Region" className="flex rounded-full bg-biz-panel p-1 ring-1 ring-biz-line">
              {regions.map((r) => (
                <button key={r.id} onClick={() => setRegion(r.id)} aria-pressed={region === r.id} className={cn(pill, region === r.id ? "bg-biz-ink text-biz-bg" : "text-biz-mute hover:text-biz-ink")}>
                  {r.label}
                </button>
              ))}
            </div>
            <div role="group" aria-label="Date range" className="flex rounded-full bg-biz-panel p-1 ring-1 ring-biz-line">
              {ranges.map((r) => (
                <button key={r.id} onClick={() => setMonths(r.months)} aria-pressed={months === r.months} className={cn(pill, months === r.months ? "bg-biz-green text-white" : "text-biz-mute hover:text-biz-ink")}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <dl className="grid gap-px overflow-hidden rounded-2xl bg-biz-line ring-1 ring-biz-line sm:grid-cols-2 lg:grid-cols-4">
          {baseKpis.map((k) => {
            const raw = k.id === "revenue" ? total : k.id === "orders" ? Math.round(k.value * factor * (months / 12)) : k.value;
            const shown = k.format === "percent" ? `${raw}%` : k.format === "money-small" ? money(raw) : k.id === "revenue" ? `$${(raw / 1_000_000).toFixed(2)}M` : raw.toLocaleString("en-US");
            const good = k.id === "churn" ? k.delta < 0 : k.delta > 0;
            return (
              <div key={k.id} className="flex items-end justify-between gap-4 bg-biz-panel p-5">
                <div>
                  <dt className="text-sm text-biz-mute">{k.label}</dt>
                  <dd className="mt-1 font-bricolage text-3xl font-semibold tracking-tight">{shown}</dd>
                  <p className={cn("mt-1 text-xs font-medium", good ? "text-biz-green" : "text-biz-rose")}>{k.delta > 0 ? "+" : ""}{k.delta}% vs last period</p>
                </div>
                <Sparkline points={k.spark} color={good ? "#0E5A47" : "#B8473A"} />
              </div>
            );
          })}
        </dl>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <section className="rounded-2xl bg-biz-panel p-6 ring-1 ring-biz-line lg:col-span-8" aria-labelledby="rev-title">
            <h2 id="rev-title" className="font-bricolage text-xl font-semibold">Monthly revenue against target</h2>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bizfill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0E5A47" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#0E5A47" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E2DED2" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#77746A" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#77746A" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2DED2", fontSize: 13 }} />
                  <Area dataKey="target" stroke="#D2962B" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
                  <Area dataKey="revenue" stroke="#0E5A47" strokeWidth={2.5} fill="url(#bizfill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl bg-biz-panel p-6 ring-1 ring-biz-line lg:col-span-4" aria-labelledby="chan-title">
            <h2 id="chan-title" className="font-bricolage text-xl font-semibold">Where revenue comes from</h2>
            <ul className="mt-6 space-y-5">
              {channels.map((c, i) => (
                <li key={c.name}>
                  <div className="mb-1.5 flex justify-between text-sm"><span>{c.name}</span><span className="text-biz-mute">{c.share}%</span></div>
                  <div className="h-2 rounded-full bg-biz-bg"><div className={cn("h-full rounded-full", i === 0 ? "bg-biz-green" : i === 1 ? "bg-biz-ochre" : "bg-biz-ink/70")} style={{ width: `${c.share * 2}%` }} /></div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-2xl bg-biz-panel ring-1 ring-biz-line" aria-labelledby="acc-title">
          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <h2 id="acc-title" className="font-bricolage text-xl font-semibold">Accounts</h2>
            <div className="flex flex-wrap gap-3">
              <label className="relative">
                <span className="sr-only">Search accounts</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-biz-mute" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search accounts" className="w-52 rounded-full bg-biz-bg py-2 pl-9 pr-4 text-sm outline-none ring-1 ring-biz-line transition focus:ring-2 focus:ring-biz-green" />
              </label>
              <label>
                <span className="sr-only">Filter by status</span>
                <select value={status} onChange={(e) => setStatus(e.target.value as Status | "all")} className="rounded-full bg-biz-bg px-4 py-2 text-sm outline-none ring-1 ring-biz-line focus:ring-2 focus:ring-biz-green">
                  <option value="all">All statuses</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="at risk">At risk</option>
                </select>
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-y border-biz-line text-biz-mute">
                <tr>
                  <th className="px-6 py-3 font-medium" aria-sort={sort.key === "name" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                    <button onClick={() => toggleSort("name")} className="inline-flex items-center gap-1 hover:text-biz-ink">Account {sort.key === "name" && <SortIcon className="h-3.5 w-3.5" />}</button>
                  </th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium" aria-sort={sort.key === "mrr" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                    <button onClick={() => toggleSort("mrr")} className="inline-flex items-center gap-1 hover:text-biz-ink">Monthly revenue {sort.key === "mrr" && <SortIcon className="h-3.5 w-3.5" />}</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.name} className="border-b border-biz-line last:border-0 hover:bg-biz-bg/60">
                    <td className="px-6 py-3.5 font-medium">{a.name}</td>
                    <td className="px-6 py-3.5 text-biz-mute">{a.plan}</td>
                    <td className="px-6 py-3.5"><span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyle[a.status])}>{a.status}</span></td>
                    <td className="px-6 py-3.5 text-right tabular-nums">{money(a.mrr)}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-biz-mute">No accounts match these filters. Clear the search or choose another status.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
