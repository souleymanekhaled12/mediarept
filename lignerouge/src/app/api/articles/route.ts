import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorie = searchParams.get('categorie');
  const publie = searchParams.get('publie');
  const all = searchParams.get('all');

  const where: Record<string, unknown> = {};
  if (categorie) where.categorie = categorie;
  if (!all) where.publie = publie === 'false' ? false : true;

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { commentaires: true } } },
  });

  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titre, resume, contenu, imageUrl, categorie, auteur, publie } = body;

    if (!titre || !contenu || !imageUrl || !categorie) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    let slug = slugify(titre);
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const article = await prisma.article.create({
      data: { titre, slug, resume: resume || '', contenu, imageUrl, categorie, auteur: auteur || 'Alassane Ibraima', publie: publie ?? false },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
