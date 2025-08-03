import type { Product } from "../types";
import { ApiRequest } from "./requestTemplate";

export const GetProducts = async () => {
  try {
    return await ApiRequest<Product[]>("/productTypes");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetProductById = async (id: string) => {
  try {
    return await ApiRequest<Product>(`/productTypes/${id}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const CreateProduct = async (product: Omit<Product, "id" | "createdAt">) => {
  try {
    return await ApiRequest<void>("/productTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const EditProduct = async (id: string, product: Partial<Omit<Product, "id">>) => {
  try {
    return await ApiRequest<void>(`/productTypes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    return await ApiRequest<void>(`/productTypes/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
