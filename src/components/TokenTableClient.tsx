'use client'

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import TokenTable from './TokenTable';
import sampleData from '@/data/sampleTokens';
import { useMockWebsocket } from '@/hooks/useMockWebsocket';
import { Token } from '@/types/token';
import Modal from './Modal';

/**

* Fetch tokens (mock) via react-query to get loading states
  */
  async function fetchTokens(): Promise<Token[]> {
  await new Promise((r) => setTimeout(r, 600));
  return sampleData;
  }

export default function TokenTableClient() {
// use object syntax to fix 3-argument TS error
const { data, isLoading, isError, refetch } = useQuery<Token[], Error>({
queryKey: ['tokens'],
queryFn: fetchTokens,
refetchOnWindowFocus: false,
});

const tokens: Token[] = data ?? [];
const wsUpdates: Record<string, number> = useMockWebsocket(tokens);

const merged: Token[] = useMemo(() => {
return tokens.map(t => {
const updatedPrice = wsUpdates[t.id];
if (updatedPrice !== undefined && updatedPrice !== t.price) {
return { ...t, price: updatedPrice };
}
return t;
});
}, [tokens, wsUpdates]);

if (isLoading) return <TokenTable tokens={[]} loading={true} />;

if (isError) {
return ( <div className="text-red-400">
Failed to load tokens.{' '}
<button onClick={() => refetch?.()} className="underline">
Retry </button> </div>
);
}

return (
<> <TokenTable tokens={merged} loading={false} /> <Modal />
</>
);
}
