export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);

    if (raw === null) return fallback;

    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
