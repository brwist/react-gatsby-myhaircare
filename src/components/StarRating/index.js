import React, { useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  ProductStarRating,
  ProductStarRatingText,
  ProductStarRatingContainer,
} from './styles'
import { GET_SHOPIFY_PRODUCT_BY_HANDLE } from '~/utils/functions/graphql'
import { useQuery } from '@apollo/client'
import DotLoader from 'react-spinners/DotLoader'
import { theme as localTheme } from '~/utils/styles'
import RatingContext from '~/context/RatingContext'

const StarRating = ({ handle, className, style = {}, hideText = false }) => {
  const ratingContext = useContext(RatingContext)
  const badgeRef = useRef(null)
  const { loading, data: productByHandleData } = useQuery(
    GET_SHOPIFY_PRODUCT_BY_HANDLE,
    {
      variables: { handle },
    }
  )

  useEffect(() => {
    if (productByHandleData) {
      ratingContext?.setAverageReviewRating(
        badgeRef?.current?.querySelector('[data-average-rating]')?.dataset
          ?.averageRating
      )

      ratingContext?.setNumberOfReviews(
        badgeRef?.current?.querySelector('[data-number-of-reviews]')?.dataset
          ?.numberOfReviews
      )

      ratingContext?.setMetafields(productByHandleData?.productByHandle)
    }
  }, [productByHandleData])

  const badge = productByHandleData?.productByHandle?.metafields?.edges?.find(
    metafield => {
      return metafield.node.key === 'badge'
    }
  )

  console.log(ratingContext)

  return (
    <>
      <div
        ref={badgeRef}
        dangerouslySetInnerHTML={{ __html: badge?.node?.value }}
      ></div>
      <ProductStarRatingContainer className={className ? className : ''} style={style}>
        {loading ? (
          <div className="DotLoader">
            <DotLoader
              size={15}
              color={localTheme.colors.tertiary}
              loading={loading}
            />
          </div>
        ) : !loading && (
          <>
            <ProductStarRating readOnly={true} value={+ratingContext?.averageReviewRating} />
            {!hideText ? (
              <ProductStarRatingText type="smallText500">{`${ratingContext?.averageReviewRating} from ${ratingContext?.numberOfReviews} ${
                ratingContext?.numberOfReviews > 1 ? 'reviews' : 'review'
              }`}</ProductStarRatingText>
            ) : (
              ''
            )}
          </>
        )}
      </ProductStarRatingContainer>
    </>
  )
}

StarRating.propTypes = {
  handle: PropTypes.string,
  style: PropTypes.object,
  hideText: PropTypes.bool,
  className: PropTypes.string,
}

export default StarRating
