import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Text from '~/components/Utilities/Text'
import Image from 'gatsby-image'

export const PromoTileContainer = styled.div`
  padding: 25px 15px 15px 15px;
  background: linear-gradient(0deg, #deac9d 40%, #f7d9d6 40%);
`

export const PromoCodeCaption = styled(Text)`
  margin-top: 10px;
  background: ${theme.colors.tertiary};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: ${theme.letterSpacing.heading5} !important;
`

export const PromoBody = styled.div`
  font-size: ${theme.fonts.heading5};
  font-weight: 300;
  letter-spacing: ${theme.letterSpacing.heading5};
  line-height: 1.3;
  text-align: center;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fonts.heading4};
  }
`

export const PromoImage = styled(Image)`
  margin-top: 30px;
`
