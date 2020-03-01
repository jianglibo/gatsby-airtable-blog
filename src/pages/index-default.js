import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../layouts/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Button from '@material-ui/core/Button';


// handleSubmit(event){ 
//   event.preventDefault();
//   fetch('/', {
//      method: 'post',
//      headers: {'Content-Type':'application/json'},
//      body: JSON.stringify({
//           "first_name": this.state.firstName
//      })
//   });
// };

const IndexPage = () => {
    // Client-side Runtime Data Fetching
    const [starsCount, setStarsCount] = useState(0)
    useEffect(() => {
      // get data from GitHub api
      fetch(`https://api.github.com/repos/gatsbyjs/gatsby`, {method: 'get'})
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          setStarsCount(resultData.stargazers_count)
        }) // set data for the number of stars
    }, [])

  return (<Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <p>
  <Button variant="contained" color="primary">
    Hello World
  </Button>
  </p>
  </Layout>)
  }



export default IndexPage
