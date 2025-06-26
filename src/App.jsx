import "./App.css";
import HomePage from "./components/home/HomePage";
import Products from "./components/products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/shared/About";
import Navbar from "./components/shared/Navbar";
import Contact from "./components/shared/Contact";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./components/cart/Cart";
function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          style: {
            width: "90%", // set fixed width
            maxWidth: "90vw", // responsive max width on smaller screens
            background: "#372aac",
            color: "#fff",
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
