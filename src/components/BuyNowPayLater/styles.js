import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Title from '~/components/Utilities/Title'

export const PaymentDialog = withStyles({
  paperWidthSm: {
    width: '100%',
    maxWidth: '750px !important',
    background: '#ffffff',
    borderRadius: '0 !important',
  },
})(Dialog)

export const PaymentDialogTitle = withStyles({
  root: {
    padding: 18,
    borderBottom: `1px solid black`,
    '& > h2': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '& .ZipLogo': {
      height: 60,
      margin: '-18px 0px -18px -12px',
    },
  },
})(DialogTitle)

export const BuyNowPayLaterText = styled(Text)`
  .AfterPayLogo {
    width: 63px;
    height: 12px;
    margin: 0px 2px 0 -3px;
  }

  .ZipLogo {
    height: 23px;
    width: 37px;
    margin: 0 0px 0 -6px;
  }
`

export const BuyNowPayLaterContainer = styled.div`
  margin-top: 10px;
  padding: 12px;
  background: ${props => props.theme.colors.background};
  display: inline-block;
`

export const ModalContent = styled.div`
  padding: 18px;
`

export const CloseIconContainer = styled.div`
  rect {
    fill: ${props => (props.componentColor ? props.componentColor : '')};
  }
  cursor: pointer;
`

export const ModalContentTitle = styled(Title)`
  text-align: center;
  width: 100%;
  padding: 20px 100px 40px;
`

export const ModalContentColumns = styled.div`
  display: flex;

  & > * {
    flex: 1;

    &:not(:last-of-type) {
      margin-right: 15px;
    }
  }
`

export const ModalContentColumnItem = styled.div`
  text-align: center;
  padding: 15px;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ModalContentColumnImage = styled.img``

export const ModalContentColumnTitle = styled(Title)`
  margin: 10px 0;
`

export const ModalContentColumnBody = styled(Text)``

export const ModalContentColumn = styled.div`
  margin-top: 45px;

  h1 {
    font-size: ${props => props.theme.fonts.heading3};
    letter-spacing: ${props => props.theme.letterSpacing.heading3};
    font-weight: 300;
    font-style: normal;
  }

  h2 {
    font-size: ${props => props.theme.fonts.heading4};
    letter-spacing: ${props => props.theme.letterSpacing.heading4};
    font-weight: 300;
    font-style: normal;
    text-transform: uppercase;
  }

  h3,
  h4,
  h5 {
    font-size: ${props => props.theme.fonts.heading5};
    letter-spacing: ${props => props.theme.letterSpacing.heading5};
    font-weight: 400;
    font-style: normal;
    text-transform: uppercase;
  }

  ul {
    padding-left: 20px;
    list-style: none;
  }

  li {
    margin: 15px 0;
    position: relative;
    font-size: ${props => props.theme.fonts.body};
    letter-spacing: ${props => props.theme.letterSpacing.body};
    font-weight: normal;
    font-style: normal;
    line-height: 1.5;

    &::before {
      position: absolute;
      content: '';
      background: ${props => props.theme.colors.secondary};
      width: 2px;
      height: 100%;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  p {
    font-size: ${props => props.theme.fonts.body};
    letter-spacing: ${props => props.theme.letterSpacing.body};
    font-weight: normal;
    font-style: normal;
    line-height: 1.5;
  }

  a {
    font-weight: 500;
    text-transform: uppercase;
    font-size: ${props => props.theme.fonts.links};
    color: ${props => props.theme.colors.secondary};
    letter-spacing: 1.14px;
    display: inline-block;
    text-decoration: none;
    transition: 150ms linear;
    transition-property: color, border-color;
    position: relative;
    cursor: pointer;
    margin-left: 2px;

    &:hover {
      color: ${props => props.theme.colors.primary};

      &::before,
      &::after {
        background: ${props => props.theme.colors.primary};
      }

      &::after {
        transform: scaleX(1);
      }

      &::before {
        transform: scaleX(0);
      }
    }

    &::before,
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      transition: transform 200ms linear;
      transform-origin: right;
      background: ${props => props.theme.colors.secondary};
    }

    &::after {
      transform: scaleX(0);
      transition-delay: 250ms;
      transform-origin: left;
    }
  }
`
