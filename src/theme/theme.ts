const theme = {
  borderRadius: 4,

  colors: {
    background: '#fefefe',
    border: '#8b8b8b',
    chat: '#01f101',
    shadow: '#606060',
    white: '#fff',
  },

  fontFamily: 'Code New Roman',

  spacing: (factor: number) => 3 * factor,

  textShadow: (color?: string) =>
    color ? `0.05em 0.05em ${color}` : undefined,
};

export default theme;
