import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all');
  const commentaires = await prisma.commentaire.findMany({
    where: all ? {} : { approuve: true },
    include: { article: { select: { titre: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(commentaires);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleId, auteur, email, contenu } = body;
    if (!articleId || !auteur || !contenu) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }
    const commentaire = await prisma.commentaire.create({
      data: { articleId, auteur, email: email || '', contenu, approuve: true },
    });
    return NextResponse.json(commentaire, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  await prisma.commentaire.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
