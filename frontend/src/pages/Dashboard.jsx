import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import { toast } from "react-toastify";
import { PRODUCTS_URL } from "../store/constants";

const Dashboard = () => {
  const { products, isSuccess, isLoading, isError, message } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("products render Successfuly");
    }
  }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard