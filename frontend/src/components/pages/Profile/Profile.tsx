import { Avatar, Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Response } from 'store/types';
import { Loading } from 'ui';
import api from 'utils/api/idnex';
import { AxiosError } from 'axios';
import { User } from 'store/core/types';
import { moneyFormat, ruMoment, sklonenie } from 'utils';

type ProfileState = {
	loading: boolean;
	data?: User;
	error?: Nstring;
};

export const Profile: React.FC = () => {
	const [state, setState] = useState<ProfileState>({
		loading: false,
	});

	const user = state?.data;

	const params = useParams();

	console.log(params);

	useEffect(() => {
		setState((prev) => ({
			...prev,
			loading: true,
		}));

		api
			.get<Response<User>>(`/profile`, { params })
			.then(({ data, status }) => {
				if (status === 200 && data.status) {
					setState((prev) => ({
						...prev,
						loading: false,
						data: data.data,
						error: null,
					}));
				}
			})
			.catch((res: AxiosError<Response>) => {
				console.log(res);

				setState((prev) => ({
					...prev,
					loading: false,
					error:
						res.response?.data?.error || 'Не удалось загрузить профиль. Повторите попытку позже',
				}));
			});
	}, [params]);

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
							gap: 3,
						}}
					>
						<ErrorOutlineIcon sx={{ fontSize: 50 }} color="warning" />

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
				<Card sx={{ padding: 0, overflow: 'visible' }} elevation={9} variant={undefined}>
					<CardContent sx={{ p: '30px' }}>
						<Box display="flex" gap={5}>
							<Avatar
								sx={{ width: 150, height: 150 }}
								src={(user?.avatar_img as string) || ''}
								alt={`${user?.last_name?.[0]}${user?.first_name?.[0]}`}
							/>
							<Box display="flex" flexDirection="column" gap={1}>
								<Typography variant="h4">
									{user?.last_name || ''} {user?.first_name || ''} {user?.middle_name || ''}
								</Typography>
								<Typography color="grey.400" variant="subtitle2">
									Дата рождения: {ruMoment(user?.birthday || '').format('DD.MM.YYYY') || ''}
								</Typography>
								<Typography fontWeight={600} variant="body1">
									Должность:{' '}
									<Typography component="span" color="InfoText">
										{user?.role_desc}
									</Typography>{' '}
								</Typography>
								<Typography variant="subtitle1" color="GrayText">
									{user?.block}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Grid>

			{user?.salary ? (
				<Grid item xs={12} md={4} lg={3}>
					<Card sx={{ padding: 0, overflow: 'visible' }} elevation={9} variant={undefined}>
						<CardContent sx={{ p: '30px' }}>
							<Box display="flex" gap={5}>
								<Box display="flex" flexDirection="column" gap={5.5}>
									<Box display="flex" flexDirection="column" gap={1}>
										<Typography variant="h4">Заработок за месяц</Typography>
										<Box display="flex" gap={2}>
											<Typography color="primary" variant="h5">
												{moneyFormat(+(user?.salary || 0) + +(user?.bonuses || 0))} руб.
											</Typography>
											<Typography fontWeight={600} color="success.main" variant="body2">
												+12%
											</Typography>
										</Box>
									</Box>
									<Box display="flex" flexDirection="column" gap={0.5}>
										<Typography fontWeight={600} variant="body1">
											Оклад:{' '}
											<Typography component="span" color="InfoText">
												{moneyFormat(+(user?.salary || 0))} руб.
											</Typography>{' '}
										</Typography>
										<Typography fontWeight={600} variant="body1">
											Премия и бонусы:{' '}
											<Typography component="span" color="InfoText">
												{moneyFormat(+(user?.bonuses || 0))} руб.
											</Typography>{' '}
										</Typography>
									</Box>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			) : null}
			{user?.vacation_days ? (
				<Grid item xs={7} md={3} lg={2}>
					<Card sx={{ padding: 0, overflow: 'visible' }} elevation={9} variant={undefined}>
						<CardContent sx={{ p: '30px' }}>
							<Box display="flex" gap={5}>
								<Box display="flex" flexDirection="column" gap={3}>
									<Box display="flex" flexDirection="column" gap={1}>
										<Typography variant="h4">Отпуск</Typography>
										<Box display="flex" gap={1.2} alignItems="center">
											<Typography variant="h6">Накоплено:</Typography>
											<Typography variant="h5" color="primary">
												{user?.vacation_days}{' '}
												{sklonenie(+(user?.vacation_days || 0), ['день', 'дня', 'дней'])}
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			) : null}
			<Grid item xs={7} md={4} lg={3}>
				<Card sx={{ padding: 0, overflow: 'visible' }} elevation={9} variant={undefined}>
					<CardContent sx={{ p: '30px' }}>
						<Box display="flex" gap={5}>
							<Box display="flex" flexDirection="column" gap={3}>
								<Box display="flex" flexDirection="column" gap={1}>
									<Box display="flex" gap={1.2} alignItems="center">
										<Typography color="primary" variant="h4">
											{user?.position_days}
										</Typography>
										<Typography variant="h5">	{sklonenie(+(user?.position_days || 0), ['день', 'дня', 'дней'])} в компании</Typography>
									</Box>
								</Box>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};
