import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Text from '~/components/Utilities/Text'
import Icon from '~/components/Icon'

export const ListItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  margin-bottom: 30px;
  position: relative;
`

export const ListItemTitle = styled(Text)``

export const ListItemLinkContainer = styled(Link)`
  margin-right: 10px;
  max-width: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: 80px;
  }
`

export const RemoveItemIcon = styled(Icon)`
  width: 24px;
`

export const RemoveItemContainer = styled.div`
  top: -5px;
  position: absolute;
  right: 0;

  svg * {
    fill: ${props => props.theme.colors.primary};
  }
`

export const SelectedOption = styled(Text)``

export const ListItemContent = styled.div`
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

export const OptionsContainer = styled.div`
  margin-top: 10px;
  font-size: 8px;
`

export const QuantityContainer = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
    margin-bottom: 0;
  }

  & > div {
    margin-bottom: 0 !important;
  }

  div[data-quantity] {
    width: 24px;
    height: 24px;

    svg {
      width: 15px;
      height: 15px;
    }
  }

  span {
    margin-bottom: 0
    width: 24px;
    height: 24px;
    border: 0;
    padding: 0;
  }
`

export const ListItemPriceContainer = styled(Text)`
  margin-top: 5px;
  display: inline-block;
  text-decoration: underline;
`
