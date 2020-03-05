import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout, shortcodes, BlockQuote } from "./layout"

export default ({ data, pageContext }) => {
  const rowData = data.mdx.parent.parent.parent.data
  const imageNodes = data.allFile.edges
  return (
    <MDXProvider components={{...shortcodes, blockquote: BlockQuote}}>
      <Layout title={rowData.title} backlinkto={`/${rowData.group}`}>
        <MDXRenderer attachments={pageContext.attachments} imageNodes={imageNodes}>{data.mdx.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  )
}

export const pageQuery = graphql`
  query GetOneBlog($id: String!, $attachment_urls: [String]!) {
    mdx(id: { eq: $id }) {
      body
      parent {
        parent {
          parent {
          ... on Airtable {
            id
            data {
              title
              position
              pagename
              group
              layout
              excerpt
            }
          }
          }
        }
      }
    }
    allFile(filter: { url: { in: $attachment_urls } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
          url
        }
      }
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
