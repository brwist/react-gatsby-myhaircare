import React from 'react'
import Image from 'gatsby-image'
import styled from '@emotion/styled'
import LinkFormatter from '~/components/LinkFormatter'
import { Global, css } from '@emotion/core'
import reset from './reset'

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const theme = {
  colors: {
    peach: '#FAC2A5',
    peach50: 'rgba(250, 194, 165, 0.5)',
    peach20: 'rgba(250, 194, 165, 0.2)',
    black: '#000000',
    black50: 'rgba(32, 32, 32, 0.5)',
    black20: 'rgba(32, 32, 32, 0.2)',
    black10: 'rgba(32, 32, 32, 0.1)',
    black5: 'rgba(32, 32, 32, 0.05)',
    gray: '#979797',
    primary: '#202020',
    secondary: '#FAC2A5',
    tertiary: '#ffffff',
    background: '#f6f6f6',
    success: '',
    error: '',
  },
  breakpoints: {
    xxs: '350px',
    xs: '400px',
    s: '600px',
    md: '960px',
    l: '1100px',
    lg: '1280px',
    xl: '1920px',
  },
  fontFamily: {
    primary: 'Azo Sans',
  },
  fonts: {
    heading1: '60px',
    heading2: '50px',
    heading3: '35px',
    heading4: '20px',
    heading5: '16px',
    subheading1: '20px',
    bigText: '18px',
    body: '12px',
    smallText: '10px',
    cta: '10px',
    links: '10px',
  },
  letterSpacing: {
    heading1: '3px',
    heading2: '3px',
    heading3: '1.75px',
    heading4: '1.71px',
    heading5: '1.92px',
    subheading1: '1px',
    body: '0.2px',
    smallText: '1.42px',
    cta: '1.42px',
    links: '1.42px',
  },
  scale: (value, by = 0.1) => {
    by = 1 - by

    if (value.indexOf(' ') >= 0) {
      value = value.split(' ')
      value = value
        .map(v => `${Math.floor(+v.split('px')[0] * by)}px`)
        .join(' ')
      return value
    } else {
      value = value.split('px')[0]
      value = value * by
      return `${Math.floor(value)}px`
    }
  },
}

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      ${reset};

      body {
        margin: 0;
        font-family: 'Azo Sans';
        color: #202020;
        margin-top: 84px;

        @media (min-width: ${theme.breakpoints.s}) {
          margin-top: 129px;
        }

        @media (min-width: ${theme.breakpoints.md}) {
          margin-top: 186px;
        }
      }
      html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      .section {
        padding: 25px 0 10px;
        overflow: hidden;

        @media (min-width: ${theme.breakpoints.s}) {
          padding: 45px 80px 0 80px;
          max-width: 1440px;
          margin: 0 auto;
        }

        .Title {
          width: 100%;
          text-align: center;
          margin-bottom: 28px;

          @media (min-width: ${theme.breakpoints.s}) {
            margin-bottom: 45px;
          }
        }
      }

      .arrow {
        cursor: pointer;
        z-index: 1;
      }

      :root {
        --color-swatches-gap: var(--space-xxs); // gap among swatches
        --color-swatch-size: 32px; // swatch height and width
        --color-swatch-radius: 50%; // swatch border radius
      }

      .fade-enter {
        opacity: 0;
      }
      .fade-exit {
        opacity: 1;
      }
      .fade-enter-active {
        opacity: 1;
      }
      .fade-exit-active {
        opacity: 0;
      }
      .fade-enter-active,
      .fade-exit-active {
        transition: opacity 300ms;
      }

      .CartFlyoutDrawer {
        .MuiPaper-root {
          max-width: 320px;
          width: 100%;
          padding: 90px 18px 18px;
          position: relative;
          margin-left: auto;
        }

        .MuiDrawer-paper {
          background: ${theme.colors.tertiary};
        }
      }

      .jdgm-xx {
        left: 0;
      }
      .jdgm-prev-badge[data-average-rating='0.00'] {
        display: none !important;
      }
      .jdgm-author-all-initials {
        display: none !important;
      }
      .jdgm-author-last-initial {
        display: none !important;
      }
      .jdgm-rev__replier:before {
        content: 'myhaircarebeauty.myshopify.com';
      }
      .jdgm-rev__prod-link-prefix:before {
        content: 'about';
      }
      .jdgm-rev__out-of-store-text:before {
        content: '(out of store)';
      }

      @media only screen and (min-width: 768px) {
        .jdgm-rev__pics .jdgm-rev_all-rev-page-picture-separator,
        .jdgm-rev__pics .jdgm-rev__product-picture {
          display: none;
        }
      }
      @media only screen and (max-width: 768px) {
        .jdgm-rev__pics .jdgm-rev_all-rev-page-picture-separator,
        .jdgm-rev__pics .jdgm-rev__product-picture {
          display: none;
        }
      }

      .jdgm-preview-badge[data-template='index'] {
        display: none !important;
      }
      .jdgm-verified-count-badget[data-from-snippet='true'] {
        display: none !important;
      }
      .jdgm-carousel-wrapper[data-from-snippet='true'] {
        display: none !important;
      }
      .jdgm-all-reviews-text[data-from-snippet='true'] {
        display: none !important;
      }
    `}
  />
)

export const Img = styled(Image)`
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
`

export const MainContent = styled.main`
  margin-top: 80px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.l}px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`

export const StyledLink = styled(LinkFormatter)`
  padding: 6px 2px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${theme.fonts.links};
  letter-spacing: 1.14px;
  display: inline-block;
  text-decoration: none;
  transition: 150ms linear;
  transition-property: color, border-color;
  position: relative;

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
    }

    &::after {
      transform: scaleX(0);
      transition-delay: 250ms;
      transform-origin: left;
    }

    &:hover {
      &::after {
        transform: scaleX(1);
      }

      &::before {
        transform: scaleX(0);
      }
    }

    &.primary {
      color: ${theme.colors.primary}

      &::before,
      &::after {
        background: ${theme.colors.primary};
      }

      &:hover {
        color: ${theme.colors.secondary};

        &::before,
        &::after {
          background: ${theme.colors.secondary};
        }
      }
    }

    &.secondary {
      color: ${theme.colors.secondary};

      &::before,
      &::after {
        background: ${theme.colors.secondary};
      }

      &:hover {
        color: ${theme.colors.primary};

        &::before,
        &::after {
          background: ${theme.colors.primary};
        }
      }
    }

    &.tertiary {
      color: ${theme.colors.tertiary};

      &::before,
      &::after {
        background: ${theme.colors.tertiary};
      }

      &:hover {
        color: ${theme.colors.secondary};

        &::before,
        &::after {
          background: ${theme.colors.secondary};
        }
      }
    }
