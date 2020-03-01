/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer"
import BackLink from "../components/back-link"
import Usefull from "../components/usefull"
import Menu from "../components/menu"
import { MDXProvider } from "@mdx-js/react"

import { MDXRenderer } from "gatsby-plugin-mdx"

import "./layout.css"

const Ppy6 = () => <p className="py-6">
👋 Welcome fellow <a className="text-purple-500 no-underline hover:underline" href="https://www.tailwindcss.com">Tailwind CSS</a> fan.  This starter template provides a starting point to create your own helpdesk / faq / knowledgebase articles using Tailwind CSS and vanilla Javascript.
</p>


const shortcodes = { Link, Ppy6 }

// https://www.gatsbyjs.org/docs/mdx/customizing-components/
const BlockQuote = ({children}) => <blockquote className="border-l-4 border-purple-500 italic my-8 pl-8 md:pl-12">{children}</blockquote>

const Layout = ({ children }) => {
//   const data = useStaticQuery(graphql`
//     query SiteTitleQueryDefault {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)
  
   return (
      <div>
         <Header />
         <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
            <Menu />
            <div className="w-full lg:w-4/5 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
               <div className="font-sans">
                  <span className="text-base text-purple-500 font-bold">&laquo;</span> <a href="#" className="text-base md:text-sm text-purple-500 font-bold no-underline hover:underline">Back Link</a>
                  <h1 className="font-sans break-normal text-gray-900 pt-6 pb-2 text-xl">Help page title</h1>
                  <hr className="border-b border-gray-400" />
               </div>
              <main>{children}</main>
               <Usefull />
            </div>
            <BackLink />
         </div>
         <Footer />
      </div>
   )

  // return (
  //   <>
  //     <Header siteTitle={data.site.siteMetadata.title} />
  //     <div
  //       style={{
  //         margin: `0 auto`,
  //         maxWidth: 960,
  //         padding: `0 1.0875rem 1.45rem`,
  //       }}
  //     >
  //       <main>{children}</main>
  //       <footer>
  //         © {new Date().getFullYear()}, Built with
  //         {` `}
  //         <a href="https://www.gatsbyjs.org">Gatsby</a>
  //       </footer>
  //     </div>
  //   </>
  // )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ({ data: { mdx } }) => (
   <MDXProvider components={shortcodes, {blockquote: BlockQuote}}><Layout><MDXRenderer>{mdx.body}</MDXRenderer></Layout></MDXProvider>
 )

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`

// https://www.gatsbyjs.org/docs/mdx/importing-and-using-components/

{/* <p className="py-6">
👋 Welcome fellow <a className="text-purple-500 no-underline hover:underline" href="https://www.tailwindcss.com">Tailwind CSS</a> fan.  This starter template provides a starting point to create your own helpdesk / faq / knowledgebase articles using Tailwind CSS and vanilla Javascript.
</p>
<p className="py-6">The basic help article layout is available and all using the default Tailwind CSS classes (although there are a few hardcoded style tags). If you are going to use this in your project, you will want to convert the classes into components.</p>
<h1 className="py-2 font-sans">Heading 1</h1>
<h2 className="py-2 font-sans">Heading 2</h2>
<h3 className="py-2 font-sans">Heading 3</h3>
<h4 className="py-2 font-sans">Heading 4</h4>
<h5 className="py-2 font-sans">Heading 5</h5>
<h6 className="py-2 font-sans">Heading 6</h6>
<p className="py-6">Sed dignissim lectus ut tincidunt vulputate. Fusce tincidunt lacus purus, in mattis tortor sollicitudin pretium. Phasellus at diam posuere, scelerisque nisl sit amet, tincidunt urna. Cras nisi diam, pulvinar ut molestie eget, eleifend ac magna. Sed at lorem condimentum, dignissim lorem eu, blandit massa. Phasellus eleifend turpis vel erat bibendum scelerisque. Maecenas id risus dictum, rhoncus odio vitae, maximus purus. Etiam efficitur dolor in dolor molestie ornare. Aenean pulvinar diam nec neque tincidunt, vitae molestie quam fermentum. Donec ac pretium diam. Suspendisse sed odio risus. Nunc nec luctus nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec nulla eget sem dictum elementum.</p>
<ol>
<li className="py-3">Maecenas accumsan lacus sit amet elementum porta. Aliquam eu libero lectus. Fusce vehicula dictum mi. In non dolor at sem ullamcorper venenatis ut sed dui. Ut ut est quam. Suspendisse quam quam, commodo sit amet placerat in, interdum a ipsum. Morbi sit amet tellus scelerisque tortor semper posuere.</li>
<li className="py-3">Morbi varius posuere blandit. Praesent gravida bibendum neque eget commodo. Duis auctor ornare mauris, eu accumsan odio viverra in. Proin sagittis maximus pharetra. Nullam lorem mauris, faucibus ut odio tempus, ultrices aliquet ex. Nam id quam eget ipsum luctus hendrerit. Ut eros magna, eleifend ac ornare vulputate, pretium nec felis.</li>
<li className="py-3">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc vitae pretium elit. Cras leo mauris, tristique in risus ac, tristique rutrum velit. Mauris accumsan tempor felis vitae gravida. Cras egestas convallis malesuada. Etiam ac ante id tortor vulputate pretium. Maecenas vel sapien suscipit, elementum odio et, consequat tellus.</li>
</ol>
<blockquote className="border-l-4 border-purple-500 italic my-8 pl-8 md:pl-12">Example of blockquote - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.</blockquote>
<p className="py-6">Example code block:</p>
<pre className="bg-gray-900 rounded text-white font-mono text-base p-2 md:p-4">
<code className="break-words whitespace-pre-wrap">
   &lt;header className="site-header outer"&gt;
   &lt;div className="inner"&gt;
{`{{> "site-nav"}}`}
   &lt;/div&gt;
   &lt;/header&gt;
</code>
</pre> */}
