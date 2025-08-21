type Product = {
  id: number;
  title: string;
  price: number;
  images?: string[];
};

export function Card({ product }: { product: Product }) {
  const handleClick = () => {
    window.location.href = `/items/${product.id}`;
  };
  return (
    <div key={product.id} className="bg-gray-100 pb-2 rounded-xl shadow-lg hover:shadow-xl transition h-fit w-full max-w-sm overflow-hidden mx-auto flex flex-col">
      <img src={product.images?.[0]} alt={product.title} className="w-full h-48 object-cover flex-shrink-0"/>
      <div className="py-2 px-4 flex flex-col flex-1 justify-between">
        <h2 className="mt-2 text-lg text-black">{product.title}</h2>
        <p className="text-black font-bold mb-2">${product.price}</p>
        <button onClick={handleClick} className="self-end cursor-pointer rounded-[8px] bg-neutral-300 px-4 py-2 text-sm text-neutral-950 transition-colors hover:bg-neutral-200 active:bg-neutral-50">
          Ver detalles
        </button>
      </div>
    </div>
  );
}
