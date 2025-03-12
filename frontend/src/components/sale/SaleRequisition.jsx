import React, { useState } from "react";
import {useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import ApprovedModal from "../approvedModal";

const SaleRequisition = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  const navigate = useNavigate();
  const removeFromCartHandler = () => {};
  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };
  return (
    <div>
      <div className="product-list">
        <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
          {" "}
          <div className="">
            <h1>FACTORY REQUISITION Note</h1>
            {cartItems.length === 0 ? (
                <h4> Your Cart is Empty{" "}
                    <Link to="/dashboard" className="underline">       Go back
                    </Link>
                </h4>
            ) : (
              <div className="table w-full">
                <table className="min-w-full bg-gray-600 border border-gray-200 text-slate-100">
                  <thead>
                    <tr className="py-2 px-4 border-b">
                      <th>PRODUCT NAME</th>
                      <th className="py-2 px-4 border-b">ITEM CODE</th>
                      <th className="py-2 px-4 border-b">UNIT</th>
                      <th className="py-2 px-4 border-b">Quantity</th>
                      <th className="py-2 px-4 border-b">Price</th>
                      <th className="py-2 px-4 border-b">TOTAL</th>
                      <th className="py-2 px-4 border-b">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item) => (
                      <tr key={item._id} className="py-2 px-4 border-b">
                        <td className="py-2 px-4 border-b">{item.productName}</td>
                        <td className="py-2 px-4 border-b">{item?.itemCode ? item.itemCode : "N/A"}</td>
                        <td className="py-2 px-4 border-b">{item?.unit}</td>
                        <td className="py-2 px-4 border-b">{item?.quantity}</td>
                        <td className="py-2 px-4 border-b">{item?.salePrice}</td>
                        <td className="py-2 px-4 border-b">{item?.quantity * item?.salePrice}</td>
                        <td onClick={() => removeFromCartHandler(item._id)}>
                          <AiOutlineDelete
                            size={28}
                            className="text-red-700  "
                          />{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-end mr-4 ">
                <button
                  onClick={requisitionTypeHandler}
                  className="btn btn-primary  bg-slate-200 px-5 p-2 rounded-xl mt-3"
                >
                  {" "}
                  Continue Requisition
                </button>
              </div>
            )}

            {cartItems?.length > 0 && requisitionSteps && (
            <div className="mt-4 flex justify-end mr-6">
              <div className="">
                <button
                  onClick={() => setShowApprovedModal(true)}
                  className="btn btn-primary mt-4 px-6 bg-gray-300 text-gray-900 p-2 rounded-xl"
                >
                  CONTINUE ORDER
                </button>
              </div>
            </div>
          )}

          {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedModal={setShowApprovedModal}
            />
          )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleRequisition;