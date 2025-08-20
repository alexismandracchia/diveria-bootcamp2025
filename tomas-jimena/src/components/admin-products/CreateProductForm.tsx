import { useAppState } from "@/hooks/useAppState";
import { Item } from "@/types/app.types";

export default function CreateProductForm() {
    const { addItem } = useAppState();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newItem: Item = {
            id: Date.now(),
            title: formData.get("name") as string,
            price: Number(formData.get("price")),
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            image: undefined
        };
        addItem(newItem);
        e.currentTarget.reset();
    };

    return(
        <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg rounded-tl-none p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">Nuevo producto</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-300">Nombre:</label>
                    <input className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none" type="text" id="name" name="name" required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="mb-1 text-sm font-medium text-gray-300">Precio:</label>
                    <input className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none" type="number" id="price" name="price" required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-300">Descripción:</label>
                    <textarea className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none" id="description" name="description" required></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="mb-1 text-sm font-medium text-gray-300">Categoría:</label>
                    <input className="border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none" type="text" id="category" name="category" required />
                </div>
                <button type="submit" className="cursor-pointer bg-blue-500 text-white rounded py-2 hover:bg-blue-600">Crear</button>
            </form>
        </div>
    );
}