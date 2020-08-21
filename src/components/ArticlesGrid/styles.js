import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Title from '~/components/Utilities/Title'

export const LatestArticlesContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: block;
  padding: 30px 18px 40px;

  @media (min-width: ${theme.breakpoints.s}) {
    padding: 45px 80px 60px;
  }
`

export const LatestArticlesContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  > * {
    width: 100%;

    @media (min-width: ${theme.breakpoints.s}) {
      width: calc(50% - 15px);
      margin-right: 30px;

      &:nth-of-type(2) {
        margin-right: 0px;
      }
    }

    @media (min-width: ${theme.breakpoints.md}) {
      width: calc(33% - 20px);
      margin-right: 30px;

      &:nth-of-type(2) {
        margin-right: 30px;
      }

      &:nth-of-type(3) {
        margin-right: 0;
      }
    }
  }
`

export const LatestArticlesTitle = styled(Title)`
  text-align: center;
  display: block;
  margin-bottom: 30px;

  @media (min-width: ${theme.breakpoints.s}) {
    margin-bottom: 45px;
  }
`
