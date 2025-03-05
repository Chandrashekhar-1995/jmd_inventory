import React, { useState } from "react";
import CreateCustomer from "../components/customer/CreateCustomer";

const CustomerLinksPage = () => {
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  return (
    <div>
        <div className="">
          <button
          onClick={() => setShowCreateCustomer(true)}
          className="btn btn-primary mt-4 px-6 bg-gray-300 text-gray-900 p-2 rounded-xl"
          >
            CREATE CUSTOMER
          </button>
        </div>
        {showCreateCustomer && (
            <CreateCustomer
              showCreateCustomer={showCreateCustomer}
              setShowCreateCustomer={setShowCreateCustomer}
            />
          )}
    </div>
  )
}

export default CustomerLinksPage