import { Link, Outlet } from "react-router-dom"
import { useState } from "react";

const Layout = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="backdrop-blur-xl border-b border-white/10 px-6 py-4 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <img src="/src/assets/logo.svg" alt="Logo" />
          <div className="flex items-center">
          <Link to="/">Inicio</Link>
          <button onClick={() => setShowInfo(!showInfo)} className="cursor-pointer text-white rounded-[8px] px-4 py-2 text-sm transition-colors active:text-slate-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <line x1="12" y1="10.5" x2="12" y2="16.5"/>
              <circle cx="12" cy="7.5" r="1.25" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-3 py-4 flex ">
        <Outlet />
      </main>

      {showInfo && (
        <div className="fixed right-0 top-[70px] bg-white/70 backdrop-blur-2xl flex items-center justify-center z-50 rounded-xl" onClick={() => setShowInfo(false)}>
          <div className=" text-black rounded-lg shadow-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-2">Info</h2>
            <p className="text-sm mb-4">
              Podes buscar productos por nombre (o alguna palabra en el nombre), ID o categoría.
              Por ejemplo: "black", "shirt", "18", "electronics", "clothes".
            </p>
            <p className="text-sm mb-4">
              API: <code>https://fakeapi.platzi.com/en</code>
            </p>
            <p className="text-sm mb-4">
              Tecnologías utilizadas: React, TypeScript, Tailwind CSS, React Router.
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout