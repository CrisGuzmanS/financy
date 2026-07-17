import { unformat } from "./unformat"
import colors from "./colors"

class SP500 {
    constructor(data) {
        this.data = data
    }

    get drawdown() {
        return this.data.drawdown
    }

    get color() {

        const drawdown = unformat(this.data.drawdown)

        return {
            background: drawdown < 0.03 ? colors.background.red : drawdown < 0.05 ? colors.background.orange : drawdown < 0.1 ? colors.background.yellow : colors.background.green,
            text: drawdown < 0.03 ? colors.text.red : drawdown < 0.05 ? colors.text.orange : drawdown < 0.1 ? colors.text.yellow : colors.text.green,
            border: drawdown < 0.03 ? colors.border.red : drawdown < 0.05 ? colors.border.orange : drawdown < 0.1 ? colors.border.yellow : colors.border.green
        }
    }
}

export const sp500 = async () => {
    let response = await fetch('http://'+window.location.hostname+':' + import.meta.env.VITE_API_PORT+'/api/stocks/^GSPC')
    response = await response.json()
    return new SP500(response.body)
}