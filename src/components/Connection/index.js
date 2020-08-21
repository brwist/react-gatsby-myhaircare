import React, { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { ThemeProvider } from '@material-ui/core/styles'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import TextField from '@material-ui/core/TextField'
import Button from '~/components/Utilities/Button'
import {
  theme,
  Form,
  FormActions,
  OtherFormContainer,
  FormText,
} from './styles'
import Icon from '~/components/Icon'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// graphql
import { useMutation } from '@apollo/client'
import {
  CREATE_SHOPIFY_CUSTOMER,
  LOGIN_SHOPIFY_CUSTOMER,
  RECOVER_PASSWORD_SHOPIFY_CUSTOMER,
  RESET_PASSWORD_SHOPIFY_CUSTOMER,
} from '~/utils/functions/graphql'
import CustomerContext from '~/context/CustomerContext'
import AlertContext from '~/context/AlertContext'

const Connection = ({ openLogin, setOpenLogin }) => {
  const {
    prismicComponentLogin: { data: query },
  } = useStaticQuery(graphql`
    {
      prismicComponentLogin {
        data {
          login_title {
            text
          }
          login_button {
            text
          }
          password_input_label {
            text
          }
          password_input_label1 {
            text
          }
          password_input_placeholder {
            text
          }
          password_input_placeholder1 {
            text
          }
          registration_button {
            text
          }
          registration_title {
            text
          }
          last_name_input_placeholder {
            text
          }
          last_name_input_label {
            text
          }
          first_name_input_placeholder {
            text
          }
          first_name_input_label {
            text
          }
          email_input_placeholder1 {
            text
          }
          email_input_placeholder {
            text
          }
          email_input_label1 {
            text
          }
          email_input_label {
            text
          }
          confirm_password_input_placeholder {
            text
          }
          confirm_password_input_label {
            text
          }
          not_registered {
            text
          }
          login_forgot_password {
            text
          }
          already_registered {
            text
          }
          accept_marketing {
            text
          }
          confirm_password_error_message {
            text
          }
          recover_password_title {
            text
          }
          recover_submit_button {
            text
          }
          recover_alert_message {
            text
          }
          reset_title {
            text
          }
          reset_submit_button {
            text
          }
          reset_alert_message {
            text
          }
          reset_password_input_placeholder {
            text
          }
        }
      }
    }
  `)
  const customerContext = useContext(CustomerContext)
  const alertContext = useContext(AlertContext)
  const [registrationView, setRegistrationView] = useState(false)
  const [recoverPasswordView, setRecoverPasswordView] = useState(false)
  const [resetPasswordView, setResetPasswordView] = useState(false)
  const passwordRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const confirmPasswordRef = useRef(null)
  const [formState, setFormState] = useState({
    acceptsMarketing: true,
  })
  const [createCustomer, { data }] = useMutation(CREATE_SHOPIFY_CUSTOMER)
  const [loginCustomer, { data: loginData }] = useMutation(
    LOGIN_SHOPIFY_CUSTOMER
  )
  const [recoverPasswordCustomer, { data: recoverPasswordData }] = useMutation(
    RECOVER_PASSWORD_SHOPIFY_CUSTOMER
  )
  const [resetPasswordCustomer, { data: resetPasswordData }] = useMutation(
    RESET_PASSWORD_SHOPIFY_CUSTOMER
  )

  //
  // Create Customer Use Effect
  //

  useEffect(() => {
    if (data) {
      setIsLoading(false)

      if (data?.customerCreate?.customerUserErrors?.[0]?.message) {
        alertContext.setMessage(
          data?.customerCreate?.customerUserErrors?.[0].message
        )
        alertContext.setIsAlertOpen(true)

        setTimeout(() => {
          alertContext.setIsAlertOpen(false)
        }, 3000)
      } else if (data?.customerCreate?.customer) {
        loginCustomer({
          variables: {
            input: {
              email: formState?.email,
              password: formState?.password,
            },
          },
        })
      }
    }
  }, [data])

  //
  // Customer Login Use Effect
  //

  useEffect(() => {
    if (loginData) {
      setIsLoading(false)

      if (
        loginData?.customerAccessTokenCreate?.customerUserErrors?.[0]?.message
      ) {
        alertContext.setMessage(
          loginData.customerAccessTokenCreate.customerUserErrors[0].message
        )
        alertContext.setIsAlertOpen(true)

        setTimeout(() => {
          alertContext.setIsAlertOpen(false)
        }, 3000)
      } else if (loginData?.customerAccessTokenCreate?.customerAccessToken) {
        customerContext.setLoggedInLocalStorage({
          ...customerContext.loggedInLocalStorage,
          ...loginData?.customerAccessTokenCreate?.customerAccessToken,
        })
        setOpenLogin(false)
        navigate('/account')

        return () =>
          setFormState({
            acceptsMarketing: true,
          })
      }
    }
  }, [loginData])

  //
  // Password Recovery Use Effect
  //

  useEffect(() => {
    if (recoverPasswordData?.customerRecover?.customerUserErrors.length === 0) {
      alertContext.setSuccessState(true)
      alertContext.setMessage(
        query?.recover_alert_message?.text
          ? query.recover_alert_message.text
          : 'You should receive an email from us momentarily'
      )
      alertContext.setIsAlertOpen(true)
    }

    setTimeout(() => {
      alertContext.setIsAlertOpen(false)
      alertContext.setSuccessState(false)
    }, 3000)
  }, [recoverPasswordData])

  const loginHandler = e => {
    e.preventDefault()
    setIsLoading(true)

    loginCustomer({
      variables: {
        input: {
          email: formState?.email,
          password: formState?.password,
        },
      },
    })
  }

  //
  // Passwork Reset Use Effect
  //

  useEffect(() => {
    if (resetPasswordData?.customerResetByUrl?.customer?.id) {
      alertContext.setSuccessState(true)
      alertContext.setMessage(
        query?.reset_alert_message?.text
          ? query.reset_alert_message.text
          : 'Success! Your password has been updated'
      )
      alertContext.setIsAlertOpen(true)

      setTimeout(() => {
        customerContext.setLoggedInLocalStorage({
          ...customerContext.loggedInLocalStorage,
          ...resetPasswordData?.customerResetByUrl?.customerAccessToken,
        })
        alertContext.setIsAlertOpen(false)
        alertContext.setSuccessState(false)
        setOpenLogin(false)
        navigate('/account')
      }, 2000)
    } else if (
      resetPasswordData?.customerResetByUrl?.customerUserErrors?.[0]?.message
    ) {
      alertContext.setMessage(
        resetPasswordData.customerResetByUrl.customerUserErrors[0].message
      )
      alertContext.setIsAlertOpen(true)
    }
  }, [resetPasswordData])

  useEffect(() => {
    if (customerContext.hasResetPasswordURL) {
      setRecoverPasswordView(false)
      setRegistrationView(false)
      setResetPasswordView(true)
      setOpenLogin(true)
    }
  }, [customerContext.hasResetPasswordURL])

  const validatePassword = () => {
    const passwordInput = passwordRef?.current.querySelector('input')
    const confirmPasswordInput = confirmPasswordRef?.current.querySelector(
      'input'
    )

    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity(
        query?.confirm_password_error_message?.text
          ? query.confirm_password_error_message.text
          : 'Passwords are not matching'
      )
    } else {
      confirmPasswordInput.setCustomValidity('')
    }
  }

  const registrationHandler = e => {
    e.preventDefault()
    setIsLoading(true)

    createCustomer({
      variables: {
        input: {
          acceptsMarketing: formState?.acceptsMarketing,
          email: formState?.email,
          firstName: formState?.firstName,
          lastName: formState?.lastName,
          password: formState?.password,
        },
      },
    })
  }

  const changeHandler = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const recoverPasswordHandler = e => {
    e.preventDefault()

    recoverPasswordCustomer({
      variables: {
        email: formState?.email,
      },
    })
  }

  const resetPasswordHandler = e => {
    e.preventDefault()

    if (!customerContext.hasResetPasswordURL) return

    resetPasswordCustomer({
      variables: {
        resetUrl: customerContext.hasResetPasswordURL,
        password: formState?.password,
      },
    })
  }

  const inputProps = {
    changeHandler,
    query,
    formState,
    setFormState,
    passwordRef,
    confirmPasswordRef,
    validatePassword,
  }

  //
  // View Content Switching Logic
  //

  //
  // Title & Form Handler & Form Inputs & Submit Button Password
  //

  let title = query?.login_title?.text
  let inputs = <LoginInputs {...inputProps} />
  let formHandler = loginHandler
  let submitButtonText = query?.login_button?.text

  if (registrationView) {
    title = query?.registration_title?.text
    formHandler = registrationHandler
    inputs = <RegistrationInputs {...inputProps} />
    submitButtonText = query?.registration_button?.text
  } else if (!registrationView && recoverPasswordView) {
    title = query?.recover_password_title?.text
      ? query.recover_password_title.text
      : 'Forgot Password?'
    formHandler = recoverPasswordHandler
    inputs = <ForgotPasswordInput {...inputProps} />
    submitButtonText = query?.recover_submit_button?.text
      ? query.recover_submit_button.text
      : 'Reset password'
  } else if (resetPasswordView && !registrationView && !recoverPasswordView) {
    title = query?.reset_title?.text ? query.reset_title.text : 'Reset Password'
    formHandler = resetPasswordHandler
    inputs = <ResetPasswordInput {...inputProps} />
    submitButtonText = query?.reset_submit_button?.text
      ? query.reset_submit_button.text
      : 'Update password'
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        onClose={() => {
          setOpenLogin(false)
          setRegistrationView(false)
          setRecoverPasswordView(false)
          setResetPasswordView(false)
        }}
        aria-labelledby="simple-dialog-title"
        open={openLogin}
      >
        <DialogTitle id="simple-dialog-title">
          <Title as="span" type="heading5">
            {title}
          </Title>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenLogin(false)
              setRegistrationView(false)
              setRecoverPasswordView(false)
              setResetPasswordView(false)
            }}
          >
            <Icon type="clear" />
          </div>
        </DialogTitle>
        <Form onSubmit={formHandler}>
          {inputs}
          <FormActions>
            <Button type="submit" isLoading={isLoading} buttonStyle="tertiary">
              {submitButtonText}
            </Button>
            <OtherFormContainer>
              <FormText>
                {!registrationView
                  ? query?.not_registered?.text
                  : query?.already_registered?.text}
              </FormText>
              <Button
                clickHandler={() => {
                  setResetPasswordView(false)
                  setRecoverPasswordView(false)
                  setRegistrationView(!registrationView)
                }}
                buttonStyle="secondary"
              >
                {!registrationView
                  ? query?.registration_button?.text
                  : query?.login_button?.text}
              </Button>
            </OtherFormContainer>
          </FormActions>
          {!registrationView && !recoverPasswordView && !resetPasswordView ? (
            <div
              onClick={() => {
                setResetPasswordView(false)
                setRegistrationView(false)
                setRecoverPasswordView(true)
              }}
              style={{ cursor: 'pointer' }}
            >
              <Text>{query?.login_forgot_password?.text}</Text>
            </div>
          ) : (
            ''
          )}
        </Form>
      </Dialog>
    </ThemeProvider>
  )
}

