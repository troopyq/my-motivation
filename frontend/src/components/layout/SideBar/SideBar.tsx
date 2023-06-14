import {
	Toolbar,
	Drawer as MuiDrawer,
	IconButton,
	Divider,
	List,
	styled,
	Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useNavigate } from 'react-router-dom';
import { Drawer } from './styles';

const locations: { link: string; name: string; component?: any }[] = [
	{ link: '/new-dashboard', name: 'Личные показатели', component: <LeaderboardIcon /> },
	{ link: '/rating', name: 'Рейтинг', component: <LocalActivityIcon /> },
	// { link: '/', name: 'Доска почёта', component: <BackupTableIcon /> },
];

export const SideBar: React.FC<{ open: boolean; onToggle: VoidFunction }> = ({
	open,
	onToggle,
}) => {
	const navigate = useNavigate();

	return (
		<Drawer variant="permanent" open={open}>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					px: [1],
				}}
			>
				<Typography mr="auto" ml={1} variant="h5" color="primary.dark" fontWeight={700}>
					ПУЛЬС
				</Typography>
				<IconButton onClick={onToggle}>
					<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			<Divider />
			<List component="nav">
				{locations.map((el) => (
					<ListItemButton key={el.link} onClick={() => navigate(el.link)}>
						<ListItemIcon>{el?.component}</ListItemIcon>
						<ListItemText primary={el.name} />
					</ListItemButton>
				))}
			</List>
		</Drawer>
	);
};
