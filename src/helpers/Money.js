import { Format } from "./Format"
import { unformat } from "./unformat"

export class Money{
    static multiply(firstValue, secondValue){
        firstValue = unformat(firstValue)
        secondValue = unformat(secondValue)
        return Format.money(firstValue * secondValue)
    }

    static substract(firstValue, secondValue){
        firstValue = unformat(firstValue)
        secondValue = unformat(secondValue)
        return Format.money(firstValue - secondValue)
    }

    static divide(firstValue, secondValue){
        firstValue = unformat(firstValue)
        secondValue = unformat(secondValue)
        return Format.money(firstValue / secondValue)
    }
}