import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import Button from '~/components/Utilities/Button'
import LinkFormatter from '~/components/LinkFormatter'

export const SearchTileTitle = styled(Text)`
  text-decoration: none;
  
`

export const SearchTileAddToCart = styled(Button)`
  margin-top: -5px !important;
`

export const SearchTileContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;

  .PriceContainer {
    margin: 10px 0;
    justify-content: flex-start;
  }
`

export const SearchTileContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SearchTileImg = styled.img`
  width: auto;
  max-height: 80px;
`

export const SearchLinkToHandle = styled(LinkFormatter)`
  width: 100%;
  max-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`