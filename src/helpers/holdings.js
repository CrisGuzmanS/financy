import { HoldingCollection } from "../holdings/HoldingCollection"

export const holdings = async () => {
    let response = await fetch('http://127.0.0.1:3000/holdings')
    response = await response.json()
    return new HoldingCollection(response.body)
}