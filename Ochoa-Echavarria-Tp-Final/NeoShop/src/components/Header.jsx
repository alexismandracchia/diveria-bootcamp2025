import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Header() {
  const { isAuthenticated, user, logoutUser } = useApp()
  const navigate = useNavigate()

  const onLogout = () => {
    logoutUser()
    navigate('/', { replace: true })
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container align-items-center">
        <Link className="navbar-brand fw-bold text-light" to="/">NeoShop</Link>

        {isAuthenticated ? (
          <>
            <ul className="navbar-nav me-auto mb-lg-0 d-flex flex-row">
              <li className="nav-item me-2">
                <NavLink className="nav-link text-light" to="/">Productos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/create">Crear</NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <span className="text-secondary small text-light">Hola, {user?.name || 'Usuario'}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
          </div>
        )}
      </div>
    </nav>
  )
}