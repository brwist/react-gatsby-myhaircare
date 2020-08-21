import styled from '@emotion/styled'
import { createMuiTheme } from '@material-ui/core/styles'
import { theme as localTheme } from '~/utils/styles'
import { Form } from '~/components/Connection/styles'
import { SelectContainer } from '~/utils/styles'

export const AddressForm = styled(Form)`
  height: 100%;
  width: 100%;
`

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
        fontSize: 10,
        letterSpacing: localTheme.letterSpacing.body,
        textTransform: 'uppercase',
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
        fontFamily: `${localTheme.fontFamily.primary} !important`
      },
    },
  },
})

export const AddressSelectionContainer = styled(SelectContainer)`
  .MuiFormControl-root {
    width: 100%;
    margin-bottom: 18px;
  }

  .MuiNativeSelect-select {
    min-height: 34px;
    padding-bottom: 7px;
    font-size: 14px;
    letter-spacing: initial;
    text-transform: capitalize;
  }
`
