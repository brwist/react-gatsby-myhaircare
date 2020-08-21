'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.ShopPolicyNode = exports.ProductVariantNode = exports.ProductOptionNode = exports.ProductNode = exports.ProductTypeNode = exports.CommentNode = exports.CollectionNode = exports.BlogNode = exports.ArticleNode = void 0

var _gatsbyNodeHelpers = _interopRequireDefault(require('gatsby-node-helpers'))

var _fp = require('lodash/fp')

var _pIteration = require('p-iteration')

var _gatsbySourceFilesystem = require('gatsby-source-filesystem')

// Node prefix
const TYPE_PREFIX = `Shopify` // Node types

const ARTICLE = `Article`
const BLOG = `Blog`
const COLLECTION = `Collection`
const COMMENT = `Comment`
const PRODUCT = `Product`
const PRODUCT_OPTION = `ProductOption`
const PRODUCT_VARIANT = `ProductVariant`
const SHOP_POLICY = `ShopPolicy`
const PRODUCT_TYPE = `ProductType`
const { createNodeFactory, generateNodeId } = (0, _gatsbyNodeHelpers.default)({
  typePrefix: TYPE_PREFIX,
})

const downloadImageAndCreateFileNode = async (
  { url },
  { createNode, createNodeId, touchNode, store, cache }
) => {
  let fileNodeID
  const mediaDataCacheKey = `${TYPE_PREFIX}__Media__${url}`
  const cacheMediaData = await cache.get(mediaDataCacheKey)

  if (cacheMediaData) {
    fileNodeID = cacheMediaData.fileNodeID
    touchNode({
      nodeId: fileNodeID,
    })
    return fileNodeID
  }

  try {
    const fileNode = await (0, _gatsbySourceFilesystem.createRemoteFileNode)({
      url,
      store,
      cache,
      createNode,
      createNodeId,
    })

    if (fileNode) {
      fileNodeID = fileNode.id
      await cache.set(mediaDataCacheKey, {
        fileNodeID,
      })

      return fileNodeID
    }

    return undefined
  } catch (err) {
    console.error('ERROR ERROR ERROR', err)
  }
}

const ArticleNode = imageArgs =>
  createNodeFactory(ARTICLE, async node => {
    if (node.blog) node.blog___NODE = generateNodeId(BLOG, node.blog.id)
    if (node.comments)
      node.comments___NODE = node.comments.edges.map(edge =>
        generateNodeId(COMMENT, edge.node.id)
      )
    if (node.image) {
      node.image.localFile___NODE = await downloadImageAndCreateFileNode(
        {
          id: node.image.id,
          url: node.image.src,
        },
        imageArgs
      )
      console.log('article', node.image.localFile___NODE)
    }
    return node
  })

exports.ArticleNode = ArticleNode

const BlogNode = _imageArgs => createNodeFactory(BLOG)

exports.BlogNode = BlogNode

const CollectionNode = imageArgs =>
  createNodeFactory(COLLECTION, async node => {
    if (node.products) {
      node.products___NODE = node.products.edges.map(edge =>
        generateNodeId(PRODUCT, edge.node.id)
      )
    }
    if (node.image) {
      node.image.localFile___NODE = await downloadImageAndCreateFileNode(
        {
          id: node.image.id,
          url: node.image.src && node.image.src.split(`?`)[0],
        },
        imageArgs
      )
      console.log('collection', node.image.localFile___NODE)
    }
    return node
  })

exports.CollectionNode = CollectionNode

const CommentNode = _imageArgs => createNodeFactory(COMMENT)

exports.CommentNode = CommentNode

const ProductTypeNode = imageArgs => rawNode =>
  createNodeFactory(PRODUCT_TYPE)({
    id: (0, _fp.camelCase)(rawNode),
    name: rawNode,
  })

exports.ProductTypeNode = ProductTypeNode

const ProductNode = imageArgs =>
  createNodeFactory(PRODUCT, async node => {
    if (node.variants) {
      const variants = node.variants.edges.map(edge => edge.node)
      node.variants___NODE = variants.map(variant =>
        generateNodeId(PRODUCT_VARIANT, variant.id)
      )
    }

    if (node.options)
      node.options___NODE = node.options.map(option =>
        generateNodeId(PRODUCT_OPTION, option.id)
      )
    if (node.images && node.images.edges) {
      node.images = await (0, _pIteration.map)(
        node.images.edges,
        async edge => {
          edge.node.localFile___NODE = await downloadImageAndCreateFileNode(
            {
              id: edge.node.id,
              url: edge.node.originalSrc && edge.node.originalSrc.split(`?`)[0],
            },
            imageArgs
          )
          console.log('product', edge.node.localFile___NODE)
          return edge.node
        }
      )
      console.log('product node.images', node.images)
    }
    return node
  })

exports.ProductNode = ProductNode

const ProductOptionNode = _imageArgs => createNodeFactory(PRODUCT_OPTION)

exports.ProductOptionNode = ProductOptionNode

const ProductVariantNode = imageArgs =>
  createNodeFactory(PRODUCT_VARIANT, async node => {
    if (node.image) {
      node.image.localFile___NODE = await downloadImageAndCreateFileNode(
        {
          id: node.image.id,
          url: node.image.originalSrc && node.image.originalSrc.split(`?`)[0],
        },
        imageArgs
      )
      console.log('product variant', node.image.localFile___NODE)
    }
    return node
  })

exports.ProductVariantNode = ProductVariantNode
const ShopPolicyNode = createNodeFactory(SHOP_POLICY)
exports.ShopPolicyNode = ShopPolicyNode
