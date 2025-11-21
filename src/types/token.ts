export type Token = {
  id: string;            // unique id
  symbol: string;        // e.g. "AXM"
  name: string;          // full name
  price: number;         // current price
  change24h: number;     // percent change
  marketCap?: number;
  pair?: string;         // pair string
  image?: string;        // avatar url
  tags?: string[];       // e.g. ["New pair"]
  migrated?: boolean;
  finalStretch?: boolean;
};
