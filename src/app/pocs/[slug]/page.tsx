import { notFound } from 'next/navigation';
import { pocs } from '@/data/pocs';
import { PocDetailClient } from './PocDetailClient';

// Generate static params for all POC slugs (required for static export)
export function generateStaticParams() {
  return pocs.map((poc) => ({
    slug: poc.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PocDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const poc = pocs.find((p) => p.slug === slug);

  if (!poc) {
    notFound();
  }

  return <PocDetailClient poc={poc} />;
}
