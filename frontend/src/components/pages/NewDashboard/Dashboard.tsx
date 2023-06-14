import { Grid, Box } from '@mui/material';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import MonthlyEarnings from './components/MonthlyEarnings';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { RatingData } from 'store/core/types';
import { Response } from 'store/types';
import { ErrorCard, Loading } from 'ui';
import api from 'utils/api';
import { useSelector } from 'react-redux';
import { coreSelectors } from 'store/core/selectors';

export const NewDashboard = () => {
	const { id } = useSelector(coreSelectors.user);
	const [data, setData] = useState<RatingData | null>(null);
	const [error, setError] = useState<Nstring>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (id)
			api
				.get<Response<RatingData[]>>('/rating', { params: { employee_id: id } })
				.then((res) => {
					if (res.data.status) {
						setData((res.data?.data?.[0] as RatingData) || []);
					}
				})
				.catch((err: AxiosError<Response>) => {
					setError(err.response?.data?.error || 'Не удалось загрузить рейтинг. Повторите позже');
				})
				.finally(() => setLoading(false));
	}, [id]);

	if (error) return <ErrorCard err={error} />;

	if (loading) return <Loading />;

	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8} lg={8}>
					<SalesOverview />
				</Grid>
				<Grid item xs={12} md={4} lg={4}>
					<Grid container spacing={3}>
						<Grid item xs={6} md={12}>
							<YearlyBreakup data={data} />
						</Grid>
						<Grid item xs={6} md={12}>
							<MonthlyEarnings data={data} />
						</Grid>
					</Grid>
				</Grid>
				{/* <Grid item xs={12} lg={4}>
					<RecentTransactions />
				</Grid>
				<Grid item xs={12} lg={8}>
					<ProductPerformance />
				</Grid> */}
			</Grid>
		</Box>
	);
};
