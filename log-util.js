const logger = require("winston")

const logPosts = (posts) => {
    const slugs = posts
    .map(n => n.node.fields.slug)
    .reduce((accumulator, currentValue) => `${accumulator},${currentValue}`)
    logger.info(`found mdx files: ${posts.length}\n[${slugs}]`)
}

module.exports = {logPosts}