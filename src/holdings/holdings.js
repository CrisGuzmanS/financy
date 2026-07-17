import { dolar } from "../helpers/dolar"
import { Format } from "../helpers/Format"
import { Money } from "../helpers/Money"
import { unformat } from "../helpers/unformat"
import { stock } from "../stocks/stock"
import { HoldingCollection } from "./HoldingCollection"

export const holdings = async () => {
    let response = await fetch(  window.location.protocol + '//'+window.location.hostname+':' + import.meta.env.VITE_API_PORT+'/api/holdings')
    response = await response.json()

    // Se les asigna el holding profit
    for (let holding of response.body) {
        const theStock = await stock(holding.ticker)


        if (holding.ticker.includes("MX")) {
            holding.profit = theStock.price
        } else {
            holding.profit = Money.multiply(theStock.price, await dolar())
        }
        
        holding.profit = Money.substract(holding.profit, holding.cost.average)
        holding.profit = unformat(holding.profit) / unformat(holding.cost.average)
        holding.profit = Format.percentage(holding.profit)
    }

    return new HoldingCollection(response.body)
}