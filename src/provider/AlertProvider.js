import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AlertContext from '~/context/AlertContext'
import Alert from '~/components/Alert'

const AlertProvider = ({ children }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [successState, setSuccessState] = useState(false)

  const valueProps = {
    isAlertOpen,
    setIsAlertOpen,
    setMessage,
    message,
    successState,
    setSuccessState,
  }

  return (
    <AlertContext.Provider
      value={{...valueProps}}
    >
      <>
        {children}
        <Alert
          {...valueProps}
        />
      </>
    </AlertContext.Provider>
  )
}

AlertProvider.propTypes = {
  children: PropTypes.any,
}

export default AlertProvider
