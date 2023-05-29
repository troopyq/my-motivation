import { Request, Response } from 'express';
import moment from 'moment';

export const error = (req: Request, res: Response, e: any) => {
	console.log(`Error: ${ moment().format('YYYY-MM-DDTHH:SS:SS')} - "${req?.originalUrl}" --- ${e?.message} `,);
	res.status(500).json({ status: false, error: e?.message || "Ошибка при исполнении кода на сервере" });
};
