export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  stock: number;
  featured?: boolean;
  variants?: { name: string; values: string[] }[];
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
};
