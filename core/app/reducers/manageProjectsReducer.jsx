import { ADD_PROJECT, SET_MEDIA_ADDS_QUANTITY } from '../actions/index';

export default function(state = {}, action = '') {
    switch(action.type){
        case(ADD_PROJECT):
            console.log(action.payload);
            return Object.assign({}, state, {
                projects: action.payload.data
            });
            break;
        case(SET_MEDIA_ADDS_QUANTITY):
            return Object.assign({}, state, {
                mediaAddsQuantity: action.payload
            });
            break;
        default:
            return state;
    };
}