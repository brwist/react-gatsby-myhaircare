import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import Image from 'gatsby-image'

export const ProductTitle = styled(Title)`
  word-wrap: break-word;
  margin-bottom: 15px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 10px;
  }
`

export const ProductVendor = styled(Text)`
  margin-bottom: 15px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 10px;
  }
`

export const ProductContainer = styled.div`
  margin: 0 auto;
  padding: 20px 18px 60px;
  max-width: 680px;

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    padding: 20px 100px 60px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 1440px;
    padding: 60px 40px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 60px 100px;
  }
`

export const TwoColumnGrid = styled.div`
  display: block;
  margin-bottom: 15px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    padding-bottom: 40px;
    margin-bottom: 35px;
    display: grid;
    grid-template-columns: 1fr 2rem 1fr;
    grid-template-rows: 1auto;
    grid-template-areas: 'left . right';
  }
`

export const GridLeft = styled.div`
  grid-area: left;
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    text-align: left;
  }
`

export const GridRight = styled.div`
  grid-area: right;
`

export const ProductPageContainer = styled.div``

export const ProductImg = styled(Image)``

export const ProductDescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .CollapseDescription {
    p {
      margin-bottom: 15px;
    }
  }
`

export const ProductDescription = styled.div`
  margin-top: ${props => props.hasBulletpoints ? '10px' : '0'};
  width: ${props => props.hasBulletpoints ? '100%' : 'calc(50% - 20px)'};

  .Title {
    margin-bottom: 20px;
  }
`

export const FeaturesContainer = styled.div`
  width: 100%;
  margin-bottom: 35px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 50%;
  }

  ul {
    list-style: none;
    margin-top: 30px;

    svg {
      margin-right: 10px;
      path {
        fill: ${props => props.theme.colors.secondary};
      }
    }
  }
`
