function plural(n, s) {
  return n === 1 ? s : s + 's';
}

// PUBLIC_INTERFACE
export function formatRelativeTime(ts) {
  /** Returns human friendly relative time from timestamp */
  const diff = Math.max(0, Date.now() - (Number(ts) || 0));
  const sec = Math.round(diff / 1000);
  if (sec < 10) return 'just now';
  if (sec < 60) return `${sec} ${plural(sec, 'second')} ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} ${plural(min, 'minute')} ago`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `${hrs} ${plural(hrs, 'hour')} ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} ${plural(days, 'day')} ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} ${plural(weeks, 'week')} ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} ${plural(months, 'month')} ago`;
  const years = Math.round(days / 365);
  return `${years} ${plural(years, 'year')} ago`;
}
