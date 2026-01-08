import Link from 'next/link';
import { pocs } from '@/data/pocs';
import { PocCard } from '@/components/PocCard';

// Split POCs by editorial importance
const featuredPocs = pocs.filter((poc) => poc.featured);
const standardPocs = pocs.filter((poc) => !poc.featured);

export default function PocsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-8 max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
          Proof of Concepts
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Selected projects demonstrating applied AI systems, from model training
          to decision support.
        </p>
      </section>

      {/* Featured POC */}
      {featuredPocs.length > 0 && (
        <section className="py-8 max-w-6xl mx-auto px-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-6">
            Featured
          </h2>
          <div className="max-w-2xl">
            {featuredPocs.map((poc) => (
              <PocCard key={poc.slug} poc={poc} size="large" />
            ))}
          </div>
        </section>
      )}

      {/* Standard Grid */}
      {standardPocs.length > 0 && (
        <section className="py-12 max-w-6xl mx-auto px-6">
          {featuredPocs.length > 0 && (
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              More Projects
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardPocs.map((poc) => (
              <PocCard key={poc.slug} poc={poc} />
            ))}
          </div>
        </section>
      )}

      {/* Back to home */}
      <section className="py-8 max-w-6xl mx-auto px-6 border-t border-slate-200">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
        >
          ← Back to home
        </Link>
      </section>
    </>
  );
}
