import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Image from 'gatsby-image'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import LinkFormatter from '~/components/LinkFormatter'

export const ArticleTileContainer = styled(LinkFormatter)`
  text-decoration: none;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 40px;
  transition: 150ms ease-in;
  display: block;

  .gatsby-image-wrapper {
    transition: transform 300ms ease;
  }

  &:hover {
    .gatsby-image-wrapper {
      transform: scale(1.1);
    }
  }

  &.is-hidden {
    display: none;
    transform: translateY(10px);
  }

  &.is-visible {
    display: block;
    transform: translateY(0px);
  }
`

export const ArticleTileTitle = styled(Title)`
  margin-bottom: 25px;

  @media (min-width: ${theme.breakpoints.s}) {
    margin-bottom: 35px;
  }
`

export const ArticleTileExcerpt = styled(Text)``

export const ArticleTileImage = styled(Image)``

export const ArticleTileTagline = styled(Text)`
  color: ${theme.colors.secondary};
  margin-top: 25px;
  margin-bottom: 25px;

  @media (min-width: ${theme.breakpoints.s}) {
    margin-top: 50px;
    margin-bottom: 38px;
  }
`

export const ArticleTileCTA = styled(Text)`
  margin-top: 25px;

  @media (min-width: ${theme.breakpoints.s}) {
    margin-top: 35px;
  }
`
