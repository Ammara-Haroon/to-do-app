import { baseUrl } from "./api-config";
import { Category } from "./api-responses.interface";
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await fetch(baseUrl + "/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data;
};