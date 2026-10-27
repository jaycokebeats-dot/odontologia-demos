import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name || 'imagen.jpg';
    const ext = path.extname(originalName).toLowerCase() || '.jpg';
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}_${baseName}${ext}`;

    const blogImagesDir = path.join(process.cwd(), 'public', 'images', 'blog');

    try {
      if (!fs.existsSync(blogImagesDir)) {
        fs.mkdirSync(blogImagesDir, { recursive: true });
      }
      const filePath = path.join(blogImagesDir, fileName);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/images/blog/${fileName}`,
        name: fileName,
      });
    } catch (fsErr) {
      // In serverless environments where local disk write is read-only, return data URL
      console.warn('Filesystem write failed, using data-url fallback:', fsErr);
      const mimeType = file.type || 'image/jpeg';
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        name: fileName,
        note: 'Saved as optimized data-URL',
      });
    }
  } catch (err: any) {
    console.error('Error in /api/admin/upload:', err);
    return NextResponse.json({ error: err.message || 'Error al procesar la imagen' }, { status: 500 });
  }
}
