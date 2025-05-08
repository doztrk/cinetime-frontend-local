// src/helpers/api-routes.js
import { ApiError } from "next/dist/server/api-utils";
import { appConfig } from "./config";

// Base URL
export const API_BASE_URL = appConfig.apiURL;
export const API_URL = appConfig.apiURLWithoutApi;

// Cinema endpoints
export const CINEMA_LIST_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.cinema.list}`;
export const CINEMA_DETAILS_API_ROUTE = (id) => `${API_BASE_URL}${appConfig.endpoints.cinema.details(id)}`;
export const CINEMA_HALLS_API_ROUTE = (cinemaId) => `${API_BASE_URL}${appConfig.endpoints.cinema.halls(cinemaId)}`;
export const SPECIAL_HALLS_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.cinema.specialHalls}`;
export const CINEMAS_BY_MOVIE_API_ROUTE = (movieId) =>  `${API_BASE_URL}${appConfig.endpoints.cinema.getByMovieId(movieId)}`;
// Movie endpoints
export const GET_MOVIE_BY_QUERY_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.movie.query}`;
export const GET_ALL_MOVIES_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.movie.all}`;
export const GET_MOVIE_BY_ID = (id) => `${API_BASE_URL}${appConfig.endpoints.movie.details(id)}`;
export const MOVIE_CREATE_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.movie.create}`;
export const MOVIE_UPDATE_API_ROUTE = (id) => `${API_BASE_URL}${appConfig.endpoints.movie.update(id)}`;
export const MOVIE_DELETE_API_ROUTE = (id) => `${API_BASE_URL}${appConfig.endpoints.movie.delete(id)}`;
export const MOVIE_SEARCH_API_ROUTE = (query) => `${API_BASE_URL}${appConfig.endpoints.movie.search(query)}`;
export const MOVIE_BY_SLUG_API_ROUTE = (slug) => `${API_BASE_URL}${appConfig.endpoints.movie.bySlug(slug)}`;
export const MOVIE_COMING_SOON_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.movie.comingSoon}`;
export const MOVIE_IN_THEATERS_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.movie.inTheaters}`;
export const MOVIE_BY_HALL_API_ROUTE = (hallName) => `${API_BASE_URL}${appConfig.endpoints.movie.byHall(hallName)}`;

//Showtime Endpoints 
export const GET_UPCOMING_SHOWTIMES_API_ROUTE = (movieId) => `${API_BASE_URL}${appConfig.endpoints.showtime.upcoming(movieId)}`;
export const GET_SHOWTIME_BY_ID_API_ROUTE = (showtimeId) => `${API_BASE_URL}${appConfig.endpoints.showtime.getById(showtimeId)}`;

//Seat Endpoints
export const GET_OCCUPIED_SEATS_API_ROUTE = (showtimeId) => `${API_BASE_URL}${appConfig.endpoints.seat.occupied(showtimeId)}`;

// User endpoints
export const LOGIN_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.login}`;
export const REGISTER_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.register}`;
export const FORGOT_PASSWORD_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.forgotPassword}`;
export const RESET_PASSWORD_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.resetPassword}`;
export const VALIDATE_RESET_CODE_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.validateResetCode}`;
export const GET_CURRENT_USER_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.getCurrentUser}`;
export const USER_SEARCH_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.search}`;
export const USER_CREATE_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.create}`;
export const USER_UPDATE_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.update}`;
export const USER_DELETE_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.user.delete}`;
export const USER_GET_BY_ID_API_ROUTE = (id) => `${API_BASE_URL}${appConfig.endpoints.user.getById(id)}`;

// Ticket endpoints
export const CURRENT_TICKETS_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.ticket.currentTickets}`;
export const PASSED_TICKETS_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.ticket.passedTickets}`;
export const RESERVE_TICKET_API_ROUTE = (movieId) => `${API_BASE_URL}${appConfig.endpoints.ticket.reserve(movieId)}`;
export const PURCHASE_TICKET_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.ticket.purchase}`;

// Favorites endpoints
export const USER_FAVORITES_API_ROUTE = `${API_BASE_URL}${appConfig.endpoints.favorites.userFavorites}`;