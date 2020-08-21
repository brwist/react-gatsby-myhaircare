import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Image from 'gatsby-image'
import { css, keyframes } from '@emotion/core'

const reveal = () => css`
  ${keyframes`
    to {
      opacity: 1;
    }
  `} 1s linear forwards;
`

const animation = props => css`
  ${keyframes`
  to {
    transform: translateX(-${props.contentWidth}px);
  }
`} ${props.timing}s linear infinite
`

export const FeaturedBrandsContainer = styled.div`
  background: ${theme.colors.background};
  padding: 25px 0;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 45px 0;
  }

  .FeaturedBrands__Title {
    margin-bottom: 25px;
    text-align: center;

    @media (min-width: ${theme.breakpoints.md}) {
      margin-bottom: 45px;
    }
  }
`

export const FeaturedBrandsBanner = styled.div`
  animation-delay: 0.5s;
  animation: ${({ playAnimation }) => (playAnimation ? reveal : 'initial')};
`

export const FeaturedBrandsContent = styled.div`
  padding: 0 100px;
  // max-width: 1200px;
  margin: 0 auto;
  display: flex;
  animation: ${({ playAnimation }) => (playAnimation ? animation : 'initial')}
  animation-delay: 0.1s;
  transform: translateX(-100px);

  a {
    width: 100%;
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0px;
    }
  }
`

export const BrandImage = styled(Image)`
  width: 100px;

  @media (min-width: ${theme.breakpoints.md}) {
    width: 150px;
  }
`
