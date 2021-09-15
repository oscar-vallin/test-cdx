export enum ColorModes {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export enum FontSizes {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

export type Theme = {
  dashThemeColor: any;
  paletteNm: string;
  themeColorMode: ColorModes;
  themeFontSize: FontSizes;
};
