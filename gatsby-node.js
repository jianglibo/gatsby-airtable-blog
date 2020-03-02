/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const { createFilePath } = require("gatsby-source-filesystem")
const fs = require("fs")

// query MyQuery {
//   allAirtable(filter: {table: {eq: "mdx"}, recordId: {eq: "reciaKCNqMRjzjr3F"}}) {
//     nodes {
//       data {
//         title
//         excerpt
//         content {
//           internal {
//             content
//           }
//         }
//       }
//       recordId
//     }
//   }
// }

// {
//   id: '086e6e79-c40e-546e-94b2-515892e156af',
//   parent: 'd0b89af1-ba94-5ac6-b25e-6d386f58a17c',
//   children: [ '974ec95f-0273-50bb-9b90-a4216f4d6e9d' ],
//   raw: '> hello quoto.',
//   internal: {
//     type: 'AirtableField',
//     mediaType: 'text/markdown',
//     content: '> hello quoto.',
//     contentDigest: 'cd823dfeab6196c11d33a0b741d3811f',
//     counter: 65,
//     owner: 'gatsby-source-airtable'
//   }
// }
// {
//   id: 'd0b89af1-ba94-5ac6-b25e-6d386f58a17c',
//   parent: null,
//   table: 'mdx',
//   recordId: 'reciaKCNqMRjzjr3F',
//   queryName: undefined,
//   children: [],
//   internal: {
//     type: 'Airtable',
//     contentDigest: 'cd823dfeab6196c11d33a0b741d3811f',
//     counter: 64,
//     owner: 'gatsby-source-airtable'
//   },
//   data: {
//     title: 'from airtable',
//     excerpt: 'can I create blog on airtable.',
//     content___NODE: '086e6e79-c40e-546e-94b2-515892e156af'
//   }
// }

const printImageSharp = (node, actions, getNode) => {
  if (node.internal.type === "ImageSharp") {
    console.log("------------------------")
    console.log(node)
    if (node.parent) {
      const parent = getNode(node.parent)
      console.log("------------------------")
      console.log(parent)
      if (parent.parent) {
        const pp = getNode(parent.parent)
        console.log("------------------------")
        console.log(pp)
      }
    }
  }
}

const printAirtable = (node, actions, getNode) => {
  if (node.internal.type === "Airtable") {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(node)
    console.log(node.data.attachments___NODE)
    if (node.data.attachments___NODE) {
      const an = getNode(node.data.attachments___NODE)
      console.log("***")
      console.log(an)
    }
    if (node.parent) {
      const parent = getNode(node.parent)
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(parent)
      if (parent.parent) {
        const pp = getNode(parent.parent)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(pp)
      }
    }
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // printImageSharp(node, actions, getNode)
  // printAirtable(node, actions, getNode)

  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const airtableField = getNode(node.parent)

    if (airtableField.internal.type !== "AirtableField") {
      return
    }

    const airtableRow = getNode(airtableField.parent)

    if (!["gatsby"].includes(airtableRow.table)) {
      return
    }

    const value = airtableRow.data.pagename
    // console.log(airtableRow.data)

    const attachments = airtableRow.data.attachments___NODE ? getNode(airtableRow.data.attachments___NODE).raw : []

    // console.log(attachments)
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
}

const path = require("path")

// const graphqlTracer = async (graphql, actions, reporter) => {
//   const result = await graphql(`
//     query {
//       allImageSharp {
//         edges {
//           node {
//             id
//             parent {
//               id
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
//   }

//   const images = result.data.allImageSharp.edges

//   images.forEach(({ node }, index) => {
//     const parent = getNode
//     console.log(node)
//   })
// }

exports.createPages = async ({ graphql, actions, reporter }) => {
  // graphqlTracer(graphql, actions, reporter)

  // Destructure the createPage function from the actions object
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              layout
              recordId
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
  const posts = result.data.allMdx.edges

  // you'll call `createPage` for each result
  posts.forEach(({ node }, __index) => {
    if (!(node.fields && node.fields.slug)) {
      return
    }
    let comp = path.resolve(`./src/layouts/${node.fields.layout}`)

    comp =
      node.fields.layout && fs.existsSync(comp)
        ? comp
        : path.resolve(`./src/layouts/default-page-layout-dyn.js`)

    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: comp,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })

  const groups = result.data.allAirtable.distinct
  console.log(`groups: ${groups}`)

  groups.forEach((groupname, __index) => {
    console.log(`groupname: ${groupname}`)
    createPage({
      path: `/${groupname}`,
      component: path.resolve(`./src/layouts/list-page-layout-dyn.js`),
      context: { groupname: groupname },
    })
  })
  
}
