export const appConfig = {
  project: {
    name: "CineTime",
    slogan: "Your Ultimate Movie Experience",
    description:
      "CineTime is your go-to platform for discovering the latest movies, showtimes, and exclusive cinema content. Enjoy seamless ticket booking, personalized recommendations, and a world of entertainment at your fingertips.",
  },
  apiURL: "https://cinetime-api.com",
  userRightsOnRoutes: [
    {
      urlRegex: /\/dashboard$/,
      roles: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
    },
    { urlRegex: /\/dashboard\/admin$/, roles: ["ADMIN"] },
    { urlRegex: /\/dashboard\/admin\/new$/, roles: ["ADMIN"] },
    { urlRegex: /\/dashboard\/manager$/, roles: ["ADMIN"] },
    { urlRegex: /\/dashboard\/manager\/new$/, roles: ["ADMIN"] },
    { urlRegex: /\/dashboard\/manager\/\d+$/, roles: ["ADMIN"] },
    {
      urlRegex: /\/dashboard\/assistant-manager$/,
      roles: ["ADMIN", "MANAGER"],
    },
    {
      urlRegex: /\/dashboard\/assistant-manager\/new$/,
      roles: ["ADMIN", "MANAGER"],
    },
    {
      urlRegex: /\/dashboard\/assistant-manager\/\d+$/,
      roles: ["ADMIN", "MANAGER"],
    },
    {
      urlRegex: /\/dashboard\/teacher$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/teacher\/new$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/teacher\/\d+$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/lesson$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/lesson\/new$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/education-term$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/education-term\/new$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/program$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/program\/new$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/student$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/student\/new$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
      urlRegex: /\/dashboard\/student\/\d+$/,
      roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    { urlRegex: /\/dashboard\/student-info$/, roles: ["TEACHER"] },
    { urlRegex: /\/dashboard\/student-info\/new$/, roles: ["TEACHER"] },
    { urlRegex: /\/dashboard\/student-info\/\d+$/, roles: ["TEACHER"] },
    { urlRegex: /\/dashboard\/meet$/, roles: ["TEACHER"] },
    { urlRegex: /\/dashboard\/meet\/new$/, roles: ["TEACHER"] },
    { urlRegex: /\/dashboard\/meet\/\d+$/, roles: ["TEACHER"] },
    {
      urlRegex: /\/dashboard\/contact-message$/,
      roles: ["ADMIN", "MANAGER", "ASSISTANTMANAGER"],
    },
    { urlRegex: /\/dashboard\/choose-lesson$/, roles: ["STUDENT"] },
    { urlRegex: /\/dashboard\/grades-meets$/, roles: ["STUDENT"] },
  ],
};
