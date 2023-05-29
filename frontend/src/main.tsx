import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/index.ts';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
);
