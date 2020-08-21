import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import { Rating } from '@material-ui/lab'

export const ProductStarRating = styled(Rating)`
  color: ${props => props.theme.colors.secondary} !important;

  .MuiRating-label {
    margin-bottom: 0;
  }
`

export const ProductStarRatingText = styled(Text)`
  margin-left: 10px;
`

export const ProductStarRatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  margin-top: -2px;

  .DotLoader {
    & > div > div {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`
