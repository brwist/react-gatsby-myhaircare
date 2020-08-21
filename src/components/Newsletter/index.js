import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  NewsletterContainer,
  NewsletterContent,
  NewsletterForm,
  NewsletterTitle,
  NewsletterInput,
  NewsletterBody,
  NewsletterFormMessage,
} from './styles'
import Button from '~/components/Utilities/Button'
import isEmail from 'validator/es/lib/isEmail'
import { graphql, useStaticQuery } from 'gatsby'

const Newsletter = ({ type = 'primary' }) => {
  const {
    newsletter: {
      data: {
        klaviyo_list_id,
        error_message,
        input_placeholder,
        newsletter_body,
        submit_button_text,
        thank_you_message,
        title,
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        newsletter: prismicComponentNewsletter {
          data {
            error_message {
              text
            }
            input_placeholder {
              text
            }
            klaviyo_list_id {
              text
            }
            newsletter_body {
              text
            }
            submit_button_text {
              text
            }
            thank_you_message {
              text
            }
            title {
              text
            }
          }
        }
      }
    `
  )
  const [formState, setFormState] = useState({})
  const [error, setError] = useState({
    state: '',
    message: '',
  })

  const submitHandler = async e => {
    e.preventDefault()

    if (!formState.email || (formState.email && !isEmail(formState.email))) {
      setError({
        state: true,
        message: error_message.text,
      })

      return setTimeout(() => {
        setError({
          state: '',
          message: '',
        })
      }, 3000)
    }

    const res = await fetch(
      `/.netlify/functions/klaviyo?email=${formState.email}&listId=${
        klaviyo_list_id ? klaviyo_list_id.text : 'TXXwbu'
      }`,
      {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
      }
    )

    if (res.status === 400) {
      setError({
        state: true,
        message: error_message.text,
      })

      return setTimeout(() => {
        setError({
          state: '',
          message: '',
        })
      }, 3000)
    }

    if (formState.email && isEmail(formState.email) && res.status === 200) {
      setError({
        state: false,
        message: thank_you_message?.text,
      })

      return setTimeout(() => {
        setError({
          state: '',
          message: '',
        })
      }, 3000)
    }
  }

  const changeHandler = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <NewsletterContainer className={`Newsletter ${type}`}>
      <NewsletterContent className="NewsletterContent" type={type}>
        {title ? (
          <NewsletterTitle
            className="NewsletterContent__Title"
            as="h2"
            type="heading5"
          >
            {title.text}
          </NewsletterTitle>
        ) : (
          ''
        )}
        {newsletter_body ? (
          <NewsletterBody
            className="NewsletterContent__Body"
            type="body"
            as="div"
          >
            {newsletter_body.text}
          </NewsletterBody>
        ) : (
          ''
        )}
        <NewsletterForm className="NewsletterForm" onSubmit={submitHandler}>
          <NewsletterInput
            name="email"
            onChange={changeHandler}
            className="NewsletterContent__Input"
            placeholder={input_placeholder.text}
            inputProps={{ 'aria-label': input_placeholder.text }}
            error={error.state}
          />
          {submit_button_text ? (
            <Button type="submit" buttonStyle="tertiary">
              {submit_button_text.text}
            </Button>
          ) : (
            ''
          )}
          {error.message ? (
            <NewsletterFormMessage as="div" type="body">
              {error.message}
            </NewsletterFormMessage>
          ) : (
            ''
          )}
        </NewsletterForm>
      </NewsletterContent>
    </NewsletterContainer>
  )
}

Newsletter.propTypes = {
  type: PropTypes.string,
}

export default Newsletter
