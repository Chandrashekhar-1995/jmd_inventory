import React, { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState({
    user:"",
    orderNumber:"",
    approvedData:"",
    requisitionSteps:"",
    date:"",
    dueDate:"",
    placeOfSupply:"",
    customerId:"",
    customerName:"Cash",
    mobileNumber:"",
    address:"",
    items:[],
    totalAmount:"",
    advanceAmount:"",
    paymentMode:"Cash",
    dueAmount:"",
    privateNote:"",
    customerNot:"",
    deliveryTerm:"",
    supplier:"",
    orderBy:"",
  });

    useEffect(() => {
        if (!approvedData?.reqBy) {
         navigate("/store-requisition");
        } else {
          setFormData((prev) => ({ ...prev, items:[...cartItems], approvedData: approvedData, requisitionSteps: requisitionSteps, }));
        }

        if (error) {
        toast.error(error?.data?.message);
        }

        if (isSuccess) {
        navigate("/my-orders-list");
        }

        }, [approvedData.reqBy, isSuccess]);
    
    // fetch last order
    useEffect( ()=>{
      const fetchLastOrder = async () => {
        const res = await lastOrder().unwrap();
        if(res.message === "No order found"){
          setFormData((prev) => ({ ...prev, orderNumber: "ORD-0001" }));
        };
        if(res.data){
          const lastOrderNumber = res.data?.lastOrder?.orderNumber;
          const match = lastOrderNumber?.match(/^([A-Za-z-]+)(\d+)$/);
          if (match){
            const prefix = match[1];
            const numericPart = match[2];
            const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(numericPart.length, '0');
            const nextOrderNumber = `${prefix}${nextNumber}`;
            setFormData((prev) => ({ ...prev, orderNumber: nextOrderNumber }));           
          } else {
            console.error('Invalid order number format');
          }
        }
      };
      fetchLastOrder()
    },[])

    // date set today
    useEffect(() => {
      const todayObj = new Date();
      const today = new Date().toISOString().split("T")[0];
      // 2 din aage ka date nikalne ke liye
      const dueDateObj = new Date();
      dueDateObj.setDate(dueDateObj.getDate() + 2);
      const dueDate = dueDateObj.toISOString().split("T")[0];
            setFormData((prev) => ({ ...prev, date: today, dueDate: dueDate, paymentDate: today }));
    }, []);

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
      toast.success("removed Item Succesfuly !");
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === "salePrice" && !/^\d*\.?\d*$/.test(value)) {
        return;
      }
  
      if(name==="billTo" && value==="Cash"){
        setFormData((prev) => ({ ...prev, customerName: "Cash", address:"", mobileNumber:"" }));
      }
  
      if(name==="billTo" && value==="Customer"){
        setFormData((prev) => ({ ...prev, customerName: "", address:"", mobileNumber:"" }));
      }
  
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const handlPlaceOrder = async () => {
    try {  
      // const payload = {
      //   items: await Promise.all(
      //     cartItems.map(async (item) => {
      //       if (!item.supplier) {
      //         const product = await getProducts(item._id);
      //         item = { ...item, supplier: product.supplier };
      //       }

      //       return {
      //         product: item._id,
      //         name: item.productName,
      //         code: item.itemCode,
      //         unit: item.unit,
      //         qty: item.qty,
      //         category: item.category,
      //         price: item.salePrice,
      //         stock: item.stockQuantity,
      //       };
      //     })
      //   ),
      //   approvedData: approvedData,
      //   requisitionSteps: requisitionSteps,
      // };
      // await createOrder(orderData).unwrap();
      console.log("FormDate: ", formData);
      
      const { res } = await createOrder(formData).unwrap();
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
          <form className="min-w-full  bg-gray-600 border border-gray-200 text-slate-100 mb-4" >
            <div className="grid grid-cols-2 gap-2">
              {/* order no */}
              <div>
                <label className="mr-4">Order No. - </label>
                <input 
                  type="text" 
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  placeholder="Order No."
                  className="bg-gray-600 border-gray-200 text-slate-100 border"/>
              </div>
              {/* order date */}
              <div>
                <label className="mr-4">Order Date - </label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-gray-600 border-gray-200 text-slate-100 border"/>
              </div>
              {/* customer */}
              <div>
                <label className="mr-4">Customer - </label>
                <input 
                  type="text" 
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="customerName"
                  className="bg-gray-600 border-gray-200 text-slate-100 border"/>
              </div>       
              {/* expect delivery date */}
              <div>
                <label className="mr-4">Delivery Date - </label>
                <input 
                  type="date" 
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  placeholder="Order No."
                  className="bg-gray-600 border-gray-200 text-slate-100 border"/>
              </div>
            </div>
            
          </form>
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
                        <td className="py-2 px-4 border-b">{item?.quantity}</td>
                        <td className="py-2 px-4 border-b">{item?.salePrice}</td>
                        <td className="py-2 px-4 border-b">{item?.quantity * item?.salePrice}</td>
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
              onClick={handlPlaceOrder}
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