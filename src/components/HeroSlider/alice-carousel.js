import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MobileUp, MobileDown } from '~/components/Utilities/Media'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import {
  GalleryImage,
  HeroSliderContainer,
  HeroSliderContent,
  HeroSlide,
  HeroContentBody,
  HeroContentTitle,
  HeroContentLink,
  SlideArrowLeft,
  SlideArrowRight,
  // SliderDots,
  // SliderDot,
} from './styles'
import 'keen-slider/keen-slider.min.css'

const HeroSlider = ({ query }) => {
  const [galleryState, setGalleryState] = useState({
    currentIndex: 0,
    itemsInSlide: 1,
  })

  useEffect(() => {
    setGalleryState(
      query
        ? query.items.map((item, index) => {
            const {
              gallery_image: {
                Mobile: {
                  localFile: {
                    childImageSharp: { fluid: mobileImgSrc },
                  },
                },
                localFile: {
                  childImageSharp: { fluid: desktopImgSrc },
                },
              },
              title,
              slide_body,
              page_type,
              page_handle,
              light_mode,
            } = item

            return (
              <HeroSlide
                className={`keen-slider__slide ${
                  light_mode ? 'light-mode' : ''
                }`}
                key={`${page_handle}--${index}`}
              >
                <MobileUp>
                  <GalleryImage fluid={desktopImgSrc} />
                </MobileUp>
                <MobileDown>
                  <GalleryImage fluid={mobileImgSrc} />
                </MobileDown>
                <HeroSliderContent className="HeroSliderContent">
                  {title ? (
                    <HeroContentTitle as="h1" type="heading1">
                      {title.text}
                    </HeroContentTitle>
                  ) : (
                    ''
                  )}
                  {slide_body ? (
                    <HeroContentBody
                      as="div"
                      type="body"
                      className="HeroSliderContent__Text"
                      dangerouslySetInnerHTML={{ __html: slide_body.html }}
                    />
                  ) : (
                    ''
                  )}
                  {page_handle && page_type ? (
                    <HeroContentLink
                      className={`Link ${light_mode ? 'tertiary' : 'primary'}`}
                      pageType={page_type}
                      pageHandle={page_handle.text}
                    >
                      Shop the latest
                    </HeroContentLink>
                  ) : (
                    ''
                  )}
                </HeroSliderContent>
              </HeroSlide>
            )
          })
        : ''
    )
  }, [query])

  // const slideTo = i =>
  //   setGalleryState({
  //     ...galleryState,
  //     currentIndex: i,
  //   })
  const slideNext = () =>
    setGalleryState({
      ...galleryState,
      currentIndex:
        query?.items - 1 < galleryState.currentIndex
          ? galleryState.currentIndex
          : query?.items - 1 === galleryState.currentIndex
          ? 0
          : galleryState.currentIndex + 1,
    })
  const slidePrev = () =>
    setGalleryState({
      ...galleryState,
      currentIndex:
        galleryState.currentIndex === 0
          ? query?.items - 1
          : galleryState.currentIndex - 1,
    })

  return (
    <>
      <HeroSliderContainer>
        <AliceCarousel
          items={galleryState.galleryItems}
          slideToIndex={galleryState.currentIndex}
          dotsDisabled={false}
          buttonsDisabled={true}
        />
        <MobileUp>
          <SlideArrowLeft onClick={slidePrev} />
          <SlideArrowRight onClick={slideNext} />
        </MobileUp>
      </HeroSliderContainer>
    </>
  )
}

HeroSlider.propTypes = {
  query: PropTypes.object.isRequired,
}

export default HeroSlider
