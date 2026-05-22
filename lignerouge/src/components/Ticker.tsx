interface TickerProps {
  articles: { titre: string; categorie: string }[];
}

export default function Ticker({ articles }: TickerProps) {
  const items = articles.length > 0 ? articles : [
    { titre: 'Bienvenue sur LIGNEROUGE, votre média d\'élite', categorie: 'Info' },
    { titre: 'Restez informé des dernières actualités africaines et internationales', categorie: 'Info' },
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-navy h-10 flex items-center overflow-hidden relative z-30">
      <div className="bg-rouge text-white text-xs font-bold tracking-widest uppercase px-4 h-full flex items-center shrink-0">
        EN DIRECT
      </div>
      <div className="overflow-hidden flex-1 h-full">
        <div className="ticker-anim flex items-center whitespace-nowrap h-full">
          {doubled.map((item, i) => (
            <span key={i} className="text-[#E8E4DC] text-sm font-medium px-12 inline-flex items-center gap-2">
              <span className="w-1 h-1 bg-rouge rounded-full shrink-0" />
              {item.titre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
