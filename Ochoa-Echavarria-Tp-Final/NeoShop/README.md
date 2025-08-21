NeoShop - React SPA Trabajo Final

Este proyecto es una Single Page Application (SPA) hecha con React que simula una tienda online. La app incluye un login con autenticación, rutas protegidas y persistencia de sesión en el navegador. Una vez dentro, permite gestionar productos con todas las operaciones CRUD: listar con paginación y buscador, ver detalles, crear, editar y eliminar. Los datos se consumen desde la API pública DummyJSON, y toda la lógica de estado se maneja con useContext, useState y un hook personalizado. También con mi compañero hicimos validaciones, manejo de errores y estilos responsivos con Bootstrap, logrando una aplicación completa y dinámica que integra varios conceptos.

Tecnologias que usamos

React + Vite

React Router DOM v6

Context + useState + custom hook (`useAppState`)

Bootstrap

API: https://dummyjson.com/products

Requisitos que pedia el Tp

Arquitectura y Estado: Context global (`AppContext`) y hook principal (`useAppState`) que tiene estado y funciones (login, fetchItems, add/update/delete)

Autenticación: Login con persistencia en `localStorage`. Rutas protegidas con `ProtectedRoute`. Logout desde el header.

CRUD: Listar, ver detalle, crear, editar y borrar( Serian las operaciones POST/PUT/DELETE, se sincroniza el estado local para reflejar cambios).

Optimización: Paginación en listado. `React.memo` en `ProductCard` para evitar un re-renderizado innecesarios.

Estilos: Bootstrap + CSS propio (`styles.css`)

Instalación:
```bash
npm i
npm run dev

Credenciales que usamos
Email: admin@bootcamp.com
contraseña: password

Estructura del proyecto
src/context/AppContext.jsx - Context/Provider

src/hooks/useAppState.js - hook global con estado + lógica de negocio + llamadas a la API

src/components/ Header, ProductCard, Paginación, ProtectedRoute

src/pages/ - login, Products(lista + búsqueda + paginación), ProducDetail, ProductForm(Validaciones)
