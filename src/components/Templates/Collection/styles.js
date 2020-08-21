import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Text from '~/components/Utilities/Text'
import ProductTile from '~/components/ProductTile'

export const CollectionContainer = styled.div`
  padding: 25px 0 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.grey};

  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 20px;
    padding: 20px 0;
    flex-direction: row;
  }

  .MobileAccordionFilters {
    box-shadow: none;
    border-radius: 0 !important;
    margin-top: 10px;

    & > .MuiAccordionSummary-root {
      min-height: 38px;
      background: ${theme.colors.primary};
      color: ${theme.colors.tertiary};

      .MuiAccordionSummary-expandIcon {
        color: ${theme.colors.tertiary};
        padding: 0;
      }

      .MuiAccordionSummary-content {
        display: contents;
      }
    }

    .MuiAccordionDetails-root {
      padding: 0;

      & > * {
        margin-top: 25px;
        width: 100%;
      }
    }

    .MuiIconButton-root {
      font-size: ${theme.fonts.body};
      font-weight: 500;
    }

    &::before {
      display: none;
    }
  }
`

export const PaginationContainer = styled.div`
  padding-top: 20px;
  border-top: 1px solid ${theme.colors.gray};
  text-align: center;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: 20px;
    padding: 20px 0;
    border-bottom: 1px solid ${theme.colors.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`

export const ProductCount = styled(Text)`
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    font-size: 14px !important;
    font-weight: 300 !important;
    letter-spacing: 0.16px !important;
  }
`

export const PaginationText = styled(Text)`
  margin-bottom: 0px;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: 10px;
    text-align: center;
    font-size: 14px !important;
    font-weight: 300 !important;
    letter-spacing: 0.16px !important;
  }
`

export const PaginationCount = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fonts.body};
  justify-content: center;
  flex-wrap: wrap;
  max-width: 280px;
  margin: 0 auto;

  @media (min-width: ${theme.breakpoints.s}) {
    max-width: initial;
    flex-wrap: initial;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    margin: initial;
    justify-content: flex-end;
  }

  & > a {
    cursor: pointer;
  }

  .prevArrow {
    transform: rotate(180deg);
    margin-bottom: 15px;

    @media (min-width: ${theme.breakpoints.s}) {
      margin-right: 15px;
      margin-bottom: 0;
    }
  }

  .nextArrow {
    margin-top: -5px;

    @media (min-width: ${theme.breakpoints.s}) {
      margin-top: 0;
      margin-left: 15px;
    }
  }

  svg {
    path {
      fill: black !important;
    }
  }

  ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;

    li {
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;

      @media (min-width: ${theme.breakpoints.s}) {
        margin-bottom: 0px;
      }

      &:hover {
        border-bottom: 1px solid black;
      }

      &.is-active {
        border-bottom: 1px solid black;
      }

      &:last-of-type {
        margin-right: 0;
      }

      a {
        color: ${theme.colors.primary};
        text-decoration: none;
      }
    }
  }
`

export const Sidebar = styled.aside`
  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 10px;
  }

  > * {
    width: 210px;
  }
`

export const Main = styled.main`
  width: 100%;
  @media (min-width: ${theme.breakpoints.md}) {
    margin-left: 50px;
  }
`

export const MainHeader = styled.header`
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export const CollectionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;

  & > div {
    @media (max-width: ${theme.breakpoints.xs}) {
      width: 100%;
    }
  }

  & > * {
    min-width: 140px;
    width: 50%;
    margin-bottom: 50px;
    height: 100%;

    @media (min-width: ${theme.breakpoints.l}) {
      max-width: 246px;
      width: 33.33%;
    }

    &:not(div) {
      padding: 0 5px;

      @media (min-width: ${theme.breakpoints.s}) {
        padding: 0 15px;
      }
    }
  }
`

export const CollectionProductTile = styled(ProductTile)`
  text-decoration: none;
  position: relative;

  h3 {
    font-size: ${theme.fonts.cta};
    letter-spacing: ${theme.letterSpacing.smallText};
  }
`

export const EmptyContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: initial;
`