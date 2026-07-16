export const dolar = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL+'/dolar')
    return await response.text()
}