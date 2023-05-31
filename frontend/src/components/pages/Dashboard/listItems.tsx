import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

export const mainListItems = (
	<React.Fragment>
		<ListItemButton>
			<ListItemIcon>
				<LeaderboardIcon />
			</ListItemIcon>
			<ListItemText primary="Личные показатели" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<LocalActivityIcon />
			</ListItemIcon>
			<ListItemText primary="Рейтинг" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<BackupTableIcon />
			</ListItemIcon>
			<ListItemText primary="Доска почёта" />
		</ListItemButton>
	</React.Fragment>
);
