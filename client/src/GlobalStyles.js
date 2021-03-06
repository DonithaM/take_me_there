import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
      --font-family: 'Cabin', sans-serif;
      --primary-color: #e7cfff;
      --secondary-color: #fff;
      --tertiary-color: #8418ba;

      --orange-shade: #fa9d11;
      --light-orange: #ffe3b5;
      --dark-orange: #fb8500;
      --text-orange: #d00000;
    }
html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  body{
    scroll-behavior: smooth;
    position: relative; //to fix sticky header and footer positions
    /* overflow: hidden;  */
  }

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-family);
}

`;
