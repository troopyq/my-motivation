import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { ruMoment } from 'utils';

export default function Deposits() {
	return (
		<React.Fragment>
			<Title>Продаж за месяц</Title>
			<Typography component="p" variant="h4">
				2 030 230 руб.
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				на {ruMoment().format('DD.MM.YYYY')}
			</Typography>
		</React.Fragment>
	);
}
