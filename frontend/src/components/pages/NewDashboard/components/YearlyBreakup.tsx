import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, PaletteColor } from '@mui/material';
import DashboardCard from 'components/shared/DashboardCard';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { ApexOptions } from 'apexcharts';
import { RatingData } from 'store/core/types';
import { moneyFormat, ruMoment } from 'utils';
import { useMemo } from 'react';

const YearlyBreakup: React.FC<{ data: RatingData | null }> = ({ data }) => {
	// chart color
	const theme = useTheme();
	const successlight = theme.palette.success.main;
	const error = theme.palette.error.main;

	const years = useMemo(
		() => data?.year_sales?.map((el) => ruMoment(el?.date || '').format('YYYY')) || [],
		[data],
	);

	const colors = useMemo(
		() => [
			...Object.keys(theme.palette.primary)
				.slice(0, 2)
				.map((e: unknown) => theme.palette.primary?.[e as keyof PaletteColor]),
			...Object.keys(theme.palette.primary)
				.slice(0, 2)
				.map((e: unknown) => theme.palette.secondary?.[e as keyof PaletteColor]),
		],
		[],
	);

	const values = useMemo(() => data?.year_sales?.map((el) => el.sales as number) || [], [data]);

	const seriescolumnchart = values;

	const precent: number = values
		? +(((values?.[0] - values?.[1]) / values?.[1]) * 100 || 0).toFixed(0)
		: 0;

	const isPositive = precent >= 0;

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
		labels: years,
		colors: colors,
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

	return (
		<DashboardCard title="Продажи за текущий год">
			<Grid container spacing={3}>
				{/* column */}
				<Grid item xs={6} sm={6}>
					<Typography variant="h3" fontWeight="700" mb={3}>
						{moneyFormat(values?.[0])} руб.
					</Typography>
					<Stack direction="column" spacing={1} mt={1} alignItems="flex-start">
						<Grid>
							<Avatar
								sx={{
									bgcolor: isPositive ? successlight : error,
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
						</Grid>
						<Typography variant="subtitle2" color="textSecondary">
							за последний год
						</Typography>
					</Stack>
					<Stack spacing={3} mt={5} direction="row">
						{years?.map((year, i) => {
							const colors = [
								...Object.keys(theme.palette.primary)
									.slice(0, 2)
									.map((e: unknown) => theme.palette.primary?.[e as keyof PaletteColor]),
								...Object.keys(theme.palette.primary)
									.slice(0, 2)
									.map((e: unknown) => theme.palette.secondary?.[e as keyof PaletteColor]),
							];

							return (
								<Stack key={year + i} direction="row" spacing={1} alignItems="center">
									<Avatar
										sx={{
											width: 9,
											height: 9,
											bgcolor: colors?.[i],
											svg: { display: 'none' },
										}}
									></Avatar>
									<Typography variant="subtitle2" color="textSecondary">
										{year}
									</Typography>
								</Stack>
							);
						})}
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
