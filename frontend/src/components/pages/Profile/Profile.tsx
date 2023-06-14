import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Response } from 'store/types';
import { Loading } from 'ui';
import api from 'utils/api/idnex';
import { AxiosError } from 'axios';
import { Likes, RatingData, User } from 'store/core/types';
import { moneyFormat, ruMoment, sklonenie } from 'utils';
import { CrownIcon } from 'assets/icons/Crown';
import { topColors } from '../Rating';

type ProfileState = {
	loading: boolean;
	data?: User;
	ratingData?: RatingData[];
	error?: Nstring;
	errorRating?: Nstring;
};

export const Profile: React.FC = () => {
	const [state, setState] = useState<ProfileState>({
		loading: false,
	});

	const user = state?.data;
	const rating = state?.ratingData?.[0];

	const params = useParams();

	useEffect(() => {
		setState((prev) => ({
			...prev,
			loading: true,
		}));

		// User
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
				setState((prev) => ({
					...prev,
					loading: false,
					errorRating:
						res.response?.data?.error || 'Не удалось загрузить профиль. Повторите попытку позже',
				}));
			});

		// Rating
		api
			.get<Response<RatingData[]>>('/rating', { params: { employee_id: params?.id || undefined } })
			.then((res) => {
				if (res.data.status) {
					setState((prev) => ({
						...prev,
						ratingData: res.data.data || [],
						errorRating: null,
					}));
				}
			})
			.catch((err: AxiosError<Response>) => {
				console.log('err rating - ', err);
				setState((prev) => ({
					...prev,
					errorRating: err.response?.data?.error || 'Не удалось загрузить рейтинг. Повторите позже',
				}));
			});
	}, [params.id]);

	const onLike = (id: any) => {
		api
			.post<Response<Likes>>('like', { id })
			.then((res) => {
				if (res.data?.status) {
					setState((prev) => ({
						...prev,
						data: {
							...prev?.data!,
							likes: res.data?.data || { you_like: false, count: 0 },
						},
					}));
				}
			})
			.catch((err: AxiosError<Response>) => {
				console.log('err likes - ', err);
			});
	};

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
			<Grid item xs={12} md={8} lg={8}>
				<Card
					sx={{ padding: 0, overflow: 'visible', minHeight: 220 }}
					elevation={8}
					variant={undefined}
				>
					<CardContent sx={{ p: '30px' }}>
						<Box display="flex" gap={5} position="relative">
							{Number(rating?.position) <= 3 ? (
								<CrownIcon
									sx={{ position: 'absolute', top: -30, left: -20, zIndex: 2 }}
									size={50}
									fill={topColors?.[(rating?.position || 0) - 1]}
								/>
							) : null}
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
								<Box display="flex" alignItems="center" gap={0.5}>
									<IconButton onClick={() => onLike(user?.id)} color="secondary">
										{user?.likes?.you_like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
									</IconButton>
									<Typography variant="body1" fontWeight={700}>
										{user?.likes?.count || 0}
									</Typography>
								</Box>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Grid>

			{user?.salary ? (
				<Grid item xs={12} md={4} lg={4}>
					<Card
						sx={{ padding: 0, overflow: 'visible', minHeight: 220 }}
						elevation={8}
						variant={undefined}
					>
						<CardContent sx={{ p: '30px' }}>
							<Box display="flex" gap={5}>
								<Box display="flex" flexDirection="column" gap={5.5}>
									<Box display="flex" flexDirection="column" gap={1}>
										<Typography variant="h4">Заработок за месяц</Typography>
										<Box display="flex" gap={2}>
											<Typography color="primary" variant="h5">
												{moneyFormat(+(user?.salary || 0) + +(user?.bonuses || 0))} руб.
											</Typography>
											{/* <Typography fontWeight={600} color="success.main" variant="body2">
												+12%
											</Typography> */}
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
				<Grid item xs={7} md={3} lg={3}>
					<Card sx={{ padding: 0, overflow: 'visible' }} elevation={8} variant={undefined}>
						<CardContent sx={{ display: 'flex', p: '30px', minHeight: 120 }}>
							<Box display="flex" gap={5} flexGrow={1} alignItems="center">
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
				<Card sx={{ padding: 0, overflow: 'visible' }} elevation={8} variant={undefined}>
					<CardContent sx={{ display: 'flex', p: '30px', minHeight: 120 }}>
						<Box display="flex" gap={5} flexGrow={1} alignItems="center">
							<Box display="flex" flexDirection="column" gap={3}>
								<Box display="flex" flexDirection="column" gap={1}>
									<Box display="flex" gap={1.2} alignItems="center">
										<Typography color="primary" variant="h4">
											{user?.position_days}
										</Typography>
										<Typography variant="h5">
											{sklonenie(+(user?.position_days || 0), ['день', 'дня', 'дней'])} в компании
										</Typography>
									</Box>
								</Box>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Grid>
			{Boolean(user?.salary_data) && (
				<Grid item xs={12} md={12} lg={12}>
					<Card sx={{ padding: 0, overflow: 'visible' }} elevation={8} variant={undefined}>
						<CardContent sx={{ p: '30px' }}>
							<Typography variant="h5">Детализация последних зарплат</Typography>
							<Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
								<Table
									sx={{
										whiteSpace: 'nowrap',
										mt: 2,
									}}
								>
									<TableHead>
										<TableRow>
											<TableCell>
												<Typography variant="subtitle2" fontWeight={600}>
													Дата
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="subtitle2" fontWeight={600}>
													Оклад, руб. <br />
													Премия, руб.
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="subtitle2" fontWeight={600}>
													Итого З/П, руб.
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="subtitle2" fontWeight={600}>
													Разница, %
												</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{user?.salary_data?.map((product, id) => {
											const prev = user?.salary_data?.[id + 1];
											const final = (product.salary || 0) + (product.bonuse || 0);
											const prevFinal = (prev?.salary || 0) + (prev?.bonuse || 0);
											const precent: number = prev
												? +(((final - prevFinal) / prevFinal) * 100).toFixed(0)
												: 0;

											return (
												<TableRow key={product?.date || user?.position_days || 0 + id}>
													<TableCell>
														<Typography
															sx={{
																fontSize: '15px',
																fontWeight: '500',
															}}
														>
															{ruMoment(product.date || '').isValid()
																? ruMoment(product.date || '').format('DD.MM.YYYY')
																: null}
														</Typography>
													</TableCell>
													<TableCell>
														<Box
															sx={{
																display: 'flex',
																alignItems: 'center',
															}}
														>
															<Box>
																<Typography variant="subtitle2" fontWeight={600}>
																	{moneyFormat(product.salary, 2)}
																</Typography>
																<Typography
																	color="textSecondary"
																	sx={{
																		fontSize: '13px',
																	}}
																>
																	{moneyFormat(product.bonuse, 2)}
																</Typography>
															</Box>
														</Box>
													</TableCell>
													<TableCell>
														<Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
															{moneyFormat(final)}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography
															color={precent > 0 ? 'green' : 'red'}
															variant="subtitle2"
															fontWeight={400}
														>
															{precent}
														</Typography>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			)}
		</Grid>
	);
};
