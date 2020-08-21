import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import Title from '~/components/Utilities/Title'
import { GalleryWrapper, ProductSliderContainer } from './styles'
import ArrowLeft from '~/components/GalleryArrow/ArrowLeft'
import ArrowRight from '~/components/GalleryArrow/ArrowRight'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const ProductSlider = ({ title, children }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))
  const isTablet = useMediaQuery(theme.breakpoints.up('750'))
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    initial: 0,
    slidesPerView: isDesktop ? 4 : isTablet ? 3 : 2,
    spacing: isTablet ? 40 : 10,
  })

  return children.length > 0 ? (
    <ProductSliderContainer className="section">
      {title ? (
        <Title as="h2" type="heading5">
          {title}
        </Title>
      ) : (
        ''
      )}
      <GalleryWrapper
        className="navigation-wrapper keen-slider"
        ref={sliderRef}
      >
        {children}
        {slider && children.length > 1 ? (
          <>
            <ArrowLeft onClick={e => e.stopPropagation() || slider.prev()} />
            <ArrowRight onClick={e => e.stopPropagation() || slider.next()} />
          </>
        ) : (
          ''
        )}
      </GalleryWrapper>
    </ProductSliderContainer>
  ) : (
    ''
  )
}

ProductSlider.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string,
}

export default ProductSlider
