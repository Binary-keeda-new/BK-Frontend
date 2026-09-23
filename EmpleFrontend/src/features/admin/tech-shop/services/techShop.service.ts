import { apiRequest } from "@/shared/utils/api";
import { Product, ProductFormData } from "../types/techShop.types";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getProducts(): Promise<Product[]> {
  const result = await apiRequest<ApiResponse<Product[]>>(
    "/api/v1/admin/tech-shop",
    {
      method: "GET",
    }
  );

  return result.data;
}

export async function createProduct(
  data: ProductFormData
): Promise<Product> {
  const result = await apiRequest<ApiResponse<Product>>(
    "/api/v1/admin/tech-shop",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

export async function updateProduct(
  id: string,
  data: ProductFormData
): Promise<Product> {
  const result = await apiRequest<ApiResponse<Product>>(
    `/api/v1/admin/tech-shop/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await apiRequest<ApiResponse<null>>(
    `/api/v1/admin/tech-shop/${id}`,
    {
      method: "DELETE",
    }
  );
}