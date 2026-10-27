import React from 'react';
import { Metadata } from 'next';
import { BLOG_ARTICLES } from '@/data/dentisalud-data';
import { DentiSaludBlogDetailPage } from '@/components/dentisalud/BlogDetailPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Artículo | DentiSalud Group',
    };
  }

  return {
    title: `${article.title} | Blog DentiSalud Group`,
    description: article.excerpt,
    keywords: [article.keyword, 'DentiSalud Group', 'dentista Belgrano', 'odontología CABA'],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image || '/images/dentisalud/21_consultorio_principal.jpg',
          alt: article.title,
        },
      ],
    },
  };
}

export default async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  return <DentiSaludBlogDetailPage slug={slug} basePath="" />;
}