`

export const OverflowContainer = styled.div`
  overflow: hidden;
`

export const Container = styled.div`
  width: 100%;
  padding: 20px 18px 20px;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 25px 80px 20px;
  }
`

export const TopContainer = styled.div`
  background: ${theme.colors.tertiary};
`

export const SelectContainer = styled.div`
  .MuiFormControl-root {
    width: 100%;
    position: relative;
    margin-top: 10px;

    @media (min-width: ${theme.breakpoints.s}) {
      margin-top: 0;
      width: 205px;
    }

    svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 4px;
      pointer-events: none;
      height: 100%;
      border-left: 1px solid ${theme.colors.primary};
      padding-left: 5px;
      box-sizing: content-box;

      rect {
        fill: ${theme.colors.primary};
      }
    }
  }

  .MuiInput-formControl {
    border: 1px solid ${theme.colors.primary};

    &::before {
      display: none;
    }

    &::after {
      border-color: ${theme.colors.primary};
    }

    &.Mui-focused {
      svg {
        transform: translateY(-50%) rotate(180deg);
        border-right: 1px solid ${theme.colors.primary};
        border-left: 0px solid ${theme.colors.primary};
        padding-left: 0;
        padding-right: 5px;
      }
    }
  }

  .MuiNativeSelect-select {
    padding-top: 9px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: ${theme.fonts.cta};
    letter-spacing: ${theme.letterSpacing.cta};
    text-transform: uppercase;
    line-height: 1.5;
    font-weight: 300;
  }
`
