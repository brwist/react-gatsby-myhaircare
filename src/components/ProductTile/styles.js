import styled from '@emotion/styled'
import Image from 'gatsby-image'
import Text from '~/components/Utilities/Text'
import LinkFormatter from '~/components/LinkFormatter'

export const DiscontinuedBadge = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  background: ${props => props.theme.colors.secondary};
  z-index: 1;
  top: -5px;
  right: 0;
`

export const DiscontinuedBadgeText = styled(Text)`
  font-size: 6px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin: 0 !important;
`

export const ProductTileContainer = styled(LinkFormatter)`
  text-align: center;
  padding: 0 10px;
  display: block;
  height: fit-content;
  transition: all 300ms linear;
  overflow: visible;

  &:hover {
    .ProductTileImage {
      transform: scale(0.95);
    }
  }

  .Title {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 14px;
  }

  .Text {
    margin-bottom: 10px;
    color: ${props => props.theme.colors.primary};

    &:last-of-type {
      margin-top: 15px;
    }
  }

  .ProductTileImage {
    width: 100%;
    max-width: 160px;
    height: 100%;
    margin: 0 auto 30px;
    max-height: 220px;
    transition: transform 150ms linear;

    @media (min-width: ${props => props.theme.breakpoints.s}) {
      max-width: initial;
      max-height: 250px;
      padding: 0 15px;
    }
  }
`

export const ProductTileContent = styled.div`
  max-width: 250px;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 15px;
  }
`

export const ProductTileImage = styled(Image)`
  width: 100%;
  max-width: 160px;
  height: 100%;
  margin: 0 auto 30px;
  max-height: 220px;

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    max-width: 235px;
    padding: 0 15px;
  }
`

export const ProductTileTitle = styled.h3`
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 300;
  margin-bottom: 15px;
`

export const ImageContainer = styled.div`
  overflow: hidden;
`

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  color: ${props => props.theme.colors.primary};

  * {
    margin-top: 0 !important;
  }

  .CompareAtPrice {
    text-decoration: line-through;
    color: red;
    margin-left: 10px;
  }
`