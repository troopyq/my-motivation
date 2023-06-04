// import { makeStyles } from "@mui/material";

import { styled, alpha, TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	select: {
		width: '300px',
		border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: 4,
    padding: '8px 12px',
	},
}));

export const Search = styled('div')(({ theme }) => ({
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

export const StyledInputBase = styled(TextField)(({ theme }) => ({
	color: 'inherit',
	'*': {
		border: 'none',
	},
	'& .MuiTextField-root, & .MuiInputBase-input, & .MuiOutlinedInput-root, &, *, & *': {
		paddingRight: `calc(1em + ${theme.spacing(1)})`,
		paddingLeft: `calc(1em + ${theme.spacing(1)})`,
		transition: theme.transitions.create('width'),
		border: 'none',
		width: '300px',
		color: 'white',
	},
	'&': {
		padding: 0,
	},
}));