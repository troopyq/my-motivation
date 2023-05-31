import {
	styled,
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Toolbar,
	IconButton,
	Typography,
	Tooltip,
	Box,
	ThemeOptions,
	CustomTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToApp from '@mui/icons-material/ExitToApp';
import React from 'react';
import api from 'utils/api/idnex';
import { useDispatch, useSelector } from 'react-redux';
import { coreActions } from 'store/core/actions';
import { useNavigate } from 'react-router-dom';
import { coreSelectors } from 'store/core/selectors';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const Header: React.FC<{ open: boolean; onToggle: VoidFunction }> = ({ open, onToggle }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(coreSelectors.user);

	const headerTitle = useSelector(coreSelectors.titleHeader);

	const onExit = () => {
		api.get('/logout').finally(() => {
			localStorage.removeItem('token');
			dispatch(coreActions.clearToken());
			dispatch(coreActions.authFailed(''));
			navigate('/');
		});
	};

	const toProfile = () => {
		navigate('/profile/' + user.id);
	};

	return (
		<AppBar position="absolute" open={open}>
			<Toolbar
				sx={{
					pr: '24px', // keep right padding when drawer closed
				}}
			>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={onToggle}
					sx={{
						marginRight: '36px',
						...(open && { display: 'none' }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					{headerTitle}
				</Typography>
				<Tooltip title={`${user.last_name} ${user.first_name} ${user.middle_name || ''}`}>
					<IconButton onClick={toProfile} color="inherit">
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							bgcolor="primary.dark"
							sx={{ width: 45, height: 45, borderRadius: 50 }}
						>
							<Typography variant="body1" fontWeight={700}>
								{user.last_name ? `${user.last_name?.[0]}${user.first_name?.[0]}` : null}
							</Typography>
						</Box>
					</IconButton>
				</Tooltip>
				<Tooltip title="Выход">
					<IconButton onClick={onExit} color="inherit" sx={{ ml: 2 }}>
						<ExitToApp />
					</IconButton>
				</Tooltip>
			</Toolbar>
		</AppBar>
	);
};
