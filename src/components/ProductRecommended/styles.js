import styled from '@emotion/styled'
import { theme } from '~/utils/styles'

export const ProductRecommendedContainer = styled.div`
  margin-top: 30px;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 0;
  }

  .ProductTileContainer {
    max-width: 220px;
  }
`