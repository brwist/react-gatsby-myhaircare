import React, { useState, useEffect } from 'react'
import SEO from '~/components/seo'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Banner from '~/components/Banner'
import {
  CollectionContainer,
  Sidebar,
  Main,
  MainHeader,
  CollectionGrid,
  CollectionProductTile,
  ProductCount,
  EmptyContainer,
} from '~/components/Templates/Collection/styles'
import { Container } from '~/utils/styles'
import CollectionBanner from '~/components/Collection/Banner'
import Pagination from '~/components/Collection/Pagination'
import Filters from '~/components/Collection/Filters'
import Sort from '~/components/Collection/Sort'
import PromoTile from '~/components/Collection/PromoTile'
import { Tablet, Desktop } from '~/components/Utilities/Media'
import Newsletter from '~/components/Newsletter'
import { filterCollection } from '~/utils/functions/filterCollection'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Text from '~/components/Utilities/Text'
import Footer from '~/components/Footer'
import Transition from '~/components/Transition'
import Fade from 'react-reveal/Fade'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

export const query = graphql`
  query($handle: String!, $brand: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      description
      title
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      products {
        id
        createdAt
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
        collections {
          edges {
            node {
              handle
            }
          }
        }
        variants {
          id
          title
          price
          availableForSale
          shopifyId
          compareAtPrice
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
          altText
          localFile {
            childImageSharp {
              fluid(maxHeight: 240) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
    allShopifyCollection(filter: { handle: { regex: $brand } }) {
      edges {
        node {
          handle
          title
        }
      }
    }
    prismicPageCollection {
      data {
        products_found_text {
          text
        }
        collection_image_fallback {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        sorts {
          sort_title {
            text
          }
          sort_value {
            text
          }
          reverse_listing
        }
        filter_by_text {
          text
        }
        pagination_text {
          text
        }
        number_of_products
        promotions {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 210) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          shopify_collection_handle {
            text
          }
          promotion_body {
            html
          }
          promotion_code_caption {
            html
          }
        }
        body {
          ... on PrismicPageCollectionBodyFilterBySubBrand {
            slice_type
            items {
              label {
                text
              }
            }
          }
          ... on PrismicPageCollectionBodyFilterByBrand {
            slice_type
            items {
              label {
                text
              }
            }
          }
          ... on PrismicPageCollectionBodyFilterByTag {
            slice_type
            items {
              tag_logic {
                text
              }
              label {
                text
              }
            }
          }
          ... on PrismicPageCollectionBodyFilterByPrice {
            slice_type
            items {
              label {
                text
              }
            }
          }
        }
      }
    }
  }
`

