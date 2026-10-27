import { NextRequest, NextResponse } from 'next/server';
import { getSiteData, saveSiteData, resetSiteData } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await saveSiteData(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al guardar' }, { status: 500 });
    }
    const updated = await getSiteData();
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const result = await resetSiteData();
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al resetear' }, { status: 500 });
    }
    const defaults = await getSiteData();
    return NextResponse.json({ success: true, data: defaults });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
