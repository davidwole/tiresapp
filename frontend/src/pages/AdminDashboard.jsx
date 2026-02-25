import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formConfig, setFormConfig] = useState({
    id: null,
    title: "",
    description: "",
    image: "",
    price: "",
    inStock: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const handleToggleStock = async (product) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/products/${product._id}`,
        { inStock: !product.inStock },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to update stock status");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formConfig, price: Number(formConfig.price) };
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      };

      if (formConfig.id) {
        await axios.patch(
          `http://localhost:8000/api/products/${formConfig.id}`,
          payload,
          config,
        );
      } else {
        await axios.post("http://localhost:8000/api/products", payload, config);
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

  const openAddModal = () => {
    setFormConfig({
      id: null,
      title: "",
      description: "",
      image: "",
      price: "",
      inStock: true,
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormConfig({
      id: product._id,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      inStock: product.inStock,
    });
    setShowModal(true);
  };

  if (loading)
    return <div className="text-center py-20">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={openAddModal}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded object-cover"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${product.price.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStock(product)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {product.inStock ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No products found. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {formConfig.id ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formConfig.title}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formConfig.description}
                  onChange={(e) =>
                    setFormConfig({
                      ...formConfig,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formConfig.image}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, image: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formConfig.price}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, price: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formConfig.inStock}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, inStock: e.target.checked })
                  }
                />
                <label
                  htmlFor="inStock"
                  className="ml-2 block text-sm text-gray-900"
                >
                  In Stock
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
