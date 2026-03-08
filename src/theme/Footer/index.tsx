import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const LINKS = [
  {
    title: 'Admin Sys & Réseau',
    items: [
      {label: 'Linux', to: '/docs/Linux/'},
      {label: 'Réseau', to: '/docs/reseau/'},
      {label: 'Windows', to: '/docs/windows/'},
    ],
  },
  {
    title: 'Sécurité',
    items: [
      {label: 'Cybersécurité', to: '/docs/cyber/'},
      {label: 'Cryptographie', to: '/docs/crypto/'},
      {label: 'Virologie', to: '/docs/viro/'},
    ],
  },
  {
    title: 'Développement',
    items: [
      {label: 'Python', to: '/docs/python/'},
    ],
  },
  {
    title: 'Projet',
    items: [
      {label: 'GitHub', href: 'https://github.com/Oxyrobit/gcyb.doc'},
      {label: 'Contribuer', href: 'https://github.com/Oxyrobit/gcyb.doc/blob/dev/CONTRIBUTING.md'},
    ],
  },
];

function FooterLink({label, to, href}: {label: string; to?: string; href?: string}) {
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>{label}</a>;
  }
  return <Link to={to!} className={styles.link}>{label}</Link>;
}

export default function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      {/* Top border accent */}
      <div className={styles.topBar} />

      <div className={styles.inner}>
        {/* Brand col */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <img src="/img/logo.svg" alt="GCYB" className={styles.logo} />
            <span className={styles.brandName}>
              <span className={styles.brandAccent}>GCYB</span> Docs
            </span>
          </div>
          <p className={styles.brandDesc}>
            Documentation francophone en cybersécurité, administration système et développement.
          </p>
          <a
            href="https://github.com/Oxyrobit/gcyb.doc"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.githubIcon}>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Oxyrobit/gcyb.doc
          </a>
        </div>

        {/* Links cols */}
        <div className={styles.links}>
          {LINKS.map((col) => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.colList}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink {...item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} Oxyrobit Corporation &mdash; Built with Docusaurus
        </span>
        <span className={styles.badge}>Open Source</span>
      </div>
    </footer>
  );
}
