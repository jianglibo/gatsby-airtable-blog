var mdx = require('@mdx-js/mdx')
const content = `
# Hello, world!
`
const transpile = async () => {
  const jsx = await mdx(content)
  return jsx
}
transpile().then(console.log)