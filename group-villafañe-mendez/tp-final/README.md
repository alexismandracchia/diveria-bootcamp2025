# TP FINAL – Proyecto E-commerce con Next.js + Tailwind CSS + Flowbite

## Descripción

Este proyecto es una **Single-Page Application (SPA)** de e-commerce construida con **Next.js**, **TypeScript** y **Tailwind CSS**, diseñada para practicar y aplicar patrones de desarrollo profesional.

Incluye:

- Páginas de **login** y **dashboard** privadas
- Gestión de productos con **CRUD**
- Visualización de detalles de productos
- **Dark mode** compatible
- Componentes **reutilizables y modulares**

El proyecto sigue buenas prácticas de Next.js con **App Router** y la estructura `src/` para mantener el código organizado.

---

## Tecnologías y herramientas

- **Next.js 15** – SSR, SSG y App Router
- **React 19** – Librería principal de UI
- **Tailwind CSS 4** – Estilos responsivos y modernos
- **Flowbite y Flowbite React** – Componentes UI listos
- **Axios** – Peticiones HTTP
- **TypeScript 5** – Tipado estático
- **React Icons** – Íconos vectoriales
- **Google Fonts** – Roboto

---

## Instalación

npm install


## Ejecucion
(La aplicación se ejecutará en http://localhost:3000.)

| Script          | Descripción                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción  |
| `npm run start` | Inicia la app en producción      |


## Credenciales de prueba

Usuario: test@test.com

Contraseña: Test1234!

Estas credenciales permiten acceder a las rutas privadas como el dashboard y la gestión de productos.


## Estructura de carpetas

src/
├─ api/
│  └─ AxiosInstance.tsx          # Configuración de Axios
├─ app/
│  ├─ (auth)/login/             # Login
│  │  ├─ components/            # FormLogin, ParallaxBackground
│  │  ├─ page.tsx
│  │  └─ layout.tsx
│  ├─ (private)/dashboard/      # Dashboard protegido
│  │  ├─ components/            # ProductContext, ProductManagement
│  │  ├─ page.tsx
│  │  ├─ useProducts.ts
│  │  └─ useProductsActions.ts
│  ├─ products/[id]/            # Detalle de producto
│  │  ├─ page.tsx
│  │  └─ layout.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ not-found.tsx
├─ components/
│  ├─ badges/                   # Badge reusable
│  ├─ buttons/                  # GradientButton, Links
│  ├─ error/                    # FullScreenErrors
│  ├─ inputs/                   # Inputs reutilizables
│  ├─ loaders/                  # FullScreenLoader
│  ├─ modal/                    # ProductFormModal, DeleteProductModal
│  ├─ navbar/                   # DesktopNav, MobileNav, NavBar
│  ├─ pagination/               # Pagination
│  ├─ sections/                 # HeroSection, AboutSection
│  ├─ table/                    # ProductTableRow, TableProducts
│  └─ toasts/                   # Toasts
├─ context/                      # AuthProvider, ToastContext
├─ hooks/                        # useParallax, useRouteGuard, useScroll
├─ lib/                          # Validators, utils comunes
└─ services/                     # BaseService, ProductServices


## Descripción de componentes clave

- **HeroSection / AboutSection:**  
  Componentes de la página principal, responsive y estilizados.

- **ProductTableRow / TableProducts:**  
  Tabla para gestión de productos.

- **ProductDetailPage:**  
  Detalle de producto con imágenes, stock y precios.

- **ShadowButton / GradientButton / Links:**  
  Botones reutilizables con estilos y efectos.

- **FullScreenLoader / FullScreenError:**  
  Indicadores de carga y manejo de errores.

- **Modal Components:**  
  Formulario de producto y confirmación de eliminación.

- **Navbar Components:**  
  Menú responsive con control de links según autenticación.


## Recursos útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Flowbite Docs](https://flowbite.com/docs/)
- [Axios Docs](https://axios-http.com/docs/intro)

