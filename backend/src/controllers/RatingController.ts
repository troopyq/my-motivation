import { Request, Response } from 'express';
import { pool } from '../database';
import { error } from '../utils/error';
import { RowDataPacket } from 'mysql2/promise';
import { logger } from '../utils/logtime';
import { Res } from '../types';
import { IEmployee, IRole, ShortEmployee } from '../types/employee';
import { upd } from '../utils';

interface Rating {
	id: number;
	balls: Nnumber;
	employee_id: number;
	stars: Nnumber;
	execution_plan: Nnumber;
	month_sales: Record<string, unknown> | string | null;
	year_sales: Record<string, unknown> | string | null;
	last_sales: Record<string, unknown> | string | null;
}

interface IUpdateRatingReq extends Request {
	body: Rating;
}

export interface IUpdateRating
	extends Pick<ShortEmployee, 'fio' | 'avatar_img'>,
		Rating,
		RowDataPacket {
	position: number;
}

const RatingController = {
	async updateRating(req: IUpdateRatingReq, res: Response) {
		try {
			const { employee_id, last_sales, month_sales, year_sales, execution_plan, stars } = req.body;

			const resp = await pool.query(`
        UPDATE rating SET
         execution_plan = ${upd({ execution_plan })},
         stars = ${upd({ stars })},
         last_sales = ${upd({ last_sales }, true)},
         month_sales = ${upd({ month_sales }, true)},
         year_sales = ${upd({ year_sales }, true)}
        WHERE employee_id=${employee_id}
       `);

			res.status(200).json({ status: true } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},

	async getRaging(req: IUpdateRatingReq, res: Response) {
		try {
			const { employee_id } = req.query;

			const [rating] = await pool.query<IUpdateRating[]>(`
        SELECT * FROM rating 
				${employee_id ? `WHERE employee_id=${employee_id}` : ''}
        `);

			const [employees] = await pool.query<IUpdateRating[]>(`
        SELECT * FROM searchEmployees 
       ${employee_id ? `WHERE id=${employee_id}` : ''}
       `);

			let response = rating
				.map((el, ind) => ({
					...el,
					fio: employees?.find((e) => e.id === el.employee_id)?.fio,
					avatar_img: employees?.find((e) => e.id === el.employee_id)?.avatar_img,
					last_sales: el.last_sales && JSON.parse((el.last_sales as string) || ''),
					month_sales: el.month_sales && JSON.parse((el.month_sales as string) || ''),
					year_sales: el.year_sales && JSON.parse((el.year_sales as string) || ''),
					stars: parseFloat(el?.stars?.toString() || '0'),
					execution_plan: parseFloat(el?.execution_plan?.toString() || '0'),
				}))
				.sort((a, b) => {
					if (a.balls === null || b.balls === null) return 0;
					if (a.balls < b.balls) return 1;
					if (a.balls > b.balls) return -1;
					return 0;
				})
				.map((el, ind) => ({ ...el, position: ind + 1 }));

			if (employee_id) response = response.filter((el) => el?.employee_id === Number(employee_id));

			res.status(200).json({ status: true, data: response } as Res);
		} catch (e) {
			error(req, res, 500, e);
		}
	},
};

export default RatingController;
