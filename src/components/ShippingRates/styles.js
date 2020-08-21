import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import Button from '~/components/Utilities/Button'

export const RatesContainer = styled.section`
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    width: 50%;
  }

  > * {
    width: 100%;

    &:first-of-type {
      margin-bottom: 25px;

      @media (min-width: ${props => props.theme.breakpoints.md}) {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      width: 50%;
    }
  }

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

export const RatesTitle = styled(Title)`
  margin-bottom: 20px;
`

export const RatesText = styled(Text)``

export const RatesButton = styled(Button)`
  margin-top: 20px !important;
`

export const RatesHeader = styled.header`
  padding-right: 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding-right: 20px;
  }
`

export const RatesForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .MuiFormControl-root {
    width: 100%;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }

  .AddressSelectionContainer {
    width: 100%;
  }
  `

export const RatesOutput = styled.div`
  padding: 15px;
  background: ${props => props.theme.colors.background};
  margin-top: 20px;
  max-height: 136px;
  overflow-y: scroll;
`

export const RatesSingleOutput = styled.div`
  &:not(:last-of-type) {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
  }
`
