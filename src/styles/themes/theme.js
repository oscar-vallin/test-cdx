import colors from "./default";

const fonts = {
  SegouUI: "Segoe UI",
};

const fontSizes = {
  xsmall: "10px",
  small: "13px",
  normal: "16px",
  large: "20px",
  xlarge: "24px",
  huge: "30px",
  giant: "40px",
  subtitle: "24px",
  title: "36px",
  h1: "64px",
  h2: "40px",
  h3: "30px",
  h4: "24px",
  h5: "20px",
  regular: "16px",
  logo: "5vh",
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
  normal: "1",
  title: "1.25",
  paragraph: "1.5",
};

const radius = {
  none: "0px",
  small: "2px",
  normal: "5px",
  medium: "8px",
  large: "16px",
  rounded: "32px",
  circle: "48px",
};

const margins = {
  normal: "15px",
  double: "30px",
};

const boxShadows = {
  normal: "0 19px 38px rgba(0, 0, 0, .30), 0 15px 12px rgba(0, 0, 0, .22)",
};

const fontStyles = {
  logo: `normal ${fontWeights.bold} ${fontSizes.logo}/${lineHeights.normal} ${fonts.SegouUI}`,
};

export const theme = {
  breakpoints: [32, 48, 64],
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings: {
    normal: "normal",
  },
  colors,
  radius,
  margins,
  boxShadows,
  fontStyles,
};
