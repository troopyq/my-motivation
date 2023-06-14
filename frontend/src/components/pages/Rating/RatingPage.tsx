import {
	Box,
	Avatar,
	Typography,
	Grid,
	Card,
	CardContent,
	Rating,
	RatingProps,
} from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { coreSelectors } from 'store/core/selectors';
import { RatingData } from 'store/core/types';
import { Response } from 'store/types';
import { makeStyles } from 'tss-react/mui';
import { ErrorCard, Loading } from 'ui';
import api from 'utils/api/idnex';

export const topColors = ['#ffc132', '#bebebe', '#cb7e16'];

const useStyles = makeStyles()((theme) => ({
	card: {
		boxShadow: theme.shadows[8],
		cursor: 'pointer',
		transition: theme.transitions.create('boxShadow', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),

		'&:hover': {
			transition: theme.transitions.create('boxShadow', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			boxShadow: theme.shadows[10],
		},
	},
}));

export const RatingPage: React.FC = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const { role_name } = useSelector(coreSelectors.user);
	const [data, setData] = useState<RatingData[]>([]);
	const [error, setError] = useState<Nstring>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const isRKM = role_name === 'RKM';

	useEffect(() => {
		api
			.get<Response<RatingData[]>>('/rating')
			.then((res) => {
				if (res.data.status) {
					setData(res.data?.data || []);
				}
			})
			.catch((err: AxiosError<Response>) => {
				setError(err.response?.data?.error || 'Не удалось загрузить рейтинг. Повторите позже');
			})
			.finally(() => setLoading(false));
	}, []);

	const stopProp: RatingProps['onClick'] = (event) => {
		event.stopPropagation();
	};

	const onRating = (value: Nnumber, employee_id: number) => {
		api
			.post<Response, AxiosResponse<Response>, Pick<RatingData, 'employee_id' | 'stars'>>(
				'/updateRating',
				{
					employee_id,
					stars: value,
				},
			)
			.then((res) => {
				if (res.data?.status) {
					setData((prev) =>
						prev.map((el) => {
							if (el.employee_id === employee_id) {
								return { ...el, stars: value };
							}

							return el;
						}),
					);
				}
			});
	};

	if (error) return <ErrorCard err={error} />;

	if (loading) return <Loading />;

	return (
		<Grid container spacing={3}>
			{data.map((user) => {
				return (
					<Grid key={user?.employee_id} item xs={12} sm={6} md={4} lg={4}>
						<Card
							onClick={() => navigate(`/profile/${user.employee_id}`)}
							className={classes.card}
							sx={{ padding: 0, overflow: 'visible', borderRadius: 3, height: '100%' }}
							elevation={8}
							variant={undefined}
						>
							<CardContent
								sx={{
									p: '25px 15px 25px 20px',
									height: '100%',
									display: 'flex',
									justifyContent: 'flex-start',
									flexDirection: 'column',
								}}
							>
								<Box display="flex" position="relative" gap={2}>
									{user?.position ? (
										<Typography
											variant="h4"
											sx={{
												position: 'absolute',
												top: -15,
												left: -5,
												color: topColors?.[(user?.position || 0) - 1] || undefined,
												fontSize:
													21 + (8 - ((user?.position || 4) <= 3 ? (user?.position || 6) * 2 : 8)),
												fontWeight: `${(user?.position || 0) <= 3 ? 900 : 600} !important`,
											}}
										>
											{user?.position}
										</Typography>
									) : null}
									<Avatar
										sx={{ width: 90, height: 90 }}
										src={(user?.avatar_img as string) || ''}
										alt={`${user?.fio?.split(' ').slice(0, 2).join('')}`}
									/>
									<Box
										display="flex"
										flexDirection="column"
										justifyContent="space-between"
										gap={1}
										sx={{ pb: 0 }}
									>
										<Typography
											sx={{ display: 'flex', flex: '1 1 100%', height: '100%' }}
											variant="h6"
										>
											{user?.fio || ''}
										</Typography>
										<Box>
											<Typography variant="h6" color="gray">
												{user?.balls || ''}
												<Typography component="span" variant="body1" color="gray">
													{' '}
													баллов
												</Typography>{' '}
											</Typography>
											<Rating
												name="rating"
												onClick={stopProp}
												onChange={(e, value) => onRating(value, user.employee_id)}
												value={parseFloat(user?.stars?.toString() || '0')}
												precision={0.5}
												readOnly={!isRKM}
											/>
										</Box>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				);
			})}
		</Grid>
	);
};
