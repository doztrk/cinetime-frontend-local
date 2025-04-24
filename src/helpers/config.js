export const appConfig = {
  project: {
    name: "CineTime",
    slogan: "Your Ultimate Movie Experience",
    description:
      "CineTime is your go-to platform for discovering the latest movies, showtimes, and exclusive cinema content. Enjoy seamless ticket booking, personalized recommendations, and a world of entertainment at your fingertips.",
  },
  apiURL: "http://localhost:8080/api",

  endpoints: {
    cinema: {
      list: "/cinemas",
      details: (id) => `/cinemas/${id}`,
      halls: (cinemaId) => `/cinemas/${cinemaId}/halls`,
    },
  },
  movie: {
    list: "/movies",
    create: "/movies",
    showtimes: (movieId) => `/movies/${movieId}/show-times`,
    bySlug: (slug) => `/movies/${slug}`,
    comingSoon: "/movies/coming-soon",
    byHall: (hallName) => `/movies/hall/${hallName}`,
    inTheaters: "/movies/in-theaters",
  },
  user: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    validateResetCode: "/validate-reset-password-code",
    search: "/users/admin",
    create: "/users/auth",
    update: "/users/auth",
    delete: "/users/auth",
  },
  favorites: {
    userFavorites: "/favorites/auth",
  },
  hall: {
    specialHalls: "/halls/special-halls",
  },
};
