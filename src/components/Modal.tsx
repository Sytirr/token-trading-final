'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAppDispatch } from '@/store';
import { setModalOpen } from '@/store/slices/uiSlice';
import sampleData from '@/data/sampleTokens';

export default function Modal() {
  const modalOpen = useSelector((s: RootState) => s.ui.modalOpen);
  const selectedId = useSelector((s: RootState) => s.ui.selectedTokenId);
  const dispatch = useAppDispatch();

  if (!modalOpen) return null;
  const token = sampleData.find(t => t.id === selectedId);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => dispatch(setModalOpen(false))} />
      <div className="bg-slate-800 p-6 rounded-lg z-10 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{token?.symbol} · {token?.name}</h2>
          <button onClick={() => dispatch(setModalOpen(false))} className="text-slate-400">Close</button>
        </div>
        <div className="text-sm text-slate-300">
          <p>Pair: {token?.pair}</p>
          <p>Price: {token ? token.price : '—'}</p>
          <p>24h: {token ? token.change24h : '—'}%</p>
          <p className="mt-4">This modal can contain actions (add to watchlist, trade, view chart) and further details. For the challenge implement basic actions here.</p>
        </div>
      </div>
    </div>
  )
}
