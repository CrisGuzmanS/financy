import { unformat } from "./unformat"

class SP500 {
    constructor(data) {
        this.data = data
    }

    get drawdown() {
        return this.data.drawdown
    }

    get color() {
        return {
            background: unformat(this.data.drawdown) < 0.03 ? 'bg-red-200' : unformat(this.data.drawdown) < 0.05 ? 'bg-orange-200' : unformat(this.data.drawdown) < 0.1 ? 'bg-yellow-200' : 'bg-green-200',
            text: unformat(this.data.drawdown) < 0.03 ? 'text-red-600' : unformat(this.data.drawdown) < 0.05 ? 'text-orange-600' : unformat(this.data.drawdown) < 0.1 ? 'text-yellow-600' : 'text-green-600'
        }
    }
}

export const sp500 = async () => {
    const response = await fetch('http://127.0.0.1:3000/stocks/^GSPC')
    return new SP500(await response.json())
}