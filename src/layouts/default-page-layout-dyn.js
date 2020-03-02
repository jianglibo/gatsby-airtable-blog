import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout, shortcodes, BlockQuote } from "./layout"

export default ({ data }) => {
  const row_data = data.mdx.parent.parent.data
  return (
    <MDXProvider components={(shortcodes, { blockquote: BlockQuote })}>
      <Layout title={row_data.title} backlinkto={`/${row_data.group}`}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  )
}

export const pageQuery = graphql`
  query GetOneBlog($id: String) {
    mdx(id: { eq: $id }) {
      body
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
`
// https://www.gatsbyjs.org/docs/mdx/importing-and-using-components/
