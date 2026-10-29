export type Region = "all" | "emea" | "amer" | "apac";
export type Status = "active" | "trial" | "at risk";

export const regions: { id: Region; label: string; factor: number }[] = [
  { id: "all", label: "All regions", factor: 1 },
  { id: "emea", label: "EMEA", factor: 0.42 },
  { id: "amer", label: "Americas", factor: 0.38 },
  { id: "apac", label: "APAC", factor: 0.2 },
];

export const ranges = [
  { id: "3m", label: "3 months", months: 3 },
  { id: "6m", label: "6 months", months: 6 },
  { id: "12m", label: "12 months", months: 12 },
] as const;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const monthlyRevenue = monthNames.map((month, i) => ({
  month,
  revenue: Math.round(412 + i * 23 + Math.sin(i * 1.3) * 28),
  target: Math.round(420 + i * 21),
}));

export const channels = [
  { name: "Direct sales", share: 46 },
  { name: "Partners", share: 27 },
  { name: "Self-serve", share: 19 },
  { name: "Marketplaces", share: 8 },
];

export const baseKpis = [
  { id: "revenue", label: "Revenue", value: 0, format: "money", delta: 8.4, spark: [30, 34, 33, 41, 44, 43, 52] },
  { id: "orders", label: "Orders", value: 18420, format: "number", delta: 3.1, spark: [40, 38, 44, 42, 47, 49, 51] },
  { id: "aov", label: "Average order", value: 412, format: "money-small", delta: 1.8, spark: [20, 22, 21, 24, 23, 25, 26] },
  { id: "churn", label: "Churn", value: 2.3, format: "percent", delta: -0.4, spark: [28, 27, 29, 25, 24, 22, 21] },
] as const;

export const accounts = [
  { name: "Hartwell Logistics", region: "emea", plan: "Enterprise", mrr: 18400, status: "active" as Status },
  { name: "Brightwater Foods", region: "amer", plan: "Growth", mrr: 6200, status: "trial" as Status },
  { name: "Okonkwo & Partners", region: "emea", plan: "Enterprise", mrr: 22100, status: "active" as Status },
  { name: "Pacific Row Retail", region: "apac", plan: "Growth", mrr: 4850, status: "at risk" as Status },
  { name: "Lumen Clinics", region: "amer", plan: "Enterprise", mrr: 15900, status: "active" as Status },
  { name: "Tanaka Precision", region: "apac", plan: "Growth", mrr: 7300, status: "active" as Status },
  { name: "Northfield Energy", region: "amer", plan: "Starter", mrr: 1900, status: "at risk" as Status },
  { name: "Verdant Studio", region: "emea", plan: "Starter", mrr: 1200, status: "trial" as Status },
];
