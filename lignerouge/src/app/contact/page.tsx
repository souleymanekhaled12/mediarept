import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact — LIGNEROUGE' };

export default function Contact() {
  return (
    <>
      <Ticker articles={[]} />
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs font-bold tracking-widest uppercase text-rouge mb-4">Nous joindre</p>
        <h1 className="font-playfair text-5xl font-bold text-navy mb-6">Contact</h1>
        <div className="w-12 h-1 bg-rouge rounded mb-10" />
        <div className="space-y-5 text-text2">
          <p className="text-lg">Pour toute demande éditoriale, partenariat ou information presse, contactez la rédaction :</p>
          <div className="bg-bg border border-border rounded-lg p-6 space-y-3">
            <div><span className="text-xs font-bold uppercase tracking-wider text-text3">Email général</span><p className="font-semibold text-text1 mt-1">ibrahimaalassane2016@gmail.com</p></div>
            <div><span className="text-xs font-bold uppercase tracking-wider text-text3">Directeur de publication</span><p className="font-semibold text-text1 mt-1">Alassane Ibraima</p></div>
            <div><span className="text-xs font-bold uppercase tracking-wider text-text3">Localisation</span><p className="font-semibold text-text1 mt-1">Bénin, Afrique de l&rsquo;Ouest</p></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
