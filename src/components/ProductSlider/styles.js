import styled from '@emotion/styled'

export const ProductSliderContainer = styled.div`
  display: block;
  padding-left: 15px;
  padding-right: 15px;

  a {
    text-decoration: none;
  }
`

export const GalleryWrapper = styled.div`
  position: relative;
  overflow: visible;

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .arrow--left {
    left: -10px;
  }

  .arrow--right {
    right: -10px;
  }
`
