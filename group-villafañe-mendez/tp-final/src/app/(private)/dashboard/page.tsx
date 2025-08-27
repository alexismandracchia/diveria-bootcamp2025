"use client";
import { ShadowButton } from "@/components/buttons/Buttons";
import TableProducts from "@/components/table/TableProducts";
import { useProducts } from "@/app/(private)/dashboard/useProducts";
import { FaPlus } from "react-icons/fa6";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import FullScreenError from "@/components/error/FullScreenErrors";
import { useRouter } from "next/navigation";


const page = () => {
  const {
    products,
    total,
    pageNumber,
    pageSize,
    loading,
    error,
    setPageNumber,
  } = useProducts();

  const router = useRouter();
  if (loading) return <FullScreenLoader message="Loading Products..." />;
  if (error)
    return (
      <FullScreenError
        message={`Error fetching products: ${error.message}`}
        onRetry={() => router.refresh()}
      />
    );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-5">
      <div className="flex justify-between items-center py-0 mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ShadowButton
          className="p-2"
          colorFrom="from-green-500"
          colorVia="via-green-600"
          colorTo="to-green-700"
          focusColor="focus:ring-green-300"
          darkFocusColor="dark:focus:ring-green-800"
          shadowColor="shadow-green-500/50"
          darkShadowColor="dark:shadow-green-800/80"
        >
          <FaPlus />
          Add Product
        </ShadowButton>
      </div>
      <TableProducts
        products={products}
        total={total}
        page={pageNumber}
        pageSize={pageSize}
        onPageChange={setPageNumber}
      />
    </div>
  );
};

export default page;
