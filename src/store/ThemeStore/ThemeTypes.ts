/* eslint-disable no-shadow */
import { ThemeColorsType } from 'src/styles/themes';
import { ThemeColorMode, ThemeFontSize } from 'src/data/services/graphql';

export type Theme = {
  dashThemeColor?: ThemeColorsType | null;
  paletteNm?: string | null;
  themeColorMode?: ThemeColorMode | null;
  themeFontSize?: ThemeFontSize | null;
};
