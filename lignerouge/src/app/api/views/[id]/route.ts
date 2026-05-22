import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.article.update({
      where: { id: params.id },
      data: { vues: { increment: 1 } },
    });
    return NextResponse.json({ vues: article.vues });
  } catch {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
