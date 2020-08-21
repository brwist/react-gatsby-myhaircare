import styled from '@emotion/styled'
import { theme } from '~/utils/styles'

export const TextStyled = styled.p`
  &.body {
    font-size: ${theme.fonts.body};
    letter-spacing: ${theme.letterSpacing.body};
    font-weight: normal;
    font-style: normal;
    line-height: 1.5;

    @media (max-width: ${theme.breakpoints.md}) {
      font-weight: 300;
    }
  }

  &.smallText400 {
    font-size: ${theme.fonts.smallText};
    letter-spacing: ${theme.letterSpacing.smallText};
    font-weight: 400;
    font-style: normal;
    text-transform: uppercase;
  }

  &.smallText500 {
    font-size: ${theme.fonts.smallText};
    letter-spacing: ${theme.letterSpacing.smallText};
    font-weight: 500;
    font-style: normal;
    text-transform: uppercase;
  }

  &.smallText700 {
    font-size: ${theme.fonts.smallText};
    letter-spacing: ${theme.letterSpacing.smallText};
    font-weight: 700;
    font-style: normal;
    text-transform: uppercase;
  }

  &.bigText400 {
    font-size: ${theme.fonts.body};
    letter-spacing: ${theme.letterSpacing.body};
    font-weight: normal;
    font-style: normal;

    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fonts.bigText};
    }
  }

  &.link {
    font-weight: 500;
    text-transform: uppercase;
    padding: 6px 2px;
    font-size: ${theme.fonts.links};
    letter-spacing: 1.14px;
    display: inline-block;
    text-decoration: none;
    transition: 150ms linear;
    transition-property: color, border-color;
    position: relative;
    cursor: pointer;

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
      color: ${theme.colors.primary};

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
  }
`
