import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    palette: {
      mode: string,
      primary: {
        main: string,
        light: string,
        dark: string,
      },
      secondary: {
        main: string,
      },
    },
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    palette?: {
      mode?: string,
      primary?: {
        main?: string,
        light?: string,
        dark?: string,
      },
      secondary?: {
        main?: string,
      },
    },
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}