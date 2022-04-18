import { createTheme } from '@mui/material/styles';

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#2700ff',
    },

    text: {
      chat: '#01f101',
    },
  },

  typography: {
    fontFamily: 'Code New Roman',
    textShadow: (color?: string) =>
      color ? `0.05em 0.05em ${color}` : undefined,
  },
});

export default theme;
