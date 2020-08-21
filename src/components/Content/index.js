import React from 'react'
import PropTypes from 'prop-types'
import {
  ContentContainer,
  ContentTitle,
  ContentText,
  ContentImage,
} from './styles'

const Content = ({ query, halfWidth }) => {
  const { title, body, image } = query

  return (
    <ContentContainer halfWidth={halfWidth}>
      {title && <ContentTitle as="h1" type="heading3">{title}</ContentTitle>}
      {image && <ContentImage fluid={image} />}
      {body && <ContentText as="div" dangerouslySetInnerHTML={{ __html: body }} />}
    </ContentContainer>
  )
}

Content.propTypes = {
  query: PropTypes.object,
  halfWidth: PropTypes.bool,
}

export default Content
