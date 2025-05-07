// src/services/MovieService.js
import { getAuthHeader } from "@/helpers/auth-helper";
import {
	GET_MOVIE_BY_ID,
	MOVIE_CREATE_API_ROUTE,
	MOVIE_UPDATE_API_ROUTE,
	MOVIE_DELETE_API_ROUTE,
	
	MOVIE_BY_SLUG_API_ROUTE,
	MOVIE_COMING_SOON_API_ROUTE,
	MOVIE_IN_THEATERS_API_ROUTE,
	MOVIE_BY_HALL_API_ROUTE,
	GET_MOVIE_BY_QUERY_API_ROUTE,
	GET_ALL_MOVIES_API_ROUTE,
} from "@/helpers/api-routes";

/**
 * Get a list of movies with optional filtering
 * @param {Object} params - Query parameters
 * @param {string} params.q - Search query
 * @param {number} params.page - Page number (0-based)
 * @param {number} params.size - Page size
 * @param {string} params.sort - Field to sort by
 * @param {string} params.type - Sort direction (asc/desc)
 * @returns {Promise<Response>} Fetch response
 */
export const getMoviesByQuery = async (params = {}) => {
	const url = new URL(GET_MOVIE_BY_QUERY_API_ROUTE);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};

export const getAllMoviesByPage = async (params = {}) => {
	const url = new URL(GET_ALL_MOVIES_API_ROUTE);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};

/**
 * Get a movie by ID
 * @param {number} id - Movie ID
 * @returns {Promise<Response>} Fetch response
 */
export const getMovieById = async (id) => {
	return fetch(GET_MOVIE_BY_ID(id));
};

/**
 * Get a movie by slug
 * @param {string} slug - Movie slug
 * @returns {Promise<Response>} Fetch response
 */
export const getMovieBySlug = async (slug) => {
	return fetch(MOVIE_BY_SLUG_API_ROUTE(slug));
};

/**
 * Get movies that are currently in theaters
 * @param {Object} params - Query parameters for pagination
 * @returns {Promise<Response>} Fetch response
 */
export const getInTheatersMovies = async (params = {}) => {
	const url = new URL(MOVIE_IN_THEATERS_API_ROUTE);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};

/**
 * Get movies that are coming soon
 * @param {Object} params - Query parameters for pagination
 * @returns {Promise<Response>} Fetch response
 */
export const getComingSoonMovies = async (params = {}) => {
	const url = new URL(MOVIE_COMING_SOON_API_ROUTE);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};

/**
 * Get movies by hall name/type
 * @param {string} hallName - Hall name or type
 * @param {Object} params - Query parameters for pagination
 * @returns {Promise<Response>} Fetch response
 */
export const getMoviesByHall = async (hallName, params = {}) => {
	const url = new URL(MOVIE_BY_HALL_API_ROUTE(hallName));

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};



/**
 * Create a new movie (admin only)
 * @param {FormData} movieData - Movie form data including poster image
 * @returns {Promise<Response>} Fetch response
 */
export const createMovie = async (movieData) => {
	return fetch(MOVIE_CREATE_API_ROUTE, {
		method: "POST",
		headers: await getAuthHeader(),
		body: movieData, // FormData for multipart/form-data
	});
};

/**
 * Update an existing movie (admin only)
 * @param {number} id - Movie ID
 * @param {FormData} movieData - Movie form data including poster image
 * @returns {Promise<Response>} Fetch response
 */
export const updateMovie = async (id, movieData) => {
	return fetch(MOVIE_UPDATE_API_ROUTE(id), {
		method: "PUT",
		headers: await getAuthHeader(),
		body: movieData, // FormData for multipart/form-data
	});
};

/**
 * Delete a movie by ID (admin only)
 * @param {number} id - Movie ID
 * @returns {Promise<Response>} Fetch response
 */
export const deleteMovie = async (id) => {
	return fetch(MOVIE_DELETE_API_ROUTE(id), {
		method: "DELETE",
		headers: await getAuthHeader(),
	});
};
