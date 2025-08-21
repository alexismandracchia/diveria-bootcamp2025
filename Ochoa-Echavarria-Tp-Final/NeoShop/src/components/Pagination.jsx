export default function Pagination({ total, page, limit, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const go = (p) => onChange(Math.min(totalPages, Math.max(1, p)))

  // Ventana simple de páginas
  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li className= {`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => go(page - 1)}>Anterior</button>
        </li>
        {pages.map(p => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => go(p)}>{p}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => go(page + 1)}>Siguiente</button>
        </li>
      </ul>
    </nav>
  )
}
