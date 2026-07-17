import { Stock } from "./entities/Stock.js"

export const stock = async (ticker) => {
    let response = await fetch('http://'+window.location.hostname+':' + import.meta.env.VITE_API_PORT+'/api/stocks/' + ticker)
    response = await response.json()
    return new Stock(response.body)
}