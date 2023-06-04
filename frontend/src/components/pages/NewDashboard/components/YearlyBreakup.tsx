import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import DashboardCard from 'components/shared/DashboardCard';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { ApexOptions } from 'apexcharts';

const YearlyBreakup = () => {
	// chart color
	const theme = useTheme();
	const primary = theme.palette.primary.main;
	const primarylight = '#ecf2ff';
	const successlight = theme.palette.success.main;

	// chart
	const optionscolumnchart: ApexOptions = {
		chart: {
			type: 'donut',

			foreColor: '#adb0bb',
			toolbar: {
				show: false,
			},
			height: 155,
		},
		colors: [primary, primarylight, '#F9F9FD'],
		plotOptions: {
			pie: {
				startAngle: 0,
				endAngle: 360,
				donut: {
					size: '75%',
					background: 'transparent',
				},
			},
		},
		tooltip: {
			theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
			fillSeriesColor: false,
		},
		stroke: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		responsive: [
			{
				breakpoint: 991,
				options: {
					chart: {
						width: 120,
					},
				},
			},
		],
	};
	const seriescolumnchart = [378560, 425300];

	return (
		<DashboardCard title="Продаж за последний год">
			<Grid container spacing={3}>
				{/* column */}
				<Grid item xs={6} sm={6}>
					<Typography variant="h3" fontWeight="700" mb={3}>
						425 300 руб.
					</Typography>
					<Stack direction="column" spacing={1} mt={1} alignItems="flex-start">
						<Grid>
							<Avatar
								sx={{ bgcolor: successlight, width: 27, height: 27, transform: 'rotate(-90deg)' }}
							>
								{
									//@ts-ignore
									<SouthEastIcon width={20} color="#FA896B" />
								}
							</Avatar>
							<Typography variant="subtitle2" fontWeight="600">
								+14%
							</Typography>
						</Grid>
						<Typography variant="subtitle2" color="textSecondary">
							за последний год
						</Typography>
					</Stack>
					<Stack spacing={3} mt={5} direction="row">
						<Stack direction="row" spacing={1} alignItems="center">
							<Avatar
								sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
							></Avatar>
							<Typography variant="subtitle2" color="textSecondary">
								2022
							</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<Avatar
								sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
							></Avatar>
							<Typography variant="subtitle2" color="textSecondary">
								2023
							</Typography>
						</Stack>
					</Stack>
				</Grid>
				{/* column */}
				<Grid item xs={6} sm={6}>
					<Chart
						options={optionscolumnchart}
						series={seriescolumnchart}
						type="donut"
						height="150px"
					/>
				</Grid>
			</Grid>
		</DashboardCard>
	);
};

export default YearlyBreakup;
