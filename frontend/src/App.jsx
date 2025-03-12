import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Warehouse from "./components/product/Warehouse";
import AuthUser from "./components/AuthUser";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/sale/Cart";
import RequisitionType from "./components/RequisitionType";
import PurchaseRequisition from "./components/purchase/PurchaseRequisition";
import PlaceOrder from "./components/sale/placeOrder";
import CreateCustomer from "./components/customer/CreateCustomer";
import CustomerLinksPage from "./pages/CustomerLinksPage";
import MyOrders from "./components/purchase/MyOrders";
import OrderDetails from "./components/order/OrderDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/*" element={<Navigate to="/" />} />

        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        
        <Route exact path="/dashboard" element={
          <AuthUser>
            <Layout>
              <Dashboard />
            </Layout>
        </AuthUser>
        } />
        <Route exact path="/warehouse" element={
          <AuthUser>
            <Layout>
              <Warehouse/>
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/product/:id" element={
          <AuthUser>
            <Layout>
              <ProductDetails/>
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/cart" element={
          <AuthUser>
            <Layout>
              <Cart/>
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/requisition-type" element={
          <AuthUser>
            <Layout>
              <RequisitionType/>
            </Layout>
          </AuthUser>
          }
        />

      <Route exact path="/purchase-requisition" element={
          <AuthUser>
            <Layout>
              <PurchaseRequisition/>
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/placeorder" element={
          <AuthUser>
            <Layout>
              <PlaceOrder/>
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/my-orders-list" element={
          <AuthUser>
            <Layout>
              <MyOrders/>
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/orderdetail/:id" element={
          <AuthUser>
            <Layout>
              <OrderDetails />
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/auth/user/customer" element={
          <AuthUser>
            <Layout>
              <CustomerLinksPage/>
            </Layout>
          </AuthUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
