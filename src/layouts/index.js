import React, { useState, useEffect } from "react"
import { Layout, shortcodes, BlockQuote } from "./layout"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({ data, pageContext }) => {
  const rowData = data.mdx.parent.parent.parent.data
  const imageNodes = data.allFile.edges
  return (
    <MDXProvider components={{ ...shortcodes, blockquote: BlockQuote }}>
      <Layout title={rowData.title}>
        <MDXRenderer
          attachments={pageContext.attachments}
          imageNodes={imageNodes}
        >
          {data.mdx.body}
        </MDXRenderer>
      </Layout>
    </MDXProvider>
  )
}

export const query = graphql`
  query GetLatestBlog($id: String!, $attachment_urls: [String]!) {
    mdx(parent: { parent: { parent: { id: { eq: $id } } } }) {
      parent {
        parent {
          parent {
            ... on Airtable {
              id
              table
              recordId
              data {
                title
                excerpt
              }
            }
          }
        }
      }
      body
      fields {
        slug
        recordId
        position
        layout
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
