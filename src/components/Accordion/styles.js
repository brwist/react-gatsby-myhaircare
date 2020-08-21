import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'

export const AccordionContent = styled(Text)`
  padding: 20px;

  *:not(:last-of-type) {
    margin-bottom: 20px;
  }
`