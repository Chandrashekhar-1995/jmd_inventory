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
    <div className="product-list w-full  px-4">
      {categoryModal && <CategoryModal onClose={closeCategoryModal} />}
      {createProductModal && (
        <CreateProduct onClose={closeCreateProductModal} />
      )}
      <div className="">
        <div className="py-4">
          <button
            className="px-5 bg-orange-600 p-2 rounded-3xl flex flex-col"
            onClick={openCategoryHandler}
          >
            Create Category
            <span className="m-auto ">{categories?.length}</span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">List Inventory</h1>
        <button
          onClick={openCreateProductModal}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Asset
        </button>
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
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Supplier</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{product.name}</td>
                    <td className="py-2 px-4 border">{product.category}</td>
                    <td className="py-2 px-4 border">
                      ${product?.price?.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border">{product.stock}</td>
                    <td className="py-2 px-4 border">{product.supplier}</td>
                    <td>
                      <button>
                        <Link to={`/edit/${product._id}`}>Edit</Link>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <CreateProduct showModal={isModalVisible} closeModal={closeModal} /> */}
      {/* <CreateProduct showModal={showModal} closeModal={closeModal} /> */}
    </div>
  );
};

export default Dashboard;