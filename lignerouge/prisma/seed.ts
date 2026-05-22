import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = [
    {
      titre: "L'Afrique de l'Ouest face aux défis sécuritaires : analyse d'une crise multiforme",
      slug: "afrique-ouest-defis-securitaires-crise-multiforme",
      resume: "Dans un contexte géopolitique de plus en plus tendu, les États d'Afrique de l'Ouest naviguent entre instabilités politiques et menaces terroristes croissantes.",
      contenu: "<h2>Une région sous pression</h2><p>L'Afrique de l'Ouest traverse une période charnière de son histoire contemporaine. Plusieurs États font face à des crises sécuritaires d'une ampleur inédite, mettant à l'épreuve leurs institutions et leurs armées.</p><p>Les groupes armés non-étatiques étendent progressivement leur influence, exploitant les fractures sociales, la pauvreté et les défaillances de gouvernance pour recruter et opérer.</p><h2>Les réponses régionales</h2><p>Face à ces défis, les organisations régionales comme la CEDEAO et le G5 Sahel tentent de coordonner des réponses collectives. Mais leur efficacité est souvent limitée par des divergences politiques et des capacités militaires inégales.</p><p>Les partenariats internationaux — notamment avec la France, les États-Unis et la Russie — suscitent des débats croissants sur la souveraineté et l'efficacité de l'aide extérieure.</p>",
      imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&h=630&fit=crop",
      categorie: "Politique",
      auteur: "Alassane Ibraima",
      publie: true,
      vues: 1247,
    },
    {
      titre: "Football africain : la CAN 2025 promet des surprises selon les experts",
      slug: "football-africain-can-2025-surprises",
      resume: "La Coupe d'Afrique des Nations 2025 approche à grands pas. Les pronostics des spécialistes divergent sur les favoris.",
      contenu: "<h2>La CAN, l'événement sportif continental</h2><p>La Coupe d'Afrique des Nations reste le rendez-vous sportif le plus attendu du continent. Cette édition s'annonce particulièrement compétitive avec l'émergence de nouvelles générations de talents.</p><p>Des équipes comme le Sénégal, le Maroc, la Côte d'Ivoire et le Nigeria partent avec les faveurs des pronostics, mais les surprises font partie de l'ADN de cette compétition.</p><h2>Les talents à surveiller</h2><p>Cette génération de footballeurs africains brille en Europe et dans les plus grands clubs du monde. Leur retour en sélection nationale est toujours un moment de communion nationale exceptionnel.</p>",
      imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200&h=630&fit=crop",
      categorie: "Sport",
      auteur: "Alassane Ibraima",
      publie: true,
      vues: 892,
    },
    {
      titre: "Économie béninoise : les réformes structurelles portent leurs fruits",
      slug: "economie-beninoise-reformes-structurelles",
      resume: "Depuis plusieurs années, le Bénin engage des réformes ambitieuses pour moderniser son économie et attirer les investisseurs étrangers.",
      contenu: "<h2>Un modèle de transformation économique</h2><p>Le Bénin s'est imposé comme l'un des exemples les plus cités de transformation économique en Afrique de l'Ouest. Des réformes ambitieuses ont permis d'améliorer significativement le climat des affaires et d'attirer des investissements dans des secteurs stratégiques.</p><p>Le Port de Cotonou, modernisé et optimisé, joue un rôle croissant dans le commerce régional. Le secteur agricole, notamment le coton, continue de générer des devises importantes.</p><h2>Les défis à surmonter</h2><p>Malgré ces avancées, le Bénin doit encore relever des défis majeurs en matière d'éducation, de santé et d'inclusion économique des populations rurales.</p>",
      imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1200&h=630&fit=crop",
      categorie: "Économie",
      auteur: "Alassane Ibraima",
      publie: true,
      vues: 634,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log('✅ Données de démo insérées.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
