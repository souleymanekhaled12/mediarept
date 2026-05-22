'use client';
import { useState } from 'react';

interface ShareButtonsProps {
  titre: string;
  slug: string;
}

export default function ShareButtons({ titre, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : '';

  const shares = [
    {
      label: 'WhatsApp',
      color: 'bg-[#25D366] hover:bg-[#1da851]',
      href: `https://wa.me/?text=${encodeURIComponent(`${titre} — ${url}`)}`,
    },
    {
      label: 'Facebook',
      color: 'bg-[#1877F2] hover:bg-[#0f5cbf]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: 'Twitter / X',
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(titre)}&url=${encodeURIComponent(url)}`,
    },
  ];

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-text3 mb-3">Partager cet article</p>
      <div className="flex flex-wrap gap-2">
        {shares.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            className={`${s.color} text-white text-xs font-bold px-4 py-2 rounded transition-colors`}>
            {s.label}
          </a>
        ))}
        <button onClick={copyLink}
          className="bg-border hover:bg-border2 text-text2 text-xs font-bold px-4 py-2 rounded transition-colors">
          {copied ? '✅ Lien copié !' : '🔗 Copier le lien'}
        </button>
      </div>
    </div>
  );
}
