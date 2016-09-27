import { MOVE_PROJECT_MEDIA } from '../actions/index';

export default function(state = {}, action = '') {
    switch(action.type){
        case(MOVE_PROJECT_MEDIA):
            return action.payload;
            break;
        default:
            return state;
    };
}