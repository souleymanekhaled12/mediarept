import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-white p-6">
      <div className="font-playfair text-3xl font-bold mb-2">LIGNE<span className="text-rouge">ROUGE</span></div>
      <div className="font-playfair text-8xl font-bold text-rouge my-8">404</div>
      <h1 className="font-playfair text-2xl font-bold mb-3">Page introuvable</h1>
      <p className="text-white/60 mb-8 text-center max-w-sm">Cette page n&rsquo;existe pas ou a été déplacée. Revenez à l&rsquo;accueil pour continuer votre lecture.</p>
      <Link href="/" className="bg-rouge hover:bg-rouge2 text-white font-bold px-8 py-3 rounded transition-colors">
        Retour à l&rsquo;accueil
      </Link>
    </div>
  );
}
