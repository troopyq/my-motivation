import { Toolbar, Drawer as MuiDrawer, IconButton, Divider, List, styled } from '@mui/material';
import { mainListItems, secondaryListItems } from '../../pages/Dashboard/listItems';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(9),
				},
			}),
		},
	}),
);

export const SideBar: React.FC<{ open: boolean, onToggle: VoidFunction }> = ({ open, onToggle }) => {
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
				<IconButton onClick={onToggle}>
					<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			<Divider />
			<List component="nav">
				{mainListItems}
				<Divider sx={{ my: 1 }} />
				{secondaryListItems}
			</List>
		</Drawer>
	);
};
