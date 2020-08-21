import styled from '@emotion/styled'
import { DrawerHeader } from '~/components/Drawer/styles'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import TextField from '@material-ui/core/TextField'

export const SearchFlyoutContainer = styled.div`
  .SearchFlyoutDrawer {
    max-width: 320px;
  }
`

export const SearchInput = styled(TextField)`
  .Mui-focused {
    color: ${props => props.theme.colors.primary} !important;

    .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.colors.primary} !important;
    }
  }
`

export const SearchHeaderTitle = styled(Title)``

export const SearchFlyoutHeader = styled(DrawerHeader)`
  left: initial;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 18px;
`

export const SearchText = styled(Text)`
  text-align: center;
`

export const SearchResults = styled.div`
  margin-top: 30px;
`

export const SearchEmpty = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`