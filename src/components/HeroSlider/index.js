import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useKeenSlider } from 'keen-slider/react'
import { MobileUp, MobileDown } from '~/components/Utilities/Media'
import {
  GalleryWrapper,
  GalleryImage,
  HeroSliderContainer,
  HeroSliderContent,
  HeroSlide,
  HeroContentBody,
  HeroContentTitle,
  HeroContentLink,
  SliderDots,
  SliderDot,
} from './styles'
import ArrowLeft from '~/components/GalleryArrow/ArrowLeft'
import ArrowRight from '~/components/GalleryArrow/ArrowRight'

const HeroSlider = ({ query }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    initial: 0,
    duration: 750,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <>
      <HeroSliderContainer className="HeroSliderContainer">
        <GalleryWrapper
          ref={sliderRef}
          className="navigation-wrapper keen-slider"
        >
          {query
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
                    className={`keen-slider__slide ${light_mode ? 'light-mode' : ''} ${currentSlide === index ? 'is-active' : ''}`}
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
            : ''}
        </GalleryWrapper>
        {slider && (
          <MobileUp>
            <ArrowLeft onClick={e => e.stopPropagation() || slider.prev()} />
            <ArrowRight onClick={e => e.stopPropagation() || slider.next()} />
          </MobileUp>
        )}
        {slider && (
          <SliderDots className="dots">
            {[...Array(slider.details().size).keys()].map(index => {
              return (
                <SliderDot
                  key={`dots--${index}`}
                  onClick={() => {
                    slider.moveToSlideRelative(index)
                  }}
                  className={'dot' + (currentSlide === index ? ' active' : '')}
                />
              )
            })}
          </SliderDots>
        )}
      </HeroSliderContainer>
    </>
  )
}

HeroSlider.propTypes = {
  query: PropTypes.object.isRequired,
}

export default HeroSlider
