// We import axios, a library that content several fetch.
import axios from './axios';

// Function that requires a user as parameter and make a post request to the url of the database.
// The main API is in "./axios.js" (http://localhost:4000/api).
export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);