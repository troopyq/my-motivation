import { Request } from 'express';
import moment from 'moment';

export const logtime = (req: Request, message: any) => {
	return console.log(
		`[${moment().format('YYYY-MM-DD, h:mm:ss')}] - "${req?.originalUrl}" --- ${JSON.stringify(
			message,
			undefined,
			4,
		)}`,
	);
};

export const logger = (message: any) => {
	return console.log(
		`[${moment().format('YYYY-MM-DD, h:mm:ss')}] - LOGGER --- ${JSON.stringify(
			message,
			undefined,
			4,
		)}`,
	);
};
