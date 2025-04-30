import { appConfig } from "./config";

export const LOGIN_API_ROUTE = `${appConfig.apiURL}/login`;
export const LOGOUT_API_ROUTE = `${appConfig.apiURL}/logout`;
export const RESET_PASSWORD = `${appConfig.apiURL}/reset-password`;
export const ME_API_ROUTE = `${appConfig.apiURL}/me`;

export const USER_REGISTER_API_ROUTE = `${appConfig.apiURL}/register`;
export const USER_GET_ALL_BY_PAGE_API_ROUTE = `${appConfig.apiURL}/users/admin`;
export const USER_DELETE_API_ROUTE = `${appConfig.apiURL}/users/auth`;
