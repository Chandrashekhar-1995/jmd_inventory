import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import { toast } from "react-toastify";

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
    <div className="w-full mt-8 px-4">
      <div className="flex items-center justify-between mb-2">
        <p>Search</p>
        <h1 className="">List Inventory</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Item code</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Unit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{product.itemCode}</td>
                    <td className="py-2 px-4 border">{product.productName}</td>
                    <td className="py-2 px-4 border">{product.salePrice}</td>
                    <td className="py-2 px-4 border">{product.stockQuantity}</td>
                    <td className="py-2 px-4 border">{product.unit}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default Dashboard;