import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage, NewDashboard, RatingPage } from './components/pages';
import { coreSelectors } from './store/core/selectors';
import { useEffect, useState } from 'react';
import api from 'utils/api/idnex';
import { coreActions } from 'store/core/actions';
import { Box, CircularProgress } from '@mui/material';
import { PageLayout } from 'components/layout';
import { Profile, Dashboard } from 'components/pages';

function App() {
	const dispatch = useDispatch();
	document.title = 'Моя мотивация';

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { token } = useSelector(coreSelectors.user);

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (localToken) {
			api
				.post('/check')
				.then((res) => {
					dispatch(coreActions.setTokenAuth(localToken));
					dispatch(coreActions.getUser(res.data?.data?.id));
				})
				.catch((e) => {
					localStorage.removeItem('token');
					dispatch(coreActions.clearToken());
					dispatch(coreActions.authFailed(''));
				})
				.finally(() => setIsLoading(false));
		} else {
			setIsLoading(false);
		}
	}, []);

	if (isLoading)
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100vw',
					height: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		);

	return (
		<BrowserRouter basename="/">
			<Routes>
				{token ? (
					<>
						<Route path="/" element={<PageLayout />}>
							<Route path="new-dashboard" element={<NewDashboard />} />
							<Route path="rating" element={<RatingPage />} />
							<Route path="profile/:id" element={<Profile />} />
							<Route path="" element={<Navigate to="dashboard" />} />
							<Route path="*" element={<Navigate to="new-dashboard" />} />
						</Route>
						<Route path="*" element={<Navigate to="new-dashboard" />} />
					</>
				) : (
					<>
						<Route path="/auth" element={<AuthPage />} />
						<Route path="*" element={<Navigate to="/auth" />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
