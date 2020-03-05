const logger = require("winston")
const _ = require(`lodash`)

// {
//     "node": {
//       "internal": {
//         "type": "AirtableField",
//         "mediaType": "text/markdown",
//         "content": "```js\nconst a = 10\n```",
//         "owner": "gatsby-source-airtable",
//         "contentDigest": "1280dced35ea15e9998f36538b8f2f5c"
//       }
//     }
//   },

async function onCreateNode(
  { node, actions, getNode, createNodeId, createContentDigest },
  pluginOptions
) {
  // only log for nodes of mediaType `text/yaml`
  // if (node.internal.mediaType !== `text/yaml`) {
  //   return
  // }
  // const content = await loadNodeContent(node)
  // const parsedContent = jsYaml.load(content)
  const { createNode } = actions

  if (pluginOptions.needReplace(node)) {
    if (typeof pluginOptions.replaceFunc === "function") {
      const content = pluginOptions.replaceFunc(node.internal.content, node)
      const replaced = {
        id: createNodeId(`ReplaceContent_${node.id}`),
        children: [],
        parent: node.id,
        internal: {
          type: "ReplaceContent",
          mediaType: node.internal.mediaType,
          content,
          contentDigest: createContentDigest(content),
        },
      }
      createNode(replaced)
    }
  }
}

exports.onCreateNode = onCreateNode
