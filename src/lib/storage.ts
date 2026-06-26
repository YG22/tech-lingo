// Track which sets the user marked as completed (locally).
const KEY = "wt-completed-sets";

function read(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function isCompleted(level: string, setId: number): boolean {
  return !!read()[`${level}:${setId}`];
}

export function toggleCompleted(level: string, setId: number): boolean {
  const data = read();
  const key = `${level}:${setId}`;
  const next = !data[key];
  data[key] = next;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(data));
  return next;
}
