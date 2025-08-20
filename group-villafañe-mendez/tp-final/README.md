# TP FINAL – Proyecto Next.js + Tailwind CSS + Flowbite

## Descripción

Este proyecto avanzado los desafiará a construir una Single-Page Application (SPA) robusta y 
escalable, aplicando patrones de desarrollo y herramientas que se utilizan en entornos 
profesionales. Crear una aplicación web utilizando React que permita aplicar y consolidad los 
conceptos vistos. 

- **Next.js** como framework de React para SSR y SSG.  
- **Tailwind CSS** para estilos modernos y responsivos.  
- **Flowbite** para componentes UI listos (botones, cards, modales, etc.).  
- **Axios** para realizar peticiones HTTP de forma sencilla y eficiente.  
- **Google Fonts Roboto** como tipografía principal.  
- **TypeScript** para tipado estático y mayor seguridad de código.  

El proyecto está estructurado siguiendo buenas prácticas de Next.js con **App Router** y `src/` para organizar el código.

🔗 Recursos útiles

[Documentación Next.js](https://nextjs.org/docs)

[Documentación Tailwind CSS](https://tailwindcss.com/docs)

[Documentación Flowbite](https://flowbite.com/docs/getting-started/quickstart/)

[Axios GitHub](https://axios-http.com/docs/intro)

---

## Requisitos

- **Node.js** v18 o superior  
- **npm** v9 o superior

---

## Estructura de projecto

tp-final/
├─ node_modules/
├─ public/              # Archivos estáticos (imágenes, SVGs)
├─ src/
│  ├─ app/
│  │  ├─ page.tsx       # Página principal
│  │  └─ layout.tsx     # Layout principal
│  ├─ components/       # Componentes reutilizables
│  └─ styles/
│     └─ globals.css    # CSS global con Tailwind
├─ package.json
├─ tailwind.config.js
├─ postcss.config.mjs
├─ tsconfig.json
└─ README.md

---

## Instalación

1. Instalar dependencias:

npm install

---

## Scripts disponibles

npm run dev       # Inicia el servidor de desarrollo en http://localhost:3000
npm run build     # Genera la versión de producción
npm run start     # Inicia la app en producción
