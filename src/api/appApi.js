/* eslint-disable no-unused-vars */
import axios from 'axios'
import { getEnvironments } from '../helpers'

const { VITE_API_URL, VITE_API_URL_TEST } = getEnvironments();

console.log(VITE_API_URL)

const appApi = axios.create({
    baseURL: VITE_API_URL
})

// Add a request interceptor

export default appApi;