import { app, PORT } from './config.js';
import { router } from './router.js';

const startApp = () => {
	app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
};

app.use('/api', router);

startApp();

