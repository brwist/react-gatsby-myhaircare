import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Text from '~/components/Utilities/Text'

export const FilterContainer = styled.div`
  margin-bottom: 20px;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: 0px;
  }

  .MuiAccordion-root {
    box-shadow: none;
    border-bottom: 1px solid ${theme.colors.gray};
    border-radius: 0 !important;

    &.Mui-expanded {
      margin: 0;
    }

    &::before {
      display: none;
    }

    .MuiAccordionSummary-root {
      padding: 0;

      &.Mui-expanded {
        min-height: 50px;
      }
    }

    .MuiFormGroup-root {
      flex-wrap: initial;
      max-height: 250px;
      overflow-y: scroll;
      padding-left: 10px;
      width: 100%;
    }

    .MuiAccordionSummary-content {
      font-size: ${theme.fonts.cta};
      letter-spacing: ${theme.letterSpacing.cta};
      text-transform: uppercase;
      margin: 0 10px;
      margin-left: 0;
    }

    .MuiAccordionDetails-root {
      margin-top: -10px;

      .Mui-disabled {
        .MuiCheckbox-root {
          opacity: 0.5;
        }  
      }

      .MuiCheckbox-root {
        color: ${theme.colors.primary};
      }

      .MuiFormControlLabel-root {
        margin-bottom: 0;
      }

      .MuiTypography-root {
        font-size: ${theme.fonts.cta};
        letter-spacing: ${theme.letterSpacing.cta};
        text-transform: capitalize;
      }
    }

    .MuiCheckbox-colorSecondary.Mui-checked {
      color: ${theme.colors.primary};
    }

    .MuiAccordionDetails-root {
      padding: 0;
    }
  }
`

export const LabelText = styled(Text)`
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.gray};
`

export const PriceContainer = styled.div`
  margin-top: 20px;

  .MuiFormControl-root {
    width: 100%;

    & > p {
      padding-bottom: 5px;
      border-bottom: 0px;
    }
  }

  .MuiSlider-root {
    color: ${theme.colors.primary};
    width: calc(100% - 10px);
    margin: 0 auto;
  }
`
