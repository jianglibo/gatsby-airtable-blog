/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// You can require any js file, you just need to declare what you want to expose.

const winston = require("winston")

const logger = winston.configure({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
})

const { createAirtableNode, createAirtablePages } = require("./airtable-node")
const { createFileMdxNode, createFileMdxPages } = require("./file-mdx-node")

exports.onCreateNode = ({ node, actions, getNode }) => {
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createAirtablePages(graphql, actions, reporter)
  await createFileMdxPages(graphql, actions, reporter)
}
