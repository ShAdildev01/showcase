export const services = [
  { id: "RT-01", name: "Red team engagements", detail: "Eight-week, objective-based attacks against your people, process and perimeter.", level: "Deep" },
  { id: "AP-02", name: "Application penetration tests", detail: "Manual testing of web, mobile and API surfaces, with fixes verified.", level: "Standard" },
  { id: "CL-03", name: "Cloud configuration review", detail: "AWS, Azure and GCP posture against how attackers actually move.", level: "Standard" },
  { id: "IR-04", name: "Incident response retainer", detail: "A named responder on call, and a 40-minute first-contact commitment.", level: "Always on" },
];

export const terminalScript = [
  "$ kestrel scan --target acme-prod --depth full",
  "resolving 214 hosts ............ done",
  "fingerprinting services ........ done",
  "found: exposed admin panel      10.4.2.19:8443",
  "found: outdated TLS stack       api.acme.io",
  "chain: panel -> token reuse -> internal API",
  "access gained in 3h 12m. report drafted.",
];

export const stats = [
  { value: "412", label: "engagements run" },
  { value: "3h 12m", label: "median time to first foothold" },
  { value: "0", label: "client breaches after remediation" },
];
