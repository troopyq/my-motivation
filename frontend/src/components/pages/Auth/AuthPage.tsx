import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { coreActions } from '../../../store/core/actions';
import { useSelector } from 'react-redux';
import { coreSelectors } from '../../../store/core/selectors';

export function AuthPage() {
	const dispatch = useDispatch();
	const isLoading = useSelector(coreSelectors.formLoading);
	const error = useSelector(coreSelectors.formError);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			login: data.get('login') as string,
			password: data.get('password') as string,
		};

		dispatch(coreActions.auth(payload));
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					МОЯ МОТИВАЦИЯ
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="login"
						label="Логин"
						name="login"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Пароль"
						type="password"
						id="password"
					/>

					<Button
						disabled={isLoading}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Войти
					</Button>
					{Boolean(error) && (
						<Grid container>
							<Grid item xs>
								{error}
							</Grid>
						</Grid>
					)}
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Забыли пароль?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
