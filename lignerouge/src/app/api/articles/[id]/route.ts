import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: { commentaires: { orderBy: { createdAt: 'desc' } } },
  });
  if (!article) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { titre, resume, contenu, imageUrl, categorie, auteur, publie } = body;

    const updateData: Record<string, unknown> = {
      resume, contenu, imageUrl, categorie, auteur, publie,
    };

    if (titre) {
      updateData.titre = titre;
      let slug = slugify(titre);
      const existing = await prisma.article.findFirst({ where: { slug, NOT: { id: params.id } } });
      if (existing) slug = `${slug}-${Date.now()}`;
      updateData.slug = slug;
    }

    const article = await prisma.article.update({ where: { id: params.id }, data: updateData });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.article.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
