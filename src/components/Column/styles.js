import styled from '@emotion/styled'
import Title from '~/components/Utilities/Title'

export const ColumnContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    width: ${props => (props.halfWidth ? 'calc(50% - 10px)' : '100%')};
  }

  > * {
    width: 100%;

    @media (min-width: ${props => props.theme.breakpoints.s}) {
      width: calc(50% - 10px);
    }

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      width: calc(33.33% - 10px);
    }
  }
`

export const ColumnTitle = styled(Title)`
  margin-bottom: 40px;
  text-align: center;
  width: 100%;
`
