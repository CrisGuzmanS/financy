import { Stock } from "./entities/Stock.js"
import { API_BASE_URL } from "../config/api.js"

export const stock = async (ticker) => {
    let response = await fetch(API_BASE_URL + '/api/stocks/' + ticker)
    response = await response.json()
    return new Stock(response.body)
}