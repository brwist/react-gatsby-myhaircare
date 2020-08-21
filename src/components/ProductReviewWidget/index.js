import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ReviewWidgetContainer,
  ReviewsContainer,
  ReviewContainer,
  ReviewTitle,
  ReviewText,
  ReviewButton,
  ReviewsOverview,
  AddReviewButton,
} from './styles'
import { ProductStarRating } from '~/components/StarRating/styles'
import RatingContext from '~/context/RatingContext'
import StarRating from '~/components/StarRating'
import moment from 'moment'
import AddReview from '~/components/AddReview'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

const ProductReviewWidget = ({ handle }) => {
  const ratingContext = useContext(RatingContext)
  const [singleProductReviews, setSingleProductReviews] = useState([])
  const [open, setOpen] = useState(false)
  const [showMore, setShowMore] = useState({
    visibleProducts: 5,
  })

  useEffect(() => {
    if (handle && ratingContext) {
      ratingContext.setHandle(handle)
    }
  }, [ratingContext, handle])

  useEffect(() => {
    if (ratingContext.handle) {
      const today = moment(new Date())
        .utc()
        .format('YYYY-MM-DD')
      const reviews = []

      ratingContext?.reviews?.value?.reviews.forEach(review => {
        const date = moment(review.created_at)
          .utc()
          .format('YYYY-MM-DD')

        const end = moment(date, 'YYYY-MM-DD')
        const start = moment(today, 'YYYY-MM-DD')

        const query = {
          date: +moment.duration(start.diff(end)).asDays(),
          fullName: review.reviewer.name,
          rating: review.rating,
          title: review.title,
          body: review.body,
          curated: review.curated,
          featured: review.featured,
          hidden: review.hidden,
          verified: review.verified,
        }

        reviews.push(query)
      })

      if (singleProductReviews.length > 0) {
        setSingleProductReviews([...singleProductReviews, ...reviews])
      } else {
        setSingleProductReviews([...reviews])
      }
    }
  }, [ratingContext?.reviews?.value])

  const revealMoreReviews = () => {
    ratingContext?.setPage(ratingContext?.page + 1)
    setShowMore(prevState => ({
      ...prevState,
      visibleProducts: prevState.visibleProducts + 5,
    }))
  }

  return (
    <>
      <ReviewsContainer>
        <AddReviewButton
          numberOfReviews={ratingContext?.numberOfReviews}
          clickHandler={() => setOpen(true)}
        >
          Add a review
        </AddReviewButton>
        <ReviewsOverview>
          <ReviewTitle as="h3" style={{ marginBottom: 10 }} type="heading5">
            Customer Reviews
          </ReviewTitle>
          <StarRating className="StarRating" handle={handle} />
          {ratingContext?.numberOfReviews > 0 ? (
            <ReviewText type="smallText500" style={{ marginBottom: 20 }}>
              {`${((ratingContext?.averageReviewRating / 5) * 100).toFixed(
                0
              )}% RECOMMEND THIS PRODUCT`}
            </ReviewText>
          ) : (
            ''
          )}
          <ReviewWidgetContainer
            dangerouslySetInnerHTML={{
              __html: ratingContext?.getWidget?.value?.widget,
            }}
          />
        </ReviewsOverview>
        {singleProductReviews.length > 0 ? (
          singleProductReviews.map((review, index) => {
            return (
              <ReviewContainer
                className={`ReviewContainer ${
                  showMore.visibleProducts > index
                    ? 'display-block'
                    : 'display-none'
                } ${index === 0 ? 'is-first' : ''}`}
                key={`${review.title}--${index}`}
              >
                {index < 3 && (
                  <ReviewText
                    className={'ReviewTagline'}
                    style={{ marginBottom: 12 }}
                    type="smallText500"
                  >
                    Most Recent
                  </ReviewText>
                )}
                <ReviewText
                  as="h4"
                  style={{ marginBottom: 12, position: 'relative' }}
                  type="body"
                >
                  {`${review.title} - ${
                    review.fullName ? `${review.fullName} -` : ''
                  } ${review.date} ${review.date === 1 ? 'day' : 'days'} ago`}
                  {review.verified === 'buyer' ? (
                    <VerifiedUserIcon
                      style={{ marginLeft: 5 }}
                      fontSize={'small'}
                    />
                  ) : (
                    ''
                  )}
                </ReviewText>
                <ProductStarRating readOnly={true} value={review.rating} />
                <ReviewText style={{ fontWeight: 300, marginTop: 10 }}>
                  {review.body}
                </ReviewText>
              </ReviewContainer>
            )
          })
        ) : (
          <ReviewContainer style={{ borderTop: 0, paddingTop: 0 }}>
            <ReviewText style={{ fontWeight: 300 }}>
              No review for this product
            </ReviewText>
          </ReviewContainer>
        )}
        {ratingContext?.reviews?.value?.per_page ===
          ratingContext?.reviews?.value?.reviews?.length > 0 && (
          <ReviewButton buttonStyle="tertiary" clickHandler={revealMoreReviews}>
            Read More Reviews
          </ReviewButton>
        )}
      </ReviewsContainer>
      <AddReview ratingContext={ratingContext} open={open} setOpen={setOpen} />
    </>
  )
}

ProductReviewWidget.propTypes = {
  handle: PropTypes.string,
  product: PropTypes.object,
}

export default ProductReviewWidget
