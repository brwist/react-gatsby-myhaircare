import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Text from '~/components/Utilities/Text'
import { Rating } from '@material-ui/lab'

export const FooterWrapper = styled.div`
  background: #f6f6f6;
`

export const AccordionContainer = styled.div`
  width: 100%;

  .MuiAccordion-root {
    max-width: calc(100% - 36px);
    width: 100%;
    margin: 0 auto;

    &.Mui-expanded {
      margin: 0;
    }
  }

  .MuiAccordionSummary-root {
    background: ${theme.colors.secondary};
  }

  .MuiAccordionSummary-content {
    flex-grow: initial;

    .Text {
      margin-bottom: 0;
      color: ${theme.colors.primary};
    }
  }

  .MuiSvgIcon-root {
    fill: ${theme.colors.primary};
  }

  .MuiAccordionDetails-root {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    background: ${theme.colors.peach50};

    a {
      text-decoration: none;

      &:last-of-type {
        .Text {
          margin-bottom: 0;
        }
      }
    }
  }
`

export const FooterContainer = styled.footer`
  max-width: 1040px;
  padding: 40px 0 30px;
  margin: 0 auto;

  @media (min-width: 700px) {
    padding: 100px 0 26px;
  }
`

export const CopyrightText = styled(Text)`
  text-align: center;

  @media (max-width: 700px) {
    font-weight: 300 !important;
  }
`

export const FooterMenuItems = styled.div`
  display: flex;
  margin-bottom: 35px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 700px) {
    margin-bottom: 90px;
    flex-direction: row;
    align-items: initial;
  }
`

export const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    margin-right: 60px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    margin-right: 140px;
  }

  &:last-of-type {
    margin-right: 0;
  }

  .Footer__Logo {
    width: 160px;
  }

  a {
    text-decoration: none;
  }
`

export const MenuItemTitle = styled(Text)`
  color: ${theme.colors.secondary};
  margin-bottom: 20px;
`

export const MenuItem = styled(Text)`
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`

export const RatingFooter = styled.div`
  text-align: center;
  margin-top: 20px;

  @media (max-width: 700px) {
    margin-bottom: 35px;
  }
`

export const RatingFooterStars = styled(Rating)`
  color: ${props => props.theme.colors.secondary} !important;

  .MuiRating-label {
    margin-bottom: 0;
  }
  .MuiSvgIcon-root {
    fill: ${props => props.theme.colors.secondary} !important;
  }
`

export const RatingFooterText = styled(Text)`
  margin-top: 5px;
  color: ${props => props.theme.colors.black50};
`

// export const RatingStarsContainer = styled.div``
