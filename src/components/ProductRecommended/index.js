import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import ProductSlider from '~/components/ProductSlider'
import ProductTile from '~/components/ProductTile'
import { SHOPIFY_RECOMMENDED_PRODUCTS } from '~/utils/functions/graphql'
import { ProductRecommendedContainer } from './styles'

const ProductRecommended = ({ shopifyId, query }) => {
  const { loading, data } = useQuery(SHOPIFY_RECOMMENDED_PRODUCTS, {
    variables: { id: shopifyId },
  })

  return loading ? (
    ''
  ) : data.productRecommendations.length > 0 ? (
    <ProductRecommendedContainer>
      <ProductSlider
        title={
          query.recommended_product_title
            ? query.recommended_product_title.text
            : 'Recommended for you'
        }
      >
        {data?.productRecommendations
          ?.filter(
            product =>
              !product.tags.includes('Discontinued') &&
              product.variants.edges[0].availableForSale
          )
          .map((product, index) => (
            <ProductTile
              className="keen-slider__slide"
              key={`ProductTileItem--${index}`}
              query={{
                title: product.title,
                handle: product.handle,
                vendor: product.vendor,
                minVariantPrice: product.priceRange.minVariantPrice,
                initialVariant: product.variants.edges[0].node,
                images: product.images.edges[0].node,
                tags: product.tags,
              }}
            />
          ))}
      </ProductSlider>
    </ProductRecommendedContainer>
  ) : (
    ''
  )
}

ProductRecommended.propTypes = {
  shopifyId: PropTypes.string,
  query: PropTypes.object,
}

export default ProductRecommended
