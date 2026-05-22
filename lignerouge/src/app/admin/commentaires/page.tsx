'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Commentaire {
  id: string;
  auteur: string;
  contenu: string;
  createdAt: string;
  approuve: boolean;
  article: { titre: string; slug: string };
}

export default function AdminCommentaires() {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

  useEffect(() => {
    fetch('/api/comments?all=true').then(r => r.json()).then(setCommentaires);
  }, []);

  async function deleteCommentaire(id: string) {
    if (!confirm('Supprimer ce commentaire ?')) return;
    await fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
    setCommentaires(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-navy text-white px-8 py-4 flex items-center gap-6">
        <Link href="/admin" className="font-playfair text-2xl font-bold">LIGNE<span className="text-rouge">ROUGE</span></Link>
        <Link href="/admin" className="text-white/60 hover:text-white text-sm">← Dashboard</Link>
      </div>
      <div className="max-w-5xl mx-auto px-8 py-10">
        <h1 className="font-playfair text-3xl font-bold text-navy mb-2">Modération des commentaires</h1>
        <p className="text-text3 text-sm mb-8">{commentaires.length} commentaire{commentaires.length !== 1 ? 's' : ''}</p>

        {commentaires.length === 0 ? (
          <p className="text-text3 text-center py-12">Aucun commentaire pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {commentaires.map(c => (
              <div key={c.id} className="bg-white border border-border rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-rouge text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {c.auteur[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-sm">{c.auteur}</span>
                        <span className="text-xs text-text3 ml-2">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <p className="text-sm text-text2 leading-relaxed mb-2">{c.contenu}</p>
                    <p className="text-xs text-text3">
                      Sur : <Link href={`/${c.article.slug}`} className="text-navy hover:text-rouge underline">{c.article.titre}</Link>
                    </p>
                  </div>
                  <button onClick={() => deleteCommentaire(c.id)}
                    className="text-xs bg-rouge text-white px-3 py-1.5 rounded hover:bg-rouge2 transition-colors shrink-0 font-medium">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
