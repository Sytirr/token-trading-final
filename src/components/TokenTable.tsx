'use client'
import React, { useMemo, useState, useCallback } from 'react';
import type { Token } from '@/types/token';
import { setSort } from '@/store/slices/uiSlice';
import { useAppDispatch } from '@/store';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
tokens: Token[];
loading?: boolean;
};

export default function TokenTable({ tokens, loading = false }: Props) {
const dispatch = useAppDispatch();
const [sortKey, setSortKey] = useState<string>('marketCap');
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

const onSort = useCallback(
(key: string) => {
if (sortKey === key) {
const next = sortDir === 'asc' ? 'desc' : 'asc';
setSortDir(next);
dispatch(setSort({ key, dir: next }));
} else {
setSortKey(key);
setSortDir('desc');
dispatch(setSort({ key, dir: 'desc' }));
}
},
[sortKey, sortDir, dispatch]
);

const sorted = useMemo(() => {
if (!tokens) return [];
const copy = [...tokens];
copy.sort((a: any, b: any) => {
const av = a[sortKey] ?? 0;
const bv = b[sortKey] ?? 0;
if (av === bv) return 0;
if (sortDir === 'asc') return av > bv ? 1 : -1;
return av > bv ? -1 : 1;
});
return copy;
}, [tokens, sortKey, sortDir]);

// Chart data: show last 10 price points for simplicity
const chartData = useMemo(() => {
const labels = tokens.map(t => t.pair);
const prices = tokens.map(t => parseFloat(String(t.price).replace(/[^0-9.-]+/g, '')) || 0);
const colors = tokens.map(t =>
String(t.change24h).startsWith('-') ? 'rgba(255,99,132,1)' : 'rgba(0,255,0,1)'
);


return {
  labels,
  datasets: [
    {
      label: 'Price',
      data: prices,
      borderColor: 'rgba(0,255,0,1)',
      backgroundColor: 'rgba(0,255,0,0.2)',
      tension: 0.3,
      pointBackgroundColor: colors,
    },
  ],
};


}, [tokens]);

const chartOptions = {
responsive: true,
plugins: {
legend: { display: false },
},
scales: {
y: { beginAtZero: false },
},
};

return ( <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
{/* Header */} <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-900 border-b border-slate-700 text-slate-300 text-sm font-medium">
<div className="col-span-4 flex items-center cursor-pointer" onClick={() => onSort('pair')}>
Token </div>
<div className="col-span-2 flex items-center justify-end cursor-pointer" onClick={() => onSort('price')}>
Price </div>
<div className="col-span-2 flex items-center justify-end cursor-pointer" onClick={() => onSort('change24h')}>
24h </div>
<div className="col-span-3 flex items-center justify-end cursor-pointer" onClick={() => onSort('marketCap')}>
Market Cap </div> <div className="col-span-1"></div> </div>


  {/* Rows */}
  <div>
    {loading
      ? Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-700 animate-pulse">
            <div className="col-span-4 h-6 bg-slate-700 rounded"></div>
            <div className="col-span-2 h-6 bg-slate-700 rounded"></div>
            <div className="col-span-2 h-6 bg-slate-700 rounded"></div>
            <div className="col-span-3 h-6 bg-slate-700 rounded"></div>
            <div className="col-span-1 h-6 bg-slate-700 rounded"></div>
          </div>
        ))
      : sorted.map(token => (
          <div
            key={token.id}
            className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-700 hover:bg-slate-700/20"
          >
            <div className="col-span-4 flex items-center">{token.pair}</div>
            <div className="col-span-2 flex items-center justify-end">{token.price}</div>
            <div className="col-span-2 flex items-center justify-end">{token.change24h}</div>
            <div className="col-span-3 flex items-center justify-end">{token.marketCap}</div>
            <div className="col-span-1 flex items-center justify-center">⋮</div>
          </div>
        ))}
  </div>

  {/* Main Chart */}
  <div className="p-4 bg-slate-900">
    <Line data={chartData} options={chartOptions} />
  </div>
</div>


);
}
