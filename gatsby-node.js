/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// You can require any js file, you just need to declare what you want to expose.
const {createAirtableNode, createAirtablePages} = require("./airtable-node")
const {createFileMdxNode, createFileMdxPages} = require("./file-mdx-node")


exports.onCreateNode = ({ node, actions, getNode }) => {
  // printImageSharp(node, actions, getNode)
  // printAirtable(node, actions, getNode)

  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const airtableField = getNode(node.parent)
    if (airtableField.internal.type === "AirtableField") {
      createAirtableNode(airtableField, node, actions, getNode)
    } else {
      createFileMdxNode(node, actions, getNode)
    }
  }
}


exports.createPages = async ({ graphql, actions, reporter }) => {
  await createAirtablePages(graphql, actions, reporter)
  await createFileMdxPages(graphql, actions, reporter)
}
