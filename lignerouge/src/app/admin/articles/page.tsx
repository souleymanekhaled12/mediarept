'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: string;
  titre: string;
  slug: string;
  categorie: string;
  publie: boolean;
  vues: number;
  imageUrl: string;
  createdAt: string;
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    const res = await fetch('/api/articles?all=true');
    if (res.ok) setArticles(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  async function togglePublie(id: string, publie: boolean) {
    await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publie: !publie }),
    });
    fetchAll();
  }

  async function deleteArticle(id: string, titre: string) {
    if (!confirm(`Supprimer "${titre}" ? Cette action est irréversible.`)) return;
    await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    fetchAll();
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-navy text-white px-8 py-4 flex items-center gap-6">
        <Link href="/admin" className="font-playfair text-2xl font-bold">LIGNE<span className="text-rouge">ROUGE</span></Link>
        <Link href="/admin" className="text-white/60 hover:text-white text-sm transition-colors">← Dashboard</Link>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-3xl font-bold text-navy">Gestion des articles</h1>
          <Link href="/admin/articles/new"
            className="bg-rouge hover:bg-rouge2 text-white font-bold px-5 py-2.5 rounded transition-colors text-sm">
            + Nouvel article
          </Link>
        </div>

        {loading ? (
          <p className="text-text3">Chargement...</p>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 text-text3">
            <p className="font-playfair text-2xl mb-2">Aucun article</p>
            <p className="text-sm mb-4">Créez votre premier article pour démarrer.</p>
            <Link href="/admin/articles/new" className="bg-rouge text-white font-bold px-5 py-2.5 rounded text-sm">Créer un article</Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-bg border-b border-border">
                <tr>
                  {['Image', 'Titre', 'Catégorie', 'Statut', 'Vues', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-bold uppercase tracking-wider text-text3 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {articles.map(a => (
                  <tr key={a.id} className="hover:bg-bg/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="relative w-14 h-10 rounded overflow-hidden">
                        <Image src={a.imageUrl} alt={a.titre} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-sm text-text1 line-clamp-2 max-w-xs">{a.titre}</p>
                      <p className="text-xs text-text3 font-mono mt-0.5">/{a.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-bg border border-border text-xs font-semibold px-2 py-1 rounded">{a.categorie}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => togglePublie(a.id, a.publie)}
                        className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${a.publie ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
                        {a.publie ? '✅ Publié' : '⏳ Brouillon'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-text3">{a.vues.toLocaleString('fr-FR')}</td>
                    <td className="px-4 py-3 text-xs text-text3">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/articles/edit/${a.id}`}
                          className="text-xs bg-navy text-white px-3 py-1.5 rounded hover:bg-navy2 transition-colors font-medium">
                          Modifier
                        </Link>
                        <button onClick={() => deleteArticle(a.id, a.titre)}
                          className="text-xs bg-rouge text-white px-3 py-1.5 rounded hover:bg-rouge2 transition-colors font-medium">
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
