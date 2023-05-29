import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { AuthPage } from './components/pages';
import { coreSelectors } from './store/core/selectors';
import Dashboard from './components/pages/Dashboard/Dashboard';

function App() {
	document.title = 'Моя мотивация';

	const { isLoaded, id } = useSelector(coreSelectors.user);

	// const isUserLoaded = useSelector(core)

	return (
		<BrowserRouter basename="/">
			<Routes>
				{id ? (
					<Route path="/" element={<Dashboard />} />
				) : (
					<>
						<Route path="/auth" element={<AuthPage />} />
						<Route path="*" element={<Navigate to='/auth' />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
