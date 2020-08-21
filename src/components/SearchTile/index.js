import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { SearchTileAddToCart, SearchTileTitle, SearchTileContainer, SearchTileContent, SearchTileImg, SearchLinkToHandle } from './styles'
import {
  PriceContainer
} from '~/components/ProductTile/styles'
import ProductQuantity from '~/components/ProductQuantity'
import StoreContext from '~/context/StoreContext'

const SearchTile = ({ query }) => {
  const [quantity, setQuantity] = useState(1)
  const [getVariantInventory, setGetVariantInventory] = useState(null)
  let addVariantToCart
  let adding

  if (StoreContext) {
    const storeContext = useContext(StoreContext)
    addVariantToCart = storeContext?.addVariantToCart
    adding = storeContext?.store?.adding
  }

   const price = Intl.NumberFormat(undefined, {
    currency: query?.priceRange?.minVariantPrice?.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(query?.variants?.edges?.[0].node?.price)

  let priceCompareAt = ''

  if (query?.variants?.edges?.[0].node?.compareAtPrice) {
    priceCompareAt = Intl.NumberFormat(undefined, {
      currency: query.priceRange.minVariantPrice.currencyCode,
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(query?.variants?.edges?.[0].node?.compareAtPrice)
  }

  const handleAddToCart = () => {
    const itemForCart = [
      {
        variantId: query?.variants?.edges?.[0].node.id,
        quantity: parseInt(quantity, 10),
      },
    ]

    addVariantToCart(itemForCart)
  }

  // console.log(!query.tags.includes('Discontinued') && query.variants.edges[0].availableForSale)

  return <SearchTileContainer>
    <SearchLinkToHandle pageHandle={query.handle} pageType="page">
      <SearchTileImg src={query.images[0].originalSrc} alt={query.title} />
      </SearchLinkToHandle>
    <SearchTileContent>
      <SearchTileTitle as="h4" type="smallText500">{query.title}</SearchTileTitle>
      <PriceContainer className="PriceContainer">
          <SearchTileTitle as="h4" type="smallText700">
            {price}
          </SearchTileTitle>
          {priceCompareAt && price < priceCompareAt ? (
            <SearchTileTitle as="h4" type="smallText700" className="CompareAtPrice">
              {priceCompareAt}
            </SearchTileTitle>
          ) : (
            ''
          )}
        </PriceContainer>
        <ProductQuantity product={{
          handle: query.handle.split('product/')[1],
        }} 
        quantity={quantity} 
        setGetVariantInventory={setGetVariantInventory} 
        setQuantity={setQuantity} 
        variant={query?.variants?.edges?.[0].node} />
      <SearchTileAddToCart 
        buttonStyle={'primary'}
        clickHandler={handleAddToCart} 
        disabled={
          getVariantInventory === (null || undefined) || 
          getVariantInventory <= 0 || adding
        } 
        isLoading={getVariantInventory === (null || undefined)}>
          {
            getVariantInventory === (null || undefined) ? query.loading_button?.text : 
            getVariantInventory <= 0 ? query.sold_out_button?.text : 
            query.add_to_cart_button?.text
          }
      </SearchTileAddToCart>
    </SearchTileContent>
  </SearchTileContainer>
}



SearchTile.propTypes = {
  query: PropTypes.object,
}

export default SearchTile
