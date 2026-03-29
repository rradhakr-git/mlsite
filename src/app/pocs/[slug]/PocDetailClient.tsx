'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Poc } from '@/data/pocs';
import styles from './page.module.css';

// Screenshot configurations for each POC with detailed pages
const pocScreenshots: Record<string, Array<{ src: string; alt: string; caption: string; constrained?: boolean }>> = {
  'multimodal-pdf-table-extraction': [
    {
      src: '/images/placeholders/TableExtractTop.png',
      alt: 'File upload and configuration panel',
      caption: 'Top panel — File upload & batch configuration',
    },
    {
      src: '/images/placeholders/TableextractMiddle.png',
      alt: 'Processing logs and preview panel',
      caption: 'Middle panel — Processing logs & extraction preview',
    },
    {
      src: '/images/placeholders/TableExtractBottom.png',
      alt: 'Download and export panel',
      caption: 'Bottom panel — JSON/JSONL download & export',
    },
  ],
  'nppes-mcp-server': [
    {
      src: '/images/placeholders/nppes_mcp_architecture.svg',
      alt: 'NPPES MCP Server architecture diagram',
      caption: 'System Architecture — MCP tools, FAISS semantic layer, and NPPES API integration',
    },
  ],
  'medical-plan-selection-advisor': [
    {
      src: '/images/placeholders/decisionsupport1.png',
      alt: 'Subscriber profile configuration panel',
      caption: 'Left panel — Subscriber profile & household configuration',
      constrained: true,
    },
    {
      src: '/images/placeholders/decisionsupport2.png',
      alt: 'Utilization scenario input panel',
      caption: 'Right panel — Healthcare utilization "what-if" scenarios',
      constrained: true,
    },
    {
      src: '/images/placeholders/decisionsupport3.png',
      alt: 'Recommendation output panel',
      caption: 'Middle-top — Ranked plan recommendations with cost projections',
    },
    {
      src: '/images/placeholders/decisionsupport4.png',
      alt: 'Cost calculation breakdown tables',
      caption: 'Middle-bottom — Detailed cost calculation tables',
    },
  ],
};

// POC-specific content
const pocContent: Record<string, {
  overview: React.ReactNode;
  features: Array<React.ReactNode>;
  emailSubject?: string;
  githubUrl?: string;
}> = {
  'nppes-mcp-server': {
    overview: (
      <>
        The NPPES NPI Registry is public but designed for human navigation — not
        programmatic access. This MCP server wraps it in a structured,
        agent-callable API, exposing six tools that let AI assistants search
        providers by name or location, validate NPIs, and resolve plain-language
        specialties to NUCC taxonomy codes via a local FAISS-backed RAG pipeline.
      </>
    ),
    features: [
      'Semantic provider search — query "cardiologist in Boston" without knowing taxonomy codes; FAISS + sentence-transformers resolve the intent',
      'NUCC taxonomy resolution — maps natural-language specialties to standard codes via vector similarity search',
      'NPI lookup & validation with Mod 97-10 checksum algorithm',
      'Redis / Upstash caching (1-hour TTL) reduces NPPES API load for repeated queries',
      'Six MCP tools — clean separation between tool execution and LLM reasoning; no client-side prompt engineering required',
      '~85% test coverage — 119 tests spanning unit, integration, contract, and E2E suites',
      <>Apache 2.0 open source — forkable for other public healthcare registries</>,
    ],
    githubUrl: 'https://github.com/rradhakr-git/nppes-mcp-server',
  },
  'multimodal-pdf-table-extraction': {
    overview: (
      <>
        This POC implements a multimodal PDF table extraction pipeline. PDFs are
        rendered as images, tables and text are extracted via vision-language
        models, and batches are routed to different LLMs based on complexity.
        Output is JSON/JSONL for downstream ML pipelines.{' '}
        <strong>
          Live execution is restricted because the system is under patent review.
        </strong>
      </>
    ),
    features: [
      'Intelligent batch routing for efficiency — automatically selects optimal LLM based on page count and complexity',
      'Handles complex tables, nested headers, and mixed text with high extraction accuracy',
      'Outputs structured JSON/JSONL ready for downstream ML pipelines and data integration',
      <><strong>Patent pending / IP-sensitive implementation</strong> — core routing algorithms under intellectual property review</>,
    ],
    emailSubject: 'Demo%20Request%3A%20Multimodal%20PDF%20Table%20Extraction',
  },
  'medical-plan-selection-advisor': {
    overview: (
      <>
        This proof-of-concept implements a decision support system that evaluates
        medical plan options using predictive cost modeling and user-defined risk
        preferences.{' '}
        <strong>
          Live execution is restricted due to IP-sensitive calculation logic.
        </strong>
      </>
    ),
    features: [
      'Models healthcare cost behavior instead of static comparison — deductible consumption, out-of-pocket accumulation, and risk-weighted scoring',
      'Supports scenario-based sensitivity analysis for different utilization patterns',
      'Separates fixed premiums from variable exposure to surface true cost risk',
      'Designed for benefit selection and decision support use cases',
      <><strong>Execution restricted</strong> — IP-sensitive scoring and calculation logic</>,
    ],
    emailSubject: 'Demo%20Request%3A%20Medical%20Plan%20Selection%20Advisor',
  },
};

// POCs that have detailed pages
const detailedPocSlugs = Object.keys(pocScreenshots);

interface PocDetailClientProps {
  poc: Poc;
}

