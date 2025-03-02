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
import RequisitionType from "./components/sale/RequisitionType";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
