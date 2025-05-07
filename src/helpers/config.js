// src/helpers/config.js

export const appConfig = {
	project: {
		name: "CineTime",
		slogan: "Your Ultimate Movie Experience",
		description:
			"CineTime is your go-to platform for discovering the latest movies, showtimes, and exclusive cinema content.",
	},
	apiURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
	apiURLWithoutApi:
		process.env.NEXT_PUBLIC_API_URL_WITHOUT_API || "http://localhost:8080",
	endpoints: {
		cinema: {
			list: "/cinemas",
			details: (id) => `/cinemas/${id}`,
			halls: (cinemaId) => `/cinemas/${cinemaId}/halls`,
			specialHalls: "/halls/special-halls",
			getByMovieId: (movieId) => `/cinemas/movie/${movieId}`,
		},
		movie: {
			all: "/movies/getAllMoviesByPage",
			query: "/movies${query}",
			details: (id) => `/movies/${id}`,
			create: "/movies",
			update: (id) => `/movies/${id}`,
			delete: (id) => `/movies/${id}`,
			search: (query) => `/movies?q=${query}`,
			bySlug: (slug) => `/movies/slug/${slug}`,
			comingSoon: "/movies/coming-soon",
			inTheaters: "/movies/in-theaters",
			byHall: (hallName) => `/movies/hall/${hallName}`,
		},
		showtime: {
			upcoming: (movieId) => `/showtime/upcoming/${movieId}`,
			getById: (showtimeId) => `/showtime/${showtimeId}`,
		},
		user: {
			login: "/login",
			register: "/register",
			forgotPassword: "/forgot-password",
			resetPassword: "/reset-password",
			validateResetCode: "/validate-reset-password-code",
			getCurrentUser: "/users/auth",
			search: "/users/admin",
			create: "/users/auth",
			update: "/users/auth",
			delete: "/users/auth",
			getById: (id) => `/users/${id}/admin`,
		},
		ticket: {
			currentTickets: "/tickets/auth/current-tickets",
			passedTickets: "/tickets/auth/passed-tickets",
			reserve: (movieId) => `/tickets/reserve/${movieId}`,
			purchase: "/tickets/buy-ticket",
		},
		favorites: {
			userFavorites: "/favorites/auth",
		},
	},
	genders: [
		{ label: "Female", value: "FEMALE" },
		{ label: "Male", value: "MALE" },
	],
};
