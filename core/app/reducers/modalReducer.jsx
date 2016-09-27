import { SET_MODAL_CONTENT } from '../actions/index';

export default function(state = {}, action = '') {
    switch(action.type){
        case(SET_MODAL_CONTENT):
            console.log(action.payload);
            return action.payload;
            break;
        default:
            return state;
    };
}