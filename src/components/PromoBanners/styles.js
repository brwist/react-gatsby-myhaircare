import styled from '@emotion/styled'
import LinkFormatter from '~/components/LinkFormatter'
import { theme } from '~/utils/styles'
import { css, keyframes } from '@emotion/core';

const reveal = () => css`
  ${keyframes`
    to {
      opacity: 1;
    }
  `} 1s linear forwards;
`;

const animation = props => css`
  ${keyframes`
  to {
    transform: translateX(-${props.bannerInnerWidth}px);
  }
`} ${props.timing}s linear infinite
`;

export const PromoLink = styled(LinkFormatter)`
  text-decoration: none;
  color: ${theme.colors.tertiary};
`

export const PromoBannerSecondaryContainer = styled.div`
  background: ${theme.colors.primary};
  color: ${theme.colors.tertiary};
  text-align: center;
  width: 100%;
  animation-delay: 0.5s;
  animation: ${({ playAnimation }) => (playAnimation ? reveal : 'initial')}

  @media (min-width: ${theme.breakpoints.md}){
    animation: initial;
  }
`;

export const PromoBannerSecondaryContent = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${({ playAnimation }) => (playAnimation ? animation : 'initial')}
  animation-delay: 0.1s;
  transform: ${({ parentElementInnerWidth, isVisibleOnLoad }) =>
    parentElementInnerWidth !== 0 && !isVisibleOnLoad
      ? `translateX(${parentElementInnerWidth + 50}px)`
      : `translateX(0)`};

  @media (min-width: ${theme.breakpoints.md}){
    animation: initial;
    max-width: 800px;
  }

  & > * {
    padding: 14px 50px;
    white-space: nowrap;

    @media (min-width: ${theme.breakpoints.md}){
      padding: 15px 50px;
      white-space: pre-wrap;
    }
  }
`;

export const PromoBannerPrimaryContainer = styled.div`
  background: ${theme.colors.secondary};
  text-align: center;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 1;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;

  @media (min-width: ${theme.breakpoints.md}){
    height: 40px;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
  }
`;