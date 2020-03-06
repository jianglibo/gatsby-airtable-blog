const fs = require("fs")
const path = require("path")


const createAirtableNode = (replaceContent, node, actions, getNode) => {
  const { createNodeField } = actions
  const airtableField = getNode(replaceContent.parent)
  const airtableRow = getNode(airtableField.parent)
  console.log(`airtableRow: ${airtableRow.table}`)
  if (!["gatsby"].includes(airtableRow.table)) {
    return
  }

  const value = airtableRow.data.pagename

  const attachments = airtableRow.data.attachments___NODE
    ? getNode(airtableRow.data.attachments___NODE).raw
    : []

  createNodeField({
    // Name of the field you are adding
    name: "slug",
    // Individual MDX node
    node,
    // Generated value based on filepath with "blog" prefix. you
    // don't need a separating "/" before the value because
    // createFilePath returns a path with the leading "/".
    value: `/${airtableRow.table}/${value}`,
  })
  createNodeField({
    name: "recordId",
    node,
    value: airtableRow.recordId,
  })
  createNodeField({
    name: "layout",
    node,
    value: airtableRow.data.layout,
  })
  createNodeField({
    name: "position",
    node,
    value: airtableRow.data.position,
  })
  createNodeField({
    name: "attachments",
    node,
    value: attachments,
  })
}

const createAirtablePages = async (graphql, actions, reporter) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              attachments {
                filename
                id
                size
                type
                url
              }
              layout
              position
              recordId
              slug
            }
          }
        }
      }
      allAirtable {
        distinct(field: data___group)
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges.filter(n => {
    return n.node.fields && n.node.fields.recordId && n.node.fields.slug
  })

  const slugs = posts
    .map(n => n.node.fields.slug)
    .reduce((accumulator, currentValue) => `${accumulator},${currentValue}`)

  console.log(`found airtable rows: ${posts.length}\n[${slugs}]`)

  // you'll call `createPage` for each result
  posts.forEach(({ node }, __index) => {
    let comp = path.resolve(`./src/layouts/${node.fields.layout}`)

    comp =
      node.fields.layout && fs.existsSync(comp)
        ? comp
        : path.resolve(`./src/layouts/default-page-layout-dyn.js`)

    const attachment_urls = node.fields.attachments
      ? node.fields.attachments.map(a => {
          return a.url
        })
      : []

    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: comp,
      // You can use the values in this context in
      // our page layout component
      context: {
        id: node.id,
        attachment_urls: attachment_urls,
        attachments: node.fields.attachments,
      },
    })
  })

  const groups = result.data.allAirtable.distinct

  groups.forEach((groupname, __index) => {
    createPage({
      path: `/${groupname}`,
      component: path.resolve(`./src/layouts/list-page-layout-dyn.js`),
      context: { groupname: groupname },
    })
  })
}

module.exports = { createAirtableNode, createAirtablePages }
