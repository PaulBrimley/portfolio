import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const SET_CAROUSEL_HEIGHT = 'SET_CAROUSEL_HEIGHT';
export const MOVE_PROJECT_MEDIA = 'MOVE_PROJECT_MEDIA';
export const SET_PROJECT_DIMENSIONS = 'SET_PROJECT_DIMENSIONS';

export const SET_MEDIA_ADDS_QUANTITY = 'SET_MEDIA_ADDS_QUANTITY';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const CLEAR_LINK = 'CLEAR_LINK';
export const CHECK_LINK_SET = 'CHECK_LINK_SET';

export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';

export const NAME_TEST = 'NAME_TEST';

const ROOT_URL = window.location.origin;

export function addMediaAdds(quantity) {
	return {
		type: SET_MEDIA_ADDS_QUANTITY,
		payload: quantity
	};
}

export function addProject(project) {
	const projectSend = axios.post(`${ROOT_URL}/addProject`, project);
	return {
		type: ADD_PROJECT,
		payload: projectSend
	};
}

export function checkLinkSet() {
	const projectSend = axios.get(`${ROOT_URL}/checkLink`);
	return {
		type: CLEAR_LINK,
		payload: projectSend
	};
}

export function clearLink() {
	const projectSend = axios.get(`${ROOT_URL}/clearLink`);
	return {
		type: CLEAR_LINK,
		payload: projectSend
	};
}

export function getData(url) {
	const request = axios.get(ROOT_URL + url);
	return {
		type: GET_DATA,
		payload: request
	};
}

export function moveProjectMedia(projectId, direction) {
	return {
		type: MOVE_PROJECT_MEDIA,
		payload: {projectId, direction}
	};
}

export function nameTester(name) {
	const nameTest = axios.post(`${ROOT_URL}/testName`, {name});
	return {
		type: NAME_TEST,
		payload: nameTest
	};
}

export function setCarouselHeight(projectId, dimensions) {
	return {
		type: SET_CAROUSEL_HEIGHT,
		payload: {projectId, dimensions}
	};
}

export function setModalContent(showModal, content) {
	return {
		type: SET_MODAL_CONTENT,
		payload: {showModal, content}
	};
}

export function setProjectDimensions(dimensions) {
	return {
		type: SET_PROJECT_DIMENSIONS,
		payload: dimensions
	};
}

export function updateProject(project, projectId) {
	let object = {
		project: project,
		_id: projectId
	};
	const projectSend = axios.post(`${ROOT_URL}/updateProject`, object);
	return {
		type: UPDATE_PROJECT,
		payload: projectSend
	};
}