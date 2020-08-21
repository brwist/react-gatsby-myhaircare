
import styled from '@emotion/styled'
import { theme } from '~/utils/styles'

export const BrandsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }

  .BrandsContainer {
    display: flex;
    flex-wrap: wrap;
    max-width: initial;
    overflow: auto;
    max-height: 500px;
    width: 100%;
  }

  .MegaNavItemsContainer {
    justify-content: flex-start;
    align-items: flex-start;
  }

  .BrandLink {
    padding: 0 0 2px 0;
    margin-bottom: 8px;
    min-width: 135px;
    max-width: 135px;
    padding-right: 20px;
    text-align: left;
    display: block;

    @media (min-width: ${theme.breakpoints.md}) {
      min-width: 170px;
      max-width: 170px;
    }

    * {
      font-weight: 300;
    }
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0px);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0px);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: 150ms;
    transition-property: opacity, transform;
  }
`

export const BrandsContent = styled.div``