export function PocDetailClient({ poc }: PocDetailClientProps) {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  // Handle keyboard events for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && lightboxImage) {
      setLightboxImage(null);
    }
  }, [lightboxImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage]);

  const hasDetailedPage = detailedPocSlugs.includes(poc.slug);
  const screenshots = pocScreenshots[poc.slug] || [];
  const content = pocContent[poc.slug];

  // For POCs without detailed pages, show placeholder
  if (!hasDetailedPage) {
    return (
      <div className={styles.container}>
        <Link href="/pocs" className={styles.backLink}>
          ← Back to POCs
        </Link>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{poc.title}</h1>
            <span className={styles.badge}>{poc.status}</span>
          </div>
          <span className={styles.category}>{poc.category}</span>
        </div>
        <p className={styles.overview}>{poc.summary}</p>
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Detailed documentation coming soon.
          </p>
          <a
            href="mailto:research@mlinnovationlab.com?subject=POC%20Inquiry" 
            className={styles.ctaButton}
          >
            Contact for more info
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back navigation */}
      <Link href="/pocs" className={styles.backLink}>
        ← Back to POCs
      </Link>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{poc.title}</h1>
          <span className={styles.badge}>{poc.status}</span>
        </div>
        <span className={styles.category}>{poc.category}</span>
      </header>

      {/* Overview */}
      <p className={styles.overview}>{content.overview}</p>

      {/* System Overview for NPPES MCP Server */}
      {poc.slug === 'nppes-mcp-server' && (
        <section className={styles.systemOverview}>
          <h2 className={styles.sectionTitle}>System Overview</h2>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Inputs</h3>
              <ul className={styles.overviewList}>
                <li>Provider name, location, specialty terms</li>
                <li>{"Natural-language conditions (\"heart doctor\")"}</li>
                <li>NPI numbers for lookup or validation</li>
              </ul>
            </div>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Core Processing</h3>
              <ul className={styles.overviewList}>
                <li>FAISS vector index for semantic similarity</li>
                <li>Async NPPES REST API client (httpx)</li>
                <li>Redis / Upstash cache layer (1-hr TTL)</li>
              </ul>
            </div>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>MCP Tools</h3>
              <ul className={styles.overviewList}>
                <li>search_providers</li>
                <li>get_provider_by_npi</li>
                <li>validate_npi / get_npi_for_provider</li>
                <li>resolve_taxonomy</li>
                <li>semantic_search</li>
              </ul>
            </div>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Compatible Clients</h3>
              <ul className={styles.overviewList}>
                <li>Claude Desktop</li>
                <li>Cursor &amp; Windsurf</li>
                <li>Any JSON-RPC 2.0 MCP client</li>
                <li>FastAPI /mcp endpoint</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* System Overview for Medical Plan Advisor */}
      {poc.slug === 'medical-plan-selection-advisor' && (
        <section className={styles.systemOverview}>
          <h2 className={styles.sectionTitle}>System Overview</h2>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Inputs</h3>
              <ul className={styles.overviewList}>
                <li>Household size and composition</li>
                <li>Income tier for subsidy calculations</li>
                <li>Risk tolerance preference</li>
                <li>Expected utilization (office visits, prescriptions, hospitalizations)</li>
              </ul>
            </div>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Plan Data</h3>
              <ul className={styles.overviewList}>
                <li>Monthly premiums and employer contributions</li>
                <li>Deductibles (individual and family)</li>
                <li>Coinsurance percentages</li>
                <li>Copays and HSA contribution options</li>
              </ul>
            </div>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Core Logic</h3>
              <ul className={styles.overviewList}>
                <li>Deductible consumption modeling</li>
                <li>Out-of-pocket accumulation tracking</li>
                <li>Risk-weighted scoring algorithm</li>
              </ul>
            </div>
            <div className={styles.overviewBlock}>
              <h3 className={styles.overviewBlockTitle}>Output</h3>
              <ul className={styles.overviewList}>
                <li>Ranked plan recommendations</li>
                <li>Projected annual costs by scenario</li>
                <li>Risk exposure breakdown</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots */}
      <section className={styles.screenshotsSection}>
        <h2 className={styles.sectionTitle}>
          {poc.slug === 'medical-plan-selection-advisor'
            ? 'Workflow Walkthrough'
            : poc.slug === 'nppes-mcp-server'
            ? 'Architecture'
            : 'System Screenshots'}
        </h2>
        <div className={styles.screenshotStack}>
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.screenshotItem} ${screenshot.constrained ? styles.screenshotItemConstrained : ''}`}
              onClick={() => setLightboxImage(screenshot)}
              aria-label={`View ${screenshot.caption} in full size`}
            >
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className={`${styles.screenshotImage} ${screenshot.constrained ? styles.screenshotImageConstrained : ''}`}
              />
              <span className={styles.screenshotCaption}>
                {screenshot.caption}
              </span>
              <span className={styles.expandHint} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Key Capabilities</h2>
        <ul className={styles.featuresList}>
          {content.features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        {content.githubUrl ? (
          <>
            <p className={styles.ctaText}>
              Open source and ready to use — explore the full implementation on GitHub.
            </p>
            <a
              href={content.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              View on GitHub
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </>
        ) : (
          <>
            <p className={styles.ctaText}>
              Interested in a private demonstration of this system?
            </p>
            <a
              href={`mailto:research@mlinnovationlab.com?subject=${content.emailSubject}`}
              className={styles.ctaButton}
            >
              Request full demo
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </>
        )}
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightboxImage(null)}
              aria-label="Close preview"
            >
              ✕ Close
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className={styles.lightboxImage}
            />
            <p className={styles.lightboxCaption}>{lightboxImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
