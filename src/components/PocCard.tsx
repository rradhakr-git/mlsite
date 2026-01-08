import Link from 'next/link';
import { pocs } from '@/data/pocs';

type Poc = (typeof pocs)[number];

// POCs that have dedicated detail pages (even if Demo on request)
const pocsWithDetailPages = [
  'multimodal-pdf-table-extraction',
  'medical-plan-selection-advisor',
];

function getPocHref(poc: Poc): string | undefined {
  if (poc.links?.demo) {
    return poc.links.demo;
  }
  // POCs with detail pages should route there, not to contact
  if (pocsWithDetailPages.includes(poc.slug)) {
    return `/pocs/${poc.slug}`;
  }
  if (poc.status === 'Demo on request') {
    return '/#contact';
  }
  return `/pocs/${poc.slug}`;
}

function isExternalLink(href: string | undefined): boolean {
  return href?.startsWith('http') ?? false;
}

// Status badge styling
const statusStyles = {
  Live: 'bg-green-100 text-green-700',
  Demo: 'bg-yellow-100 text-yellow-700',
  'Demo on request': 'bg-slate-100 text-slate-500',
};

interface PocCardProps {
  poc: Poc;
  size?: 'normal' | 'large';
}

export function PocCard({ poc, size = 'normal' }: PocCardProps) {
  const href = getPocHref(poc);
  const isExternal = isExternalLink(href);
  const hasLiveDemo = poc.status === 'Live' && poc.links?.demo;
  const hasGithub = poc.links?.github;

  const titleClass = size === 'large' ? 'font-bold text-xl mb-2' : 'font-bold text-lg mb-2';

  const cardContent = (
    <div className="poc-card bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl cursor-pointer h-full">
      <div className="aspect-video overflow-hidden bg-slate-100 flex items-center justify-center relative">
        {poc.imageUrl ? (
          <img src={poc.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-300 text-sm uppercase tracking-wider">Preview</span>
        )}
        <div className="absolute bottom-3 right-3">
          <span className={`text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-md bg-white/95 backdrop-blur-sm border border-slate-200 ${statusStyles[poc.status]}`}>
            {poc.status}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className={titleClass}>{poc.title}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-1">{poc.summary}</p>
        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{poc.category}</span>
          {hasLiveDemo ? (
            <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Launch demo →</span>
          ) : (
            <span className="text-slate-300">→</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative group h-full">
      {/* GitHub link - positioned absolutely outside the main link */}
      {hasGithub && (
        <a
          href={poc.links!.github}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 p-2 bg-white/90 rounded-lg border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-slate-50 z-20"
          aria-label="View source on GitHub"
        >
          <svg
            className="w-4 h-4 text-slate-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      )}

      {/* Main card link */}
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      ) : (
        <Link href={href || '#'} className="block h-full">
          {cardContent}
        </Link>
      )}
    </div>
  );
}
