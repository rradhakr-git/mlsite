import Link from 'next/link';
import { pocs } from '@/data/pocs';
import { PocCard } from '@/components/PocCard';

// Only show featured POCs on homepage
const featuredPocs = pocs.filter((poc) => poc.featured);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 max-w-6xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-4">
          From Prediction to <br />
          <span className="text-blue-600">Decision.</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium">
          Applied Machine Learning Systems &amp; Architectures
        </p>
      </section>

      {/* Philosophy / Intro Section */}
      <section id="philosophy" className="py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-200 pt-12">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">
              Introduction
            </h2>
            <p className="text-xl text-slate-800 leading-relaxed">
              This site presents a set of applied machine learning proof-of-concepts
              focused on how models are <strong>designed, composed, and embedded into real systems</strong>.
            </p>
          </div>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              The projects progress from <strong>domain-specific intent classification</strong>, through{' '}
              <strong>multimodal document understanding and agent-based orchestration</strong>, to{' '}
              <strong>decision support systems</strong> that translate model outputs into actionable
              recommendations under uncertainty.
            </p>
            <p>
              Each POC is built end-to-end, with attention to data assumptions,
              model behavior, system boundaries, cost and privacy constraints, and operational trade-offs. The
              emphasis is not on isolated techniques, but on how ML components work together to produce reliable,
              practical outcomes. New projects are added as the system patterns evolve.
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work - Featured POC only */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Selected Work</h2>
            <p className="text-slate-500 mt-2">
              Proof of Concepts &amp; Technical Prototypes
            </p>
          </div>
          <Link
            href="/pocs"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all POCs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPocs.map((poc) => (
            <PocCard key={poc.slug} poc={poc} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-24 max-w-6xl mx-auto px-6 border-t border-slate-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Get in touch
            </h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Interested in a demo, have questions about a POC, or want to discuss
              potential collaboration? Reach out directly.
            </p>
          </div>
          <div className="flex flex-col justify-center items-start md:items-end">
            <a
              href="mailto:research@mlinnovationlab.com"
              className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              research@mlinnovationlab.com
            </a>
            <span className="text-slate-400 text-sm mt-2">
              Typically respond within 24-48 hours
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
