import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState } from 'react'

export default function Header() {
  const { isAuthenticated, user, logoutUser } = useApp()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onLogout = () => {
    logoutUser()
    navigate('/', { replace: true })
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  } 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          NeoShop
        </Link>

        {/* Botón hamburguesa para mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={closeMenu}
                  >
                    Productos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/create"
                    onClick={closeMenu}
                  >
                    Crear
                  </NavLink>
                </li>
                <li className="nav-item d-lg-none">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    onClick={closeMenu}
                  >
                    Nosotros
                  </NavLink>
                </li>
              </ul>

              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0">
                <span className="text-white small">Hola, {user?.name || 'Usuario'}</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={onLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0 ms-lg-auto">
              <NavLink
                className="nav-link d-lg-none"
                to="/about"
                onClick={closeMenu}
              >
                Nosotros
              </NavLink>
              <Link
                to="/login"
                className="btn btn-outline-primary btn-sm"
                onClick={closeMenu}
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}