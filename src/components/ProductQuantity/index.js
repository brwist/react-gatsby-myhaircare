import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  QuantityInput,
  QuantityDecrement,
  QuantityIncrement,
} from '~/components/ProductForm/styles'
import Icon from '~/components/Icon'
import RatingContext from '~/context/RatingContext'

async function fetchInventory(handle) {
  const res = await fetch(
    `/.netlify/functions/shopify?handle=${handle}&endpoint=get_inventory`,
    {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
    }
  )
  return await res.json()
}

const ProductQuantity = ({
  setQuantity,
  quantity,
  product,
  isLineItem = false,
  variant,
  setGetVariantInventory = () => '',
}) => {
  const [productHandle, setProductHandle] = useState('')
  const [variantInventory, setVariantInventory] = useState(null)
  const [variantId, setVariantId] = useState(null)
  const ratingContext = useContext(RatingContext)

  useEffect(() => {
    if (isLineItem) {
      setProductHandle(product.variant.product.handle)
    } else {
      setProductHandle(product.handle)
    }
  }, [])

  useEffect(() => {
    if (productHandle) {
      const response = fetchInventory(productHandle)
      response.then(data => {
        ratingContext?.setProductId(data.id)
        setVariantInventory(data.quantities)
      })
    }
  }, [productHandle])

  useEffect(() => {
    if (variantInventory && variantInventory?.length > 0) {
      if (isLineItem) {
        setVariantId(
          variantInventory?.find(
            variant => product.variant.title === variant.title
          )
        )
      } else if (variant) {
        setVariantId(variantInventory?.find(v => v.title === variant.title))
      }
    }
    setGetVariantInventory(variantInventory?.[0].inventory_quantity)
  }, [variantInventory, variant])

  const handleQuantityChange = ({ target }) => {
    if (target.dataset.quantity === 'increment') {
      setQuantity(
        quantity < variantId?.inventory_quantity ? quantity + 1 : quantity
      )
    } else {
      setQuantity(quantity === 1 ? quantity : quantity - 1)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
      }}
    >
      <QuantityDecrement
        data-quantity="decrement"
        onClick={handleQuantityChange}
      >
        <Icon type="minus" />
      </QuantityDecrement>
      <QuantityInput>{quantity}</QuantityInput>
      <QuantityIncrement
        data-quantity="increment"
        onClick={handleQuantityChange}
      >
        <Icon type="add" />
      </QuantityIncrement>
    </div>
  )
}

ProductQuantity.propTypes = {
  setQuantity: PropTypes.func,
  quantity: PropTypes.number,
  product: PropTypes.object,
  isLineItem: PropTypes.bool,
  variant: PropTypes.object,
  setGetVariantInventory: PropTypes.func,
}

export default ProductQuantity
