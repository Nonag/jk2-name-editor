import { createTheme, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

declare module '@mui/material/styles' {
  interface TypeText {
    chat: string;
  }

  interface TypographyVariants {
    textShadow: (color?: string) => string | undefined;
  }

  interface TypographyVariantsOptions {
    textShadow?: (color?: string) => string | undefined;
  }
}

export type Styles = Record<
  string,
  SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
>;

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Ergoe Extrabold Condensed Regular';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Ergoe Extrabold'), local('Ergoe-Extrabold'), url('/static/fonts/ergoe-extrabold-condensed-regular.ttf') format('truetype');
        },

        html, body, #root {
          height: 100%;
        }
      `,
    },
  },

  palette: {
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },

    primary: {
      main: '#2700ff',
    },

    text: {
      chat: '#01f101',
    },
  },

  typography: {
    fontFamily: '"Ergoe Extrabold Condensed Regular", Arial, sans-serif',
    textShadow: (color?: string) =>
      color ? `0.075em 0.075em ${color}` : undefined,
  },
});

export default theme;
