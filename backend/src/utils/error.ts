import { Request, Response } from 'express';
import moment from 'moment';

export const error = (req: Request, res: Response, status: number, e: any) => {
	console.log(
		`Error: ${moment().format('YYYY-MM-DD, h:mm:ss')} - "${req?.originalUrl}" --- ${e?.message} `,
	);
	res
		.status(status)
		.json({ status: false, error: e?.message || 'Ошибка при исполнении кода на сервере' });
};
