import { Stock } from "./entities/Stock.js"

export const stock = async (ticker) => {
    let response = await fetch(import.meta.env.VITE_API_URL+'/stocks/' + ticker)
    response = await response.json()
    return new Stock(response.body)
}