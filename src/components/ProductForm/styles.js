import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import { theme } from '~/utils/styles'
import Button from '~/components/Utilities/Button'
import { keyframes } from '@emotion/core'

const bounce = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const ProductFormContainer = styled.div`
  .MuiFormControl-root {
    width: calc(100% - 110px);
    position: relative;

    @media (min-width: ${theme.breakpoints.md}) {
      width: calc(100% - 153px);
    }

    svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 4px;
      pointer-events: none;
      height: 100%;
      border-left: 1px solid ${theme.colors.primary};
      padding-left: 5px;
      box-sizing: content-box;

      rect {
        fill: ${theme.colors.primary};
      }
    }
  }

  .MuiInput-formControl {
    border: 1px solid ${theme.colors.primary};

    &::before {
      display: none;
    }

    &::after {
      border-color: ${theme.colors.primary};
    }

    &.Mui-focused {
      svg {
        transform: translateY(-50%) rotate(180deg);
        border-right: 1px solid ${theme.colors.primary};
        border-left: 0px solid ${theme.colors.primary};
        padding-left: 0;
        padding-right: 5px;
      }
    }
  }

  .MuiNativeSelect-select {
    padding-top: 13px;
    padding-bottom: 14px;
    padding-left: 10px;
    font-size: ${theme.fonts.cta};
    letter-spacing: ${theme.letterSpacing.cta};
    text-transform: uppercase;
    line-height: 1.5;
    font-weight: 300;
  }
`

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;

  .CompareAtPrice {
    margin-left: 10px;
    text-decoration: line-through;
    color: red;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`

export const ProductPrice = styled(Title)`
  font-weight: 400 !important;
  letter-spacing: 1px !important;
  margin-bottom: 7px;
`

export const ProductSelectionContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 80px;
    margin-bottom: 5px;
  }
`

export const AddToCartButton = styled(Button)`
  width: 100% !important;
  max-width: 100% !important;
`

export const QuantityInput = styled.span`
  width: 40px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: ${props => props.theme.colors.black5};
`

export const QuantityIncrement = styled.div`
  height: 100%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.black5};
  cursor: pointer;

  > * {
    pointer-events: none;
  }

  &:hover,
  &:focus {
    svg {
      transform: scale(0.8);
    }
  }
  svg {
    transition: transform 150ms linear;
  }
`

export const QuantityDecrement = styled.div`
  height: 100%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.black5};
  cursor: pointer;

  > * {
    pointer-events: none;
  }

  &:hover,
  &:focus {
    svg {
      transform: scale(0.8);
    }
  }
  svg {
    transition: transform 150ms linear;
  }
`

export const QuantityLabel = styled(Text)``

export const AvailabilityContainer = styled.div`
  margin-top: 15px;
  background: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;

  @media (min-width: ${theme.breakpoints.s}) {
    padding: 0 10px;
    height: 38px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    text-align: left;
  }

  svg {
    margin-right: 10px;
  }
`

export const ColorSwatchesContainer = styled.div``

export const ColorSwatchesList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 280px;

  @media (max-width: ${theme.breakpoints.s}) {
    max-width: 185px;
  }
`

export const ColorSwatch = styled.li`
  background: black;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  cursor: pointer;
  transition: transform 150ms ease;
  position: relative;

  &::before {
    transition-property: opacity, transform;
    border-radius: 50%;
    transition: 150ms;
    content: '';
    opacity: 0;
    width: 44px;
    height: 44px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${theme.colors.primary};
  }

  &::after {
    transition-property: opacity, transform;
    border-radius: 50%;
    transition: 300ms ease-out;
    content: '';
    opacity: 0;
    width: 36px;
    height: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${theme.colors.primary};
  }

  &.selected {
    transform: scale(0.9);

    &::after {
      animation: ${bounce} 300ms forwards;
      transform: translate(-50%, -50%) scale(1.8);
    }

    &::before {
      opacity: 1;
    }
  }
`

export const ProductActionsContainer = styled.div`
  display: flex;
  align-items: flex-end;

  button {
    height: 40px;
  }

  > div > div {
    margin-bottom: 0 !important;
  }  
`