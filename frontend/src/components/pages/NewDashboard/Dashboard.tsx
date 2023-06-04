import { Grid, Box } from '@mui/material';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import MonthlyEarnings from './components/MonthlyEarnings';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { RatingData } from 'store/core/types';
import { Response } from 'store/types';
import { ErrorCard, Loading } from 'ui';
import api from 'utils/api/idnex';

export const NewDashboard = () => {
	const [data, setData] = useState<RatingData[]>([]);
	const [error, setError] = useState<Nstring>(null);
	const [loading, setLoading] = useState<boolean>(true);

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
							<YearlyBreakup />
						</Grid>
						<Grid item xs={6} md={12}>
							<MonthlyEarnings />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={4}>
					<RecentTransactions />
				</Grid>
				<Grid item xs={12} lg={8}>
					<ProductPerformance />
				</Grid>
			</Grid>
		</Box>
	);
};
