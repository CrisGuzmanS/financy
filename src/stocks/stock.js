import { Stock } from "./entities/Stock.js"

export const stock = async (ticker) => {
    let response = await fetch('http://'+window.location.hostname+':3000'+'/stocks/' + ticker)
    response = await response.json()
    return new Stock(response.body)
}