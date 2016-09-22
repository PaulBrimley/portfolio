import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import something from './testReducer';

const rootReducer = combineReducers({
	form: formReducer,
	something: something
});

export default rootReducer;