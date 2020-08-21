import React from 'react'
import PropTypes from 'prop-types'
import ArrowLeft from '~/components/GalleryArrow/ArrowLeft'
import ArrowRight from '~/components/GalleryArrow/ArrowRight'
import { SliderButton, CollectionSliderStyled } from './styles'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

const CollectionBanner = ({
  products,
  pageContext,
  selectedFilters,
  setSelectedFilters,
}) => {
  const theme = useTheme()
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('350'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('960'))
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('1200'))

  let productTypes = products?.map(product => product.productType)
  productTypes = [...new Set(productTypes)].filter(type => type)

  let slideToShow = 5

  if (!isLargeDesktop && isDesktop) {
    slideToShow = 4
  }

  if (!isDesktop) {
    slideToShow = 3
  }

  if (isSmallMobile) {
    slideToShow = 2
  }

  if (productTypes.length < slideToShow) {
    slideToShow = productTypes.length
  }

  return productTypes.length > 0 && pageContext.brandPage ? (
    <CollectionSliderStyled
      slidesToShow={slideToShow}
      slidesToScroll={1}
      arrows={true}
      nextArrow={<ArrowRight />}
      prevArrow={<ArrowLeft />}
      className="CollectionSlider"
    >
      {productTypes?.map((type, index) => {
        if (!type) return

        return (
          <SliderButton
            className={selectedFilters?.type === type ? 'is-active' : ''}
            clickHandler={() => {
              if (selectedFilters?.type === type) {
                setSelectedFilters({
                  ...selectedFilters,
                  type: '',
                })
              } else {
                setSelectedFilters({
                  ...selectedFilters,
                  type,
                })
              }
            }}
            buttonStyle="quaternary"
            key={`${type}--${index}`}
          >
            {type}
          </SliderButton>
        )
      })}
    </CollectionSliderStyled>
  ) : (
    ''
  )
}

CollectionBanner.propTypes = {
  products: PropTypes.array,
  pageContext: PropTypes.object,
  selectedFilters: PropTypes.any,
  setSelectedFilters: PropTypes.func,
}

export default CollectionBanner
