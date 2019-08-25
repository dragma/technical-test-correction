import React from 'react';
import { ThemeProvider } from 'react-native-elements';

import Game from './src/views/Game';
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
}
