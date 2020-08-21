const path = require(`path`)
const transformPath = require('./src/utils/functions/transformPath')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     node: {
//       fs: 'empty'
//     }
//   })
// }

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*"
    // Update the page.
    createPage(page)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
            shopifyId
            id
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            handle 
          }
        }
      }
      allPrismicPageGeneric {
        edges {
          node {
            uid
          }
        }
      }
      allShopifyBlog {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result && result.data && result.data.allShopifyBlog.edges && result.data.allShopifyBlog.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.handle}/`,
        component: path.resolve(`./src/templates/BlogPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })

    result && result.data && result.data.allShopifyProduct.edges && result.data.allShopifyProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/product/${node.handle}`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
          id: node.id,
          shopifyId: node.shopifyId
        },
      })
    })

    result && result.data && result.data.allShopifyCollection.edges && result.data.allShopifyCollection.edges.forEach(({ node }) => {
      const formattedPath = transformPath(node.handle)
      createPage({
        path: formattedPath.route,
        component: path.resolve(`./src/templates/CollectionPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
          brandPage: formattedPath.isBrand,
          brand: formattedPath.brandName ? `/${formattedPath.brandName}/` : ''
        },
      })
    })

    result && result.data && result.data.allPrismicPageGeneric.edges && result.data.allPrismicPageGeneric.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.uid}`,
        component: path.resolve(`./src/templates/GenericPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          uid: node.uid,
        },
      })
    })
  })
}
