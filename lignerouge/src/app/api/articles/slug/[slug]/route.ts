import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      commentaires: {
        where: { approuve: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  if (!article) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
  return NextResponse.json(article);
}
