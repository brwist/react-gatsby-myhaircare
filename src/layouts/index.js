import PropTypes from 'prop-types'
import React from 'react'
import Footer from '~/components/Footer'
import { TopContainer } from '~/utils/styles'

const Layout = ({ children }) => {
  return (
    <TopContainer>
      {children}
      <Footer />
    </TopContainer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
