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
  data: any;
  paletteNm: string;
  themeColorMode: ColorModes;
  themeFontSize: FontSizes;
};
