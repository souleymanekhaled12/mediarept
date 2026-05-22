import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mentions légales — LIGNEROUGE' };

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-playfair text-4xl font-bold text-navy mb-8">Mentions légales</h1>
        <div className="space-y-6 text-text2 text-sm leading-relaxed">
          <section>
            <h2 className="font-playfair text-xl font-bold text-navy mb-2">Éditeur</h2>
            <p>LIGNEROUGE — Média numérique indépendant<br />Directeur de publication : Alassane Ibraima<br />Contact : ibrahimaalassane2016@gmail.com</p>
          </section>
          <section>
            <h2 className="font-playfair text-xl font-bold text-navy mb-2">Hébergement</h2>
            <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, California 94104, États-Unis.</p>
          </section>
          <section>
            <h2 className="font-playfair text-xl font-bold text-navy mb-2">Propriété intellectuelle</h2>
            <p>Tous les contenus publiés sur LIGNEROUGE (textes, images, graphismes) sont la propriété exclusive de LIGNEROUGE et de ses contributeurs. Toute reproduction est interdite sans autorisation préalable.</p>
          </section>
          <section>
            <h2 className="font-playfair text-xl font-bold text-navy mb-2">Données personnelles</h2>
            <p>Les données collectées via le formulaire newsletter sont utilisées uniquement pour l&rsquo;envoi d&rsquo;informations. Conformément au RGPD, vous disposez d&rsquo;un droit de désinscription à tout moment.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