Connection.propTypes = {
  openLogin: PropTypes.bool,
  setOpenLogin: PropTypes.func,
}

export default Connection

const ForgotPasswordInput = ({ query, changeHandler }) => {
  return (
    <TextField
      id="forgot-password-email"
      type="email"
      name="email"
      label={
        query?.email_input_label?.text
          ? query?.email_input_label?.text
          : 'Email'
      }
      onChange={changeHandler}
      placeholder={
        query?.email_input_placeholder?.text
          ? query?.email_input_placeholder?.text
          : 'Enter your email'
      }
      fullWidth
      variant="outlined"
      required
    />
  )
}

ForgotPasswordInput.propTypes = {
  query: PropTypes.object,
  changeHandler: PropTypes.func,
}

const ResetPasswordInput = ({ query, changeHandler }) => {
  return (
    <TextField
      id="reset-password"
      type="password"
      name="password"
      label={
        query?.password_input_label?.text
          ? query?.password_input_label?.text
          : 'Password'
      }
      onChange={changeHandler}
      placeholder={
        query?.reset_password_input_placeholder?.text
          ? query?.reset_password_input_placeholder?.text
          : 'Enter your new password'
      }
      fullWidth
      variant="outlined"
      required
    />
  )
}

ResetPasswordInput.propTypes = {
  query: PropTypes.object,
  changeHandler: PropTypes.func,
}

