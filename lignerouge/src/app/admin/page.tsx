'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  articles: number;
  publies: number;
  vues: number;
  abonnes: number;
  commentaires: number;
}

interface DbStatus {
  badge: string;
  db: string;
}

export default function AdminDashboard() {
  const [auth, setAuth] = useState({ email: '', password: '', ok: false, loading: false, error: '' });
  const [stats, setStats] = useState<Stats | null>(null);
  const [db, setDb] = useState<DbStatus | null>(null);

  function login(e: React.FormEvent) {
    e.preventDefault();
    setAuth(a => ({ ...a, loading: true, error: '' }));
    const creds = btoa(`${auth.email}:${auth.password}`);
    localStorage.setItem('admin_creds', creds);
    fetchStats(creds);
  }

  async function fetchStats(creds?: string) {
    const c = creds || localStorage.getItem('admin_creds') || '';
    try {
      const [ar, nl, cm, dbRes] = await Promise.all([
        fetch('/api/articles?all=true', { headers: { authorization: `Basic ${c}` } }).then(r => r.json()),
        fetch('/api/newsletter').then(r => r.json()),
        fetch('/api/comments?all=true').then(r => r.json()),
        fetch('/api/health').then(r => r.json()),
      ]);
      const articles = Array.isArray(ar) ? ar : [];
      setStats({
        articles: articles.length,
        publies: articles.filter((a: { publie: boolean }) => a.publie).length,
        vues: articles.reduce((acc: number, a: { vues: number }) => acc + (a.vues || 0), 0),
        abonnes: Array.isArray(nl) ? nl.length : 0,
        commentaires: Array.isArray(cm) ? cm.length : 0,
      });
      setDb(dbRes);
      setAuth(a => ({ ...a, ok: true, loading: false }));
    } catch {
      setAuth(a => ({ ...a, loading: false, error: 'Identifiants incorrects ou erreur réseau.' }));
    }
  }

  useEffect(() => {
    const c = localStorage.getItem('admin_creds');
    if (c) fetchStats(c);
  }, []);

  if (!auth.ok) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="font-playfair text-3xl font-bold text-navy mb-1">LIGNE<span className="text-rouge">ROUGE</span></div>
            <p className="text-text3 text-sm">Espace Administration</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text2 mb-1.5">Email</label>
              <input type="email" value={auth.email} onChange={e => setAuth(a => ({ ...a, email: e.target.value }))} required
                className="w-full border border-border rounded px-4 py-3 outline-none focus:border-navy transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text2 mb-1.5">Mot de passe</label>
              <input type="password" value={auth.password} onChange={e => setAuth(a => ({ ...a, password: e.target.value }))} required
                className="w-full border border-border rounded px-4 py-3 outline-none focus:border-navy transition-colors" />
            </div>
            {auth.error && <p className="text-red-500 text-sm">{auth.error}</p>}
            <button type="submit" disabled={auth.loading}
              className="w-full bg-rouge hover:bg-rouge2 text-white font-bold py-3 rounded transition-colors disabled:opacity-60">
              {auth.loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const cards = [
    { label: 'Articles publiés', value: stats?.publies ?? 0, sub: `${stats?.articles ?? 0} au total`, color: 'bg-navy' },
    { label: 'Vues totales', value: stats?.vues.toLocaleString('fr-FR') ?? 0, sub: 'Sur tous les articles', color: 'bg-rouge' },
    { label: 'Abonnés newsletter', value: stats?.abonnes ?? 0, sub: 'Inscrits actifs', color: 'bg-[#2e7d32]' },
    { label: 'Commentaires', value: stats?.commentaires ?? 0, sub: 'Approuvés', color: 'bg-[#1565c0]' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-navy text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-playfair text-2xl font-bold">LIGNE<span className="text-rouge">ROUGE</span></Link>
        <div className="flex items-center gap-6">
          {db && <span className="text-sm font-mono">{db.badge}</span>}
          <button onClick={() => { localStorage.removeItem('admin_creds'); setAuth({ email: '', password: '', ok: false, loading: false, error: '' }); }}
            className="text-white/60 hover:text-white text-sm transition-colors">Déconnexion</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="font-playfair text-3xl font-bold text-navy mb-2">Tableau de bord</h1>
        <p className="text-text3 text-sm mb-8">Bienvenue, Alassane Ibraima</p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map(c => (
            <div key={c.label} className={`${c.color} text-white rounded-lg p-5`}>
              <p className="text-4xl font-bold mb-1">{c.value}</p>
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="text-xs opacity-70 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: '+ Nouvel article', href: '/admin/articles/new', color: 'bg-rouge hover:bg-rouge2 text-white' },
            { label: '📋 Gérer les articles', href: '/admin/articles', color: 'bg-navy hover:bg-navy2 text-white' },
            { label: '📧 Newsletter', href: '/admin/newsletter', color: 'bg-[#1565c0] hover:bg-[#0d47a1] text-white' },
            { label: '💬 Commentaires', href: '/admin/commentaires', color: 'bg-[#2e7d32] hover:bg-[#1b5e20] text-white' },
            { label: '🌐 Voir le site', href: '/', color: 'bg-bg2 hover:bg-border text-navy border border-border' },
            { label: '🔍 API Santé', href: '/api/health', color: 'bg-bg2 hover:bg-border text-navy border border-border' },
          ].map(a => (
            <Link key={a.label} href={a.href}
              className={`${a.color} rounded-lg px-5 py-4 font-semibold text-sm text-center transition-colors`}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
