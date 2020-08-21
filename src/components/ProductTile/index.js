import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  ProductTileContainer,
  ProductTileImage,
  ProductTileTitle,
  ProductTileContent,
  ImageContainer,
  PriceContainer,
  DiscontinuedBadge,
  DiscontinuedBadgeText,
} from './styles'
import Text from '~/components/Utilities/Text'
import { graphql, useStaticQuery } from 'gatsby'
import StarRating from '~/components/StarRating'

const ProductTile = ({ query, className, noCTA = false }) => {
  const [isDiscontinued, setIsDiscontinued] = useState(false)
  const [isLimitedEdition, setIsLimitedEdition] = useState(false)
  const { prismicPageHomeBodyProductSlider } = useStaticQuery(
    graphql`
      query {
        prismicPageHomeBodyProductSlider {
          primary {
            cta_text {
              text
            }
          }
        }
      }
    `
  )

  const {
    title,
    handle,
    vendor,
    minVariantPrice,
    initialVariant,
    images,
    tags,
  } = query

  const [variant] = useState({ ...initialVariant })

  useEffect(() => {
    if (tags?.includes('Discontinued') && !variant.availableForSale) {
      setIsDiscontinued(true)
    } else {
      setIsDiscontinued(false)
    }

    if (tags?.includes('Limited Edition')) {
      setIsLimitedEdition(true)
    }
  }, [variant])

  const {
    primary: { cta_text },
  } = prismicPageHomeBodyProductSlider

  let image

  if ((images?.originalSrc || images[0]?.originalSrc) && images[0]?.originalSrc?.includes('.gif')) {
    image = (
      <img
        className="ProductTileImage"
        src={images.originalSrc || images[0].originalSrc}
        alt={images.altText}
      />
    )
  }

  if (images?.[0]?.localFile?.childImageSharp?.fluid) {
    image = (
      <ProductTileImage
        className="ProductTileImage"
        fluid={images[0].localFile.childImageSharp?.fluid}
      />
    )
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  let priceCompareAt = ''

  if (variant?.compareAtPrice) {
    priceCompareAt = Intl.NumberFormat(undefined, {
      currency: minVariantPrice.currencyCode,
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(variant.compareAtPrice)
  }

  return (
    <ProductTileContainer
      pageHandle={handle}
      pageType={'product'}
      className={`ProductTileContainer ${className ? className : ''}`}
    >
      {isLimitedEdition && !isDiscontinued && (
        <DiscontinuedBadge>
          <DiscontinuedBadgeText type="smallText400">
            Limited Edition
          </DiscontinuedBadgeText>
        </DiscontinuedBadge>
      )}
      {isDiscontinued && (
        <DiscontinuedBadge>
          <DiscontinuedBadgeText type="smallText400">
            Discontinued
          </DiscontinuedBadgeText>
        </DiscontinuedBadge>
      )}
      <ImageContainer>{image}</ImageContainer>
      <ProductTileContent>
        <StarRating
          style={{ justifyContent: 'center' }}
          handle={handle}
          hideText
        />
        {vendor ? (
          <Text as="h4" type="smallText700">
            {vendor}
          </Text>
        ) : (
          ''
        )}
        {title ? (
          <ProductTileTitle className="Title">{title}</ProductTileTitle>
        ) : (
          ''
        )}
        <PriceContainer>
          <Text as="h4" type="smallText700">
            {price}
          </Text>
          {priceCompareAt && price < priceCompareAt ? (
            <Text as="h4" type="smallText700" className="CompareAtPrice">
              {priceCompareAt}
            </Text>
          ) : (
            ''
          )}
        </PriceContainer>
        {cta_text && !noCTA ? (
          <Text as="h4" type="link secondary">
            {cta_text.text}
          </Text>
        ) : (
          ''
        )}
      </ProductTileContent>
    </ProductTileContainer>
  )
}

ProductTile.propTypes = {
  query: PropTypes.object.isRequired,
  className: PropTypes.string,
  noCTA: PropTypes.bool,
}

export default ProductTile
