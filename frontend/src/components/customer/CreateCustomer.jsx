import React, { useState } from "react";
import {useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApprovedModal from "../approvedModal";


const CreateCustomer = () => {
  const { cartItems, requisitionSteps } = useSelector((state) => state.cart);
    const [showApprovedModal, setShowApprovedModal] = useState(false);
    const navigate = useNavigate();

  return (
    <>
      <button
          onClick={() => setShowApprovedModal(true)}
            className="btn btn-primary mt-4 px-6 bg-gray-300 text-gray-900 p-2 rounded-xl"
            >
      CONTINUE ORDER
      </button>
      {showApprovedModal && (
            <ApprovedModal
              showApprovedModal={showApprovedModal}
              setShowApprovedModal={setShowApprovedModal}
            />
          )}
    </>


  )
}

export default CreateCustomer