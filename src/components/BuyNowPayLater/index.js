import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '~/components/Icon'
import {
  BuyNowPayLaterText as Text,
  BuyNowPayLaterContainer,
  PaymentDialog,
  PaymentDialogTitle,
  ModalContent,
  CloseIconContainer,
  ModalContentTitle,
  ModalContentColumns,
  ModalContentColumn,
  ModalContentColumnItem,
  ModalContentColumnImage,
  ModalContentColumnTitle,
  ModalContentColumnBody,
} from './styles'
import { useStaticQuery, graphql } from 'gatsby'

const LearnMore = () => {
  return (
    <Text
      style={{ fontSize: '8px', padding: ' 0 0 2px 0' }}
      type={`link primary`}
    >
      Learn More
    </Text>
  )
}

const BuyNowPayLaterText = ({ price, priceCompareAt, minVariantPrice }) => {
  const quaterAmount = price ? price / 4 : priceCompareAt / 4
  const [providerName, setProviderName] = useState('')

  const formattedPrice = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(quaterAmount)

  return (
    <>
      <BuyNowPayLaterContainer>
        <Text type="smallText400" style={{ fontSize: '10px' }} as="div">
          {`4 payments of ${formattedPrice} with`}
          <br />
          <div
            style={{
              marginTop: 10,
              marginBottom: -10,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon type="afterpay" />{' '}
            <div onClick={() => setProviderName('afterpay')}>
              <LearnMore />
            </div>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon type="zip" />{' '}
            <div onClick={() => setProviderName('zip')}>
              <LearnMore />
            </div>
          </div>
        </Text>
      </BuyNowPayLaterContainer>
      <Modal open={providerName} setOpen={setProviderName} />
    </>
  )
}

const Modal = ({ open, setOpen }) => {
  const {
    allPrismicComponentModal: { edges: modalQueries },
  } = useStaticQuery(graphql`
    {
      allPrismicComponentModal {
        edges {
          node {
            uid
            data {
              main_image {
                url
                alt
              }
              modal_title {
                text
              }
              column_left {
                html
              }
              column_right {
                html
              }
              columns {
                image {
                  url
                  alt
                }
                column_title {
                  text
                }
                column_body {
                  text
                }
              }
            }
          }
        }
      }
    }
  `)
  let color = '#1F4066'
  const query = modalQueries.find(({ node }) => node.uid === open)

  console.log(query)

  if (open === 'zip') {
    color = '#F15C3F'
  }

  return (
    <PaymentDialog
      onClose={() => setOpen('')}
      aria-labelledby="payment-dialog-title"
      open={!!open}
    >
      <PaymentDialogTitle
        style={{
          borderBottomColor: '#FAC2A5',
        }}
        id="payment-dialog-title"
      >
        <Icon type={open} />
        <CloseIconContainer componentColor={color} onClick={() => setOpen('')}>
          <Icon type="clear" />
        </CloseIconContainer>
      </PaymentDialogTitle>
      <ModalContent componentColor={color}>
        {query?.node?.data?.modal_title?.text ? (
          <ModalContentTitle
            as="h2"
            style={{ fontWeight: 400 }}
            type="heading4"
          >
            {query.node.data.modal_title.text}
          </ModalContentTitle>
        ) : (
          ''
        )}
        {query?.node?.data?.columns?.length > 0 ? (
          <ModalContentColumns>
            {query.node.data.columns.map((column, index) => {
              return (
                <ModalContentColumnItem key={`${column.image.url}--${index}`}>
                  {column?.image?.url && (
                    <ModalContentColumnImage
                      src={column.image.url}
                      alt={column.image.alt}
                    />
                  )}
                  {column?.column_title?.text && (
                    <ModalContentColumnTitle as="h3" type="heading5">
                      {column.column_title.text}
                    </ModalContentColumnTitle>
                  )}
                  {column?.column_body?.text && (
                    <ModalContentColumnBody type="body" as="p">
                      {column.column_body.text}
                    </ModalContentColumnBody>
                  )}
                </ModalContentColumnItem>
              )
            })}
          </ModalContentColumns>
        ) : (
          ''
        )}
        <ModalContentColumns>
          {query?.node?.data?.column_left?.html && (
            <ModalContentColumn
              dangerouslySetInnerHTML={{
                __html: query.node.data.column_left.html,
              }}
            />
          )}
          {query?.node?.data?.column_right?.html && (
            <ModalContentColumn
              dangerouslySetInnerHTML={{
                __html: query.node.data.column_right.html,
              }}
            />
          )}
        </ModalContentColumns>
      </ModalContent>
    </PaymentDialog>
  )
}

Modal.propTypes = {
  open: PropTypes.string,
  setOpen: PropTypes.func,
}

BuyNowPayLaterText.propTypes = {
  priceCompareAt: PropTypes.any,
  price: PropTypes.any,
  minVariantPrice: PropTypes.object,
}

export default BuyNowPayLaterText
