import { ADD_PROJECT, SET_MEDIA_ADDS_QUANTITY, UPDATE_PROJECT, CLEAR_LINK } from '../actions/index';

export default function(state = {}, action = '') {
    switch(action.type){
        case(ADD_PROJECT):
            return Object.assign({}, state, {
                projects: action.payload.data});
            break;
        case(SET_MEDIA_ADDS_QUANTITY):
            return Object.assign({}, state, {
                mediaAddsQuantity: action.payload});
            break;
        case(UPDATE_PROJECT):
            return Object.assign({}, state, {
                projectsUpdated: action.payload.data});
            break;
        case(CLEAR_LINK):
            return Object.assign({}, state, {linkCleared: action.payload.data});
            break;
        default:
            return state;
    };
}