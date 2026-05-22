import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos — LIGNEROUGE',
  description: 'Découvrez la mission, les valeurs et l\'équipe de LIGNEROUGE, le média numérique d\'élite fondé par Alassane Ibraima.',
};

export default function APropos() {
  return (
    <>
      <Ticker articles={[]} />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-bold tracking-widest uppercase text-rouge mb-4">Notre mission</p>
        <h1 className="font-playfair text-5xl font-bold text-navy mb-6">À propos de LIGNEROUGE</h1>
        <div className="w-12 h-1 bg-rouge rounded mb-10" />

        <div className="space-y-6 text-text2 leading-relaxed text-lg">
          <p>
            <strong className="text-text1">LIGNEROUGE</strong> est un média numérique d&rsquo;information indépendant, fondé avec la conviction que l&rsquo;Afrique mérite un journalisme rigoureux, courageux et connecté aux réalités du monde contemporain.
          </p>
          <p>
            Notre nom est un engagement : la <em>ligne rouge</em> que nous refusons de franchir — celle du mensonge, de la complaisance et de la désinformation. Nous plaçons la vérité au cœur de chaque article, chaque enquête, chaque prise de position.
          </p>
          <p>
            Couvrant l&rsquo;actualité politique, économique, sportive, culturelle et internationale, LIGNEROUGE s&rsquo;adresse à tous les citoyens francophones qui aspirent à une information de qualité, vérifiée et contextualissée.
          </p>
          <p>
            Fondé par <strong className="text-text1">Alassane Ibraima</strong>, journaliste béninois à l&rsquo;ambition internationale, LIGNEROUGE est bien plus qu&rsquo;un site d&rsquo;information : c&rsquo;est une tribune, un outil d&rsquo;émancipation et un vecteur de rayonnement pour la voix africaine sur la scène mondiale.
          </p>
        </div>

        <div className="mt-12 bg-navy text-white rounded-lg p-8">
          <h2 className="font-playfair text-2xl font-bold mb-6">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Indépendance', desc: 'Aucune allégeance partisane. Aucun compromis éditorial.' },
              { title: 'Rigueur', desc: 'Vérification des faits. Sourcing transparent. Rectification assumée.' },
              { title: 'Impact', desc: 'Chaque article doit informer, interpeller et provoquer la réflexion.' },
            ].map(v => (
              <div key={v.title}>
                <div className="w-8 h-0.5 bg-rouge mb-3" />
                <h3 className="font-playfair text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
