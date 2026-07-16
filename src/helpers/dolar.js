export const dolar = async () => {
    const response = await fetch('http://'+window.location.hostname+':3000'+'/dolar')
    return await response.text()
}