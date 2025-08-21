const API_URL = "https://api.escuelajs.co/api/v1/products"

export async function getProductById(id:string){
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export async function getProductsByTitle(query: string) {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${query}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export async function getProductsByCategory(query: string) {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categorySlug=${query}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}