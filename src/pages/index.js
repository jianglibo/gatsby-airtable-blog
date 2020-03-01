import React, { useState, useEffect } from 'react';
import Layout from "../layouts/default-page-layout-dyn"
import { graphql } from 'gatsby'

const IndexPage = () => (<Layout>
   <h1>Hi people</h1>
   <p>Welcome to your new Gatsby site.</p>
   <p>Now go build something great.</p>
 </Layout>)


export const query = graphql`
query GetLatestBlog {
  allMdx(filter: {parent: {internal: {type: {eq: "AirtableField"}}}}, sort: {fields: fields___position, order: DESC}, limit: 1) {
    edges {
      node {
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
 

export default IndexPage
