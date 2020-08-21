import React from 'react'
import PropTypes from 'prop-types'
import {
  ColumnItemTitle,
  ColumnItemText,
  ColumnItemImage,
  ColumnItemContainer,
} from './styles'
import { StyledLink } from '~/utils/styles'

const ColumnItem = ({
  query: {
    title,
    button: { text: buttonText, handle: buttonHandle, pageType },
    body,
    image,
  },
}) => {
  return (
    <ColumnItemContainer>
      {image && <ColumnItemImage fluid={image} />}
      {title && (
        <ColumnItemTitle as="h3" type="heading5">
          {title}
        </ColumnItemTitle>
      )}
      {body && (
        <ColumnItemText
          as="div"
          type="body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {buttonHandle && pageType && buttonText && (
        <StyledLink
          pageHandle={buttonHandle}
          pageType={pageType}
          className={`Link secondary`}
        >
          {buttonText}
        </StyledLink>
      )}
    </ColumnItemContainer>
  )
}

ColumnItem.propTypes = {
  query: PropTypes.object,
}

export default ColumnItem
