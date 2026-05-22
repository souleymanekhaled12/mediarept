import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1320px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="font-playfair text-2xl font-bold mb-4">
            LIGNE<span className="text-rouge">ROUGE</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Média numérique d&apos;élite. Journalisme indépendant, rigoureux et engagé pour l&apos;Afrique et le monde.
          </p>
          <div className="flex gap-4 mt-6">
            {['Facebook', 'Twitter', 'WhatsApp'].map(s => (
              <a key={s} href="#" className="text-white/60 hover:text-rouge transition-colors text-sm">{s}</a>
            ))}
          </div>
        </div>

        {[
          { title: 'Rubriques', links: [['Actualité', '/?cat=Actualité'], ['Politique', '/?cat=Politique'], ['International', '/?cat=International'], ['Sport', '/?cat=Sport']] },
          { title: 'À propos', links: [['Qui sommes-nous', '/a-propos'], ['Biographie', '/biographie'], ['Contact', '/contact'], ['Mentions légales', '/mentions-legales']] },
          { title: 'Services', links: [['Newsletter', '#newsletter'], ['Administration', '/admin'], ['API Santé', '/api/health']] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-rouge mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 hover:text-white text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <span>© {new Date().getFullYear()} LIGNEROUGE. Tous droits réservés.</span>
          <span>Fondé par Alassane Ibraima — Bénin, Afrique de l&apos;Ouest</span>
        </div>
      </div>
    </footer>
  );
}
