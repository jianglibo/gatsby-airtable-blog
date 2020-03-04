import NonStretchedImg  from "./non-stretched-img"


/**
 * attachments:
 * {
 *   id: 'attc3fVjZ3qBXEmbf',
 *   url: 'https://dl.airtable.com/.attachments/b6595c0570600a6a16296229b72d08b1/5abe94cb/Annotation2020-03-01112929.png',
 *   filename: '1.png',
 *   size: 49544,
 *   type: 'image/png',
 *   thumbnails: { small: [Object], large: [Object], full: [Object] }
 * },
 * imageNodes:
 * [node {
 *   childImageSharp {
 *     fluid(maxWidth: 800) {
 *       ...GatsbyImageSharpFluid
 *       presentationWidth
 *     }
 *   }
 *   url
 * },]
 * First find the attachment that match the filename then use attachment's url value to find the imageNode. If found nothing return p tag describe the error.
 */

export default props => {
    const {attachments, imageNodes, filename, ...normalizedProps} = props
    
    const attachment = attachments.find(a => a.filename === filename)

    if (!attachment) {
      return <p>Can't find {filename} in the attachments</p>
    }

    const imageNode = imageNodes.find(nd => nd.node.url === attachment.url)
    
    if (!imageNode) {
      return <p>Can't find {attachment.url} in the imageNodes</p>
    }

    const newProps = {
      ...normalizedProps,
      ...imageNode.node.childImageSharp
    }
    return <NonStretchedImg {...newProps} />
}


 