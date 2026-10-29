export const host = { name: "atlas-prod-07", region: "eu-west-2", os: "Ubuntu 24.04", kernel: "6.8.0-45", uptime: "41d 06h 12m" };

export const cores = Array.from({ length: 16 }, (_, i) => ({ id: i, load: Math.round(28 + ((i * 37) % 55)) }));

export const disks = [
  { mount: "/", used: 62, size: "240 GB" },
  { mount: "/var/lib/postgres", used: 81, size: "1.0 TB" },
  { mount: "/var/log", used: 44, size: "120 GB" },
  { mount: "/mnt/backup", used: 93, size: "2.0 TB" },
];

export const processes = [
  { pid: 2381, name: "postgres: writer", cpu: 18.4, mem: 12.1, user: "postgres" },
  { pid: 1190, name: "node api-gateway", cpu: 14.2, mem: 6.8, user: "svc-api" },
  { pid: 4410, name: "ffmpeg -i ingest", cpu: 11.9, mem: 3.4, user: "media" },
  { pid: 907, name: "redis-server", cpu: 6.3, mem: 4.9, user: "redis" },
  { pid: 3302, name: "nginx: worker", cpu: 4.8, mem: 1.2, user: "www-data" },
  { pid: 5128, name: "vector", cpu: 3.1, mem: 2.2, user: "telemetry" },
  { pid: 611, name: "containerd", cpu: 1.7, mem: 1.9, user: "root" },
];

export const services = [
  { name: "api-gateway", state: "running", latency: "42 ms" },
  { name: "postgres", state: "running", latency: "6 ms" },
  { name: "queue-worker", state: "degraded", latency: "310 ms" },
  { name: "object-store", state: "running", latency: "18 ms" },
  { name: "cron-runner", state: "stopped", latency: "n/a" },
];

export const events = [
  { time: "14:02:11", level: "warn", text: "queue-worker backlog above 800 jobs" },
  { time: "14:01:47", level: "info", text: "nightly snapshot verified (412 GB)" },
  { time: "13:58:20", level: "error", text: "cron-runner exited with code 137 (out of memory)" },
  { time: "13:55:02", level: "info", text: "certificate for api.atlas.io renewed" },
  { time: "13:49:36", level: "warn", text: "/mnt/backup above 90 percent capacity" },
];
