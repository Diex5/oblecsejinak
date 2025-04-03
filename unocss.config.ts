import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export const themeColors = {
  primary: {
    50: '#e0ffff', // Lightest azure
    100: '#b2ffff', // Lighter azure
    200: '#80ffff', // Light azure
    300: '#4dffff', // Medium light azure
    400: '#1affff', // Medium azure
    500: '#00e5e5', // Main azure
    600: '#00b3b3', // Darker azure
    700: '#008080', // Even darker azure
    800: '#004d4d', // Dark azure
    900: '#002626', // Darkest azure
    950: '#001313', // Very dark azure
  },
  surface: {
    0: '#f3f4f6', // Jemně šedá, místo čisté bílé
    50: '#f0f0f0', // Světle šedá
    100: '#e0e0e0', // Tmavší šedá
    200: '#d1d1d1', // Tmavší šedá
    300: '#b2b2b2', // Tmavší šedá
    400: '#9a9a9a', // Šedá
    500: '#7f7f7f', // Střední šedá
    600: '#666666', // Střední šedá
    700: '#4c4c4c', // Tmavší šedá
    800: '#333333', // Tmavá šedá
    900: '#1a1a1a', // Velmi tmavá šedá
    950: '#0d0d0d', // Tmavě šedá (ne úplně černá)
  },

}

export default defineConfig({
  shortcuts: [
    { 'app-btn': 'bg-blue' },
    { 'text-gradient': 'bg-gradient-to-l from-cyan-300 via-cyan-200 to-cyan-300 text-transparent bg-clip-text' },
    {
      container: 'max-w-7xl mx-auto px-4 py-2 sm:p-6 lg:p-8 w-full',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        inter: 'Inter',
        oswald: 'Oswald',
        sans: 'Open Sans',
        lora: 'Lora',
        bebas: 'Bebas Neue',
        gloria: 'Gloria Hallelujah',
      },
    }),
  ],
  theme: {

    colors: {
      ...themeColors,
      gray: themeColors.surface,
      white: themeColors.surface[0],
      black: themeColors.surface[950],
    },
  },
})
