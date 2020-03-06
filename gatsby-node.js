/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// You can require any js file, you just need to declare what you want to expose.

const winston = require("winston")
const path = require("path")

winston.configure({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.json",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined.json" }),
  ],
})

const logger = winston;

const { createAirtableNode, createAirtablePages } = require("./airtable-node")
const { createFileMdxNode, createFileMdxPages } = require("./file-mdx-node")

exports.onCreateNode = onCreateNodeAllParams => {
  logger.info("onCreateNode allParams")
  const { node, actions, getNode } = onCreateNodeAllParams
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a `File` node here
  if (node.internal.type === "Mdx") {
    const parentNode = getNode(node.parent)
    switch (parentNode.internal.type) {
      case "AirtableField":
        console.log("skipping AirtableField.")
        break
      case "ReplaceContent":
        console.log("get ReplaceContent.")
        createAirtableNode(parentNode, node, actions, getNode)
        break
      case "File":
        console.log("get File.")
        createFileMdxNode(node, actions, getNode)
        break
      default:
        console.log(`unknown type: ${parentNode.internal.type}`)
    }
  }
}

const createIndexPage = async (graphql, actions, reporter) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allAirtable(filter: { data: { toppost: { eq: true } } }) {
        edges {
          node {
            id
            data {
              position
              attachments {
                id
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createIndexPage" query')
  }

  const row = result.data.allAirtable.edges.sort((a, b) => {
    return a.node.data.position > b.node.data.position
  })[0]

  let attachments = []
  let attachment_urls = []

  const attachments_id = row.node.data.attachments.id

  if (attachments_id) {
    let res = await graphql(`
    query {
      airtableField(id: { eq: "${attachments_id}" }) {
        internal {
          content
        }
      }
    }
  `)

    if (res.errors) {
      reporter.panicOnBuild(
        '🚨  ERROR: Loading "createIndexPage airtableField" query'
      )
    }
    console.log(res)
    const attachments = JSON.parse(res.data.airtableField.internal.content)
    const attachment_urls = attachments.map(a => a.url)

    console.log(attachments)
  }

  createPage({
    // This is the slug you created before
    // (or `node.frontmatter.slug`)
    path: "/",
    // This component will wrap our MDX content
    component: path.resolve(`./src/layouts/index.js`),
    // You can use the values in this context in
    // our page layout component
    context: {
      id: row.node.id,
      attachment_urls,
      attachments,
    },
  })
}

exports.createPages = async createPagesAllParams => {
  const { graphql, actions, reporter } = createPagesAllParams
  await createAirtablePages(graphql, actions, reporter)
  await createFileMdxPages(graphql, actions, reporter)
  await createIndexPage(graphql, actions, reporter)
}

exports.sourceNodes = sourceNodeAllParams => {
  logger.info("sourceNodes allParams")
}

/**
 *
 */
exports.onCreatePage = async onCreatePageAllParams => {
  logger.info("onCreatePage allParams")
  // console.log(allParams)
  // const { graphql, page, actions, reporter } = allParams
  // const { createPage, deletePage } = actions
  // // winston.error(page)
  // if (page.path === "/") {
  //   const result = await graphql(`
  //     query {
  //       allAirtable(filter: { data: { toppost: { eq: true } } }, limit: 1) {
  //         edges {
  //           node {
  //             data {
  //               title
  //               position
  //               pagename
  //               layout
  //               group
  //               excerpt
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)
  //   if (result.errors) {
  //     reporter.panicOnBuild('🚨  ERROR: Loading "onCreatePage index" query')
  //   }
  //   console.log(result)
  // }
  // deletePage(page)
  // createPage({
  //   ...page,
  //   context: {
  //     ...page.context,
  //     house: `Gryffindor`,
  //   },
  // })
}
