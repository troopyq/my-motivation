import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Grid } from '@mui/material';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import DashboardCard from 'components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';

const MonthlyEarnings = () => {
	// chart color
	const theme = useTheme();
	const secondary = theme.palette.secondary.main;
	const secondarylight = '#65c9f4';
	const errorlight = theme.palette.success.main;

	// chart
	const optionscolumnchart: ApexOptions = {
		chart: {
			type: 'area',
			width: '90%',

			foreColor: '#adb0bb',
			toolbar: {
				show: false,
			},
			height: 60,
			sparkline: {
				enabled: true,
			},
			group: 'sparklines',
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		dataLabels: {
			// enabled: true,
			offsetY: -10,
		},
		fill: {
			colors: [secondarylight],
			type: 'solid',
			opacity: 0.05,
		},
		markers: {
			size: 5,
		},
		tooltip: {
			theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
			followCursor: true,
		},

		xaxis: {
			categories: [
				'Январь',
				'Февраль',
				'Март',
				'Апрель',
				'Май',
				'Июнь',
				'Июль',
				'Август',
				'Сентябрь',
				'Ноябрь',
				'Декабрь',
			],
		},
	};
	const seriescolumnchart: ApexAxisChartSeries = [
		{
			name: 'Продаж, руб.',
			color: secondary,
			data: [30000, 32040, 31324, 33430, 30320, 32200],
			group: 'year',
		},
	];

	return (
		<DashboardCard
			title="Динамика продаж за последний месяц"
			footer={
				<Grid sx={{ margin: '0 auto', width: '100%' }}>
					<Chart
						options={optionscolumnchart}
						series={seriescolumnchart}
						type="area"
						height="110px"
					/>
				</Grid>
			}
		>
			<>
				<Typography variant="h3" fontWeight="700" mt="-20px">
					32 200 руб.
				</Typography>
				<Stack direction="row" spacing={1} my={1} alignItems="center">
					<Avatar sx={{ bgcolor: errorlight, width: 27, height: 27, transform: 'rotate(-90deg)' }}>
						{
							//@ts-ignore
							<SouthEastIcon width={20} color="#FA896B" />
						}
					</Avatar>
					<Typography variant="subtitle2" fontWeight="600">
						+9%
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						за последний месяц
					</Typography>
				</Stack>
			</>
		</DashboardCard>
	);
};

export default MonthlyEarnings;
