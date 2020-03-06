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
import AirtableImg from "../components/airtable-img"

import "./layout.css"

const Ppy6 = () => (
  <p className="py-6">
    👋 Welcome fellow{" "}
    <a
      className="text-purple-500 no-underline hover:underline"
      href="https://www.tailwindcss.com"
    >
      Tailwind CSS
    </a>{" "}
    fan. This starter template provides a starting point to create your own
    helpdesk / faq / knowledgebase articles using Tailwind CSS and vanilla
    Javascript.
  </p>
)

const shortcodes = { Link, Ppy6, AirtableImg }

// https://www.gatsbyjs.org/docs/mdx/customizing-components/
const BlockQuote = ({ children }) => (
  <blockquote className="border-l-4 border-purple-500 italic my-8 pl-8 md:pl-12">
    {children}
  </blockquote>
)

const Layout = ({ children, title, backlinkto }) => {
  return (
    <div>
      <Header />
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <Menu />
        <div className="w-full lg:w-4/5 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
          <div className="font-sans">
            {backlinkto && (
              <>
                <span className="text-base text-purple-500 font-bold">
                  &laquo;
                </span>
                <Link
                  to={backlinkto}
                  className="text-base md:text-sm text-purple-500 font-bold no-underline hover:underline"
                >
                  Back To List
                </Link>
              </>
            )}
            <h1 className="font-sans break-normal text-gray-900 pt-6 pb-2 text-xl">
              {title}
            </h1>
            <hr className="border-b border-gray-400" />
          </div>
          <main>{children}</main>
          {/*
          <Usefull />
          */}
        </div>
        <BackLink />
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Layout, Ppy6, BlockQuote, shortcodes }
