import { Container, Box, Avatar, Typography, TextField, Button, Grid, Link } from '@mui/material';
import React from 'react';

export const RatingPage: React.FC = () => {

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
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>ДН</Avatar>
				<Typography component="h1" variant="h5">
					МОЯ МОТИВАЦИЯ
				</Typography>
				<Box sx={{ mt: 1 }}>
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

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Войти
					</Button>
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
};
