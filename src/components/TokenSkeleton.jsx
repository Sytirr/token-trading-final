import React from 'react';

const sampleData = [
{ name: 'Bitcoin', price: '$28,000', change: 'gain' },
{ name: 'Ethereum', price: '$1,800', change: 'loss' },
{ name: 'Solana', price: '$24', change: 'gain' },
{ name: 'Ripple', price: '$0.55', change: 'loss' },
];

export default function TokenSkeleton() {
return ( <div className="app-dark p-6 min-h-screen"> <div className="card-row">
{sampleData.map((token, idx) => ( <div key={idx} className="card-skeleton">
{/* Top section: Avatar + Name/Price */} <div className="flex items-center gap-4"> <div className="avatar-skeleton skeleton"></div> <div className="flex flex-col flex-1 card-content"> <div className="text-skeleton skeleton w-32"></div>
<div className={token.change === 'gain' ? 'price-gain' : 'price-loss'}>
{token.price} {token.change === 'gain' ? '▲' : '▼'} </div> </div> </div>

```
        {/* Bottom skeleton lines */}
        <div className="text-skeleton skeleton w-full"></div>
        <div className="text-skeleton w-3/4 skeleton"></div>
      </div>
    ))}
  </div>
</div>

);
}

