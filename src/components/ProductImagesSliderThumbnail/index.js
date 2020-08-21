import React from 'react'
import PropTypes from 'prop-types'
import { Desktop } from '~/components/Utilities/Media'
import { ProductImg } from '~/components/Templates/Product/styles'

const ProductImagesSliderThumbnail = ({ className, image, onClick }) => {
  return (
    <Desktop>
      <a
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
        className={`ProductThumbnail__Link ${className ? className : ''}`}
      >
        {image?.localFile?.childImageSharp?.fluid && !image?.originalSrc?.includes('.gif') ? (
          <ProductImg
            fluid={image.localFile.childImageSharp.fluid}
            alt={image.altText ? image.altText : ''}
          />
        ) : image?.originalSrc ? (
          <img src={image.originalSrc} alt={image.altText} />
        ) : (
          ''
        )}
      </a>
    </Desktop>
  )
}

ProductImagesSliderThumbnail.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default ProductImagesSliderThumbnail
