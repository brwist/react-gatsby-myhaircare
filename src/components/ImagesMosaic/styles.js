import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Image from 'gatsby-image'
import LinkFormatter from '~/components/LinkFormatter'

export const ImageMosaicContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
  padding: 25px 0 10px;

  @media (min-width: ${theme.breakpoints.s}) {
    padding: 45px 80px 0 80px;
  }

  .MosaicTitle {
    width: 100%;
    text-align: center;
    margin-bottom: 28px;

    @media (min-width: ${theme.breakpoints.s}) {
      margin-bottom: 45px;
    }
  }
`

export const MosaicColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: ${theme.breakpoints.s}) {
    width: calc(50% - 15px);
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};

    .gatsby-image-wrapper {
      transition: transform 300ms ease;
    }
  
    &:hover {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }

  .MosaicCaption {
    width: 100%;
    transform: translateX(-50%) rotate(-90deg);
    color: ${theme.colors.secondary};
    position: absolute;
    top: 150px;
    left: 40px;

    @media (min-width: ${theme.breakpoints.s}) {
      top: 120px;
    }

    @media (min-width: ${theme.breakpoints.md}) {
      top: 230px;
    }
  }
`

export const MosaicImage = styled(Image)`
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background: ${theme.colors.peach50};
    display: none;
    opacity: 0;
    transition: 150ms linear;
    transition-property: opacity, background;

    @media (min-width: ${theme.breakpoints.md}) {
      display: block;
    }
  }
`

export const MosaicChild = styled(LinkFormatter)`
  margin-bottom: 20px;
  position: relative;
  display: block;

  @media (min-width: ${theme.breakpoints.s}) {
    margin-bottom: 55px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    &:hover {
      .MosaicImage {
        &::before {
          opacity: 1;
        }
      }

      .MosaicCtaText {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }

    .MosaicCtaText {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc(-50% + 10px));
      transition: 150ms linear;
      transition-property: opacity, transform;
      opacity: 0;
      z-index: 2;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    .MosaicCtaText {
      display: none;
    }
  }

  .MosaicImageCaption {
    margin-top: 10px;
  }

  &.MosaicItemLeft--1 {
    width: 100%;
    max-width: 375px;
    margin-left: auto;
    max-width: calc(100% - 80px);

    @media (min-width: ${theme.breakpoints.s}) {
      width: 70%;
      max-width: 375px;
    }

    @media (min-width: ${theme.breakpoints.md}) {
      width: 100%;
    }
  }

  &.MosaicItemLeft--2 {
    max-width: 330px;
    width: 100%;
    margin: 0 auto 20px;

    @media (min-width: ${theme.breakpoints.s}) {
      margin: 0 auto 55px;
    }

    .MosaicImageCaption {
      margin-left: 10px;
    }
  }

  &.MosaicItemLeft--3 {
    margin-left: auto;
    width: 100%;
    max-width: calc(100% - 80px);

    @media (min-width: ${theme.breakpoints.s}) {
      max-width: 100%;
    }
  }

  &.MosaicItemRight--1 {
    .MosaicImageCaption {
      margin-left: 10px;

      @media (min-width: ${theme.breakpoints.s}) {
        margin-left: 0px;
      }
    }
  }

  &.MosaicItemRight--2 {
    max-width: calc(100% - 80px);
    width: 100%;
    margin-right: auto;

    @media (min-width: ${theme.breakpoints.s}) {
      max-width: 375px;
      margin-right: initial;
      margin-left: auto;
    }

    .MosaicImageCaption {
      margin-left: 10px;

      @media (min-width: ${theme.breakpoints.s}) {
        margin-left: 0px;
      }
    }
  }

  &.MosaicItemRight--3 {
    width: 100%;
    margin-left: auto;
    max-width: calc(100% - 80px);
    
    @media (min-width: ${theme.breakpoints.s}) {
      margin-left: initial;
      margin-right: auto;
      max-width: 355px;
    }
  }
`
