import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import RatingContext from '~/context/RatingContext'
import { useAsync } from 'react-use'

const RatingProvider = ({ children }) => {
  const [metafields, setMetafields] = useState(null)
  const [handle, setHandle] = useState('')
  const [allReviews, setAllReviews] = useState({
    count: '',
    avgRating: '',
  })
  const [averageReviewRating, setAverageReviewRating] = useState(null)
  const [numberOfReviews, setNumberOfReviews] = useState(null)
  const [createReview, setCreateReview] = useState(false)
  const [reviewCreated, setReviewCreated] = useState(false)
  const [productId, setProductId] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    body: '',
    url: 'myhaircarebeauty.myshopify.com',
    platform: 'shopify',
    id: '',
  })

  const state = useAsync(async () => {
    if (productId && handle && page) {
      const response = await fetch(
        `/.netlify/functions/reviews?page=${page}&handle=${handle}&id=${productId}&endpoint=get_product_reviews`,
        {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
        }
      )
      const result = await response.json()
      return result
    }
  }, [productId, page])

  useEffect(() => {
    if (productId) {
      setFormState({
        ...formState,
        id: productId,
      })
    }
  }, [productId])

  //
  // getWidget (Widget Single Product)
  //

  const getWidget = useAsync(async () => {
    if (handle) {
      const response = await fetch(
        `/.netlify/functions/reviews?endpoint=get_widget&handle=${handle}`,
        {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
        }
      )
      const result = await response.json()
      setCreateReview(false)
      return result
    }
  }, [handle])

  console.log(getWidget)

  const newReview = useAsync(async () => {
    if (createReview) {
      const response = await fetch(
        `/.netlify/functions/reviews?endpoint=new_review`,
        {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify(formState),
        }
      )
      const result = await response.json()
      setCreateReview(false)
      return result
    }
  }, [createReview])

  const allReviewWidget = useAsync(async () => {
    const response = await fetch(
      `/.netlify/functions/reviews?endpoint=get_all_review_widget`,
      {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'same-origin',
      }
    )
    const result = await response.json()
    return result
  }, [])

  useEffect(() => {
    if (allReviewWidget?.value && !allReviewWidget?.loading) {
      setAllReviews({
        ...allReviews,
        avgRating: +allReviewWidget?.value?.all_reviews_rating
      })
    }
  }, [allReviewWidget?.value])

  const allReviewCount = useAsync(async () => {
    const response = await fetch(
      `/.netlify/functions/reviews?endpoint=get_all_reviews_count`,
      {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'same-origin',
      }
    )

    const result = await response.json()
    return result
  }, [])

  useEffect(() => {
    if (allReviewCount?.value && !allReviewCount?.loading) {
      setAllReviews({
        ...allReviews,
        count: +allReviewCount?.value?.all_reviews_count
      })
    }
  }, [allReviewCount?.value])

  useEffect(() => {
    if (newReview?.value?.message) {
      setReviewCreated(true)

      setTimeout(() => {
        setReviewCreated(false)
      }, 2000)
    }
  }, [newReview])

  return (
    <RatingContext.Provider
      value={{
        averageReviewRating,
        setAverageReviewRating,
        numberOfReviews,
        setNumberOfReviews,
        metafields,
        setMetafields,
        handle,
        setHandle,
        productId,
        setProductId,
        setPage,
        getWidget,
        page,
        reviews: {
          loading: state.loading,
          value: state.value,
        },
        formState,
        setFormState,
        reviewCreated,
        setReviewCreated,
        createReview,
        setCreateReview,
        isLoading,
        setIsLoading,
        allReviews,
        setAllReviews,
      }}
    >
      {children}
    </RatingContext.Provider>
  )
}

RatingProvider.propTypes = {
  children: PropTypes.any,
}

export default RatingProvider
