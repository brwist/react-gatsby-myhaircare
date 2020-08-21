import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import CustomerContext from '~/context/CustomerContext'
import { PrivateRouteContainer } from './styles'

const PrivateRoute = ({ children, ...rest }) => {
  const customerContext = useContext(CustomerContext)

  useEffect(() => {
    if (!customerContext?.loggedInLocalStorage?.accessToken) {
      navigate('/')
    }
  }, [])

  return (
    <PrivateRouteContainer {...rest}>
      {customerContext?.loggedInLocalStorage?.accessToken ? children : ''}
    </PrivateRouteContainer>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
  rest: PropTypes.any,
}

export default PrivateRoute
