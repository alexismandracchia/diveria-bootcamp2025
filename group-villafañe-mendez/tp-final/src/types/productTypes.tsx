export interface Product {
  id: number; 
  title: string;
  description: string;
  price: number; 
  category?: string;           /* <-- dejo "?" provisional  */
  stock: number;              /* <-- dejo "?" provisional  */
  availabilityStatus?: string; /* <-- dejo "?" provisional  */
  images?: string[];
}

export interface ProductDetail extends Product {
  discountPercentage: number;
  rating: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
}

export interface ApiPagination<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductRow {
  id: number;
  title: string;
  price: number;
  stock?: number;
  status?: string;
  thumbnail?: string;
}

export interface ProductTableRowProps {
  product: ProductRow;
  onEdit?: () => void;
  onRemove?: () => void;
}

export interface TableProductsProps {
  products: (Product | ProductRow)[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (newPage: number) => void;
  onEdit?: (product: ProductRow) => void;
  onRemove?: (product: ProductRow) => void;
}