'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Abonne { id: string; email: string; createdAt: string; }

export default function AdminNewsletter() {
  const [abonnes, setAbonnes] = useState<Abonne[]>([]);

  useEffect(() => {
    fetch('/api/newsletter').then(r => r.json()).then(setAbonnes);
  }, []);

  async function deleteAbonne(id: string, email: string) {
    if (!confirm(`Désinscrire ${email} ?`)) return;
    await fetch(`/api/newsletter?id=${id}`, { method: 'DELETE' });
    setAbonnes(prev => prev.filter(a => a.id !== id));
  }

  function exportCSV() {
    const rows = [['Email', 'Date inscription'], ...abonnes.map(a => [a.email, new Date(a.createdAt).toLocaleDateString('fr-FR')])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'abonnes-lignerouge.csv'; a.click();
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-navy text-white px-8 py-4 flex items-center gap-6">
        <Link href="/admin" className="font-playfair text-2xl font-bold">LIGNE<span className="text-rouge">ROUGE</span></Link>
        <Link href="/admin" className="text-white/60 hover:text-white text-sm">← Dashboard</Link>
      </div>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-navy">Newsletter</h1>
            <p className="text-text3 text-sm mt-1">{abonnes.length} abonné{abonnes.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={exportCSV} className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold px-5 py-2.5 rounded text-sm transition-colors">
            ↓ Exporter CSV
          </button>
        </div>
        {abonnes.length === 0 ? (
          <p className="text-text3 text-center py-12">Aucun abonné pour le moment.</p>
        ) : (
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-bg border-b border-border">
                <tr>
                  {['Email', 'Date', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-bold uppercase tracking-wider text-text3 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {abonnes.map(a => (
                  <tr key={a.id} className="hover:bg-bg/50">
                    <td className="px-4 py-3 text-sm font-medium">{a.email}</td>
                    <td className="px-4 py-3 text-sm text-text3">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteAbonne(a.id, a.email)}
                        className="text-xs bg-rouge text-white px-3 py-1.5 rounded hover:bg-rouge2 transition-colors">
                        Désinscrire
                      </button>
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
