import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../ApiServices";
import { Loading } from "../components/Loading";

type ProductDetail = {
  id: number;
  title: string;
  price: number;
  images?: string[];
  description?: string;
};

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;

  return (
    <>
      {product ? (
        <div className="max-w-5xl mx-auto flex flex-col bg-white shadow-lg rounded-lg overflow-hidden m-6">
          <div>
            <div className="relative overflow-hidden">
              <img src={product.images?.[currentImage]} alt={product.title} className="w-full h-80 lg:h-[500px] object-cover transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {product.images?.length}
              </div>

              {product.images && product.images.length > 1 && (
                <>
                  <button onClick={() =>
                      setCurrentImage((prev) =>
                        prev === 0 ? product.images!.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={() =>
                      setCurrentImage((prev) =>
                        prev === product.images!.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl text-black font-semibold mb-3">{product.title}</h1>
              <p className="text-xl font-bold text-black mb-4 sm:text-4xl">${product.price} </p>
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 mt-5"> Características principales:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    Garantía de 2 años
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    Envío gratuito
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    Devolución sin costo
                  </li>
                </ul>
              </div>
            </div>
            <button onClick={() => window.history.back()} className="self-end cursor-pointer rounded-[8px] bg-neutral-300 px-4 py-2 text-sm text-neutral-950 transition-colors hover:bg-neutral-200 active:bg-neutral-50">
              Volver
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No se encontró el producto.
        </p>
      )}
    </>
  );
}

export default ProductDetail;
