import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { ThemeOptions } from '@mui/material/styles';
import { baselightTheme } from 'theme/DefaultColors.ts';

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

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
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
};

// const theme = createTheme(themeOptions);
const theme = baselightTheme;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<CacheProvider value={muiCache}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</CacheProvider>,
);
