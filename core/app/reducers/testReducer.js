import { SOMETHING } from '../actions/index';

export default function(state = 0, action = '') {
	switch(action.type){
		case(SOMETHING):
			return action.payload;
		default:
			return state;
	}
}