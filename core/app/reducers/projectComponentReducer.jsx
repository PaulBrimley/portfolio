import { SET_PROJECT_DIMENSIONS } from '../actions/index';

export default function(state = 0, action = '') {
    switch(action.type){
        case(SET_PROJECT_DIMENSIONS):
            return action.payload;
            break;
        default:
            return state;
    };
}