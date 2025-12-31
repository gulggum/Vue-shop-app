import type { TopCategory } from "../api/fetchProduct";

//카테고리 정규화
export const normalizeCategory = (category: string): TopCategory => {
  if (category.includes("clothing")) return "clothing";
  if (category === "electronics") return "electronics";
  return "jewelery";
};

//카테고리 한글화 맵핑
export const CATEGORY_KR: Record<TopCategory, string> = {
  clothing: "패션",
  electronics: "디지털",
  jewelery: "악세서리",
};
