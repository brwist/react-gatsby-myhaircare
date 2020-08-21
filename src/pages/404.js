import React from 'react'
import Footer from '~/components/Footer'
import SEO from '~/components/seo'
import { Container } from '~/utils/styles'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import Button from '~/components/Utilities/Button'
import Transition from '~/components/Transition'
import { useSearchContext } from '~/components/Search/context'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

const NotFoundPage = ({
  data: {
    prismicPage404: { data: query },
  },
}) => {
  const { setToggleSearch } = useSearchContext()

  return (
    <Transition>
      <Container
        style={{
          textAlign: 'center',
          margin: '40px auto 60px',
          minHeight: 500,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        className="section"
      >
        <SEO title="404: Not found" />
        {query?.title?.text && (
          <Title as="h1" type="heading1">
            {query.title.text}
          </Title>
        )}
        {query?.body?.text && (
          <Text style={{ marginBottom: 40 }} type="body" as="p">
            {query.body.text}
          </Text>
        )}
        <div>
          {query?.button_primary_text?.text && (
            <Button to="/contact" style={{ marginRight: 15 }}>
              {query.button_primary_text.text}
            </Button>
          )}
          {query?.button_primary_text?.text && (
            <Button clickHandler={() => setToggleSearch(true)}>
              {query.button_secondary_text.text}
            </Button>
          )}
        </div>
      </Container>
      <Footer />
    </Transition>
  )
}

export const query = graphql`
  {
    prismicPage404 {
      data {
        title {
          text
        }
        body {
          text
        }
        button_primary_text {
          text
        }
        button_secondary_text {
          text
        }
      }
    }
  }
`

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default NotFoundPage
