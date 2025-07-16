import axios from "axios"

const BASE_URL = import.meta.env.MODE === 'developmet' ? 'http://localhost:7676' : '/'

export default axios.create({
    baseURL: BASE_URL
})