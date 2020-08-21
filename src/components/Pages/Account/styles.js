import styled from '@emotion/styled'
import Text from '~/components/Utilities/Text'
import Title from '~/components/Utilities/Title'
import Button from '~/components/Utilities/Button'

export const AccountContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 60px 18px;
`

export const AccountColumn = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background};
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: scroll;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 40px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: calc(33.33% - 20px);
    margin-bottom: 0;
  }

  button {
    min-width: 150px;
    margin: 20px;
  }
`

export const AccountTitle = styled(Title)`
  width: 100%;
  text-align: center;
`

export const AccountButton = styled(Button)`
  margin-bottom: 0;
`

export const AccountHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  margin-bottom: 25px;
`

export const AccountHeaderChild = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 25px;

  &:first-of-type {
    > * {
      text-align: left;
    }
  }

  &:last-of-type {
    justify-content: flex-end;
  }
`

export const AccountLogoutButton = styled(Button)`
  margin-bottom: auto;
`

export const AccountTitleWelcome = styled(Title)`
  margin-bottom: 0 !important;
`

export const AccountColumnTitle = styled(Title)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 0 !important;
  padding-bottom: 45px;
  padding-top: 30px;
  background: ${props => props.theme.colors.background};
  z-index: 1;
`

export const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EmptyText = styled(Text)`
  padding: 40px;
  text-align: center;
`

export const ExistingAddressesContainer = styled.div`
  width: 100%;

  button {
    margin: 10px 0 0 0;
    min-width: initial;
  }
`

export const SingleAddressContainer = styled.div`
  width: 100%;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`

export const AddressText = styled(Text)`
  text-align: right;
`

export const AddressTextTitle = styled(Text)`
  padding-right: 20px !important;
`

export const AddressLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  width: 100%;
  margin-bottom: 112px;

  & > * {
    width: 100%;
  }
`

export const SingleOrder = styled.div`
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`
