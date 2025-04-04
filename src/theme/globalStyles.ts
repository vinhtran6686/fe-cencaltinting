import { css } from '@emotion/react';
import { colors, spacing, fontFamily } from './tokens';

// Global style overrides to be used with Emotion's Global component
const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: ${fontFamily};
    line-height: 1.6;
    color: ${colors.textPrimary};
    background-color: ${colors.bgSecondary};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  // Custom scrollbar
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.bgSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: ${spacing.xs};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export default globalStyles; 