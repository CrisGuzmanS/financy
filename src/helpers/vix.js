import colors from "./colors";

class Vix {
    constructor(value) {
        this.value = value;
    }

    get color() {
        return {
            background: this.value < 20 ? colors.background.red : this.value < 24 ? colors.background.orange : this.value < 30 ? colors.background.yellow : colors.background.green,
            text: this.value < 20 ? colors.text.red : this.value < 24 ? colors.text.orange : this.value < 30 ? colors.text.yellow : colors.text.green,
            border: this.value < 20 ? colors.border.red : this.value < 24 ? colors.border.orange : this.value < 30 ? colors.border.yellow : colors.border.green
        }
    }
}

export const vix = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL+'/vix')
    return new Vix(await response.json())
}