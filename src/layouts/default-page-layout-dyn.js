import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout, shortcodes, BlockQuote } from "./layout";

export default ({ data }) => {
  const row_data = data.mdx.parent.parent.data;
  const image_nodes = data.allFile.edges;
  return (
    <MDXProvider components={(shortcodes, { blockquote: BlockQuote })}>
      <Layout title={row_data.title} backlinkto={`/${row_data.group}`}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABFElEQVQY03VQy46DMAzM//9Nr9x66Km9bqsNTQIEKO9HVRBQYNbOSqte1pJjyTMeTyyyLMPX9QopJfYd2LYN8zS5ulODk0N0XYfz+YzT6YTL5YJxHB3wSdq2FcJai8PhgOPxCM/z0Pc93u83PmNdFojn8+lArsMwgDfUdY2FwHme/4ZEUeTQWsNoAxMYRFGEMAhd9X0fZVn+EquygFYKislBgIBIIVW2xAI5fZa9iooULU3HDBJgFadCliQoqwp1QzbIgmiaBjZOUD0eKEiljGOXLa1s2xY1kafXizxmDyjpO4/aGGfBV3d3V5/66ltioruKnJTk7YY7GddaISLVlHoprY5pU5qm7ueCHz4Dn2NdV/wXPwBOnEMLezz6AAAAAElFTkSuQmCC" />
      </Layout>
    </MDXProvider>
  );
};

export const pageQuery = graphql`
  query GetOneBlog($id: String, $attachment_urls: [String]) {
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
    allFile(filter: { url: { in: $attachment_urls } }) {
      edges {
        node {
          childImageSharp {
            fixed(base64Width: 10) {
              base64
              tracedSVG
              aspectRatio
              srcWebp
              srcSetWebp
              originalName
            }
          }
        }
      }
    }
  }
`;

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
