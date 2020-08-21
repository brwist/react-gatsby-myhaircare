import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from '~/components/Icon'
import Title from '~/components/Utilities/Title'
import { AlertBody, AlertContent } from './styles'
import { withStyles } from '@material-ui/core/styles'

const AlertDialog = withStyles({
  paperWidthSm: {
    border: '1px solid red',
    maxWidth: '300px !important',
    width: '100%',
    background: '#ffffff',
    borderRadius: '0 !important',
    '& svg': {
      '& *': {
        fill: 'red',
      },
    },
  },
})(Dialog)

const AlertDialogSuccess = withStyles({
  paperWidthSm: {
    border: '1px solid #109648',
    maxWidth: '300px !important',
    width: '100%',
    background: '#ffffff',
    borderRadius: '0 !important',
    '& svg': {
      '& *': {
        fill: '#109648',
      },
    },
  },
})(Dialog)

const AlertTitle = withStyles({
  root: {
    padding: 18,
    borderBottom: `1px solid red`,
  },
})(DialogTitle)

const AlertTitleSuccess = withStyles({
  root: {
    padding: 18,
    borderBottom: `1px solid #109648`,
  },
})(DialogTitle)

const Alert = ({ message, isAlertOpen, setIsAlertOpen, successState }) => {
  const alertTitleContent = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Title
        style={{ display: 'inline-block', width: '100%' }}
        as="span"
        type="heading5"
      >
        Notice
      </Title>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={() => setIsAlertOpen(false)}
      >
        <Icon type="clear" />
      </div>
    </div>
  )

  const alertProps = {
    alertTitleContent,
    isAlertOpen,
    setIsAlertOpen,
  }

  return successState ? (
    <AlertSuccess {...alertProps}>
      <AlertContent>
        <AlertBody type="smallText400">{message}</AlertBody>
      </AlertContent>
    </AlertSuccess>
  ) : (
    <AlertError {...alertProps}>
      <AlertContent>
        <AlertBody type="smallText400">{message}</AlertBody>
      </AlertContent>
    </AlertError>
  )
}

Alert.propTypes = {
  message: PropTypes.string,
  isAlertOpen: PropTypes.bool,
  setIsAlertOpen: PropTypes.func,
  successState: PropTypes.bool,
}

export default Alert

const AlertError = ({ children, alertTitleContent, isAlertOpen, setIsAlertOpen }) => {
  return (
    <AlertDialog
      onClose={() => setIsAlertOpen(false)}
      aria-labelledby="alert-title"
      open={isAlertOpen}
    >
      <AlertTitle id="alert-title">{alertTitleContent}</AlertTitle>
      {children}
    </AlertDialog>
  )
}

AlertError.propTypes = {
  children: PropTypes.object,
  alertTitleContent: PropTypes.any,
  setIsAlertOpen: PropTypes.func,
  isAlertOpen: PropTypes.bool,
}

const AlertSuccess = ({ children, alertTitleContent, isAlertOpen, setIsAlertOpen }) => {
  return (
    <AlertDialogSuccess
      onClose={() => setIsAlertOpen(false)}
      aria-labelledby="alert-title"
      open={isAlertOpen}
    >
      <AlertTitleSuccess id="alert-title">
        {alertTitleContent}
      </AlertTitleSuccess>
      {children}
    </AlertDialogSuccess>
  )
}

AlertSuccess.propTypes = {
  children: PropTypes.object,
  alertTitleContent: PropTypes.any,
  setIsAlertOpen: PropTypes.func,
  isAlertOpen: PropTypes.bool,
}
