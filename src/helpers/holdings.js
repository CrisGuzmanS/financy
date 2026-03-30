import { HoldingCollection } from "../holdings/HoldingCollection"

export const holdings = async () => {
    const response = await fetch('http://127.0.0.1:3000/holdings')
    return new HoldingCollection(await response.json())
}