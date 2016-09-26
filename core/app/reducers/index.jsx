import { combineReducers } from "redux";

import data from './dataReducer';
import projectComponent from './projectComponentReducer';
import carouselComponent from './carouselComponentReducer';

const rootReducer = combineReducers({
	data: data,
	projectComponent: projectComponent,
	carouselComponent: carouselComponent
});

export default rootReducer;