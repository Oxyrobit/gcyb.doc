import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'GCYB Docs',
  tagline: 'Documentation et tutoriels pour GCYB',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://doc.3141592653.fr/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Oxyrobit Corporation', // Usually your GitHub org/user name.
  projectName: 'GCYB Docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  plugins: [['drawio', {}]],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Oxyrobit/gcyb.doc/tree/dev/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Oxyrobit/gcyb.doc/tree/dev/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'GCYB Docs',
      logo: {
        alt: 'GCYB Docs Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Admin Sys & Réseau',
          position: 'left',
          items: [
              {
                type: 'docSidebar',
                sidebarId: 'linux',
                label: 'Linux',
              },
              {
                type: 'docSidebar',
                sidebarId: 'reseau',
                label: 'Réseau',
              },
              {
                type: 'docSidebar',
                sidebarId: 'windows',
                label: 'Windows',
              },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'python',
          label: 'Python',
        },
        {
          type: 'docSidebar',
          sidebarId: 'crypto',
          label: 'Python',
        },
        {
          href: 'https://github.com/Oxyrobit/gcyb.doc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Linux',
          items: [
            {
              label: 'Linux',
              to: '/docs/Linux/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://www.youtube.com/watch?v=DLzxrzFCyOs&list=RDDLzxrzFCyOs&start_radio=1',
            },
            {
              label: 'Discord',
              href: 'https://www.youtube.com/watch?v=DLzxrzFCyOs&list=RDDLzxrzFCyOs&start_radio=1',
            },
            {
              label: 'X',
              href: 'https://www.youtube.com/watch?v=DLzxrzFCyOs&list=RDDLzxrzFCyOs&start_radio=1',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Oxyrobit/gcyb.doc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
