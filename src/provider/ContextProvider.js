import React, { useState, useEffect, useContext } from 'react'
import Client from 'shopify-buy'
import PropTypes from 'prop-types'
import Context from '~/context/StoreContext'
import CartFlyoutContext from '~/context/CartFlyoutContext'

const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  domain: `${process.env.SHOP_NAME}.myshopify.com`,
})

const ContextProvider = ({ children }) => {
  const cartFlyoutContext = useContext(CartFlyoutContext)
  let initialStoreState = {
    client,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  }

  const [store, updateStore] = useState(initialStoreState)
  let isRemoved = false

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined'
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id)
        }

        updateStore(prevState => {
          return { ...prevState, checkout }
        })
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = id => store.client.checkout.fetch(id)

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          // Make sure this cart hasn’t already been purchased.
          if (!isRemoved && !checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null)
        }
      }

      const newCheckout = await createNewCheckout()
      if (!isRemoved) {
        setCheckoutInState(newCheckout)
      }
    }

    initializeCheckout()
  }, [store.client.checkout])

  useEffect(
    () => () => {
      isRemoved = true
    },
    []
  )

  const addVariantToCart = items => {
    updateStore(prevState => {
      return { ...prevState, adding: true }
    })

    const { checkout, client } = store

    const checkoutId = checkout.id

    return client.checkout
      .addLineItems(checkoutId, items)
      .then(checkout => {
        updateStore(prevState => {
          cartFlyoutContext.setToggleDrawer(true)

          return { ...prevState, checkout, adding: false }
        })
      })
  }

  const removeLineItem = (client, checkoutID, lineItemID) => {
    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then(res => {
        updateStore(prevState => {
          return { ...prevState, checkout: res }
        })
      })
  }

  const updateLineItem = (client, checkoutID, lineItemID, quantity) => {
    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then(res => {
        updateStore(prevState => {
          return { ...prevState, checkout: res }
        })
      })
  }

  return (
    <Context.Provider
      value={{
        store,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
      }}
    >
      {children}
    </Context.Provider>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.any,
}

export default ContextProvider
