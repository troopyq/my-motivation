import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage } from './components/pages';
import { coreSelectors } from './store/core/selectors';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { useEffect } from 'react';
import api from 'utils/api/idnex';
import { coreActions } from 'store/core/actions';

function App() {
	const dispatch = useDispatch();
	document.title = 'Моя мотивация';

	const { isLoaded, token } = useSelector(coreSelectors.user);

	useEffect(() => {
		if (token) {
			api
				.post('/check')
				.then((res) => {
					console.log('res', res);
				})
				.catch((e) => {
					console.log('err', e);
					localStorage.removeItem('token');
					dispatch(coreActions.authFailed(''));
				});
		}
	}, []);

	return (
		<BrowserRouter basename="/">
			<Routes>
				{isLoaded ? (
					token ? (
						<>
							<Route index element={<Dashboard />} />
							<Route path="*" element={<Navigate to="/" />} />
						</>
					) : (
						<>
							<Route path="/auth" element={<AuthPage />} />
							<Route path="*" element={<Navigate to="/auth" />} />
						</>
					)
				) : (
					'Loading...'
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
