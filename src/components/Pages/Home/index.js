import React from 'react'
import PropTypes from 'prop-types'
import SEO from '~/components/seo'
import 'keen-slider/keen-slider.min.css'
import HeroSlider from '~/components/HeroSlider'
import FeaturedBrands from '~/components/FeaturedBrands'
import ImagesMosaic from '~/components/ImagesMosaic'
import Newsletter from '~/components/Newsletter'
import ArticlesGrid from '~/components/ArticlesGrid'
import ProductSlider from '~/components/ProductSlider'
import ProductTile from '~/components/ProductTile'
import Footer from '~/components/Footer'
import Fade from 'react-reveal/Fade'

const IndexLayout = props => {
  const {
    data: {
      homepage: {
        data: { body: slices, seo_title, seo_description, seo_keywords },
      },
      allShopifyArticle: { nodes: articles },
      shopifyCollection: { title, products },
    },
  } = props

  return (
    <>
      <SEO
        title={seo_title ? seo_title.text : 'Home'}
        description={
          seo_description
            ? seo_description.text
            : 'Shop online for haircare, skincare, and makeup. Enjoy free shipping Australia-wide when you spend $50. Order now and pay later with Afterpay and Zip Pay.'
        }
        keywords={
          seo_keywords
            ? seo_keywords.text.split(',')
            : ['Haircare', 'Wellness', 'Beauty Online Store Australia']
        }
      />
      {slices.length > 0
        ? slices.map(slice => {
            switch (slice.slice_type) {
              case 'image_gallery':
                return <HeroSlider query={{ ...slice }} />
              case 'product_slider':
                return (
                  <ProductSlider title={title}>
                    {products
                      ?.filter(
                        product =>
                          !product.tags.includes('Discontinued') &&
                          product.variants[0].availableForSale
                      )
                      .map((product, index) => (
                        <Fade
                          key={`ProductTileItem--${index}`}
                          bottom
                          distance="25px"
                          delay={index * 50}
                        >
                          <ProductTile
                            className="keen-slider__slide"
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
                      ))}
                  </ProductSlider>
                )
              case 'images_mosaic':
                return (
                  <ImagesMosaic
                    query={{
                      ...slice,
                    }}
                  />
                )
              case 'featured_brands':
                return (
                  <FeaturedBrands
                    timing={50}
                    query={{
                      ...slice,
                    }}
                  />
                )
              case 'latest_articles':
                return (
                  <ArticlesGrid
                    query={{
                      ...slice,
                      articles,
                    }}
                  />
                )
              default:
                return ''
            }
          })
        : ''}
      <Newsletter />
      <Footer />
    </>
  )
}

IndexLayout.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexLayout
