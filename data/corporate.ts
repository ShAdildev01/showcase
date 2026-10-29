export type MegaColumn = { heading: string; links: { label: string; note: string }[] };
export type MenuItem = { label: string; columns?: MegaColumn[]; feature?: { title: string; text: string } };

export const menu: MenuItem[] = [
  {
    label: "Solutions",
    columns: [
      { heading: "Advisory", links: [{ label: "Capital planning", note: "Ten-year funding strategy" }, { label: "Mergers and acquisitions", note: "Buy-side and sell-side" }, { label: "Restructuring", note: "Debt and operating turnaround" }] },
      { heading: "Investment", links: [{ label: "Private credit", note: "Senior and unitranche loans" }, { label: "Infrastructure", note: "Core and core-plus assets" }, { label: "Real estate", note: "Logistics and residential" }] },
    ],
    feature: { title: "Capital Markets Outlook", text: "Our view on rates, credit and liquidity heading into 2027." },
  },
  {
    label: "Industries",
    columns: [
      { heading: "Sectors", links: [{ label: "Energy transition", note: "Grid, storage, renewables" }, { label: "Healthcare", note: "Providers and devices" }, { label: "Industrials", note: "Automation and logistics" }] },
    ],
    feature: { title: "Case study: Hartwell Logistics", text: "How a family fleet became a regional platform in five years." },
  },
  { label: "Insights" },
  { label: "Company" },
];
