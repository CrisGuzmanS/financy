export const dolar = async () => {
    const response = await fetch('http://' + window.location.hostname + ':' + import.meta.env.VITE_API_PORT + '/api/dolar')
    return await response.text()
}