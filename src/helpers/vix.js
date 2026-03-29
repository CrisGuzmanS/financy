export const vix = async () => {
    const response = await fetch('http://127.0.0.1:3000/vix')
    return await response.json()
}