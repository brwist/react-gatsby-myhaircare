import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Button from '~/components/Utilities/Button'
import Slider from 'react-slick'

export const SliderButton = styled(Button)`
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 8px !important;
    max-width: initial !important;
    width: auto !important;
    min-width: 80px !important;
  }
`

export const CollectionSliderStyled = styled(Slider)`
  margin-top: 20px;
  padding: 20px 20px 0 20px;
  border-top: 1px solid ${theme.colors.gray};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 20px 10px;
  }

  .slick-slide {
    text-align: center;
  }

  .slick-track {
    display: flex;
  }

  .arrow {
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
  }

  .arrow--right {
    right: -5px;
  }

  .arrow--left {
    left: -5px;
  }
`
