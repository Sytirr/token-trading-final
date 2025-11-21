'use client'

import { useEffect, useRef, useState } from "react";
import type { Token } from "@/types/token";

/**
 * Returns a map of tokenId -> latest price (emits updates every second).
 * This is a mock websocket to simulate real time price updates.
 */
export function useMockWebsocket(tokens: Token[] = []) {
  const [updates, setUpdates] = useState<Record<string, number>>({});
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!tokens?.length) return;
    // initialize
    const map: Record<string, number> = {};
    tokens.forEach(t => map[t.id] = t.price);
    setUpdates(map);

    // every 1200ms update a few random tokens
    timerRef.current = window.setInterval(() => {
      setUpdates(prev => {
        const copy = { ...prev };
        // update 2-4 tokens randomly
        const count = Math.max(1, Math.floor(Math.random() * Math.min(4, tokens.length)));
        for (let i = 0; i < count; i++) {
          const token = tokens[Math.floor(Math.random() * tokens.length)];
          if (!token) continue;
          // random small delta
          const deltaPct = (Math.random() - 0.5) * 0.02; // +/-1%
          const old = copy[token.id] ?? token.price;
          const next = Number((old * (1 + deltaPct)).toFixed(6));
          copy[token.id] = next;
        }
        return copy;
      })
    }, 1200);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }
  }, [tokens.map(t => t.id).join(',') /* eslint-disable-line */]);

  return updates;
}
