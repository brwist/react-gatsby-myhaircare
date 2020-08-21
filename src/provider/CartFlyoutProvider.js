import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CartFlyoutContext from '~/context/CartFlyoutContext'

const CartFlyoutProvider = ({ children }) => {
  const [toggleDrawer, setToggleDrawer] = useState(false)

  return (
    <CartFlyoutContext.Provider
      value={{
        toggleDrawer,
        setToggleDrawer,
      }}
    >
      {children}
    </CartFlyoutContext.Provider>
  )
}

CartFlyoutProvider.propTypes = {
  children: PropTypes.any,
}

export default CartFlyoutProvider
