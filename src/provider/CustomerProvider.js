import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import CustomerContext from '~/context/CustomerContext'
import { useLocalStorage } from 'react-use'
import { useLazyQuery, useMutation } from '@apollo/client'
import StoreContext from '~/context/StoreContext'
import {
  GET_SHOPIFY_CUSTOMER,
  ASSOCIATE_ACCOUNT_WITH_CHECKBOX,
} from '~/utils/functions/graphql'

async function shopifyMultiPassLogin({ email, time }) {
  const res = await fetch(
    `/.netlify/functions/shopify?email=${email}&time=${time}&endpoint=shopify_multi_pass_login`,
    {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
    }
  )
  return await res.json()
}

const CustomerProvider = props => {
  const storeContext = useContext(StoreContext)
  const { children, location } = props
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [customerState, setCustomerState] = useState(null)
  const [subscribeUserToCheckout, setSubscribeUserToCheckout] = useState(false)
  const [
    loggedInLocalStorage,
    setLoggedInLocalStorage,
    removeLoggedInLocalStorage,
  ] = useLocalStorage('loggedIn', null)
  const [hasResetPasswordURL, setHasResetPasswordURL] = useState('')
  const [
    getCustomer,
    { data: customerData, loading: customerDataLoading },
  ] = useLazyQuery(GET_SHOPIFY_CUSTOMER)
  const [associateCheckout] = useMutation(ASSOCIATE_ACCOUNT_WITH_CHECKBOX)

  const today = new Date()
  const todayISODate = today.toISOString()

  useEffect(() => {
    if (loggedInLocalStorage?.expiresAt && loggedInLocalStorage?.accessToken) {
      if (todayISODate > loggedInLocalStorage?.expiresAt) {
        removeLoggedInLocalStorage()
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)

        getCustomer({
          variables: {
            accessToken: loggedInLocalStorage?.accessToken,
          },
        })
      }
    }
  }, [loggedInLocalStorage])

  useEffect(() => {
    if (
      storeContext?.store?.checkout?.id &&
      loggedInLocalStorage?.accessToken
    ) {
      associateCheckout({
        variables: {
          customerAccessToken: loggedInLocalStorage?.accessToken,
          checkoutId: storeContext?.store?.checkout?.id,
        },
      })
    }
  }, [storeContext?.store?.checkout?.id, loggedInLocalStorage?.accessToken])

  useEffect(() => {
    if (location?.search?.includes('resetUrl')) {
      const getShopifyResetURL = location?.search.split('?resetUrl=')
      setHasResetPasswordURL(getShopifyResetURL[1])
    }
  }, [])

  useEffect(() => {
    if (customerData) {
      setCustomerState(customerData.customer)
    }
  }, [customerData])

  useEffect(() => {
    if (subscribeUserToCheckout) {
      if (customerState) {
        const { email } = customerState

        shopifyMultiPassLogin({ email: email, time: todayISODate })
          .then(res => {
            // window.open(res.url)
            console.log(res)
            setSubscribeUserToCheckout(false)
          })
          .catch(err => {
            console.log(err)
            setSubscribeUserToCheckout(false)
          }).then(() => window.open(storeContext?.store?.checkout?.webUrl))
      } else {
        window.open(storeContext?.store?.checkout?.webUrl)
      }
    }
  }, [subscribeUserToCheckout])

  return (
    <CustomerContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        customerState,
        setCustomerState,
        loggedInLocalStorage,
        setLoggedInLocalStorage,
        removeLoggedInLocalStorage,
        hasResetPasswordURL,
        customerDataLoading,
        subscribeUserToCheckout,
        setSubscribeUserToCheckout,
        openLogin,
        setOpenLogin,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

CustomerProvider.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
}

export default CustomerProvider
