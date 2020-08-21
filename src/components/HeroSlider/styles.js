import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Image from 'gatsby-image'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import { StyledLink } from '~/utils/styles'

export const GalleryWrapper = styled.div`
  position: relative;
  height: calc(100vw / (47 / 74));
  max-height: calc(100vw / (47 / 74));

  @media (min-width: ${theme.breakpoints.s}) {
    height: calc(100vw / (15 / 7));
    max-height: 785px;
  }

  .zoom-out {
    perspective: 1000px;
  }
`

export const GalleryImage = styled(Image)`
  width: 100%;
  max-width: 100%;
`

export const HeroSliderContainer = styled.div`
  width: 100%;
  padding: 0;
  max-width: 1680px;
  margin: 0 auto;
  position: relative;

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      * {
        fill: ${theme.colors.secondary};
      }
    }

    * {
      transition: fill 150ms linear;
      will-change: fill;
      fill: ${theme.colors.tertiary};
    }
  }

  .arrow--left {
    left: 40px;
  }

  .arrow--right {
    right: 40px;
  }

  .keen-slider {
    display: block;
    overflow: hidden;
    position: relative;
    user-select: none;
    touch-action: pan-y;
  }
  .keen-slider__slide {
    position: absolute;
    overflow: hidden;
    width: 100%;
    min-height: 100%;
  }
  .keen-slider.keen-slider--vertical .keen-slider__slide {
    min-height: auto;
  }
`

export const HeroSlide = styled.div`
  min-height: 100%;
  color: ${theme.colors.primary};

  &.light-mode {
    color: ${theme.colors.tertiary};
  }

  &.is-active {
    .HeroSliderContent {
      opacity: 1;
      transform: translate(-50%, 0);

      @media (min-width: ${theme.breakpoints.md}) {
        transform: translateY(-50%);
      }
    }
  }
`

export const HeroSliderContent = styled.div`
  position: absolute;
  max-width: 260px;
  text-align: center;
  width: 100%;
  left: 50%;
  bottom: 80px;
  transform: translate(-50%, -10px);
  opacity: 0;

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 400px;
    bottom: initial;
    left: initial;
    top: 50%;
    right: 160px;
    transition: 500ms linear;
    transition-property: transform, opacity;
    transform: translateY(calc(-50% - 10px));
  }
`

export const HeroContentBody = styled(Text)`
  max-width: 240px;
  margin: 0 auto;
`

export const HeroContentTitle = styled(Title)`
  margin-bottom: 30px;
`

export const HeroContentLink = styled(StyledLink)`
  margin-top: 30px;
`

export const SliderDots = styled.ul`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  padding: 10px 0;
  justify-content: center;
`

export const SliderDot = styled.button`
  border: none;
  width: 10px;
  height: 10px;
  background: ${theme.colors.tertiary};
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &.active {
    background: ${theme.colors.primary};
  }
`
