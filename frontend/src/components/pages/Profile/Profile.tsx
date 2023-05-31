import { Grid, Paper, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Response } from 'store/types';
import { Loading } from 'ui';
import api from 'utils/api/idnex';

export const Profile: React.FC = () => {
	const [state, setState] = useState<Record<string, unknown>>({
		loading: false,
	});

	const params = useParams();

	console.log(params);

	useEffect(() => {
		api
			.get<Response>(`/profile`, { params })
			.then(({ data, status }) => {
				if (status === 200 && data.status) {
					setState((prev) => ({ ...prev, Loading: false, data: data.data }));
				}
			})
			.catch((res) => {
				setState((prev) => ({
					...prev,
					loading: false,
					error: 'Не удалось загрузить профиль. Повторите попытку позже',
					errorMessage: res.data?.error || '',
				}));
			});
	}, []);

	if (state.loading) return <Loading />;

	if (!state.loading && state.error) {
		return (
			<Grid container spacing={3}>
				<Grid item xs={12} md={12} lg={12}>
					<Paper
						sx={{
							p: 4,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							height: 240,
							textAlign: 'center',
              gap: 3
						}}
					>
						<ErrorOutlineIcon sx={{fontSize: 50}} color='warning' />

						<Typography variant="h5">
							{(state?.error as string) || 'Ошибка загрузки профиля'}
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		);
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8} lg={9}>
				<Paper
					sx={{
						p: 4,
						display: 'flex',
						// flexDirection: 'column',
						height: 240,
					}}
				>
					dee
				</Paper>
			</Grid>
		</Grid>
	);
};
