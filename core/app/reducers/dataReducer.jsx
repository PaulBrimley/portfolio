import { GET_DATA } from '../actions/index';

export default function(state = 0, action = '') {
	switch(action.type){
		case(GET_DATA):
			return action.payload.data;
			break;
		default:
			return state;
	};
}