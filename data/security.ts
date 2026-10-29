export type Severity = "crit" | "high" | "med" | "low";

export const severityLabel: Record<Severity, string> = { crit: "Critical", high: "High", med: "Medium", low: "Low" };

export const target = { name: "FRA-1", lon: 8.7, lat: 50.1 };

export const sources = [
  { name: "Lagos", lon: 3.4, lat: 6.5, count: 412, severity: "high" as Severity },
  { name: "Sao Paulo", lon: -46.6, lat: -23.5, count: 238, severity: "med" as Severity },
  { name: "Novosibirsk", lon: 82.9, lat: 55.0, count: 903, severity: "crit" as Severity },
  { name: "Shenzhen", lon: 114.1, lat: 22.5, count: 677, severity: "high" as Severity },
  { name: "Ashburn", lon: -77.5, lat: 39.0, count: 154, severity: "low" as Severity },
  { name: "Mumbai", lon: 72.9, lat: 19.1, count: 301, severity: "med" as Severity },
];

export const alerts = [
  { id: "ALR-4821", title: "Credential stuffing against /auth/login", severity: "crit" as Severity, host: "edge-03", ago: "2 min" },
  { id: "ALR-4820", title: "Outbound beacon to known C2 address", severity: "crit" as Severity, host: "wks-1184", ago: "6 min" },
  { id: "ALR-4817", title: "Privilege escalation on build runner", severity: "high" as Severity, host: "ci-runner-9", ago: "14 min" },
  { id: "ALR-4812", title: "Port scan across 3,100 ports", severity: "med" as Severity, host: "fw-edge", ago: "31 min" },
  { id: "ALR-4809", title: "Expired TLS certificate on staging", severity: "low" as Severity, host: "stg-api", ago: "1 h" },
];

export const hourly = Array.from({ length: 12 }, (_, i) => ({
  hour: `${(i * 2).toString().padStart(2, "0")}h`,
  crit: 2 + ((i * 3) % 5),
  high: 6 + ((i * 5) % 9),
  med: 12 + ((i * 7) % 14),
  low: 20 + ((i * 11) % 16),
}));

export const logTemplates = [
  "DROP tcp 185.220.101.4:51322 -> 10.0.4.12:22",
  "ALLOW https 10.0.2.31 -> api.stripe.com:443",
  "BLOCK sqli signature on /search?q=1%27--",
  "AUTH failure user=admin src=45.9.148.201 attempt=18",
  "ALLOW dns 10.0.1.8 -> 1.1.1.1:53",
  "BLOCK geo policy RU src=91.241.19.84",
  "DROP udp 203.0.113.77:1900 -> 10.0.4.1:1900",
  "WAF rule 942100 matched, request quarantined",
];

export const kpis = [
  { label: "Events today", value: "184,206", delta: "+6.2%" },
  { label: "Blocked", value: "98.4%", delta: "+0.3%" },
  { label: "Open incidents", value: "7", delta: "-2" },
  { label: "Mean time to respond", value: "11m 40s", delta: "-1m 12s" },
];

// Rough continent outlines on a 360 x 180 plate-carree grid (lon + 180, 90 - lat).
export const landmasses: number[][] = [
  [-168, 66, -140, 70, -110, 72, -85, 70, -65, 60, -55, 48, -70, 42, -76, 35, -81, 25, -90, 29, -97, 24, -105, 20, -92, 15, -83, 9, -78, 8, -86, 14, -105, 23, -118, 32, -124, 40, -124, 48, -135, 58, -150, 60, -165, 60],
  [-55, 60, -45, 60, -20, 70, -25, 82, -60, 82, -70, 76],
  [-80, 8, -60, 10, -50, 0, -35, -7, -40, -22, -55, -35, -65, -42, -70, -55, -75, -50, -72, -30, -70, -18, -81, -5],
  [-10, 36, -9, 43, -2, 48, -5, 50, 5, 53, 10, 57, 20, 60, 30, 70, 40, 68, 35, 55, 40, 45, 28, 41, 22, 36, 12, 38, 3, 43],
  [-17, 21, -10, 35, 10, 37, 32, 31, 43, 12, 51, 12, 40, -5, 40, -15, 33, -26, 20, -35, 12, -18, 9, 4, -8, 5, -17, 14],
  [40, 68, 60, 72, 100, 77, 140, 72, 170, 68, 160, 55, 142, 46, 130, 35, 122, 30, 122, 20, 108, 10, 100, 2, 95, 15, 80, 8, 72, 20, 60, 25, 50, 28, 35, 32, 28, 41, 40, 45, 45, 50, 55, 55],
  [114, -22, 130, -12, 142, -11, 153, -26, 148, -38, 135, -35, 115, -34],
];
