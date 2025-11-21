import { Token } from '@/types/token';

const sample: Token[] = [
  { id: '1', symbol: 'AXM', name: 'Axiom', price: 1.234567, change24h: 2.3, marketCap: 1_200_000_000, pair: 'AXM/USDT', image: '', tags: ['New pair'] },
  { id: '2', symbol: 'TRD', name: 'TradeCoin', price: 0.04567, change24h: -1.23, marketCap: 380_000_000, pair: 'TRD/ETH', image: '', tags: ['Migrated'] },
  { id: '3', symbol: 'STR', name: 'Stretch', price: 12.12345, change24h: 0.13, marketCap: 2_400_000_000, pair: 'STR/USDC', image: '', finalStretch: true },
  { id: '4', symbol: 'NXT', name: 'NextGen', price: 0.9876, change24h: -5.0, marketCap: 80_000_000, pair: 'NXT/USDC', image: ''},
  { id: '5', symbol: 'NEW', name: 'NewToken', price: 0.00012, change24h: 22.1, marketCap: 2_000_000, pair: 'NEW/USDT', image: '', tags: ['New pair'] },
];

export default sample;
