import colors from './default';

const fonts = {
  SegoeUI: 'Segoe UI',
  SourceSansPro: 'Source Sans Pro',
};

const fontSizes = {
  xsmall: '10px',
  small: '14px',
  normal: '16px',
  large: '20px',
  xlarge: '24px',
  huge: '30px',
  giant: '40px',
  subtitle: '24px',
  title: '36px',
  h1: '64px',
  h2: '40px',
  h3: '30px',
  h4: '24px',
  h5: '20px',
  regular: '16px' /* ? */,
  logo: '5vh',
  logoNavBar: '1.3vw',
};

const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

const lineHeights = {
  normal: '1',
  title: '1.25',
  paragraph: '1.5',
};

const radius = {
  none: '0px',
  small: '2px',
  normal: '5px',
  medium: '8px',
  large: '16px',
  rounded: '32px',
  circle: '48px',
};

const spacing = {
  none: '0',
  small: '5px' /* Third, base? */,
  normal: '15px',
  double: '30px',
  triple: '45px',
  quadruple: '60px',
};

const boxShadows = {
  smallest: '0 1.6px 3.6px 0 rgba(0, 0, 0, .132), 0 0.3px 0.9px 0 rgba(0, 0, 0, .108)',
  small: '0 3.2px 7.2px 0 rgba(0, 0, 0, .132), 0 0.6px 1.8px 0 rgba(0 0, 0, .108)',
  normal: '0 6.4px 14.4px 0 rgba(0, 0, 0, .132), 0 1.2px 3.6px 0 rgba(0, 0, 0, .108)',
  large: '0 25.6px 57.6px 0 rgba(0, 0, 0, .22), 0 4.8px 14.4px 0 rgba(0, 0, 0, .18)',
};

const fontStyles = {
  normal: `normal ${fontWeights.normal} ${fontSizes.normal}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
  logo: `normal ${fontWeights.bold} ${fontSizes.logo}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
  link: `normal ${fontWeights.normal} ${fontSizes.normal}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
  headerTitle: `normal ${fontWeights.bold} ${fontSizes.logoNavBar}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
};

export const theme = {
  breakpoints: [32, 48, 64],
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings: {
    normal: 'normal',
  },
  colors,
  radius,
  spacing,

  boxShadows,
  fontStyles,
};
