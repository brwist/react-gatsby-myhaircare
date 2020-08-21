import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ArrowLeft from '~/components/GalleryArrow/ArrowLeft'
import ArrowRight from '~/components/GalleryArrow/ArrowRight'
import { ProductImg } from '~/components/Templates/Product/styles'
import ProductImagesSliderThumbnail from '~/components/ProductImagesSliderThumbnail'
import {
  ThumbnailList,
  ProductImagesGallery,
  DiscontinuedBadge,
  DiscontinuedBadgeText,
} from './styles'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const ProductImagesSlider = props => {
  const { images, variant, product } = props
  const [filteredImages, setFilteredImages] = useState()
  const [isDiscontinued, setIsDiscontinued] = useState(false)
  const [isLimitedEdition, setIsLimitedEdition] = useState(false)
  const [galleryState, setGalleryState] = useState({
    currentIndex: 0,
    itemsInSlide: 1,
    responsive: { 960: { dotsDisabled: true } },
  })

  useEffect(() => {
    if (product?.tags.includes('Discontinued') && !variant.availableForSale) {
      setIsDiscontinued(true)
    } else {
      setIsDiscontinued(false)
    }

    if (product?.tags.includes('Limited Edition')) {
      setIsLimitedEdition(true)
    }
  }, [product])

  useEffect(() => {
    if (variant.image) {
      setFilteredImages([variant.image])
    }
  }, [images, variant])

  const slideTo = i =>
    setGalleryState({
      ...galleryState,
      currentIndex: i,
    })

  const slideNext = () =>
    setGalleryState({
      ...galleryState,
      currentIndex:
        filteredImages?.length - 1 < galleryState.currentIndex
          ? galleryState.currentIndex
          : filteredImages?.length - 1 === galleryState.currentIndex
          ? 0
          : galleryState.currentIndex + 1,
    })

  const slidePrev = () =>
    setGalleryState({
      ...galleryState,
      currentIndex:
        galleryState.currentIndex === 0
          ? filteredImages?.length - 1
          : galleryState.currentIndex - 1,
    })

  useEffect(() => {
    if (!filteredImages?.length) {
      setFilteredImages(images)
    }

    if (filteredImages) {
      setGalleryState({
        ...galleryState,
        galleryItems: filteredImages?.map(image => {
          if (image?.localFile?.childImageSharp?.fluid && !images[0]?.originalSrc?.includes('.gif')) {
            return (
              <ProductImg
                fluid={image.localFile.childImageSharp.fluid}
                key={`${image.id}--regular`}
                alt={image.altText ? image.altText : ''}
                className="ProductTileImage"
              />
            )
          } else if (image?.originalSrc) {
            return (
              <img
                className="ProductTileImage"
                src={image.originalSrc}
                alt={image.altText}
                key={image.id}
              />
            )
          }
        }),
      })
    }
  }, [filteredImages])

  return (
    <ProductImagesGallery>
      <div style={{ position: 'relative' }}>
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
        <AliceCarousel
          items={galleryState.galleryItems}
          slideToIndex={galleryState.currentIndex}
          responsive={galleryState.responsive}
          dotsDisabled={false}
          buttonsDisabled={true}
        />
        {filteredImages?.length ? (
          <ThumbnailList>
            {filteredImages?.map((image, index) => {
              return (
                <ProductImagesSliderThumbnail
                  key={`ProductImagesSliderThumbnail--${index}`}
                  onClick={() => slideTo(index)}
                  image={image}
                  className={`${
                    index === galleryState.currentIndex ? 'is-active' : ''
                  }`}
                />
              )
            })}
          </ThumbnailList>
        ) : (
          ''
        )}
        {filteredImages?.length > 1 ? (
          <>
            <ArrowLeft onClick={slidePrev} />
            <ArrowRight onClick={slideNext} />
          </>
        ) : (
          ''
        )}
      </div>
    </ProductImagesGallery>
  )
}

ProductImagesSlider.propTypes = {
  images: PropTypes.array,
  variant: PropTypes.object,
  product: PropTypes.object,
}

export default ProductImagesSlider
