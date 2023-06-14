//@ts-nocheck

import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const DashboardCard = ({
	title,
	subtitle,
	children,
	action,
	footer,
	cardheading,
	headtitle,
	headsubtitle,
	middlecontent,
}: Partial<{
	title: any;
	subtitle: any;
	children: any;
	action: any;
	footer: any;
	cardheading: any;
	headtitle: any;
	headsubtitle: any;
	middlecontent: any;
}>) => {
	return (
		<Card sx={{ padding: 0, overflow: 'visible' }} elevation={9} variant={undefined}>
			{cardheading ? (
				<CardContent>
					<Typography variant="h5">{headtitle}</Typography>
					<Typography variant="subtitle2" color="textSecondary">
						{headsubtitle}
					</Typography>
				</CardContent>
			) : (
				<CardContent sx={{ p: '30px' }}>
					{title ? (
						<Stack
							direction="row"
							spacing={2}
							justifyContent="space-between"
							alignItems={'center'}
							mb={3}
						>
							<Box>
								{title ? <Typography variant="h5">{title}</Typography> : ''}

								{subtitle ? (
									<Typography variant="subtitle2" color="textSecondary">
										{subtitle}
									</Typography>
								) : (
									''
								)}
							</Box>
							{action}
						</Stack>
					) : null}

					{children}
				</CardContent>
			)}

			{middlecontent}
			{footer}
		</Card>
	);
};

export default DashboardCard;
