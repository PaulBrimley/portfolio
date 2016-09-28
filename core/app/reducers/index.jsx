import { combineReducers } from "redux";

import data from './dataReducer';
import projectComponent from './projectComponentReducer';
import carouselComponent from './carouselComponentReducer';
import manageProjects from './manageProjectsReducer';
import moveProjectMedia from './moveProjectMediaReducer';
import modalContent from './modalReducer';
import nameTest from './nameTestReducer';

const rootReducer = combineReducers({
	data: data,
	projectComponent: projectComponent,
	carouselComponent: carouselComponent,
	manageProjects: manageProjects,
	moveProjectMedia: moveProjectMedia,
	modalContent: modalContent,
	nameTest: nameTest
});

export default rootReducer;