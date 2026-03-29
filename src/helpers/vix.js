class Vix {
    constructor(value) {
        this.value = value;
    }

    get color() {
        return {
            background: this.value < 20 ? 'bg-red-200' : this.value < 24 ? 'bg-orange-200' : this.value < 30 ? 'bg-yellow-200' : 'bg-green-200',
            text: this.value < 20 ? 'text-red-600' : this.value < 24 ? 'text-orange-600' : this.value < 30 ? 'text-yellow-600' : 'text-green-600'
        }
    }
}

export const vix = async () => {
    const response = await fetch('http://127.0.0.1:3000/vix')
    return new Vix(await response.json())
}