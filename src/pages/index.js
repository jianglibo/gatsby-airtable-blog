import React, { useState, useEffect } from "react"
import { Layout, shortcodes, BlockQuote } from "../layouts/layout"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import AirtableImg from "../components/airtable-img"

export default ({ data }) => {
  const nd = data.allMdx.edges[0].node
  return (
    <MDXProvider components={{ ...shortcodes, blockquote: BlockQuote }}>
      <Layout title={nd.parent.parent.parent.data.title}>
        <MDXRenderer>{nd.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  )
}

export const query = graphql`
  query GetLatestBlog {
    allMdx(
      filter: { parent: { internal: { type: { eq: "ReplaceContent" } } } }
      sort: { fields: fields___position, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          parent {
            parent {
              parent {
                id
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
            layout
            position
          }
        }
      }
    }
  }
`