const Collection = ({
  pageContext,
  location,
  data: {
    shopifyCollection: { description, title, image, products: initialProducts },
    allShopifyCollection,
    prismicPageCollection: {
      data: {
        products_found_text,
        collection_image_fallback,
        sorts,
        filter_by_text,
        pagination_text,
        promotions,
        number_of_products,
        body,
      },
    },
  },
}) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))
  const [isExpanded, setisExpanded] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState()
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState(
    initialProducts?.filter(
      product =>
        !product.tags.includes('Discontinued') &&
        product.variants[0].availableForSale
    )
  )
  const promotion = promotions?.find(
    promotion =>
      promotion.shopify_collection_handle?.text === pageContext.handle
  )

  useEffect(() => {
    if (selectedFilters) {
      const updatedProducts = filterCollection(selectedFilters, initialProducts)
      setProducts(
        updatedProducts.filter(
          product =>
            !product.tags.includes('Discontinued') &&
            product.variants[0].availableForSale
        )
      )
    }
  }, [selectedFilters])

  //
  // COMPONENT RENDERING
  //

  return (
    <Transition>
      <>
        <Container className="CollectionContainer">
          <SEO title={title} description={description} />
          <Banner
            query={{
              title: title,
              body: description,
              image: image?.localFile
                ? image?.localFile?.childImageSharp?.fluid
                : collection_image_fallback?.localFile?.childImageSharp?.fluid,
            }}
          />
          <CollectionBanner
            products={products}
            pageContext={pageContext}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <div id={`${page}`} style={{ transform: 'translateY(-90px)' }} />
          <CollectionContainer>
            <Desktop>
              <Sidebar>
                <Filters
                  query={filter_by_text ? filter_by_text.text : 'Filter By'}
                  setProducts={setProducts}
                  products={products}
                  initialProducts={initialProducts}
                  filtersQuery={body}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  pageContext={pageContext}
                  allShopifyCollection={allShopifyCollection}
                />
              </Sidebar>
            </Desktop>
            <Main>
              <MainHeader>
                {products?.length ? (
                  <ProductCount type="smallText400">
                    {`${products.length} ${products_found_text.text}`}
                  </ProductCount>
                ) : (
                  ''
                )}
                <Sort
                  query={sorts}
                  products={products}
                  setProducts={setProducts}
                />
                <Tablet>
                  <Accordion
                    className="MobileAccordionFilters"
                    expanded={isExpanded}
                  >
                    <AccordionSummary
                      expandIcon={isExpanded ? '-' : '+'}
                      aria-controls={`panelmobile-a-content`}
                      id={`panelmobile-a-header`}
                      onClick={() => setisExpanded(!isExpanded)}
                    >
                      <Text style={{ marginRight: '10px' }} type="smallText500">
                        Filters
                      </Text>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Filters
                        query={
                          filter_by_text ? filter_by_text.text : 'Filter By'
                        }
                        setProducts={setProducts}
                        products={products}
                        initialProducts={initialProducts}
                        filtersQuery={body}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        pageContext={pageContext}
                        allShopifyCollection={allShopifyCollection}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Tablet>
              </MainHeader>
              <CollectionGrid>
                {products?.length > 0 ? (
                  products
                    .slice(
                      (page - 1) * number_of_products,
                      page * number_of_products
                    )
                    ?.map((product, index) => {
                      return (
                        <>
                          {index === 0 && promotion ? (
                            <Fade
                              key={`${product.handle}--${index}`}
                              bottom
                              distance="25px"
                              delay={isDesktop ? index * 50 : 0}
                            >
                              <PromoTile query={promotion} />
                              <CollectionProductTile
                                noCTA
                                className="CollectionProductTile"
                                query={{
                                  title: product.title,
                                  handle: product.handle,
                                  vendor: product.vendor,
                                  minVariantPrice:
                                    product.priceRange.minVariantPrice,
                                  initialVariant: product.variants[0],
                                  images: product.images,
                                  tags: product.tags,
                                }}
                              />
                            </Fade>
                          ) : (
                            <Fade
                              key={`${product.handle}--${index}`}
                              bottom
                              distance="25px"
                              delay={isDesktop ? index * 50 : 0}
                            >
                              <CollectionProductTile
                                noCTA
                                className="CollectionProductTile"
                                key={`${product.handle}--${index}`}
                                query={{
                                  title: product.title,
                                  handle: product.handle,
                                  vendor: product.vendor,
                                  minVariantPrice:
                                    product.priceRange.minVariantPrice,
                                  initialVariant: product.variants[0],
                                  images: product.images,
                                  tags: product.tags,
                                }}
                              />
                            </Fade>
                          )}
                        </>
                      )
                    })
                ) : (
                  <EmptyContainer>
                    <Fade bottom distance="25px">
                      <Text type="smallText500">No product available</Text>
                    </Fade>
                  </EmptyContainer>
                )}
              </CollectionGrid>
            </Main>
          </CollectionContainer>
          <Pagination
            products={products}
            location={location}
            query={pagination_text}
            setPage={setPage}
            productsLimit={number_of_products}
            page={page}
          />
        </Container>
        <Newsletter />
        <Footer />
      </>
    </Transition>
  )
}

Collection.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
  location: PropTypes.object,
}

export default Collection
