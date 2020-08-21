import styled from '@emotion/styled'
import { theme } from '~/utils/styles'
import Button from '~/components/Utilities/Button'

export const BlogContainer = styled.div`
  width: 100%;
  padding: 20px 18px 20px;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 25px 80px 20px;
  }
`

export const BlogGrid = styled.div`
  margin-top: 40px;
  padding-top: 40px;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: ${theme.breakpoints.s}) {
    margin-top: 20px;
    padding-top: 20px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    margin-top: 25px;
    padding-top: 25px;
  }
  
  &::before {
    content: '';
    border-bottom: 1px solid ${theme.colors.gray};
    position: absolute;
    max-width: 1000px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }

  & > * {
    width: 100%;
    margin-right: 0px;
    display: block;
    
    @media (min-width: ${theme.breakpoints.s}) {
      width: calc(50% - 10px);
      margin-right: 20px;
    }

    @media (min-width: ${theme.breakpoints.md}) {
      margin-right: 20.25px;
      width: calc(33.33% - 13.5px);
    }
  }

  & > *:nth-of-type(2n) {
    margin-right: 0;

    @media (min-width: ${theme.breakpoints.md}) {
      margin-right: 20.25px;
    }
  }

  & > *:nth-of-type(3n) {
    margin-right: 20.25px;

    @media (min-width: ${theme.breakpoints.md}) {
      margin-right: 0px;
    }
  }
`

export const LoadMoreBtn = styled(Button)`
  margin: 20px auto !important;
  display: block !important;

  @media (min-width: ${theme.breakpoints.md}) {
    margin: 60px auto !important;
  }
`