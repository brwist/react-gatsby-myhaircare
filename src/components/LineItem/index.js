import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import {
  ListItemStyled,
  ListItemLinkContainer,
  ListItemTitle,
  RemoveItemIcon,
  RemoveItemContainer,
  SelectedOption,
  ListItemContent,
  OptionsContainer,
  QuantityContainer,
  ListItemPriceContainer,
} from './styles'
import { QuantityLabel } from '~/components/ProductForm/styles'
import ProductQuantity from '~/components/ProductQuantity'

const LineItem = ({ item, allItems, query }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  let checkout
  let removeLineItem
  let client
  let updateLineItem

  if (StoreContext) {
    const context = useContext(StoreContext)

    removeLineItem = context?.removeLineItem
    updateLineItem = context?.updateLineItem
    checkout = context?.store.checkout
    client = context?.store.client
  }
  const gift = item.customAttributes?.find(
    attribute => attribute.key === 'gift-level'
  )

  useEffect(() => {
    if (quantity) {
      updateLineItem(client, checkout.id, item.id, quantity)
    }
  }, [quantity])

  const variantImage = item.variant.image ? (
    <img src={item.variant.image.src} alt={`${item.title} product shot`} />
  ) : null

  if (gift?.value) {
    console.log(gift?.value)
    // allItems.find(item => )
    console.log(allItems)
  }

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  const price = Intl.NumberFormat(undefined, {
    currency: item?.variant?.priceV2?.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(item?.variant?.priceV2?.amount)

  return (
    <ListItemStyled>
      <ListItemLinkContainer to={`/product/${item?.variant?.product?.handle}/`}>
        {variantImage}
      </ListItemLinkContainer>
      <ListItemContent>
        <ListItemTitle as="h3" type="smallText500">
          {item.title}
          {`  `}
          {item.variant.title !== 'Default Title' ? item.variant.title : ''}
        </ListItemTitle>
        <ListItemPriceContainer type="smallText500">
          {query?.price?.text
            ? `${query?.price?.text} ${price}`
            : `Price: ${price}`}
        </ListItemPriceContainer>
        <OptionsContainer>
          {item?.variant?.selectedOptions
            ? item.variant.selectedOptions.map((option, index) => {
                return (
                  <SelectedOption type="body" key={`${option}--${index}`}>
                    {`${option.name}: ${option.value}` !==
                    'Title: Default Title'
                      ? `${option.name}: ${option.value}`
                      : ''}
                  </SelectedOption>
                )
              })
            : ''}
        </OptionsContainer>
        <QuantityContainer>
          <QuantityLabel as="label" type="body" htmlFor="quantity">
            {query?.quantity?.text ? `${query?.quantity?.text} ` : `Qty: `}
          </QuantityLabel>
          <ProductQuantity isLineItem product={item} quantity={quantity} setQuantity={setQuantity} />
        </QuantityContainer>
      </ListItemContent>
      <RemoveItemContainer role="button" onClick={handleRemove}>
        <RemoveItemIcon type="clear" />
      </RemoveItemContainer>
    </ListItemStyled>
  )
}

LineItem.propTypes = {
  item: PropTypes.object.isRequired,
  allItems: PropTypes.array,
  query: PropTypes.object,
}

export default LineItem
