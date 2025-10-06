import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import ButtonLoader from '../../components/ButtonLoader';
import { ImageUp } from 'lucide-react';

const AddProduct = () => {
  const { backendUrl, axios, aToken } = useContext(AdminContext);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    category: '',
    stock: '',
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload a product image!');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${aToken}`,
        },
      });

      if (data.success) {
        toast.success('Product added successfully!');
        setProductData({
          name: '',
          description: '',
          price: '',
          offerPrice: '',
          category: '',
          stock: '',
        });
        setImage(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 md:p-12">
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
        >
          {/* Image Upload */}
          <div className="col-span-full flex flex-col items-start">
            <label htmlFor="product-img" className="font-medium mb-2">
              Product Image
            </label>
            <label htmlFor="product-img">
              {image ? (
                <img
                  className="w-24 h-24 object-cover bg-gray-100 rounded-full cursor-pointer border border-gray-300"
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer border border-gray-300">
                  <ImageUp />
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="product-img"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Offer Price */}
          <div>
            <label className="block font-medium mb-1">Offer Price (₹)</label>
            <input
              type="number"
              name="offerPrice"
              value={productData.offerPrice}
              onChange={handleChange}
              placeholder="Enter offer price"
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring focus:ring-blue-200"
            >
              <option value="">-- Select Category --</option>
              <option value="Stationary Print">Stationary Print</option>
              <option value="Poster, flex & more">Poster, flex & more</option>
              <option value="Custom t-shirts">Custom t-shirts</option>
              <option value="Goodies">Goodies</option>
              <option value="Visiting card">Visiting card</option>
              <option value="Labels, Stickers & Packaging">Labels, Stickers & Packaging</option>
              <option value="Business card">Business card</option>
            </select>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block font-medium mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              rows="4"
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue text-white w-full py-2 rounded-md text-base disabled:opacity-50 hover:opacity-90 transition-all cursor-pointer">
              {loading ? <ButtonLoader /> : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
