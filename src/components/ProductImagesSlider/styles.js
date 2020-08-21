import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'

export const DiscontinuedBadge = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  background: ${props => props.theme.colors.secondary};
  z-index: 1;
  top: -5px;
  left: -5px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 90px;
    height: 90px;
    top: -10px;
    left: -10px;
  }
`

export const DiscontinuedBadgeText = styled(Text)`
  font-size: 6px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 8px !important;
  }
`

export const ThumbnailList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  position: initial;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;

  a {
    cursor: pointer;
    display: grid;
    width: 100px;
    height: 100px;
    padding: 10px;
    margin: 0 20px 20px 0;

    &.is-active {
      border: 1px solid ${props => props.theme.colors.black20};
    }

    img {
      width: 100%;
    }
  }
`

export const ProductImagesGallery = styled.div`
  max-width: 480px;
  margin: 0 auto;

  .alice-carousel__stage-item {
    .ProductTileImage {
      transform: scale(0.95);
      transition: transform 300ms linear;
      transition-delay: 200ms;
    }

    &.__active {
      .ProductTileImage {
        transform: scale(1);
      }
    }
  }

  .slick-slide {
    padding: 20px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      top: 230px;
      transform: initial;
    }
  }

  .arrow--right {
    right: 0;
  }

  .arrow--left {
    left: 0;
  }

  .alice-carousel__dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    padding: 10px 0;
    justify-content: center;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      display: none;
    }

    li {
      border: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 5px;
      padding: 5px;
      cursor: pointer;
    }

    .alice-carousel__dots-item {
      background: ${props => props.theme.colors.secondary};

      &.__active {
        background: ${props => props.theme.colors.primary};
      }
    }

    li:focus {
      outline: none;
    }
  }
`
