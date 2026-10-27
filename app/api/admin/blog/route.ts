import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogArticle } from '@/data/dentisalud-data';

const dataFilePath = path.join(process.cwd(), 'data', 'dentisalud-blog.json');

function getArticlesFromFile(): BlogArticle[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading dentisalud-blog.json:', err);
  }
  return [];
}

function saveArticlesToFile(articles: BlogArticle[]): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing dentisalud-blog.json:', err);
    return false;
  }
}

// In-memory runtime cache for serverless environments
let memoryArticles: BlogArticle[] | null = null;

function getArticles(): BlogArticle[] {
  if (!memoryArticles) {
    memoryArticles = getArticlesFromFile();
  }
  return memoryArticles;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const articles = getArticles();

  if (slug) {
    const found = articles.find((a) => a.slug === slug);
    if (!found) {
      return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json(found);
  }

  return NextResponse.json(articles, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if body is a full list replacement (e.g. restore backup)
    if (Array.isArray(body)) {
      memoryArticles = body;
      saveArticlesToFile(body);
      return NextResponse.json({ success: true, count: body.length });
    }

    const { title, category, excerpt, content, image, keyword, slug: customSlug } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }

    const cleanSlug = (customSlug || title)
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const articles = [...getArticles()];
    const existingIndex = articles.findIndex((a) => a.slug === cleanSlug);

    const now = new Date();
    const dateStr = now.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newArticle: BlogArticle = {
      slug: cleanSlug,
      title: title.trim(),
      category: category?.trim() || 'General',
      keyword: keyword?.trim() || title.trim(),
      excerpt: excerpt?.trim() || title.trim(),
      content: content?.trim() || '',
      image: image || '/images/dentisalud/21_consultorio_principal.jpg',
      date: dateStr,
      author: 'DentiSalud Group',
    };

    if (existingIndex >= 0) {
      articles[existingIndex] = { ...articles[existingIndex], ...newArticle };
    } else {
      articles.unshift(newArticle);
    }

    memoryArticles = articles;
    saveArticlesToFile(articles);

    return NextResponse.json({ success: true, article: newArticle, articles });
  } catch (err: any) {
    console.error('Error in POST /api/admin/blog:', err);
    return NextResponse.json({ error: err.message || 'Error al guardar el artículo' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'El slug del artículo es obligatorio' }, { status: 400 });
    }

    const articles = [...getArticles()];
    const index = articles.findIndex((a) => a.slug === slug);

    if (index === -1) {
      return NextResponse.json({ error: 'Artículo no encontrado para editar' }, { status: 404 });
    }

    articles[index] = {
      ...articles[index],
      ...body,
      slug: articles[index].slug, // preserve primary slug
    };

    memoryArticles = articles;
    saveArticlesToFile(articles);

    return NextResponse.json({ success: true, article: articles[index], articles });
  } catch (err: any) {
    console.error('Error in PUT /api/admin/blog:', err);
    return NextResponse.json({ error: err.message || 'Error al actualizar el artículo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug no proporcionado' }, { status: 400 });
    }

    let articles = [...getArticles()];
    const initialLen = articles.length;
    articles = articles.filter((a) => a.slug !== slug);

    if (articles.length === initialLen) {
      return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 });
    }

    memoryArticles = articles;
    saveArticlesToFile(articles);

    return NextResponse.json({ success: true, message: 'Artículo eliminado correctamente', articles });
  } catch (err: any) {
    console.error('Error in DELETE /api/admin/blog:', err);
    return NextResponse.json({ error: err.message || 'Error al eliminar el artículo' }, { status: 500 });
  }
}
