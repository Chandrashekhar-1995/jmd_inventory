import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL } from "../store/constants";

export const createProductService = async (formData) => {
};

export const getProductService = async (id) => {
};

// Service to update a product
export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData);
  return response.data;
};
export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData);
  return response.data;
};

export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data;
};