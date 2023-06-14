import { Box, CircularProgress } from '@mui/material';

export const Loading: React.FC = () => {
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<CircularProgress />
		</Box>
	);
};
