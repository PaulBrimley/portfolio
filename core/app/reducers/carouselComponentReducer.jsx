import { SET_CAROUSEL_HEIGHT } from '../actions/index';

export default function(state = 0, action = '') {
    switch(action.type){
        case(SET_CAROUSEL_HEIGHT):
            return action.payload;
            break;
        default:
            return state;
    };
}