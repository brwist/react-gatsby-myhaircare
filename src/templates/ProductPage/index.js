import React, { useState } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
  ProductVendor,
  ProductTitle,
  ProductContainer,
  TwoColumnGrid,
  GridLeft,
  GridRight,
  ProductPageContainer,
} from '~/components/Templates/Product/styles'
import ProductImagesSlider from '~/components/ProductImagesSlider'
import Newsletter from '~/components/Newsletter'
import ProductRecommended from '~/components/ProductRecommended'
import { Desktop, Tablet } from '~/components/Utilities/Media'
import ProductDescription from '~/components/ProductDescription'
import Footer from '~/components/Footer'
import Transition from '~/components/Transition'
import StarRating from '~/components/StarRating'
import ProductReviewWidget from '~/components/ProductReviewWidget'

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      vendor
      tags
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        compareAtPrice
        weight
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxHeight: 480) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
      metafields {
        edges {
          node {
            key
            namespace
            value
          }
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
        altText
        localFile {
          childImageSharp {
            fluid(maxHeight: 480) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    prismicPageProduct {
      data {
        add_to_cart_button_text {
          text
        }
        out_of_stock_text {
          text
        }
        shipment_banner_text {
          text
        }
        gifts {
          activate_gift
          gift_title {
            text
          }
          gift_body {
            text
          }
          gift_product {
            image {
              src
            }
            handle
            title
            id
            variants {
              id
              inventory_quantity
            }
          }
          gift_for {
            handle
          }
          product_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 108) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
        bulletpoints_title {
          text
        }
        product_description_title {
          text
        }
        read_more_text {
          text
        }
        recommended_product_title {
          text
        }
        colors {
          color_name {
            text
          }
          color_hex_code {
            text
          }
        }
      }
    }
  }
`

export default function ProductPage({ data }) {
  const product = { ...data.shopifyProduct, ...data?.prismicPageProduct?.data }
  const bulletpointNode = product.metafields.edges.find(
    metafield => metafield.node.key === 'bulletpoints'
  )
  const bulletpoints = bulletpointNode?.node.value.split('::')

  const {
    variants: [initialVariant],
  } = product

  const [variant, setVariant] = useState({ ...initialVariant })

  const productInfoHeader = (
    <>
      {product.vendor ? (
        <ProductVendor as="h5" type="smallText700">
          {product.vendor}
        </ProductVendor>
      ) : (
        ''
      )}
      <ProductTitle as="h1" type="heading5">
        {product.title}
      </ProductTitle>
      <StarRating handle={product.handle} />
    </>
  )

  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Transition>
        <>
          <ProductPageContainer>
            <ProductContainer>
              <TwoColumnGrid>
                <GridLeft>
                  <Tablet>{productInfoHeader}</Tablet>
                  <ProductImagesSlider
                    variant={variant}
                    product={product}
                    images={product.images}
                  />
                </GridLeft>
                <GridRight>
                  <Desktop>{productInfoHeader}</Desktop>
                  <ProductForm
                    variant={variant}
                    setVariant={setVariant}
                    product={product}
                  />
                </GridRight>
              </TwoColumnGrid>
              <ProductDescription
                product={product}
                variant={variant}
                query={{
                  bulletpoints,
                }}
              />
              <ProductReviewWidget product={product} handle={product.handle} />
              <ProductRecommended
                query={product}
                shopifyId={product?.shopifyId}
              />
            </ProductContainer>
          </ProductPageContainer>
          <Newsletter type="secondary" />
        </>
      </Transition>
      <Footer />
    </>
  )
}

ProductPage.propTypes = {
  data: PropTypes.object.isRequired,
}
