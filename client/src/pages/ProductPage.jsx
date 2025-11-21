import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import MainLoader from '../components/MainLoader';
import RecommendedProduct from '../components/RecommendedProduct';
import { Star } from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams();
  const { navigate, backendUrl, axios, products, getProductsData, addToCart, loadingCart, fetchCartItems, deliveryCharge, taxRate, } = useContext(AppContext);

  const productInfo = useMemo(() => products.find(product => product._id === productId), [products, productId]);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  // product quantity
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // ---------- BILLING CALCULATION ----------
  const subtotal = (productData.offerPrice || 0) * quantity;
  const tax = subtotal * taxRate;
  const otherCharges = 0;
  const total = subtotal + deliveryCharge + tax + otherCharges;

  // FINAL PRICE OBJECT
  const price = {
    subtotal: subtotal,
    tax: tax,
    delivery: deliveryCharge,
    otherCharges: otherCharges,
  };

  // uploaded design preview
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // find location by pincode
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [pincode, setPincode] = useState();
  const [location, setLocation] = useState(null);

  const getLocationByPincode = async (event) => {
    event.preventDefault();
    setLoadingLocation(true);
    try {
      const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

      if (data[0]?.Status === "Success") {
        setLocation(data[0].PostOffice[0]);
      } else {
        setLocation(null);
        toast.error(data[0].Message);
      }
    } catch (error) {
      toast.error(error.Message);
    } finally {
      setLoadingLocation(false);
    }
  };

  // get single product data
  const getSingleProductData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/${productId}`);

      if (data?.success) {
        setProductData(data.product);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getSingleProductData();
      getProductsData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <MainLoader />
      </div>
    );
  }

  if (!productData || !productData._id) {
    return (
      <div className="text-center text-red-600 mt-10 h-[80vh] flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4 p-4 flex justify-center items-center">
            <img
              src={productData.image}
              alt={productData.name || "Product"}
              className="w-full h-auto object-cover mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl text-gray-800/90 mb-4">
            {productData.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {Array.isArray(productData.description)
              ? productData.description.join(", ")
              : productData.description}
          </p>

          <div className='flex'>
            <p className="text-sm mt-6 px-6 p-2 text-[#013e70] border border-[#013e70] rounded-full hover:bg-[#013e70]/5 transition-all duration-300 ease-in-out ">
              {productData.category}
            </p>
          </div>

          <div className="flex items-center mt-5">
            <span className="space-x-1 flex">
              {
                Array.from({ length: productData.rating || 0 }, (_, index) => (
                  <Star key={index} className='inline-block h-5 w-5 mb-0.5 text-yellow-400' />
                ))
              }
            </span>
            <span className="ml-2 text-gray-600">{productData.rating || 0}</span>
          </div>

          <p className="text-3xl mt-6">
            ₹{productData.offerPrice} <strike className="text-lg text-gray-400 font-normal ml-1">{productData.price}</strike>
          </p>

          <hr className="text-gray-300 my-6" />

          {/* Delivery Section */}
          <div>
            <h2 className="text-lg font-medium mb-2">Delivery</h2>
            <form onSubmit={getLocationByPincode} className='grid grid-cols-2'>
              <div className='flex w-40'>
                <input
                  type="number"
                  onChange={(e) => setPincode(e.target.value)}
                  value={pincode}
                  required
                  placeholder="Enter Pincode"
                  className="w-full p-2 border border-gray-300 outline-none focus:border-[#013e70]"
                />
                {loadingLocation && (
                  <div className="flex justify-center items-center gap-2 m-1">
                    <div className="h-4 w-4 border-2 border-[#013e70] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button type='submit' className='text-[#013e70] ml-3 cursor-pointer'>Check</button>
            </form>

            {location && (
              <p className='text-sm mt-2'>
                {location.Pincode}, {location.Name}, {location.District}, {location.State}, {location.Country}
              </p>
            )}
          </div>

          {/* Offers */}
          <div>
            <h2 className="text-lg font-medium mt-6 mb-2">Available Offers</h2>
            <div className="space-y-3 flex flex-col md:flex-row justify-between items-start md:items-center">
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {productData.offers?.length > 0 ? (
                  productData.offers.map((offer, index) => (
                    <li key={index}>{offer}</li>
                  ))
                ) : (
                  <li>No offers available</li>
                )}
              </ul>
              <input type="text" placeholder='Enter Coupon Code' className='p-2 border border-gray-300 outline-none focus:border-[#013e70]' />
            </div>
          </div>

          {/* Type Selection */}
          {productData.category === "Business card" ? (
            <div>
              <h2 className="text-lg font-medium mt-6 mb-2">Select Orientation</h2>
              <div className='flex space-x-3'>
                <button className='border px-4 p-2 rounded border-gray-300 focus:text-[#013e70] focus:border-[#013e70]'>Portrait</button>
                <button className='border px-4 p-2 rounded border-gray-300 focus:text-[#013e70] focus:border-[#013e70]'>Landscape</button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-medium mt-6 mb-2">Select Types</h2>
              <div className='flex space-x-3'>
                <button className='border px-4 p-2 rounded border-gray-300 focus:text-[#013e70] focus:border-[#013e70] cursor-pointer'>Standard</button>
                <button className='border px-4 p-2 rounded border-gray-300 focus:text-[#013e70] focus:border-[#013e70] cursor-pointer'>Polo</button>
              </div>
            </div>
          )}

          {/* Select Quality */}
          <div>
            <h2 className="text-lg font-medium mt-6 mb-2">Select Quality</h2>
            <div className='flex space-x-3'>
              <button className='border px-4 p-2 rounded border-gray-300 focus:text-[#013e70] focus:border-[#013e70] cursor-pointer'>Standard</button>
              <button className='border px-4 p-2 rounded border-gray-300 focus:text-[#013e70] focus:border-[#013e70] cursor-pointer'>Premium</button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h2 className="text-lg font-medium mt-6 mb-2">Quantity</h2>
            <div className="flex items-center border border-gray-300 w-fit rounded overflow-hidden">
              <button onClick={decrement} className="px-4 py-2 text-lg bg-[#013e70]/5 hover:bg-[#013e70]/10 cursor-pointer">−</button>
              <input type="number" value={quantity} readOnly className="w-12 text-center outline-none" />
              <button onClick={increment} className="px-4 py-2 text-lg bg-[#013e70]/5 hover:bg-[#013e70]/10 cursor-pointer">+</button>
            </div>
          </div>

          {/* Upload Design */}
          <div>
            <h2 className="text-lg font-medium mt-6 mb-2">Upload Design</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-52 p-2 border border-gray-300 rounded cursor-pointer"
            />

            {preview && (
              <img src={preview} alt="Uploaded design" className="w-40 h-40 mt-4 object-cover rounded" />
            )}
          </div>

          <hr className="text-gray-300 my-6" />

          {/* Detailed Bill */}
          <div>
            <h2 className="text-lg font-medium mb-2">Detailed Bill</h2>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="flex items-center gap-1">Subtotal <span className='text-red-500 text-sm'>({quantity})</span> </p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Other Charges</span>
                <span>₹{otherCharges.toFixed(2)}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <hr className="text-gray-300 mt-2" />

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4">
            <button
              onClick={() => addToCart(productId, quantity, price)}
              className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition cursor-pointer"
            >
              {loadingCart ? (
                <div className="flex justify-center items-center gap-2 m-1">
                  <div className="h-4 w-4 border-2 border-[#013e70] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : "Add to Cart"}
            </button>

            <button
             onClick={() => {addToCart(productId, quantity, price); navigate('/cart'); fetchCartItems(); scrollTo(0,0);}}
             className="w-full py-3.5 bg-[#013e70]/90 text-white hover:bg-[#013e70] transition cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <RecommendedProduct productId={productId} category={productInfo?.category} />
    </div>
  );
};

export default ProductPage;
