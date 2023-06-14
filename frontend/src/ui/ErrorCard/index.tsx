import { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ErrorCard: FC<{ err?: Nstring; err2?: Nstring }> = ({ err, err2 }) => {
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

					<Typography variant="h5">{(err) || err2 || 'Ошибка загрузки. Повторите позже'}</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
};
