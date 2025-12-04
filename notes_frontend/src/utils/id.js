let c = 0;
// PUBLIC_INTERFACE
export function uid() {
  /** Unique id generator based on timestamp and counter */
  c = (c + 1) % 10000;
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}_${c}`;
}
