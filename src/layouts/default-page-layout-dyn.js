import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout, shortcodes, BlockQuote } from "./layout";

export default ({ data }) => (
  <MDXProvider components={(shortcodes, { blockquote: BlockQuote })}>
    <Layout title={data.mdx.parent.parent.data.title}>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  </MDXProvider>
);

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
              layout
              excerpt
            }
          }
        }
      }
    }
  }
`;
// https://www.gatsbyjs.org/docs/mdx/importing-and-using-components/
