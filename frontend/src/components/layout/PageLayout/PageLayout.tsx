import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import { Header, SideBar } from 'components/layout';
import { Outlet } from 'react-router-dom';
import api from 'utils/api/idnex';

export const PageLayout: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const onToggle = () => {
		setOpen(!open);
	};

	React.useEffect(() => {
		// api.interceptors.response.use(
		// 	(res) => console.log('res', res),
		// 	(err) => console.log(err),
		// );
	}, []);

	return (
		<Box sx={{ display: 'flex' }}>
			<Header onToggle={onToggle} open={open} />
			<SideBar onToggle={onToggle} open={open} />
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
					flexGrow: 1,
					minHeight: '100vh',
					overflow: 'auto',
				}}
			>
				<Toolbar />
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '83%' }}>
					<Outlet />
				</Container>
			</Box>
		</Box>
	);
};
