// We import axios, a library that content several fetch.
import axios from 'axios';

const API = 'http://localhost:4000/api'

// Function that requires a user as parameter and make a post request to the url of the database.
export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = (user) => axios.post(`${API}/login`, user);