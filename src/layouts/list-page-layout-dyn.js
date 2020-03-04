import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout, shortcodes, BlockQuote } from "./layout"

// https://www.gatsbyjs.org/docs/linking-between-pages/


export default ({ data, pageContext }) => (
  <MDXProvider components={{...shortcodes, blockquote: BlockQuote }}>
    <Layout title={pageContext.groupname}>
    {data.allAirtable.edges.map(({ node }, index) => (
      <p><Link to={`/${pageContext.groupname}/${node.data.pagename}`}>{node.data.title}</Link></p>
    ))}
    </Layout>
  </MDXProvider>
)

export const pageQuery = graphql`
  query GetGroupBlogs($groupname: String!) {
    allAirtable(filter: { data: { group: { eq: $groupname } } }) {
      edges {
        node {
          data {
            title
            position
            pagename
          }
        }
      }
    }
  }
`
// https://www.gatsbyjs.org/docs/mdx/importing-and-using-components/
