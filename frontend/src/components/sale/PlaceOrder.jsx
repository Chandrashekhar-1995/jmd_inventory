import React, { useEffect } from "react";
import { useCreateOrderMutation, useLastOrderMutation } from "../../store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { clearCartItems } from "../../store/cartSlice";
import { getProducts } from "../../store/productSlice";
import { removeFromCart } from "../../store/cartSlice";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );
  const [lastOrder] = useLastOrderMutation();
  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
        if (!approvedData?.reqBy) {
         navigate("/store-requisition");
        }

        if (error) {
        toast.error(error?.data?.message);
        }

        if (isSuccess) {
        navigate("/my-orders-list");
        }
        }, [approvedData.reqBy, isSuccess]);
    
    useEffect( ()=>{
      const fetchLastInvoice = async () => {
        const res = await lastOrder().unwrap();
      };
    },[])

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
      toast.success("removed Item Succesfuly !");
    };

  const placeOrderHandler = async () => {
    try {  
      const payload = {
        items: await Promise.all(
          cartItems.map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier };
            }

            return {
              product: item._id,
              name: item.productName,
              code: item.itemCode,
              unit: item.unit,
              qty: item.qty,
              category: item.category,
              price: item.salePrice,
              stock: item.stockQuantity,
            };
          })
        ),
        approvedData: approvedData,
        requisitionSteps: requisitionSteps,
      };
      // await createOrder(orderData).unwrap();
      const { res } = await createOrder(payload).unwrap();
      toast.success("Order created Succesfully");
      dispatch(clearCartItems());
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="w-full mt-[-42px] ">
      <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
        {" "}
        <div className="">
          <h1 className="text-slate-200 flex justify-center pb-4">
            PLACE ORDER SCREEN
          </h1>
          <h2 className="text-slate-200 flex justify-center pb-4">Order no</h2>
          {cartItems.length === 0 ? (
            <h4>
              Your Cart is Empty{" "}
              <Link to="/dashboard" className="underline">
                Go back
              </Link>
            </h4>
          ) : (
            <div className="table w-full ">
              <table className="min-w-full  bg-gray-600 border border-gray-200 text-slate-100">
                <thead>
                    <tr className="py-2 px-4 border-b">
                      <th>PRODUCT NAME</th>
                      <th className="py-2 px-4 border-b">ITEM CODE</th>
                      <th className="py-2 px-4 border-b">UNIT</th>
                      <th className="py-2 px-4 border-b">Quantity</th>
                      <th className="py-2 px-4 border-b">Price</th>
                      <th className="py-2 px-4 border-b">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item._id} className="py-2 px-4 border-b">
                        <td className="py-2 px-4 border-b">{item.productName}</td>
                        <td className="py-2 px-4 border-b">{item?.itemCode ? item.itemCode : "N/A"}</td>
                        <td className="py-2 px-4 border-b">{item?.unit}</td>
                        <td className="py-2 px-4 border-b">{item?.qty}</td>
                        <td className="py-2 px-4 border-b">{item?.salePrice}</td>
                        <td className="py-2 px-4 border-b">{item?.qty * item?.salePrice}</td>
                        <td onClick={() => removeFromCartHandler(item._id)}>
                            <AiOutlineDelete
                                size={28}
                                className="text-red-700"
                                />{" "}
                            </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="py-3 ">
            <h3 className="mt-2 text-slate-200 text-2xl p-2">ADDITION INFO</h3>
            <div className="flex flex-col space-y-3">
              <div className="text-md font-semibold text-slate-100 uppercase  ">
                <b>REQ BY : {approvedData.reqBy} </b> <br />
                <b> APPROVED BY : {approvedData.approvedBy}</b>
                <p> REMARKS : {approvedData.comment} </p>
              </div>
            </div>
          </div>

          {/* // for button save reqyuisition */}
          <div className="flex justify-end">
            {isLoading && <Loader />}
            <button
              disabled={cartItems?.length === 0}
              onClick={placeOrderHandler}
              className="text-lg bg-orange-400 text-black p-2 px-5 mr-5 rounded-lg"
            >
              SAVE REQUISITION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;