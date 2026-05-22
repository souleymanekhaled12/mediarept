import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Biographie — Alassane Ibraima',
  description: 'Alassane Ibraima, journaliste et fondateur de LIGNEROUGE — parcours, vision, engagement pour un journalisme africain d\'excellence.',
};

export default function BiographiePage() {
  return (
    <>
      <Ticker articles={[]} />
      <Navbar />

      <main className="max-w-[1100px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start mb-16">
          <div>
            <p className="text-xs font-bold tracking-[.14em] uppercase text-rouge mb-4">Rédacteur en Chef & Fondateur</p>
            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
              Alassane<br />Ibraima
            </h1>
            <div className="w-16 h-1 bg-rouge mb-8 rounded" />
            <p className="font-serif text-xl text-text2 leading-relaxed italic">
              &ldquo;L&rsquo;information est un droit. La vérité, un devoir. Le journalisme africain mérite sa place sur la scène mondiale.&rdquo;
            </p>
          </div>

          <div className="relative">
            <div className="relative h-[460px] lg:h-[520px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&h=1000&fit=crop"
                alt="Alassane Ibraima — Rédacteur en Chef LIGNEROUGE"
                fill className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-rouge text-white px-5 py-3 rounded shadow-lg">
              <p className="font-playfair font-bold text-lg">LIGNEROUGE</p>
              <p className="text-xs opacity-80">Fondateur & Directeur de Publication</p>
            </div>
          </div>
        </div>

        {/* Bio content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          <div className="prose-custom space-y-8">

            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-rouge rounded block shrink-0" />
                Des origines à la vocation
              </h2>
              <div className="space-y-4 text-text2 leading-relaxed">
                <p>
                  Né le <strong className="text-text1">11 avril 1985 à Kouandé</strong>, dans la région septentrionale du Bénin, Alassane Ibraima grandit au cœur d&rsquo;une Afrique en mutation. Fils d&rsquo;une famille modeste mais animée par la soif de savoir, il effectue sa scolarité à Kouandé, où il développe très tôt un goût prononcé pour les mots, la lecture et la compréhension du monde.
                </p>
                <p>
                  C&rsquo;est à <strong className="text-text1">Natitingou</strong>, au Lycée Saint-Augustin — institution réputée pour son excellence académique —, qu&rsquo;il obtient son Baccalauréat avec distinction. Cette étape décisive forge en lui la rigueur intellectuelle et l&rsquo;esprit critique qui deviendront les piliers de son métier de journaliste.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-rouge rounded block shrink-0" />
                Un journaliste forgé sur le terrain
              </h2>
              <div className="space-y-4 text-text2 leading-relaxed">
                <p>
                  Alassane Ibraima embrasse le journalisme comme une mission, non comme un simple métier. Sa carrière débute dans les rédactions locales du nord du Bénin, où il couvre les réalités du terrain avec une précision chirurgicale et une empathie rare. Rapidement, son style incisif — ancré dans les faits, ouvert sur les enjeux continentaux — le distingue parmi ses pairs.
                </p>
                <p>
                  Fort d&rsquo;une expérience accumulée au fil des années dans les domaines de la politique, de l&rsquo;économie, du sport et des affaires internationales, il acquiert une vision panoramique des grands défis africains : gouvernance, développement, identité culturelle et souveraineté numérique.
                </p>
                <p>
                  Ses reportages et analyses traversent les frontières. Il est sollicité comme commentateur sur des questions relatives à l&rsquo;Afrique de l&rsquo;Ouest, à la politique béninoise et aux dynamiques géopolitiques du continent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-rouge rounded block shrink-0" />
                La naissance de LIGNEROUGE
              </h2>
              <div className="space-y-4 text-text2 leading-relaxed">
                <p>
                  Convaincu que l&rsquo;Afrique mérite un journalisme numérique à la hauteur de ses ambitions, Alassane Ibraima fonde <strong className="text-text1">LIGNEROUGE</strong> — un média en ligne indépendant qui allie rigueur éditoriale, accessibilité et impact international.
                </p>
                <p>
                  LIGNEROUGE s&rsquo;impose comme une plateforme d&rsquo;information de référence, couvrant l&rsquo;actualité politique, économique, sportive et culturelle avec l&rsquo;ambition de donner une voix authentique aux réalités africaines sur la scène mondiale.
                </p>
                <p>
                  Le nom lui-même est un manifeste : <em>la ligne rouge</em> que le journalisme de qualité ne franchit pas — celle de la complaisance, du sensationnalisme et de la désinformation. Un engagement total envers la vérité.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-rouge rounded block shrink-0" />
                Vision & Engagement
              </h2>
              <div className="space-y-4 text-text2 leading-relaxed">
                <p>
                  Pour Alassane Ibraima, l&rsquo;information est avant tout un service public. Dans un paysage médiatique mondial dominé par des puissances occidentales, il milite pour la montée en puissance d&rsquo;un journalisme africain souverain, professionnel et crédible.
                </p>
                <p>
                  Il croit fermement que chaque citoyen africain mérite un accès à une information de qualité, vérifiée et contextualisée — un droit fondamental dans toute démocratie vivante.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar facts */}
          <aside className="space-y-6 lg:sticky lg:top-20 self-start">
            <div className="bg-navy text-white rounded-lg p-6">
              <h3 className="font-playfair text-lg font-bold mb-5 text-rouge">Fiche identité</h3>
              <div className="space-y-4 text-sm">
                {[
                  { label: 'Naissance', value: '11 avril 1985' },
                  { label: 'Lieu de naissance', value: 'Kouandé, Bénin' },
                  { label: 'Formation', value: 'Bac — Lycée Saint-Augustin, Natitingou' },
                  { label: 'Nationalité', value: 'Béninoise' },
                  { label: 'Fonctions', value: 'Fondateur & Rédacteur en Chef de LIGNEROUGE' },
                  { label: 'Domaines', value: 'Politique, Économie, Sport, International' },
                ].map(item => (
                  <div key={item.label} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rouge text-white rounded-lg p-6">
              <h3 className="font-playfair text-lg font-bold mb-3">Sa devise</h3>
              <blockquote className="font-serif text-lg italic leading-relaxed">
                &ldquo;Informer sans trahir. Témoigner sans complaisance. Servir sans fléchir.&rdquo;
              </blockquote>
              <p className="text-right text-sm mt-3 opacity-80">— Alassane Ibraima</p>
            </div>

            <div className="bg-bg border border-border rounded-lg p-5">
              <h3 className="font-playfair text-base font-bold text-navy mb-3">Contact presse</h3>
              <p className="text-sm text-text2 mb-2">Pour interviews, partenariats ou demandes médias :</p>
              <a href="mailto:ibrahimaalassane2016@gmail.com"
                className="text-sm font-semibold text-rouge hover:underline break-all">
                ibrahimaalassane2016@gmail.com
              </a>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
