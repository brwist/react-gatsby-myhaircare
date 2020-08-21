import styled from '@emotion/styled'

export const GenericPageContainer = styled.div`
  width: 100%;
  padding: 20px 18px 20px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 25px 80px 20px;
    margin-bottom: 60px;
  }
`

export const AccordionContainer = styled.div`
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    width: ${props => (props.halfWidth ? 'calc(50% - 10px)' : '100%')};
  }
`
