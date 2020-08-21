import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { SubmitReviewButton } from './styles'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme, Form, FormActions } from '~/components/Connection/styles'
import Title from '~/components/Utilities/Title'
import Icon from '~/components/Icon'
import { ProductStarRating } from '~/components/StarRating/styles'
import AlertContext from '~/context/AlertContext'

const AddReview = ({ open, setOpen, ratingContext }) => {
  const alertContext = useContext(AlertContext)

  const changeHandler = e => {
    ratingContext?.setFormState({
      ...ratingContext?.formState,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    ratingContext?.setIsLoading(true)
    ratingContext?.setCreateReview(true)
  }

  useEffect(() => {
    ratingContext?.setIsLoading(false)

    if (ratingContext?.reviewCreated) {
      alertContext.setSuccessState(true)
      alertContext.setMessage(
        'Your review has been received and is pending moderation. Thank you!'
      )
      alertContext.setIsAlertOpen(true)

      setTimeout(() => {
        alertContext.setIsAlertOpen(false)
        alertContext.setSuccessState(false)
        setOpen(false)
      }, 4000);

    }
  }, [ratingContext?.reviewCreated])

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          <Title as="span" type="heading5">
            Add a review
          </Title>
          <div style={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>
            <Icon type="clear" />
          </div>
        </DialogTitle>
        <Form onSubmit={submitHandler}>
          <TextField
            id="name"
            type="text"
            name="name"
            label={'Fullname'}
            onChange={changeHandler}
            placeholder={'Enter your fullname'}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            id="email"
            type="email"
            name="email"
            label={'Email'}
            onChange={changeHandler}
            placeholder={'Enter your email'}
            fullWidth
            variant="outlined"
            required
          />
          <ProductStarRating
            style={{ marginBottom: 18 }}
            name="rating"
            onChange={changeHandler}
            value={ratingContext?.formState?.rating}
          />
          <TextField
            id="title"
            type="text"
            name="title"
            label={'Review Title'}
            onChange={changeHandler}
            placeholder={'Enter your review title'}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            id="body"
            type="textarea"
            name="body"
            label={'Review Message'}
            onChange={changeHandler}
            placeholder={'Enter your review message'}
            fullWidth
            variant="outlined"
            required
            multiline={true}
          />
          <FormActions>
            <SubmitReviewButton
              type="submit"
              isLoading={ratingContext?.isLoading}
              buttonStyle="tertiary"
            >
              Post your review
            </SubmitReviewButton>
          </FormActions>
        </Form>
      </Dialog>
    </ThemeProvider>
  )
}

AddReview.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  ratingContext: PropTypes.object,
}

export default AddReview
