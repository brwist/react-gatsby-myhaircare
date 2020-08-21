import styled from '@emotion/styled'
import { DrawerHeader } from '~/components/Drawer/styles'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import Button from '~/components/Utilities/Button'

export const CartCheckoutButton = styled(Button)`
  width: 100% !important;
  max-width: 100% !important;
`

export const CartFlyoutContainer = styled.div`
  .CartFlyoutDrawer {
    max-width: 320px;
  }
`

export const CartHeaderTitle = styled(Title)``

export const CartFlyoutHeader = styled(DrawerHeader)`
  left: initial;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 18px;
`

export const SubtotalContainer = styled.div`
  padding: 18px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 320px;
  background: ${props => props.theme.colors.tertiary};
`

export const SubtotalContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`
export const SubtotalTitle = styled(Title)``

export const SubtotalText = styled(Text)``

export const ItemsContainer = styled.div`
  margin-bottom: 224px;
`
