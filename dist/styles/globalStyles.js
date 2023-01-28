import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
const breakpoints = {
    mobile: 0,
    mobileLarge: 460,
    tablet: 737,
    desktop: 1025,
    desktopLarge: 1600
};
const depths = {
    header: 800,
    sidebar: 900,
    editorHeadingActions: 920,
    editorToolbar: 925,
    hoverPreview: 950,
    modalOverlay: 2000,
    modal: 3000,
    menu: 4000,
    toasts: 5000,
    popover: 9000,
    titleBarDivider: 10000,
    loadingIndicatorBar: 20000,
    commandBar: 30000
};
export default createGlobalStyle `
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
    --pointer: ${props => (props.useCursorPointer ? "pointer" : "default")};
  }

  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    font-size: 16px;
    line-height: 1.5;
    color: ${props => props.theme.text};
    overscroll-behavior-y: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    html,
    body {
      min-height: 100vh;
    }
  }

  @media (min-width: ${breakpoints.tablet}px) and (display-mode: standalone) {
    body:after {
      content: "";
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: ${props => props.theme.titleBarDivider};
      z-index: ${depths.titleBarDivider};
    }
  }

  a {
    color: ${props => props.theme.link};
    text-decoration: none;
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    line-height: 1.25;
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  h1 { font-size: 2.25em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.25em; }
  h4 { font-size: 1em; }
  h5 { font-size: 0.875em; }
  h6 { font-size: 0.75em; }

  p,
  dl,
  ol,
  ul,
  pre,
  blockquote {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid ${props => props.theme.divider};
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  .js-focus-visible .focus-visible {
    outline-color: ${props => props.theme.primary};
    outline-offset: -1px;
  }
`;
//# sourceMappingURL=globalStyles.js.map