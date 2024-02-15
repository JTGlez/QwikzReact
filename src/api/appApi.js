/* eslint-disable no-unused-vars */
import axios from 'axios'
import { getEnvironments } from '../helpers'

const { VITE_API_URL, VITE_API_URL_TEST } = getEnvironments();

const appApi = axios.create({
    baseURL: VITE_API_URL_TEST
})

// Add a request interceptor

export default appApi;