const { createFilePath } = require("gatsby-source-filesystem")

const createFileMdxNode = (node, actions, getNode) => {
  const { createNodeField } = actions
  const value = createFilePath({ node, getNode })
  createNodeField({
    // Name of the field you are adding
    name: "slug",
    // Individual MDX node
    node,
    // Generated value based on filepath with "blog" prefix. you
    // don't need a separating "/" before the value because
    // createFilePath returns a path with the leading "/".
    value: `/blog${value}`,
  })
}

const createFileMdxPages = async (graphql, actions, reporter) => {
  const { createPage } = actions

  const path = require("path")
  const result = await graphql(`
    query {
      allMdx(filter: {}) {
        edges {
          node {
            id
            fields {
              # Slug field created in the last section
              slug
              recordId
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges.filter(
    nd => nd.node && nd.node.fields && !nd.node.fields.recordId
  )

  const slugs = posts
    .map(n => n.node.fields.slug)
    .reduce((accumulator, currentValue) => `${accumulator},${currentValue}`)

  console.log(`found mdx files: ${posts.length}\n[${slugs}]`)

  // you'll call `createPage` for each result
  posts.forEach(({ node }, __index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/layouts/file-mdx-layout.js`),
      // You can use the values in this context in
      // our page layout component
      context: {
        id: node.id,
      },
    })
  })
}

module.exports = { createFileMdxNode, createFileMdxPages }
