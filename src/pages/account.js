import React from 'react'
import PrivateRoute from '~/components/PrivateRoute'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import AccountLayout from '~/components/Pages/Account'

const Account = ({
  data: {
    prismicPageAccount: { data: query },
  },
}) => (
  <PrivateRoute>
    <AccountLayout query={query} />
  </PrivateRoute>
)

Account.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismicPageAccount {
      data {
        address_2_input_label {
          text
        }
        address_2_input_placeholder {
          text
        }
        address_add {
          text
        }
        address_delete {
          text
        }
        address_edit {
          text
        }
        address_input_label {
          text
        }
        address_input_placeholder {
          text
        }
        address_title {
          text
        }
        city_input_label {
          text
        }
        city_input_placeholder {
          text
        }
        company_input_label {
          text
        }
        company_input_placeholder {
          text
        }
        default_address {
          text
        }
        empty_addresses {
          text
        }
        empty_orders {
          text
        }
        empty_rewards {
          text
        }
        first_name_input_label {
          text
        }
        first_name_input_placeholder {
          text
        }
        last_name_input_label {
          text
        }
        last_name_input_placeholder {
          text
        }
        logout {
          text
        }
        order_date {
          text
        }
        order_fulfillment_status {
          text
        }
        order_number {
          text
        }
        order_payment_status {
          text
        }
        order_total {
          text
        }
        orders_title {
          text
        }
        phone_input_label {
          text
        }
        phone_input_placeholder {
          text
        }
        postal_code_input_label {
          text
        }
        postal_code_input_placeholder {
          text
        }
        province_input_label {
          text
        }
        province_input_placeholder {
          text
        }
        rewards_title {
          text
        }
        title {
          text
        }
      }
    }
  }
`

export default Account
