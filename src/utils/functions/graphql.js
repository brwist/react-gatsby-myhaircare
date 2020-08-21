import gql from 'graphql-tag'

export const GET_SHOPIFY_CUSTOMER = gql`
  query customerData($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      defaultAddress {
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        lastName
        zip
        province
        provinceCode
        id
      }
      addresses(first: 25) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            lastName
            zip
            province
            provinceCode
            id
          }
        }
      }
      orders(first: 100) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            name
            totalPriceV2 {
              amount
              currencyCode
            }
            processedAt
          }
        }
      }
      firstName
      lastName
      email
    }
  }
`

export const CREATE_SHOPIFY_ADDRESS = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const DELETE_SHOPIFY_ADDRESS = gql`
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`

export const UPDATE_SHOPIFY_ADDRESS = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const UPDATE_SHOPIFY_DEFAULT_ADDRESS = gql`
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const SHOPIFY_RECOMMENDED_PRODUCTS = gql`
  query productRecommendedQuery($id: ID!) {
    productRecommendations(productId: $id) {
      id
      title
      handle
      productType
      descriptionHtml
      vendor
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            availableForSale
            compareAtPrice
            selectedOptions {
              name
              value
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            altText
            originalSrc
          }
        }
      }
    }
  }
`

export const CREATE_SHOPIFY_CUSTOMER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const LOGIN_SHOPIFY_CUSTOMER = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`

export const RECOVER_PASSWORD_SHOPIFY_CUSTOMER = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const RESET_PASSWORD_SHOPIFY_CUSTOMER = gql`
  mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const ASSOCIATE_ACCOUNT_WITH_CHECKBOX = gql`
  mutation associateCustomerWithCheckout(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`

export const GET_SHOPIFY_PRODUCT_BY_HANDLE = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      metafields(first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  }
`
