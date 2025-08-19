import React, { useState } from 'react';

function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;
    if (/^\d+$/.test(query)) {
    const id = parseInt(query, 10);
    window.location.href = `/items/${id}`;
  } else {
    window.location.href = `/items?search=${query}`;
  }
    
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4'> Bienvenido!</h1>
      <h2 className='text-2xl font-bold mb-4 text-center'>Encontrá el producto que buscas...</h2>
      <form onSubmit={handleSearch} className="flex w-full max-w-md">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar productos..." className="flex-1 border border-white/50 rounded-l-md p-2 outline-none" required />
        <button type="submit" className="flex items-center space-x-2 border border-white/50 border-l-0 text-white px-4 py-2 cursor-pointer rounded-r-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Home