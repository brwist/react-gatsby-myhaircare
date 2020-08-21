import React, { useContext } from 'react'
import { IconContainer } from '~/components/Drawer/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Icon from '~/components/Icon'
import CartFlyoutContext from '~/context/CartFlyoutContext'
import CustomerContext from '~/context/CustomerContext'
import { useStaticQuery, graphql } from 'gatsby'
import {
  CartFlyoutContainer,
  CartFlyoutHeader,
  CartHeaderTitle,
  SubtotalText,
  SubtotalTitle,
  CartCheckoutButton,
  SubtotalContainer,
  SubtotalContent,
  ItemsContainer,
} from './styles'
import StoreContext from '~/context/StoreContext'
import LineItem from '~/components/LineItem'

const CartFlyout = () => {
  const {
    prismicComponentCart: { data: query },
  } = useStaticQuery(graphql`
    {
      prismicComponentCart {
        data {
          title {
            text
          }
          total {
            text
          }
          taxes {
            text
          }
          quantity {
            text
          }
          subtotal {
            text
          }
          price {
            text
          }
          empty_cart {
            text
          }
          checkout_button {
            text
          }
        }
      }
    }
  `)
  const cartFlyoutContext = useContext(CartFlyoutContext)
  const customerContext = useContext(CustomerContext)
  let checkout

  if (StoreContext) {
    const context = useContext(StoreContext)

    checkout = context?.store.checkout
  }

  const handleCheckout = () => {
    customerContext.setSubscribeUserToCheckout(true)
  }

  const items = checkout?.lineItems?.map(item => (
    <LineItem
      query={{
        price: query?.price,
        quantity: query?.quantity,
      }}
      key={item.id.toString()}
      item={item}
      allItems={checkout?.lineItems}
    />
  ))

  return (
    <CartFlyoutContainer>
      <SwipeableDrawer
        anchor={'right'}
        onClose={() => cartFlyoutContext.setToggleDrawer(false)}
        onOpen={() => cartFlyoutContext.setToggleDrawer(true)}
        open={cartFlyoutContext.toggleDrawer}
        className="CartFlyoutDrawer"
      >
        {/* (HEADER) */}
        <CartFlyoutHeader>
          {query?.title?.text ? (
            <CartHeaderTitle as="h5" type="heading5">
              {query?.title?.text}
            </CartHeaderTitle>
          ) : (
            ''
          )}
          <IconContainer
            onClick={() => cartFlyoutContext.setToggleDrawer(false)}
          >
            <Icon type="clear" />
          </IconContainer>
        </CartFlyoutHeader>
        {/* ITEMS CONTAINER (MAIN) */}
        <ItemsContainer>
          {items?.length > 0 ? (
            items
          ) : (
            <SubtotalText style={{ textAlign: 'center' }} type="body">
              {query?.empty_text?.text
                ? query?.empty_text?.text
                : 'Your bag is empty'}
            </SubtotalText>
          )}
        </ItemsContainer>
        {/* SUBTOTAL CONTAINER (FOOTER) */}
        {items?.length > 0 ? (
          <SubtotalContainer>
            <SubtotalContent>
              {query?.subtotal?.text ? (
                <SubtotalTitle type="heading5" as="p">
                  {query?.subtotal?.text}
                </SubtotalTitle>
              ) : (
                ''
              )}
              <SubtotalText type="body">
                $ {checkout?.subtotalPrice}
              </SubtotalText>
            </SubtotalContent>
            <SubtotalContent>
              {query?.taxes?.text ? (
                <SubtotalTitle type="heading5" as="p">
                  {query?.taxes?.text}
                </SubtotalTitle>
              ) : (
                ''
              )}
              <SubtotalText type="body">$ {checkout?.totalTax}</SubtotalText>
            </SubtotalContent>
            <SubtotalContent>
              {query?.total?.text ? (
                <SubtotalTitle type="heading5" as="p">
                  {query?.total?.text}
                </SubtotalTitle>
              ) : (
                ''
              )}
              <SubtotalText type="body">$ {checkout?.totalPrice}</SubtotalText>
            </SubtotalContent>
            <CartCheckoutButton
              clickHandler={handleCheckout}
              disabled={checkout?.lineItems?.length === 0}
            >
              {query?.checkout_button?.text
                ? query?.checkout_button?.text
                : 'Checkout'}
            </CartCheckoutButton>
          </SubtotalContainer>
        ) : (
          ''
        )}
      </SwipeableDrawer>
    </CartFlyoutContainer>
  )
}

export default CartFlyout
