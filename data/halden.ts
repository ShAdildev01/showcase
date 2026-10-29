export type Project = {
  slug: string;
  name: string;
  place: string;
  year: string;
  kind: string;
  note: string;
  tone: string;
  accent: string;
};

export const projects: Project[] = [
  { slug: "salt-house", name: "Salt House", place: "Ardmore, Ireland", year: "2025", kind: "Private house", note: "A timber-clad family house set low into a windswept headland, with a single long roof.", tone: "#E7E4D6", accent: "#2D5B47" },
  { slug: "mill-lane", name: "Mill Lane Library", place: "Leeds, UK", year: "2024", kind: "Public library", note: "A brick mill reworked into a reading room with a north-lit gallery above the stacks.", tone: "#F1E4A8", accent: "#7A4B2A" },
  { slug: "kestrel-court", name: "Kestrel Court", place: "Rotterdam, NL", year: "2023", kind: "Housing, 42 homes", note: "Stepped courtyard housing where every flat has a corner of sky and a shared stair.", tone: "#DCE6DA", accent: "#1F3D33" },
  { slug: "field-studio", name: "Field Studio", place: "Skåne, Sweden", year: "2022", kind: "Artist studio", note: "A one-room studio with a sawtooth roof, built from reclaimed larch in nine weeks.", tone: "#EADFD3", accent: "#8C3B2A" },
];
