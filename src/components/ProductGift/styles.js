import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import Image from 'gatsby-image'
import { theme } from '~/utils/styles'
import LinkFormatter from '~/components/LinkFormatter'

export const ProductGiftContainer = styled(LinkFormatter)`
  background: ${theme.colors.background};
  margin-top: 15px;
  padding: 10px 70px 10px 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.primary};

  img {
    max-width: 108px;
  }
`

export const ProductGiftTitle = styled(Text)`
  margin-bottom: 15px;
`

export const ProductGiftBody = styled(Text)``

export const ProductGiftImage = styled(Image)``

export const ProductGiftContent = styled.div`
  margin-left: 35px;
`
