'use client';
import { useState } from 'react';

interface Commentaire {
  id: string;
  auteur: string;
  contenu: string;
  createdAt: Date;
}

export default function CommentSection({ articleId, commentaires }: { articleId: string; commentaires: Commentaire[] }) {
  const [list, setList] = useState(commentaires);
  const [auteur, setAuteur] = useState('');
  const [email, setEmail] = useState('');
  const [contenu, setContenu] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, auteur, email, contenu }),
      });
      if (res.ok) {
        const c = await res.json();
        setList(prev => [c, ...prev]);
        setAuteur(''); setEmail(''); setContenu('');
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-playfair text-2xl font-bold text-navy mb-6">
        {list.length} commentaire{list.length !== 1 ? 's' : ''}
      </h3>

      {list.length > 0 && (
        <div className="space-y-4 mb-8">
          {list.map(c => (
            <div key={c.id} className="bg-bg border border-border rounded p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-rouge text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {c.auteur[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm text-text1">{c.auteur}</p>
                  <p className="text-xs text-text3">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <p className="text-sm text-text2 leading-relaxed">{c.contenu}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white border border-border rounded p-6">
        <h4 className="font-playfair text-lg font-bold mb-4">Laisser un commentaire</h4>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text2 mb-1.5">Nom *</label>
              <input value={auteur} onChange={e => setAuteur(e.target.value)} required
                className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-navy transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text2 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-navy transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text2 mb-1.5">Commentaire *</label>
            <textarea value={contenu} onChange={e => setContenu(e.target.value)} required rows={4}
              className="w-full border border-border rounded px-3 py-2.5 text-sm outline-none focus:border-navy transition-colors resize-none" />
          </div>
          {status === 'success' && <p className="text-green-600 text-sm">✅ Commentaire publié !</p>}
          {status === 'error' && <p className="text-red-500 text-sm">Une erreur est survenue.</p>}
          <button type="submit" disabled={status === 'loading'}
            className="bg-rouge hover:bg-rouge2 text-white font-bold px-6 py-2.5 rounded transition-colors disabled:opacity-60">
            {status === 'loading' ? 'Publication...' : 'Publier'}
          </button>
        </form>
      </div>
    </div>
  );
}
