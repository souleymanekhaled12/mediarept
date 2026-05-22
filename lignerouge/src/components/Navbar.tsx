'use client';
import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Actualité', 'Politique', 'International', 'Sport', 'Société', 'Culture', 'Économie'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <>
      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-6"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <form action="/recherche" method="get">
              <div className="flex border-2 border-border2 rounded overflow-hidden focus-within:border-navy transition-colors">
                <input name="q" value={searchVal} onChange={e => setSearchVal(e.target.value)}
                  className="flex-1 border-none outline-none text-lg px-4 py-3 bg-transparent"
                  placeholder="Rechercher un article..." autoFocus />
                <button type="submit" className="bg-navy text-white px-5 font-semibold hover:bg-navy2 transition-colors">
                  Chercher
                </button>
              </div>
            </form>
            <button onClick={() => setSearchOpen(false)}
              className="mt-3 text-text3 text-sm hover:text-text1 flex items-center gap-2">
              ✕ Fermer
            </button>
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-border sticky top-0 z-40 h-16">
        <div className="max-w-[1320px] mx-auto px-6 flex items-center h-full gap-0">
          <Link href="/" className="font-playfair text-2xl font-bold text-navy tracking-tight shrink-0">
            LIGNE<span className="text-rouge">ROUGE</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 flex-1 ml-5">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/?cat=${cat}`}
                className="text-xs font-semibold tracking-wider uppercase text-text2 px-3 py-2 rounded hover:text-navy hover:bg-bg transition-colors whitespace-nowrap">
                {cat}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-text2 bg-bg border border-border px-3 py-1.5 rounded-full hover:border-border2 hover:text-text1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Rechercher</span>
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5 p-1.5">
              <span className="w-5 h-0.5 bg-text1 block" />
              <span className="w-5 h-0.5 bg-text1 block" />
              <span className="w-5 h-0.5 bg-text1 block" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-2">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/?cat=${cat}`} onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold uppercase text-text2 py-2 hover:text-navy">
                {cat}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
