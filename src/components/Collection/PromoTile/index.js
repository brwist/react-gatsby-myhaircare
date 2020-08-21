import React from 'react'
import PropTypes from 'prop-types'
import { PromoTileContainer, PromoCodeCaption, PromoBody, PromoImage } from './styles'

const PromoTile = ({ query }) => {
  return (
    <PromoTileContainer>
      {query.promotion_body ? (
        <PromoBody
          dangerouslySetInnerHTML={{
            __html: query.promotion_body.html,
          }}
        />
      ) : (
        ''
      )}
      {query.promotion_code_caption ? (
        <PromoCodeCaption
          type="bigText400"
          as="div"
          dangerouslySetInnerHTML={{
            __html: query.promotion_code_caption.html,
          }}
        />
      ) : (
        ''
      )}
      {query.image?.localFile?.childImageSharp?.fluid ? (
        <PromoImage fluid={query.image?.localFile?.childImageSharp?.fluid} />
      ) : (
        ''
      )}
    </PromoTileContainer>
  )
}

PromoTile.propTypes = {
  query: PropTypes.object,
}

export default PromoTile
