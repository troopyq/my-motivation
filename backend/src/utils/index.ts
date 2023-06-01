import { Request } from 'express';
import { parseCookie } from './cookie';
import jwt from 'jsonwebtoken';
import config from 'config';
import { JWTData } from '../types';

export const getToken = <T extends Record<string, unknown> = Partial<JWTData & { token: string }>>(
	req: Request,
): T => {
	try {
		const token =
			parseCookie(req?.headers?.cookie)?.token || req?.headers?.authorization?.split(' ')?.[1];

		const decodeData = jwt.verify(token, config.get('secret')) as any;

		return { ...decodeData, token };
	} catch (error) {
		//@ts-ignore
		return { token: null };
	}
};
