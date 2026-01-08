import Link from 'next/link';
import styles from './PocCard.module.css';

export type PocStatus = 'Live' | 'Demo' | 'Demo on request';

export interface PocCardProps {
  title: string;
  description: string;
  href?: string;
  isExternal?: boolean;
  status: PocStatus;
  imageUrl?: string;
}

const statusStyleMap: Record<PocStatus, string> = {
  Live: styles.badgeLive,
  Demo: styles.badgeDemo,
  'Demo on request': styles.badgeRequest,
};

export const PocCard = ({
  title,
  description,
  href,
  isExternal = false,
  status,
  imageUrl,
}: PocCardProps) => {
  const isClickable = Boolean(href);

  const CardContent = (
    <div className={`${styles.card} ${!isClickable ? styles.cardDisabled : ''}`}>
      <div className={styles.mediaZone}>
        {imageUrl ? (
          <img src={imageUrl} alt="" className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderLabel}>Preview</span>
          </div>
        )}
        <span className={`${styles.badge} ${statusStyleMap[status]}`}>
          {status}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );

  if (!href) return CardContent;

  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {CardContent}
    </a>
  ) : (
    <Link href={href} className={styles.link}>
      {CardContent}
    </Link>
  );
};
