"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { ProductService } from "@/services/ProductServices";
import axiosInstance from "@/api/AxiosInstance";
import { ShadowButton } from "@/components/buttons/Buttons";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import FullScreenError from "@/components/error/FullScreenErrors";
import { useRouter } from "next/navigation";
import { ProductDetail } from "@/types/productTypes";

const productService = new ProductService(axiosInstance);

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(Number(id));
        setProduct(response);
      } catch (err) {
        console.error(err);
        setError("Product not found");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <FullScreenError
        message="Error fetching product"
        onRetry={() => router.refresh()}
      />
    );
  }

  if (!product) {
    return <FullScreenLoader message="Loading product..." />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10 pt-20">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-gray-800 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-6 w-full">
          {product.thumbnail || (product.images && product.images.length > 0) ? (
            <div className="relative w-full h-96">
              <Image
                src={product.thumbnail || product.images![0]}
                alt={product.title}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          ) : (
            <div className="text-gray-400 dark:text-gray-500">No image available</div>
          )}

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="relative h-16 w-16 flex-shrink-0 rounded-md border overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`preview-${i}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price.toFixed(2)}
              </p>
              {product.discountPercentage > 0 && (
                <span className="text-sm font-semibold bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                {product.rating.toFixed(1)} / 5
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-medium">SKU:</span> {product.sku}
              </p>
              <p>
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              <p>
                <span className="font-medium">Dimensions:</span>{" "}
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth} cm
              </p>
              <p>
                <span className="font-medium">Weight:</span> {product.weight} kg
              </p>
              <p>
                <span className="font-medium">Warranty:</span>{" "}
                {product.warrantyInformation}
              </p>
              <p>
                <span className="font-medium">Shipping:</span>{" "}
                {product.shippingInformation}
              </p>
              <p>
                <span className="font-medium">Return Policy:</span>{" "}
                {product.returnPolicy}
              </p>
            </div>
          </div>

          <ShadowButton className="mt-6">Add to cart</ShadowButton>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-md dark:shadow-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Reviews
        </h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, i) => (
              <div
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  {review.reviewerName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span
                      key={j}
                      className={`text-sm ${
                        j < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
