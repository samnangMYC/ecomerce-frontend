import "./App.css";
import HomePage from "./components/home/HomePage";
import Products from "./components/products/Products";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "./components/shared/About";
import Navbar from "./components/shared/Navbar";
import Contact from "./components/shared/Contact";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import CheckOut from "./components/checkout/CheckOut";
import PaymentConfirm from "./components/checkout/PaymentConfirm";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProduct from "./components/admin/products/AdminProduct";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import AdminCategories from "./components/admin/categories/AdminCategories";
import AdminSeller from "./components/admin/seller/AdminSeller";
import AdminOrders from "./components/admin/orders/AdminOrders";
//import { useLocation } from "react-router-dom";
import RouteChangeLoader from "./components/shared/RouteChangeLoader";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute && <RouteChangeLoader />}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order-confirm" element={<PaymentConfirm />} />
        </Route>

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateRoute adminOnly />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="seller" element={<AdminSeller />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <React.Fragment>
      <Router>
        <AppContent />
      </Router>
      <Toaster
        toastOptions={{
          style: {
            width: "90%",
            maxWidth: "90vw",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
        position="bottom-center"
      />
    </React.Fragment>
  );
}

export default App;
