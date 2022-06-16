import { ThemeColorsType } from 'src/styles/themes/types';
import { defaultTheme } from './default';
import { ThemeColorMode, ThemeFontSize } from 'src/data/services/graphql';

const fonts = {
  SegoeUI: 'Segoe UI',
  SourceSansPro: 'Source Sans Pro',
};

type FontSizesType = {
  xsmall: string;
  small: string;
  normal: string;
  large: string;
  xlarge: string;
  huge: string;
  giant: string;
  subtitle: string;
  title: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  regular: string;
  logo: string;
  logoNavBar: string;
};

const fontSizes: FontSizesType = {
  xsmall: '0.625rem',
  small: '0.75rem',
  normal: '0.875rem',
  large: '1.15rem',
  xlarge: '1.5rem',
  huge: '1.875rem',
  giant: '2.5rem',
  subtitle: '1.5rem',
  title: '2.25rem',
  h1: '4rem',
  h2: '2.5rem',
  h3: '1.875rem',
  h4: '1.5rem',
  h5: '1.25rem',
  regular: '1em' /* ? */,
  logo: '5vh',
  logoNavBar: '1.3vw',
};

type FontWeightsType= {
  thin: number;
  extraLight: number;
  light: number;
  normal: number;
  medium: number;
  semiBold: number;
  bold: number;
  extraBold: number;
  black: number;
};

const fontWeights: FontWeightsType = {
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

type LineHeightsType = {
  normal: string;
  title: string;
  paragraph: string;
};

const lineHeights: LineHeightsType = {
  normal: '1',
  title: '1.25',
  paragraph: '1.5',
};

type RadiusType = {
  none: string;
  small: string;
  normal: string;
  medium: string;
  large: string;
  rounded: string;
  circle: string;
};

const radius: RadiusType = {
  none: '0px',
  small: '2px',
  normal: '5px',
  medium: '8px',
  large: '16px',
  rounded: '32px',
  circle: '48px',
};

type SpacingType = {
  none: string;
  small: string;
  normal: string;
  double: string;
  triple: string;
  quadruple: string;
};

const spacing: SpacingType = {
  none: '0',
  small: '5px' /* Third, base? */,
  normal: '15px',
  double: '30px',
  triple: '45px',
  quadruple: '60px',
};

type BoxShadowsType = {
  smallest: string;
  small: string;
  normal: string;
  large: string;
};

const boxShadows: BoxShadowsType = {
  smallest: '0 1.6px 3.6px 0 rgba(0, 0, 0, .132), 0 0.3px 0.9px 0 rgba(0, 0, 0, .108)',
  small: '0 3.2px 7.2px 0 rgba(0, 0, 0, .132), 0 0.6px 1.8px 0 rgba(0 0, 0, .108)',
  normal: '0 6.4px 14.4px 0 rgba(0, 0, 0, .132), 0 1.2px 3.6px 0 rgba(0, 0, 0, .108)',
  large: '0 25.6px 57.6px 0 rgba(0, 0, 0, .22), 0 4.8px 14.4px 0 rgba(0, 0, 0, .18)',
};

type FontStylesType = {
  normal: string;
  logo: string;
  link: string;
  headerTitle: string;
};

const fontStyles = {
  normal: `normal ${fontWeights.normal} ${fontSizes.normal}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
  logo: `normal ${fontWeights.bold} ${fontSizes.logo}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
  link: `normal ${fontWeights.normal} ${fontSizes.normal}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
  headerTitle: `normal ${fontWeights.bold} ${fontSizes.logoNavBar}/${lineHeights.normal} ${fonts.SegoeUI}, ${fonts.SourceSansPro}, sans-serif`,
};

export interface ThemeDefinition {
  breakpoints: number[];
  space: number[];
  fontSizes: FontSizesType;
  fontWeights: FontWeightsType;
  lineHeights: LineHeightsType;
  letterSpacings: {
    normal: string;
  };
  radius: RadiusType;
  spacing: SpacingType;
  boxShadows: BoxShadowsType;
  fontStyles: FontStylesType;

  paletteNm?: string | null;
  themeColorMode?: ThemeColorMode | null;
  themeFontSize?: ThemeFontSize | null;
  colors: ThemeColorsType;
}

export const theme: ThemeDefinition = {
  breakpoints: [32, 48, 64],
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings: {
    normal: 'normal',
  },
  colors: defaultTheme,
  radius,
  spacing,

  boxShadows,
  fontStyles,
};
