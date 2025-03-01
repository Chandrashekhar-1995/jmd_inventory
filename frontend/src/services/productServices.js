import axios from "axios";
import { BASE_URL, CATEGORY_URL, PRODUCTS_URL } from "../store/constants";

export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData);

  return response.data;
};

//fetch a single service
export const getProductService = async (id) => {
  const response = await axios.get(`${BASE_URL}${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data.data;
};

// Service to update a product
export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};
export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data;
};