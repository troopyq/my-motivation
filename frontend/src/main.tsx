import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3e62bf',
      light: '#627ad3',
      dark: '#3553a7',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>,
);
