// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require("remark-math");
const katex = require("rehype-katex");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Arthur Wang",
  tagline: "",
  url: "https://codec.wang",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/CodecWang/main-site/tree/master/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // blogSidebarCount: 8,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/CodecWang/main-site/tree/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-VBPVH7N4SN",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Arthur's Blog",
        logo: {
          alt: "logo",
          src: "img/logo.svg",
        },
        hideOnScroll: true,
        items: [
          { to: "blog", label: "Posts", position: "right" },
          {
            to: "blog/archive",
            label: "Archive",
            position: "right",
          },
          {
            type: "dropdown",
            label: "Docs",
            position: "right",
            to: "docs/opencv",
            items: [
              {
                to: "docs/opencv",
                label: "OpenCV-Python",
              },
            ],
          },
          {
            href: "https://github.com/CodecWang",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Posts",
                to: "/blog",
              },
              {
                label: "opencv-python-tutorial",
                to: "/docs/opencv",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Bilibili",
                href: "https://space.bilibili.com/23664899/",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@codecwang/",
              },
            ],
          },
          {
            title: "More",
            items: [
              { to: "/", label: "About Me" },
              {
                // autocorrect: false
                label: "粤ICP备20002165号-1",
                href: "https://beian.miit.gov.cn/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CodecWang. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "85CRDURY77",
        // Public API key: it is safe to commit it
        apiKey: "a7c23daef47c185b7f7c351ac98534a5",
        indexName: "codec",
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
      },
    }),
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

module.exports = config;
