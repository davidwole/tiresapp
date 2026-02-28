import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <header className="bg-white shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Trailer Marketplace
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/inventory"
                className="text-gray-600 hover:text-gray-900"
              >
                Inventory
              </Link>
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </div>
          </nav>
        </header> */}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
