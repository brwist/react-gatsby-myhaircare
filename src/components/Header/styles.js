import styled from '@emotion/styled'
import { theme } from '~/utils/styles'

export const HeaderBg = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 3;
`

export const HeaderContainer = styled.header`
  background: ${theme.colors.tertiary};
  transition: 350ms ease-out;
  transition-property: height, transform;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 40px;
  }

  .Header__Logo {
    width: 101px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    @media (min-width: ${theme.breakpoints.s}) {
      width: 240px;
    }
  }

  .MenuLink {
    transition: background 150ms linear;

    &:hover {
      background: ${theme.colors.peach50};
    }
  }
`

export const HeaderContent = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: 350ms ease-out;
  transition-property: padding;
  will-change: padding;
  background: ${props => props.theme.colors.tertiary};

  @media (min-width: ${theme.breakpoints.s}) {
    padding: 35px 30px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 1300px;
    padding: ${props => (props.scrollY > 30 ? '15px' : '35px 15px')};
  }
`

export const CartCounter = styled.span`
  position: relative;
  margin-left: 13px;

  & > span {
    color: ${theme.colors.primary};
    font-size: 7px;
    position: absolute;
    top: calc(50% + 4px);
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const CartCounterContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    fill: ${props => props.theme.colors.secondary};
  }
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 13px;
  margin-bottom: -1px;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-right: 0;
    margin-bottom: 0px;
  }

  svg {
    fill: ${props => props.theme.colors.secondary};
  }
`

export const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    fill: ${props => props.theme.colors.secondary};
    transform: scale(1.2);
  }
`
