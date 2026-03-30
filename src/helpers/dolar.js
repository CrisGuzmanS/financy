export const dolar = async () => {
    const response = await fetch('http://127.0.0.1:3000/dolar')
    return await response.text()
}