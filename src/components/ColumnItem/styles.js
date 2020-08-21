import styled from '@emotion/styled'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Image from 'gatsby-image'

export const ColumnItemTitle = styled(Title)`
  text-align: center;
  margin-bottom: 20px;
`

export const ColumnItemText = styled(Text)`
  margin-bottom: 20px;
`

export const ColumnItemImage = styled(Image)`
  max-width: 250px;
  margin: 0 auto 20px;
`

export const ColumnItemContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`