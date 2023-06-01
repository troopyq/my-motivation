import moment from 'moment';
import 'moment/locale/ru';

console.log(moment.locale('ru'));

export const ruMoment = moment;

export const moneyFormat = (
	n: number | string | null | undefined,
	fixed = 2,
	delimeter: '.' | ',' = ',',
): string => {
	if (n === null || n === undefined) return '0';

	const number = (typeof n === 'string' ? parseFloat(n) : n) || 0;

	return number
		.toFixed(Math.max(fixed, 0))
		.replace(/(?<!\.\d*)(\d)(?=(\d{3})+(?!\d))/g, '$1')
		.replace('.', delimeter);
};

export function sklonenie(n: number, text_forms: [string, string, string]) {
	n = Math.abs(n) % 100;
	let n1 = n % 10;

	if (n > 10 && n < 20) {
		return text_forms[2];
	}

	if (n1 > 1 && n1 < 5) {
		return text_forms[1];
	}

	if (n1 == 1) {
		return text_forms[0];
	}

	return text_forms[2];
}
