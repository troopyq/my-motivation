import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Grid } from '@mui/material';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import DashboardCard from 'components/shared/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import { RatingData } from 'store/core/types';
import { moneyFormat, ruMoment } from 'utils';

const MonthlyEarnings: React.FC<{ data: RatingData | null }> = ({ data }) => {
	// chart color
	const theme = useTheme();
	const secondary = theme.palette.secondary.main;
	const secondarylight = '#65c9f4';
	const error = theme.palette.error.main;
	const success = theme.palette.success.main;

	const months = useMemo(
		() => data?.month_sales?.map((el) => ruMoment(el?.date || '').format('MMMM')) || [],
		[data],
	);

	console.log(months);
	console.log(data);

	const values = useMemo(() => data?.month_sales?.map((el) => el.sales as number) || [], [data]);

	const precent: number = values
		? +(
				((values?.[values.length - 1] - values?.[values.length - 2]) /
					values?.[values.length - 2]) *
					100 || 0
		  ).toFixed(0)
		: 0;

	const isPositive = precent >= 0;

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
			categories: months,
		},
	};
	const seriescolumnchart: ApexAxisChartSeries = [
		{
			name: 'Продаж, руб.',
			color: secondary,
			data: values || [],
			group: 'year',
		},
	];

	return (
		<DashboardCard
			title="Динамика продаж за текущий месяц"
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
					{moneyFormat(values?.[values.length - 1])} руб.
				</Typography>
				<Stack direction="row" spacing={1} my={1} alignItems="center">
					<Avatar
						sx={{
							bgcolor: isPositive ? success : error,
							width: 27,
							height: 27,
							transform: `rotate(${isPositive ? '-90' : '90'}deg)`,
						}}
					>
						{
							//@ts-ignore
							<SouthEastIcon width={20} color="#FA896B" />
						}
					</Avatar>
					<Typography variant="subtitle2" fontWeight="600">
						{precent}%
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
