import axios from 'axios'
import { getEnvironments } from '../helpers'

const { VITE_API_URL } = getEnvironments();

const appApi = axios.create({
    baseURL: VITE_API_URL
})

// Add a request interceptor

export default appApi;