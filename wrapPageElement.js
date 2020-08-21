import React from 'react'
import PropTypes from 'prop-types'
import ContextProvider from './src/provider/ContextProvider'
import AlertProvider from './src/provider/AlertProvider'
import CustomerProvider from './src/provider/CustomerProvider'
import RatingProvider from './src/provider/RatingProvider'
import CartFlyoutProvider from './src/provider/CartFlyoutProvider'
import { SearchContextProvider } from './src/components/Search/context'
import { GlobalStyle } from './src/utils/styles'
import Header from './src/components/Header'
import { ThemeProvider } from 'emotion-theming'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'
import { theme } from '~/utils/styles'
import { Layout } from './src/components/Layout'
import './src/utils/app.css'

const httpLink = createHttpLink({
  uri: 'https://myhaircarebeauty.myshopify.com/api/graphql',
})

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
  },
}))

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
})

const wrapPageElement = ({ element, props }) => {
  return (
    <ApolloProvider client={client}>
      <AlertProvider>
        <RatingProvider>
          <CartFlyoutProvider>
            <ContextProvider>
              <CustomerProvider location={props.location}>
                <ThemeProvider theme={theme}>
                  <GlobalStyle />
                  <SearchContextProvider>
                    <>
                      <Header />
                      <Layout {...props}>{element}</Layout>
                    </>
                  </SearchContextProvider>
                </ThemeProvider>
              </CustomerProvider>
            </ContextProvider>
          </CartFlyoutProvider>
        </RatingProvider>
      </AlertProvider>
    </ApolloProvider>
  )
}

wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired,
  props: PropTypes.object,
  location: PropTypes.object,
}

export default wrapPageElement
