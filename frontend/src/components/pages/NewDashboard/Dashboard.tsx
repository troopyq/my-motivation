import React from 'react';
import { Grid, Box } from '@mui/material';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import MonthlyEarnings from './components/MonthlyEarnings';

export const NewDashboard = () => {
	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs={12} lg={8}>
					<SalesOverview />
				</Grid>
				<Grid item xs={12} lg={4}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<YearlyBreakup />
						</Grid>
						<Grid item xs={12}>
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