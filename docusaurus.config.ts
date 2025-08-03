import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Arthur Wang",
  tagline: "VENI VIDI VICI",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  url: "https://codec.wang",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "microsoft", // Usually your GitHub org/user name.
  projectName: "main-site", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/CodecWang/main-site/tree/master/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/CodecWang/main-site/tree/master/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-VBPVH7N4SN",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Arthur Wang",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "/blog", label: "博客", position: "left" },
        {
          type: "dropdown",
          label: "文档",
          position: "left",
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
          title: "文章",
          items: [
            {
              label: "OpenCV-Python 初学者教程",
              to: "/docs/opencv",
            },
            {
              label: "归档",
              to: "blog/archive",
            },
          ],
        },
        {
          title: "社区",
          items: [
            {
              label: "B站",
              href: "https://space.bilibili.com/23664899/",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/@codecwang/",
            },
          ],
        },
        {
          title: "更多",
          items: [
            { to: "/", label: "关于我" },
            {
              label: "粤ICP备20002165号-1",
              href: "https://beian.miit.gov.cn/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Arthur Wang. Built with Docusaurus.`,
    },
    algolia: {
      appId: "85CRDURY77",
      apiKey: "a7c23daef47c185b7f7c351ac98534a5",
      indexName: "codec",
      contextualSearch: true,
      searchPagePath: "search",
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
