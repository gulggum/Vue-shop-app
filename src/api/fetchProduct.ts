const FAKER_URL = "https://fakestoreapi.com/products";
export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(FAKER_URL);
    const products = await res.json();
    console.log(products);
    return products;
  } catch (error) {
    throw new Error("상품 데이터를 불러올 수 없습니다.");
  }
};
