// src/app/layout.tsx
import '../styles/globals.css'
import { ReactNode } from 'react'
import Providers from './Providers' // Client component wrapper

export const metadata = {
  title: 'Token Trading Table',
  description: 'Pixel-perfect token discovery table demo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-slate-900 text-slate-100">
            <main className="max-w-6xl mx-auto p-6">
              <header className="mb-6">
                <h1 className="text-2xl font-semibold">Token Trading Table</h1>
                <p className="text-sm text-slate-400">Axiom Trade replica — demo</p>
              </header>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
