const BASE = 'https://api.escuelajs.co/api/v1';

export async function searchProducts(raw) {
  const first = (raw ?? '')
    .split(/[,\s]+/)
    .map(s => s.trim())
    .filter(Boolean)[0];

  const url = first
    ? `${BASE}/products/?title=${encodeURIComponent(first)}&offset=0&limit=50`
    : `${BASE}/products?offset=0&limit=50`;

  console.log('[GET]', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error('No se pudo obtener productos');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getProduct(id) {
  const url = `${BASE}/products/${id}`;
  console.log('[GET]', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
}
