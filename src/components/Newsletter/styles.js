import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Title from '~/components/Utilities/Title'
import Text from '~/components/Utilities/Text'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'

export const NewsletterContainer = styled.div`
  background: ${theme.colors.peach50};

  &.secondary {
    @media (min-width: ${theme.breakpoints.md}) {
      .NewsletterContent {
        display: flex;
        max-width: 1200px;
        padding: 0 100px;
        align-items: center;
        min-height: 80px;
        justify-content: space-between;
      }
  
      .NewsletterForm {
        min-width: 560px;
      }
  
      .NewsletterContent__Body {
        margin: 0;
        text-align: left;
        display: block;
        margin-right: 40px;
        margin-left: 20px;
      }

      .NewsletterContent__Title {
        margin: 0;
      }
    }
  }
`

export const NewsletterContent = styled.div`
  padding: 30px 15px 40px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  max-width: 290px;

  @media (min-width: ${theme.breakpoints.s}) {
    max-width: 660px;
    padding: 30px 15px 50px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 1100px;
    padding: 15px 50px;
    display: flex;
    align-items: center;
  }
`

export const NewsletterForm = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.s}) {
    flex-direction: row;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    min-width: 540px;
  }

  .Button {
    white-space: nowrap;
    height: 40px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    margin-top: 10px;
    max-width: 100%;

    @media (min-width: ${theme.breakpoints.s}) {
      margin-top: 0;
      max-width: 130px;
    }
  }
`

export const NewsletterTitle = styled(Title)`
  margin-bottom: 20px;

  @media (min-width: ${theme.breakpoints.md}) {
    text-align: left;
    margin: 0;
  }
`

export const NewsletterBody = styled(Text)`
  margin-bottom: 25px;

  @media (min-width: ${theme.breakpoints.md}) {
    text-align: left;
    margin: 0;
    padding-right: 20px;
  }
`

export const NewsletterInput = withStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    background: theme.colors.tertiary,
    padding: 0,
    height: 40,
    fontWeight: 500,
    fontSize: theme.fonts.links,
    letterSpacing: '1.43px',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: theme.colors.primary,
  },
})(Input)

export const NewsletterFormMessage = styled(Text)`
  text-align: center;
  position: absolute;
  bottom: -35px;
  right: 0;

  @media (min-width: ${theme.breakpoints.s}) {
    bottom: -40px;
  }

  @media (max-width: ${theme.breakpoints.s}) {
    font-size: ${theme.fonts.smallText} !important;
    left: 50%;
    transform: translateX(-50%);
  }
`