const LoginInputs = ({ query, changeHandler }) => {
  return (
    <>
      <TextField
        id="login-email"
        type="email"
        name="email"
        label={
          query?.email_input_label?.text
            ? query?.email_input_label?.text
            : 'Email'
        }
        onChange={changeHandler}
        placeholder={
          query?.email_input_placeholder?.text
            ? query?.email_input_placeholder?.text
            : 'Enter your email'
        }
        fullWidth
        variant="outlined"
        required
      />
      <TextField
        id="login-password"
        type="password"
        name="password"
        label={
          query?.password_input_label?.text
            ? query?.password_input_label?.text
            : 'Password'
        }
        onChange={changeHandler}
        placeholder={
          query?.password_input_placeholder?.text
            ? query?.password_input_placeholder?.text
            : 'Enter your password'
        }
        fullWidth
        variant="outlined"
        required
      />
    </>
  )
}

LoginInputs.propTypes = {
  query: PropTypes.object,
  changeHandler: PropTypes.func,
}

const RegistrationInputs = ({
  query,
  changeHandler,
  formState,
  setFormState,
  passwordRef,
  confirmPasswordRef,
  validatePassword,
}) => {
  return (
    <>
      <TextField
        id="register-firstname"
        label={
          query?.first_name_input_label?.text
            ? query?.first_name_input_label?.text
            : 'First name'
        }
        placeholder={
          query?.first_name_input_placeholder?.text
            ? query?.first_name_input_placeholder?.text
            : 'Enter your first name'
        }
        onChange={changeHandler}
        fullWidth
        variant="outlined"
        name="firstName"
        required
      />
      <TextField
        id="register-lastname"
        label={
          query?.last_name_input_label?.text
            ? query?.last_name_input_label?.text
            : 'Last name'
        }
        placeholder={
          query?.last_name_input_placeholder?.text
            ? query?.last_name_input_placeholder?.text
            : 'Enter your last name'
        }
        onChange={changeHandler}
        fullWidth
        variant="outlined"
        name="lastName"
        required
      />
      <TextField
        id="register-email"
        label={
          query?.email_input_label1?.text
            ? query?.email_input_label1?.text
            : 'Email'
        }
        placeholder={
          query?.email_input_placeholder1?.text
            ? query?.email_input_placeholder1?.text
            : 'Enter your email'
        }
        onChange={changeHandler}
        fullWidth
        variant="outlined"
        name="email"
        type="email"
      />
      <TextField
        id="register-password"
        label={
          query?.password_input_label1?.text
            ? query?.password_input_label1?.text
            : 'Password'
        }
        onChange={changeHandler}
        placeholder={
          query?.password_input_placeholder1?.text
            ? query?.password_input_placeholder1?.text
            : 'Enter your password'
        }
        fullWidth
        variant="outlined"
        name="password"
        type="password"
        onBlur={validatePassword}
        ref={passwordRef}
        required
      />
      <TextField
        id="register-confirm-password"
        label={
          query?.confirm_password_input_label?.text
            ? query?.confirm_password_input_label?.text
            : 'Confirm Password'
        }
        onChange={changeHandler}
        placeholder={
          query?.confirm_password_input_placeholder?.text
            ? query?.confirm_password_input_placeholder?.text
            : 'Confirm your password'
        }
        fullWidth
        variant="outlined"
        type="password"
        name="confirmPassword"
        ref={confirmPasswordRef}
        onKeyUp={validatePassword}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formState.acceptsMarketing}
            onChange={e => {
              setFormState({
                ...formState,
                [e.target.name]: !formState.acceptsMarketing,
              })
            }}
            name="acceptsMarketing"
          />
        }
        label={query?.accept_marketing?.text}
      />
    </>
  )
}

RegistrationInputs.propTypes = {
  query: PropTypes.object,
  changeHandler: PropTypes.func,
  formState: PropTypes.any,
  setFormState: PropTypes.func,
  passwordRef: PropTypes.any,
  confirmPasswordRef: PropTypes.any,
  validatePassword: PropTypes.func,
}
