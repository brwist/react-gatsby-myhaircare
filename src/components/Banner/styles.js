import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Image from 'gatsby-image'

export const BannerTitle = styled(Title)`
  margin-bottom: 20px;
`

export const BannerText = styled(Text)``

export const BannerImage = styled(Image)`
  flex: 1;
`

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const BannerContent = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${theme.breakpoints.s}) {
    padding: 0 25px 20px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 60px 0 0;
    min-height: 200px;
  }

  .Link {
    margin-top: 20px;
  }
`