import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsByTitle, getProductsByCategory } from "../ApiServices";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";

type Product = {
  id: number;
  title: string;
  price: number;
  images?: string[];
};

function Products() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    setLoading(true);
    const fetchProducts = async () => {
    try {
      let data = await getProductsByTitle(search);

      if (!data || data.length === 0) {
        data = await getProductsByCategory(search);
      }

      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
  }, [search]);

  if (loading) return <Loading />;

  return (
    <>
      {products.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <p className="col-span-full text-white">No se encontraron productos :(</p>
          <button onClick={() => window.history.back()} className="cursor-pointer rounded-[8px] bg-neutral-300 px-4 py-2 text-sm text-neutral-950 transition-colors hover:bg-neutral-200 active:bg-neutral-50">
              Volver
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Card key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
