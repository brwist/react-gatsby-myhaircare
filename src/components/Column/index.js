import React from 'react'
import PropTypes from 'prop-types'
import { ColumnContainer, ColumnTitle } from './styles'

const Content = ({ children, halfWidth, query: { title } }) => {
  return (
    <ColumnContainer halfWidth={halfWidth}>
      {title && <ColumnTitle as="h2" type="heading3">{title}</ColumnTitle>}
      {children}
    </ColumnContainer>
  )
}

Content.propTypes = {
  children: PropTypes.any,
  halfWidth: PropTypes.bool,
  query: PropTypes.object,
}

export default Content
