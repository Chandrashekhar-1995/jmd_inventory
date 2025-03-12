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
import LPO from "./components/product/LPO";
import LocalPurchaseOrders from "./components/order/LocalPurchaseOrders";
import OrderDetailsProcur from "./components/order/OrderDetailsProcur";
import PendingRequisitions from "./components/order/PendingRequisitions";
import GRN from "./components/product/GRN";
import UserList from "./components/user/UserList";

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

        <Route exact path="/LPO-factory" element={
          <AuthUser>
            <Layout>
              <LPO />
            </Layout>
          </AuthUser>
          }
        />  

        <Route exact path="/LPO-procurement" element={
          <AuthUser>
            <Layout>
              <LocalPurchaseOrders />
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/pending-requisitions" element={
          <AuthUser>
            <Layout>
              <PendingRequisitions />
            </Layout>
          </AuthUser>
          }
        />

        <Route exact path="/procurement/order/:id" element={
          <AuthUser>
            <Layout>
              <OrderDetailsProcur/>
            </Layout>
          </AuthUser>
          }
        />

      <Route exact path="/goods-receive-note" element={
          <AuthUser>
            <Layout>
              <GRN/>
            </Layout>
          </AuthUser>
          }
        />

      <Route exact path="/listUsers" element={
          <AuthUser>
            <Layout>
              <UserList/>
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
