import React from 'react'
import { graphql } from 'gatsby'
import IndexLayout from '~/components/Pages/Home'
import Transition from '~/components/Transition'

export const pageQuery = graphql`
  query IndexPage {
    homepage: prismicPageHome {
      data {
        body {
          ... on PrismicPageHomeBodyLatestArticles {
            slice_type
            primary {
              title {
                text
              }
              blog_handle {
                text
              }
              read_more_text {
                text
              }
              article_tile_tagline {
                text
              }
            }
          }
          ... on PrismicPageHomeBodyProductSlider {
            slice_type
          }
          ... on PrismicPageHomeBodyFeaturedBrands {
            slice_type
            items {
              page_type
              page_handle {
                text
              }
              logo {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            slice_type
            primary {
              title {
                text
              }
            }
          }
          ... on PrismicPageHomeBodyImageGallery {
            slice_type
            items {
              gallery_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
                Mobile {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 960) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                }
              }
              page_handle {
                text
              }
              page_type
              slide_body {
                html
              }
              title {
                text
              }
              light_mode
            }
          }
          ... on PrismicPageHomeBodyImagesMosaic {
            slice_type
            items {
              page_type
              page_handle {
                text
              }
              image_caption {
                text
              }
              cta_text {
                text
              }
              image {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            primary {
              title {
                text
              }
              caption {
                text
              }
            }
          }
        }
        seo_title {
          text
        }
        seo_keywords {
          text
        }
        seo_description {
          text
        }
      }
    }
    allShopifyArticle(sort: { order: ASC, fields: publishedAt }, limit: 3) {
      nodes {
        url
        title
        tags
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        author {
          name
          lastName
          firstName
        }
        excerptHtml
        blog {
          url
          title
          shopifyId
        }
      }
    }
    shopifyCollection(handle: { regex: "/(featured-homepage-products)+/" }) {
      title
      products {
        title
        handle
        vendor
        tags
        variants {
          id
          title
          price
          availableForSale
          shopifyId
          selectedOptions {
            name
            value
          }
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
        images {
          originalSrc
          id
          localFile {
            childImageSharp {
              fluid(maxHeight: 220) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

const IndexPage = props => (
  <Transition>
    <IndexLayout {...props} />
  </Transition>
)

export default IndexPage
