export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  slug: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: ICategory;
}

export interface IProductCardProps {
  product: IProduct;
}

export interface ProductListProps {
  products: IProduct[];
  isLoading: boolean; 
}
