import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const SET_PROJECT_DIMENSIONS = 'SET_PROJECT_DIMENSIONS';
export const SET_CAROUSEL_HEIGHT = 'SET_CAROUSEL_HEIGHT';

const ROOT_URL = window.location.origin;

export function getData(url) {
	const request = axios.get(ROOT_URL + url);
	return {
		type: GET_DATA,
		payload: request
	};
}

export function setCarouselHeight(dimensions) {
	return {
		type: SET_CAROUSEL_HEIGHT,
		payload: dimensions
	};
}

export function setProjectDimensions(dimensions) {
	return {
		type: SET_PROJECT_DIMENSIONS,
		payload: dimensions
	};
}