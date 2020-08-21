import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  FeaturedBrandsContainer,
  FeaturedBrandsBanner,
  FeaturedBrandsContent,
  BrandImage,
} from './styles'
import { OverflowContainer } from '~/utils/styles'
import IntersectionVisible from 'react-intersection-visible'
import { useBannerAnimation } from '~/utils/hooks/useBannerAnimation'
import LinkFormatter from '~/components/LinkFormatter'
import Title from '~/components/Utilities/Title'

const FeaturedBrands = ({ query, timing = 45 }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  const {
    playAnimation,
    setPlayAnimation,
    contentWidth,
    containerWidth,
  } = useBannerAnimation({
    contentRef,
    containerRef,
  })

  const {
    primary: { title },
    items,
  } = query

  return (
    <FeaturedBrandsContainer>
      {title ? (
        <Title as="h2" type="heading5" className="FeaturedBrands__Title">
          {title.text}
        </Title>
      ) : (
        ''
      )}
      <IntersectionVisible
        onHide={() => setPlayAnimation(false)}
        onShow={() => setPlayAnimation(true)}
      >
        <FeaturedBrandsBanner
          ref={containerRef}
          timing={timing}
          playAnimation={playAnimation}
        >
          <OverflowContainer>
            <FeaturedBrandsContent
              contentWidth={contentWidth}
              containerWidth={containerWidth}
              timing={timing}
              ref={contentRef}
              playAnimation={playAnimation}
            >
              {items.length > 0
                ? [...items, ...items, ...items].map((item, index) => {
                    return (
                      <LinkFormatter
                        key={`${item.pangleHandle}--${index}`}
                        pageHandle={item.pangleHandle}
                        pageType={item.pageType ? item.pageType.text : ''}
                      >
                        {item.logo.localFile.childImageSharp ? (
                          <BrandImage
                            key={`${item.pangleHandle}--${index}`}
                            fluid={item.logo.localFile.childImageSharp.fluid}
                          />
                        ) : (
                          ''
                        )}
                      </LinkFormatter>
                    )
                  })
                : ''}
            </FeaturedBrandsContent>
          </OverflowContainer>
        </FeaturedBrandsBanner>
      </IntersectionVisible>
    </FeaturedBrandsContainer>
  )
}

FeaturedBrands.propTypes = {
  query: PropTypes.object.isRequired,
  timing: PropTypes.number,
}

export default FeaturedBrands