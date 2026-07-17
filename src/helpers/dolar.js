import { API_BASE_URL } from '../config/api.js';

export const dolar = async () => {
    const response = await fetch(API_BASE_URL + '/api/dolar')
    return await response.text()
}