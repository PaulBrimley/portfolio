import axios from 'axios';

export const SOMETHING = 'SOMETHING';

export function hello(number) {
	number++;
	return {
		type: SOMETHING,
		payload: number
	};
}