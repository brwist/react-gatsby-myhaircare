import { pipe } from 'lodash/fp'
import chalk from 'chalk'
import { forEach } from 'p-iteration'
import { createClient, printGraphQLError, queryAll, queryOnce } from './lib'
import {
  ArticleNode,
  BlogNode,
  CollectionNode,
  CommentNode,
  ProductNode,
  ProductOptionNode,
  ProductVariantNode,
  ShopPolicyNode,
  ProductTypeNode,
} from './nodes'
import {
  ARTICLES_QUERY,
  BLOGS_QUERY,
  COLLECTIONS_QUERY,
  PRODUCTS_QUERY,
  SHOP_POLICIES_QUERY,
  PRODUCT_TYPES_QUERY,
} from './queries'

export const sourceNodes = async (
  { actions: { createNode, touchNode }, createNodeId, store, cache },
  { shopName, accessToken, verbose = true }
) => {
  const client = createClient(shopName, accessToken)

  // Convenience function to namespace console messages.
  const formatMsg = msg =>
    chalk`\n{blue gatsby-source-shopify/${shopName}} ${msg}`

  try {
    console.log(formatMsg(`starting to fetch data from Shopify`))

    // Arguments used for file node creation.
    const imageArgs = { createNode, createNodeId, touchNode, store, cache }

    // Arguments used for node creation.
    const args = {
      client,
      createNode,
      createNodeId,
      formatMsg,
      verbose,
      imageArgs,
    }
    const msg = formatMsg(`finished fetching data from Shopify`)
    await createNodes(
      `products`,
      _queries.PRODUCTS_QUERY,
      _nodes.ProductNode,
      args,
      async x => {
        if (x.variants)
          await (0, _pIteration.forEach)(x.variants.edges, async edge =>
            createNode(
              await (0, _nodes.ProductVariantNode)(imageArgs)(edge.node)
            )
          )
        if (x.options)
          await (0, _pIteration.forEach)(x.options, async option =>
            createNode(await (0, _nodes.ProductOptionNode)(imageArgs)(option))
          )
      }
    )
    console.time(msg)
    await Promise.all([
      createNodes(
        `articles`,
        _queries.ARTICLES_QUERY,
        _nodes.ArticleNode,
        args,
        async x => {
          if (x.comments)
            await (0, _pIteration.forEach)(x.comments.edges, async edge =>
              createNode(await (0, _nodes.CommentNode)(imageArgs)(edge.node))
            )
        }
      ),
      createNodes(`blogs`, _queries.BLOGS_QUERY, _nodes.BlogNode, args),
      createNodes(
        `collections`,
        _queries.COLLECTIONS_QUERY,
        _nodes.CollectionNode,
        args
      ),
      createNodes(
        `productTypes`,
        _queries.PRODUCT_TYPES_QUERY,
        _nodes.ProductTypeNode,
        args
      ),
      createShopPolicies(args),
    ])
    console.timeEnd(msg)
  } catch (e) {
    console.error(
      _chalk.default`\n{red error} an error occured while sourcing data`
    ) // If not a GraphQL request error, let Gatsby print the error.

    if (!e.hasOwnProperty(`request`)) throw e
    ;(0, _lib.printGraphQLError)(e)
  }
}

/**
 * Fetch and create nodes for the provided endpoint, query, and node factory.
 */
const createNodes = async (
  endpoint,
  query,
  nodeFactory,
  { client, createNode, formatMsg, verbose, imageArgs },
  f = async () => {}
) => {
  // Message printed when fetching is complete.
  const msg = formatMsg(`fetched and processed ${endpoint}`)

  if (verbose) console.time(msg)
  await forEach(
    await queryAll(client, [`shop`, endpoint], query),
    async entity => {
      const node = await nodeFactory(imageArgs)(entity)
      createNode(node)
      await f(entity)
    }
  )
  if (verbose) console.timeEnd(msg)
}

/**
 * Fetch and create nodes for shop policies.
 */
const createShopPolicies = async ({
  client,
  createNode,
  formatMsg,
  verbose,
}) => {
  // Message printed when fetching is complete.
  const msg = formatMsg(`fetched and processed policies`)

  if (verbose) console.time(msg)
  const { shop: policies } = await queryOnce(client, SHOP_POLICIES_QUERY)
  Object.entries(policies)
    .filter(([_, policy]) => Boolean(policy))
    .forEach(
      pipe(([type, policy]) => ShopPolicyNode(policy, { type }), createNode)
    )
  if (verbose) console.timeEnd(msg)
}
