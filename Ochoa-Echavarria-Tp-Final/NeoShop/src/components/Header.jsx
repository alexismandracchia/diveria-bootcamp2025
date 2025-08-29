import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const { isAuthenticated, user, logoutUser } = useApp()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const onLogout = () => {
    logoutUser()
    navigate('/', { replace: true })
    setIsMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  // Cerrar dropdown al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          NeoShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

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
                {/* Avatar y dropdown del usuario */}
                <div className="position-relative" ref={dropdownRef}>
                  <button
                    className="btn p-0 d-flex align-items-center text-decoration-none"
                    onClick={toggleProfileDropdown}
                    aria-expanded={isProfileDropdownOpen}
                  >
                    <div className="d-flex align-items-center text-white">
                      <div className="avatar-container me-2">
                        <img
                          src={user?.avatar || 'https://ui-avatars.com/api/?name=Usuario&background=random'}
                          alt="Avatar"
                          className="avatar-img rounded-circle"
                          onError={(e) => {
                            e.target.src = 'https://ui-avatars.com/api/?name=Usuario&background=random'
                          }}
                        />
                      </div>
                      <span className="small d-none d-lg-block">Hola, {user?.name || 'Usuario'}</span>
                      <i className="bi bi-chevron-down small ms-1 d-none d-lg-block "></i>
                    </div>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="dropdown-menu show p-4 end-0 mt-2">
                      <div className="dropdown-header text-center">
                        <div className="avatar-dropdown mb-2 mx-auto">
                          <img
                            src={user?.avatar || 'https://ui-avatars.com/api/?name=Usuario&background=random'}
                            alt="Avatar"
                            className="avatar-img-lg rounded-circle"
                            onError={(e) => {
                              e.target.src = 'https://ui-avatars.com/api/?name=Usuario&background=random'
                            }}
                          />
                        </div>
                        <h6 className="mb-0">{user?.name || 'Usuario'}</h6>
                        <small className="text-muted">{user?.email || ''}</small>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link 
                        className="dropdown-item" 
                        to="/profile"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          closeMenu()
                        }}
                      >
                        <i className="bi bi-person me-2"></i>Ver perfil
                      </Link>
                      <Link 
                        className="dropdown-item" 
                        to="/edit-profile"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          closeMenu()
                        }}
                      >
                        <i className="bi bi-pencil me-2"></i>Editar perfil
                      </Link>
                      <Link 
                        className="dropdown-item" 
                        to="/settings"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          closeMenu()
                        }}
                      >
                        <i className="bi bi-gear me-2"></i>Configuraciones
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item text-danger"
                        onClick={onLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
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