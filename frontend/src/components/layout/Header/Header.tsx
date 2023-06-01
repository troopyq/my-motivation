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
	InputBase,
	alpha,
	TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToApp from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import api from 'utils/api/idnex';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { coreActions } from 'store/core/actions';
import { useNavigate } from 'react-router-dom';
import { coreSelectors } from 'store/core/selectors';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '170px',
			'&:focus': {
				width: '300px',
			},
		},
	},
}));

const StyledTextField = styled(Autocomplete)(({ theme }) => ({
	color: 'inherit',
	'& .MuiTextField-root': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '170px',
			'&:focus': {
				width: '300px',
			},
		},
	},
}));

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
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	];

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
				<Search sx={{ mr: 5 }}>
					{/* <SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper> */}
					{/* <StyledInputBase
						placeholder="Поиск сотрудников"
						inputProps={{ 'aria-label': 'search' }}
					/> */}
					<Autocomplete
						sx={{ width: 300 }}
						freeSolo
						id="free-solo-2-demo"
						disableClearable
						options={top100Films.map((option) => option.title)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Поиск сотрудников"
								InputProps={{
									...params.InputProps,
									type: 'search',
								}}
							/>
						)}
					/>
				</Search>

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
