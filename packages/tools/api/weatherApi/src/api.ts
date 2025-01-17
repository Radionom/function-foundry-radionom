
import axios from 'axios'

export const createApi = ({ apiKey }: { apiKey: string }) =>
    axios.create({
        baseURL: 'http://api.weatherapi.com',
    })