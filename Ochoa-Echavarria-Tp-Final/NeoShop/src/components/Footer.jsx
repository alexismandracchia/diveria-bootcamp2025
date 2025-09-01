import { useApp } from '../context/AppContext';

export default function Footer() {
    const { isAuthenticated } = useApp();

    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-4 bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <p className="col-md-4 mb-0 text-white">
                        © 2025 NeoShop, Inc
                    </p>

                    <a
                        href="/"
                        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-decoration-none"
                        aria-label="NeoShop"
                    >
                        <span className="fs-4 fw-bold text-white">
                            NeoShop
                        </span>
                    </a>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item">
                            <a href="/" className="nav-link px-2 text-white">
                                Inicio
                            </a>
                        </li>
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <a href="/login" className="nav-link px-2 text-white">
                                    Login
                                </a>
                            </li>
                        )}
                        <li className="nav-item">
                            <a href="#" className="nav-link px-2 text-white">
                                Productos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link px-2 text-white">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}