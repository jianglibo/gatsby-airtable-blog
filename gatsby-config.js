require("dotenv").config({
  path: `.env`,
})
const logger = require("winston")

const replaceRegex = /<AirtableImg\s+(.*?)\/>/g

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-replace-content`,
      options: {
        needReplace: node => {
          logger.info(`${node.internal.type}-${node.internal.mediaType}`)
          return (
            node.internal.type === "AirtableField" &&
            node.internal.mediaType === "text/markdown"
          )
        },
        replaceFunc: (content, __node) => {
          let new_content = content
          new_content = new_content.replace(
            replaceRegex,
            "<AirtableImg $1 attachments={props.attachments} imageNodes={props.imageNodes}/>"
          )
          let markdown_source = content.replace(
            /(.*?)((\r?\n)|(\r\n?))/g,
            "    $1$2"
          )
          return `${new_content}
---
mdx source of this page:
---
\`\`\`jsx{numberLines: true}
${markdown_source}
\`\`\`
`
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mds`,
        path: `${__dirname}/src/mds`,
      },
    },
    "gatsby-transformer-javascript-frontmatter",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        //not prefaced with "GATSBY_", will not automatically be included client-side unless you explicitly expose it
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: "gatsby",
            tableView: "groupview",
            mapping: { content: `text/markdown`, attachments: `fileNode` },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`),
          require(`autoprefixer`),
          require(`cssnano`),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        printRejected: true,
        purgeOnly: [`src/css/style.css`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          // posts: require.resolve("./src/components/posts-layout.js"),
          default: require.resolve("./src/layouts/default-page-layout-dyn.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            classPrefix: "language-",
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: false,
            noInlineHighlight: false,
            escapeEntities: {},
          },
        ],
        // remarkPlugins: [require("remark-math"), require("rehype-katex")],
        extensions: [`.mdx`, `.md`],
      },
    },
  ],
}

// https://www.gatsbyjs.org/docs/mdx/plugins/
