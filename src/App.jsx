
import "./App.css";
import HomePage from "./components/home/HomePage";
import Products from "./components/products/Products";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
    </Routes>
   </Router>
  );
}

export default App;
