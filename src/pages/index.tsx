import type {ReactNode} from 'react';
import {useEffect, useRef} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import AnimatedTerminal from '@site/src/components/AnimatedTerminal';
import styles from './index.module.css';

/* ─── Icons ─────────────────────────────────────────────── */

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/>
      <circle cx="5" cy="19" r="2"/>
      <circle cx="19" cy="19" r="2"/>
      <line x1="12" y1="7" x2="12" y2="12"/>
      <line x1="12" y1="12" x2="5" y2="17"/>
      <line x1="12" y1="12" x2="19" y2="17"/>
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1"/>
      <rect x="13" y="3" width="8" height="8" rx="1"/>
      <rect x="3" y="13" width="8" height="8" rx="1"/>
      <rect x="13" y="13" width="8" height="8" rx="1"/>
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9.8 2 8 3.8 8 6v2h8V6c0-2.2-1.8-4-4-4z"/>
      <path d="M8 8H5a2 2 0 00-2 2v4a2 2 0 002 2h3"/>
      <path d="M12 22c2.2 0 4-1.8 4-4v-2H8v2c0 2.2 1.8 4 4 4z"/>
      <path d="M16 16h3a2 2 0 002-2v-4a2 2 0 00-2-2h-3"/>
      <circle cx="10" cy="6" r="0.7" fill="currentColor" stroke="none"/>
      <circle cx="14" cy="18" r="0.7" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="11" rx="2"/>
      <path d="M8 11V7a4 4 0 018 0v4"/>
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function VirusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="19.07" y1="4.93" x2="16.24" y2="7.76"/>
      <line x1="7.76" y1="16.24" x2="4.93" y2="19.07"/>
    </svg>
  );
}

/* ─── Categories data ────────────────────────────────────── */

type Category = {
  title: string;
  description: string;
  to: string;
  Icon: () => ReactNode;
  color: string;
};

const CATEGORIES: Category[] = [
  {
    title: 'Linux',
    description: 'Administration système, commandes essentielles, scripting bash et configuration serveur.',
    to: '/docs/Linux/',
    Icon: TerminalIcon,
    color: '#f97316',
  },
  {
    title: 'Réseau',
    description: 'Protocoles, configuration réseau, routing, switching et architecture réseau.',
    to: '/docs/reseau/',
    Icon: NetworkIcon,
    color: '#3b82f6',
  },
  {
    title: 'Windows',
    description: 'Administration Windows Server, Active Directory, PowerShell et GPO.',
    to: '/docs/windows/',
    Icon: WindowsIcon,
    color: '#0ea5e9',
  },
  {
    title: 'Python',
    description: 'Scripting, automatisation, développement et bibliothèques Python.',
    to: '/docs/python/',
    Icon: PythonIcon,
    color: '#eab308',
  },
  {
    title: 'Cybersécurité',
    description: 'Pentest, CTF, sécurité offensive et défensive, outils et techniques.',
    to: '/docs/cyber/',
    Icon: ShieldIcon,
    color: '#2e8555',
  },
  {
    title: 'Cryptographie',
    description: 'Chiffrement, protocoles cryptographiques, PKI et implémentations.',
    to: '/docs/crypto/',
    Icon: LockIcon,
    color: '#8b5cf6',
  },
  {
    title: 'Virologie',
    description: 'Analyse de malwares, reverse engineering et techniques antivirales.',
    to: '/docs/viro/',
    Icon: VirusIcon,
    color: '#ef4444',
  },
];

/* ─── Card ───────────────────────────────────────────────── */

function CategoryCard({title, description, to, Icon, color}: Category) {
  return (
    <Link
      to={to}
      className={styles.card}
      style={{'--card-accent': color} as React.CSSProperties}
    >
      <div className={styles.cardIconWrap}>
        <Icon />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
      <span className={styles.cardArrow}>Explorer &rarr;</span>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.6}px))`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.25}px)`;
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / 450));
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" ref={glowRef} />
        <div className={styles.heroContent} ref={contentRef}>
          <div className={styles.heroLogoWrap}>
            <img src="/img/logo.svg" alt="GCYB Logo" className={styles.heroLogo} />
          </div>
          <p className={styles.heroBadge}>Documentation francophone</p>
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.heroAccent}>GCYB</span>&nbsp;Docs
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} to="/docs/Linux/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Commencer
            </Link>
            <Link
              className={styles.btnSecondary}
              to="https://github.com/Oxyrobit/gcyb.doc"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.btnIcon}>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.terminalSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>
                En pratique
              </Heading>
              <p className={styles.sectionDesc}>
                Des commandes réelles, des exemples concrets
              </p>
            </div>
            <AnimatedTerminal />
          </div>
        </section>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>
                Catégories
              </Heading>
              <p className={styles.sectionDesc}>
                Explorez notre documentation organisée par domaine
              </p>
            </div>
            <div className={styles.grid}>
              {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.title} {...cat} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
