import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

interface Article {
  id: string;
  titre: string;
  slug: string;
  resume: string;
  imageUrl: string;
  categorie: string;
  auteur: string;
  vues: number;
  createdAt: Date;
}

async function getArticles(cat?: string) {
  return prisma.article.findMany({
    where: { publie: true, ...(cat ? { categorie: cat } : {}) },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
}

function ArticleCard({ article, rank }: { article: Article; rank?: number }) {
  const date = new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <Link href={`/${article.slug}`} className="group block">
      <div className="relative overflow-hidden rounded bg-white border border-border hover:border-border2 hover:shadow-md transition-all">
        <div className="relative h-48 overflow-hidden">
          <Image src={article.imageUrl} alt={article.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          {rank && (
            <div className="absolute top-3 left-3 w-8 h-8 bg-rouge text-white text-sm font-bold flex items-center justify-center rounded">
              {rank}
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-[.65rem] font-bold tracking-wider uppercase text-rouge mb-2">{article.categorie}</p>
          <h3 className="font-playfair font-bold text-base leading-snug text-text1 mb-3 line-clamp-3 group-hover:text-rouge transition-colors">{article.titre}</h3>
          <div className="flex items-center justify-between text-xs text-text3">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              {article.vues} vues
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams.cat;
  const articles = await getArticles(cat);
  const hero = articles[0];
  const heroSide = articles.slice(1, 4);
  const trending = articles.slice(0, 8);
  const more = articles.slice(4);

  return (
    <>
      <Ticker articles={articles.map(a => ({ titre: a.titre, categorie: a.categorie }))} />
      <Navbar />

      <main>
        {/* Hero */}
        {hero && (
          <section className="bg-white border-b border-border py-10">
            <div className="max-w-[1320px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
                <Link href={`/${hero.slug}`} className="group relative overflow-hidden rounded block">
                  <div className="relative h-[480px]">
                    <Image src={hero.imageUrl} alt={hero.titre} fill className="object-cover group-hover:scale-102 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="inline-flex bg-rouge text-white text-[.68rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm mb-3">{hero.categorie}</span>
                    <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">{hero.titre}</h1>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">{hero.resume}</p>
                    <div className="flex gap-4 text-xs text-white/60">
                      <span>{hero.auteur}</span>
                      <span>{new Date(hero.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span>{hero.vues} vues</span>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col gap-4">
                  {heroSide.map(a => (
                    <Link key={a.id} href={`/${a.slug}`}
                      className="flex gap-4 p-4 rounded border border-border bg-bg hover:border-border2 hover:bg-white hover:shadow transition-all group">
                      <div className="relative w-[90px] h-[72px] shrink-0 rounded overflow-hidden">
                        <Image src={a.imageUrl} alt={a.titre} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[.65rem] font-bold tracking-wider uppercase text-rouge mb-1">{a.categorie}</p>
                        <h3 className="font-playfair font-semibold text-sm leading-snug text-text1 line-clamp-3 group-hover:text-rouge transition-colors">{a.titre}</h3>
                        <p className="text-[.7rem] text-text3 mt-1">{new Date(a.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Trending */}
        {trending.length > 0 && (
          <section className="bg-white py-10">
            <div className="max-w-[1320px] mx-auto px-6">
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-border">
                <h2 className="font-playfair text-xl font-bold text-navy flex items-center gap-3">
                  <span className="w-0.5 h-5 bg-rouge rounded block" /> Les plus lus
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {trending.map((a, i) => (
                  <ArticleCard key={a.id} article={a} rank={i + 1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More articles */}
        {more.length > 0 && (
          <section className="py-10">
            <div className="max-w-[1320px] mx-auto px-6">
              <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-border">
                <h2 className="font-playfair text-xl font-bold text-navy flex items-center gap-3">
                  <span className="w-0.5 h-5 bg-rouge rounded block" /> {cat || 'Toute l\'actualité'}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {more.map(a => <ArticleCard key={a.id} article={a} />)}
              </div>
            </div>
          </section>
        )}

        {articles.length === 0 && (
          <div className="max-w-[1320px] mx-auto px-6 py-20 text-center text-text3">
            <p className="font-playfair text-2xl mb-3">Aucun article pour le moment</p>
            <p className="text-sm">Le contenu sera affiché ici dès la publication du premier article.</p>
          </div>
        )}
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}
