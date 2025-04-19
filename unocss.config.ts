import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export const themeColors = {
  primary: {
    50: '#ebfcfd', // Lightest azure
    100: '#d0f7fa', // Lighter azure
    200: '#a7eef5', // Light azure
    300: '#77e2ee', // Medium light azure
    400: '#3FD0DB', // Medium azure (your reference color)
    500: '#78DEE5', // Main azure (your specified color)
    600: '#25b3c1', // Darker azure
    700: '#1e8f9a', // Even darker azure
    800: '#196a73', // Dark azure
    900: '#124b52', // Darkest azure
    950: '#082a2f', // Very dark azure
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
      fetchOptions: {
        timeout: 10000, // Increase timeout to 10 seconds (default might be lower)
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
