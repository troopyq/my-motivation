import { Request } from 'express';
import { parseCookie } from './cookie';
import jwt from 'jsonwebtoken';
import config from 'config';
import { isNil } from 'ramda';
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

export const upd = (val?: Record<string, any>, isJson = false): string => {
	if (isNil(val)) return '';
	const name = Object.keys(val || {})?.[0];
	return `${
		!isNil(val?.[name]) ? `'${isJson ? JSON.stringify(val[name] || []) : val[name]}'` : name
	}`;
};
