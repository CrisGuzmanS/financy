import { Stock } from "./entities/Stock.js"

export const stock = async (ticker) => {
    let response = await fetch('http://127.0.0.1:3000/stocks/' + ticker)
    response = await response.json()
    return new Stock(response.body)
}