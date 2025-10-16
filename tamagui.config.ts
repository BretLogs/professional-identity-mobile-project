import { animations, fonts, media, shorthands, themes, tokens } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const config = {
  tokens,
  themes,
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
