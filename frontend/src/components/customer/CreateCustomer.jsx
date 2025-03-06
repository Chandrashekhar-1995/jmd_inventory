import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Select } from "antd";
import {createCustomer} from "../../store/customerSlice";
const { Option } = Select;

const CreateCustomer = ({showCreateCustomer, setShowCreateCustomer}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    avatar:"",
    name: "",
    address: "", 
    city:undefined,
    state: undefined, 
    pinCode:undefined,
    country:undefined,     
    email:"",
    contactNumber: undefined,
    mobileNumber: "",        
    panNo: "",               
    gstin: "",               
    gstType: "Unregistered", 
    tradeName: "",           
    accountType: "Debit",    
    openingBalance: 0,       
    documentType: "",        
    documentNo: "",          
    gender:undefined,        
    refferedBy:"",        
    dateOfBirth: undefined,
    marrigeAniversary: undefined,
    creditAllowed: "No",     
    creditLimit: 0,    
    remark: "",              
    bio:"",       
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await dispatch(createCustomer(formData)).unwrap();
      toast.success("Customer created successfully!");
    } catch (err) {
          toast.error(err);
    }
  };
  return (
      <Modal
        okType="add"
        open={showCreateCustomer}
        footer={false}
        onCancel={() => setShowCreateCustomer(false)}
      >
        <div>
          <h1> Create Customer</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Required Fields */}
          <div className="space-y-4">
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
              Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="inputForm"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
              Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="inputForm"
                placeholder="Address"
                required
              />
            </div>
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
              Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="inputForm"
                placeholder="Mobile Number"
                required
              />
            </div>
            {/* Toggle Button */}
            <div className="mb-3 mt-2">
              <button
              onClick={() => setShowMoreFields(!showMoreFields)}
              className="inputForm hover:bg-gray-300"
              >
              {showMoreFields ? "Hide Additional Fields" : "More Fields"}
              </button>
            </div>
          </div>

          {/* Optional Fields */}
          { showMoreFields && (
          <div className="space-y-4">
            {/* Address Details */}
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
              Address Details
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="City"
                required
              />

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="State"
                required
              />

              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Pin Code"
                required
              />

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Country"
                required
              />

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
               className="inputForm my-4"
                placeholder="Email"
                required
              />
            </div>

            {/* Others Details */}
            <div className="mb-3 mt-2">
                <label className="block text-sm font-medium text-gray-900 ">
                  Others Details
                </label>
                <input
                  type="text"
                  name="refferedBy"
                  value={formData.refferedBy}
                  onChange={handleChange}
                  className="inputForm my-4"
                  placeholder="Reffered By"
                  required
                />
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Gender"
                required
              />
            </div>

            {/* Tax Details */}
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
              Tax Details
              </label>
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="PAN No"
                required
              />

              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="GSTIN"
                required
              />

              <input
                type="text"
                name="gstType"
                value={formData.gstType}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="GST Type"
                required
              />

              <input
                type="text"
                name="tradeName"
                value={formData.tradeName}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Trade Name"
                required
              />
            </div>

            {/* Document Details */}
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
              Document Details
              </label>
              <input
                type="text"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Document Type"
                required
              />

              <input
                type="text"
                name="documentNo"
                value={formData.documentNo}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Document Number"
                required
              />
            </div>

            {/* Important Dates */}
            <div className="mb-3 mt-2">
              <label className="block text-sm font-medium text-gray-900 ">
                Important Dates
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Date of Birth"
                required
              />
              
              <input
                type="date"
                name="marrigeAniversary"
                value={formData.marrigeAniversary}
                onChange={handleChange}
                className="inputForm my-4"
                placeholder="Aniversary"
                required
              />
              </div>

            {/* Others Details */}
            <div className="border border-gray-300 col-span-5 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    Other Details
                </div>

                {/* Credit Allowed */}
                <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                  <label className="block text-xs font-medium mb-1">Credit Allowed</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center text-xs">
                      <input type="radio" name="creditAllowed" value="Yes" checked={formData.     creditAllowed === "Yes"} onChange={handleChange} className="mr-2" /> Yes
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="radio" name="creditAllowed" value="No" checked={formData.      creditAllowed === "No"} onChange={handleChange} className="mr-2" /> No
                    </label>
                  </div>
                </div>

                {/* Credit Limit  */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium pt-4">Credit Limit</label>
                  <input type="text" name="creditLimit" className="col-span-2 border    border-gray-300 rounded p-2 text-xs m-2" value={formData.creditLimit} onChange=   {handleChange} />
                </div>

                {/* Remark */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium">Remark</label>
                  <textarea name="remark" className="col-span-2 border border-gray-300 rounded p-2    text-xs" rows="2" value={formData.remark} onChange={handleChange} ></textarea>
                </div>
                </div>


            </div>
          )
          }

          <div className="mt-4 flex justify-end mr-5">
            <button
              type="submit"
              className="px-3 p-2 bg-orange-500 rounded-2xl text-slate-50"
            >
              Create Customer
            </button>
          </div>
        </form>
      </Modal>
    );
  };

export default CreateCustomer