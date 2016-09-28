import { NAME_TEST } from '../actions/index';

export default function(state = {}, action = '') {
    switch(action.type){
        case(NAME_TEST):
            return action.payload.data;
            break;
        default:
            return state;
    };
}