import { CINEMA_DETAILS_API_ROUTE, CINEMAS_BY_MOVIE_API_ROUTE } from "@/helpers/api-routes";

/**
 * Get a list of cinemas showing a specific movie
 * @param {number} movieId - Movie ID
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (0-based)
 * @param {number} params.size - Page size
 * @param {string} params.sort - Field to sort by
 * @param {string} params.type - Sort direction (asc/desc)
 * @returns {Promise<Response>} Fetch response
 */
export const getCinemasByMovieId = async (movieId, params = {}) => {
	const url = new URL(CINEMAS_BY_MOVIE_API_ROUTE(movieId));

	// Add query parameters
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};

export const getCinemaById = async (cinemaId) =>{
	const url = new URL(CINEMA_DETAILS_API_ROUTE(cinemaId));

	return fetch(url.toString());
}
