/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Search from '~/components/Search'
import CartFlyout from '~/components/CartFlyout'
import Connection from '~/components/Connection'
import CustomerContext from '~/context/CustomerContext'

const Wrapper = styled.div``

const Layout = ({ children }) => {
  const customerContext = useContext(CustomerContext)

  return (
    <Wrapper>
      {children}
      {/* <Transition></Transition> */}
      <Search />
      <CartFlyout />
      <Connection openLogin={customerContext?.openLogin} setOpenLogin={customerContext?.setOpenLogin} />
    </Wrapper>
  )
}

export { Layout }

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
}
