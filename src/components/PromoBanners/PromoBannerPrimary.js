import React from 'react'
import PropTypes from 'prop-types'
import Text from '~/components/Utilities/Text'
import { PromoBannerPrimaryContainer } from './styles'
import LinkFormatter from '~/components/LinkFormatter'

const PromoBannerPrimary = ({ query }) => {
  return (
    <PromoBannerPrimaryContainer>
      <LinkFormatter pageType={query.page_type} pageHandle={query.page_handle.text}>
        <Text
          type="smallText500"
          dangerouslySetInnerHTML={{ __html: query.body.html }}
        />
      </LinkFormatter>
    </PromoBannerPrimaryContainer>
  )
}

PromoBannerPrimary.propTypes = {
  query: PropTypes.object.isRequired,
}

export default PromoBannerPrimary
