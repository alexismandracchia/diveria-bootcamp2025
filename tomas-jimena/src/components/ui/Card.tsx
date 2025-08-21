import { Item } from "@/types/app.types";

export default function Card({ product }: { product: Item }) {
  return (
    <div key={product.id} className="border border-gray-600 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-gray-300 hover:shadow-xl transition-all duration-300 ">
      <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-4" />
      <h2 className="text-lg text-center">{product.title}</h2>
      <p className="text-gray-200 font-bold mt-2 text-center">${product.price}</p>
    </div>
  );
}
