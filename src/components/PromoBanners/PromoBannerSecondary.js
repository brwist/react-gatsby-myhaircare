import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  PromoBannerSecondaryContainer,
  PromoLink,
  PromoBannerSecondaryContent,
} from './styles'
import Text from '~/components/Utilities/Text'
import { Tablet } from '~/components/Utilities/Media'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import IntersectionVisible from 'react-intersection-visible'
import { OverflowContainer } from '~/utils/styles'
import { useBannerAnimation } from '~/utils/hooks/useBannerAnimation'

const PromoBannerSecondary = ({
  query,
  isVisibleOnLoad = false,
  timing = 45,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('960'))
  // For Mobile Banner Animation
  const bannerContainerRef = useRef(null)
  const bannerContentRef = useRef(null)

  const {
    contentWidth,
    containerWidth,
    playAnimation,
    setPlayAnimation,
  } = useBannerAnimation({
    contentRef: bannerContentRef,
    containerRef: bannerContainerRef,
  })

  const items = query.map((body, index) => {
    if (body.page_handle && body.page_type) {
      return (
        <PromoLink
          key={`${body.page_handle}--${index}`}
          pageType={body.page_type}
          pageHandle={body.page_handle.text}
        >
          <Text type="smallText400">{body.body.text}</Text>
        </PromoLink>
      )
    } else {
      return (
        <Text key={`${body.page_handle}--${index}`} type="smallText400">
          {body.body.text}
        </Text>
      )
    }
  })

  return (
    <IntersectionVisible
      onHide={() => setPlayAnimation(false)}
      onShow={() =>
        isMobile ? setPlayAnimation(true) : setPlayAnimation(false)
      }
    >
      <PromoBannerSecondaryContainer
        ref={bannerContainerRef}
        timing={timing}
        playAnimation={playAnimation}
      >
        <OverflowContainer>
          <PromoBannerSecondaryContent
            bannerInnerWidth={contentWidth}
            parentElementInnerWidth={containerWidth}
            timing={timing}
            ref={bannerContentRef}
            isVisibleOnLoad={isVisibleOnLoad}
            playAnimation={playAnimation}
          >
            {items}
            <Tablet>
              {items}
              {items}
            </Tablet>
          </PromoBannerSecondaryContent>
        </OverflowContainer>
      </PromoBannerSecondaryContainer>
    </IntersectionVisible>
  )
}

PromoBannerSecondary.propTypes = {
  isVisibleOnLoad: PropTypes.bool,
  query: PropTypes.array.isRequired,
  timing: PropTypes.number,
}

export default PromoBannerSecondary
