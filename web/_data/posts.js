const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const imageUrl = require('../utils/imageUrl')
const overlayDrafts = require('../utils/overlayDrafts')


const hasToken = !!client.config().token

function generatePost (post) {
  let url = imageUrl(post.mainImage).width(1500).height(500).format('jpg').url();
  let headerImage = imageUrl(post.mainImage).width(1500).height(500).format('jpg').url();
  
  console.log(url)
  return {
    ...post,
    imageUrl: url,
    headerImage: headerImage,
    imageAlt: post.mainImage.alt,
    body: BlocksToMarkdown(post.body, { serializers, ...client.config() })
    
  }
}

async function getPosts () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "post" && defined(slug) && publishedAt < now()]`
  const projection = groq`{
    _id,
    publishedAt,
    title,
    mainImage,
    slug,
    body[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "authorReference" => {
          // check /studio/documents/authors.js for more fields
          "name": @.author->name,
          "slug": @.author->slug
        }
      }
    },
    "authors": authors[].author->
  }`
  const order = `| order(publishedAt asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const preparePosts = reducedDocs.map(generatePost)
  return preparePosts
}

module.exports = getPosts
