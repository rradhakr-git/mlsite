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
  emailSubject: string;
}> = {
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
