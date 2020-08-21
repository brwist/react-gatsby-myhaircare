import styled from '@emotion/styled'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Image from 'gatsby-image'

export const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    width: ${props => (props.halfWidth ? 'calc(50% - 10px)' : '100%')};
  }
`

export const ContentTitle = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
`

export const ContentText = styled(Text)`
  *:not(:last-of-type) {
    margin-bottom: 20px;
  }

  ol,
  ul {
    padding-left: 20px;
    margin-bottom: 20px;
  }
`

export const ContentImage = styled(Image)`
  margin-bottom: 20px;
`
