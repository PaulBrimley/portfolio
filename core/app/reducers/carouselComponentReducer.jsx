import { SET_CAROUSEL_HEIGHT } from '../actions/index';

export default function(state = {}, action = '') {
    switch(action.type){
        case(SET_CAROUSEL_HEIGHT):
            let obj = {};
            obj[action.payload.projectId] = action.payload.dimensions;
            return Object.assign({}, state, obj);
            break;
        default:
            return state;
    };
}