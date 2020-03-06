import Img from "gatsby-image"

export default props => {
    let normalizedProps = props
    let alginStyle = {}
    if (props.align === "center") {
      alginStyle = {margin: "0 auto",}
    }

    if (props.fluid && props.fluid.presentationWidth) {
      normalizedProps = {
        ...props,
        style: {
          ...(props.style || {}),
          maxWidth: props.fluid.presentationWidth,
          // margin: "0 auto", // Used to center the image
          ...alginStyle,
        },
      }
    }
  
    return <Img {...normalizedProps} />
  }