import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout, shortcodes, BlockQuote } from "./layout"

const remark = require('remark');
// const mdx = require('remark-mdx');
// const mdxMetadata = require('remark-mdx-metadata');


export default ({ data, pageContext }) => {
  return (
    <MDXProvider components={(shortcodes, { blockquote: BlockQuote })}>
      <Layout>
        <MDXRenderer hello="world" your="love">{data.mdx.body}</MDXRenderer>
      </Layout>
    <p>{data.mdx.body.toString()}</p>

    {
      remark()
    .use(() => tree => {
      console.log(tree)
    })
    .process(data.mdx.body).toString()
    }
    </MDXProvider>
  )
}

export const pageQuery = graphql`
  query GetOneFileMdx($id: String) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`

// https://www.gatsbyjs.org/docs/gatsby-image/#fluid-images

// query Qq($attachment_urls: [String!]!)    {allFile(filter: { url: { in: $attachment_urls } }) {
//       edges {
//         node {
//           childImageSharp {
//             fixed(base64Width: 10) {
//               base64
//               tracedSVG
//               aspectRatio
//               srcWebp
//               srcSetWebp
//               originalName
//             }
//           }
//         }
//       }
//     }
// }

// {"attachment_urls": ["https://dl.airtable.com/.attachments/b6595c0570600a6a16296229b72d08b1/5abe94cb/Annotation2020-03-01112929.png","https://dl.airtable.com/.attachments/ccadb2b847aabf241975eb868d65918d/426ba78c/Annotation2020-03-01112930.png","https://dl.airtable.com/.attachments/454f8f32d28621a3716319da1c5ba45e/adeca281/Annotation2020-03-01112409.png"]}

// https://www.gatsbyjs.org/docs/mdx/importing-and-using-components/
