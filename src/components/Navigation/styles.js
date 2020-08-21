import styled from '@emotion/styled'
import LinkFormatter from '~/components/LinkFormatter'
import { theme } from '~/utils/styles'
import Image from 'gatsby-image'

export const MenuLink = styled(LinkFormatter)`
  text-decoration: none;
  color: ${theme.colors.primary};
  flex: 1;
  position: relative;

  @media (min-width: ${theme.breakpoints.md}) {
    text-align: center;
    padding: 20px 0;

    &.has-child {
      &::before {
        content: '';
        width: 20px;
        height: 20px;
        background: ${theme.colors.background};
        position: absolute;
        left: 50%;
        bottom: -10px;
        transform: translateX(-50%) rotate(-45deg);
        opacity: 1;
      }
    }
  }
`

export const NavigationContainer = styled.header`
  width: 100%;
  transition: transform 150ms ease-out;
  display: flex;
  justify-content: center;
  margin-top: 61px;
  background: ${props => props.theme.colors.tertiary};
  transform: ${props =>
    !props.hoverState ? 'translateY(0)' : 'translateY(10px)'};

  @media (min-width: ${theme.breakpoints.md}) {
    z-index: 1;
    margin-top: 0;
    transform: initial;
  }
`

export const NavigationContent = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::before {
      z-index: 1;
      content: '';
      height: 1px;
      background: ${theme.colors.secondary};
      position: absolute;
      width: 100%;
      top: 0;
      left: 50%;
      transform: translateX(-50%) scaleX(1);
      transition: transform 1000ms ease-in-out;
      transform-origin: left;
    }
  }
`

export const MegaNavContainer = styled.nav`
  width: 100%;
  transform: ${props =>
    props.hoverState ? 'translateY(0)' : 'translateY(10px)'};
  transition: 150ms ease-out;
  transition-property: transform;
  will-change: transform;
  pointer-events: ${props => (props.hoverState ? 'auto' : 'none')};
  opacity: ${props => (props.hoverState ? 1 : 0)};
  position: ${props => (props.hoverState ? 'initial' : 'absolute')};

  @media (min-width: ${theme.breakpoints.md}) {
    background: ${theme.colors.background};
  }
`

export const MegaNavOverlay = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  transition: opacity 200ms linear;
  opacity: ${props => (props.hoverState ? 1 : 0)};
`

export const MegaNavContent = styled.div`
  max-width: 1230px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  position: relative;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-wrap: initial;
  }
`

export const MegaNavChild = styled.div`
  padding: 0 0 0 15px;
  margin: 20px 0;
  border-left: 1px solid ${theme.colors.black50};
  width: 50%;

  @media (min-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-width: 33%;
    margin: 20px 0;
    margin-left: 30px;
    padding: 0 0 0 30px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 0 0 50px;
    margin-left: 50px;
  }

  .MegaNavChild__Title {
    font-size: ${theme.fonts.body};
    color: ${theme.colors.secondary};
    margin-bottom: 10px;
    width: 100%;
  }

  .MegaNavMenuLink__Text {
    text-transform: capitalize;
    font-weight: 300;
    width: 100%;
  }

  .MegaNavMenuLink__BrandsSearch {
    display: block;
    text-transform: capitalize;
    font-weight: 300;
    width: calc(50% - 20px);
    margin-bottom: 3px;
    cursor: pointer;
    margin-right: 20px;

    @media (min-width: ${theme.breakpoints.md}) {
      width: 100%;
    }

    span {
      padding-bottom: 2px;
    }

    &.is-active {
      span {
        border-bottom: 1px solid ${theme.colors.primary};
      }
    }
  }
`

export const MegaNavMenuLink = styled(LinkFormatter)`
  text-decoration: none;
  color: ${theme.colors.primary};
  width: 100%;

  padding-right: 15px;
  display: inline-block;
  margin-bottom: 5px;

  @media (min-width: ${theme.breakpoints.md}) {
    padding-right: 20px;
    max-width: 150px;
  }
`

export const MegaNavItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const MegaNavFeaturedItem = styled(LinkFormatter)`
  width: 100%;
  margin: 20px 0 5px;
  display: flex;
  text-decoration: none;

  @media (min-width: ${theme.breakpoints.md}) {
    margin: 20px 0;
    width: 350px;
  }

  .MegaNavChild__Title {
    font-size: ${theme.fonts.body};
    color: ${theme.colors.secondary};
    margin-bottom: 10px;
  }

  .MegaNavChild__Body {
    font-weight: 300;
    color: ${theme.colors.primary};
  }
`

export const MegaNavFeaturedItemBody = styled.div`
  width: 100%;
  margin-left: 20px;
`

export const MegaNavImage = styled(Image)`
  min-width: 125px;
  height: 125px;
  border-radius: 5px;

  @media (min-width: ${theme.breakpoints.md}) {
    min-width: 150px;
    height: 150px;
  }
`

export const NavigationBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 0 15px;

  svg {
    transform: rotate(180deg);
  }
`
