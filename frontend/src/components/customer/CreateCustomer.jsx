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
          </div>

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