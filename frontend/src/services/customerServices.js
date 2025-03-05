import axios from "axios";
import { BASE_URL, CUSTOMER_URL } from "../store/constants";

export const createCustomerServices = async (formData) => {
    const response = await axios.post(`${BASE_URL}${CUSTOMER_URL}/create`, formData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};