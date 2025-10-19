import { animations, fonts, media, shorthands, themes, tokens } from '@tamagui/config/v3'
import { createTamagui, createTokens } from '@tamagui/core'

// Custom color palette based on #8c52ff and #5ce1e6
const customTokens = createTokens({
  ...tokens,
  color: {
    // Primary Purple Palette (#8c52ff)
    purple1: '#f8f5ff',
    purple2: '#f0e8ff',
    purple3: '#e6d7ff',
    purple4: '#d9c2ff',
    purple5: '#c9a8ff',
    purple6: '#b68bff',
    purple7: '#a06bff',
    purple8: '#8c52ff', // Main purple
    purple9: '#7a3de6',
    purple10: '#6b2bcc',
    purple11: '#5c1ab3',
    purple12: '#4d0a99',

    // Primary Cyan Palette (#5ce1e6)
    cyan1: '#f0fdff',
    cyan2: '#e0f9fc',
    cyan3: '#c7f2f7',
    cyan4: '#a8e9f0',
    cyan5: '#85dde7',
    cyan6: '#5ce1e6', // Main cyan
    cyan7: '#4dd1d6',
    cyan8: '#3ec1c6',
    cyan9: '#2fb1b6',
    cyan10: '#20a1a6',
    cyan11: '#119196',
    cyan12: '#028186',

    // Complementary Orange Palette
    orange1: '#fff5f0',
    orange2: '#ffe8d9',
    orange3: '#ffd6b8',
    orange4: '#ffc194',
    orange5: '#ffa86b',
    orange6: '#ff8c42',
    orange7: '#ff6b1a',
    orange8: '#e55a0f',
    orange9: '#cc4a04',
    orange10: '#b33a00',
    orange11: '#992a00',
    orange12: '#801a00',

    // Complementary Green Palette
    green1: '#f0fff4',
    green2: '#d9ffe6',
    green3: '#b8ffd1',
    green4: '#94ffb8',
    green5: '#6bff9a',
    green6: '#42ff7c',
    green7: '#1aff5e',
    green8: '#0fe54a',
    green9: '#04cc3a',
    green10: '#00b32a',
    green11: '#00991a',
    green12: '#00800a',

    // Neutral Grays (warm toned to complement purple/cyan)
    gray1: '#fafafa',
    gray2: '#f5f5f5',
    gray3: '#eeeeee',
    gray4: '#e0e0e0',
    gray5: '#d0d0d0',
    gray6: '#b8b8b8',
    gray7: '#9e9e9e',
    gray8: '#757575',
    gray9: '#616161',
    gray10: '#424242',
    gray11: '#2e2e2e',
    gray12: '#1a1a1a',

    // Background colors (minimizing white)
    background: '#f8f5ff', // Very light purple tint
    backgroundHover: '#f0e8ff',
    backgroundPress: '#e6d7ff',
    backgroundFocus: '#d9c2ff',
    backgroundStrong: '#8c52ff',
    backgroundTransparent: 'rgba(140, 82, 255, 0.1)',

    // Text colors
    color: '#2e2e2e',
    colorHover: '#1a1a1a',
    colorPress: '#000000',
    colorFocus: '#424242',
    colorTransparent: 'rgba(46, 46, 46, 0.7)',

    // Border colors
    borderColor: '#d9c2ff',
    borderColorHover: '#c9a8ff',
    borderColorPress: '#b68bff',
    borderColorFocus: '#a06bff',

    // Semantic colors
    red1: '#fff5f5',
    red2: '#ffe8e8',
    red3: '#ffd6d6',
    red4: '#ffb8b8',
    red5: '#ff9494',
    red6: '#ff6b6b',
    red7: '#ff4242',
    red8: '#e51a1a',
    red9: '#cc0f0f',
    red10: '#b30000',
    red11: '#990000',
    red12: '#800000',

    yellow1: '#fffdf0',
    yellow2: '#fff8d9',
    yellow3: '#fff0b8',
    yellow4: '#ffe694',
    yellow5: '#ffd96b',
    yellow6: '#ffcc42',
    yellow7: '#ffbf1a',
    yellow8: '#e5a60f',
    yellow9: '#cc8c04',
    yellow10: '#b37300',
    yellow11: '#995a00',
    yellow12: '#804000',

    // Keep existing colors for compatibility
    ...tokens.color,
  },
})

// Custom themes
const customThemes = {
  light: {
    ...themes.light,
    background: customTokens.color.background,
    backgroundHover: customTokens.color.backgroundHover,
    backgroundPress: customTokens.color.backgroundPress,
    backgroundFocus: customTokens.color.backgroundFocus,
    backgroundStrong: customTokens.color.backgroundStrong,
    backgroundTransparent: customTokens.color.backgroundTransparent,
    color: customTokens.color.color,
    colorHover: customTokens.color.colorHover,
    colorPress: customTokens.color.colorPress,
    colorFocus: customTokens.color.colorFocus,
    colorTransparent: customTokens.color.colorTransparent,
    borderColor: customTokens.color.borderColor,
    borderColorHover: customTokens.color.borderColorHover,
    borderColorPress: customTokens.color.borderColorPress,
    borderColorFocus: customTokens.color.borderColorFocus,
  },
  dark: {
    ...themes.dark,
    background: customTokens.color.gray12,
    backgroundHover: customTokens.color.gray11,
    backgroundPress: customTokens.color.gray10,
    backgroundFocus: customTokens.color.gray9,
    backgroundStrong: customTokens.color.purple8,
    backgroundTransparent: 'rgba(140, 82, 255, 0.2)',
    color: customTokens.color.gray1,
    colorHover: customTokens.color.gray2,
    colorPress: customTokens.color.gray3,
    colorFocus: customTokens.color.gray4,
    colorTransparent: 'rgba(250, 250, 250, 0.7)',
    borderColor: customTokens.color.gray8,
    borderColorHover: customTokens.color.gray7,
    borderColorPress: customTokens.color.gray6,
    borderColorFocus: customTokens.color.gray5,
  },
}

const config = {
  tokens: customTokens,
  themes: customThemes,
  fonts,
  animations,
  media,
  shorthands,
  settings: {
    shouldAddPrefersColorThemes: true,
    themeClassNameOnRoot: true,
  },
}

export default createTamagui(config)
