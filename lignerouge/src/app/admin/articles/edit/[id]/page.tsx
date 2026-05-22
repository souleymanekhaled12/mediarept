'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const CATEGORIES = ['Actualité', 'Politique', 'International', 'Sport', 'Société', 'Culture', 'Économie'];

export default function EditArticle({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({ titre: '', resume: '', contenu: '', imageUrl: '', categorie: '', auteur: '', publie: false });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/articles/${params.id}`).then(r => r.json()).then(a => {
      setForm({ titre: a.titre, resume: a.resume, contenu: a.contenu, imageUrl: a.imageUrl, categorie: a.categorie, auteur: a.auteur, publie: a.publie });
    });
  }, [params.id]);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setForm(f => ({ ...f, imageUrl: data.url }));
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    const res = await fetch(`/api/articles/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) setSuccess('Article mis à jour avec succès !');
    else { const d = await res.json(); setError(d.error || 'Erreur'); }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-navy text-white px-8 py-4 flex items-center gap-6">
        <Link href="/admin" className="font-playfair text-2xl font-bold">LIGNE<span className="text-rouge">ROUGE</span></Link>
        <Link href="/admin/articles" className="text-white/60 hover:text-white text-sm">← Articles</Link>
      </div>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="font-playfair text-3xl font-bold text-navy mb-8">Modifier l&apos;article</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-border rounded-lg p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text2 mb-1.5">Titre</label>
              <input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} required
                className="w-full border border-border rounded px-4 py-3 text-lg font-playfair outline-none focus:border-navy transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text2 mb-1.5">Résumé</label>
              <textarea value={form.resume} onChange={e => setForm(f => ({ ...f, resume: e.target.value }))} rows={2}
                className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-navy transition-colors resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text2 mb-1.5">Catégorie</label>
                <select value={form.categorie} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}
                  className="w-full border border-border rounded px-4 py-3 outline-none focus:border-navy bg-white">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text2 mb-1.5">Auteur</label>
                <input value={form.auteur} onChange={e => setForm(f => ({ ...f, auteur: e.target.value }))}
                  className="w-full border border-border rounded px-4 py-3 outline-none focus:border-navy transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text2 mb-1.5">Changer l&apos;image</label>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} className="block mb-3 text-sm" />
              {uploading && <p className="text-sm text-text3">Upload...</p>}
              {form.imageUrl && (
                <div className="relative h-40 rounded overflow-hidden border border-border">
                  <img src={form.imageUrl} alt="preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text2 mb-1.5">Contenu</label>
              <div className="border border-border rounded overflow-hidden">
                <ReactQuill value={form.contenu} onChange={v => setForm(f => ({ ...f, contenu: v }))} theme="snow"
                  modules={{ toolbar: [[{ header: [2, 3, false] }], ['bold', 'italic', 'underline', 'blockquote'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']] }} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="publie" checked={form.publie} onChange={e => setForm(f => ({ ...f, publie: e.target.checked }))} className="w-4 h-4 accent-rouge" />
              <label htmlFor="publie" className="text-sm font-semibold text-text2">Publié</label>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm font-semibold">{success}</p>}
          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="bg-rouge hover:bg-rouge2 text-white font-bold px-8 py-3 rounded transition-colors disabled:opacity-60">
              {saving ? 'Enregistrement...' : 'Mettre à jour'}
            </button>
            <Link href="/admin/articles" className="bg-bg border border-border hover:bg-border text-text2 font-semibold px-6 py-3 rounded transition-colors">Annuler</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
