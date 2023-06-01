export type Res<T extends unknown = unknown> = {
	error?: Nstring;
	status: boolean;
	data?: T;
};

export type JWTData = {
	id: number;
	roles: string;
	iat: number;
	exp: number;
};
