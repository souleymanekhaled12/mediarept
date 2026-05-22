import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const abonnes = await prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(abonnes);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    const abonne = await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    return NextResponse.json({ success: true, abonne }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  await prisma.newsletter.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
