"use strict";

exports.__esModule = true;
exports.PRODUCT_TYPES_QUERY = exports.SHOP_POLICIES_QUERY = exports.PRODUCTS_QUERY = exports.COLLECTIONS_QUERY = exports.BLOGS_QUERY = exports.ARTICLES_QUERY = void 0;
const ARTICLES_QUERY = `
  query GetArticles($first: Int!, $after: String) {
    shop {
      articles(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            handle
            author {
              bio
              email
              firstName
              lastName
              name
            }
            blog {
              id
            }
            comments(first: 250) {
              edges {
                node {
                  author {
                    email
                    name
                  }
                  content
                  contentHtml
                  id
                }
              }
            }
            content
            contentHtml
            excerpt
            excerptHtml
            id
            image {
              altText
              id
              src
            }
            publishedAt
            tags
            title
            url
          }
        }
      }
    }
  }
`;
exports.ARTICLES_QUERY = ARTICLES_QUERY;
const BLOGS_QUERY = `
  query GetBlogs($first: Int!, $after: String) {
    shop {
      blogs(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            url
            handle
          }
        }
      }
    }
  }
`;
exports.BLOGS_QUERY = BLOGS_QUERY;
const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!, $after: String) {
    shop {
      collections(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            description
            descriptionHtml
            handle
            id
            image {
              altText
              id
              src
            }
            products(first: 250) {
              edges {
                node {
                  id
                }
              }
            }
            title
            updatedAt
          }
        }
      }
    }
  }
`;
exports.COLLECTIONS_QUERY = COLLECTIONS_QUERY;
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    shop {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            availableForSale
            createdAt
            description
            descriptionHtml
            handle
            id
            collections(first: 250) {
              edges {
                node {
                  handle
                }
              }
            }
            images(first: 250) {
              edges {
                node {
                  id
                  altText
                  originalSrc
                }
              }
            }
            metafields(first: 250) {
              edges {
                node {
                  key
                  namespace
                  value
                }
              }
            }
            onlineStoreUrl
            options {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            productType
            publishedAt
            tags
            title
            updatedAt
            variants(first: 250) {
              edges {
                node {
                  availableForSale
                  compareAtPrice
                  id
                  image {
                    altText
                    id
                    originalSrc
                  }
                  price
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  title
                  weight
                  weightUnit
                }
              }
            }
            vendor
          }
        }
      }
    }
  }
`;
exports.PRODUCTS_QUERY = PRODUCTS_QUERY;
const SHOP_POLICIES_QUERY = `
  query GetPolicies {
    shop {
      privacyPolicy {
        body
        id
        title
        url
      }
      refundPolicy {
        body
        id
        title
        url
      }
      termsOfService {
        body
        id
        title
        url
      }
    }
  }
`;
exports.SHOP_POLICIES_QUERY = SHOP_POLICIES_QUERY;
const PRODUCT_TYPES_QUERY = `
  query GetProductTypes($first: Int!) {
    shop {
      productTypes(first: $first) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node
        }
      }
    }
  }
`;
exports.PRODUCT_TYPES_QUERY = PRODUCT_TYPES_QUERY;