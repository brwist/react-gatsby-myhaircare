import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  ProductGiftContainer,
  ProductGiftTitle,
  ProductGiftBody,
  ProductGiftImage,
  ProductGiftContent,
} from './styles'

const ProductGift = ({ query, setGiftProduct }) => {  

  const gift = query?.gifts?.find(
    gift => gift.gift_for.handle === query?.handle
  )
  
  useEffect(() => {
    if (gift) {
      setGiftProduct(gift)
    }
  }, [setGiftProduct])

  return gift?.activate_gift &&
    gift?.gift_product?.variants[0].inventory_quantity > 0 ? (
    <ProductGiftContainer
      pageType="product"
      pageHandle={gift.gift_product.handle}
    >
      {query.product_image?.localFile ? (
        <ProductGiftImage
          alt={query.title}
          fluid={query.product_image.localFile.childImageSharp.fluid}
        />
      ) : (
        <img src={gift.gift_product.image.src} alt={query.title} />
      )}
      <ProductGiftContent>
        <ProductGiftTitle as="h5" type="smallText700">
          {gift.gift_title?.text}
        </ProductGiftTitle>
        <ProductGiftBody type="body">{gift.gift_body?.text}</ProductGiftBody>
      </ProductGiftContent>
    </ProductGiftContainer>
  ) : (
    ''
  )
}

ProductGift.propTypes = {
  query: PropTypes.object.isRequired,
  setGiftProduct: PropTypes.func,
}

export default ProductGift
