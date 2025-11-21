'use client'
import React, { useEffect, useRef } from 'react';
import type { Token } from '@/types/token';
import { formatCurrency, formatCompact } from '@/utils/format';
import { useState } from 'react';
import { setSelectedToken, setModalOpen } from '@/store/slices/uiSlice';
import { useAppDispatch } from '@/store';
import clsx from 'clsx';

type Props = { token: Token };

function PriceCell({ price, prev }: { price: number, prev?: number }) {
  const dir = prev === undefined ? 'neutral' : (price > prev ? 'up' : (price < prev ? 'down' : 'neutral'));
  return (
    <div className={clsx('price-transition text-right', dir === 'up' && 'text-up', dir === 'down' && 'text-down')}>
      {formatCurrency(price)}
    </div>
  )
}

const TokenRowInner = ({ token }: Props) => {
  const dispatch = useAppDispatch();
  const [prevPrice, setPrevPrice] = useState<number | undefined>(undefined);
  const prevRef = useRef(token.price);

  useEffect(() => {
    if (token.price !== prevRef.current) {
      setPrevPrice(prevRef.current);
      prevRef.current = token.price;
      // clear previous indicator after a short delay (to allow transition)
      const t = setTimeout(() => setPrevPrice(undefined), 800);
      return () => clearTimeout(t);
    }
  }, [token.price]);

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-4 px-4 py-3 table-row hover:bg-slate-850 cursor-default border-b border-slate-700">
      <div className="md:col-span-4 flex items-center gap-3">
        {/* avatar */}
        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-sm">
          {token.symbol[0]}
        </div>
        <div>
          <div className="font-medium">{token.symbol} <span className="text-sm text-slate-400">· {token.name}</span></div>
          <div className="text-xs text-slate-400">{token.pair}</div>
        </div>
      </div>

      <div className="md:col-span-2 flex items-center justify-end">
        <PriceCell price={token.price} prev={prevPrice} />
      </div>

      <div className="md:col-span-2 flex items-center justify-end">
        <div className={clsx('text-right', token.change24h > 0 ? 'text-up' : 'text-down')}>{token.change24h.toFixed(2)}%</div>
      </div>

      <div className="md:col-span-3 flex items-center justify-end">
        <div className="text-sm text-slate-300">{formatCompact(token.marketCap ?? 0)}</div>
      </div>

      <div className="md:col-span-1 flex items-center justify-end">
        <button onClick={() => { dispatch(setSelectedToken(token.id)); dispatch(setModalOpen(true)); }} className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm">
          View
        </button>
      </div>
    </div>
  )
}

export default React.memo(TokenRowInner, (a, b) => a.token.price === b.token.price && a.token.change24h === b.token.change24h);
