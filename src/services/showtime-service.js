import {
	GET_SHOWTIME_BY_ID_API_ROUTE,
	GET_UPCOMING_SHOWTIMES_API_ROUTE,
} from "@/helpers/api-routes";

/**
 * Get upcoming showtimes for a movie
 * @param {number} movieId - Movie ID
 * @param {Object} params - Query parameters for pagination
 * @returns {Promise<Response>} Fetch response
 */
export const getMovieShowtimes = async (movieId, params = {}) => {
	const url = new URL(GET_UPCOMING_SHOWTIMES_API_ROUTE(movieId));

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.append(key, value);
		}
	});

	return fetch(url.toString());
};

export const getShowtimeById = async (showtimeId) => {
	const url = new URL(GET_SHOWTIME_BY_ID_API_ROUTE(showtimeId));

	return fetch(url.toString());
};
