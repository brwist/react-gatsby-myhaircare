import React, { useContext, useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import CustomerContext from '~/context/CustomerContext'
import {
  AccountContainer,
  AccountColumn,
  AccountTitle,
  AccountButton,
  AccountLogoutButton,
  AccountHeader,
  AccountTitleWelcome,
  AccountHeaderChild,
  AccountColumnTitle,
  EmptyContainer,
  EmptyText,
  ExistingAddressesContainer,
  SingleAddressContainer,
  AddressText,
  AddressTextTitle,
  AddressLine,
  OrderContainer,
  SingleOrder,
} from './styles'
import AlertContext from '~/context/AlertContext'
import { useMutation } from '@apollo/client'
import Address from './Address'
import Button from '~/components/Utilities/Button'
import { DELETE_SHOPIFY_ADDRESS } from '~/utils/functions/graphql'
import moment from 'moment'
import Transition from '~/components/Transition'
import Footer from '~/components/Footer'
import Newsletter from '~/components/Newsletter'

const AccountLayout = ({ query }) => {
  const customerContext = useContext(CustomerContext)
  const [addresses, setAddresses] = useState([])
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [addressToEdit, setAddressToEdit] = useState('')
  const [addressID, setAddressID] = useState(false)
  const [isLoading, setIsLoading] = useState(null)
  const alertContext = useContext(AlertContext)
  const [deleteAddress, { data: deleteData }] = useMutation(
    DELETE_SHOPIFY_ADDRESS
  )

  useEffect(() => {
    setAddresses(customerContext?.customerState?.addresses?.edges)
  }, [customerContext.customerState])

  useEffect(() => {
    setIsLoading(null)

    if (deleteData?.customerAddressDelete?.customerUserErrors?.[0]?.message) {
      alertContext.setMessage(
        deleteData?.customerAddressDelete?.customerUserErrors?.[0].message
      )
      alertContext.setIsAlertOpen(true)

      setTimeout(() => {
        alertContext.setIsAlertOpen(false)
      }, 3000)
    } else if (deleteData?.customerAddressDelete?.deletedCustomerAddressId) {

      const updatedAddresses = customerContext?.customerState?.addresses?.edges?.filter(address => address.node.id !== addressID)

      setAddresses(updatedAddresses)

      customerContext?.setCustomerState({
        ...customerContext?.customerState,
        addresses: updatedAddresses,
      })
    }
  }, [deleteData])

  const editClickHandler = address => {
    setOpen(true);
    setEditMode(true)
    setAddressToEdit(address)
  }

  return (
    <Transition>
      <>
        <AccountContainer className="section">
          <AccountHeader>
            {query?.title?.text ? (
              <AccountTitle as="h1" type="heading2">
                {query.title.text}
              </AccountTitle>
            ) : (
              ''
            )}
            <AccountHeaderChild>
              <AccountTitleWelcome as="h2" type="heading5">
                {`Welcome ${customerContext?.customerState?.firstName}`}
              </AccountTitleWelcome>
            </AccountHeaderChild>
            <AccountHeaderChild>
              {query?.logout?.text ? (
                <AccountLogoutButton
                  clickHandler={() => {
                    customerContext.setIsLoggedIn(false)
                    customerContext.removeLoggedInLocalStorage()
                    navigate('/')
                  }}
                  buttonStyle="tertiary"
                >
                  {query.logout.text}
                </AccountLogoutButton>
              ) : (
                ''
              )}
            </AccountHeaderChild>
          </AccountHeader>
          <AccountColumn>
            {query?.address_title?.text ? (
              <AccountColumnTitle as="h3" type="heading5">
                {query.address_title.text}
              </AccountColumnTitle>
            ) : (
              ''
            )}
            <ExistingAddressesContainer>
              {addresses?.length > 0 ? (
                addresses.map(
                  (address, index) => {
                    return (
                      <SingleAddressContainer
                        key={`${address.node.address1}--${index}`}
                      >
                        {address.node.firstName && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.first_name_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.firstName}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.lastName && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.last_name_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.lastName}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.company && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.company_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.company}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.address1 && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.address_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.address1}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.address2 && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.address_2_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.address2}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.city && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.city_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.city}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.zip && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.postal_code_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.zip}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.country && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              Country
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.country}
                            </AddressText>
                          </AddressLine>
                        )}
                        {address.node.province && (
                          <AddressLine>
                            <AddressTextTitle type="smallText500">
                              {query.province_input_label.text}
                            </AddressTextTitle>
                            <AddressText type="body">
                              {address.node.province}
                            </AddressText>
                          </AddressLine>
                        )}
                        <AddressLine>
                          {query?.address_edit?.text && (
                            <Button
                              buttonStyle="tertiary"
                              clickHandler={() => editClickHandler(address)}
                            >
                              {query.address_edit.text}
                            </Button>
                          )}
                          {query?.address_delete?.text && (
                            <Button
                              buttonStyle="tertiary"
                              isLoading={isLoading === index}
                              clickHandler={() => {
                                setIsLoading(index)
                                setAddressID(address.node.id)
                                deleteAddress({
                                  variables: {
                                    id: address.node.id,
                                    customerAccessToken:
                                      customerContext?.loggedInLocalStorage
                                        ?.accessToken,
                                  },
                                })
                              }}
                            >
                              {query.address_delete.text}
                            </Button>
                          )}
                        </AddressLine>
                      </SingleAddressContainer>
                    )
                  }
                )
              ) : (
                <EmptyContainer>
                  {query?.empty_addresses?.text ? (
                    <EmptyText type="smallText400">
                      {query.empty_addresses.text}
                    </EmptyText>
                  ) : (
                    ''
                  )}
                </EmptyContainer>
              )}
            </ExistingAddressesContainer>
            {query?.address_add?.text ? (
              <AccountButton clickHandler={() => setOpen(true)}>
                {query.address_add.text}
              </AccountButton>
            ) : (
              ''
            )}
          </AccountColumn>
          <AccountColumn>
            {query?.orders_title?.text ? (
              <AccountColumnTitle as="h3" type="heading5">
                {query.orders_title.text}
              </AccountColumnTitle>
            ) : (
              ''
            )}
            <OrderContainer>
              {customerContext?.customerState?.orders?.edges?.length > 0
                ? customerContext.customerState.orders.edges.map(order => {
                    const date = moment(order.node.processedAt)
                      .utc()
                      .format('YYYY-MM-DD h:mm:ss a')

                    const price = Intl.NumberFormat(undefined, {
                      currency: order.node.totalPriceV2.currencyCode,
                      minimumFractionDigits: 2,
                      style: 'currency',
                    }).format(order.node.totalPriceV2.amount)

                    return (
                      <SingleOrder key={order.node.name}>
                        <AddressLine>
                          <AddressTextTitle type="smallText500">
                            {query.order_number.text}
                          </AddressTextTitle>
                          <AddressText type="body">
                            {order.node.name}
                          </AddressText>
                        </AddressLine>
                        <AddressLine>
                          <AddressTextTitle type="smallText500">
                            {query.order_date.text}
                          </AddressTextTitle>
                          <AddressText type="body">{date}</AddressText>
                        </AddressLine>
                        <AddressLine>
                          <AddressTextTitle type="smallText500">
                            {query.order_total.text}
                          </AddressTextTitle>
                          <AddressText type="body">{price}</AddressText>
                        </AddressLine>
                        <AddressLine>
                          <AddressTextTitle type="smallText500">
                            {query.order_payment_status.text}
                          </AddressTextTitle>
                          <AddressText type="body">{'temp'}</AddressText>
                        </AddressLine>
                        <AddressLine>
                          <AddressTextTitle type="smallText500">
                            {query.order_fulfillment_status.text}
                          </AddressTextTitle>
                          <AddressText type="body">{'temp'}</AddressText>
                        </AddressLine>
                      </SingleOrder>
                    )
                  })
                : ''}
            </OrderContainer>
          </AccountColumn>
          <AccountColumn>
            {query?.rewards_title?.text ? (
              <AccountColumnTitle as="h3" type="heading5">
                {query.rewards_title.text}
              </AccountColumnTitle>
            ) : (
              ''
            )}
          </AccountColumn>
        </AccountContainer>
        <Address
          query={query}
          open={open}
          setOpen={setOpen}
          customerContext={customerContext}
          editMode={{
            address: addressToEdit,
            state: editMode,
          }}
          setEditMode={setEditMode}
          alertContext={alertContext}
        />
        <Newsletter />
        <Footer />
      </>
    </Transition>
  )
}

AccountLayout.propTypes = {
  query: PropTypes.object.isRequired,
}

export default AccountLayout
