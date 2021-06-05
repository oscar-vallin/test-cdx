import chroma from 'chroma-js';

export default class Theming {
  static generate = {
    primary(hex) {
      return {
        themeDarker: chroma.mix(hex, '#fff', 0.4).hex(),
        themeDark: chroma.mix(hex, '#fff', 0.225).hex(),
        themeDarkAlt: chroma.mix(hex, '#fff', 0.05).hex(),
        themePrimary: hex,
        themeSecondary: chroma(hex).darken(0.53).hex(),
        themeTertiary: chroma.mix(hex, '#000', 0.64).hex(),
        themeLight: chroma.mix(hex, '#000', 0.91).hex(),
        themeLighter: chroma.mix(hex, '#000', 0.975).hex(),
        themeLighterAlt: chroma.mix(hex, '#000', 0.9975).hex(),
      }
    },

    foreground(hex, white) {
      return {
        black: chroma.mix(hex, '#000', 0.055).hex(),
        neutralDark: chroma.mix(hex, '#000', 0.085).hex(),
        neutralPrimary: hex,
        neutralPrimaryAlt: chroma.mix(hex, '#000', 0.75).hex(),
        neutralSecondary: chroma.mix(hex, '#000', 0.335).hex(),
        neutralTertiary: chroma.mix(hex, '#000', 0.385).hex(),
        white,
      }
    },

    background(hex) {
      return {
        neutralTertiaryAlt: chroma.mix(hex, '#000', 0.4).hex(),
        neutralQuaternaryAlt: chroma.mix(hex, '#000', 0.275).hex(),
        neutralLight: chroma.mix(hex, '#000', 0.2).hex(),
        neutralLighter: chroma.mix(hex, '#000', 0.1).hex(),
        neutralLighterAlt: chroma.mix(hex, '#000', 0.05).hex(),
      }
    }
  }
}