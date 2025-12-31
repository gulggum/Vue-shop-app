const FAKER_URL = "https://fakestoreapi.com/products";

export type TopCategory = "clothing" | "electronics" | "jewelery";

export interface Product {
  category: string;
  title: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  topCategory: TopCategory;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(FAKER_URL);
  if (!res.ok) throw new Error("상품 데이터를 불러올 수 없습니다");
  const products = await res.json();
  return products;
};

export const fetchDetailProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${FAKER_URL}/${id}`);
  if (!res.ok) throw new Error("상품의 정보를 불러올 수 없습니다.");
  const product = await res.json();
  return product;
};
