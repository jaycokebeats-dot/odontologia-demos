import React from 'react';
import { Metadata } from 'next';
import { BLOG_ARTICLES } from '@/data/dentisalud-data';
import { DentiSaludBlogDetailPage } from '@/components/dentisalud/BlogDetailPage';

interface PageProps {
  params: Promise<{
    slug: string;
    articleSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === articleSlug);

  return {
    title: article ? `${article.title} | DentiSalud Group` : 'Artículo | DentiSalud Group',
    description: article?.excerpt,
  };
}

export default async function TenantBlogArticleRoute({ params }: PageProps) {
  const { slug, articleSlug } = await params;
  return <DentiSaludBlogDetailPage slug={articleSlug} basePath={`/d/${slug}`} />;
}
