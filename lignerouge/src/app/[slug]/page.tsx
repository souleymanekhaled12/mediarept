import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ShareButtons from '@/components/ShareButtons';
import CommentSection from '@/components/CommentSection';
import ViewCounter from '@/components/ViewCounter';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await prisma.article.findUnique({ where: { slug: params.slug } });
  if (!article) return {};
  return {
    title: article.titre,
    description: article.resume,
    openGraph: {
      title: article.titre,
      description: article.resume,
      images: [{ url: article.imageUrl, width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: article.titre, description: article.resume, images: [article.imageUrl] },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug, publie: true },
    include: { commentaires: { where: { approuve: true }, orderBy: { createdAt: 'desc' } } },
  });
  if (!article) notFound();

  const related = await prisma.article.findMany({
    where: { publie: true, categorie: article.categorie, NOT: { id: article.id } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const recents = await prisma.article.findMany({
    where: { publie: true },
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const date = new Date(article.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <Ticker articles={recents.map(a => ({ titre: a.titre, categorie: a.categorie }))} />
      <Navbar />

      <main className="max-w-[1320px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          {/* Article */}
          <article>
            <div className="mb-3">
              <span className="inline-flex bg-rouge text-white text-[.68rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm">{article.categorie}</span>
            </div>
            <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-navy leading-tight mb-4">{article.titre}</h1>
            {article.resume && (
              <p className="text-lg text-text2 font-serif leading-relaxed border-l-4 border-rouge pl-4 mb-6">{article.resume}</p>
            )}
            <div className="flex items-center gap-6 text-sm text-text3 mb-6 pb-6 border-b border-border">
              <div>
                <span className="font-semibold text-text1">{article.auteur}</span>
                <span className="mx-2">·</span>
                <span>{date}</span>
              </div>
              <ViewCounter id={article.id} initialVues={article.vues} />
            </div>

            <div className="relative w-full h-[420px] rounded overflow-hidden mb-8">
              <Image src={article.imageUrl} alt={article.titre} fill className="object-cover" priority />
            </div>

            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.contenu }} />

            <div className="mt-8 pt-6 border-t border-border">
              <ShareButtons titre={article.titre} slug={article.slug} />
            </div>

            <CommentSection articleId={article.id} commentaires={article.commentaires} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <h3 className="font-playfair text-lg font-bold text-navy mb-4 pb-2 border-b-2 border-border flex items-center gap-2">
                <span className="w-0.5 h-4 bg-rouge rounded block" /> Articles similaires
              </h3>
              <div className="space-y-4">
                {related.map(r => (
                  <a key={r.id} href={`/${r.slug}`} className="flex gap-3 group">
                    <div className="relative w-20 h-16 rounded overflow-hidden shrink-0">
                      <Image src={r.imageUrl} alt={r.titre} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[.65rem] font-bold tracking-wider uppercase text-rouge mb-1">{r.categorie}</p>
                      <h4 className="font-playfair text-sm font-semibold leading-snug text-text1 line-clamp-3 group-hover:text-rouge transition-colors">{r.titre}</h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-navy rounded p-6 text-white text-center">
              <p className="text-xs font-bold tracking-widest uppercase text-rouge mb-3">Newsletter</p>
              <p className="font-playfair text-xl font-bold mb-3">Restez connecté</p>
              <p className="text-white/60 text-sm mb-4">Recevez l&apos;essentiel de l&apos;actualité chaque jour.</p>
              <a href="/#newsletter" className="block bg-rouge hover:bg-rouge2 text-white text-sm font-bold py-2.5 rounded transition-colors">
                S&apos;abonner gratuitement
              </a>
            </div>
          </aside>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}
