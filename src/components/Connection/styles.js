import styled from '@emotion/styled'
import { createMuiTheme } from '@material-ui/core/styles'
import { theme as localTheme } from '~/utils/styles'
import Text from '~/components/Utilities/Text'

export const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: '430px !important',
        width: '100%',
        margin: '10px !important',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0 !important',
      },
    },
    MuiDrawer: {
      paper: {
        background: localTheme.colors.tertiary,
      },
    },
    MuiDialogTitle: {
      root: {
        borderBottom: `1px solid ${localTheme.colors.secondary}`,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
        marginBottom: 18,
        fontSize: 14,
        letterSpacing: localTheme.letterSpacing.body,
      },
      notchedOutline: {
        borderColor: localTheme.colors.primary,
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: 14,
      },
    },
    MuiTypography: {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: `${localTheme.fonts.body} !important`,
        letterSpacing: `${localTheme.letterSpacing.body} !important`,
        fontFamily: `${localTheme.fontFamily.primary} !important`,
      },
    },
  },
})

export const Form = styled.form`
  padding: 18px;
  margin-top: 18px;

  .Mui-focused {
    color: ${props => props.theme.colors.primary} !important;

    .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.colors.primary} !important;
    }
  }

  .Mui-checked {
    color: ${props => props.theme.colors.primary} !important;
  }
`

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`

export const OtherFormContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 18px;
  }
`

export const FormText = styled(Text)`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`
