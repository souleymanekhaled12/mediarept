'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <section id="newsletter" className="bg-navy py-20 text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-xs font-bold tracking-[.12em] uppercase text-rouge mb-4">Newsletter</p>
        <h2 className="font-playfair text-4xl font-bold leading-tight mb-4">
          Restez informé en temps réel
        </h2>
        <p className="text-white/70 mb-8 text-lg">
          Recevez les grandes analyses et actualités de LIGNEROUGE directement dans votre boîte mail.
        </p>
        {status === 'success' ? (
          <p className="bg-green-600/20 border border-green-500/30 rounded px-6 py-4 text-green-300">
            ✅ Inscription confirmée ! Bienvenue dans la communauté LIGNEROUGE.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="Votre adresse email"
              className="flex-1 bg-white/5 border border-white/15 rounded px-5 py-3.5 text-white placeholder-white/40 outline-none focus:border-rouge transition-colors"
            />
            <button type="submit" disabled={status === 'loading'}
              className="bg-rouge hover:bg-rouge2 text-white font-bold px-7 py-3.5 rounded transition-colors disabled:opacity-60">
              {status === 'loading' ? '...' : "S'abonner"}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-red-400 text-sm">Une erreur est survenue. Réessayez.</p>
        )}
        <p className="mt-4 text-white/40 text-xs">Aucun spam. Désinscription en un clic.</p>
      </div>
    </section>
  );
}
