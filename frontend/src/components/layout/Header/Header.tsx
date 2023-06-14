import {
	styled,
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Toolbar,
	IconButton,
	Typography,
	Tooltip,
	Box,
	Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToApp from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import api from 'utils/api/idnex';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { coreActions } from 'store/core/actions';
import { useNavigate } from 'react-router-dom';
import { coreSelectors } from 'store/core/selectors';
import { Response } from 'store/types';
import { Search, StyledInputBase } from './styles';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

type SearchList = { id: string; fio: string; avatar_img: Nstring };

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
	const [searchList, setSearchList] = useState<SearchList[]>([]);

	const headerTitle = useSelector(coreSelectors.titleHeader);

	const onExit = () => {
		api.get('/logout').finally(() => {
			localStorage.removeItem('token');
			dispatch(coreActions.clearToken());
			dispatch(coreActions.authFailed(''));
			navigate('/');
		});
	};

	useEffect(() => {
		api.get<Response<SearchList[]>>('/searchUsers').then((res) => {
			if (res?.data?.status) {
				setSearchList(res.data?.data || []);
			}
		});
	}, []);

	const toProfile = (id?: Nstring | number) => {
		navigate(`/profile/${id || user.id || ''}`);
	};

	const [isOpen, setIsOpen] = useState(false);

	const onSelect = (option: SearchList, call: any) => {
		toProfile(option.id as string);
		setIsOpen(false);

		if (call) call();
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

				<Autocomplete
					freeSolo
					id="free-solo-2-demo"
					disableClearable
					size="small"
					options={searchList}
					open={isOpen}
					getOptionLabel={(e: SearchList) => e?.fio}
					onOpen={() => setIsOpen(true)}
					disableCloseOnSelect={false}
					onClose={(e, reason) => {
						setIsOpen(false);
					}}
					renderOption={(prop, option) => {
						const { onClick, ...props } = prop;
						return (
							//@ts-ignore
							<Box sx={{ display: 'flex' }} gap={2} {...props} onClick={() => onSelect(option)}>
								{option?.avatar_img ? (
									<Avatar sx={{ height: 40, width: 40 }} src={option?.avatar_img} />
								) : null}
								{option.fio}
							</Box>
						);
					}}
					autoSelect={false}
					autoComplete={false}
					renderInput={(params) => (
						<Search sx={{ mr: 5, display: 'flex', alignItems: 'center', width: 400 }}>
							<StyledInputBase
								{...params}
								placeholder="Поиск сотрудников"
								variant="standard"
								InputProps={{
									...params.InputProps,
									disableUnderline: true,
								}}
							/>

							<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
								<SearchIcon sx={{ fill: '#eee' }} />
							</IconButton>
						</Search>
					)}
				/>
				<Tooltip title={`${user.last_name} ${user.first_name} ${user.middle_name || ''}`}>
					<IconButton onClick={() => toProfile(user?.id?.toString())} color="inherit">
						{user?.avatar_img ? (
							<Avatar sx={{ width: 45, height: 45 }} src={user?.avatar_img || ''} />
						) : (
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
						)}
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
