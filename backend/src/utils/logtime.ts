import { Request } from 'express';
import moment from 'moment';

export const logtime = (req: Request, message: any) => {
	return console.log(`[${ moment().format('YYYY-MM-DDTHH:SS')}] - "${req?.originalUrl}" --- ${JSON.stringify(message, undefined, 4)} `,);
};
