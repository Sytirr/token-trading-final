export function formatCurrency(v: number) {
  if (v >= 1) {
    return v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }
  // small numbers 
  if (v === 0) return '0';
  return v.toPrecision(6).replace(/\.?0+$/, '');
}

export function formatCompact(v: number) {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(2)}B`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(2)}K`;
  return String(v);
}
