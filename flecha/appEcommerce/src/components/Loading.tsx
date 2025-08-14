export function Loading(){
  return(
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 w-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-black mb-4"></div>
      <p className="text-gray-600 text-lg">Cargando...</p>
    </div>
  )
}