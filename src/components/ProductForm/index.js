import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import {
  ProductPrice,
  ProductSelectionContainer,
  ProductFormContainer,
  PriceContainer,
  AddToCartButton,
  QuantityLabel,
  AvailabilityContainer,
  ProductActionsContainer,
} from './styles'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import Icon from '~/components/Icon'
import Text from '~/components/Utilities/Text'
import ProductGift from '~/components/ProductGift'
import ProductColorSwatches from '~/components/ProductColorSwatches'
import StoreContext from '~/context/StoreContext'
import ProductQuantity from '~/components/ProductQuantity'
import BuyNowPayLater from '~/components/BuyNowPayLater'

const ProductForm = ({ product, setVariant, variant }) => {
  const {
    options,
    variants,
    priceRange: { minVariantPrice },
    out_of_stock_text,
    shipment_banner_text,
  } = product
  const [compareAtPrice, setCompareAtPrice] = useState(false)
  const [quantity, setQuantity] = useState(1)

  let addVariantToCart
  let client
  let adding

  if (StoreContext) {
    const storeContext = useContext(StoreContext)
    addVariantToCart = storeContext?.addVariantToCart
    client = storeContext?.store?.client
    adding = storeContext?.store?.adding
  }

  const productVariant =
    client?.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)
  const [giftProduct, setGiftProduct] = useState()
  const [giftProductShopifyId, setGiftProductShopifyId] = useState()

  const checkAvailability = useCallback(
    productId => {
      client?.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client?.product, productVariant.shopifyId, variants]
  )

  const getShopifyId = useCallback(
    handle => {
      if (!giftProductShopifyId) {
        client?.product.fetchByHandle(handle).then(fetchedProduct => {
          if (fetchedProduct) {
            setGiftProductShopifyId(fetchedProduct.variants[0].id)
          }
        })
      }
    },
    [client?.product, giftProduct]
  )

  const checkCompareAtPrice = useCallback(
    variant => {
      setCompareAtPrice(false)
      if (variant.compareAtPrice > variant.price) {
        setCompareAtPrice(true)
      }
    },
    [variant]
  )

  useEffect(() => {
    checkCompareAtPrice(variant)
  }, [variant])

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  useEffect(() => {
    if (giftProduct) {
      getShopifyId(giftProduct.gift_product.handle)
    }
  }, [client?.product, getShopifyId])

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleColorSwatches = (optionIndex, value) => {
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    let itemForCart = [
      {
        variantId: productVariant.shopifyId,
        quantity: parseInt(quantity, 10),
      },
    ]

    if (
      giftProduct &&
      giftProduct?.activate_gift &&
      giftProduct?.gift_product?.variants[0].inventory_quantity > 0 &&
      giftProductShopifyId
    ) {
      itemForCart = [
        {
          variantId: productVariant.shopifyId,
          quantity: parseInt(quantity, 10),
          customAttributes: [
            {
              key: 'gift',
              value: giftProduct.gift_product.handle,
            },
            {
              key: 'gift-level',
              value: 'parent',
            },
          ],
        },
        {
          variantId: giftProductShopifyId,
          quantity: parseInt(1, 10),
          customAttributes: [
            {
              key: 'gift',
              value: giftProduct.gift_product.handle,
            },
            {
              key: 'gift-level',
              value: 'child',
            },
          ],
        },
      ]
    }

    addVariantToCart(itemForCart)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  const priceCompareAt = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.compareAtPrice)

  return (
    <ProductFormContainer>
      <PriceContainer>
        <ProductPrice as="h3" type="heading4" className="Price">
          {price}
        </ProductPrice>
        {compareAtPrice ? (
          <ProductPrice as="h3" type="heading4" className="CompareAtPrice">
            {priceCompareAt}
          </ProductPrice>
        ) : (
          ''
        )}
      </PriceContainer>
      <BuyNowPayLater price={variant.price} minVariantPrice={minVariantPrice} priceCompareAt={variant.compareAtPrice} />
      <ProductSelectionContainer>
        {options.map(({ id, name, values }, index) => {
          if (name.toLowerCase() === 'color' && values.length > 1) {
            return (
              <ProductColorSwatches
                handleColorSwatches={handleColorSwatches}
                values={values}
                variant={variant}
                index={index}
                colors={product.colors}
                key={id}
              />
            )
          } else if (values.length > 1) {
            return (
              <React.Fragment key={id}>
                <FormControl>
                  <NativeSelect
                    IconComponent={() => <Icon type="keyboard-arrow-down" />}
                    onChange={event => handleOptionChange(index, event)}
                    name={name}
                    key={id}
                    inputProps={{ 'aria-label': 'age' }}
                  >
                    {values.map(value => (
                      <option
                        value={value}
                        key={`${name}-${value}`}
                        disabled={checkDisabled(name, value)}
                      >
                        {value}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </React.Fragment>
            )
          }
        })}
      </ProductSelectionContainer>
      <ProductActionsContainer>
        <div style={{ marginRight: '15px' }}>
          <QuantityLabel as="label" type="smallText400" htmlFor="quantity">
            Qty{' '}
          </QuantityLabel>
          <ProductQuantity
            setQuantity={setQuantity}
            quantity={quantity}
            product={product}
            variant={variant}
          />
        </div>
        <AddToCartButton
          buttonStyle="tertiary"
          disabled={!available || adding}
          clickHandler={handleAddToCart}
        >
          Add to Cart
        </AddToCartButton>
      </ProductActionsContainer>
      <AvailabilityContainer>
        <Text as="div" type="body">
          {!available ? (
            out_of_stock_text?.text
          ) : (
            <>
              <Icon type="fast-shipping" />
              {shipment_banner_text?.text}
            </>
          )}
        </Text>
      </AvailabilityContainer>
      <ProductGift query={product} setGiftProduct={setGiftProduct} />
    </ProductFormContainer>
  )
}

ProductForm.propTypes = {
  variant: PropTypes.object.isRequired,
  setVariant: PropTypes.func.isRequired,
  product: PropTypes.shape({
    colors: PropTypes.array,
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    priceRange: PropTypes.object,
    productType: PropTypes.string,
    title: PropTypes.string,
    shipment_banner_text: PropTypes.object,
    out_of_stock_text: PropTypes.object,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
