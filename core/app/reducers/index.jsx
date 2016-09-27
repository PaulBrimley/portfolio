import { combineReducers } from "redux";

import data from './dataReducer';
import projectComponent from './projectComponentReducer';
import carouselComponent from './carouselComponentReducer';
import manageProjects from './manageProjectsReducer';
import moveProjectMedia from './moveProjectMediaReducer';
import modalContent from './modalReducer';

const rootReducer = combineReducers({
	data: data,
	projectComponent: projectComponent,
	carouselComponent: carouselComponent,
	manageProjects: manageProjects,
	moveProjectMedia: moveProjectMedia,
	modalContent: modalContent
});

export default rootReducer;